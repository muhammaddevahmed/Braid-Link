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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    postalCode: params.get("postal") || user?.postalCode || "",
    minPrice: 0,
    maxPrice: 500,
    minRating: 0,
    selectedSpecialties: [],
    availability: "all",
  });

  const [showFilters, setShowFilters] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [filteredStylists, setFilteredStylists] = useState(stylists);

  // Load favorites from localStorage
  useEffect(() => {
    if (user?.id) {
      const stored = localStorage.getItem(`favorites_${user.id}`);
      if (stored) {
        setFavoriteIds(new Set(JSON.parse(stored)));
      }
    }
  }, [user?.id]);

  // Apply filters
  useEffect(() => {
    const results = stylists.filter((stylist) => {
      // Search query filter
      if (
        filters.searchQuery &&
        !stylist.name
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Postal code filter
      if (
        filters.postalCode &&
        stylist.location &&
        !stylist.location.includes(filters.postalCode)
      ) {
        return false;
      }

      // Rating filter
      if (stylist.rating < filters.minRating) {
        return false;
      }

      // Price filter (average price from services)
      const avgPrice = stylist.services.length > 0
        ? stylist.services.reduce((sum, s) => sum + s.price, 0) / stylist.services.length
        : 0;
      if (avgPrice < filters.minPrice || avgPrice > filters.maxPrice) {
        return false;
      }

      // Specialties filter
      if (filters.selectedSpecialties.length > 0) {
        const hasSpecialty = filters.selectedSpecialties.some((spec) =>
          stylist.specialties.some((s) =>
            s.toLowerCase().includes(spec.toLowerCase())
          )
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
      localStorage.setItem(
        `favorites_${user.id}`,
        JSON.stringify(Array.from(newFavorites))
      );
    }
  };

  const handleSelectStylist = (stylistId: string) => {
    if (!isAuthenticated) {
      toast.error("Please log in to book a stylist");
      navigate("/login");
      return;
    }

    navigate(`/booking?stylist=${stylistId}`);
  };

  // Get unique specialties
  const allSpecialties = Array.from(
    new Set(
      stylists.flatMap((s) => s.specialties)
    )
  ).sort();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-primary/95">
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

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Browse our talented community of braiding experts and book your
              perfect appointment.
            </p>
          </motion.div>
        </div>

        {/* Curved divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H0Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

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
                  placeholder="Search stylists by name..."
                  value={filters.searchQuery}
                  onChange={(e) =>
                    setFilters({ ...filters, searchQuery: e.target.value })
                  }
                  className="pl-10 h-12 rounded-lg border-border/50"
                />
              </div>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline">Filters</span>
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
                className="max-w-3xl mx-auto mb-8 bg-muted/50 rounded-lg p-6 border border-border/50"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Filter Results</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-1 hover:bg-background rounded transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Postal Code */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Postal Code
                    </label>
                    <Input
                      placeholder="Enter postal code"
                      value={filters.postalCode}
                      onChange={(e) =>
                        setFilters({ ...filters, postalCode: e.target.value })
                      }
                      className="border-border/50"
                    />
                  </div>

                  {/* Min Rating */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Minimum Rating: {filters.minRating.toFixed(1)}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="0.5"
                      value={filters.minRating}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          minRating: parseFloat(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Min Price: ${filters.minPrice}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={filters.minPrice}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          minPrice: parseInt(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Max Price: ${filters.maxPrice}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="10"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          maxPrice: parseInt(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Specialties */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Specialties
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {allSpecialties.map((specialty) => (
                        <button
                          key={specialty}
                          onClick={() => {
                            const updated = filters.selectedSpecialties.includes(
                              specialty
                            )
                              ? filters.selectedSpecialties.filter(
                                  (s) => s !== specialty
                                )
                              : [...filters.selectedSpecialties, specialty];
                            setFilters({
                              ...filters,
                              selectedSpecialties: updated,
                            });
                          }}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                            filters.selectedSpecialties.includes(specialty)
                              ? "bg-accent text-accent-foreground"
                              : "bg-muted hover:bg-muted/80 text-foreground"
                          }`}
                        >
                          {specialty}
                        </button>
                      ))}
                    </div>
                  </div>
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
            <p className="text-sm text-muted-foreground">
              Found {filteredStylists.length} stylist{filteredStylists.length !== 1 ? "s" : ""}
            </p>
          </motion.div>

          {/* Stylists Grid - Big Cards */}
          {filteredStylists.length > 0 ? (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            >
              {filteredStylists.map((stylist) => (
                <motion.div
                  key={stylist.id}
                  variants={item}
                  className="h-full"
                >
                  <div className="bg-gradient-to-br from-card to-card/95 rounded-2xl border border-border/50 overflow-hidden hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 flex flex-col h-full">
                    {/* Header with background image */}
                    <div className="aspect-[3/4] relative overflow-hidden group">
                      {stylist.photo ? (
                        <img
                          src={stylist.photo}
                          alt={stylist.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
                          <div className="text-center">
                            <Award className="w-20 h-20 text-primary/40 mx-auto mb-2" />
                            <span className="text-4xl font-bold text-primary/30">
                              {stylist.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Favorite Button - Overlay */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(stylist.id);
                        }}
                        className="absolute top-4 right-4 p-3 bg-background/80 backdrop-blur-sm rounded-full hover:bg-accent hover:text-primary transition-all shadow-lg"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            favoriteIds.has(stylist.id)
                              ? "fill-current text-red-500"
                              : "text-muted-foreground"
                          }`}
                        />
                      </motion.button>

                      {/* Rating Badge */}
                      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="font-semibold text-sm">
                          {stylist.rating} ({stylist.reviewCount} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-6 flex flex-col">
                      {/* Name and Title */}
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-primary mb-1">
                          {stylist.name}
                        </h3>
                        <p className="text-accent font-medium text-sm">
                          {stylist.specialties[0] || "Professional Stylist"}
                        </p>
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {/* Location */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                          <span className="line-clamp-1">{stylist.location || "City"}</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <DollarSign className="w-4 h-4 text-accent flex-shrink-0" />
                          <span className="font-semibold">${stylist.services.length > 0 ? Math.round(stylist.services.reduce((sum, s) => sum + s.price, 0) / stylist.services.length) : 0}</span>
                        </div>

                        {/* Experience */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Zap className="w-4 h-4 text-accent flex-shrink-0" />
                          <span>{stylist.experience}+ years</span>
                        </div>

                        {/* Status */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Zap className="w-4 h-4 text-accent flex-shrink-0" />
                          <span className="capitalize font-medium text-accent">{stylist.status}</span>
                        </div>
                      </div>

                      {/* Specialties */}
                      <div className="mb-6">
                        <p className="text-xs font-medium text-muted-foreground mb-2">
                          SPECIALTIES
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {stylist.specialties.slice(0, 3).map((specialty) => (
                            <span
                              key={specialty}
                              className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-medium"
                            >
                              {specialty}
                            </span>
                          ))}
                          {stylist.specialties.length > 3 && (
                            <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full font-medium">
                              +{stylist.specialties.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Buttons Section */}
                      <div className="flex gap-3 mt-auto">
                        <Button
                          variant="outline"
                          size="lg"
                          className="flex-1 gap-2"
                          onClick={() => navigate(`/stylist/${stylist.id}`)}
                        >
                          <Eye className="w-4 h-4" />
                          View Profile
                        </Button>
                        <Button
                          size="lg"
                          className="flex-1 gap-2 bg-gradient-to-r from-accent to-accent/90"
                          onClick={() => handleSelectStylist(stylist.id)}
                        >
                          <ArrowRight className="w-4 h-4" />
                          Book Now
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
              <div className="bg-muted/50 rounded-lg p-12 border border-border/50">
                <Search className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold mb-2">
                  No stylists found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to find the perfect stylist for
                  you.
                </p>
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
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 md:py-16 bg-primary/5 border-t border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Can't find what you're looking for?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Use our AI recommendation engine to get personalized stylist matches
              based on your hair needs and preferences.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/ai-recommendation")}
              className="gap-2"
            >
              Get AI Recommendations
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FindStylistPage;
