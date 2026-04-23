import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  Sparkles, 
  Clock, 
  DollarSign, 
  Shield, 
  Heart, 
  Star,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { mockStyleSuggestion } from '@/data/ai-data';

const SelectedAIStyleDetails = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto mb-8 px-4 sm:px-0"
    >
      <div className="relative group">
        {/* Decorative glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative bg-card rounded-2xl border border-border/50 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
          
          {/* Main Content */}
          <div className="p-4 md:p-5">
            <div className="flex flex-col sm:flex-row gap-4">
              
              {/* Image Section */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="relative flex-shrink-0 self-center sm:self-auto"
              >
                <div className="relative">
                  <img 
                    src={mockStyleSuggestion.image} 
                    alt={mockStyleSuggestion.name} 
                    className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover shadow-md ring-2 ring-accent/20" 
                  />
                  {/* Animated badge overlay */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="absolute -top-2 -right-2 bg-accent rounded-full p-1 shadow-lg"
                  >
                    <Sparkles className="w-3 h-3 text-primary" />
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Info Section */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">
                        {mockStyleSuggestion.name}
                      </h3>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-r from-accent/20 to-accent/10 text-accent text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-accent/20"
                      >
                        <Award size={12} />
                        <span>AI Recommended</span>
                      </motion.div>
                    </div>
                    
                    {/* Safety Badge */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Shield size={12} className="text-green-500" />
                        <span className="text-xs text-muted-foreground">
                          Safety: <span className="font-medium text-green-600">{mockStyleSuggestion.safety}</span>
                        </span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                      <div className="flex items-center gap-1">
                        <Heart size={12} className="text-accent" />
                        <span className="text-xs text-muted-foreground">
                          Confidence: <span className="font-medium text-primary">{mockStyleSuggestion.confidence}%</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Expand/Collapse Button for mobile */}
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="sm:hidden flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors"
                  >
                    {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    {isExpanded ? 'Less' : 'More'}
                  </button>
                </div>
                
                {/* Details Row - Always visible on desktop, toggle on mobile */}
                <div className={`flex flex-wrap items-center gap-3 md:gap-4 text-sm text-muted-foreground ${!isExpanded ? 'hidden sm:flex' : 'flex mt-2'}`}>
                  <div className="flex items-center gap-1.5 bg-accent/5 px-3 py-1.5 rounded-full">
                    <DollarSign size={14} className="text-accent" />
                    <span className="text-xs">Price</span>
                    <strong className="text-primary font-bold text-base ml-1">£{mockStyleSuggestion.price}</strong>
                  </div>
                  
                  <div className="flex items-center gap-1.5 bg-accent/5 px-3 py-1.5 rounded-full">
                    <Clock size={14} className="text-accent" />
                    <span className="text-xs">Duration</span>
                    <strong className="text-primary font-bold text-base ml-1">
                      {Math.floor(mockStyleSuggestion.duration / 60)}h {mockStyleSuggestion.duration % 60}m
                    </strong>
                  </div>
                  
                  <div className="flex items-center gap-1.5 bg-accent/5 px-3 py-1.5 rounded-full">
                    <Star size={14} className="text-yellow-500" />
                    <span className="text-xs">Tension</span>
                    <strong className="text-primary font-semibold ml-1">{mockStyleSuggestion.tension}</strong>
                  </div>
                </div>
                
                {/* Care Note - Shown on expand or always on desktop */}
                {(isExpanded || window.innerWidth >= 640) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 pt-3 border-t border-border/30 hidden sm:block"
                  >
                    <div className="flex items-start gap-2">
                      <Info size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {mockStyleSuggestion.careNote}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Care Note for mobile when expanded */}
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
                className="mt-3 pt-3 border-t border-border/30 sm:hidden"
              >
                <div className="flex items-start gap-2">
                  <Info size={14} className="text-accent mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {mockStyleSuggestion.careNote}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Subtle bottom accent bar */}
          <motion.div 
            className="h-0.5 bg-gradient-to-r from-accent/80 via-accent/40 to-transparent"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SelectedAIStyleDetails;