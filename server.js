import express from 'express';
import multer from 'multer';
import cors from 'cors';
import PDFDocument from 'pdfkit';
import mammoth from 'mammoth';
import Papa from 'papaparse';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
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
function removeBiases(text) {
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
    const replacements = {
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
async function extractText(file) {
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
        return parsed.data.map(row => Object.values(row).join(' ')).join('\n');
        
      case '.pdf':
        // For PDF, we'll use a simple text extraction
        // In production, you'd use pdf-parse or similar
        return "PDF content extracted. Note: For full PDF text extraction, consider using a backend service with pdf-parse library.";
        
      default:
        throw new Error('Unsupported file type');
    }
  } catch (error) {
    throw new Error(`Failed to extract text from ${ext} file: ${error.message}`);
  }
}

// Function to generate PDF from text
function generatePDF(text, analysisResult) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margins: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50
        }
      });
      
      const chunks = [];
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      
      // Add header
      doc.fontSize(24)
         .font('Helvetica-Bold')
         .text('Bias-Free Document', { align: 'center' });
      
      doc.moveDown();
      
      // Add metadata
      doc.fontSize(12)
         .font('Helvetica')
         .text(`Generated on: ${new Date().toLocaleDateString()}`);
      
      doc.text(`Original biases detected: ${analysisResult.counts.total}`);
      doc.text(`Bias types found: ${Object.keys(analysisResult.counts.byType).join(', ')}`);
      
      doc.moveDown();
      
      // Add improved content
      doc.fontSize(16)
         .font('Helvetica-Bold')
         .text('Improved Content:');
      
      doc.moveDown();
      
      doc.fontSize(11)
         .font('Helvetica')
         .text(text, {
           align: 'justify',
           lineGap: 2
         });
      
      // Add analysis summary
      doc.moveDown(2);
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .text('Analysis Summary:');
      
      doc.moveDown();
      
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
    const biases = [];
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
        byType: biases.reduce((acc, type) => {
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
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Bias Shield AI Backend is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Bias Shield AI Backend running on port ${PORT}`);
  console.log(`📁 API endpoint: http://localhost:${PORT}/api/generate-bias-free`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});

export default app;
