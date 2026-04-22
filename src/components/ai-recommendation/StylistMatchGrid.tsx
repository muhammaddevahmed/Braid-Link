import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Award, Briefcase } from "lucide-react";

export interface Stylist {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  experience: number;
  specialty: string;
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <div className="text-center mb-12">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-3">
          Find Your Perfect Stylist
        </h2>
        <p className="text-muted-foreground">
          Select a stylist who specializes in your recommended style
        </p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
      >
        {stylists.map((stylist, index) => (
          <motion.div
            key={stylist.id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            onClick={() => onSelectStylist(stylist)}
            className="cursor-pointer"
          >
            <Card
              className={`overflow-hidden transition-all duration-300 border-2 ${
                selectedStylistId === stylist.id
                  ? "border-accent bg-accent/5"
                  : "border-transparent hover:border-accent/30"
              }`}
            >
              {/* Image Container */}
              <div className="relative h-56 bg-gradient-to-br from-accent/10 to-accent/5 overflow-hidden">
                <img
                  src={stylist.avatar}
                  alt={stylist.name}
                  className="w-full h-full object-cover"
                />
                {selectedStylistId === stylist.id && (
                  <div className="absolute inset-0 bg-accent/20 flex items-center justify-center">
                    <div className="bg-accent text-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
                      ✓
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-lg text-primary mb-2 line-clamp-1">
                  {stylist.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(stylist.rating)
                            ? "fill-accent text-accent"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {stylist.rating}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ({stylist.reviewCount})
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="w-4 h-4 text-accent/70" />
                    <span>{stylist.experience} years experience</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="w-4 h-4 text-accent/70" />
                    <span>{stylist.specialty}</span>
                  </div>
                </div>

                {/* Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectStylist(stylist)}
                  className={`w-full py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                    selectedStylistId === stylist.id
                      ? "bg-accent text-primary"
                      : "bg-white text-accent border-2 border-accent hover:bg-accent/5"
                  }`}
                >
                  {selectedStylistId === stylist.id
                    ? "Selected"
                    : "Select Stylist"}
                </motion.button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
