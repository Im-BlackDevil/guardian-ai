import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Shield, TrendingUp, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigationItems = [
    { name: "Dashboard", path: "/dashboard" },
    // { name: "Real-Time Bot", path: "/realtime-bot" },
    { name: "Bias Engine", path: "/bias-engine" },
    { name: "Integrations", path: "/integrations" },
    { name: "Reports", path: "/reports" },
    { name: "About", path: "/about" },
    { name: "Settings", path: "/settings" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo - More compact */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </motion.div>
            <span className="text-lg sm:text-xl font-bold">Guardian AI Suite</span>
          </Link>

          {/* Desktop Navigation Links - More compact */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-2 sm:px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Bias Counter & Mobile Menu Button - More compact */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Bias Counter - Hidden on very small screens */}
            <div className="hidden sm:block">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
              >
                <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  33 biases detected
                </Badge>
              </motion.div>
            </div>

            {/* Mobile Menu Button - More compact */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-1.5 sm:p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu - More compact */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border bg-card/95 backdrop-blur-md"
          >
            <div className="py-3 sm:py-4 space-y-1 sm:space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base font-medium transition-all duration-200 rounded-md mx-2 ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Bias Counter - More compact */}
              <div className="px-3 sm:px-4 py-2 sm:py-3">
                <Badge variant="outline" className="bg-success/10 text-success border-success/20 w-full justify-center text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  33 biases detected
                </Badge>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;