import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { hairstyleCategories } from "@/data/demo-data";
import StylistMatchCard from "./StylistMatchCard";
import MatchingLoader from "./MatchingLoader";
import { matchStylists, MatchCriteria, MatchResult } from "@/lib/matchingEngine";
import { stylists } from "@/data/demo-data";
import { RejectedInstantMatch } from "@/contexts/BookingContext";

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerPostalCode: string;
  rejectedInstantMatch?: RejectedInstantMatch | null;
}

const MatchModal = ({ isOpen, onClose, customerPostalCode, rejectedInstantMatch }: MatchModalProps) => {
  const [step, setStep] = useState<"form" | "loading" | "results">(rejectedInstantMatch ? "loading" : "form");
  const [hairstyle, setHairstyle] = useState(rejectedInstantMatch?.searchCriteria.hairstyle || "");
  const [date, setDate] = useState(rejectedInstantMatch?.searchCriteria.date || "");
  const [time, setTime] = useState(rejectedInstantMatch?.searchCriteria.time || "10:00");
  const [minPrice, setMinPrice] = useState(rejectedInstantMatch?.searchCriteria.minPrice || 80);
  const [maxPrice, setMaxPrice] = useState(rejectedInstantMatch?.searchCriteria.maxPrice || 250);
  const [matchResults, setMatchResults] = useState<MatchResult[]>([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [rejectedStylistIds, setRejectedStylistIds] = useState<Set<string>>(
    rejectedInstantMatch ? new Set(rejectedInstantMatch.rejectedStylistIds) : new Set()
  );
  const [rejectionReason, setRejectionReason] = useState<string>(rejectedInstantMatch ? `Previous stylist unavailable. Let's find you another match!` : "");

  // Flatten hairstyles for easier selection
  const allHairstyles = hairstyleCategories.flatMap((cat) => cat.hairstyles);

  // Perform the actual search with current state values
  const performSearch = () => {
    const criteria: MatchCriteria = {
      hairstyle: rejectedInstantMatch?.searchCriteria.hairstyle || hairstyle,
      date: rejectedInstantMatch?.searchCriteria.date || date,
      time: rejectedInstantMatch?.searchCriteria.time || time,
      minPrice: rejectedInstantMatch?.searchCriteria.minPrice || minPrice,
      maxPrice: rejectedInstantMatch?.searchCriteria.maxPrice || maxPrice,
      customerPostalCode,
    };

    const results = matchStylists(criteria, stylists);
    const rejectedIds = rejectedInstantMatch ? new Set(rejectedInstantMatch.rejectedStylistIds) : rejectedStylistIds;
    const filteredResults = results.filter(r => !rejectedIds.has(r.stylist.id));

    if (filteredResults.length === 0) {
      alert("Sorry, no more stylists match your criteria. Try adjusting your preferences.");
      setStep("form");
      return;
    }

    setMatchResults(filteredResults);
    setCurrentMatchIndex(0);
    setStep("results");
  };

  // When modal opens with rejected instant match, start search immediately
  useEffect(() => {
    if (isOpen && rejectedInstantMatch) {
      setStep("loading");
      
      // Trigger search after a brief delay to show loading animation
      const timer = setTimeout(() => {
        performSearch();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, rejectedInstantMatch]);

  const handleFindMatch = async () => {
    if (!hairstyle || !date || !time) {
      alert("Please fill in all fields");
      return;
    }

    setStep("loading");

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    performSearch();
  };

  const handleRejectStylist = () => {
    const currentStylist = matchResults[currentMatchIndex].stylist;
    
    // Mark this stylist as rejected
    setRejectedStylistIds(prev => new Set([...prev, currentStylist.id]));
    setRejectionReason(`${currentStylist.name} rejected your booking request.`);

    if (currentMatchIndex + 1 < matchResults.length) {
      setCurrentMatchIndex(currentMatchIndex + 1);
    } else {
      alert("No more stylists available. Try adjusting your preferences.");
      setStep("form");
      setHairstyle("");
      setDate("");
      setTime("10:00");
      setMinPrice(80);
      setMaxPrice(250);
      setMatchResults([]);
      setCurrentMatchIndex(0);
      setRejectedStylistIds(new Set());
      setRejectionReason("");
    }
  };

  const handleBookNow = () => {
    const selectedStylist = matchResults[currentMatchIndex].stylist;
    // Navigate to booking page with all details and instant match flag
    const hairstyleId = allHairstyles.find(h => h.name === hairstyle)?.id || '';
    window.location.href = `/booking?stylist=${selectedStylist.id}&style=${hairstyleId}&date=${date}&time=${time}&postal=${customerPostalCode}&isInstantMatch=true`;
  };

  const handleClose = () => {
    setStep("form");
    setHairstyle("");
    setDate("");
    setTime("10:00");
    setMinPrice(80);
    setMaxPrice(250);
    setMatchResults([]);
    setCurrentMatchIndex(0);
    setRejectedStylistIds(new Set());
    setRejectionReason("");
    onClose();
  };

  // Get minimum date (today or tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-50"
          >
            <div className="bg-background rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Instant Match</h2>
                  <p className="text-sm text-muted-foreground">Find your perfect stylist now</p>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-border rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {step === "form" && (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-5"
                    >
                      {/* Hairstyle Selection */}
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          What hairstyle would you like?
                        </label>
                        <select
                          value={hairstyle}
                          onChange={(e) => setHairstyle(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border-2 border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        >
                          <option value="">Select a hairstyle...</option>
                          {allHairstyles.map((style) => (
                            <option key={style.id} value={style.name}>
                              {style.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Date Selection */}
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          When do you want the appointment?
                        </label>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          min={getMinDate()}
                          className="w-full px-4 py-2.5 rounded-xl border-2 border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        />
                      </div>

                      {/* Time Selection */}
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          What time works best for you?
                        </label>
                        <select
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border-2 border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        >
                          {Array.from({ length: 24 }, (_, i) => {
                            const hour = String(i).padStart(2, "0");
                            return (
                              <option key={hour} value={`${hour}:00`}>
                                {hour}:00 {i < 12 ? "AM" : "PM"}
                              </option>
                            );
                          })}
                        </select>
                      </div>

                      {/* Price Range Selection */}
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-4">
                          What's your budget?
                        </label>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Min: ${minPrice}</span>
                            <span className="text-sm text-muted-foreground">Max: ${maxPrice}</span>
                          </div>

                          {/* Min Price Slider */}
                          <input
                            type="range"
                            min="50"
                            max="400"
                            value={minPrice}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              if (val <= maxPrice) setMinPrice(val);
                            }}
                            className="w-full h-2 bg-accent/20 rounded-lg appearance-none cursor-pointer accent-accent"
                          />

                          {/* Max Price Slider */}
                          <input
                            type="range"
                            min="50"
                            max="400"
                            value={maxPrice}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              if (val >= minPrice) setMaxPrice(val);
                            }}
                            className="w-full h-2 bg-accent/20 rounded-lg appearance-none cursor-pointer accent-accent"
                          />
                        </div>

                        {/* Price display */}
                        <div className="mt-3 px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg">
                          <p className="text-center font-semibold text-accent">
                            ${minPrice} - ${maxPrice}
                          </p>
                        </div>
                      </div>

                      {/* Note about postal code */}
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
                        <p className="font-semibold mb-0.5">📍 Your Location</p>
                        <p>Using your saved location: {customerPostalCode}</p>
                      </div>

                      {/* Find Match Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleFindMatch}
                        className="w-full bg-accent text-white font-bold py-3 rounded-xl hover:bg-accent-dark transition-all duration-300 hover:shadow-lg mt-6"
                      >
                        Find My Perfect Match
                      </motion.button>
                    </motion.div>
                  )}

                  {step === "loading" && (
                    <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <MatchingLoader />
                    </motion.div>
                  )}

                  {step === "results" && matchResults.length > 0 && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      {rejectionReason && currentMatchIndex > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm font-medium border border-red-200"
                        >
                          ❌ {rejectionReason}
                        </motion.div>
                      )}

                      <div className="text-sm text-muted-foreground mb-4">
                        Match {currentMatchIndex + 1} of {matchResults.length}
                      </div>

                      <StylistMatchCard
                        stylist={matchResults[currentMatchIndex].stylist}
                        hairstyle={hairstyle}
                        price={matchResults[currentMatchIndex].stylist.services[0]?.price || minPrice}
                        onBookNow={handleBookNow}
                        onFindAnother={handleRejectStylist}
                        isRejected={false}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MatchModal;
