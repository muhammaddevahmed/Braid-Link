import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { hairstyleCategories, hairstyles } from "@/data/demo-data";
import { Clock, DollarSign, ArrowRight } from "lucide-react";
import { useState } from "react";

const HairstylesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get all unique hairstyle items from categories
  const allHairstyleItems = hairstyleCategories.flatMap((cat) =>
    cat.hairstyles.map((h) => ({
      ...h,
      category: cat.name,
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

  return (
    <div className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-4xl font-bold text-primary">
            Browse Hairstyles
          </h1>
          <p className="text-detail mt-2 font-brand">
            Explore our collection of beautiful braiding styles
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="mb-8 flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === null
                ? "bg-cta text-white shadow-md"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All Styles
          </button>
          {hairstyleCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.name
                  ? "bg-cta text-white shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Hairstyles Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredHairstyles.map((style, i) => (
            <motion.div
              key={style.id}
              className="bg-card rounded-2xl overflow-hidden border border-detail/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <div className="aspect-square rounded-t-2xl overflow-hidden">
                <img
                  src={style.image}
                  alt={style.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-serif font-semibold text-base mb-2 text-primary">
                  {style.name}
                </h3>
                <p className="text-xs font-medium text-cta/60 mb-2">
                  {style.category}
                </p>
                <p className="text-sm text-detail line-clamp-2 mb-3 font-brand">
                  {style.description}
                </p>
                <div className="flex items-center justify-between text-xs text-detail mb-4">
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" /> From ${style.avgPrice}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {style.duration}
                  </span>
                </div>
                <Link
                  to={`/booking?style=${style.id}`}
                  className="btn-cta w-full text-sm py-2 flex items-center justify-center gap-1 hover-scale"
                >
                  Book Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredHairstyles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No hairstyles found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HairstylesPage;
