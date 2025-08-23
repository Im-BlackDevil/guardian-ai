import React from 'react';
import { AlertTriangle, CheckCircle, Info, Lightbulb, Download } from 'lucide-react';
import { BiasAnalysisResult } from '../utils/fileProcessor';
import { FileProcessor } from '../utils/fileProcessor';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

interface BiasAnalysisReportProps {
  analysisResult: BiasAnalysisResult;
  originalFile: File;
  onDownload: () => void;
}

const BiasAnalysisReport: React.FC<BiasAnalysisReportProps> = ({
  analysisResult,
  originalFile,
  onDownload
}) => {
  const { biases, counts, suggestions, improvedText, insights } = analysisResult;

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'low':
        return <Info className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Header */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            {counts.total === 0 ? (
              <CheckCircle className="h-6 w-6 text-success" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-warning" />
            )}
            {counts.total === 0 ? 'No Biases Detected!' : 'Bias Analysis Complete'}
          </CardTitle>
          <p className="text-muted-foreground">
            {counts.total === 0 
              ? 'Your document demonstrates excellent inclusive language practices.'
              : `Found ${counts.total} bias patterns that could be improved.`
            }
          </p>
        </CardHeader>
      </Card>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{counts.total}</div>
            <div className="text-sm text-muted-foreground">Total Biases</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-destructive">{counts.bySeverity.high}</div>
            <div className="text-sm text-muted-foreground">High Severity</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-warning">{counts.bySeverity.medium}</div>
            <div className="text-sm text-muted-foreground">Medium Severity</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-success">{counts.bySeverity.low}</div>
            <div className="text-sm text-muted-foreground">Low Severity</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Bias Analysis */}
      {biases.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Detailed Bias Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {biases.map((bias, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getSeverityIcon(bias.severity)}
                    <h4 className="font-semibold capitalize">
                      {bias.type.replace(/_/g, ' ')}
                    </h4>
                    <Badge variant={getSeverityBadgeVariant(bias.severity)}>
                      {bias.severity}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-3">{bias.description}</p>
                
                {bias.examples.length > 0 && (
                  <div className="mb-3">
                    <h5 className="font-medium mb-2">Examples:</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {bias.examples.map((example, idx) => (
                        <li key={idx}>{example}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {bias.suggestions.length > 0 && (
                  <div>
                    <h5 className="font-medium mb-2">Suggestions:</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {bias.suggestions.map((suggestion, idx) => (
                        <li key={idx}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Key Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">{insight}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Improvement Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                <span className="text-muted-foreground">{suggestion}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Improved Text Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Improved Text Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 rounded-lg p-4 max-h-60 overflow-y-auto">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {improvedText.length > 500 
                ? improvedText.substring(0, 500) + '...'
                : improvedText
              }
            </p>
          </div>
          {improvedText.length > 500 && (
            <p className="text-xs text-muted-foreground mt-2">
              Showing first 500 characters. Download the full improved document below.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Download Section */}
      <Card className="border-success/20 bg-gradient-to-r from-success/5 to-accent/5">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Download className="h-5 w-5 text-success" />
            Download Bias-Free Document
          </CardTitle>
          <p className="text-muted-foreground">
            Get your improved, bias-free document in the same format as your original file.
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <div className="text-sm text-muted-foreground">
              Original: <span className="font-medium">{originalFile.name}</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <div className="text-sm text-muted-foreground">
              Format: <span className="font-medium uppercase">{originalFile.name.split('.').pop()}</span>
            </div>
          </div>
          
          <Button 
            onClick={onDownload}
            className="mt-4 px-8 py-3"
            size="lg"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Bias-Free {originalFile.name.split('.').pop()?.toUpperCase()}
          </Button>
          
          <p className="text-xs text-muted-foreground mt-2">
            The improved document will be saved as "{originalFile.name.replace(/\.[^/.]+$/, '')}_bias-free.{originalFile.name.split('.').pop()}"
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BiasAnalysisReport;
