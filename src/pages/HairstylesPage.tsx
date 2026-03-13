import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { hairstyleCategories, hairstyles } from "@/data/demo-data";
import { Clock, DollarSign, ArrowRight, Sparkles, Heart, Filter, ChevronRight, Star, Scissors, Zap, Crown, Users } from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useState } from "react";

const HairstylesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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

  const totalPages = Math.ceil(filteredHairstyles.length / itemsPerPage);
  const paginatedHairstyles = filteredHairstyles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
  };

  return (
    <div className="relative bg-background">
      {/* Hero Section - Refined premium design */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-br from-primary via-primary to-primary/95">
        {/* Sophisticated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-20 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[140px] animate-pulse delay-1000" />
          
          {/* Refined pattern overlay */}
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
           

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Explore Our Signature <br />
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
          {/* Category Filter - Hidden but preserved */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10 hidden"
          >
            {/* Content preserved but hidden */}
          </motion.div>

      

          {/* Category Showcase - Refined with premium cards */}
          {!selectedCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1 h-6 bg-accent rounded-full" />
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
                  Signature Categories
                </h2>
                <span className="text-xs text-muted-foreground ml-auto">
                  {hairstyleCategories.length} categories
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
                {hairstyleCategories.map((category, i) => (
                <motion.div
                  key={category.id}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setCurrentPage(1);
                  }}
                  className="group cursor-pointer"
                >
                    <div className="bg-card rounded-2xl p-6 text-center border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        {category.name === "Knotless" && <Zap className="w-8 h-8 text-accent" />}
                        {category.name === "Traditional" && <Crown className="w-8 h-8 text-accent" />}
                        {category.name === "Cornrows" && <Scissors className="w-8 h-8 text-accent" />}
                        {category.name === "Twists" && <Heart className="w-8 h-8 text-accent" />}
                        {category.name === "Goddess" && <Sparkles className="w-8 h-8 text-accent" />}
                        {!["Knotless", "Traditional", "Cornrows", "Twists", "Goddess"].includes(category.name) && 
                          <Star className="w-8 h-8 text-accent" />
                        }
                      </div>
                      <h3 className="font-serif font-semibold text-primary mb-1">{category.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{category.hairstyles.length} styles</p>
                      <p className="text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                        View All →
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Selected Category Header - Refined */}
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm text-accent hover:text-accent/80 flex items-center gap-1 mb-3 group"
                >
                  <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                  Back to all categories
                </button>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">
                  {selectedCategory}
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-px bg-border hidden sm:block" />
                <span className="bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold border border-accent/20">
                  {filteredHairstyles.length} styles available
                </span>
              </div>
            </motion.div>
          )}

          {/* Hairstyles Grid - Premium card redesign */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {paginatedHairstyles.map((style, i) => (
              <motion.div
                key={style.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-2xl h-full flex flex-col">
                  {/* Image Container - Refined */}
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={style.image}
                      alt={style.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                    
                    {/* Category Badge - Premium */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-accent/20">
                        {style.category}
                      </span>
                    </div>

                    {/* Featured Badge - Premium */}
                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <span className="bg-accent text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </span>
                    </div>

                    {/* Quick action overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <Link
                        to={`/booking?style=${style.id}`}
                        className="bg-white/90 backdrop-blur-sm text-primary font-semibold w-full py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-accent hover:text-primary transition-all duration-300 shadow-xl"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Content - Refined */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="font-serif font-bold text-xl text-primary mb-2 group-hover:text-accent transition-colors line-clamp-1">
                        {style.name}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {style.description}
                      </p>

                      {/* Price & Duration Tags - Premium */}
                      <div className="flex flex-wrap items-center gap-2 mb-5">
                        <div className="flex items-center gap-1.5 bg-accent/5 px-3 py-1.5 rounded-full border border-accent/10">
                          <DollarSign className="w-3.5 h-3.5 text-accent" />
                          <span className="text-xs font-semibold text-primary">From ${style.avgPrice}</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-accent/5 px-3 py-1.5 rounded-full border border-accent/10">
                          <Clock className="w-3.5 h-3.5 text-accent" />
                          <span className="text-xs font-semibold text-primary">{style.duration}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stylist availability indicator */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-muted-foreground">12 stylists available</span>
                      </div>
                      <span className="text-xs text-accent font-medium">Book now →</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-16 flex justify-center"
            >
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    const page = currentPage <= 4 
                      ? i + 1 
                      : currentPage >= totalPages - 3 
                      ? totalPages - 6 + i 
                      : currentPage - 3 + i;
                    if (page > 0 && page <= totalPages) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink 
                            isActive={currentPage === page}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    }
                    return null;
                  })}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </motion.div>
          )}

          {/* Empty State - Refined premium design */}
          {filteredHairstyles.length === 0 && (
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
                No hairstyles available in this category yet. Explore other categories.
              </p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="bg-accent text-primary font-semibold px-6 py-3 rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-accent/25 inline-flex items-center gap-2 group"
              >
                View all styles
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {/* View All Link for Mobile - Refined */}
          {filteredHairstyles.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center lg:hidden"
            >
              <Link 
                to="/find-stylist" 
                className="inline-flex items-center gap-2 text-accent font-semibold bg-accent/10 px-6 py-3 rounded-full hover:bg-accent/20 transition-all duration-300 group border border-accent/20"
              >
                Find Stylists for These Styles
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer Note - Refined */}
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