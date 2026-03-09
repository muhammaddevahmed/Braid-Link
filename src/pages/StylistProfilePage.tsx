import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { stylists, reviews } from "@/data/demo-data";
import { Star, MapPin, Clock, Calendar, ArrowLeft, Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const StylistProfilePage = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const stylist = stylists.find((s) => s.id === id);
  const stylistReviews = reviews.filter((r) => r.stylistId === id);

  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (user && id) {
      const favs = JSON.parse(localStorage.getItem(`braidlink_favorites_${user.id}`) || "[]");
      setIsFavorited(favs.includes(id));
    }
  }, [user, id]);

  const toggleFavorite = () => {
    if (!user) return;
    const key = `braidlink_favorites_${user.id}`;
    const favs: string[] = JSON.parse(localStorage.getItem(key) || "[]");
    if (isFavorited) {
      localStorage.setItem(key, JSON.stringify(favs.filter((f) => f !== id)));
      setIsFavorited(false);
      toast("Removed from favourites");
    } else {
      localStorage.setItem(key, JSON.stringify([...favs, id]));
      setIsFavorited(true);
      toast("Added to favourites ❤️");
    }
  };

  if (!stylist) return <div className="py-20 text-center"><p>Stylist not found.</p><Link to="/find-stylist" className="text-cta hover:underline mt-2 inline-block">Browse Stylists</Link></div>;

  const days = Object.entries(stylist.availability);

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <Link to="/find-stylist" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Stylists
        </Link>

        {/* Banner */}
        <div className="rounded-2xl overflow-hidden mb-6 relative h-48 md:h-64" style={{ background: "var(--gradient-hero)" }}>
          {isAuthenticated && (
            <button
              onClick={toggleFavorite}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center transition-transform hover:scale-110"
            >
              <Heart className={`w-5 h-5 ${isFavorited ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
            </button>
          )}
          <div className="absolute bottom-4 left-4 md:left-6 flex items-end gap-3 md:gap-4">
            <img src={stylist.photo} alt={stylist.name} className="w-20 h-20 md:w-32 md:h-32 rounded-2xl object-cover border-4 border-card shadow-lg" />
            <div className="pb-1 md:pb-2 text-primary-foreground">
              <h1 className="font-serif text-xl md:text-3xl font-bold">{stylist.name}</h1>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs md:text-sm opacity-90 mt-1">
                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 md:w-4 md:h-4 fill-secondary text-secondary" /> {stylist.rating} ({stylist.reviewCount})</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" /> {stylist.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-xl p-6 border border-border">
              <h2 className="font-serif text-xl font-semibold mb-3">About</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{stylist.bio}</p>
              <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                <span>{stylist.experience} years experience</span>
                <span>Member since {new Date(stylist.joinDate).getFullYear()}</span>
              </div>
            </motion.div>

            {/* Services */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="font-serif text-xl font-semibold mb-4">Services</h2>
              <div className="space-y-3">
                {stylist.services.map((service) => (
                  <div key={service.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium text-sm">{service.name}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Clock className="w-3 h-3" /> {service.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${service.price}</p>
                      <Link to={`/booking?stylist=${stylist.id}&service=${service.id}`} className="text-xs text-cta hover:underline">Book Now</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="font-serif text-xl font-semibold mb-4">Portfolio</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {stylist.portfolio.map((img, i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden">
                    <img src={img} alt={`Portfolio ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="font-serif text-xl font-semibold mb-4">Reviews ({stylistReviews.length})</h2>
              <div className="space-y-4">
                {stylistReviews.map((review) => (
                  <div key={review.id} className="pb-4 border-b border-border last:border-0">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={review.customerAvatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-medium">{review.customerName}</p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, j) => (
                            <Star key={j} className="w-3 h-3 fill-secondary text-secondary" />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
                {stylistReviews.length === 0 && <p className="text-sm text-muted-foreground">No reviews yet.</p>}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border sticky top-20">
              <Link to={`/booking?stylist=${stylist.id}`} className="btn-cta w-full text-sm text-center block mb-4">
                <Calendar className="w-4 h-4 inline mr-2" /> Book Now
              </Link>
              <h3 className="font-serif font-semibold mb-3">Availability</h3>
              <div className="space-y-2">
                {days.map(([day, time]) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="font-medium">{day}</span>
                    <span className="text-muted-foreground">{time.start} – {time.end}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">Starting from</p>
                <p className="text-2xl font-bold">${Math.min(...stylist.services.map((s) => s.price))}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylistProfilePage;
