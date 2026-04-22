import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Stylist } from '@/data/demo-data';
import { 
  Star, MapPin, Award, Briefcase, Eye, 
  Search, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StylistMatchCardProps {
  stylist: Stylist;
  hairstyle?: string;
  price?: number;
  onBookNow: () => void;
  onFindAnother: () => void;
  isRejected?: boolean;
  onViewProfile?: () => void;
}

const StylistMatchCard: React.FC<StylistMatchCardProps> = ({
  stylist,
  hairstyle,
  price,
  onBookNow,
  onFindAnother,
  isRejected = false,
  onViewProfile,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFindAnother = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onFindAnother();
    setIsLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="overflow-hidden border-2 border-accent/30 hover:border-accent/60 transition-all shadow-lg">
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-primary to-primary/90 p-8 pb-0">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
          </div>

          {/* Top Section - Image and Basic Info */}
          <div className="relative z-10 flex flex-col items-center text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mb-6"
            >
              <img
                src={stylist.photo}
                alt={stylist.name}
                className="w-40 h-40 rounded-full object-cover ring-4 ring-white shadow-xl"
              />
            </motion.div>

            <h2 className="text-3xl font-bold text-white mb-2">
              {stylist.name}
            </h2>

            <div className="flex items-center justify-center gap-2 mb-3">
              <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              <span className="text-white font-semibold">{stylist.rating}</span>
              <span className="text-white/80 text-sm">
                ({stylist.reviewCount} reviews)
              </span>
            </div>

            {hairstyle && (
              <Badge className="bg-white text-primary font-semibold">
                ✨ Perfect for {hairstyle}
              </Badge>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-6">
          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg border border-border/50">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                Experience
              </p>
              <p className="text-lg font-bold text-primary">
                {stylist.experience} years
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg border border-border/50">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                Location
              </p>
              <p className="text-lg font-bold text-primary flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {stylist.location}
              </p>
            </div>
          </div>

          {/* Specialties */}
          {stylist.specialties.length > 0 && (
            <div>
              <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-accent" />
                Specialties
              </h3>
              <div className="flex flex-wrap gap-2">
                {stylist.specialties.slice(0, 4).map((specialty, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="bg-accent/10 text-accent"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Price Information */}
          {price && (
            <div className="p-4 bg-accent/10 rounded-lg border-2 border-accent/30">
              <p className="text-sm text-muted-foreground mb-1">Estimated Price</p>
              <p className="text-2xl font-bold text-accent">£{price}</p>
            </div>
          )}

          {/* Bio */}
          {stylist.bio && (
            <div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stylist.bio}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-4 border-t border-border/50 space-y-3">
            {/* Row 1: View Profile & Search Another */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={onViewProfile}
                className="flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Profile
              </Button>
              <Button
                variant="outline"
                onClick={handleFindAnother}
                disabled={isLoading}
                className="flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                {isLoading ? 'Searching...' : 'Find Another'}
              </Button>
            </div>

            {/* Row 2: Book Now (Full Width) */}
            <Button
              onClick={onBookNow}
              className="w-full bg-accent text-primary hover:bg-accent/90 font-semibold"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Accept & Book Now
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default StylistMatchCard;
