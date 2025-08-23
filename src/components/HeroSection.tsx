import { motion } from "framer-motion";
import { Shield, Bot, TrendingUp, Users, Zap, Upload, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import RealTimeBiasBot from "./RealTimeBiasBot";

const HeroSection = () => {
  const [showDemo, setShowDemo] = useState(false);

  const features = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: "AI-Powered Detection",
      description: "Advanced machine learning algorithms detect biases in real-time across multiple communication channels."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Real-Time Analytics",
      description: "Monitor bias patterns and track improvement metrics with comprehensive dashboards and reports."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Integration",
      description: "Seamlessly integrate with Slack, Teams, Discord, and other collaboration platforms."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Feedback",
      description: "Get immediate suggestions and explanations to improve communication inclusivity."
    }
  ];

  // Force complete re-render by using different keys
  if (showDemo) {
    return (
      <div key="demo-mode">
        <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5" />
          
          <div className="relative container mx-auto max-w-7xl">
            {/* Demo Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6 sm:mb-8"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center mb-4 sm:mb-6 gap-3">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <h2 className="text-2xl sm:text-3xl font-bold">Live Bias Detection Demo</h2>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowDemo(false)}
                className="flex items-center gap-2 w-full sm:w-auto"
              >
                <X className="h-4 w-4" />
                Back to Home
              </Button>
            </motion.div>

            {/* Real-Time Bot Component */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <RealTimeBiasBot />
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  // Landing page - NO BOT HERE
  return (
    <div key="landing-page">
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5" />
        
        <div className="relative container mx-auto max-w-7xl">
          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full mb-6 sm:mb-8"
            >
              <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
            </motion.div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 px-2">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Protect Your Team from Hidden Biases
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-4">
              Real-time AI detection of cognitive biases and toxic patterns in team communications
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto">
                <Upload className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Upload Text / Document
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
                onClick={() => setShowDemo(true)}
              >
                <Play className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Try Live Demo
              </Button>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16 px-2"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
              >
                <Card className="h-full border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg mb-3 sm:mb-4 text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-center px-4"
          >
            <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
                Ready to Transform Your Team?
              </h2>
              <p className="text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
                Join hundreds of teams already using BiasShield AI to create more inclusive 
                and objective communication environments.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Integrations
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;