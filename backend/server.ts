import express from 'express';
import multer from 'multer';
import cors from 'cors';
import PDFDocument from 'pdfkit';
import mammoth from 'mammoth';
import Papa from 'papaparse';
import path from 'path';
import { fileURLToPath } from 'url';

// Guardian AI imports
import guardianRoutes from './routes/guardian.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.static('public'));

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
    const allowedTypes = ['.txt', '.docx', '.pdf', '.csv'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('File type not supported'), false);
    }
  }
});

// Bias detection patterns (simplified version)
const biasPatterns = {
  gender: /all\s+(?:men|women|males|females)\s+(?:are|can't|won't|don't|is|was)/gi,
  racial: /(?:race|ethnic|cultural)\s+(?:background|group|tendencies)/gi,
  age: /(?:older|younger)\s+people\s+can't/gi,
  stereotyping: /all\s+\w+\s+(?:are|can't|won't|don't|is|was)/gi,
  toxic: /stupid|idiot|terrible|awful|hate|kill|die/gi
};

// Function to detect and replace biases
function removeBiases(text: string): string {
  let improvedText = text;
  
  // Replace gender biases
  improvedText = improvedText.replace(biasPatterns.gender, 'some people are');
  
  // Replace racial biases
  improvedText = improvedText.replace(biasPatterns.racial, 'individual characteristics');
  
  // Replace age biases
  improvedText = improvedText.replace(biasPatterns.age, 'people with different experience levels');
  
  // Replace stereotyping
  improvedText = improvedText.replace(biasPatterns.stereotyping, 'some people are');
  
  // Replace toxic language
  improvedText = improvedText.replace(biasPatterns.toxic, (match) => {
    const replacements: Record<string, string> = {
      'stupid': 'challenging',
      'idiot': 'difficult',
      'terrible': 'problematic',
      'awful': 'concerning',
      'hate': 'dislike',
      'kill': 'eliminate',
      'die': 'cease'
    };
    return replacements[match.toLowerCase()] || match;
  });
  
  return improvedText;
}

// Function to extract text from different file types
async function extractText(file: Express.Multer.File): Promise<string> {
  const buffer = file.buffer;
  const ext = path.extname(file.originalname).toLowerCase();
  
  try {
    switch (ext) {
      case '.txt':
        return buffer.toString('utf-8');
        
      case '.docx':
        const result = await mammoth.extractRawText({ buffer });
        return result.value;
        
      case '.csv':
        const csvText = buffer.toString('utf-8');
        const parsed = Papa.parse(csvText, { header: true });
        return parsed.data.map((row: any) => Object.values(row).join(' ')).join('\n');
        
      case '.pdf':
        // For PDF, we'll return a placeholder since pdf-parse might not be available
        return 'PDF text extraction not implemented in this version';
        
      default:
        throw new Error(`Unsupported file type: ${ext}`);
    }
  } catch (error) {
    console.error('Error extracting text:', error);
    throw new Error(`Failed to extract text from ${file.originalname}`);
  }
}

// Function to generate PDF
async function generatePDF(text: string, analysisResult: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const chunks: Buffer[] = [];
      
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      
      // Add title
      doc.fontSize(18)
         .font('Helvetica-Bold')
         .text('Bias-Free Document Analysis', { align: 'center' });
      
      doc.moveDown();
      
      // Add summary
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .text('Summary');
      
      doc.fontSize(12)
         .font('Helvetica')
         .text(`Total biases detected: ${analysisResult.counts.total}`);
      
      doc.moveDown();
      
      // Add bias types
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .text('Bias Types Found:');
      
      Object.entries(analysisResult.counts.byType).forEach(([type, count]) => {
        doc.fontSize(10)
           .font('Helvetica')
           .text(`• ${type.replace(/_/g, ' ')}: ${count} instances`);
      });
      
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

// API Endpoint: Generate Bias-Free PDF
app.post('/api/generate-bias-free', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    console.log('Processing file:', req.file.originalname);
    
    // Extract text from uploaded file
    const originalText = await extractText(req.file);
    console.log('Text extracted, length:', originalText.length);
    
    // Analyze for biases (simplified analysis)
    const biases: string[] = [];
    Object.entries(biasPatterns).forEach(([type, pattern]) => {
      const matches = originalText.match(pattern);
      if (matches) {
        biases.push(type);
      }
    });
    
    // Create analysis result
    const analysisResult = {
      biases: biases.map(type => ({
        type,
        severity: 'medium',
        description: `Detected ${type} bias patterns`,
        examples: [],
        suggestions: []
      })),
      counts: {
        total: biases.length,
        byType: biases.reduce((acc: Record<string, number>, type: string) => {
          acc[type] = (acc[type] || 0) + 1;
          return acc;
        }, {}),
        bySeverity: { low: 0, medium: biases.length, high: 0 }
      },
      suggestions: ['Use inclusive language', 'Avoid generalizations'],
      improvedText: removeBiases(originalText),
      insights: [`Found ${biases.length} bias patterns`]
    };
    
    console.log('Analysis complete, biases found:', biases.length);
    
    // Generate PDF
    const pdfBuffer = await generatePDF(analysisResult.improvedText, analysisResult);
    console.log('PDF generated, size:', pdfBuffer.length);
    
    // Set response headers for file download
    const fileName = req.file.originalname.replace(/\.[^/.]+$/, '') + '_bias-free.pdf';
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    
    // Send the PDF
    res.send(pdfBuffer);
    
  } catch (error) {
    console.error('Error generating bias-free PDF:', error);
    res.status(500).json({ 
      error: 'Failed to generate bias-free PDF',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Guardian AI routes
app.use('/guardian', guardianRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Bias Shield AI Backend is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Bias Shield AI Backend running on port ${PORT}`);
  console.log(`📁 API endpoint: http://localhost:${PORT}/api/generate-bias-free`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🛡️ Guardian AI: http://localhost:${PORT}/guardian`);
});

export default app;
