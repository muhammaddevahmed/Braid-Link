import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { mockStyleSuggestion } from '@/data/ai-data';

const SelectedAIStyleDetails = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card p-4 rounded-lg border border-border mb-8"
    >
      <div className="flex items-center gap-4">
        <img src={mockStyleSuggestion.image} alt={mockStyleSuggestion.name} className="w-24 h-24 rounded-lg object-cover" />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-semibold">{mockStyleSuggestion.name}</h3>
            <div className="bg-accent text-primary text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
              <Award size={14} /> AI Recommended
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Price: <strong className="text-primary">£{mockStyleSuggestion.price}</strong></span>
            <span>Duration: <strong className="text-primary">{mockStyleSuggestion.duration / 60} hrs</strong></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SelectedAIStyleDetails;

