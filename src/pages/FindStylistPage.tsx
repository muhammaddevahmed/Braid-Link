import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { stylists, hairstyles } from "@/data/demo-data";
import { Star, MapPin, Search, SlidersHorizontal, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import InstantMatchButton from "@/components/smart-match/InstantMatchButton";
import MatchModal from "@/components/smart-match/MatchModal";

const FindStylistPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterStyle, setFilterStyle] = useState("");
  const [filterRating, setFilterRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);

  const handleInstantMatch = () => {
    if (!isAuthenticated) {
      navigate("/login");
      toast("Please log in to use Instant Match");
      return;
    }
    
    if (user?.role !== 'customer') {
      toast("Only customers can use Instant Match. Stylists, please browse or create your profile.");
      return;
    }
    
    if (!user?.postalCode) {
      toast("Please add your postal code to your profile");
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

  const filtered = stylists.filter((s) => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.location.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterStyle && !s.specialties.includes(filterStyle)) return false;
    if (filterRating && s.rating < filterRating) return false;
    return true;
  });

  return (
    <div className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-4xl font-bold text-primary">Find a Stylist</h1>
            <p className="text-detail mt-2 font-brand">Search from our network of talented braiding professionals</p>
          </div>
          <InstantMatchButton onClick={handleInstantMatch} size="md" variant="primary" />
        </div>

        {/* Search & Filters */}
        <div className="bg-card rounded-xl p-4 border border-detail/20 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or location..." className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent" />
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-detail/20 text-sm font-medium hover:bg-accent/10 transition-colors text-primary">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>

          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mt-4 pt-4 border-t border-detail/20 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block text-primary">Hairstyle</label>
                <select value={filterStyle} onChange={(e) => setFilterStyle(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-detail/20 bg-background text-sm focus:ring-2 focus:ring-accent">
                  <option value="">All styles</option>
                  {[...new Set(hairstyles.map((h) => h.name))].map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block text-primary">Minimum Rating</label>
                <select value={filterRating} onChange={(e) => setFilterRating(Number(e.target.value))} className="w-full px-3 py-2 rounded-lg border border-detail/20 bg-background text-sm focus:ring-2 focus:ring-accent">
                  <option value={0}>Any rating</option>
                  <option value={4}>4+ stars</option>
                  <option value={4.5}>4.5+ stars</option>
                  <option value={4.8}>4.8+ stars</option>
                </select>
              </div>
              <div className="flex items-end">
                <button onClick={() => { setFilterStyle(""); setFilterRating(0); setSearch(""); }} className="text-sm text-accent hover:underline font-semibold">
                  Clear all filters
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <p className="text-sm text-detail mb-4 font-brand">{filtered.length} stylist{filtered.length !== 1 ? "s" : ""} found</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((stylist, i) => (
            <motion.div
              key={stylist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="bg-card rounded-xl overflow-hidden card-hover border border-detail/20 relative">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img src={stylist.photo.replace("w=200&h=200", "w=600&h=800")} alt={stylist.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                  {isAuthenticated && (
                    <button
                      onClick={(e) => toggleFavorite(stylist.id, e)}
                      className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110"
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(stylist.id) ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
                    </button>
                  )}
                  <div className="absolute bottom-4 left-4 right-4 text-background">
                    <h3 className="font-serif font-semibold text-xl">{stylist.name}</h3>
                    <div className="flex items-center gap-2 text-sm mt-1">
                      <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                      {stylist.rating} ({stylist.reviewCount} reviews)
                    </div>
                    <p className="text-xs flex items-center gap-1 mt-1 opacity-90"><MapPin className="w-3 h-3" /> {stylist.location}</p>
                  </div>
                </div>
                <div className="px-5 py-4">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {stylist.specialties.map((s) => (
                      <span key={s} className="text-xs bg-accent/10 text-detail px-2 py-1 rounded-full font-medium">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-detail/20">
                    <span className="text-sm font-medium text-primary">From ${Math.min(...stylist.services.map((s) => s.price))}</span>
                    <Link to={`/stylist/${stylist.id}`} className="btn-cta text-xs px-4 py-2">View Profile</Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

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
