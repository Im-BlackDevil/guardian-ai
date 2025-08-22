import { motion } from "framer-motion";
import ReportsSection from "@/components/ReportsSection";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const ReportsPage = () => {
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
            <ReportsSection />
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ReportsPage;
