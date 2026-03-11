import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Star, Clock, Shield, ArrowRight, MapPin, Sparkles, Crown, ChevronRight, Scissors, Users, Heart, Zap } from "lucide-react";
import { stylists } from "@/data/demo-data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import InstantMatchButton from "@/components/smart-match/InstantMatchButton";
import MatchModal from "@/components/smart-match/MatchModal";
import { toast } from "sonner";

const HomePage = () => {
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("UK");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
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

  const handleFindStylists = () => {
    let isValid = false;
    if (country === 'US') {
      isValid = /^\d{5}$/.test(postalCode);
    } else { // UK
      isValid = /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}$/i.test(postalCode);
    }

    if (!isValid) {
      setError(`Please enter a valid ${country === 'US' ? '5-digit US zip code' : 'UK postcode'}.`);
      return;
    }
    setError("");
    navigate(`/booking?postal=${postalCode}&step=1`);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
  };

  return (
    <div className="relative">
      {/* Hero Section - Enhanced with layered design */}
      <section className="relative overflow-hidden py-24 md:py-36 bg-primary">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />
          
          {/* Decorative pattern overlay */}
          <div className="absolute inset-0 opacity-5" 
               style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm text-background text-xs font-medium px-5 py-2.5 rounded-full mb-8 border border-accent/30 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-accent" /> 
              <span>Trusted by 10,000+ customers nationwide</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent/50 ml-1" />
              <span className="text-accent font-semibold">4.9 ★</span>
            </motion.div>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-background mb-8 leading-[1.1] tracking-tight">
              Connection <br />
              <span className="text-accent relative">
                is beauty.
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4L200 4" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-accent/30"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-background/90 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Premium Afro Hair Braiding, <br className="hidden sm:block" />
              <span className="text-accent font-semibold">expertly linked to your style.</span>
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-card/95 backdrop-blur-md rounded-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-xl mx-auto border border-border/50 shadow-2xl"
            >
              <div className="flex items-center gap-2.5 flex-1 px-4">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="bg-transparent text-sm py-3 outline-none text-foreground"
                >
                  <option value="UK">UK</option>
                  <option value="US">US</option>
                </select>
                <MapPin className="w-5 h-5 text-accent" />
                <input
                  type="text"
                  placeholder={country === 'US' ? 'Enter 5-digit zip code' : 'Enter UK postcode'}
                  value={postalCode}
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                  }}
                  className="w-full bg-transparent text-sm py-3 outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <button
                onClick={handleFindStylists}
                className="btn-cta flex items-center justify-center gap-2 text-sm whitespace-nowrap px-8 py-3 rounded-xl group"
              >
                <Search className="w-4 h-4 group-hover:scale-110 transition-transform" /> 
                Find Stylists
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
            <p className="text-xs text-background/70 mt-2">
              {country === 'US' 
                ? "US zip codes should be 5 digits (e.g., 90210)."
                : "UK postcodes are alphanumeric (e.g., SW1A 0AA)."
              }
            </p>
            {error && <p className="text-sm text-destructive mt-3 bg-destructive/10 backdrop-blur-sm inline-block px-4 py-2 rounded-full">{error}</p>}
            
            {/* Instant Match Button - Enhanced */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 flex justify-center"
            >
              <InstantMatchButton 
                onClick={handleInstantMatch} 
                size="lg" 
                variant="secondary"
              />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Curved divider - More dramatic */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L60 105C120 90 240 60 360 48C480 36 600 42 720 54C840 66 960 84 1080 90C1200 96 1320 90 1380 87L1440 84V120H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Modal */}
      <MatchModal 
        isOpen={isMatchModalOpen} 
        onClose={() => setIsMatchModalOpen(false)}
        customerPostalCode={user?.postalCode || ""}
      />

      {/* Signature Styles Section - New from mockups */}
      <section className="py-24 bg-secondary/20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">Our Signature</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">Signature Braid Styles</h2>
            <p className="text-detail max-w-2xl mx-auto text-lg">Discover our curated collection of premium braiding techniques</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            {[
              { name: "Knotless", icon: Scissors },
              { name: "StitchBraids", icon: Zap },
              { name: "Cornrows", icon: Scissors },
              { name: "BoxBraids", icon: Crown },
              { name: "Twists", icon: Heart },
              { name: "Goddess", icon: Sparkles },
            ].map((style, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group cursor-pointer"
              >
                <div className="bg-card rounded-2xl p-6 text-center border-2 border-transparent hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                    <style.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="font-serif font-semibold text-primary text-sm">{style.name}</h3>
                  <p className="text-xs text-detail mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Book Now</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Stylists - Enhanced with better cards */}
      <section className="py-24 relative overflow-hidden bg-secondary/30">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-0.5 bg-accent rounded-full" />
                <p className="text-sm font-semibold text-accent uppercase tracking-widest">Expert Stylists</p>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-3">Top Rated Stylists</h2>
              <p className="text-detail text-lg font-brand max-w-xl">Highly rated professionals ready to create your perfect look</p>
            </div>
            <Link to="/find-stylist" className="group flex items-center gap-2 text-accent font-semibold bg-accent/10 px-5 py-2.5 rounded-full hover:bg-accent/20 transition-all">
              View All Stylists 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stylists.filter(s => s.featured).slice(0, 3).map((stylist, i) => (
              <motion.div key={stylist.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Link to={`/stylist/${stylist.id}`} className="block bg-card rounded-3xl overflow-hidden group relative border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-2xl">
                  {/* Featured Badge - Enhanced */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-accent text-primary px-4 py-2 rounded-full font-semibold text-xs shadow-xl">
                    <Crown className="w-3.5 h-3.5" /> Featured
                  </div>
                  
                  {/* Image Container */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img 
                      src={stylist.photo.replace("w=200&h=200", "w=800&h=600")} 
                      alt={stylist.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-60" />
                    
                    {/* Quick Info Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-background z-10">
                      <h3 className="font-serif font-bold text-2xl group-hover:text-accent transition-colors mb-1">{stylist.name}</h3>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" /> 
                          <span className="font-semibold">{stylist.rating}</span>
                          <span className="opacity-80">({stylist.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> 
                          <span className="opacity-90">{stylist.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6 bg-card">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {stylist.specialties.slice(0, 3).map((s) => (
                        <span key={s} className="text-xs bg-accent/10 text-detail px-3 py-1.5 rounded-full font-medium border border-accent/20">
                          {s}
                        </span>
                      ))}
                      {stylist.specialties.length > 3 && (
                        <span className="text-xs bg-muted text-detail px-3 py-1.5 rounded-full font-medium">
                          +{stylist.specialties.length - 3}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <span className="text-xs text-detail block mb-1">Starting from</span>
                        <span className="text-2xl font-bold text-primary">${Math.min(...stylist.services.map((s) => s.price))}</span>
                        <span className="text-xs text-detail ml-1">+</span>
                      </div>
                      <span className="flex items-center gap-2 text-accent font-semibold group-hover:translate-x-1 transition-transform">
                        View Profile 
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced with better visuals */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-8 h-0.5 bg-accent rounded-full" />
              <p className="text-sm font-semibold text-accent uppercase tracking-widest">Simple Process</p>
              <span className="w-8 h-0.5 bg-accent rounded-full" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">How It Works</h2>
            <p className="text-detail text-lg">Book your perfect style in 3 simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            {/* Connection Lines - Enhanced */}
            <div className="hidden md:block absolute top-24 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />
            
            {[
              { icon: Search, title: "Browse & Search", desc: "Explore 50+ hairstyles and find talented stylists in your area", color: "from-blue-500/20 to-purple-500/20" },
              { icon: Clock, title: "Book Your Slot", desc: "Pick your preferred date, time, and service effortlessly in minutes", color: "from-purple-500/20 to-pink-500/20" },
              { icon: Star, title: "Get Styled", desc: "Enjoy your appointment and share your 5-star experience", color: "from-pink-500/20 to-orange-500/20" },
            ].map((stepItem, i) => (
              <motion.div 
                key={i} 
                custom={i} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={fadeUp} 
                className="text-center relative group"
              >
                <div className="relative mb-6 inline-block">
                  <div className={`w-28 h-28 rounded-3xl flex items-center justify-center mx-auto relative bg-gradient-to-br ${stepItem.color} group-hover:scale-110 transition-transform duration-300`}>
                    <div className="absolute inset-0 bg-accent rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity" />
                    <stepItem.icon className="w-12 h-12 text-accent relative z-10" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-accent border-4 border-card flex items-center justify-center text-lg font-bold text-primary shadow-xl">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-2xl mb-3 text-primary">{stepItem.title}</h3>
                <p className="text-detail leading-relaxed max-w-xs mx-auto font-brand">{stepItem.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - New from mockups */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-5 h-5 fill-accent text-accent" />
              <Star className="w-5 h-5 fill-accent text-accent" />
              <Star className="w-5 h-5 fill-accent text-accent" />
              <Star className="w-5 h-5 fill-accent text-accent" />
              <Star className="w-5 h-5 fill-accent text-accent" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-primary">Loved by thousands</h2>
          </div>
          
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl md:text-2xl text-detail italic font-brand mb-6">
              "I love what I saw! The attention to detail and quality of work is exceptional. 
              Truly premium Afro Hair Braiding experience."
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-primary">Sarah Johnson</p>
                <p className="text-xs text-detail">Verified Customer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Stylist CTA - Enhanced */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl p-12 md:p-20 text-center relative overflow-hidden bg-primary group"
          >
            {/* Animated background */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000 delay-300" />
            </div>
            
            <div className="relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm text-accent px-5 py-2.5 rounded-full mb-6 border border-accent/30">
                  <Scissors className="w-4 h-4" />
                  <span className="text-sm font-semibold">Join Our Network</span>
                </div>
                
                <h2 className="font-serif text-4xl md:text-6xl font-bold text-background mb-6 leading-tight">
                  Are You a Hair Braiding<br />Professional?
                </h2>
                
                <p className="text-background/80 mb-10 max-w-2xl mx-auto text-lg leading-relaxed font-brand">
                  Join BraidLink and connect with hundreds of clients looking for your skills. 
                  Grow your business with our platform.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link to="/become-stylist" className="btn-cta inline-flex items-center gap-2.5 text-base px-10 py-4 rounded-xl shadow-2xl hover:shadow-accent/30 transition-all group">
                    <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform" /> 
                    Become a Stylist 
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                 
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Note - New */}
      <div className="border-t border-border py-8 bg-secondary/10">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs text-detail">
            © 2026 BraidLink. All rights reserved. Premium Afro Hair Braiding, expertly linked to your style.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;