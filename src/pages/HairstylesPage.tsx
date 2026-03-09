import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { hairstyles } from "@/data/demo-data";
import { Clock, DollarSign, ArrowRight } from "lucide-react";

const HairstylesPage = () => {
  return (
    <div className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-4xl font-bold text-primary">Browse Hairstyles</h1>
          <p className="text-detail mt-2 font-brand">Explore our collection of beautiful braiding styles</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {hairstyles.map((style, i) => (
            <motion.div
              key={style.id}
              className="bg-card rounded-2xl overflow-hidden border border-detail/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <div className="aspect-square rounded-t-2xl overflow-hidden">
                <img src={style.image} alt={style.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-4">
                <h3 className="font-serif font-semibold text-base mb-2 text-primary">{style.name}</h3>
                <p className="text-sm text-detail line-clamp-2 mb-3 font-brand">{style.description}</p>
                <div className="flex items-center justify-between text-xs text-detail mb-4">
                  <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> From ${style.avgPrice}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {style.duration}</span>
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
      </div>
    </div>
  );
};

export default HairstylesPage;
