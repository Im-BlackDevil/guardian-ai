import { motion } from "framer-motion";
import { Users, Award, Target, Globe, Heart, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutSection = () => {
  const stats = [
    { icon: Users, value: "500+", label: "Teams Protected" },
    { icon: Award, value: "15+", label: "Bias Types Detected" },
    { icon: Target, value: "95%", label: "Accuracy Rate" },
    { icon: Globe, value: "25+", label: "Countries Served" }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "AI Research Lead",
      bio: "PhD in Computational Linguistics, 10+ years in bias detection algorithms"
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Director",
      bio: "Former Google PM, passionate about inclusive technology"
    },
    {
      name: "Priya Patel",
      role: "UX Research Lead",
      bio: "Specialist in ethical AI design and user experience"
    }
  ];

  return (
    <motion.section
      id="about"
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
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About BiasShield AI</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to create more inclusive and objective team communications 
            through advanced AI-powered bias detection technology.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <Card className="shadow-card border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-8 text-center">
              <Heart className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                To empower teams with the tools they need to communicate more objectively, 
                reduce unconscious bias, and create inclusive environments where everyone's 
                voice can be heard without prejudice or discrimination.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 shadow-card">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Meet Our Team</h3>
            <p className="text-muted-foreground">
              Experts in AI, linguistics, and inclusive technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
              >
                <Card className="shadow-card hover:shadow-elevated transition-all duration-300 text-center">
                  <CardContent className="p-6">
                    <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-10 w-10 text-primary" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">{member.name}</h4>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">Our Values</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-center"
            >
              <div className="bg-success/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-success" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Accuracy</h4>
              <p className="text-muted-foreground">
                We prioritize precision in bias detection to ensure reliable results
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="text-center"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Inclusivity</h4>
              <p className="text-muted-foreground">
                Every team member deserves to be heard without bias or discrimination
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="text-center"
            >
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-accent" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Innovation</h4>
              <p className="text-muted-foreground">
                Continuously advancing AI technology to better serve our mission
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
