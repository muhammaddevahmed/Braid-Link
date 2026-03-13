import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { stylists, reviews } from "@/data/demo-data";
import { 
  Star, MapPin, Clock, Calendar, ArrowLeft, Heart, 
  Award, Shield, Scissors, MessageSquare, CheckCircle,
  Crown, Sparkles, Users, ThumbsUp, Share2, ChevronRight,
  Briefcase, Instagram, Mail, Phone
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
    <div className="py-20 text-center min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto mb-6">
          <Scissors className="w-10 h-10 text-accent" />
        </div>
        <p className="text-2xl font-serif text-primary mb-4">Stylist not found</p>
        <Link to="/find-stylist" className="bg-accent text-primary font-semibold inline-flex items-center gap-2 px-6 py-3 rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-accent/25 group">
          Browse Stylists <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
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
      {/* Hero Banner Section - Refined premium design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/95 h-[450px] md:h-[500px] pb-4 rounded-b-3xl shadow-2xl">
        {/* Sophisticated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-20 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[140px] animate-pulse delay-1000" />
          
          {/* Refined pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
        </div>

        {/* Back button - Premium styling */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
          <Link to="/find-stylist" className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 shadow-lg hover:bg-black/30">
            <ArrowLeft className="w-4 h-4" /> Back to Stylists
          </Link>
        </div>

        {/* Stylist info overlay - Refined */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary via-primary/95 to-transparent pt-56 sm:pt-48 md:pt-40 pb-12 px-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="relative flex-shrink-0"
              >
                <img 
                  src={stylist.photo} 
                  alt={stylist.name} 
                  className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl object-cover border-4 border-white/20 shadow-2xl"
                />
                {stylist.featured && (
                  <div className="absolute -top-3 -right-3 bg-accent text-primary p-2.5 rounded-full shadow-xl">
                    <Crown className="w-4 h-4" />
                  </div>
                )}
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-1 text-white text-center sm:text-left max-w-full"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
                  <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight break-words">
                    {stylist.name}
                  </h1>
                  {isAuthenticated && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={toggleFavorite}
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center transition-all hover:bg-white/20 border border-white/20 shadow-lg flex-shrink-0"
                    >
                      <Heart className={`w-5 h-5 ${isFavorited ? "fill-destructive text-destructive" : "text-white"}`} />
                    </motion.button>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row flex-wrap items-center sm:items-center justify-center sm:justify-start gap-3 sm:gap-5 text-sm md:text-base">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-accent text-accent flex-shrink-0" />
                    <span className="font-semibold">{avgRating}</span>
                    <span className="text-white/70">({totalReviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-white/70 flex-shrink-0" />
                    <span className="text-white/90">{stylist.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10">
                    <Award className="w-3 h-3 text-accent flex-shrink-0" />
                    <span className="text-xs font-medium">{stylist.experience} years exp.</span>
                  </div>
                </div>

                {/* Quick stats badges */}
                <div className="flex flex-wrap items-center gap-3 mt-4">
                  <span className="bg-accent/20 text-accent text-xs px-3 py-1.5 rounded-full border border-accent/30">
                    {stylist.specialties.length} Specialties
                  </span>
                  <span className="bg-white/10 text-white/90 text-xs px-3 py-1.5 rounded-full border border-white/10">
                    {stylist.services.length} Services
                  </span>
                  <span className="bg-white/10 text-white/90 text-xs px-3 py-1.5 rounded-full border border-white/10">
                    {stylist.portfolio.length} Portfolio Items
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* About Section - Premium redesign */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl md:text-2xl font-semibold text-primary">About</h2>
                    <p className="text-xs text-muted-foreground">Professional background</p>
                  </div>
                </div>
                <p className="text-muted-foreground text-base leading-relaxed mb-6">{stylist.bio}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border/50">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/5">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Member since</p>
                      <p className="text-sm font-semibold text-primary">{new Date(stylist.joinDate).getFullYear()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/5">
                    <Users className="w-5 h-5 text-accent flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Happy clients</p>
                      <p className="text-sm font-semibold text-primary">{stylist.reviewCount}+</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/5">
                    <ThumbsUp className="w-5 h-5 text-accent flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Satisfaction</p>
                      <p className="text-sm font-semibold text-primary">100%</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Services Section - Premium redesign */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                      <Scissors className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl md:text-2xl font-semibold text-primary">Services</h2>
                      <p className="text-xs text-muted-foreground">{allServices.length} available services</p>
                    </div>
                  </div>
                  <span className="text-xs text-accent font-medium bg-accent/10 px-3 py-1.5 rounded-full">
                    From ${Math.min(...stylist.services.map((s) => s.price))}
                  </span>
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
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-serif font-semibold text-primary">{service.name}</p>
                            {service.name === "Knotless Box Braids" && (
                              <span className="bg-accent/10 text-accent text-xs px-2 py-0.5 rounded-full border border-accent/20">Popular</span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1.5">
                            <Clock className="w-3 h-3" /> {service.duration}
                          </p>
                        </div>
                        <div className="text-right flex items-center gap-4">
                          <div>
                            <p className="font-bold text-primary text-lg">${service.price}</p>
                            <p className="text-xs text-muted-foreground">+ fees</p>
                          </div>
                          <Link 
                            to={`/booking?stylist=${stylist.id}&service=${service.id}`} 
                            className="bg-accent text-primary text-xs font-semibold px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent/90 shadow-lg hover:shadow-accent/25"
                          >
                            Book
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Portfolio/Gallery Section - Premium redesign */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl md:text-2xl font-semibold text-primary">Portfolio</h2>
                      <p className="text-xs text-muted-foreground">Latest work</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{stylist.portfolio.length} photos</span>
                </div>
                
                {/* Featured Image - Premium */}
                <div className="mb-4 rounded-xl overflow-hidden aspect-video relative group cursor-pointer">
                  <img 
                    src={stylist.portfolio[activeImageIndex]} 
                    alt={`Portfolio ${activeImageIndex + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Image counter */}
                  <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                    {activeImageIndex + 1} / {stylist.portfolio.length}
                  </div>
                </div>
                
                {/* Thumbnail Grid - Refined */}
                <div className="grid grid-cols-4 gap-3">
                  {stylist.portfolio.map((img, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveImageIndex(i)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        activeImageIndex === i 
                          ? "border-accent ring-4 ring-accent/20 shadow-xl" 
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

              {/* Reviews Section - Premium redesign */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl md:text-2xl font-semibold text-primary">Reviews</h2>
                    <p className="text-xs text-muted-foreground">What clients say</p>
                  </div>
                </div>
                
                {/* Rating Summary - Premium redesign */}
                <div className="flex flex-col sm:flex-row items-start gap-6 p-6 bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl mb-6 border border-accent/10">
                  <div className="text-center sm:text-left">
                    <div className="text-5xl font-bold text-primary">{avgRating}</div>
                    <div className="flex items-center gap-0.5 mt-2 justify-center sm:justify-start">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.round(avgRating) ? 'fill-accent text-accent' : 'text-muted'}`} 
                        />
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">{totalReviews} total reviews</div>
                  </div>
                  
                  <div className="flex-1 w-full">
                    {[5,4,3,2,1].map((rating) => {
                      const count = stylistReviews.filter(r => Math.floor(r.rating) === rating).length;
                      const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                      return (
                        <div key={rating} className="flex items-center gap-2 text-sm mb-2">
                          <span className="w-10 font-medium">{rating} ★</span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="h-full bg-accent rounded-full" 
                            />
                          </div>
                          <span className="w-8 text-right text-muted-foreground">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Reviews List - Premium */}
                <div className="space-y-5">
                  {stylistReviews.slice(0, 3).map((review, i) => (
                    <motion.div 
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="pb-5 border-b border-border/50 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <img 
                          src={review.customerAvatar} 
                          alt={review.customerName} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-accent/20"
                        />
                        <div>
                          <p className="text-sm font-semibold text-primary">{review.customerName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: review.rating }).map((_, j) => (
                                <Star key={j} className="w-3 h-3 fill-accent text-accent" />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground pl-15 ml-15">{review.comment}</p>
                    </motion.div>
                  ))}
                  
                  {stylistReviews.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-8 bg-accent/5 rounded-xl">
                      No reviews yet. Be the first to book!
                    </p>
                  )}
                  
                  {stylistReviews.length > 3 && (
                    <button className="text-accent text-sm font-semibold hover:text-accent/80 mt-4 inline-flex items-center gap-1 group">
                      Read all {stylistReviews.length} reviews 
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Sidebar - Right Column - Premium redesign */}
            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              {/* Booking Card - Premium */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <h3 className="font-serif text-xl font-semibold text-primary mb-5 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-accent" />
                  </div>
                  Book an Appointment
                </h3>
                
                <Link 
                  to={`/booking?stylist=${stylist.id}`} 
                  className="bg-accent text-primary font-semibold w-full text-center py-4 rounded-xl mb-6 flex items-center justify-center gap-2 group hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-accent/25"
                >
                  <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Book Now with {stylist.name.split(' ')[0]}
                </Link>
                
                {/* Availability - Premium */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-primary mb-4 flex items-center gap-2">
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
                        className="flex justify-between text-sm p-3 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors"
                      >
                        <span className="font-medium text-primary">{day}</span>
                        <span className="text-muted-foreground">{time.start} – {time.end}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Price Summary - Premium */}
                <div className="pt-5 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-2">Starting from</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-4xl font-bold text-primary">${Math.min(...stylist.services.map((s) => s.price))}</span>
                      <span className="text-sm text-muted-foreground ml-1">+</span>
                    </div>
                    <p className="text-xs text-muted-foreground">fees apply</p>
                  </div>
                </div>
                
                {/* Quick Stats - Premium */}
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <div className="text-center p-4 bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl border border-accent/10">
                    <Briefcase className="w-5 h-5 text-accent mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Experience</p>
                    <p className="font-bold text-primary text-lg">{stylist.experience} years</p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl border border-accent/10">
                    <Users className="w-5 h-5 text-accent mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Reviews</p>
                    <p className="font-bold text-primary text-lg">{stylist.reviewCount}</p>
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