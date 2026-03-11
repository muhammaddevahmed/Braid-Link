import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { stylists } from "@/data/demo-data";
import { 
  Star, MapPin, Heart, Award, Sparkles, 
  Scissors, Clock, ChevronRight, Shield,
  User, Calendar, MessageCircle
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
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-3xl font-bold text-primary">Favorite Stylists</h2>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-card rounded-2xl border border-border/50"
        >
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-accent" />
          </div>
          <h3 className="font-serif text-xl font-bold text-primary mb-2">No favorites yet</h3>
          <p className="text-detail mb-6 max-w-sm mx-auto">
            Start adding stylists to your favorites by clicking the heart icon on their profiles.
          </p>
          <Link 
            to="/find-stylist" 
            className="btn-cta inline-flex items-center gap-2 px-6 py-3 rounded-xl"
          >
            Find Stylists <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-accent" />
              Your Collection
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Favorite Stylists</h2>
          <p className="text-detail mt-1 font-brand">You have {favorites.length} saved stylist{favorites.length !== 1 ? 's' : ''}</p>
        </div>
        
        <Link 
          to="/find-stylist" 
          className="text-accent hover:text-accent/80 text-sm font-semibold flex items-center gap-1 group"
        >
          Discover More
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Favorites Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
            <div className="bg-card rounded-2xl overflow-hidden border-2 border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-2xl">
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={s.photo.replace("w=200&h=200", "w=400&h=300")} 
                  alt={s.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
                
                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {s.featured && (
                    <span className="bg-accent text-primary text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                      <Award className="w-3 h-3" /> Featured
                    </span>
                  )}
                  {s.rating >= 4.8 && (
                    <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                      <Sparkles className="w-3 h-3" /> Top Rated
                    </span>
                  )}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => removeFavorite(s.id, e)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 hover:bg-destructive/20 group/btn"
                >
                  <Heart className="w-5 h-5 fill-destructive text-destructive group-hover/btn:scale-110 transition-transform" />
                </button>

                {/* Stylist Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-background">
                  <h3 className="font-serif font-bold text-xl group-hover:text-accent transition-colors">
                    {s.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-semibold">{s.rating}</span>
                      <span className="opacity-80">({s.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span className="opacity-90 text-xs">{s.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5">
                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {s.specialties.slice(0, 3).map((sp) => (
                    <span 
                      key={sp} 
                      className="text-xs bg-accent/10 text-detail px-2.5 py-1.5 rounded-full font-medium border border-accent/20"
                    >
                      {sp}
                    </span>
                  ))}
                  {s.specialties.length > 3 && (
                    <span className="text-xs bg-muted text-detail px-2.5 py-1.5 rounded-full font-medium">
                      +{s.specialties.length - 3}
                    </span>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-accent/5 rounded-lg p-2 text-center">
                    <Clock className="w-3.5 h-3.5 text-accent mx-auto mb-1" />
                    <p className="text-xs text-detail">Experience</p>
                    <p className="text-sm font-semibold text-primary">{s.experience} years</p>
                  </div>
                  <div className="bg-accent/5 rounded-lg p-2 text-center">
                    <Scissors className="w-3.5 h-3.5 text-accent mx-auto mb-1" />
                    <p className="text-xs text-detail">Services</p>
                    <p className="text-sm font-semibold text-primary">{s.services.length}+</p>
                  </div>
                </div>

                {/* Bio Preview */}
                <p className="text-xs text-detail line-clamp-2 mb-4">
                  {s.bio}
                </p>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Link 
                    to={`/stylist/${s.id}`} 
                    className="btn-primary text-xs py-2.5 px-3 rounded-lg text-center hover:scale-105 transition-transform flex items-center justify-center gap-1"
                  >
                    <User className="w-3.5 h-3.5" />
                    Profile
                  </Link>
                  <Link 
                    to={`/booking?stylist=${s.id}`} 
                    className="btn-cta text-xs py-2.5 px-3 rounded-lg text-center hover:scale-105 transition-transform flex items-center justify-center gap-1"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Book
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Actions Tooltip (on hover) */}
            {hoveredId === s.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs py-2 px-4 rounded-full whitespace-nowrap shadow-lg flex items-center gap-2"
              >
                <MessageCircle className="w-3 h-3" />
                Click heart to remove from favorites
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-6 bg-gradient-to-br from-accent/5 to-accent/10 rounded-2xl border border-accent/20"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <Heart className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h4 className="font-serif font-semibold text-primary">Share Your Favorites</h4>
              <p className="text-xs text-detail">Let friends know which stylists you love</p>
            </div>
          </div>
          <button className="border border-accent/30 text-accent px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-accent/10 transition-all flex items-center gap-2">
            Share Favorites
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Trust Badge */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-2 text-xs text-detail"
      >
        <Shield className="w-3 h-3 text-accent" />
        <span>Your favorites are saved to your account</span>
      </motion.div>
    </div>
  );
};

export default CustomerFavorites;