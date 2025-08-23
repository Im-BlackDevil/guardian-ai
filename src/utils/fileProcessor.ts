import mammoth from 'mammoth';
import Papa from 'papaparse';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

export interface FileContent {
  text: string;
  fileName: string;
  fileType: string;
  preview: string;
}

export interface BiasAnalysisResult {
  biases: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
    examples: string[];
    suggestions: string[];
  }>;
  counts: {
    total: number;
    byType: Record<string, number>;
    bySeverity: Record<string, number>;
  };
  suggestions: string[];
  improvedText: string;
  insights: string[];
}

export class FileProcessor {
  // Backend API URL
  private static readonly BACKEND_URL = 'http://localhost:3001';
  
  // Enhanced download method that works in all browsers
  private static downloadFile(blob: Blob, fileName: string): Promise<boolean> {
    return new Promise((resolve) => {
      try {
        console.log('Attempting download with file-saver...');
        // Try file-saver first
        saveAs(blob, fileName);
        console.log('File download initiated with file-saver');
        resolve(true);
      } catch (error) {
        console.warn('File-saver failed, trying fallback method:', error);
        
        // Fallback: Create a download link
        try {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = fileName;
          link.style.display = 'none';
          
          // Add to DOM, click, and cleanup
          document.body.appendChild(link);
          link.click();
          
          // Cleanup after a short delay
          setTimeout(() => {
            if (document.body.contains(link)) {
              document.body.removeChild(link);
            }
            window.URL.revokeObjectURL(url);
          }, 1000);
          
          console.log('File download initiated with fallback method');
          resolve(true);
        } catch (fallbackError) {
          console.error('Fallback download also failed:', fallbackError);
          
          // Last resort: Try to open in new tab
          try {
            const url = window.URL.createObjectURL(blob);
            const newWindow = window.open(url, '_blank');
            if (newWindow) {
              console.log('File opened in new tab as fallback');
              resolve(true);
            } else {
              console.error('Failed to open file in new tab');
              resolve(false);
            }
          } catch (finalError) {
            console.error('All download methods failed:', finalError);
            resolve(false);
          }
        }
      }
    });
  }

  static async processFile(file: File): Promise<FileContent> {
    const fileName = file.name;
    const fileType = file.name.split('.').pop()?.toLowerCase() || 'txt';
    
    try {
      let text = '';
      
      switch (fileType) {
        case 'pdf':
          text = await this.extractPDFText(file);
          break;
        case 'docx':
          text = await this.extractDOCXText(file);
          break;
        case 'csv':
          text = await this.extractCSVText(file);
          break;
        case 'txt':
        default:
          text = await this.extractTXTText(file);
          break;
      }
      
      // Clean and normalize text
      text = this.cleanText(text);
      
      // Generate preview (first 200 characters)
      const preview = text.length > 200 ? text.substring(0, 200) + '...' : text;
      
      return {
        text,
        fileName,
        fileType,
        preview
      };
    } catch (error) {
      console.error('Error processing file:', error);
      throw new Error(`Failed to process ${fileType} file: ${error}`);
    }
  }
  
  private static async extractPDFText(file: File): Promise<string> {
    // For client-side PDF processing, we'll use a simple approach
    // In production, you might want to use a backend service for better PDF parsing
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          // Note: This is a simplified PDF extraction
          // For production, consider using pdf-parse with a backend service
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const text = await this.simplePDFExtraction(arrayBuffer);
          resolve(text);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read PDF file'));
      reader.readAsArrayBuffer(file);
    });
  }
  
  private static async simplePDFExtraction(arrayBuffer: ArrayBuffer): Promise<string> {
    // This is a placeholder for PDF extraction
    // In a real implementation, you'd use pdf-parse or similar
    // For now, we'll return a message indicating PDF processing
    return "PDF content extracted. Note: For full PDF text extraction, consider using a backend service with pdf-parse library.";
  }
  
  private static async extractDOCXText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const result = await mammoth.extractRawText({ arrayBuffer });
          resolve(result.value);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read DOCX file'));
      reader.readAsArrayBuffer(file);
    });
  }
  
  private static async extractCSVText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const result = Papa.parse(text, { header: true });
          
          // Convert CSV to readable text
          let csvText = '';
          result.data.forEach((row: any, index: number) => {
            csvText += `Row ${index + 1}: `;
            Object.values(row).forEach((value: any) => {
              csvText += `${value} `;
            });
            csvText += '\n';
          });
          
          resolve(csvText);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read CSV file'));
      reader.readAsText(file);
    });
  }
  
  private static async extractTXTText(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          resolve(text);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read text file'));
      reader.readAsText(file);
    });
  }
  
  private static cleanText(text: string): string {
    return text
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n+/g, '\n') // Replace multiple newlines with single newline
      .trim();
  }
  
  static async generateBiasFreeDocument(
    originalFile: File,
    improvedText: string,
    analysisResult: BiasAnalysisResult
  ): Promise<boolean> {
    const fileName = originalFile.name;
    const fileType = fileName.split('.').pop()?.toLowerCase() || 'txt';
    
    try {
      console.log('Starting document generation for:', fileName, 'Type:', fileType);
      console.log('Improved text length:', improvedText.length);
      console.log('Analysis result:', analysisResult);
      
      // For PDF files, use the backend API
      if (fileType === 'pdf') {
        console.log('Using backend API for PDF generation...');
        return await this.generatePDFViaBackend(originalFile);
      }
      
      // For other file types, use client-side generation
      let blob: Blob;
      
      switch (fileType) {
        case 'docx':
          console.log('Creating DOCX document...');
          blob = await this.createDOCXDocument(improvedText, analysisResult);
          break;
        case 'csv':
          console.log('Creating CSV document...');
          blob = await this.createCSVDocument(improvedText, analysisResult);
          break;
        case 'txt':
        default:
          console.log('Creating TXT document...');
          blob = await this.createTXTDocument(improvedText, analysisResult);
          break;
      }
      
      console.log('Blob created:', blob);
      console.log('Blob size:', blob.size);
      console.log('Blob type:', blob.type);
      
      // Generate filename
      const baseName = fileName.replace(/\.[^/.]+$/, '');
      const newFileName = `${baseName}_bias-free.${fileType}`;
      
      console.log('Downloading file as:', newFileName);
      
      // Download file using our enhanced method
      const downloadSuccess = await this.downloadFile(blob, newFileName);
      
      if (downloadSuccess) {
        console.log('Document generation and download completed successfully!');
      } else {
        console.warn('Document generated but download may have failed');
      }
      
      return downloadSuccess;
      
    } catch (error) {
      console.error('Error generating bias-free document:', error);
      throw new Error(`Failed to generate bias-free document: ${error}`);
    }
  }
  
  // New method: Generate PDF via backend API
  private static async generatePDFViaBackend(file: File): Promise<boolean> {
    try {
      console.log('Sending file to backend API for PDF generation...');
      
      // Create FormData with the file
      const formData = new FormData();
      formData.append('file', file);
      
      // Make API call to backend
      const response = await fetch(`${this.BACKEND_URL}/api/generate-bias-free`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Backend API error: ${errorData.error || response.statusText}`);
      }
      
      // Get the PDF blob from response
      const pdfBlob = await response.blob();
      console.log('PDF received from backend, size:', pdfBlob.size);
      
      // Get filename from response headers
      const contentDisposition = response.headers.get('content-disposition');
      let fileName = 'bias-free-document.pdf';
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          fileName = filenameMatch[1];
        }
      }
      
      console.log('Downloading PDF as:', fileName);
      
      // Download the PDF
      const downloadSuccess = await this.downloadFile(pdfBlob, fileName);
      
      if (downloadSuccess) {
        console.log('PDF download completed successfully!');
      } else {
        console.warn('PDF generated but download may have failed');
      }
      
      return downloadSuccess;
      
    } catch (error) {
      console.error('Error generating PDF via backend:', error);
      throw new Error(`Backend PDF generation failed: ${error}`);
    }
  }
  
  private static async createDOCXDocument(text: string, analysisResult: BiasAnalysisResult): Promise<Blob> {
    try {
      console.log('Building DOCX document structure...');
      
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Bias-Free Document",
                  bold: true,
                  size: 32
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Generated on: ${new Date().toLocaleDateString()}`,
                  size: 20
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Original biases detected: ${analysisResult.counts.total}`,
                  size: 20
                })
              ]
            }),
            new Paragraph({
              children: [new TextRun({ text: "" })]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "Improved Content:",
                  bold: true,
                  size: 24
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: text,
                  size: 20
                })
              ]
            })
          ]
        }]
      });
      
      console.log('Converting DOCX to buffer...');
      const buffer = await Packer.toBuffer(doc);
      console.log('Buffer created, size:', buffer.byteLength);
      
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      console.log('DOCX blob created:', blob);
      
      return blob;
    } catch (error) {
      console.error('Error creating DOCX document:', error);
      throw error;
    }
  }
  
  private static async createCSVDocument(text: string, analysisResult: BiasAnalysisResult): Promise<Blob> {
    try {
      console.log('Creating CSV document...');
      
      const csvContent = [
        ['Bias-Free Document'],
        [`Generated on: ${new Date().toLocaleDateString()}`],
        [`Original biases detected: ${analysisResult.counts.total}`],
        [''],
        ['Improved Content'],
        [text]
      ];
      
      const csvString = Papa.unparse(csvContent);
      console.log('CSV string created, length:', csvString.length);
      
      const blob = new Blob([csvString], { type: 'text/csv' });
      console.log('CSV blob created:', blob);
      
      return blob;
    } catch (error) {
      console.error('Error creating CSV document:', error);
      throw error;
    }
  }
  
  private static async createTXTDocument(text: string, analysisResult: BiasAnalysisResult): Promise<Blob> {
    try {
      console.log('Creating TXT document...');
      
      const txtContent = `Bias-Free Document
Generated on: ${new Date().toLocaleDateString()}
Original biases detected: ${analysisResult.counts.total}

Improved Content:
${text}`;
      
      console.log('TXT content created, length:', txtContent.length);
      
      // Fix: Use txtContent instead of just text for the blob
      const blob = new Blob([txtContent], { type: 'text/plain' });
      console.log('TXT blob created:', blob);
      
      return blob;
    } catch (error) {
      console.error('Error creating TXT document:', error);
      throw error;
    }
  }
}
