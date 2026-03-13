import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { stylists } from "@/data/demo-data";
import { 
  Star, MapPin, Heart, Award, Sparkles, 
  Scissors, Clock, ChevronRight, Shield,
  User, Calendar, MessageCircle, BadgeCheck,
  Zap, Gift, Share2, Bell, Bookmark,
  TrendingUp, Camera, Video, Coffee,
  CheckCircle, XCircle, Crown
} from "lucide-react";
import { useState } from "react";

const CustomerFavorites = () => {
  const [favorites, setFavorites] = useState(stylists.slice(0, 3));
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const removeFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites(favorites.filter(s => s.id !== id));
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">Favorite Stylists</h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-20 bg-gradient-to-br from-card to-secondary/5 rounded-3xl border border-border/50 shadow-xl"
        >
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto">
              <Heart className="w-10 h-10 text-accent" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-xl flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
          </div>
          
          <h3 className="font-serif text-2xl font-bold text-primary mb-3">No favorites yet</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Start adding stylists to your favorites by clicking the heart icon on their profiles.
          </p>
          
          <Link 
            to="/find-stylist" 
            className="bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold inline-flex items-center gap-2 px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-accent/25 transition-all group"
          >
            Find Stylists 
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header - Premium redesign */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="bg-gradient-to-r from-accent/10 to-accent/5 text-accent text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-accent/20"
            >
              <Heart className="w-3.5 h-3.5 fill-accent" />
              Your Collection
            </motion.div>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">Favorite Stylists</h2>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Bookmark className="w-4 h-4 text-accent" />
            <p className="text-sm">You have <span className="font-semibold text-primary">{favorites.length}</span> saved stylist{favorites.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            to="/find-stylist" 
            className="bg-gradient-to-r from-accent/10 to-accent/5 text-accent font-semibold text-sm px-6 py-3 rounded-xl flex items-center gap-2 hover:from-accent/20 hover:to-accent/10 transition-all border border-accent/20 group"
          >
            Discover More
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Favorites Grid - Premium redesign */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {favorites.map((s, index) => (
          <motion.div
            key={s.id}
            custom={index}
            variants={fadeUp}
            onHoverStart={() => setHoveredId(s.id)}
            onHoverEnd={() => setHoveredId(null)}
            className="group relative"
          >
            <div className="bg-card rounded-2xl overflow-hidden border-2 border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-2xl h-full flex flex-col">
              {/* Image Section - Premium */}
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={s.photo.replace("w=200&h=200", "w=600&h=1000")} 
                  alt={s.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-80" />
                
                {/* Top Badges - Premium */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {s.featured && (
                    <span className="bg-gradient-to-r from-amber-500 to-amber-400 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/20">
                      <Crown className="w-3 h-3" /> Featured
                    </span>
                  )}
                  {s.rating >= 4.8 && (
                    <span className="bg-gradient-to-r from-purple-500 to-purple-400 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/20">
                      <Sparkles className="w-3 h-3" /> Top Rated
                    </span>
                  )}
                </div>

                {/* Favorite Button - Premium */}
                <button
                  onClick={(e) => removeFavorite(s.id, e)}
                  className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 hover:bg-destructive/10 group/btn border border-white/20 shadow-lg"
                >
                  <Heart className="w-5 h-5 fill-destructive text-destructive group-hover/btn:scale-110 transition-transform" />
                </button>

                {/* Stylist Info Overlay - Premium */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-serif font-bold text-2xl group-hover:text-accent transition-colors">
                      {s.name}
                    </h3>
                    {s.rating >= 4.9 && (
                      <BadgeCheck className="w-5 h-5 text-accent" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                      <span className="font-semibold">{s.rating}</span>
                      <span className="text-white/80 text-xs">({s.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-full">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="text-xs">{s.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section - Premium */}
              <div className="p-5 flex-1 flex flex-col">
                {/* Specialties - Premium tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {s.specialties.slice(0, 3).map((sp) => (
                    <span 
                      key={sp} 
                      className="text-xs bg-gradient-to-r from-accent/10 to-accent/5 text-muted-foreground px-3 py-1.5 rounded-full font-medium border border-accent/20 hover:border-accent/40 transition-all"
                    >
                      {sp}
                    </span>
                  ))}
                  {s.specialties.length > 3 && (
                    <span className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full font-medium border border-border">
                      +{s.specialties.length - 3}
                    </span>
                  )}
                </div>

                {/* Quick Stats - Premium */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl p-3 text-center border border-accent/10 hover:border-accent/30 transition-all">
                    <Clock className="w-4 h-4 text-accent mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Experience</p>
                    <p className="text-sm font-bold text-primary">{s.experience} years</p>
                  </div>
                  <div className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl p-3 text-center border border-accent/10 hover:border-accent/30 transition-all">
                    <Scissors className="w-4 h-4 text-accent mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Services</p>
                    <p className="text-sm font-bold text-primary">{s.services.length}+</p>
                  </div>
                </div>

                {/* Bio Preview - Premium */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                  {s.bio}
                </p>

                {/* Action Buttons - Premium */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <Link 
                    to={`/stylist/${s.id}`} 
                    className="bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-semibold text-sm py-3 px-3 rounded-xl text-center hover:from-primary/20 hover:to-primary/10 transition-all border border-primary/20 group flex items-center justify-center gap-1.5"
                  >
                    <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Profile
                  </Link>
                  <Link 
                    to={`/booking?stylist=${s.id}`} 
                    className="bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold text-sm py-3 px-3 rounded-xl text-center hover:shadow-lg hover:shadow-accent/25 transition-all group flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Book
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Actions Tooltip - Premium */}
            {hoveredId === s.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary text-white text-xs py-2.5 px-5 rounded-full whitespace-nowrap shadow-xl flex items-center gap-2 border border-white/10"
              >
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <XCircle className="w-3 h-3 text-accent" />
                </div>
                Click heart to remove from favorites
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

     

      {/* Trust Badge - Premium */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 w-fit mx-auto"
      >
        <Shield className="w-3 h-3 text-accent" />
        <span>Your favorites are saved to your account</span>
        <BadgeCheck className="w-3 h-3 text-accent" />
      </motion.div>
    </div>
  );
};

export default CustomerFavorites;