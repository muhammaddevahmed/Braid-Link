import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck } from 'lucide-react';

const AIAutoMatchLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-8"
      >
        <UserCheck size={64} className="text-accent" />
      </motion.div>
      <p className="text-lg text-muted-foreground">Matching you with the best stylist for your look...</p>
    </div>
  );
};

export default AIAutoMatchLoader;

