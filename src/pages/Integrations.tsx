import { motion } from "framer-motion";
import TeamCollaborationIntegrations from "@/components/TeamCollaborationIntegrations";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const IntegrationsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Integrations</h1>
              <p className="text-xl text-muted-foreground">
                Seamlessly integrate BiasShield into your existing workflow
              </p>
            </motion.div>
            
            <TeamCollaborationIntegrations />
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default IntegrationsPage;
