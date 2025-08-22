import { motion } from "framer-motion";
import { Brain, Cpu, Database, Zap, Code, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const BiasDetectionEngine = () => {
  const biasTypes = [
    {
      name: "Groupthink Bias",
      description: "Assuming consensus without considering dissenting views",
      examples: [
        "Everyone agrees with this",
        "We all think the same way",
        "Nobody disagrees, so let's proceed"
      ],
      severity: "medium",
      detection: "Pattern matching + context analysis"
    },
    {
      name: "Anchoring Bias",
      description: "Relying too heavily on first piece of information",
      examples: [
        "My first impression is...",
        "I started with this assumption",
        "Based on the initial data..."
      ],
      severity: "low",
      detection: "Temporal sequence analysis"
    },
    {
      name: "Gender/Cultural Bias",
      description: "Making assumptions based on identity characteristics",
      examples: [
        "This guy is from IIT, he'll be better",
        "She's a woman, so she'll be more empathetic",
        "Given his cultural background..."
      ],
      severity: "high",
      detection: "Identity marker identification"
    },
    {
      name: "Toxic/Offensive Tone",
      description: "Using emotionally charged or offensive language",
      examples: [
        "This is absolutely terrible",
        "That's stupid and ridiculous",
        "I hate this approach"
      ],
      severity: "high",
      detection: "Sentiment analysis + toxicity scoring"
    }
  ];

  const techStack = [
    {
      category: "Frontend (Demo Layer)",
      items: ["Discord Bot", "Slack Bot", "Web-based Chat UI", "React Components"]
    },
    {
      category: "Backend",
      items: ["Node.js", "Python (Flask/FastAPI)", "WebSocket connections", "REST API endpoints"]
    },
    {
      category: "AI/ML Layer",
      items: ["OpenAI GPT-4/5", "LLaMA2", "Custom bias detection prompts", "Toxicity classification"]
    },
    {
      category: "Database",
      items: ["MongoDB", "Supabase", "Conversation storage", "Bias analytics"]
    }
  ];

  const systemFlow = [
    {
      step: 1,
      title: "User Chat",
      description: "Message sent in Discord/Slack/Teams/CLI",
      icon: "💬"
    },
    {
      step: 2,
      title: "BiasShield Listener",
      description: "Webhook or bot receives message",
      icon: "🤖"
    },
    {
      step: 3,
      title: "Text Pipeline",
      description: "Preprocessing, bias detection, toxicity classification",
      icon: "⚙️"
    },
    {
      step: 4,
      title: "Response Generator",
      description: "AI generates bias explanation and suggestions",
      icon: "🧠"
    },
    {
      step: 5,
      title: "Chat Reply",
      description: "Bot responds with flag + suggestion",
      icon: "📤"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive/10 text-destructive border-destructive/20";
      case "medium": return "bg-warning/10 text-warning border-warning/20";
      case "low": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted/10 text-muted-foreground border-border";
    }
  };

  return (
    <motion.section
      id="bias-engine"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/20"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bias Detection Engine</h2>
          <p className="text-xl text-muted-foreground">
            Advanced AI-powered system architecture for real-time bias detection
          </p>
        </motion.div>

        {/* System Flow */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">System Architecture Flow</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {systemFlow.map((flow, index) => (
              <motion.div
                key={flow.step}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <Card className="shadow-card h-full">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-3">{flow.icon}</div>
                    <div className="text-sm font-semibold mb-2">{flow.title}</div>
                    <div className="text-xs text-muted-foreground">{flow.description}</div>
                  </CardContent>
                </Card>
                {index < systemFlow.length - 1 && (
                  <div className="hidden md:block mt-4 text-center">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      className="w-full h-0.5 bg-primary/30 origin-left"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bias Types */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Core Bias Detection Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {biasTypes.map((bias, index) => (
              <motion.div
                key={bias.name}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card className="shadow-card hover:shadow-elevated transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{bias.name}</CardTitle>
                      <Badge className={`text-xs ${getSeverityColor(bias.severity)}`}>
                        {bias.severity} severity
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{bias.description}</p>
                    
                    <div>
                      <div className="text-xs font-semibold mb-2 text-primary">Examples:</div>
                      <div className="space-y-2">
                        {bias.examples.map((example, idx) => (
                          <div key={idx} className="text-xs bg-muted/50 p-2 rounded border-l-2 border-primary/30">
                            "{example}"
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs font-semibold mb-2 text-accent">Detection Method:</div>
                      <div className="text-xs text-muted-foreground">{bias.detection}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Technology Stack</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.category}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                <Card className="shadow-card h-full">
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      {index === 0 && <Code className="h-4 w-4 mr-2 text-primary" />}
                      {index === 1 && <Cpu className="h-4 w-4 mr-2 text-primary" />}
                      {index === 2 && <Brain className="h-4 w-4 mr-2 text-primary" />}
                      {index === 3 && <Database className="h-4 w-4 mr-2 text-primary" />}
                      {tech.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {tech.items.map((item, idx) => (
                        <div key={idx} className="text-sm text-muted-foreground flex items-center">
                          <div className="w-2 h-2 bg-primary/50 rounded-full mr-2" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* LLM Prompt Example */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">AI Bias Detection Logic</h3>
          <Card className="shadow-card border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-primary" />
                    LLM Prompt Example
                  </h4>
                  <div className="bg-card/80 border border-border rounded-lg p-4 font-mono text-sm">
                    <div className="text-primary mb-2">// BiasShield AI Prompt</div>
                    <div className="text-muted-foreground">
                      You are a BiasShield AI. Given the statement, identify if it contains:
                      <br />• Groupthink
                      <br />• Anchoring bias  
                      <br />• Gender/Cultural bias
                      <br />• Toxic/offensive tone
                      <br /><br />
                      If bias detected → explain it in &lt;20 words + suggest a neutral reframe.
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-primary" />
                    Example Input/Output
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold mb-2">Input:</div>
                      <div className="bg-muted p-3 rounded text-sm">
                        "Everyone agrees with him, let's finalize this."
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold mb-2">Output:</div>
                      <div className="bg-success/10 border border-success/20 p-3 rounded text-sm">
                        <div className="text-destructive font-medium">• Detected: Groupthink bias</div>
                        <div className="text-success mt-1">• Suggestion: "Consider other viewpoints before finalizing, it may improve results."</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>


      </div>
    </motion.section>
  );
};

export default BiasDetectionEngine;
