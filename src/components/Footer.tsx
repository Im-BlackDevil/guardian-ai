import { motion } from "framer-motion";
import { Shield, Github, Mail, FileText } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Privacy Policy", href: "#privacy", icon: FileText },
    { name: "Contact", href: "#contact", icon: Mail },
    { name: "GitHub", href: "#github", icon: Github },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="border-t border-border bg-card/50 backdrop-blur-sm"
    >
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Tagline - More compact */}
          <motion.div
            className="flex flex-col md:flex-row items-center mb-4 sm:mb-6 md:mb-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center space-x-2 mb-2 md:mb-0 md:mr-4">
              <div className="relative">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
              </div>
              <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                BiasShield AI
              </span>
            </div>
            <div className="text-xs sm:text-sm text-muted-foreground text-center md:text-left">
              Empowering objective decision-making through AI
            </div>
          </motion.div>

          {/* Links - More compact spacing */}
          <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-8">
            {footerLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <link.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm font-medium">{link.name}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider - More compact */}
        <motion.div
          className="border-t border-border my-4 sm:my-6 lg:my-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        {/* Copyright and Version - More compact */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between text-xs sm:text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="mb-2 md:mb-0 text-center md:text-left">
            © {currentYear} BiasShield AI. All rights reserved.
          </div>
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 text-center">
            <span>Version 1.0.0</span>
            <span className="hidden sm:inline">•</span>
            <span>Built for Hackathon</span>
            <span className="hidden sm:inline">•</span>
            <motion.span
              className="text-primary"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ● Live
            </motion.span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;