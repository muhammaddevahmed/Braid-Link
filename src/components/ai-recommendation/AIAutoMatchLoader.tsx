import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, Sparkles, MapPin, Star, Clock, Award, Shield, ChevronRight } from 'lucide-react';

const matchingMessages = [
  { text: "Searching for top-rated stylists in your area...", icon: MapPin, detail: "Checking availability near you" },
  { text: "Analyzing stylist expertise and reviews...", icon: Star, detail: "Matching with your style preferences" },
  { text: "Comparing portfolio and past work...", icon: Award, detail: "Finding the perfect aesthetic match" },
  { text: "Checking real-time availability...", icon: Clock, detail: "Verifying appointment slots" },
  { text: "Calculating price estimates...", icon: Sparkles, detail: "Ensuring budget alignment" },
  { text: "Finalizing your perfect match...", icon: UserCheck, detail: "Almost there!" },
];

const AIAutoMatchLoader = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [pulseIntensity, setPulseIntensity] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => 
        prevIndex + 1 >= matchingMessages.length ? prevIndex : prevIndex + 1
      );
    }, 2500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return Math.min(prev + 100 / (matchingMessages.length * 2.5 / 0.05), 100);
      });
    }, 50);

    const pulseInterval = setInterval(() => {
      setPulseIntensity(prev => (prev + 1) % 360);
    }, 50);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearInterval(pulseInterval);
    };
  }, []);

  const CurrentIcon = matchingMessages[currentMessageIndex].icon;
  const isComplete = progress >= 100;

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        // The component will be unmounted by parent when matching is done
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isComplete]);

  return (
    <div className="max-w-lg mx-auto px-4 py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10 rounded-3xl blur-2xl" />
        
        <div className="relative bg-card/90 backdrop-blur-sm rounded-3xl border border-border/50 p-8 md:p-10 shadow-xl overflow-hidden">
          
          {/* Animated background particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-accent/30"
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: 0,
                }}
                animate={{
                  y: [null, `${Math.random() * 20 - 10}%`],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-accent">AI Matching</span>
            </div>
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-primary">
              Finding Your Perfect Stylist
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Our AI analyzes thousands of data points to find your ideal match
            </p>
          </motion.div>

          {/* Animated Loader */}
          <div className="flex justify-center mb-8 relative z-10">
            <div className="relative">
              {/* Outer ring pulse */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-accent/20"
                style={{ width: 80, height: 80, left: -8, top: -8 }}
              />
              
              {/* Second ring */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0, 0.2],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3,
                }}
                className="absolute inset-0 rounded-full bg-accent/15"
                style={{ width: 80, height: 80, left: -8, top: -8 }}
              />
              
              {/* Icon Container */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, pulseIntensity > 180 ? 5 : -5, 0],
                }}
                transition={{
                  scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 0.5, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center shadow-lg"
              >
                <UserCheck className="w-8 h-8 text-accent" />
              </motion.div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8 relative z-10">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Matching Progress</span>
              <span className="font-mono">{Math.floor(progress)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent/60 to-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              >
                <motion.div
                  className="absolute right-0 top-0 bottom-0 w-2 bg-white/30 rounded-full"
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </div>

          {/* Dynamic Message */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center relative z-10"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <motion.div
                  initial={{ scale: 0.8, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center"
                >
                  <CurrentIcon size={20} className="text-accent" />
                </motion.div>
                <p className="text-base md:text-lg font-medium text-primary">
                  {matchingMessages[currentMessageIndex].text}
                </p>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs text-muted-foreground"
              >
                {matchingMessages[currentMessageIndex].detail}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Steps Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 pt-6 border-t border-border/30 relative z-10"
          >
            <div className="flex justify-center gap-2 mb-3">
              {matchingMessages.map((_, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    scale: idx === currentMessageIndex ? 1.2 : 1,
                    opacity: idx === currentMessageIndex ? 1 : idx < currentMessageIndex ? 0.6 : 0.3,
                  }}
                  transition={{ duration: 0.2 }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentMessageIndex
                      ? 'bg-accent shadow-md'
                      : idx < currentMessageIndex
                        ? 'bg-accent/50'
                        : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-accent" />
                <span>Verified Stylists</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-accent" />
                <span>5,000+ Reviews</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>Instant Booking</span>
              </div>
            </div>
          </motion.div>

          {/* Loading completion animation */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 bg-card/95 backdrop-blur-sm rounded-3xl flex items-center justify-center z-20"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3"
                >
                  <UserCheck className="w-8 h-8 text-green-500" />
                </motion.div>
                <p className="text-sm font-medium text-primary">Match Found!</p>
                <p className="text-xs text-muted-foreground">Redirecting...</p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AIAutoMatchLoader;