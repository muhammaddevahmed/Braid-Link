import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { stylists, reviews } from "@/data/demo-data";
import { 
  Star, MapPin, Clock, Calendar, ArrowLeft, Heart, 
  Award, Shield, Scissors, MessageSquare, CheckCircle,
  Crown, Sparkles, Users, ThumbsUp, Share2, ChevronRight
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const StylistProfilePage = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const stylist = stylists.find((s) => s.id === id);
  const stylistReviews = reviews.filter((r) => r.stylistId === id);

  const [isFavorited, setIsFavorited] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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

  if (!stylist) return (
    <div className="py-20 text-center min-h-screen flex items-center justify-center">
      <div>
        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <Scissors className="w-8 h-8 text-accent" />
        </div>
        <p className="text-xl font-serif text-primary mb-4">Stylist not found</p>
        <Link to="/find-stylist" className="btn-cta inline-flex items-center gap-2 px-6 py-3 rounded-xl">
          Browse Stylists <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );

  const days = Object.entries(stylist.availability);
  const avgRating = stylist.rating;
  const totalReviews = stylist.reviewCount;
  const featuredServices = stylist.services.slice(0, 3);
  const allServices = stylist.services;

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  return (
    <div className="relative bg-background">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/95 h-[420px] md:h-[480px] pb-4 rounded-b-3xl">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[120px] animate-pulse delay-1000" />
          <div className="absolute inset-0 opacity-5" 
               style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        </div>

        {/* Back button */}
        <div className="container mx-auto px-4 relative z-10 pt-8 md:pt-6">
          <Link to="/find-stylist" className="inline-flex items-center gap-2 text-sm text-background/80 hover:text-background transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <ArrowLeft className="w-4 h-4" /> Back to Stylists
          </Link>
        </div>

        {/* Stylist info overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary via-primary/95 to-transparent pt-56 sm:pt-48 md:pt-40 pb-12 px-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="relative flex-shrink-0"
              >
                <img 
                  src={stylist.photo} 
                  alt={stylist.name} 
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-2xl object-cover border-4 border-background shadow-2xl"
                />
                {stylist.featured && (
                  <div className="absolute -top-3 -right-3 bg-accent text-primary p-2 rounded-full shadow-xl">
                    <Crown className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-1 text-background text-center sm:text-left max-w-full"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-4 w-full">
                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-snug break-words">{stylist.name}</h1>
                  {isAuthenticated && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleFavorite}
                      className="w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-background/30 border border-background/30 flex-shrink-0"
                    >
                      <Heart className={`w-5 h-5 ${isFavorited ? "fill-destructive text-destructive" : "text-background"}`} />
                    </motion.button>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row flex-wrap items-center sm:items-center justify-center sm:justify-start gap-3 sm:gap-4 text-sm md:text-base">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent flex-shrink-0" />
                    <span className="font-semibold">{avgRating}</span>
                    <span className="opacity-90">({totalReviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{stylist.location}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-accent/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <Award className="w-3 h-3 flex-shrink-0" />
                    <span className="text-xs font-medium">{stylist.experience} years exp.</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Curved divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* About Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-primary">About</h2>
                </div>
                <p className="text-detail text-base leading-relaxed font-brand mb-4">{stylist.bio}</p>
                <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span className="text-sm text-detail">Member since {new Date(stylist.joinDate).getFullYear()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    <span className="text-sm text-detail">{stylist.reviewCount}+ happy clients</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="w-4 h-4 text-accent" />
                    <span className="text-sm text-detail">100% satisfaction rate</span>
                  </div>
                </div>
              </motion.div>

              {/* Services Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Scissors className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-primary">Services</h2>
                </div>
                
                <div className="space-y-3">
                  {allServices.map((service, i) => (
                    <motion.div 
                      key={service.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="group"
                    >
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-accent/30 hover:bg-accent/5 transition-all duration-300">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-serif font-semibold text-primary">{service.name}</p>
                            {service.name === "Knotless Box Braids" && (
                              <span className="bg-accent/10 text-accent text-xs px-2 py-0.5 rounded-full">Popular</span>
                            )}
                          </div>
                          <p className="text-xs text-detail flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" /> {service.duration}
                          </p>
                        </div>
                        <div className="text-right flex items-center gap-4">
                          <div>
                            <p className="font-bold text-primary text-lg">${service.price}</p>
                            <p className="text-xs text-detail">+ fees</p>
                          </div>
                          <Link 
                            to={`/booking?stylist=${stylist.id}&service=${service.id}`} 
                            className="btn-cta text-xs px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            Book
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Portfolio/Gallery Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-accent" />
                    </div>
                    <h2 className="font-serif text-xl font-semibold text-primary">Portfolio</h2>
                  </div>
                  <span className="text-xs text-detail">{stylist.portfolio.length} photos</span>
                </div>
                
                {/* Featured Image */}
                <div className="mb-4 rounded-xl overflow-hidden aspect-video relative group">
                  <img 
                    src={stylist.portfolio[activeImageIndex]} 
                    alt={`Portfolio ${activeImageIndex + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Thumbnail Grid */}
                <div className="grid grid-cols-4 gap-2">
                  {stylist.portfolio.map((img, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveImageIndex(i)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === i 
                          ? "border-accent ring-2 ring-accent/20" 
                          : "border-transparent hover:border-accent/50"
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`Thumbnail ${i + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Reviews Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="font-serif text-xl font-semibold text-primary">Reviews ({stylistReviews.length})</h2>
                </div>
                
                {/* Rating Summary */}
                <div className="flex items-center gap-6 p-4 bg-accent/5 rounded-xl mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">{avgRating}</div>
                    <div className="flex items-center gap-0.5 mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.round(avgRating) ? 'fill-accent text-accent' : 'text-muted'}`} 
                        />
                      ))}
                    </div>
                    <div className="text-xs text-detail mt-1">{totalReviews} reviews</div>
                  </div>
                  <div className="flex-1 space-y-1">
                    {[5,4,3,2,1].map((rating) => {
                      const count = stylistReviews.filter(r => Math.floor(r.rating) === rating).length;
                      const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                      return (
                        <div key={rating} className="flex items-center gap-2 text-xs">
                          <span className="w-8">{rating} ★</span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-accent rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="w-8 text-right">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {stylistReviews.map((review, i) => (
                    <motion.div 
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="pb-4 border-b border-border last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <img 
                          src={review.customerAvatar} 
                          alt={review.customerName} 
                          className="w-10 h-10 rounded-full object-cover border-2 border-accent/20"
                        />
                        <div>
                          <p className="text-sm font-semibold text-primary">{review.customerName}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: review.rating }).map((_, j) => (
                                <Star key={j} className="w-3 h-3 fill-accent text-accent" />
                              ))}
                            </div>
                            <span className="text-xs text-detail">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-detail pl-13 ml-13">{review.comment}</p>
                    </motion.div>
                  ))}
                  
                  {stylistReviews.length === 0 && (
                    <p className="text-sm text-detail text-center py-4">No reviews yet. Be the first to book!</p>
                  )}
                  
                  {stylistReviews.length > 0 && (
                    <button className="text-accent text-sm font-semibold hover:underline mt-4 inline-flex items-center gap-1">
                      Read all reviews <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-6">
              {/* Booking Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-xl sticky top-24"
              >
                <h3 className="font-serif text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent" />
                  Book an Appointment
                </h3>
                
                <Link 
                  to={`/booking?stylist=${stylist.id}`} 
                  className="btn-cta w-full text-sm text-center py-4 rounded-xl mb-6 flex items-center justify-center gap-2 group"
                >
                  <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Book Now with {stylist.name.split(' ')[0]}
                </Link>
                
                {/* Availability */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    Weekly Availability
                  </h4>
                  <div className="space-y-2">
                    {days.map(([day, time], i) => (
                      <motion.div 
                        key={day} 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                        className="flex justify-between text-sm p-2 rounded-lg hover:bg-accent/5 transition-colors"
                      >
                        <span className="font-medium text-primary">{day.slice(0,3)}</span>
                        <span className="text-detail">{time.start} – {time.end}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Price Summary */}
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-detail mb-1">Starting from</p>
                  <div className="flex items-end justify-between">
                    <p className="text-3xl font-bold text-primary">${Math.min(...stylist.services.map((s) => s.price))}</p>
                    <p className="text-xs text-detail">+ fees</p>
                  </div>
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-border">
                  <div className="text-center p-2 bg-accent/5 rounded-lg">
                    <p className="text-xs text-detail">Experience</p>
                    <p className="font-bold text-primary">{stylist.experience} years</p>
                  </div>
                  <div className="text-center p-2 bg-accent/5 rounded-lg">
                    <p className="text-xs text-detail">Reviews</p>
                    <p className="font-bold text-primary">{stylist.reviewCount}</p>
                  </div>
                </div>
                
             
              </motion.div>
              
             
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StylistProfilePage;