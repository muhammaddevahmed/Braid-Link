import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader } from 'lucide-react';

const messages = [
  "Analyzing face shape...",
  "Evaluating hair texture...",
  "Checking scalp sensitivity...",
  "Running health-informed styling intelligence...",
  "Generating safe braid styles...",
  "Predicting pricing...",
  "Estimating duration...",
];

const AIProcessingLoader = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 2000); // Change message every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-96">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="mb-8"
      >
        <Loader size={64} className="text-accent" />
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.p
          key={currentMessageIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-lg text-muted-foreground"
        >
          {messages[currentMessageIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default AIProcessingLoader;

