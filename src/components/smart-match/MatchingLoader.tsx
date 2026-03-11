import { motion } from "framer-motion";
import { Sparkles, Zap, Heart, Search } from "lucide-react";
import { useState, useEffect } from "react";

interface MatchingLoaderProps {
  message?: string;
  subMessage?: string;
  variant?: "default" | "pulse" | "search" | "magical";
  showProgress?: boolean;
  progressValue?: number;
  indeterminate?: boolean;
}

export const MatchingLoader = ({ 
  message = "Searching for stylists...", 
  subMessage = "We're scanning our network of expert braiders",
  variant = "search",
  showProgress = false,
  progressValue = 0,
  indeterminate = false
}: MatchingLoaderProps) => {
  const [progress, setProgress] = useState(progressValue);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // Rotating messages for variety
  const messages = [
    "Finding your perfect stylist...",
    "Checking availability...",
    "Matching your style preferences...",
    "Almost there...",
    "Connecting you with experts..."
  ];

  useEffect(() => {
    if (indeterminate) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [indeterminate, messages.length]);

  useEffect(() => {
    setProgress(progressValue);
  }, [progressValue]);

  // Animation variants
  const sparkleVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { 
      scale: [0.8, 1.2, 1],
      opacity: [0, 1, 0.8],
      rotate: [0, 180, 360]
    },
    transition: { 
      duration: 2, 
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseRingVariants = {
    animate: {
      scale: [1, 1.5, 2],
      opacity: [0.5, 0.2, 0],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeOut"
    }
  };

  const getLoaderContent = () => {
    switch(variant) {
      case "pulse":
        return (
          <div className="relative">
            <motion.div
              variants={pulseRingVariants}
              animate="animate"
              className="absolute inset-0 rounded-full bg-accent/20"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 20px rgba(var(--accent-rgb), 0.3)",
                  "0 0 40px rgba(var(--accent-rgb), 0.6)",
                  "0 0 20px rgba(var(--accent-rgb), 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center"
            >
              <Heart className="w-8 h-8 text-accent" />
            </motion.div>
          </div>
        );

      case "search":
        return (
          <div className="relative">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 rounded-full border-4 border-accent/30 border-t-accent"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Search className="w-8 h-8 text-accent" />
            </motion.div>
          </div>
        );

      case "magical":
        return (
          <div className="relative">
            {/* Multiple sparkles */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, (i - 1) * 30],
                  y: [0, (i - 1) * -30],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
                className="absolute"
              >
                <Sparkles className={`w-${i === 1 ? '8' : '6'} h-${i === 1 ? '8' : '6'} text-accent`} />
              </motion.div>
            ))}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center"
            >
              <Zap className="w-8 h-8 text-primary" />
            </motion.div>
          </div>
        );

      default:
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <div className="w-20 h-20 rounded-full border-4 border-accent/30 border-t-accent" />
            <motion.div
              variants={sparkleVariants}
              initial="initial"
              animate="animate"
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sparkles className="w-8 h-8 text-accent" />
            </motion.div>
          </motion.div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 gap-6 bg-gradient-to-b from-background to-secondary/10 rounded-2xl">
      {/* Main Loader */}
      <div className="relative">
        {getLoaderContent()}
        
        {/* Decorative elements */}
        <motion.div
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -inset-8 rounded-full bg-accent/5 blur-xl -z-10"
        />
      </div>

      {/* Message Section */}
      <div className="text-center space-y-2 max-w-sm">
        <motion.h3
          key={indeterminate ? currentMessageIndex : message}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xl font-serif font-semibold text-primary"
        >
          {indeterminate ? messages[currentMessageIndex] : message}
        </motion.h3>
        
        <motion.p
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="text-sm text-detail font-brand"
        >
          {subMessage}
        </motion.p>
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="w-full max-w-xs space-y-2">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-accent to-cta rounded-full"
            />
          </div>
          <p className="text-xs text-detail text-right">{progress}% complete</p>
        </div>
      )}

      {/* Bouncing Dots */}
      <motion.div
        className="flex gap-2 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ 
              y: [-6, 0, -6],
              scale: [1, 1.2, 1],
              backgroundColor: [
                "hsl(var(--accent) / 0.5)",
                "hsl(var(--accent))",
                "hsl(var(--accent) / 0.5)"
              ]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
            className="w-2.5 h-2.5 rounded-full bg-accent"
          />
        ))}
      </motion.div>

      {/* Estimated Time */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1 }}
        className="text-xs text-detail mt-2"
      >
        Usually takes 10-15 seconds
      </motion.p>
    </div>
  );
};

export default MatchingLoader;