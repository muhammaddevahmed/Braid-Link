import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Mail, Phone, MapPin, Heart, Sparkles, ArrowRight, 
  Shield, Award, Clock, Star, CheckCircle, Zap
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
    <footer className="bg-gradient-to-b from-primary to-primary/95 text-white relative overflow-hidden">
      {/* Animated Background Elements - Refined */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/8 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Brand Section with Trust Badges - Premium redesign */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 pb-12 border-b border-white/10"
        >
          <div className="flex flex-col items-center text-center">
            {/* Logo - BIGGER as requested */}
            <div className="flex items-center gap-4 mb-5 group">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="relative"
              >
                <img src={logo} alt="BraidLink" className="h-20 w-auto brightness-0 invert drop-shadow-2xl" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0, 0.4, 0]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-accent/30 rounded-full blur-2xl -z-10"
                />
                
                {/* Decorative sparkle */}
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-3 -right-3"
                >
                  <Sparkles className="w-5 h-5 text-accent" />
                </motion.div>
              </motion.div>
              
              <div className="flex flex-col text-left">
                <span className="font-brand text-3xl font-bold leading-tight tracking-tight text-white">
                  BraidLink
                </span>
                <span className="font-tagline text-sm text-white/70 leading-tight flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  Premium Afro Hair Braiding
                </span>
              </div>
            </div>
            
            <p className="text-white/80 text-base leading-relaxed max-w-2xl mx-auto font-light mb-10">
              Connecting you with talented hair braiding professionals in your area. 
              Beautiful styles, trusted stylists, and seamless booking.
            </p>

            {/* Trust Badges - Premium redesign */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: Shield, text: "Secure Booking", color: "from-blue-500/20 to-blue-500/5" },
                { icon: Award, text: "Verified Stylists", color: "from-purple-500/20 to-purple-500/5" },
                { icon: Clock, text: "24/7 Support", color: "from-green-500/20 to-green-500/5" },
                { icon: Star, text: "4.9 ★ Rating", color: "from-amber-500/20 to-amber-500/5" },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full text-xs border border-white/20 hover:bg-white/15 transition-all hover:scale-105"
                >
                  <badge.icon className="w-3.5 h-3.5 text-accent" />
                  <span className="text-white/90">{badge.text}</span>
                  <CheckCircle className="w-3 h-3 text-accent/70" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Links Grid - Premium redesign */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16 max-w-6xl mx-auto">
          {/* Explore */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center md:text-left"
          >
            <h4 className="font-serif font-semibold text-lg mb-6 text-accent flex items-center justify-center md:justify-start gap-2">
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
                    className="text-white/70 hover:text-white text-sm transition-all inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
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
            <h4 className="font-serif font-semibold text-lg mb-6 text-accent flex items-center justify-center md:justify-start gap-2">
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
                    className="text-white/70 hover:text-white text-sm transition-all inline-flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact - Split into two columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <h4 className="font-serif font-semibold text-lg mb-6 text-accent flex items-center justify-center lg:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Contact Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Email & Phone */}
              <div className="space-y-4">
                <motion.div 
                  custom={0}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center justify-center md:justify-start gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-accent/20 transition-all border border-white/10 group-hover:border-accent/30">
                    <Mail className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-white/80 group-hover:text-white text-sm transition-colors">support@braidlink.com</span>
                </motion.div>
                
                <motion.div 
                  custom={1}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center justify-center md:justify-start gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-accent/20 transition-all border border-white/10 group-hover:border-accent/30">
                    <Phone className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-white/80 group-hover:text-white text-sm transition-colors">(555) 987-6543</span>
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
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-accent/20 transition-all border border-white/10 group-hover:border-accent/30">
                  <MapPin className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                </div>
                <span className="text-white/80 group-hover:text-white text-sm leading-relaxed">
                  123 Beauty Lane, Suite 200<br />
                  New York, NY 10001
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar - Premium redesign */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-white/60 flex items-center gap-2">
            <Heart className="w-3.5 h-3.5 text-accent" />
            © {currentYear} BraidLink. All rights reserved. Made with love for braiding.
          </p>
          
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-xs text-white/60 hover:text-accent transition-all hover:underline underline-offset-4">
              Privacy
            </Link>
            <Link to="/terms-of-service" className="text-xs text-white/60 hover:text-accent transition-all hover:underline underline-offset-4">
              Terms
            </Link>
            <Link to="/contact" className="text-xs text-white/60 hover:text-accent transition-all hover:underline underline-offset-4">
              Contact
            </Link>
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <Zap className="w-3.5 h-3.5 text-accent" />
          </div>
        </motion.div>

        {/* Decorative bottom line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent"
        />
      </div>
    </footer>
  );
};

export default Footer;