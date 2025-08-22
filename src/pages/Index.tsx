import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
