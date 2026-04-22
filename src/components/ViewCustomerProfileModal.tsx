import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, MapPin, Heart, Award, TrendingUp, X, Scissors,
  Calendar, Clock, DollarSign, Star, Shield, Sparkles, CheckCircle, Camera
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  location?: string;
  hairType?: string;
  selectedBraidStyle?: string;
  selectedBraidImage?: string;
  healthScore?: number;
  notes?: string;
  bookingDetails?: {
    date: string;
    time: string;
    service: string;
    price: number;
  };
}

interface ViewCustomerProfileModalProps {
  isOpen: boolean;
  customer: CustomerProfile | null;
  onClose: () => void;
}

const ViewCustomerProfileModal: React.FC<ViewCustomerProfileModalProps> = ({
  isOpen,
  customer,
  onClose,
}) => {
  const [imageError, setImageError] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle scroll to add shadow effect
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        setScrollPosition(contentRef.current.scrollTop);
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      return () => contentElement.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen]);

  if (!customer) return null;

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300,
        duration: 0.4 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 30,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Default avatar placeholder
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Validate if image URL is valid
  const isValidImageUrl = (url: string) => {
    if (!url || url === '') return false;
    // Check if it's a data URL or http URL
    return url.startsWith('data:image/') || 
           url.startsWith('http://') || 
           url.startsWith('https://');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          />

          {/* Modal Container - Full screen on mobile, centered on desktop */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
          >
            <div className="bg-background rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full my-2 sm:my-8 border border-border/50 overflow-hidden max-h-[98vh] sm:max-h-[95vh] flex flex-col">
              
              {/* Fixed Header with Gradient Background */}
              <div className={`relative flex-shrink-0 transition-shadow duration-200 ${
                scrollPosition > 10 ? 'shadow-lg' : ''
              }`}>
                {/* Gradient Header Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
                
                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="absolute top-3 right-3 sm:top-6 sm:right-6 p-2 bg-background/95 backdrop-blur-sm hover:bg-muted rounded-lg sm:rounded-xl transition-all z-20 shadow-lg"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </motion.button>

                {/* Profile Header with proper positioning - No negative margin */}
                <div className="px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-center sm:items-start">
                    {/* Profile Image - No negative margin */}
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", damping: 20, stiffness: 400 }}
                      className="flex-shrink-0"
                    >
                      <div className="relative">
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent to-accent/50 rounded-xl sm:rounded-2xl blur-xl opacity-60" />
                        
                        {/* Profile Image Container */}
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-xl sm:rounded-2xl overflow-hidden ring-4 ring-background shadow-2xl bg-gradient-to-br from-primary/10 to-accent/10">
                          {customer.avatar && isValidImageUrl(customer.avatar) && !imageError ? (
                            <img
                              src={customer.avatar}
                              alt={customer.name}
                              className="w-full h-full object-cover object-center"
                              onError={() => setImageError(true)}
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                              {customer.avatar && !isValidImageUrl(customer.avatar) ? (
                                <div className="text-center p-2">
                                  <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-primary/60 mx-auto mb-1" />
                                  <span className="text-[10px] sm:text-xs text-primary/60">Invalid URL</span>
                                </div>
                              ) : (
                                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                                  {getInitials(customer.name)}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {/* Verified Badge */}
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 }}
                          className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-accent rounded-full p-1 sm:p-1.5 ring-4 ring-background shadow-lg"
                        >
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Customer Info */}
                    <motion.div 
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex-1 text-center sm:text-left w-full"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-primary break-words">
                          {customer.name}
                        </h1>
                        <Badge className="bg-accent/20 text-accent border-accent/30 w-fit mx-auto sm:mx-0">
                          <Star className="w-3 h-3 mr-1 fill-accent" />
                          VIP Customer
                        </Badge>
                      </div>

                      {/* Key Info Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        <motion.div 
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-muted/50 rounded-lg sm:rounded-xl hover:bg-muted transition-all group"
                        >
                          <div className="p-1.5 sm:p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                            <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                          </div>
                          <span className="text-xs sm:text-sm text-muted-foreground break-all">
                            {customer.email}
                          </span>
                        </motion.div>

                        <motion.div 
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-muted/50 rounded-lg sm:rounded-xl hover:bg-muted transition-all group"
                        >
                          <div className="p-1.5 sm:p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                            <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                          </div>
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            {customer.phone}
                          </span>
                        </motion.div>

                        {customer.location && (
                          <motion.div 
                            whileHover={{ scale: 1.02, x: 5 }}
                            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-muted/50 rounded-lg sm:rounded-xl hover:bg-muted transition-all group sm:col-span-2"
                          >
                            <div className="p-1.5 sm:p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                            </div>
                            <span className="text-xs sm:text-sm text-muted-foreground">
                              {customer.location}
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Scrollable Content Area */}
              <div 
                ref={contentRef}
                className="flex-1 overflow-y-auto"
              >
                <div className="px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 space-y-4 sm:space-y-6 md:space-y-8">
                  
                  {/* Hair Information */}
                  {(customer.hairType || customer.healthScore !== undefined) && (
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <div className="p-1.5 sm:p-2 bg-accent/10 rounded-lg">
                          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                        </div>
                        <h3 className="font-semibold text-base sm:text-lg text-primary">Hair Profile</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        {customer.hairType && (
                          <motion.div 
                            whileHover={{ y: -3 }}
                            className="group relative overflow-hidden p-3 sm:p-5 bg-gradient-to-br from-muted to-muted/50 rounded-lg sm:rounded-xl border border-border/50 hover:border-accent/30 transition-all"
                          >
                            <div className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all" />
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 sm:mb-2">
                              Hair Type
                            </p>
                            <p className="text-base sm:text-xl font-bold text-primary">
                              {customer.hairType}
                            </p>
                            <Sparkles className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-4 h-4 sm:w-6 sm:h-6 text-accent/20 group-hover:text-accent/40 transition-all" />
                          </motion.div>
                        )}
                        {customer.healthScore !== undefined && (
                          <motion.div 
                            whileHover={{ y: -3 }}
                            className="group relative overflow-hidden p-3 sm:p-5 bg-gradient-to-br from-muted to-muted/50 rounded-lg sm:rounded-xl border border-border/50 hover:border-accent/30 transition-all"
                          >
                            <div className="absolute top-0 right-0 w-16 sm:w-20 h-16 sm:h-20 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all" />
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 sm:mb-2">
                              Health Score
                            </p>
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div className="flex-1">
                                <div className="relative h-1.5 sm:h-2 bg-primary/10 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${customer.healthScore}%` }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                    className="absolute h-full bg-accent rounded-full"
                                  />
                                </div>
                                <p className="text-lg sm:text-2xl font-bold text-accent mt-1 sm:mt-2">
                                  {customer.healthScore}%
                                </p>
                              </div>
                              <TrendingUp className="w-5 h-5 sm:w-8 sm:h-8 text-accent/40 group-hover:text-accent/60 transition-all" />
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Selected Braid Style */}
                  {customer.selectedBraidStyle && (
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <div className="p-1.5 sm:p-2 bg-accent/10 rounded-lg">
                          <Scissors className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                        </div>
                        <h3 className="font-semibold text-base sm:text-lg text-primary">Selected Braid Style</h3>
                      </div>
                      <motion.div 
                        whileHover={{ scale: 1.01 }}
                        className="group relative bg-gradient-to-br from-muted to-muted/50 rounded-lg sm:rounded-xl border border-border/50 overflow-hidden"
                      >
                        {customer.selectedBraidImage && (
                          <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-muted">
                            <img
                              src={customer.selectedBraidImage}
                              alt={customer.selectedBraidStyle}
                              className="w-full h-full object-contain sm:object-cover group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                const parent = target.parentElement;
                                if (parent) {
                                  const fallback = document.createElement('div');
                                  fallback.className = 'w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50';
                                  fallback.innerHTML = `
                                    <div class="text-center">
                                      <Scissors class="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                                      <p class="text-sm text-muted-foreground">Image not available</p>
                                    </div>
                                  `;
                                  parent.appendChild(fallback);
                                }
                              }}
                            />
                          </div>
                        )}
                        <div className="p-3 sm:p-4">
                          <Badge className="bg-accent text-primary px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm">
                            {customer.selectedBraidStyle}
                          </Badge>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Booking Details */}
                  {customer.bookingDetails && (
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <div className="p-1.5 sm:p-2 bg-accent/10 rounded-lg">
                          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                        </div>
                        <h3 className="font-semibold text-base sm:text-lg text-primary">Booking Details</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <motion.div 
                          whileHover={{ scale: 1.01 }}
                          className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-br from-muted to-muted/50 rounded-lg sm:rounded-xl border border-border/50"
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="p-1.5 sm:p-2 bg-accent/10 rounded-lg">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-muted-foreground">Date</span>
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-primary">
                            {customer.bookingDetails.date}
                          </span>
                        </motion.div>
                        <motion.div 
                          whileHover={{ scale: 1.01 }}
                          className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-br from-muted to-muted/50 rounded-lg sm:rounded-xl border border-border/50"
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="p-1.5 sm:p-2 bg-accent/10 rounded-lg">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-muted-foreground">Time</span>
                          </div>
                          <span className="text-xs sm:text-sm font-semibold text-primary">
                            {customer.bookingDetails.time}
                          </span>
                        </motion.div>
                        <motion.div 
                          whileHover={{ scale: 1.01 }}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 sm:p-4 bg-gradient-to-br from-muted to-muted/50 rounded-lg sm:rounded-xl border border-border/50 sm:col-span-2"
                        >
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="p-1.5 sm:p-2 bg-accent/10 rounded-lg">
                              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-muted-foreground">Total Price</span>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                            <span className="text-base sm:text-2xl font-bold text-accent">
                              £{customer.bookingDetails.price}
                            </span>
                            <Badge variant="outline" className="border-accent/30 text-accent text-xs">
                              {customer.bookingDetails.service}
                            </Badge>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  {/* Notes */}
                  {customer.notes && (
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.4 }}
                    >
                      <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <div className="p-1.5 sm:p-2 bg-accent/10 rounded-lg">
                          <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                        </div>
                        <h3 className="font-semibold text-base sm:text-lg text-primary">Stylist Notes</h3>
                      </div>
                      <motion.div 
                        whileHover={{ scale: 1.01 }}
                        className="p-3 sm:p-5 bg-gradient-to-br from-muted to-muted/50 rounded-lg sm:rounded-xl border border-border/50"
                      >
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {customer.notes}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}

                </div>
              </div>

              {/* Fixed Footer with Action Buttons */}
              <div className="flex-shrink-0 px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-t border-border/50 bg-background/95 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 hover:scale-105 transition-transform"
                    onClick={onClose}
                  >
                    Close
                  </Button>
  
                </div>
              </div>
              
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ViewCustomerProfileModal;