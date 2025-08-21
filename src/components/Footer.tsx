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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Tagline */}
          <motion.div
            className="flex flex-col md:flex-row items-center mb-6 md:mb-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center space-x-2 mb-2 md:mb-0 md:mr-4">
              <div className="relative">
                <Shield className="h-6 w-6 text-primary" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                BiasShield AI
              </span>
            </div>
            <div className="text-sm text-muted-foreground text-center md:text-left">
              Empowering objective decision-making through AI
            </div>
          </motion.div>

          {/* Links */}
          <div className="flex items-center space-x-8">
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
                <link.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{link.name}</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-border my-8"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />

        {/* Copyright and Version */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="mb-2 md:mb-0">
            © {currentYear} BiasShield AI. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <span>Version 1.0.0</span>
            <span>•</span>
            <span>Built for Hackathon</span>
            <span>•</span>
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