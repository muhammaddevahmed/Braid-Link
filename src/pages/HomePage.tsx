import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Star, Clock, Shield, ArrowRight, MapPin, Sparkles, DollarSign } from "lucide-react";
import { hairstyles, stylists, reviews } from "@/data/demo-data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFindStylists = () => {
    if (!/^\d{5}$/.test(postalCode)) {
      setError("Please enter a valid 5-digit postal code.");
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
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-36 bg-primary">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm text-background text-xs font-medium px-4 py-2 rounded-full mb-6 border border-accent/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" /> Trusted by 10,000+ customers nationwide
            </motion.div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-background mb-6 leading-[1.1] tracking-tight">
              Find Your Perfect{" "}
              <span className="text-accent">Hair Braiding</span>{" "}
              Stylist
            </h1>
            <p className="text-lg md:text-xl text-background/80 mb-10 max-w-lg mx-auto leading-relaxed font-brand">
              Book talented braiding professionals near you. Beautiful styles, trusted stylists, seamless booking.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-card/95 backdrop-blur-md rounded-2xl p-2.5 flex flex-col sm:flex-row gap-2 max-w-lg mx-auto border border-border/50"
              style={{ boxShadow: "var(--shadow-elevated)" }}
            >
              <div className="flex items-center gap-2.5 flex-1 px-4">
                <MapPin className="w-5 h-5 text-accent" />
                <input
                  type="text"
                  placeholder="Enter your postal code"
                  value={postalCode}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,5}$/.test(value)) {
                      setPostalCode(value);
                    }
                  }}
                  className="w-full bg-transparent text-sm py-3 outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <button
                onClick={handleFindStylists}
                className="btn-cta flex items-center justify-center gap-2 text-sm whitespace-nowrap"
              >
                <Search className="w-4 h-4" /> Find Stylists
              </button>
            </motion.div>
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Featured Hairstyles */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Popular Styles</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">Featured Hairstyles</h2>
              <p className="text-muted-foreground mt-2 max-w-md">Explore our most popular braiding styles loved by thousands</p>
            </div>
            <Link to="/hairstyles" className="hidden sm:flex text-sm font-semibold text-cta items-center gap-1.5 link-hover pb-1">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {hairstyles.slice(0, 8).map((style, i) => (
              <motion.div
                key={style.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="bg-card rounded-2xl overflow-hidden border border-detail/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square rounded-t-2xl overflow-hidden">
                  <img src={style.image} alt={style.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-serif font-semibold text-sm md:text-base mb-1.5 text-primary">{style.name}</h3>
                  <p className="text-xs text-detail line-clamp-2 mb-2 font-brand">{style.description}</p>
                  <div className="flex items-center justify-between text-xs text-detail mb-3">
                    <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> From ${style.avgPrice}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {style.duration}</span>
                  </div>
                  <Link
                    to={`/booking?style=${style.id}`}
                    className="btn-cta w-full text-xs md:text-sm py-2 flex items-center justify-center gap-1 hover-scale"
                  >
                    Book Now <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="sm:hidden text-center mt-8">
            <Link to="/hairstyles" className="btn-outline text-sm inline-flex items-center gap-1.5">View All Styles <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* Top Stylists */}
      <section className="py-20 relative overflow-hidden bg-secondary/30">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Expert Stylists</p>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">Top Stylists</h2>
              <p className="text-detail mt-2 font-brand">Highly rated professionals ready to serve you</p>
            </div>
            <Link to="/find-stylist" className="hidden sm:flex text-sm font-semibold text-accent items-center gap-1.5 link-hover pb-1">View All <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stylists.slice(0, 3).map((stylist, i) => (
              <motion.div key={stylist.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <Link to={`/stylist/${stylist.id}`} className="block bg-card rounded-2xl overflow-hidden card-hover border border-border/50 group">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img src={stylist.photo.replace("w=200&h=200", "w=800&h=600")} alt={stylist.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 text-background">
                      <h3 className="font-serif font-semibold text-lg group-hover:text-accent transition-colors">{stylist.name}</h3>
                      <div className="flex items-center gap-1.5 text-xs mt-1">
                        <Star className="w-3 h-3 fill-accent text-accent" /> {stylist.rating} ({stylist.reviewCount} reviews)
                      </div>
                      <p className="text-xs flex items-center gap-1 mt-0.5 opacity-90"><MapPin className="w-3 h-3" /> {stylist.location}</p>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {stylist.specialties.map((s) => (
                        <span key={s} className="text-xs bg-accent/10 text-detail px-2.5 py-1 rounded-full font-medium">{s}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-detail/20">
                      <span className="text-sm text-detail font-brand">From <span className="font-bold text-primary">${Math.min(...stylist.services.map((s) => s.price))}</span></span>
                      <span className="text-sm font-semibold text-accent group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">View Profile <ArrowRight className="w-3.5 h-3.5" /></span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Simple Process</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mt-2">Book your perfect style in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary via-accent to-cta opacity-20" />
            {[
              { icon: Search, title: "Browse & Search", desc: "Explore hairstyles and find talented stylists in your area" },
              { icon: Clock, title: "Book Your Slot", desc: "Pick your preferred date, time, and service effortlessly" },
              { icon: Star, title: "Get Styled", desc: "Enjoy your appointment and share your experience" },
            ].map((stepItem, i) => (
              <motion.div key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center relative">
                <div className="w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-5 relative bg-accent">
                  <stepItem.icon className="w-10 h-10 text-primary" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card border-2 border-accent flex items-center justify-center text-sm font-bold text-primary">{i + 1}</span>
                </div>
                <h3 className="font-serif font-semibold text-xl mb-2 text-primary">{stepItem.title}</h3>
                <p className="text-sm text-detail leading-relaxed max-w-xs mx-auto font-brand">{stepItem.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 relative overflow-hidden bg-secondary/30">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-2">Testimonials</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {reviews.slice(0, 3).map((review, i) => (
              <motion.div key={review.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-card rounded-2xl p-7 card-hover border border-detail/20 relative">
                <div className="absolute top-5 right-6 text-5xl font-serif text-accent/20 leading-none">"</div>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-detail mb-5 line-clamp-4 leading-relaxed relative z-10 font-brand">{review.comment}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-detail/20">
                  <img src={review.customerAvatar} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-accent/30" />
                  <div>
                    <p className="text-sm font-semibold text-primary">{review.customerName}</p>
                    <p className="text-xs text-detail">{review.service}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Stylist CTA */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl p-10 md:p-20 text-center relative overflow-hidden bg-primary"
          >
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/8 rounded-full blur-[80px]" />
            </div>
            <div className="relative z-10">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-4">Join Our Network</p>
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-background mb-5 leading-tight">
                  Are You a Hair Braiding<br />Professional?
                </h2>
                <p className="text-background/80 mb-10 max-w-md mx-auto text-lg leading-relaxed font-brand">
                  Join BraidLink and connect with hundreds of clients looking for your skills.
                </p>
                <Link to="/become-stylist" className="btn-cta inline-flex items-center gap-2.5 text-base px-8 py-4">
                  <Shield className="w-5 h-5" /> Become a Stylist <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
