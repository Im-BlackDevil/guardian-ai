import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Shield, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Navigation = () => {
  const location = useLocation();
  
  const navigationItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Real-Time Bot", path: "/realtime-bot" },
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

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="h-8 w-8 text-primary" />
            </motion.div>
            <span className="text-xl font-bold">BiasShield AI</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side - Bias Counter */}
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
            >
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                33 biases detected
              </Badge>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;