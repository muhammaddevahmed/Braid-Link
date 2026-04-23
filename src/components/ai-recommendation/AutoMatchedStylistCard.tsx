import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Award, CheckCircle, ArrowRight, Eye, Search } from 'lucide-react';
import { Stylist } from '@/data/demo-data';

const AutoMatchedStylistCard = ({ 
  stylist, 
  onAccept,
  onViewProfile,
  onFindAnother,
}: { 
  stylist: Stylist | null, 
  onAccept: () => void,
  onViewProfile?: () => void,
  onFindAnother?: () => void,
}) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAccepted(true);
    }, 2000); // 2-second delay for stylist acceptance simulation
    return () => clearTimeout(timer);
  }, []);

  const handleFindAnother = async () => {
    if (onFindAnother) {
      setIsSearching(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      onFindAnother();
      setIsSearching(false);
    }
  };

  if (!stylist) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card p-6 rounded-2xl border border-border/50 shadow-lg"
      >
        {/* Top Section - Image and Basic Info */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-4">
            <img 
              src={stylist.photo} 
              alt={stylist.name} 
              className="w-32 h-32 rounded-full object-cover mx-auto ring-4 ring-accent shadow-lg" 
            />
            <div className="absolute bottom-0 right-0 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Award size={14} /> Auto Matched
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-primary mt-4 mb-2">{stylist.name}</h2>
          
          <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{stylist.rating}</span>
              <span>({stylist.reviewCount} reviews)</span>
            </div>
            <span>•</span>
            <span>{stylist.experience} years exp.</span>
          </div>
        </div>

        {/* Acceptance Status */}
        {isAccepted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
           
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Row 1: View Profile & Search Another */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onViewProfile}
              className="border-2 border-accent/30 text-accent hover:bg-accent/5 font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all group"
            >
              <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
              View Profile
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFindAnother}
              disabled={isSearching}
              className="border-2 border-accent/30 text-accent hover:bg-accent/5 font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
              {isSearching ? 'Searching...' : 'Find Another'}
            </motion.button>
          </div>

          {/* Row 2: Accept & Proceed (Full Width) */}
          {isAccepted && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onAccept}
              className="w-full bg-accent text-primary font-semibold px-6 py-3 rounded-xl hover:bg-accent/90 transition-all inline-flex items-center justify-center gap-2"
            >
              Proceed to Payment <ArrowRight size={18} />
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AutoMatchedStylistCard;

