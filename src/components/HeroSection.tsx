import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Bot, TrendingUp, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const HeroSection = () => {
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

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5" />
      
      <div className="relative container mx-auto max-w-7xl">
        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-8"
          >
            <Shield className="h-10 w-10 text-primary" />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BiasShield AI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            Transform your team communications with AI-powered bias detection. 
            Create more inclusive, objective, and productive work environments.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/realtime-bot">
              <Button size="lg" className="text-lg px-8 py-6">
                Try Live Demo
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                View Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
            >
              <Card className="h-full border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
          className="text-center"
        >
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 p-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Team?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join hundreds of teams already using BiasShield AI to create more inclusive 
              and objective communication environments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/integrations">
                <Button variant="outline" size="lg">
                  Explore Integrations
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;