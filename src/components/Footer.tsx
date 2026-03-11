import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Mail, Phone, MapPin, Heart, Sparkles, ArrowRight, 
  Shield, Award, Clock, Star 
} from "lucide-react";
import logo from "../assets/braidlink-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { label: "Hairstyles", to: "/hairstyles" },
      { label: "Find a Stylist", to: "/find-stylist" },
      { label: "Pricing", to: "/pricing" },
      { label: "Become a Stylist", to: "/become-stylist" },
    ],
    support: [
      { label: "FAQ", to: "/faq" },
      { label: "Contact Us", to: "/contact" },
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms of Service", to: "/terms-of-service" },
    ],
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  return (
    <footer className="bg-gradient-to-b from-primary to-primary/95 text-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/8 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute inset-0 opacity-5" 
             style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Brand Section with Trust Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 pb-10 border-b border-white/10"
        >
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-5 group">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="relative"
              >
                <img src={logo} alt="BraidLink" className="h-14 w-auto brightness-0 invert drop-shadow-lg" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute inset-0 bg-accent/30 rounded-full blur-xl -z-10"
                />
              </motion.div>
              <div className="flex flex-col text-left">
                <span className="font-brand text-2xl font-bold leading-tight tracking-tight">
                  BraidLink
                </span>
                <span className="font-tagline text-xs opacity-70 leading-tight flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-accent" />
                  Afro Hair Braiding
                </span>
              </div>
            </div>
            
            <p className="text-sm opacity-80 leading-relaxed max-w-2xl mx-auto font-brand mb-8">
              Connecting you with talented hair braiding professionals in your area. 
              Beautiful styles, trusted stylists, and seamless booking.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: Shield, text: "Secure Booking" },
                { icon: Award, text: "Verified Stylists" },
                { icon: Clock, text: "24/7 Support" },
                { icon: Star, text: "4.9 ★ Rating" },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-xs border border-white/20"
                >
                  <badge.icon className="w-3.5 h-3.5 text-accent" />
                  <span>{badge.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Links Grid - Centered with better spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 max-w-5xl mx-auto">
          {/* Explore */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center md:text-left"
          >
            <h4 className="font-brand font-semibold text-lg mb-5 text-accent flex items-center justify-center md:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Explore
            </h4>
            <div className="space-y-3">
              {footerLinks.explore.map((link, i) => (
                <motion.div
                  key={link.to}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                >
                  <Link 
                    to={link.to} 
                    className="text-sm opacity-70 hover:opacity-100 hover:translate-x-2 transition-all inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-left"
          >
            <h4 className="font-brand font-semibold text-lg mb-5 text-accent flex items-center justify-center md:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Support
            </h4>
            <div className="space-y-3">
              {footerLinks.support.map((link, i) => (
                <motion.div
                  key={link.to}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                >
                  <Link 
                    to={link.to} 
                    className="text-sm opacity-70 hover:opacity-100 hover:translate-x-2 transition-all inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact - Split into two columns on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <h4 className="font-brand font-semibold text-lg mb-5 text-accent flex items-center justify-center lg:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email & Phone */}
              <div className="space-y-4">
                <motion.div 
                  custom={0}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center justify-center md:justify-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-sm opacity-80 group-hover:opacity-100">support@braidlink.com</span>
                </motion.div>
                
                <motion.div 
                  custom={1}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center justify-center md:justify-start gap-3 group"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-sm opacity-80 group-hover:opacity-100">(555) 987-6543</span>
                </motion.div>
              </div>

              {/* Address */}
              <motion.div 
                custom={2}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="flex items-center justify-center md:justify-start gap-3 group"
              >
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-sm opacity-80 group-hover:opacity-100 leading-relaxed">
                  123 Beauty Lane, Suite 200<br />
                  New York, NY 10001
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm opacity-70"
        >
          <p className="text-xs flex items-center gap-2">
            <Heart className="w-3 h-3 text-accent" />
            © {currentYear} BraidLink. All rights reserved. Made with love for braiding.
          </p>
          
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-xs hover:text-accent hover:opacity-100 transition-all hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link to="/terms-of-service" className="text-xs hover:text-accent hover:opacity-100 transition-all hover:underline underline-offset-4">
              Terms
            </Link>
            <Link to="/contact" className="text-xs hover:text-accent hover:opacity-100 transition-all hover:underline underline-offset-4">
              Contact
            </Link>
           
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;