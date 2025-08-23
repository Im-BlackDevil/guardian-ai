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
  ): Promise<void> {
    const fileName = originalFile.name;
    const fileType = fileName.split('.').pop()?.toLowerCase() || 'txt';
    
    try {
      let blob: Blob;
      let mimeType: string;
      
      switch (fileType) {
        case 'docx':
          blob = await this.createDOCXDocument(improvedText, analysisResult);
          mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
          break;
        case 'csv':
          blob = await this.createCSVDocument(improvedText, analysisResult);
          mimeType = 'text/csv';
          break;
        case 'txt':
        default:
          blob = await this.createTXTDocument(improvedText, analysisResult);
          mimeType = 'text/plain';
          break;
      }
      
      // Generate filename
      const baseName = fileName.replace(/\.[^/.]+$/, '');
      const newFileName = `${baseName}_bias-free.${fileType}`;
      
      // Download file
      saveAs(blob, newFileName);
    } catch (error) {
      console.error('Error generating bias-free document:', error);
      throw new Error('Failed to generate bias-free document');
    }
  }
  
  private static async createDOCXDocument(text: string, analysisResult: BiasAnalysisResult): Promise<Blob> {
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
    
    const buffer = await Packer.toBuffer(doc);
    return new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
  }
  
  private static async createCSVDocument(text: string, analysisResult: BiasAnalysisResult): Promise<Blob> {
    const csvContent = [
      ['Bias-Free Document'],
      [`Generated on: ${new Date().toLocaleDateString()}`],
      [`Original biases detected: ${analysisResult.counts.total}`],
      [''],
      ['Improved Content'],
      [text]
    ];
    
    const csvString = Papa.unparse(csvContent);
    return new Blob([csvString], { type: 'text/csv' });
  }
  
  private static async createTXTDocument(text: string, analysisResult: BiasAnalysisResult): Promise<Blob> {
    const txtContent = `Bias-Free Document
Generated on: ${new Date().toLocaleDateString()}
Original biases detected: ${analysisResult.counts.total}

Improved Content:
${text}`;
    
    return new Blob([txtContent], { type: 'text/plain' });
  }
}
