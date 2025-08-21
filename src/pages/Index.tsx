import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import BiasDetectionResults from "@/components/BiasDetectionResults";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import InsightsPanel from "@/components/InsightsPanel";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <Navigation />
      
      <main>
        <HeroSection />
        <BiasDetectionResults />
        <AnalyticsDashboard />
        <InsightsPanel />
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default Index;
