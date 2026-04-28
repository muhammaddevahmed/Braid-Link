import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Star, Zap, Crown, Scissors, Heart, ChevronRight, ArrowRight } from "lucide-react";

// Static data structure
const categories = [
  { id: "box-braids", name: "Box Braids", icon: Zap },
  { id: "knotless", name: "Knotless", icon: Scissors },
  { id: "cornrows", name: "Cornrows", icon: Crown },
  { id: "fulani", name: "Fulani", icon: Heart },
  { id: "ghana", name: "Ghana", icon: Star },
  { id: "twist", name: "Twist", icon: Sparkles },
  { id: "locs", name: "Locs", icon: Star },
];

const hairstyles = [
  // Box Braids
  { id: 1, name: "Medium Box Braids", category: "Box Braids", image: "https://images.unsplash.com/photo-1488512505199-22a26b5428e2?w=600&h=750&fit=crop" },
  { id: 2, name: "Small Box Braids", category: "Box Braids", image: "https://images.unsplash.com/photo-1512236258305-32fb110fdb01?w=600&h=750&fit=crop" },
  // Knotless
  { id: 3, name: "Medium Knotless", category: "Knotless", image: "https://images.unsplash.com/photo-1507089937360-4e79f04fd8a0?w=600&h=750&fit=crop" },
  { id: 4, name: "Small Knotless", category: "Knotless", image: "https://images.unsplash.com/photo-1519398520-2559e7d7d5bd?w=600&h=750&fit=crop" },
  // Cornrows
  { id: 5, name: "Straight Back", category: "Cornrows", image: "https://images.unsplash.com/photo-1512212621141-037e21c8d1d5?w=600&h=750&fit=crop" },
  { id: 6, name: "Stitch Cornrows", category: "Cornrows", image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&h=750&fit=crop" },
  // Fulani
  { id: 7, name: "Classic Fulani", category: "Fulani", image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=750&fit=crop" },
  // Ghana
  { id: 8, name: "Ghana Weaving", category: "Ghana", image: "https://images.unsplash.com/photo-1580618864180-f6d7d39e8f2e?w=600&h=750&fit=crop" },
  // Twist
  { id: 9, name: "Senegalese Twist", category: "Twist", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&h=750&fit=crop" },
  // Locs
  { id: 10, name: "Faux Locs", category: "Locs", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&h=750&fit=crop" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" } 
  }),
};

const HairstylesPage = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const filteredStyles = activeFilter
    ? hairstyles.filter((style) => style.category === activeFilter)
    : hairstyles;

  const handleImageError = (id: number) => {
    setImageErrors(prev => new Set(prev).add(id));
  };

  const getFallbackImage = (styleName: string) => {
    const colors = ['6366f1', '8b5cf6', 'd946ef', 'ec4899', 'f43f5e'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return `https://placehold.co/600x750/${color}/ffffff?text=${encodeURIComponent(styleName)}`;
  };

  return (
    <div className="relative bg-background min-h-screen">
      {/* Hero Section - Compact & Elegant */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-primary/95">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-accent/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-accent/8 rounded-full blur-[120px] animate-pulse delay-1000" />
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
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Our Signature{" "}
              <span className="text-accent relative inline-block">
                Braid Collection
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4L200 4" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-accent/40"/>
                </svg>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Discover premium braiding styles crafted by expert stylists. 
              From classic knots to contemporary goddess styles.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-accent rounded-full" />
              <h2 className="font-serif text-xl md:text-2xl font-bold text-primary">
                Filter by Category
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* All Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(null)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                  activeFilter === null
                    ? "bg-accent text-primary border-accent shadow-lg shadow-accent/25"
                    : "bg-card text-muted-foreground border-border hover:border-accent/40 hover:text-primary"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  All Styles
                </span>
              </motion.button>

              {/* Category Pills */}
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(category.name)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 border ${
                    activeFilter === category.name
                      ? "bg-accent text-primary border-accent shadow-lg shadow-accent/25"
                      : "bg-card text-muted-foreground border-border hover:border-accent/40 hover:text-primary"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <category.icon className="w-4 h-4" />
                    {category.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between mb-8"
          >
            <p className="text-sm text-muted-foreground">
              Showing <span className="text-primary font-semibold">{filteredStyles.length}</span> styles
              {activeFilter && (
                <>
                  {" "}in <span className="text-accent font-semibold">{activeFilter}</span>
                  <button
                    onClick={() => setActiveFilter(null)}
                    className="ml-2 text-xs text-accent hover:underline"
                  >
                    Clear filter
                  </button>
                </>
              )}
            </p>
          </motion.div>

          {/* Hairstyles Grid - Main Focus */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter || "all"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6"
            >
              {filteredStyles.map((style, i) => (
                <motion.div
                  key={style.id}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden rounded-3xl bg-card border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-2xl aspect-[4/5]"
                >
                  {/* Image Container */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={imageErrors.has(style.id) ? getFallbackImage(style.name) : style.image}
                      alt={style.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                      onError={() => handleImageError(style.id)}
                    />
                    
                    {/* Gradient Overlay - Darker at bottom for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500" />
                  </div>

                  {/* Content Overlay */}
                  <div className="relative h-full flex flex-col justify-end p-5 md:p-6">
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-accent/20">
                        {style.category}
                      </span>
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
                      <div className="w-10 h-10 rounded-full bg-accent/90 flex items-center justify-center shadow-xl">
                        <ArrowRight className="w-5 h-5 text-primary" />
                      </div>
                    </div>

                    {/* Style Name */}
                    <div>
                      <h3 className="font-serif font-bold text-xl md:text-2xl text-white mb-2 leading-tight drop-shadow-lg">
                        {style.name}
                      </h3>
                      
                      {/* Decorative line */}
                      <div className="h-0.5 w-0 group-hover:w-16 bg-accent rounded-full transition-all duration-500" />
                      
                      {/* Category name on hover */}
                      <p className="text-sm text-white/60 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        {style.category}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredStyles.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-gradient-to-br from-card to-secondary/5 rounded-3xl border border-border/50 shadow-xl"
            >
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-accent" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-3">No styles found</h3>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                No hairstyles available in this category yet.
              </p>
              <button
                onClick={() => setActiveFilter(null)}
                className="bg-accent text-primary font-semibold px-6 py-3 rounded-xl hover:bg-accent/90 transition-all duration-300 inline-flex items-center gap-2 group"
              >
                View all styles
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-border/40 py-8 bg-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-muted-foreground/60 tracking-wide">
            Premium Afro Hair Braiding Styles | Expertly Linked to Your Style | © 2026 BraidLink
          </p>
        </div>
      </div>
    </div>
  );
};

export default HairstylesPage;