import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  Award, 
  Briefcase, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Sparkles,
  Mail,
  Phone,
  Calendar,
  MessageCircle,
  ChevronRight,
  Crown
} from "lucide-react";
import { useState } from "react";

export interface Stylist {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  experience: number;
  specialty: string;
  location?: string;
  responseTime?: string;
  verified?: boolean;
  availableToday?: boolean;
}

interface StylistMatchGridProps {
  stylists: Stylist[];
  onSelectStylist: (stylist: Stylist) => void;
  selectedStylistId?: string;
}

export const StylistMatchGrid = ({
  stylists,
  onSelectStylist,
  selectedStylistId,
}: StylistMatchGridProps) => {
  const [hoveredStylistId, setHoveredStylistId] = useState<string | null>(null);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Helper function to render stars
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < fullStars
                ? "fill-accent text-accent"
                : i === fullStars && hasHalfStar
                ? "fill-accent/50 text-accent"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8 px-4 sm:px-6"
    >
      {/* Header Section */}
      <div className="text-center mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4"
        >
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs font-medium text-accent">Top Matches</span>
        </motion.div>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3">
          Find Your Perfect Stylist
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Select from our curated list of expert stylists who specialize in your recommended style
        </p>
      </div>

      {/* Stylists Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {stylists.map((stylist, index) => {
          const isSelected = selectedStylistId === stylist.id;
          const isHovered = hoveredStylistId === stylist.id;
          
          return (
            <motion.div
              key={stylist.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredStylistId(stylist.id)}
              onMouseLeave={() => setHoveredStylistId(null)}
              className="cursor-pointer"
            >
              <Card
                className={`
                  relative overflow-hidden transition-all duration-400 
                  border-2 shadow-lg hover:shadow-xl
                  ${isSelected 
                    ? "border-accent bg-gradient-to-br from-accent/10 to-accent/5 shadow-accent/20" 
                    : "border-border/50 bg-card hover:border-accent/40"
                  }
                `}
              >
                {/* Decorative top bar */}
                <motion.div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent/60 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isSelected ? 1 : isHovered ? 0.5 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Verified Badge */}
                {stylist.verified && (
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-green-500/10 text-green-600 border-green-200 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </Badge>
                  </div>
                )}

                {/* Available Today Badge */}
                {stylist.availableToday && (
                  <div className="absolute top-3 right-3 z-10">
                    <Badge className="bg-accent/10 text-accent border-accent/20 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Available Today
                    </Badge>
                  </div>
                )}

                {/* Image Container */}
                <div className="relative h-56 bg-gradient-to-br from-accent/10 to-accent/5 overflow-hidden">
                  <motion.img
                    src={stylist.avatar}
                    alt={stylist.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Selection Overlay */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-accent/30 backdrop-blur-sm flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.4 }}
                        className="bg-accent rounded-full w-14 h-14 flex items-center justify-center shadow-2xl"
                      >
                        <CheckCircle className="w-8 h-8 text-primary" />
                      </motion.div>
                    </motion.div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Name and Title */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
                      <h3 className="font-serif text-xl font-bold text-primary">
                        {stylist.name}
                      </h3>
                      {stylist.experience >= 10 && (
                        <Crown className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                      {renderStars(stylist.rating)}
                      <span className="text-sm font-semibold text-primary">
                        {stylist.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({stylist.reviewCount.toLocaleString()} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <span className="font-semibold text-primary">{stylist.experience}</span> years experience
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-muted-foreground">
                        <span className="font-medium text-primary">{stylist.specialty}</span> specialist
                      </span>
                    </div>
                    
                    {stylist.location && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-muted-foreground">{stylist.location}</span>
                      </div>
                    )}
                    
                    {stylist.responseTime && (
                      <div className="flex items-center gap-2 text-sm">
                        <MessageCircle className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="text-muted-foreground">Responds in {stylist.responseTime}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onSelectStylist(stylist)}
                      className={`
                        w-full py-2.5 rounded-xl font-semibold transition-all duration-300 
                        flex items-center justify-center gap-2 group
                        ${isSelected
                          ? "bg-gradient-to-r from-accent to-accent/90 text-primary shadow-md"
                          : "bg-card border-2 border-accent/40 text-accent hover:bg-accent/5"
                        }
                      `}
                    >
                      {isSelected ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Selected Stylist
                        </>
                      ) : (
                        <>
                          Select Stylist
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.button>
                    
                    {/* Quick Actions */}
                    <div className="flex items-center justify-center gap-3 pt-2">
                      <button className="text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        Message
                      </button>
                      <span className="text-muted-foreground/30">•</span>
                      <button className="text-xs text-muted-foreground hover:text-accent transition-colors flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        View Schedule
                      </button>
                    </div>
                  </div>
                </div>

                {/* Bottom decorative element */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/40 via-accent to-accent/40"
                  initial={{ scaleX: 0, originX: 0.5 }}
                  animate={{ scaleX: isSelected ? 1 : isHovered ? 0.6 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center pt-6"
      >
        <p className="text-xs text-muted-foreground">
          All stylists are verified professionals with background checks
        </p>
      </motion.div>
    </motion.div>
  );
};