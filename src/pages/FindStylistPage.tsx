import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { stylists, hairstyleCategories } from "@/data/demo-data";
import { useAuth } from "@/contexts/AuthContext";
import {
  Search,
  MapPin,
  Star,
  Clock,
  DollarSign,
  ArrowRight,
  Filter,
  X,
  Heart,
  Eye,
  Zap,
  Award,
  Sparkles,
  Shield,
  Camera,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface FilterOptions {
  searchQuery: string;
  postalCode: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  selectedSpecialties: string[];
  availability: "available" | "all";
}

const FindStylistPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: "",
    postalCode: "",
    minPrice: 0,
    maxPrice: 500,
    minRating: 0,
    selectedSpecialties: [],
    availability: "all",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const [showFilters, setShowFilters] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [filteredStylists, setFilteredStylists] = useState<typeof stylists>(stylists);

  useEffect(() => {
    if (user?.id) {
      const stored = localStorage.getItem(`favorites_${user.id}`);
      if (stored) {
        setFavoriteIds(new Set(JSON.parse(stored)));
      }
    }
  }, [user?.id]);

  useEffect(() => {
    const results = stylists.filter((stylist) => {
      if (filters.searchQuery && !stylist.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }
      if (filters.postalCode && stylist.location && !stylist.location.includes(filters.postalCode)) {
        return false;
      }
      if (stylist.rating < filters.minRating) {
        return false;
      }
      const avgPrice = stylist.services.length > 0
        ? stylist.services.reduce((sum, s) => sum + s.price, 0) / stylist.services.length
        : 0;
      if (avgPrice < filters.minPrice || avgPrice > filters.maxPrice) {
        return false;
      }
      if (filters.selectedSpecialties.length > 0) {
        const hasSpecialty = filters.selectedSpecialties.some((spec) =>
          stylist.specialties.some((s) => s.toLowerCase().includes(spec.toLowerCase()))
        );
        if (!hasSpecialty) return false;
      }
      return true;
    });

    setFilteredStylists(results);
  }, [filters]);

  const toggleFavorite = (stylistId: string) => {
    const newFavorites = new Set(favoriteIds);
    if (newFavorites.has(stylistId)) {
      newFavorites.delete(stylistId);
      toast.success("Removed from favorites");
    } else {
      newFavorites.add(stylistId);
      toast.success("Added to favorites");
    }
    setFavoriteIds(newFavorites);

    if (user?.id) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(Array.from(newFavorites)));
    }
  };

  const handleSelectStylist = (stylistId: string) => {
    if (!isAuthenticated) {
      toast.error("Please log in to book a stylist");
      navigate("/login");
      return;
    }

    const selectedStylist = stylists.find(s => s.id === stylistId);
    if (selectedStylist) {
      sessionStorage.setItem('selectedStylist', JSON.stringify({
        id: selectedStylist.id,
        name: selectedStylist.name,
        photo: selectedStylist.photo,
        rating: selectedStylist.rating,
        reviewCount: selectedStylist.reviewCount,
        location: selectedStylist.location,
        isManuallySelected: true,
      }));
    }

    navigate("/ai-recommendation", { state: { from: "/find-stylist", label: "Find Stylist" } });
  };

  const handleAIRec = () => {
    navigate("/ai-recommendation");
  };

  const allSpecialties = Array.from(new Set(stylists.flatMap((s) => s.specialties))).sort();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-br from-primary via-primary to-primary/95">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-20 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[140px] animate-pulse delay-1000" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-accent">Find Your Match</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your Perfect <br />
              <span className="text-accent relative inline-block">
                Stylist
                <svg
                  className="absolute -bottom-3 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 4L200 4"
                    stroke="currentColor"
                    strokeWidth="6"
                    strokeLinecap="round"
                    className="text-accent/40"
                  />
                </svg>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Browse our talented community of braiding experts and book your perfect appointment.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* AI Recommendation Banner - Prominent CTA */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-gradient-to-r from-accent/20 via-accent/10 to-accent/5 rounded-2xl border border-accent/30 p-5 md:p-6 shadow-xl"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Camera className="w-6 h-6 text-accent" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">NEW</span>
                  <h3 className="font-semibold text-primary text-lg">AI Smart Stylist Matching</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Upload your photo and let our AI find the perfect stylist for your hair type
                </p>
              </div>
            </div>
            <Button
              onClick={handleAIRec}
              className="bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold px-6 py-2.5 rounded-full hover:shadow-lg transition-all group whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Get AI Recommendation
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search stylists by name, specialty..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                  className="pl-10 h-12 rounded-xl border-border/50 focus:border-accent focus:ring-accent/20"
                />
              </div>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2 rounded-xl border-border/50 hover:border-accent/50"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
                {showFilters ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
              </Button>
            </div>
          </motion.div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="max-w-3xl mx-auto mb-8 bg-muted/30 rounded-xl p-6 border border-border/50"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Filter className="w-4 h-4 text-accent" />
                    Filter Results
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-1 hover:bg-background rounded-full transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Postal Code</label>
                    <Input
                      placeholder="Enter postal code"
                      value={filters.postalCode}
                      onChange={(e) => setFilters({ ...filters, postalCode: e.target.value })}
                      className="border-border/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Min Rating</label>
                    <div className="flex gap-2">
                      {[0, 3, 4, 4.5].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setFilters({ ...filters, minRating: rating })}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                            filters.minRating === rating
                              ? "bg-accent text-accent-foreground"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                        >
                          {rating === 0 ? "Any" : `${rating}+`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Specialties</label>
                    <div className="flex flex-wrap gap-2">
                      {allSpecialties.slice(0, 12).map((specialty) => (
                        <button
                          key={specialty}
                          onClick={() => {
                            const updated = filters.selectedSpecialties.includes(specialty)
                              ? filters.selectedSpecialties.filter((s) => s !== specialty)
                              : [...filters.selectedSpecialties, specialty];
                            setFilters({ ...filters, selectedSpecialties: updated });
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                            filters.selectedSpecialties.includes(specialty)
                              ? "bg-accent text-accent-foreground"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                        >
                          {specialty}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/30 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setFilters({
                        searchQuery: "",
                        postalCode: "",
                        minPrice: 0,
                        maxPrice: 500,
                        minRating: 0,
                        selectedSpecialties: [],
                        availability: "all",
                      });
                    }}
                    className="text-muted-foreground"
                  >
                    Clear All
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                {isLoading ? 'Loading stylists...' : `Found ${filteredStylists.length} stylist${filteredStylists.length !== 1 ? "s" : ""}`}
              </p>
              {!isLoading && filteredStylists.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleAIRec}
                  className="text-xs gap-1 text-accent"
                >
                  <Sparkles className="w-3 h-3" />
                  Get AI matched instead
                </Button>
              )}
            </div>
          </motion.div>

          {/* Stylists Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border/50 overflow-hidden flex flex-col h-full">
                  <Skeleton className="aspect-[3/4] w-full" />
                  <div className="p-6 flex flex-col gap-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="grid grid-cols-2 gap-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                    <Skeleton className="h-8 w-full mt-2" />
                    <div className="flex gap-3 mt-auto">
                      <Skeleton className="h-12 w-full rounded-lg" />
                      <Skeleton className="h-12 w-full rounded-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredStylists.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {filteredStylists.map((stylist) => (
                <motion.div key={stylist.id} variants={item} className="h-full group">
                  <div className="bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-accent/40 transition-all duration-300 hover:shadow-xl flex flex-col h-full">
                    {/* Image Container */}
                    <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-accent/10 to-accent/5">
                      {stylist.photo ? (
                        <img
                          src={stylist.photo}
                          alt={stylist.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Award className="w-16 h-16 text-accent/30" />
                        </div>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(stylist.id);
                        }}
                        className="absolute top-3 right-3 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-accent hover:text-primary transition-all shadow-md"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            favoriteIds.has(stylist.id)
                              ? "fill-current text-red-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      </motion.button>

                      <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                        <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                        <span className="font-semibold text-sm">{stylist.rating}</span>
                        <span className="text-xs text-muted-foreground">({stylist.reviewCount})</span>
                      </div>
                    </div>

                    <div className="flex-1 p-5 flex flex-col">
                      <div className="mb-3">
                        <h3 className="text-xl font-bold text-primary mb-1">{stylist.name}</h3>
                        <p className="text-accent font-medium text-sm">
                          {stylist.specialties[0] || "Professional Stylist"}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5 text-accent" />
                          <span className="truncate">{stylist.location || "City"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3.5 h-3.5 text-accent" />
                          <span>{stylist.experience}+ years</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {stylist.specialties.slice(0, 3).map((specialty) => (
                          <span key={specialty} className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                            {specialty}
                          </span>
                        ))}
                        {stylist.specialties.length > 3 && (
                          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                            +{stylist.specialties.length - 3}
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2 mt-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 gap-1 text-sm"
                          onClick={() => navigate(`/stylist/${stylist.id}`)}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          Profile
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 gap-1 bg-gradient-to-r from-accent to-accent/90 text-sm"
                          onClick={() => handleSelectStylist(stylist.id)}
                        >
                          Book
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-3xl mx-auto text-center py-16"
            >
              <div className="bg-muted/30 rounded-xl p-12 border border-border/50">
                <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No stylists found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find the perfect stylist for you.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilters({
                        searchQuery: "",
                        postalCode: "",
                        minPrice: 0,
                        maxPrice: 500,
                        minRating: 0,
                        selectedSpecialties: [],
                        availability: "all",
                      });
                      setShowFilters(false);
                    }}
                  >
                    Clear All Filters
                  </Button>
                  <Button
                    onClick={handleAIRec}
                    className="bg-gradient-to-r from-accent to-accent/90"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Try AI Recommendation
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer CTA Section */}
      <section className="py-12 md:py-16 bg-primary/5 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-medium text-accent">AI Powered</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
              Can't find what you're looking for?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
              Use our AI recommendation engine to get personalized stylist matches
              based on your hair needs and preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={handleAIRec}
                className="gap-2 bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold px-8 py-3 rounded-full"
              >
                <Camera className="w-4 h-4" />
                Upload Photo for AI Match
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-accent" />
                <span>Free Consultation</span>
              </div>
              <span className="text-muted-foreground/30">•</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                <span>100% Privacy</span>
              </div>
              <span className="text-muted-foreground/30">•</span>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-accent" />
                <span>Smart Matching</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FindStylistPage;