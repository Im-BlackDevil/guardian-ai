import { motion } from "framer-motion";
import { MessageSquare, Users, GitBranch, Video, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TeamCollaborationIntegrations = () => {
  const integrations = [
    {
      icon: MessageSquare,
      name: "Slack",
      description: "How BiasShield helps reduce bias in Slack",
      details: "Real-time detection of biased language in channels, direct messages, and thread discussions.",
      gradient: "from-green-500/20 to-green-600/20",
      iconColor: "text-green-400"
    },
    {
      icon: Users,
      name: "Microsoft Teams",
      description: "How BiasShield helps reduce bias in Microsoft Teams",
      details: "Monitor meeting transcripts and chat conversations for unconscious bias patterns.",
      gradient: "from-blue-500/20 to-blue-600/20",
      iconColor: "text-blue-400"
    },
    {
      icon: GitBranch,
      name: "GitHub",
      description: "How BiasShield helps reduce bias in GitHub",
      details: "Analyze code reviews, pull request comments, and issue discussions for inclusive language.",
      gradient: "from-purple-500/20 to-purple-600/20",
      iconColor: "text-purple-400"
    },
    {
      icon: Video,
      name: "Zoom",
      description: "How BiasShield helps reduce bias in Zoom",
      details: "Post-meeting analysis of transcripts to identify bias patterns in video conferences.",
      gradient: "from-indigo-500/20 to-indigo-600/20",
      iconColor: "text-indigo-400"
    }
  ];

  return (
    <section id="integrations" className="py-24 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Team Collaboration Integrations
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Seamlessly integrate BiasShield into your existing workflow to create more inclusive team communications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Card className="relative overflow-hidden border border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${integration.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <CardHeader className="relative z-10 text-center pb-4">
                  <div className="bg-card/80 w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <integration.icon className={`h-8 w-8 ${integration.iconColor}`} />
                  </div>
                  <CardTitle className="text-lg font-semibold mb-2">{integration.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {integration.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 pt-0">
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {integration.details}
                  </p>
                  
                  <motion.div 
                    className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: 5 }}
                  >
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-6">
            Don't see your platform? We're constantly adding new integrations.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary hover:bg-primary/20 transition-colors duration-300"
          >
            Request Integration
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamCollaborationIntegrations;