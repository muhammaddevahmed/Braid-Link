import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, Sparkles, Brain, ScanFace, Activity, Shield, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

const messages = [
  { text: "Analyzing face shape...", icon: ScanFace, detail: "Identifying your unique facial structure" },
  { text: "Evaluating hair texture...", icon: Activity, detail: "Assessing density, porosity, and elasticity" },
  { text: "Checking scalp sensitivity...", icon: Brain, detail: "Analyzing for safe styling recommendations" },
  { text: "Running health-informed styling intelligence...", icon: Sparkles, detail: "Matching styles with your hair health" },
  { text: "Generating safe braid styles...", icon: Shield, detail: "Curating protective style options" },
  { text: "Predicting pricing...", icon: TrendingUp, detail: "Calculating based on complexity and duration" },
  { text: "Estimating duration...", icon: Clock, detail: "Factoring in style intricacy" },
];

const AIProcessingLoader = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2200);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return Math.min(prev + 100 / (messages.length * 2.2 / 0.05), 100);
      });
    }, 50);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const CurrentIcon = messages[currentMessageIndex].icon;

  return (
    <div className="max-w-md mx-auto px-4 py-8 md:py-12">
      {/* Container with glass morphism effect */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 rounded-3xl blur-2xl" />
        
        <div className="relative bg-card/80 backdrop-blur-sm rounded-3xl border border-border/50 p-8 md:p-10 shadow-xl">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-accent">AI Processing</span>
            </div>
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-primary">
              Analyzing Your Style Profile
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Our AI is working to find your perfect match
            </p>
          </motion.div>

          {/* Animated Loader */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {/* Pulsing background */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-accent/20 blur-xl"
              />
              
              {/* Main loader */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="relative"
              >
                <Loader size={56} className="text-accent" strokeWidth={1.5} />
              </motion.div>
              
              {/* Inner pulsing dot */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-3 h-3 rounded-full bg-accent" />
              </motion.div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Analyzing</span>
              <span className="font-mono">{Math.floor(progress)}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent/60 to-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Dynamic Message with Icon */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-center"
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
                <p className="text-lg font-medium text-primary">
                  {messages[currentMessageIndex].text}
                </p>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs text-muted-foreground"
              >
                {messages[currentMessageIndex].detail}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Steps Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 pt-6 border-t border-border/30"
          >
            <div className="flex justify-center gap-2">
              {messages.map((_, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    scale: idx === currentMessageIndex ? 1.2 : 1,
                    opacity: idx === currentMessageIndex ? 1 : 0.4,
                  }}
                  transition={{ duration: 0.2 }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentMessageIndex
                      ? 'bg-accent'
                      : idx < currentMessageIndex
                        ? 'bg-accent/40'
                        : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-3">
              This may take a few moments
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent/20"
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
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AIProcessingLoader;