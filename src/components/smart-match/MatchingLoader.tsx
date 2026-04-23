import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';

const MatchingLoader = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const dotVariants: Variants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        duration: 0.4,
        type: 'spring' as const,
      },
    },
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex items-center justify-center"
    >
      <div className="text-center space-y-8">
        {/* Animated Circles */}
        <motion.div className="flex justify-center items-center gap-4">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              variants={dotVariants}
              animate="animate"
              transition={{ delay: index * 0.2 }}
              className="w-4 h-4 bg-gradient-to-r from-accent to-accent/60 rounded-full"
            />
          ))}
        </motion.div>

        {/* Icon */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="p-6 bg-accent/10 rounded-full"
          >
            <Sparkles className="w-12 h-12 text-accent" />
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h2 className="font-serif text-3xl font-bold text-primary">
            Finding Your Perfect Match
          </h2>
          <p className="text-muted-foreground text-lg">
            Our AI is searching for the best stylist for you...
          </p>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          variants={itemVariants}
          className="max-w-sm mx-auto"
        >
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-accent/50"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>

        {/* Status Messages */}
        <motion.div
          variants={itemVariants}
          className="space-y-2"
        >
          {['Analyzing preferences...', 'Checking availability...', 'Matching expertise...'].map(
            (message, index) => (
              <motion.div
                key={index}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 1.5,
                  delay: index * 0.4,
                  repeat: Infinity,
                }}
                className="text-sm text-muted-foreground flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                {message}
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MatchingLoader;
