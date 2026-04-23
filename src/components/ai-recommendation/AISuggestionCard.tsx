import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, RefreshCw, ArrowRight, ShieldCheck, Star, Clock, Sparkles, AlertCircle, Heart, Thermometer, Droplets, Zap, Info } from 'lucide-react';
import { mockStyleSuggestion } from '@/data/ai-data';
import AIHealthReportCard from './AIHealthReportCard';

// --- AISuggestionCard Component ---
const AISuggestionCard = ({ onAccept, onTryAnother }: { onAccept: () => void; onTryAnother: () => void; }) => {
  const [isHoveringAccept, setIsHoveringAccept] = useState(false);
  const [isHoveringTry, setIsHoveringTry] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs font-medium text-accent">AI Analysis Complete</span>
        </div>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">
          Your Personalized Style Match
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Based on your photos and preferences, our AI has found the perfect style for you
        </p>
      </motion.div>

      {/* Main Content Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid lg:grid-cols-2 gap-6 md:gap-8"
      >
        {/* Left side: Style Suggestion Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {/* Image Container */}
          <div className="relative group">
            <div className="relative overflow-hidden">
              <img 
                src={mockStyleSuggestion.image} 
                alt={mockStyleSuggestion.name} 
                className="w-full h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            {/* Safety Badge */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
            >
              <ShieldCheck size={14} className="text-green-400" />
              <span>{mockStyleSuggestion.safety}</span>
            </motion.div>

            {/* Confidence Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
            >
              <Star size={12} className="text-yellow-400" />
              <span>AI Confidence: {mockStyleSuggestion.confidence}%</span>
            </motion.div>
          </div>

          {/* Style Details */}
          <div className="p-5 md:p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-primary mb-1">
                  {mockStyleSuggestion.name}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Zap size={14} className="text-accent" />
                    Tension: <strong className="text-primary">{mockStyleSuggestion.tension}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="text-accent" />
                    Duration: <strong className="text-primary">{mockStyleSuggestion.duration / 60} hrs</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Care Note */}
            <div className="bg-accent/5 border border-accent/10 rounded-xl p-4 my-4">
              <div className="flex items-start gap-2">
                <Heart size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <p className="text-sm text-primary/80 leading-relaxed">{mockStyleSuggestion.careNote}</p>
              </div>
            </div>

            {/* Price Card */}
            <div className="flex items-center justify-between bg-gradient-to-r from-muted/50 to-transparent p-4 rounded-xl border border-border/30">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Estimated Price</p>
                <p className="text-2xl md:text-3xl font-bold text-primary">£{mockStyleSuggestion.price}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Includes</p>
                <p className="text-sm font-medium text-primary">Consultation & Style</p>
              </div>
            </div>

            {/* Additional Features */}
            <div className="flex flex-wrap gap-3 mt-4 pt-2 border-t border-border/30">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Check size={12} className="text-green-500" />
                <span>Color Analysis</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Check size={12} className="text-green-500" />
                <span>Face Shape Match</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Check size={12} className="text-green-500" />
                <span>Hair Texture Analysis</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side: Health Report & Actions */}
        <motion.div
          variants={itemVariants}
          className="space-y-6"
        >
          {/* Health Report Card */}
          <div className="transform transition-all duration-300 hover:translate-y-[-2px]">
            <AIHealthReportCard />
          </div>

          {/* Action Buttons */}
          <div className="bg-card rounded-2xl border border-border/50 p-5 md:p-6 shadow-lg">
            <p className="text-sm text-muted-foreground text-center mb-4">
              Ready to transform your look?
            </p>
            
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setIsHoveringTry(true)}
                onHoverEnd={() => setIsHoveringTry(false)}
                onClick={onTryAnother}
                className="relative overflow-hidden group bg-muted/50 border border-border/50 text-primary font-semibold inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl hover:bg-muted/80 transition-all duration-300"
              >
                <motion.div
                  animate={{ rotate: isHoveringTry ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <RefreshCw size={18} />
                </motion.div>
                <span>Try Another</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setIsHoveringAccept(true)}
                onHoverEnd={() => setIsHoveringAccept(false)}
                onClick={onAccept}
                className="relative overflow-hidden group bg-gradient-to-r from-accent to-accent/80 text-primary font-semibold inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span>Accept Suggestion</span>
                <motion.div
                  animate={{ x: isHoveringAccept ? 5 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight size={18} />
                </motion.div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </motion.button>
            </div>

            {/* Info note */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 pt-3 border-t border-border/30 flex items-center justify-center gap-2"
            >
              <Info size={12} className="text-muted-foreground" />
              <p className="text-xs text-muted-foreground text-center">
                You can review and adjust your selection before booking
              </p>
            </motion.div>
          </div>

          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-4 text-xs text-muted-foreground"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-accent" />
              <span>Privacy Guaranteed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <span>Cancel Anytime</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AISuggestionCard;