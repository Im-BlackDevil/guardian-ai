import { motion } from "framer-motion";
import { Upload, Zap, Brain, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import heroBackground from "@/assets/hero-background.jpg";

const HeroSection = () => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
    }, 2000);
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Detection",
      description: "Advanced algorithms identify 15+ types of cognitive bias"
    },
    {
      icon: Target,
      title: "Precision Analysis",
      description: "Get detailed confidence scores and bias breakdowns"
    },
    {
      icon: Zap,
      title: "Real-time Results",
      description: "Instant feedback with actionable improvement suggestions"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="AI Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 gradient-hero" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Tagline */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-300% animate-pulse-slow">
              Protect Your Team from Hidden Biases.
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Real-time AI detection of cognitive biases and toxic patterns in team communications.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={handleUpload}
              disabled={isUploading}
              size="lg"
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-elevated hover:shadow-elevated hover:scale-105 transition-all duration-300"
            >
              {isUploading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <Zap className="h-5 w-5" />
                  </motion.div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Text / Document
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
              <Target className="mr-2 h-5 w-5" />
              Try Live Demo
            </Button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-card hover:shadow-elevated transition-all duration-300"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;