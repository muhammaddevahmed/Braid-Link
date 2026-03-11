import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { hairstyleCategories, hairstyles } from "@/data/demo-data";
import { Clock, DollarSign, ArrowRight, Sparkles, Heart, Filter, ChevronRight, Star, Scissors, Zap, Crown, Users } from "lucide-react";
import { useState } from "react";

const HairstylesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get all unique hairstyle items from categories
  const allHairstyleItems = hairstyleCategories.flatMap((cat) =>
    cat.hairstyles.map((h) => ({
      ...h,
      category: cat.name,
      categoryId: cat.id,
      avgPrice:
        hairstyles.find((hs) => hs.id === h.id)?.avgPrice || 150,
      duration:
        hairstyles.find((hs) => hs.id === h.id)?.duration || "4-6 hours",
    }))
  );

  // Filter hairstyles based on selected category
  const filteredHairstyles = selectedCategory
    ? allHairstyleItems.filter((h) => h.category === selectedCategory)
    : allHairstyleItems;

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
  };

  return (
    <div className="relative bg-background">
      {/* Hero Section - Inspired by mockups */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-primary to-primary/95">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[120px] animate-pulse delay-1000" />
          
          {/* Decorative pattern overlay */}
          <div className="absolute inset-0 opacity-5" 
               style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Category count badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm text-background text-xs font-medium px-5 py-2.5 rounded-full mb-6 border border-accent/30 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span>{hairstyleCategories.length} Signature Categories</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
              <span className="text-accent font-semibold">{allHairstyleItems.length}+ Styles</span>
            </motion.div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight">
              Explore Our Signature <br />
              <span className="text-accent relative">
                Braid Collection
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4L200 4" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-accent/30"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto leading-relaxed font-brand">
              Discover premium braiding styles crafted by expert stylists. 
              From classic knots to contemporary goddess styles.
            </p>
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
          {/* Category Filter - Enhanced */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            
            
           
          </motion.div>

          {/* Quick Stats Bar - New */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          >
            {[
              { icon: Star, label: "Expert Stylists", value: "50+" },
              { icon: Clock, label: "Avg. Duration", value: "2-6 hrs" },
              { icon: Users, label: "Happy Clients", value: "10k+" },
              { icon: Crown, label: "Premium Quality", value: "Guaranteed" },
            ].map((stat, i) => (
              <div key={i} className="bg-card rounded-xl p-4 border border-border/50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-detail">{stat.label}</p>
                  <p className="font-semibold text-primary">{stat.value}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Category Showcase - Inspired by mockups */}
          {!selectedCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="font-serif text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                <Scissors className="w-5 h-5 text-accent" />
                Signature Categories
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {hairstyleCategories.map((category, i) => (
                  <motion.div
                    key={category.id}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    onClick={() => setSelectedCategory(category.name)}
                    className="group cursor-pointer"
                  >
                    <div className="bg-card rounded-2xl p-5 text-center border-2 border-transparent hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        {category.name === "Knotless" && <Zap className="w-8 h-8 text-accent" />}
                        {category.name === "Traditional" && <Crown className="w-8 h-8 text-accent" />}
                        {category.name === "Cornrows" && <Scissors className="w-8 h-8 text-accent" />}
                        {category.name === "Twists" && <Heart className="w-8 h-8 text-accent" />}
                        {category.name === "Goddess" && <Sparkles className="w-8 h-8 text-accent" />}
                        {!["Knotless", "Traditional", "Cornrows", "Twists", "Goddess"].includes(category.name) && 
                          <Star className="w-8 h-8 text-accent" />
                        }
                      </div>
                      <h3 className="font-serif font-semibold text-primary text-sm mb-1">{category.name}</h3>
                      <p className="text-xs text-detail">{category.hairstyles.length} styles</p>
                      <p className="text-xs text-accent mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        View All →
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Selected Category Header */}
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8 flex items-center justify-between"
            >
              <div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm text-accent hover:text-accent/80 flex items-center gap-1 mb-2"
                >
                  ← Back to all categories
                </button>
                <h2 className="font-serif text-3xl font-bold text-primary">
                  {selectedCategory}
                </h2>
              </div>
              <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold">
                {filteredHairstyles.length} styles
              </span>
            </motion.div>
          )}

          {/* Hairstyles Grid - Enhanced */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {filteredHairstyles.map((style, i) => (
              <motion.div
                key={style.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-2xl h-full flex flex-col">
                  {/* Image Container */}
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={style.image}
                      alt={style.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-background/90 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-accent/20">
                        {style.category}
                      </span>
                    </div>

                    {/* Quick Info Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                    
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-accent text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        Featured
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-lg text-primary mb-2 group-hover:text-accent transition-colors line-clamp-1">
                        {style.name}
                      </h3>
                      
                      <p className="text-sm text-detail line-clamp-2 mb-3 font-brand">
                        {style.description}
                      </p>

                      {/* Price & Duration Tags */}
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <div className="flex items-center gap-1 bg-accent/5 px-2.5 py-1.5 rounded-full">
                          <DollarSign className="w-3.5 h-3.5 text-accent" />
                          <span className="text-xs font-semibold text-primary">From ${style.avgPrice}</span>
                        </div>
                        <div className="flex items-center gap-1 bg-accent/5 px-2.5 py-1.5 rounded-full">
                          <Clock className="w-3.5 h-3.5 text-accent" />
                          <span className="text-xs font-semibold text-primary">{style.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Book Button */}
                    <Link
                      to={`/booking?style=${style.id}`}
                      className="btn-cta w-full text-sm py-3 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-cta/20 transition-all rounded-xl"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredHairstyles.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-card rounded-3xl border border-border"
            >
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary mb-2">No styles found</h3>
              <p className="text-detail mb-6">No hairstyles available in this category yet.</p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-accent font-semibold hover:underline"
              >
                View all styles →
              </button>
            </motion.div>
          )}

          {/* View All Link for Mobile */}
          {filteredHairstyles.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 text-center md:hidden"
            >
              <Link 
                to="/find-stylist" 
                className="inline-flex items-center gap-2 text-accent font-semibold bg-accent/10 px-6 py-3 rounded-full hover:bg-accent/20 transition-all"
              >
                Find Stylists for These Styles
                <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

   

      {/* Footer Note */}
      <div className="border-t border-border py-6 bg-background">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs text-detail">
            Premium Afro Hair Braiding Styles | Expertly Linked to Your Style | © 2026 BraidLink
          </p>
        </div>
      </div>
    </div>
  );
};

export default HairstylesPage;