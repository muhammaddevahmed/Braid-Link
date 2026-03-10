import { Star, MapPin, Zap, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Stylist } from "@/data/demo-data";

interface StylistMatchCardProps {
  stylist: Stylist & { matchScore: number; distanceFromCustomer?: number };
  hairstyle: string;
  price: number;
  onBookNow: () => void;
  onFindAnother: () => void;
  isRejected?: boolean;
}

const StylistMatchCard = ({
  stylist,
  hairstyle,
  price,
  onBookNow,
  onFindAnother,
  isRejected = false,
}: StylistMatchCardProps) => {
  const getResponseSpeedBadge = (speed?: string) => {
    const badges = {
      fast: { label: "⚡ Quick", color: "bg-green-100 text-green-700" },
      medium: { label: "⏱️ Standard", color: "bg-yellow-100 text-yellow-700" },
      slow: { label: "🐢 Flexible", color: "bg-blue-100 text-blue-700" },
      default: { label: "📅 Available", color: "bg-slate-100 text-slate-700" },
    };
    return badges[speed as keyof typeof badges] || badges.default;
  };

  const speedBadge = getResponseSpeedBadge(stylist.responseSpeed);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl overflow-hidden shadow-2xl border-2 border-accent/20 bg-card`}
    >
      {/* Stylist Image */}
      <div className="relative h-64 sm:h-72 overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5">
        <motion.img
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          src={stylist.photo}
          alt={stylist.name}
          className="w-full h-full object-cover"
        />

        {/* Match Score Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="absolute top-4 right-4 bg-accent text-white rounded-full w-16 h-16 flex items-center justify-center font-bold text-lg shadow-lg"
        >
          {stylist.matchScore}%
        </motion.div>

        {/* Featured Badge */}
        {stylist.featured && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
          >
            ⭐ Featured
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        {/* Name and Location */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">{stylist.name}</h3>
          <div className="flex items-center gap-1.5 text-muted-foreground mb-4">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{stylist.location}</span>
          </div>
        </motion.div>

        {/* Rating and Experience */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="flex items-center gap-4 mb-6 flex-wrap"
        >
          <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-lg">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-foreground">{stylist.rating}</span>
            <span className="text-xs text-muted-foreground">({stylist.reviewCount} reviews)</span>
          </div>
          <div className="bg-blue-50 px-3 py-2 rounded-lg text-sm text-blue-700 font-semibold">
            {stylist.experience} years experience
          </div>
        </motion.div>

        {/* Service Details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-accent/8 rounded-xl p-4 mb-6 border border-accent/10"
        >
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Style</p>
              <p className="font-bold text-foreground text-sm">{hairstyle}</p>
            </div>
            <div className="text-center border-l border-r border-accent/20">
              <p className="text-xs text-muted-foreground mb-1">Price</p>
              <p className="font-bold text-accent text-lg">${price}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">Response</p>
              <div className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${speedBadge.color}`}>
                {speedBadge.label}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio/Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-muted-foreground mb-6 line-clamp-2 text-sm"
        >
          {stylist.bio}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-3"
        >
          <button
            onClick={onBookNow}
            className="bg-accent text-white font-semibold py-3 px-4 rounded-xl hover:bg-accent-dark transition-all duration-300 hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Book Now
          </button>
          <button
            onClick={onFindAnother}
            className="border-2 border-accent text-accent font-semibold py-3 px-4 rounded-xl hover:bg-accent/10 transition-all duration-300 active:scale-95"
          >
            Find Another
          </button>
        </motion.div>

        {/* Match Breakdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 pt-6 border-t border-border text-xs text-muted-foreground"
        >
          <p className="font-semibold text-foreground mb-2">Why they match:</p>
          <ul className="space-y-1.5 text-xs">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Expert in {hairstyle}
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Available on your selected date & time
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Price within your budget
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" /> Top rated (⭐ {stylist.rating}/5)
            </li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StylistMatchCard;
