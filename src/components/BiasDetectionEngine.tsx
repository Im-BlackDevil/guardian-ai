import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, 
  Bot, 
  Settings, 
  Brain, 
  MessageCircle, 
  Shield,
  Zap,
  Target,
  Users,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Code,
  Database,
  Cpu,
  Network
} from "lucide-react";

const BiasDetectionEngine = () => {
  const systemFlow = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "User Chat",
      description: "Message sent in Discord/Slack/Teams/CLI",
      color: "text-blue-400"
    },
    {
      icon: <Bot className="h-6 w-6" />,
      title: "BiasShield Listener",
      description: "Webhook or bot receives message",
      color: "text-purple-400"
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "Text Pipeline",
      description: "Preprocessing, bias detection, toxicity classification",
      color: "text-gray-400"
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Response Generator",
      description: "AI generates bias explanation and suggestions",
      color: "text-pink-400"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Chat Reply",
      description: "Bot responds with flag + suggestion",
      color: "text-red-400"
    }
  ];

  const biasTypes = [
    {
      type: "Groupthink Bias",
      description: "Assuming consensus without considering dissenting views or alternative perspectives",
      example: "Examples: \"Everyone agrees with this\", \"We all think the same way\"",
      severity: "medium",
      confidence: "85%",
      icon: <Users className="h-4 w-4" />
    },
    {
      type: "Anchoring Bias",
      description: "Relying too heavily on first piece of information when making decisions",
      example: "Examples: \"My first impression is...\", \"I started with this assumption\"",
      severity: "low",
      confidence: "75%",
      icon: <Target className="h-4 w-4" />
    },
    {
      type: "Gender/Cultural Bias",
      description: "Making broad generalizations based on identity characteristics, cultural background, or demographics",
      example: "Examples: \"Males are more responsible\", \"Women are emotional\"",
      severity: "high",
      confidence: "95%",
      icon: <Users className="h-4 w-4" />
    },
    {
      type: "Toxic Tone",
      description: "Using emotionally charged, offensive, or unprofessional language",
      example: "Examples: \"This is stupid\", \"That's ridiculous\"",
      severity: "high",
      confidence: "90%",
      icon: <AlertTriangle className="h-4 w-4" />
    },
    {
      type: "Confirmation Bias",
      description: "Seeking information that confirms existing beliefs while ignoring contradictory evidence",
      example: "Examples: \"Proves my point\", \"As expected\"",
      severity: "medium",
      confidence: "80%",
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      type: "Stereotyping Bias",
      description: "Applying broad generalizations to entire groups of people",
      example: "Examples: \"All engineers are...\", \"Every manager is...\"",
      severity: "high",
      confidence: "95%",
      icon: <AlertCircle className="h-4 w-4" />
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted/10 text-muted-foreground border-border';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <AlertCircle className="h-4 w-4" />;
      case 'low': return <CheckCircle className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <motion.section
      id="bias-engine"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced AI-powered system architecture for real-time bias detection</h2>
        </motion.div>

        {/* System Architecture Flow */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">System Architecture Flow</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {systemFlow.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <Card className="h-full border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 ${step.color}`}>
                      {step.icon}
                    </div>
                    <h4 className="font-semibold mb-2">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Core Bias Detection Types */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Core Bias Detection Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {biasTypes.map((bias, index) => (
              <motion.div
                key={bias.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
              >
                <Card className="h-full border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg text-primary">
                          {bias.icon}
                        </div>
                        <h4 className="font-semibold">{bias.type}</h4>
                      </div>
                      <Badge variant="outline" className={getSeverityColor(bias.severity)}>
                        {getSeverityIcon(bias.severity)}
                        <span className="ml-1">{bias.severity}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{bias.description}</p>
                    <p className="text-xs text-muted-foreground mb-3">{bias.example}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        <Zap className="h-3 w-3 mr-1" />
                        {bias.confidence} confidence
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Implementation */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Technical Implementation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-5 w-5 mr-2 text-primary" />
                  Pattern Recognition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Advanced regex patterns and keyword matching for 6 bias types with configurable confidence thresholds.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-muted p-2 rounded">
                    <code>confidence += pattern.test(text) ? 0.3 : 0</code>
                  </div>
                  <div className="bg-muted p-2 rounded">
                    <code>confidence += keywordMatch ? 0.2 : 0</code>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Cpu className="h-5 w-5 mr-2 text-primary" />
                  Context Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  NLP-based context scoring using linguistic indicators and semantic analysis.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-muted p-2 rounded">
                    <code>contextScore = analyzeContext(text, biasType)</code>
                  </div>
                  <div className="bg-muted p-2 rounded">
                    <code>confidence += contextScore * 0.3</code>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-primary" />
                  Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Multi-factor risk calculation combining bias severity, toxicity scores, and confidence levels.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-muted p-2 rounded">
                    <code>overallRisk = calculateRisk(biases, toxicityScore)</code>
                  </div>
                  <div className="bg-muted p-2 rounded">
                    <code>severity = (confidence + baseSeverity) / 2</code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Performance Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">1,247</div>
                <p className="text-sm text-muted-foreground">Total Analyses</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">87%</div>
                <p className="text-sm text-muted-foreground">Average Confidence</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">800ms</div>
                <p className="text-sm text-muted-foreground">Avg Processing Time</p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">6</div>
                <p className="text-sm text-muted-foreground">Bias Types Detected</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Integration Capabilities */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8">Integration Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Network className="h-5 w-5 mr-2 text-primary" />
                  Real-time Processing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  WebSocket-based real-time analysis with sub-second response times for live chat applications.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-muted p-2 rounded">
                    <code>const analysis = await biasDetectionService.analyzeText(text)</code>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  API Endpoints
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  RESTful API with comprehensive bias analysis, toxicity scoring, and recommendation generation.
                </p>
                <div className="space-y-2 text-xs">
                  <div className="bg-muted p-2 rounded">
                    <code>POST /api/analyze - Text bias analysis</code>
                  </div>
                  <div className="bg-muted p-2 rounded">
                    <code>GET /api/stats - System statistics</code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BiasDetectionEngine;
