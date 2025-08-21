import { motion } from "framer-motion";
import { Lightbulb, Target, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const InsightsPanel = () => {
  const insights = [
    {
      id: 1,
      category: "Language Optimization",
      insight: "Replace absolute statements with qualified language",
      description: "Use phrases like 'research suggests' instead of 'it is proven that' to maintain objectivity.",
      impact: "High",
      actionable: true
    },
    {
      id: 2,
      category: "Evidence Balance",
      insight: "Include counterarguments and limitations",
      description: "Presenting opposing viewpoints strengthens credibility and reduces confirmation bias.",
      impact: "Medium",
      actionable: true
    },
    {
      id: 3,
      category: "Source Diversity",
      insight: "Cite multiple independent sources",
      description: "Avoid relying on single studies or sources that may introduce anchoring bias.",
      impact: "High",
      actionable: false
    },
    {
      id: 4,
      category: "Emotional Language",
      insight: "Reduce emotionally charged words",
      description: "Neutral language helps readers form their own objective opinions without influence.",
      impact: "Medium",
      actionable: true
    },
    {
      id: 5,
      category: "Statistical Context",
      insight: "Provide comparative data and context",
      description: "Present statistics alongside relevant comparisons to prevent misinterpretation.",
      impact: "High",
      actionable: false
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "text-destructive";
      case "Medium": return "text-warning";
      case "Low": return "text-success";
      default: return "text-muted-foreground";
    }
  };

  const getImpactBg = (impact: string) => {
    switch (impact) {
      case "High": return "bg-destructive/10 border-destructive/20";
      case "Medium": return "bg-warning/10 border-warning/20";
      case "Low": return "bg-success/10 border-success/20";
      default: return "bg-muted/10 border-border";
    }
  };

  return (
    <motion.section
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Generated Insights</h2>
          <p className="text-xl text-muted-foreground">Personalized recommendations to reduce bias</p>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <Card className="shadow-card text-center">
            <CardContent className="pt-6">
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">5</div>
              <div className="text-sm text-muted-foreground">Total Insights</div>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="pt-6">
              <div className="bg-success/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-success" />
              </div>
              <div className="text-2xl font-bold text-success mb-1">3</div>
              <div className="text-sm text-muted-foreground">Actionable Items</div>
            </CardContent>
          </Card>

          <Card className="shadow-card text-center">
            <CardContent className="pt-6">
              <div className="bg-warning/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-warning" />
              </div>
              <div className="text-2xl font-bold text-warning mb-1">73%</div>
              <div className="text-sm text-muted-foreground">Potential Improvement</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Insights List */}
        <div className="space-y-6">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
                            {insight.category}
                          </span>
                          <span className={`text-xs font-medium px-2 py-1 rounded-md border ${getImpactBg(insight.impact)} ${getImpactColor(insight.impact)}`}>
                            {insight.impact} Impact
                          </span>
                          {insight.actionable && (
                            <CheckCircle className="h-4 w-4 text-success" />
                          )}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {insight.insight}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {insight.description}
                      </p>
                    </div>

                    <motion.div
                      className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ x: 5 }}
                    >
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </motion.div>
                  </div>

                  {insight.actionable && (
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm" className="text-xs">
                        Apply Suggestion
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            <Target className="mr-2 h-5 w-5" />
            Apply All Actionable Insights
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default InsightsPanel;