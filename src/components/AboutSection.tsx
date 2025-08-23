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
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">About BiasShield AI</h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            We're on a mission to create more inclusive and objective team communications 
            through advanced AI-powered bias detection technology.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 sm:mb-16"
        >
          <Card className="shadow-card border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-6 sm:p-8 text-center">
              <Heart className="h-12 w-12 sm:h-16 sm:w-16 text-primary mx-auto mb-4 sm:mb-6" />
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Mission</h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
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
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              className="text-center"
            >
              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6 shadow-card">
                <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-2 sm:mb-3" />
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Our Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <Card className="h-full border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-semibold mb-2">{member.name}</h4>
                    <p className="text-sm sm:text-base text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
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
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Our Values</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Zap,
                title: "Innovation",
                description: "Continuously advancing AI technology to detect and prevent bias in real-time."
              },
              {
                icon: Heart,
                title: "Inclusivity",
                description: "Creating environments where everyone feels valued and heard."
              },
              {
                icon: Target,
                title: "Accuracy",
                description: "Providing reliable and precise bias detection with minimal false positives."
              },
              {
                icon: Globe,
                title: "Global Impact",
                description: "Making bias-free communication accessible to teams worldwide."
              },
              {
                icon: Award,
                title: "Excellence",
                description: "Maintaining the highest standards in AI ethics and performance."
              },
              {
                icon: Users,
                title: "Collaboration",
                description: "Working together with teams to create better communication practices."
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
              >
                <Card className="h-full border-primary/20 bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg mb-3 sm:mb-4 text-primary">
                      <value.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold mb-2">{value.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
