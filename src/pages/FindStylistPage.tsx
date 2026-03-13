import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { stylists, hairstyles } from "@/data/demo-data";
import { 
  Star, MapPin, Search, SlidersHorizontal, Heart, 
  Sparkles, Crown, Clock, Award, ChevronRight, X,
  Users, Scissors, Filter, CheckCircle, Zap, Calendar
} from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [country, setCountry] = useState("UK");
  const [searchError, setSearchError] = useState(""); 

  // Filtered stylists (respects search and style filter)
  const filteredStylists = stylists.filter((stylist) => {
    const matchesSearch = stylist.name.toLowerCase().includes(search.toLowerCase()) || 
                          stylist.location.toLowerCase().includes(search.toLowerCase());
    const matchesStyle = !filterStyle || stylist.specialties.some(s => s.toLowerCase().includes(filterStyle.toLowerCase()));
    return matchesSearch && matchesStyle;
  });

  const totalPages = Math.ceil(filteredStylists.length / itemsPerPage);
  const paginatedStylists = filteredStylists.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFindStylist = () => {
    let isValid = false;
    if (country === 'US') {
      isValid = /^\d{5}$/.test(postcode);
    } else { // UK
      isValid = /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}$/i.test(postcode);
    }

    if (!isValid) {
      setSearchError(`Please enter a valid ${country === 'US' ? '5-digit US zip code' : 'UK postcode'}.`);
      toast("Please enter a valid postcode");
      return;
    }
    setSearchError("");
    if (!isAuthenticated) {
      navigate("/login");
      toast("Please log in to find a stylist");
      return;
    }
    
    if (user?.role !== 'customer') {
      toast("Only customers can find a stylist. Stylists, please browse or create your profile.");
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
      {/* Hero Section - Refined premium design */}
      <section className="relative overflow-hidden py-20 md:py-24 bg-gradient-to-br from-primary via-primary to-primary/95">
        {/* Sophisticated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-20 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[140px] animate-pulse delay-1000" />
          
          {/* Refined pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Premium badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-xs font-medium px-5 py-2.5 rounded-full mb-6 border border-white/20 shadow-xl"
            >
              <Users className="w-4 h-4 text-accent" />
              <span>{stylists.length} Certified Expert Braiders</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="text-accent font-semibold">Available Now</span>
            </motion.div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect <br />
              <span className="text-accent relative inline-block">
                Braiding Artist
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4L200 4" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-accent/40"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light mb-8">
              Connect with talented professionals who specialize in your desired style. 
              Book with confidence.
            </p>
            
            {/* Postal Code Search - HomePage style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="max-w-xl mx-auto mb-12"
            >
              <div className="bg-white/95 backdrop-blur-md rounded-2xl p-1.5 flex flex-col sm:flex-row gap-1.5 shadow-2xl border border-border/20">
                <div className="flex items-center gap-2 flex-1 bg-card rounded-xl px-4">
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="bg-transparent text-sm py-3.5 outline-none text-primary font-medium"
                  >
                    <option value="UK">UK</option>
                    <option value="US">US</option>
                  </select>
                  <MapPin className="w-5 h-5 text-accent/70" />
                  <input
                    type="text"
                    placeholder={country === 'US' ? 'Enter zip code' : 'Enter postcode'}
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    className="w-full bg-transparent text-sm py-3.5 outline-none text-primary placeholder:text-primary/40"
                  />
                </div>
                <button
                  onClick={handleFindStylist}
                  className="bg-accent text-primary font-semibold flex items-center justify-center gap-2 text-sm whitespace-nowrap px-8 py-3.5 rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-accent/25 group"
                >
                  <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Search Nearby
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              {searchError && (
                <p className="text-xs text-destructive bg-destructive/10 backdrop-blur-sm inline-block px-4 py-2 rounded-full text-center">
                  {searchError}
                </p>
              )}
              {postcode && !isAuthenticated && (
                <p className="text-xs text-muted-foreground text-center">
                  Log in to book stylists near {postcode} ({country})
                </p>
              )}
              <p className="text-xs text-white/60 mt-3 text-center font-light">
                {country === 'US' 
                  ? "US zip codes should be 5 digits (e.g., 90210)"
                  : "UK postcodes are alphanumeric (e.g., SW1A 0AA)"
                }
              </p>
            </motion.div>

            {/* Instant Match Button - Premium styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex justify-center"
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

        {/* Elegant curved divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          

          {/* Results Header - Refined */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 bg-accent rounded-full" />
              <p className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="bg-accent/10 text-accent font-semibold px-3 py-1.5 rounded-lg text-base">
                  {filteredStylists.length}
                </span> 
                {stylists.length === 1 ? 'stylist available' : 'stylists available'}
              </p>
            </div>
            
            {/* Filter button placeholder (preserved) */}
          </motion.div>

          {/* Stylists Grid - Premium card redesign */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {paginatedStylists.map((stylist, i) => (
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
                  <div className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-2xl h-full flex flex-col">
                    {/* Image Container - Refined */}
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img 
                        src={stylist.photo.replace("w=200&h=200", "w=600&h=800")} 
                        alt={stylist.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Gradient Overlay - Refined */}
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent opacity-70" />
                      
                      {/* Top Badges - Premium */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                        {stylist.featured && (
                          <span className="bg-accent text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                            <Crown className="w-3 h-3" /> Featured
                          </span>
                        )}
                        {stylist.rating >= 4.8 && (
                          <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-accent/20 flex items-center gap-1.5 shadow-lg">
                            <Award className="w-3 h-3 text-accent" /> Top Rated
                          </span>
                        )}
                      </div>

                      {/* Favorite Button - Premium */}
                      {isAuthenticated && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => toggleFavorite(stylist.id, e)}
                          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:shadow-xl border border-white/20"
                        >
                          <Heart className={`w-5 h-5 transition-all duration-300 ${
                            favorites.includes(stylist.id) 
                              ? "fill-destructive text-destructive scale-110" 
                              : "text-primary/60 group-hover:text-accent"
                          }`} />
                        </motion.button>
                      )}

                      {/* Stylist Info Overlay - Refined */}
                      <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                        <h3 className="font-serif font-bold text-2xl group-hover:text-accent transition-colors mb-1">
                          {stylist.name}
                        </h3>
                        <div className="flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-1.5">
                            <Star className="w-4 h-4 fill-accent text-accent" />
                            <span className="font-semibold">{stylist.rating}</span>
                            <span className="opacity-80 text-xs">({stylist.reviewCount})</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 opacity-80" />
                            <span className="opacity-90 text-xs">{stylist.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Quick availability indicator */}
                      <div className="absolute bottom-20 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-primary flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span>Available for booking</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content - Refined */}
                    <div className="p-5 flex-1 flex flex-col bg-card">
                      {/* Specialties - Premium tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {stylist.specialties.slice(0, 3).map((s) => (
                          <span 
                            key={s} 
                            className="text-xs bg-gradient-to-r from-accent/10 to-accent/5 text-muted-foreground px-3 py-1.5 rounded-full font-medium border border-accent/20"
                          >
                            {s}
                          </span>
                        ))}
                        {stylist.specialties.length > 3 && (
                          <span className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full font-medium border border-border">
                            +{stylist.specialties.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Price and CTA - Refined */}
                      <div className="flex items-center justify-between pt-4 mt-auto border-t border-border/50">
                        <div>
                          <span className="text-xs text-muted-foreground block mb-1">Starting from</span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-primary">
                              ${Math.min(...stylist.services.map((s) => s.price))}
                            </span>
                            <span className="text-xs text-muted-foreground">+</span>
                          </div>
                        </div>
                        
                        <motion.div 
                          whileHover={{ x: 5 }}
                          className="flex items-center gap-1.5 text-accent font-semibold bg-accent/5 px-3 py-2 rounded-lg group-hover:bg-accent/10 transition-all"
                        >
                          <span className="text-sm">View Profile</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Empty State - Premium redesign */}
          {stylists.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-gradient-to-br from-card to-secondary/5 rounded-3xl border border-border/50 shadow-xl"
            >
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-accent" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-3">No stylists found</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Try adjusting your filters or search criteria to find more stylists.
              </p>
              <button
                onClick={() => {
                  setSearch("");
                  setFilterStyle("");
                }}
                className="bg-accent text-primary font-semibold px-6 py-3 rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-accent/25 inline-flex items-center gap-2 group"
              >
                Clear all filters
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-16 flex justify-center"
            >
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    const page = currentPage <= 4 
                      ? i + 1 
                      : currentPage >= totalPages - 3 
                      ? totalPages - 6 + i 
                      : currentPage - 3 + i;
                    if (page > 0 && page <= totalPages) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink 
                            isActive={currentPage === page}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </motion.div>
          )}

          {/* Load More Button - Premium styling (fallback for no pagination) */}
          {totalPages <= 1 && filteredStylists.length > 6 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 text-center"
            >
              <button className="bg-card text-primary font-semibold border-2 border-accent/30 hover:border-accent/50 px-8 py-3.5 rounded-xl inline-flex items-center gap-2 transition-all duration-300 hover:shadow-lg group">
                Load More Stylists
                <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Trust Badges Section - Premium redesign */}
      <section className="py-16 bg-gradient-to-b from-secondary/10 to-secondary/20 border-y border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
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
                className="text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 border border-accent/20">
                  <badge.icon className="w-7 h-7 text-accent" />
                </div>
                <p className="text-2xl md:text-3xl font-bold text-primary mb-1">{badge.value}</p>
                <p className="text-xs text-muted-foreground tracking-wide">{badge.label}</p>
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