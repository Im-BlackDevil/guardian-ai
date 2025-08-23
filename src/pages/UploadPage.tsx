import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  FileSpreadsheet, 
  FileImage, 
  File, 
  X, 
  AlertCircle,
  CheckCircle,
  Loader2,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileProcessor, FileContent, BiasAnalysisResult } from '@/utils/fileProcessor';
import { BiasAnalyzer } from '@/utils/biasAnalyzer';
import BiasCharts from '@/components/BiasCharts';
import BiasAnalysisReport from '@/components/BiasAnalysisReport';

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<FileContent | null>(null);
  const [analysisResult, setAnalysisResult] = useState<BiasAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [downloadMessage, setDownloadMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedFormats = [
    { ext: 'txt', name: 'Text Files', icon: FileText, color: 'text-blue-500' },
    { ext: 'docx', name: 'Word Documents', icon: FileSpreadsheet, color: 'text-green-500' },
    { ext: 'pdf', name: 'PDF Files', icon: FileImage, color: 'text-red-500' },
    { ext: 'csv', name: 'CSV Files', icon: FileSpreadsheet, color: 'text-purple-500' }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileContent(null);
      setAnalysisResult(null);
      setError(null);
      setDownloadStatus('idle');
      setDownloadMessage('');
    }
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setFileContent(null);
      setAnalysisResult(null);
      setError(null);
      setDownloadStatus('idle');
      setDownloadMessage('');
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = () => {
    setFile(null);
    setFileContent(null);
    setAnalysisResult(null);
    setError(null);
    setDownloadStatus('idle');
    setDownloadMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeFile = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    setError(null);
    setDownloadStatus('idle');
    setDownloadMessage('');

    try {
      // Process file and extract text
      const processedContent = await FileProcessor.processFile(file);
      setFileContent(processedContent);

      // Analyze for bias
      const analysis = await BiasAnalyzer.analyzeText(processedContent.text);
      setAnalysisResult(analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownload = async () => {
    if (!file || !analysisResult) return;

    setIsDownloading(true);
    setDownloadStatus('idle');
    setDownloadMessage('Generating bias-free document...');

    try {
      const downloadSuccess = await FileProcessor.generateBiasFreeDocument(
        file,
        analysisResult.improvedText,
        analysisResult
      );
      
      if (downloadSuccess) {
        // Success
        setDownloadStatus('success');
        if (file.name.toLowerCase().endsWith('.pdf')) {
          setDownloadMessage('PDF generated successfully via backend API! Check your downloads folder.');
        } else {
          setDownloadMessage('Document generated successfully! Check your downloads folder.');
        }
      } else {
        // Partial success - document generated but download may have failed
        setDownloadStatus('success');
        setDownloadMessage('Document generated! If download didn\'t start, check your browser\'s download settings.');
      }
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setDownloadStatus('idle');
        setDownloadMessage('');
      }, 5000);
      
    } catch (err) {
      setDownloadStatus('error');
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      
      if (errorMessage.includes('Backend API error') || errorMessage.includes('Backend PDF generation failed')) {
        setDownloadMessage('Backend API error. Please make sure the backend server is running on port 3001.');
      } else {
        setDownloadMessage('Failed to generate bias-free document. Please try again.');
      }
      
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const format = supportedFormats.find(f => f.ext === ext);
    return format ? <format.icon className={`h-8 w-8 ${format.color}`} /> : <File className="h-8 w-8 text-muted-foreground" />;
  };

  const getFileTypeName = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const format = supportedFormats.find(f => f.ext === ext);
    return format ? format.name : 'Unknown Format';
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Bias Analyzer</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload any document to detect hidden biases and get an improved, bias-free version.
            Supports TXT, DOCX, PDF, and CSV files.
          </p>
        </motion.div>

        {/* File Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
            <CardContent className="p-8">
              {!file ? (
                <div
                  className="text-center cursor-pointer"
                  onDrop={handleFileDrop}
                  onDragOver={handleDragOver}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Upload Your Document</h3>
                  <p className="text-muted-foreground mb-4">
                    Drag and drop a file here, or click to browse
                  </p>
                  
                  {/* Supported Formats */}
                  <div className="flex flex-wrap justify-center gap-4 mb-4">
                    {supportedFormats.map((format) => (
                      <div key={format.ext} className="flex items-center gap-2">
                        <format.icon className={`h-4 w-4 ${format.color}`} />
                        <span className="text-sm text-muted-foreground">{format.ext.toUpperCase()}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button size="lg" className="px-8">
                    Choose File
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    {getFileIcon(file.name)}
                    <div className="text-left">
                      <h3 className="font-semibold">{file.name}</h3>
                      <p className="text-sm text-muted-foreground">{getFileTypeName(file.name)}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 justify-center">
                    <Button onClick={analyzeFile} disabled={isAnalyzing}>
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        'Analyze for Bias'
                      )}
                    </Button>
                    <Button variant="outline" onClick={removeFile}>
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                accept=".txt,.docx,.pdf,.csv"
                className="hidden"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <Card className="border-destructive/20 bg-destructive/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">Error: {error}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Download Status */}
        <AnimatePresence>
          {downloadStatus !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <Card className={`border-2 ${
                downloadStatus === 'success' 
                  ? 'border-success/20 bg-success/5' 
                  : 'border-destructive/20 bg-destructive/5'
              }`}>
                <CardContent className="p-4">
                  <div className={`flex items-center gap-2 ${
                    downloadStatus === 'success' ? 'text-success' : 'text-destructive'
                  }`}>
                    {downloadStatus === 'success' ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                    <span className="font-medium">{downloadMessage}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* File Content Preview */}
        <AnimatePresence>
          {fileContent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-success" />
                    File Content Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 rounded-lg p-4 max-h-40 overflow-y-auto">
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {fileContent.preview}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Showing preview of uploaded content. Full analysis will process the complete document.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analysis Results */}
        <AnimatePresence>
          {analysisResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Charts */}
              <Card>
                <CardHeader>
                  <CardTitle>Bias Analysis Visualizations</CardTitle>
                </CardHeader>
                <CardContent>
                  <BiasCharts analysisResult={analysisResult} />
                </CardContent>
              </Card>

              {/* Detailed Report */}
              <BiasAnalysisReport
                analysisResult={analysisResult}
                originalFile={file!}
                onDownload={handleDownload}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Download Progress */}
        <AnimatePresence>
          {isDownloading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm">Generating bias-free document...</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UploadPage;
