import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Sparkles, 
  Shield, 
  Calendar, 
  User, 
  Camera, 
  Heart,
  ArrowRight,
  Star,
  ZoomIn
} from "lucide-react";
import { useState } from "react";

export interface ConfirmationData {
  styleImage: string;
  styleName: string;
  hairstyleDescription: string;
  price: number;
  duration: number;
  hairSafetyLevel: string;
  frontImage: string;
  backImage: string;
}

interface AIConfirmationCardProps {
  data: ConfirmationData;
  onFindStylist: () => void;
}

export const AIConfirmationCard = ({
  data,
  onFindStylist,
}: AIConfirmationCardProps) => {
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getSafetyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'bg-green-500/10 text-green-600 border-green-200';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
      case 'low': return 'bg-red-500/10 text-red-600 border-red-200';
      default: return 'bg-accent/10 text-accent border-accent/20';
    }
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-5xl mx-auto px-4 sm:px-6"
      >
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
              <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-5 shadow-xl">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-accent">Style Confirmed</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3">
              Perfect! Style Selected
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto">
              Ready to find your perfect stylist? Let's match you with the right professional.
            </p>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <motion.div variants={containerVariants} className="space-y-8">
          
          {/* Summary Cards Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Style Preview Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 bg-gradient-to-br from-accent/10 to-accent/5">
                <img
                  src={data.styleImage}
                  alt={data.styleName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                
                {/* Safety Badge Overlay */}
                <div className="absolute top-3 right-3">
                  <Badge className={`${getSafetyColor(data.hairSafetyLevel)} border shadow-sm`}>
                    <Shield className="w-3 h-3 mr-1" />
                    {data.hairSafetyLevel} Safety
                  </Badge>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg text-primary">Your Style</h3>
                  <Star className="w-4 h-4 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {data.hairstyleDescription}
                </p>
              </div>
            </motion.div>

            {/* Your Photos Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-card rounded-2xl p-5 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <Camera className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-lg text-primary">Your Photos</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                    Front View
                  </p>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-square bg-muted rounded-xl overflow-hidden border-2 border-border/50 cursor-pointer"
                    onClick={() => setSelectedPreview(data.frontImage)}
                  >
                    <img
                      src={data.frontImage}
                      alt="Front view"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>
                </div>
                
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                    Back View
                  </p>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-square bg-muted rounded-xl overflow-hidden border-2 border-border/50 cursor-pointer"
                    onClick={() => setSelectedPreview(data.backImage)}
                  >
                    <img
                      src={data.backImage}
                      alt="Back view"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                      <ZoomIn className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground text-center mt-3">
                Click any photo to enlarge
              </p>
            </motion.div>
          </div>

          {/* Details Section - Glass Morphism */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-accent/5 via-accent/8 to-accent/5 border border-accent/20"
          >
            {/* Decorative background */}
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
            
            <div className="relative p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <Heart className="w-5 h-5 text-accent" />
                <h3 className="font-semibold text-primary">Style Details</h3>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                    Style Name
                  </p>
                  <p className="font-bold text-primary text-lg">{data.styleName}</p>
                </div>
                
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    Price
                  </p>
                  <p className="font-bold text-primary text-2xl">£{data.price}</p>
                </div>
                
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Duration
                  </p>
                  <div className="flex items-baseline gap-0.5">
                    <p className="font-bold text-primary text-2xl">{data.duration}</p>
                    <p className="text-sm text-muted-foreground">hours</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                    Safety Level
                  </p>
                  <Badge className={`${getSafetyColor(data.hairSafetyLevel)} border px-3 py-1.5 text-sm font-semibold`}>
                    <Shield className="w-3.5 h-3.5 mr-1.5" />
                    {data.hairSafetyLevel} Safety
                  </Badge>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="pt-4"
          >
            <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-2xl p-6 md:p-8 text-center">
              <p className="text-primary font-medium mb-4">
                We'll match you with stylists who specialize in {data.styleName}
              </p>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setIsHoveringButton(true)}
                onHoverEnd={() => setIsHoveringButton(false)}
              >
                <Button
                  onClick={onFindStylist}
                  className="relative overflow-hidden group bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold py-6 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full md:w-auto min-w-[280px]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    Find Your Perfect Stylist
                    <motion.div
                      animate={{ x: isHoveringButton ? 5 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </span>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </Button>
              </motion.div>
              
              <div className="flex items-center justify-center gap-4 mt-5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Flexible booking</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>Expert stylists</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {selectedPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPreview(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-3xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPreview}
                alt="Preview"
                className="w-full h-full object-contain rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => setSelectedPreview(null)}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};