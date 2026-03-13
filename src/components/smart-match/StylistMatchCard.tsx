import { Star, MapPin, Award, Heart, ChevronRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Stylist } from "@/data/demo-data";
import { Link } from "react-router-dom";

interface StylistMatchCardProps {
  stylist: Stylist & { matchScore: number; distanceFromCustomer?: number };
  price?: number;
  onBookNow?: () => void;
  onSelectDate?: () => void;
  onFindAnother?: () => void;
  isRejected?: boolean;
  matchedService?: {
    name: string;
    price: number;
    duration: string;
  };
}

const StylistMatchCard = ({ 
  stylist, 
  price, 
  onBookNow,
  onSelectDate,
  onFindAnother,
  isRejected = false,
  matchedService 
}: StylistMatchCardProps) => {

  const displayPrice = price || matchedService?.price || Math.min(...stylist.services.map((s) => s.price));
  const displayDuration = matchedService?.duration || stylist.services.find(s => s.price === displayPrice)?.duration || "";
  const displayServiceName = matchedService?.name || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
      className="rounded-3xl overflow-hidden shadow-lg border border-border/50 bg-card"
    >
      <div className="flex items-center p-4">
        <div className="relative">
          <img src={stylist.photo} alt={stylist.name} className="w-24 h-24 rounded-full object-cover border-4 border-accent/20" />
          {stylist.matchScore > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
              className="absolute -top-1 -right-1 bg-accent text-primary rounded-full w-10 h-10 flex flex-col items-center justify-center font-bold shadow-lg border-2 border-white/20"
            >
              <span className="text-sm leading-none">{stylist.matchScore}%</span>
              <span className="text-[6px] uppercase tracking-wider">Match</span>
            </motion.div>
          )}
        </div>

        <div className="ml-4 flex-1">
          <h3 className="text-lg font-bold text-primary">{stylist.name}</h3>
          <div className="flex items-center gap-2 text-sm text-detail mt-1">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-accent text-accent" />
              <span className="font-semibold">{stylist.rating}</span>
              <span>({stylist.reviewCount})</span>
            </div>
            <span className="w-1 h-1 rounded-full bg-detail/30" />
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{stylist.distanceFromCustomer?.toFixed(1)} mi</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {stylist.specialties.slice(0, 2).map((s) => (
              <span key={s} className="text-xs bg-accent/10 text-detail px-2 py-1 rounded-full font-medium">
                {s}
              </span>
            ))}
          </div>
          {displayServiceName && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                {displayServiceName}
              </span>
              {displayDuration && (
                <span className="text-xs text-detail flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {displayDuration}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="px-4 pb-4 flex items-center justify-between">
        <div className="text-center">
            <p className="text-xs text-detail mb-1">
              {displayServiceName || "Starting from"}
            </p>
            <p className="font-bold text-primary text-xl">${displayPrice}</p>
        </div>
        <div className="flex gap-2">
          {onFindAnother && (
            <button 
              onClick={onFindAnother}
              className="btn-secondary flex items-center gap-2 text-sm px-4 py-2 rounded-xl"
            >
              Find Another
            </button>
          )}
          {onSelectDate ? (
            <button 
              onClick={onSelectDate}
              className="btn-primary flex items-center gap-2 text-sm px-4 py-2 rounded-xl"
            >
              Select Date <ChevronRight className="w-4 h-4" />
            </button>
          ) : onBookNow ? (
            <button 
              onClick={onBookNow}
              className="btn-primary flex items-center gap-2 text-sm px-4 py-2 rounded-xl"
            >
              Book Now <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <Link to={`/stylist/${stylist.id}`} className="btn-primary flex items-center gap-2 text-sm px-4 py-2 rounded-xl">
              View Profile <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};
 
export default StylistMatchCard;