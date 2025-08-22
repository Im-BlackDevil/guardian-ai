import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, TrendingUp, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const BiasDetectionResults = () => {
  const mockResults = [
    {
      id: 1,
      textSnippet: "This investment opportunity is guaranteed to make you rich quickly with minimal risk involved.",
      biasType: "Confirmation Bias",
      confidence: 92,
      severity: "high",
      suggestedText: "This investment opportunity shows potential for returns, though all investments carry inherent risks that should be carefully considered.",
      explanation: "The original text presents information as absolute certainty, which may confirm existing beliefs without critical evaluation."
    },
    {
      id: 2,
      textSnippet: "Everyone knows that our product is the best solution in the market right now.",
      biasType: "Bandwagon Effect",
      confidence: 78,
      severity: "medium",
      suggestedText: "Our product offers competitive advantages and has received positive feedback from many customers.",
      explanation: "Appeals to popular opinion rather than presenting objective evidence of the product's merits."
    },
    {
      id: 3,
      textSnippet: "The research clearly shows that our approach is superior to all alternatives.",
      biasType: "Cherry Picking",
      confidence: 65,
      severity: "low",
      suggestedText: "Research indicates that our approach has shown promising results compared to several alternatives studied.",
      explanation: "Uses absolute language that may indicate selective presentation of supporting evidence."
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-destructive";
      case "medium": return "text-warning";
      case "low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  return (
    <motion.section
      id="bias-results"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bias Detection Results</h2>
          <p className="text-xl text-muted-foreground">AI-powered analysis of your content</p>
        </motion.div>

        <div className="space-y-6">
          {mockResults.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="shadow-card hover:shadow-elevated transition-all duration-300 border-l-4 border-l-primary">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className={`h-5 w-5 ${getSeverityColor(result.severity)}`} />
                      <CardTitle className="text-lg">{result.biasType}</CardTitle>
                      <Badge variant={getSeverityBadgeVariant(result.severity)}>
                        {result.severity.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{result.confidence}%</div>
                      <div className="text-sm text-muted-foreground">Confidence</div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Original Text */}
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      ANALYZED TEXT
                    </h4>
                    <div className="bg-muted/50 border border-border rounded-lg p-4">
                      <p className="text-foreground italic">"{result.textSnippet}"</p>
                    </div>
                  </div>

                  {/* Confidence Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Detection Confidence</span>
                      <span className="text-sm text-muted-foreground">{result.confidence}%</span>
                    </div>
                    <Progress value={result.confidence} className="h-2" />
                  </div>

                  {/* Explanation */}
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground mb-2">EXPLANATION</h4>
                    <p className="text-sm">{result.explanation}</p>
                  </div>

                  {/* Suggested Alternative */}
                  <div>
                    <h4 className="text-sm font-semibold text-success mb-2 flex items-center">
                      <Lightbulb className="h-4 w-4 mr-1" />
                      SUGGESTED ALTERNATIVE
                    </h4>
                    <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                      <p className="text-foreground">"{result.suggestedText}"</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-end pt-2">
                    <CheckCircle className="h-4 w-4 text-success mr-2" />
                    <span className="text-sm text-success font-medium">Analysis Complete</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default BiasDetectionResults;