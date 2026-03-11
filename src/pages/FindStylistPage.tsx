import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { stylists, hairstyles } from "@/data/demo-data";
import { 
  Star, MapPin, Search, SlidersHorizontal, Heart, 
  Sparkles, Crown, Clock, Award, ChevronRight, X,
  Users, Scissors, Filter, CheckCircle, Zap, Calendar
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import InstantMatchButton from "@/components/smart-match/InstantMatchButton";
import MatchModal from "@/components/smart-match/MatchModal";

const FindStylistPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterStyle, setFilterStyle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [postcode, setPostcode] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);

  const handleFindStylist = () => {
    if (!isAuthenticated) {
      navigate("/login");
      toast("Please log in to find a stylist");
      return;
    }
    
    if (user?.role !== 'customer') {
      toast("Only customers can find a stylist. Stylists, please browse or create your profile.");
      return;
    }
    
    if (!postcode) {
      toast("Please add your postcode");
      return;
    }
    
    setIsMatchModalOpen(true);
  };

  useEffect(() => {
    if (user) {
      const favs = JSON.parse(localStorage.getItem(`braidlink_favorites_${user.id}`) || "[]");
      setFavorites(favs);
    }
  }, [user]);

  const toggleFavorite = (stylistId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast("Please log in to save favourites");
      return;
    }
    const key = `braidlink_favorites_${user.id}`;
    const favs: string[] = JSON.parse(localStorage.getItem(key) || "[]");
    if (favorites.includes(stylistId)) {
      const updated = favs.filter((f) => f !== stylistId);
      localStorage.setItem(key, JSON.stringify(updated));
      setFavorites(updated);
      toast("Removed from favourites");
    } else {
      const updated = [...favs, stylistId];
      localStorage.setItem(key, JSON.stringify(updated));
      setFavorites(updated);
      toast("Added to favourites ❤️");
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
  };

  return (
    <div className="relative bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-b from-primary to-primary/95">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[120px] animate-pulse delay-1000" />
          <div className="absolute inset-0 opacity-5" 
               style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm text-background text-xs font-medium px-5 py-2.5 rounded-full mb-6 border border-accent/30 shadow-lg"
            >
              <Users className="w-4 h-4 text-accent" />
              <span>{stylists.length} Certified Expert Braiders</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
              <span className="text-accent font-semibold">Available Now</span>
            </motion.div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight">
              Find Your Perfect <br />
              <span className="text-accent relative">
                Braiding Artist
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4L200 4" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-accent/30"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto leading-relaxed font-brand mb-8">
              Connect with talented professionals who specialize in your desired style. 
              Book with confidence.
            </p>
            
            {/* Instant Match Button - Added at Top */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex justify-center mb-8"
            >
              <InstantMatchButton 
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate("/login");
                    toast("Please log in to use Instant Match");
                    return;
                  }
                  if (user?.role !== 'customer') {
                    toast("Only customers can use Instant Match");
                    return;
                  }
                  setIsMatchModalOpen(true);
                }} 
                size="lg" 
                variant="secondary"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Curved divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Search & Filters - Enhanced */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-5 border border-border/50 shadow-lg mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {/* Hairstyle */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium mb-2 flex text-primary items-center gap-1.5">
                  <Scissors className="w-4 h-4 text-accent" />
                  Hairstyle
                </label>
                <select 
                  value={filterStyle} 
                  onChange={(e) => setFilterStyle(e.target.value)} 
                  className="w-full pl-3 pr-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                >
                  <option value="">All styles</option>
                  {[...new Set(hairstyles.map((h) => h.name))].map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="text-sm font-medium mb-2 flex text-primary items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-accent" />
                  Date
                </label>
                <input 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                />
              </div>

              {/* Time */}
              <div>
                <label className="text-sm font-medium mb-2 flex text-primary items-center gap-1.5">
                  <Clock className="w-4 h-4 text-accent" />
                  Time
                </label>
                <input 
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                />
              </div>

              {/* Postcode */}
              <div>
                <label className="text-sm font-medium mb-2 flex text-primary items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-accent" />
                  Postcode
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. SW1A 0AA"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                />
              </div>
            </div>
            <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleFindStylist} 
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl border transition-all w-full mt-4 bg-accent text-primary"
              >
                <Search className="w-4 h-4" /> 
                <span className="font-medium">Find Stylist</span>
              </motion.button>
          </motion.div>

          {/* Results Header */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex items-center justify-between mb-6"
          >
            <p className="text-sm text-detail font-brand flex items-center gap-2">
              <span className="bg-accent/10 text-accent font-semibold px-2 py-1 rounded-md">
                {stylists.length}
              </span> 
              {stylists.length === 1 ? 'stylist available' : 'stylists available'}
            </p>
            
            
          </motion.div>

          {/* Stylists Grid - Enhanced */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stylists.map((stylist, i) => (
              <motion.div
                key={stylist.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link to={`/stylist/${stylist.id}`} className="block h-full">
                  <div className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-2xl h-full flex flex-col">
                    {/* Image Container */}
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img 
                        src={stylist.photo.replace("w=200&h=200", "w=600&h=800")} 
                        alt={stylist.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-60" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {stylist.featured && (
                          <span className="bg-accent text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                            <Crown className="w-3 h-3" /> Featured
                          </span>
                        )}
                        {stylist.rating >= 4.8 && (
                          <span className="bg-background/90 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-accent/20 flex items-center gap-1">
                            <Award className="w-3 h-3 text-accent" /> Top Rated
                          </span>
                        )}
                      </div>

                      {/* Favorite Button */}
                      {isAuthenticated && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => toggleFavorite(stylist.id, e)}
                          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center transition-all hover:shadow-lg border border-border/50"
                        >
                          <Heart className={`w-5 h-5 transition-colors ${
                            favorites.includes(stylist.id) 
                              ? "fill-destructive text-destructive" 
                              : "text-muted-foreground group-hover:text-accent"
                          }`} />
                        </motion.button>
                      )}

                      {/* Stylist Info Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 text-background z-10">
                        <h3 className="font-serif font-bold text-2xl group-hover:text-accent transition-colors mb-1">
                          {stylist.name}
                        </h3>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-accent text-accent" />
                            <span className="font-semibold">{stylist.rating}</span>
                            <span className="opacity-80">({stylist.reviewCount})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span className="opacity-90 text-xs">{stylist.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      {/* Specialties */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {stylist.specialties.slice(0, 3).map((s) => (
                          <span 
                            key={s} 
                            className="text-xs bg-accent/10 text-detail px-2.5 py-1.5 rounded-full font-medium border border-accent/20"
                          >
                            {s}
                          </span>
                        ))}
                        {stylist.specialties.length > 3 && (
                          <span className="text-xs bg-muted text-detail px-2.5 py-1.5 rounded-full font-medium">
                            +{stylist.specialties.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between pt-4 mt-auto border-t border-border">
                        <div>
                          <span className="text-xs text-detail block mb-1">Starting from</span>
                          <span className="text-xl font-bold text-primary">
                            ${Math.min(...stylist.services.map((s) => s.price))}
                          </span>
                          <span className="text-xs text-detail ml-1">+</span>
                        </div>
                        
                        <motion.div 
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-1 text-accent font-semibold"
                        >
                          <span>View Profile</span>
                          <ChevronRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {stylists.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-card rounded-3xl border border-border"
            >
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary mb-2">No stylists found</h3>
              <p className="text-detail mb-6 max-w-md mx-auto">
                Try adjusting your filters or search criteria to find more stylists.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setFilterStyle("");
                }}
                className="text-accent font-semibold hover:underline inline-flex items-center gap-1"
              >
                Clear all filters <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Load More Button */}
          {stylists.length > 6 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-10 text-center"
            >
              <button className="btn-cta bg-card text-primary border-2 border-accent/30 hover:bg-accent/5 px-8 py-3 rounded-xl inline-flex items-center gap-2">
                Load More Stylists
                <Zap className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-12 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: CheckCircle, label: "Verified Professionals", value: "100%" },
              { icon: Star, label: "Average Rating", value: "4.9 ★" },
              { icon: Clock, label: "Quick Booking", value: "Under 2 min" },
              { icon: Heart, label: "Happy Customers", value: "10,000+" },
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                  <badge.icon className="w-6 h-6 text-accent" />
                </div>
                <p className="text-2xl font-bold text-primary">{badge.value}</p>
                <p className="text-xs text-detail">{badge.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <MatchModal 
        isOpen={isMatchModalOpen} 
        onClose={() => setIsMatchModalOpen(false)}
        customerPostalCode={user?.postalCode || ""}
      />
    </div>
  );
};

export default FindStylistPage;
