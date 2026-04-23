import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Award, 
  ArrowRight, 
  Eye, 
  Search, 
  Sparkles, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Shield, 
  TrendingUp,
  Calendar,
  MessageCircle,
  Users,
  Crown
} from 'lucide-react';
import { Stylist } from '@/data/demo-data';
import { Badge } from '@/components/ui/badge';

const AutoMatchedStylistCard = ({ 
  stylist, 
  onAccept,
  onViewProfile,
  onFindAnother,
  isManuallySelected = false,
}: { 
  stylist: Stylist | null, 
  onAccept: () => void,
  onViewProfile?: () => void,
  onFindAnother?: () => void,
  isManuallySelected?: boolean,
}) => {
  const [isAccepted, setIsAccepted] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showSuccessCheck, setShowSuccessCheck] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAccepted(true);
    }, 2000);
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

  const handleAccept = () => {
    setShowSuccessCheck(true);
    setTimeout(() => {
      onAccept();
    }, 800);
  };

  if (!stylist) return null;

  // Calculate match score (simulated based on rating and experience)
  const matchScore = Math.min(98, Math.floor(stylist.rating * 12 + stylist.experience / 2));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
        className="relative group"
      >
        {/* Decorative glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative bg-card rounded-2xl border border-border/50 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
          
          {/* Header Badge */}
          <div className="absolute top-4 right-4 z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Badge className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold shadow-sm ${
                isManuallySelected 
                  ? 'bg-gradient-to-r from-accent to-accent/80 text-primary border-accent/30' 
                  : 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 border-purple-200'
              }`}>
                {isManuallySelected ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Your Selected Stylist
                  </>
                ) : (
                  <>
                    <Award className="w-3.5 h-3.5" />
                    AI Auto-Matched
                  </>
                )}
              </Badge>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="p-6 md:p-8">
            {/* Profile Section */}
            <div className="text-center mb-6">
              <div className="relative inline-block mb-4">
                {/* Animated ring */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full bg-accent/20"
                  style={{ width: 128, height: 128, left: -4, top: -4 }}
                />
                
                <img 
                  src={stylist.photo} 
                  alt={stylist.name} 
                  className="relative w-32 h-32 rounded-full object-cover mx-auto ring-4 ring-accent/30 shadow-xl" 
                />
                
                {/* Match Score Badge */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <TrendingUp size={12} />
                  {matchScore}% Match
                </div>
              </div>
              
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mt-4 mb-2">
                {stylist.name}
              </h2>
              
              <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-primary">{stylist.rating}</span>
                  <span>({stylist.reviewCount.toLocaleString()} reviews)</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <div className="flex items-center gap-1.5">
                  <Clock size={14} />
                  <span>{stylist.experience}+ years exp.</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  <span>{stylist.location || 'Near you'}</span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="bg-gradient-to-br from-accent/5 to-transparent rounded-xl p-3 text-center border border-border/30">
                <Users className="w-4 h-4 text-accent mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Clients</p>
                <p className="font-bold text-primary">500+</p>
              </div>
              <div className="bg-gradient-to-br from-accent/5 to-transparent rounded-xl p-3 text-center border border-border/30">
                <Calendar className="w-4 h-4 text-accent mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Bookings</p>
                <p className="font-bold text-primary">1.2k+</p>
              </div>
              <div className="bg-gradient-to-br from-accent/5 to-transparent rounded-xl p-3 text-center border border-border/30">
                <MessageCircle className="w-4 h-4 text-accent mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Response</p>
                <p className="font-bold text-primary">&lt; 1hr</p>
              </div>
              <div className="bg-gradient-to-br from-accent/5 to-transparent rounded-xl p-3 text-center border border-border/30">
                <Crown className="w-4 h-4 text-accent mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="font-bold text-green-500">Available</p>
              </div>
            </div>

            {/* Specialties Tags */}
            {stylist.specialties && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {stylist.specialties.slice(0, 3).map((specialty, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                  >
                    {specialty}
                  </motion.span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Row 1: View Profile & Find Another */}
              <div className={`grid gap-3 ${isManuallySelected ? 'grid-cols-1' : 'grid-cols-2'}`}>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onViewProfile}
                  className="group relative overflow-hidden border-2 border-accent/30 text-accent hover:bg-accent/5 font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>View Full Profile</span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-transparent via-accent/5 to-transparent" />
                </motion.button>
                
                {!isManuallySelected && (
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleFindAnother}
                    disabled={isSearching}
                    className="group relative overflow-hidden border-2 border-accent/30 text-accent hover:bg-accent/5 font-semibold px-4 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSearching ? (
                      <>
                        <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                        <span>Searching...</span>
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span>Find Another Stylist</span>
                      </>
                    )}
                  </motion.button>
                )}
              </div>

              {/* Row 2: Accept & Proceed */}
              <AnimatePresence mode="wait">
                {isAccepted && !showSuccessCheck && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAccept}
                    className="relative overflow-hidden w-full bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isManuallySelected ? 'Confirm & Proceed to Payment' : 'Book This Stylist'}
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </motion.button>
                )}

                {showSuccessCheck && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full bg-green-500/10 border border-green-500/30 text-green-600 font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Stylist Selected! Redirecting...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Trust Footer */}
            <div className="mt-6 pt-4 border-t border-border/30 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-accent" />
                <span>Booking Guaranteed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <span>Free Cancellation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AutoMatchedStylistCard;