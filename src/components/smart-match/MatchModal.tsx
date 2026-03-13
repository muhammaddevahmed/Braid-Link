import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, Sparkles, Calendar, Clock, DollarSign, MapPin, 
  ChevronRight, ChevronLeft, Heart, Zap, Star, AlertCircle,
  RefreshCw, CheckCircle, Scissors, Award, Shield, Users, Search
} from "lucide-react";
import { toast } from "sonner";
import { hairstyleCategories, Stylist } from "@/data/demo-data";
import StylistMatchCard from "./StylistMatchCard";
import MatchingLoader from "./MatchingLoader";
import { matchStylists, MatchCriteria, MatchResult } from "@/lib/matchingEngine";
import { stylists } from "@/data/demo-data";

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerPostalCode?: string;
  preSelectedHairstyle?: string;
  preSelectedDate?: string;
  preSelectedTime?: string;
  onStylistSelected?: (stylistId: string, serviceName: string, servicePrice: number) => void;
}

const MatchModal = ({ 
  isOpen, 
  onClose, 
  customerPostalCode = "",
  preSelectedHairstyle = "",
  preSelectedDate = "",
  preSelectedTime = "",
  onStylistSelected
}: MatchModalProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "loading" | "results">("form");
  const [hairstyle, setHairstyle] = useState(preSelectedHairstyle);
  const [date, setDate] = useState(preSelectedDate);
  const [time, setTime] = useState(preSelectedTime || "10:00");
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(300);
  const [exactMatches, setExactMatches] = useState<MatchResult[]>([]);
  const [closestMatches, setClosestMatches] = useState<MatchResult[]>([]);
  const [selectedStylistForCalendar, setSelectedStylistForCalendar] = useState<Stylist | null>(null);
  const [rejectedStylistIds, setRejectedStylistIds] = useState<Set<string>>(new Set());
  const [postalCode, setPostalCode] = useState(customerPostalCode);
  const [country, setCountry] = useState<"UK" | "USA">(
    () => {
      // Try to detect country from postal code format
      if (customerPostalCode) {
        // UK postcodes contain letters, US are typically 5 digits
        if (/^[A-Z]/i.test(customerPostalCode) && /\d/.test(customerPostalCode) && !/^\d{5}$/.test(customerPostalCode)) {
          return "UK";
        }
        if (/^\d{5}$/.test(customerPostalCode)) {
          return "USA";
        }
      }
      return "UK"; // Default to UK
    }
  );
  const [isSearching, setIsSearching] = useState(false);
  const [showNoMatchMessage, setShowNoMatchMessage] = useState(false);
  const [postalCodeError, setPostalCodeError] = useState("");

  // Validate postal code based on country
  const validatePostalCode = (code: string, countryCode: "UK" | "USA"): boolean => {
    if (!code.trim()) return false;
    
    if (countryCode === "USA") {
      return /^\d{5}$/.test(code);
    } else { // UK
      return /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}$/i.test(code);
    }
  };

  // Get placeholder and helper text based on country
  const getPostalCodePlaceholder = () => {
    return country === "USA" ? "e.g. 90210" : "e.g. SW1A 0AA";
  };

  const getPostalCodeHelper = () => {
    return country === "USA" 
      ? "US zip codes should be 5 digits (e.g., 90210)."
      : "UK postcodes are alphanumeric (e.g., SW1A 0AA).";
  };

  // Update state when props change
  useEffect(() => {
    if (preSelectedHairstyle) setHairstyle(preSelectedHairstyle);
    if (preSelectedDate) setDate(preSelectedDate);
    if (preSelectedTime) setTime(preSelectedTime);
    if (customerPostalCode) setPostalCode(customerPostalCode);
  }, [preSelectedHairstyle, preSelectedDate, preSelectedTime, customerPostalCode]);

  // Flatten hairstyles for easier selection
  const allHairstyles = hairstyleCategories.flatMap((cat) => cat.hairstyles);

  // Get display hairstyle name
  const getHairstyleName = (value: string) => {
    const found = allHairstyles.find(h => h.id === value || h.name === value);
    return found ? found.name : value;
  };

  // Get available dates for a stylist (next 14 days)
  const getAvailableDates = (stylist: Stylist) => {
    const dates: { date: string; dayName: string; available: boolean }[] = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const dayName = d.toLocaleString("en-US", { weekday: "long" });
      const dateStr = d.toISOString().split("T")[0];
      const isAvailable = !!stylist.availability[dayName];
      dates.push({ date: dateStr, dayName, available: isAvailable });
    }
    return dates;
  };

  // Get available time slots for a stylist on a specific date
  const getAvailableTimes = (stylist: Stylist, selectedDate: string) => {
    const dateObj = new Date(selectedDate);
    const dayName = dateObj.toLocaleString("en-US", { weekday: "long" });
    const dayAvailability = stylist.availability[dayName];
    
    if (!dayAvailability) return [];
    
    const times: { time: string; display: string }[] = [];
    const startHour = parseInt(dayAvailability.start.split(":")[0], 10);
    const endHour = parseInt(dayAvailability.end.split(":")[0], 10);
    
    for (let hour = startHour; hour < endHour; hour++) {
      const time24 = `${hour.toString().padStart(2, '0')}:00`;
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const period = hour < 12 ? "AM" : "PM";
      times.push({ time: time24, display: `${displayHour}:00 ${period}` });
    }
    return times;
  };

  // Perform the actual search with current state values
  const performSearch = useCallback(() => {
    setIsSearching(true);
    const criteria: MatchCriteria = {
      hairstyle: getHairstyleName(hairstyle),
      date: date,
      time: time,
      postcode: postalCode,
      minPrice: minPrice,
      maxPrice: maxPrice,
    };

    setTimeout(() => {
      const results = matchStylists(criteria, stylists);
      
      // Filter out rejected stylists
      const filteredExact = results.exactMatches.filter(r => !rejectedStylistIds.has(r.stylist.id));
      const filteredClosest = results.closestMatches.filter(r => !rejectedStylistIds.has(r.stylist.id));

      setExactMatches(filteredExact);
      setClosestMatches(filteredClosest);
      
      // Show message if no exact matches
      if (filteredExact.length === 0 && filteredClosest.length === 0) {
        setShowNoMatchMessage(true);
      } else {
        setShowNoMatchMessage(false);
      }
      
      setStep(filteredExact.length > 0 || filteredClosest.length > 0 ? "results" : "form");
      setIsSearching(false);
    }, 800); // Simulate network delay
  }, [hairstyle, date, time, postalCode, minPrice, maxPrice, rejectedStylistIds]);

  // Auto-search when all required fields are filled
  useEffect(() => {
    if (isOpen && hairstyle && date && time && postalCode) {
      setStep("loading");
      performSearch();
    }
  }, [hairstyle, date, time, postalCode, minPrice, maxPrice, isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  const handleBookNow = (result: MatchResult) => {
    const selectedStylist = result.stylist;
    const service = result.matchedService || selectedStylist.services[0];
    
    if (onStylistSelected) {
      onStylistSelected(selectedStylist.id, service.name, service.price);
      onClose();
    } else {
      // Navigate to booking page with all details
      const hairstyleId = allHairstyles.find(h => h.name === hairstyle)?.id || '';
      navigate(`/booking?stylist=${selectedStylist.id}&style=${hairstyleId}&date=${date}&time=${time}&postal=${postalCode}&isInstantMatch=true`);
    }
  };

      // Book with adjusted time for closest match
  const handleBookWithAdjustedTime = (result: MatchResult, adjustedDate: string, adjustedTime: string) => {
    const selectedStylist = result.stylist;
    const service = result.matchedService || selectedStylist.services[0];
    
    if (onStylistSelected) {
      onStylistSelected(selectedStylist.id, service.name, service.price);
      onClose();
    } else {
      const hairstyleId = allHairstyles.find(h => h.name === hairstyle)?.id || '';
      navigate(`/booking?stylist=${selectedStylist.id}&style=${hairstyleId}&date=${adjustedDate}&time=${adjustedTime}&postal=${postalCode}&isInstantMatch=true`);
    }
  };

  const handleFindAnother = (result: MatchResult) => {
    setRejectedStylistIds(prev => new Set([...prev, result.stylist.id]));
    
    // If we rejected the last exact match, show closest matches
    const remainingExact = exactMatches.filter(r => !rejectedStylistIds.has(r.stylist.id) && r.stylist.id !== result.stylist.id);
    
    if (remainingExact.length === 0 && closestMatches.length > 0) {
      toast.info("No more exact matches. Showing closest matches...");
    }
  };

  const handleViewCalendar = (stylist: Stylist) => {
    setSelectedStylistForCalendar(stylist);
  };

  const handleClose = () => {
    setStep("form");
    setHairstyle(preSelectedHairstyle);
    setDate(preSelectedDate);
    setTime(preSelectedTime || "10:00");
    setMinPrice(50);
    setMaxPrice(300);
    setExactMatches([]);
    setClosestMatches([]);
    setSelectedStylistForCalendar(null);
    setRejectedStylistIds(new Set());
    setShowNoMatchMessage(false);
    onClose();
  };

  // Get minimum date (today or tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  // Check if we can start searching (requires valid postal code)
  const canSearch = hairstyle && date && time && postalCode && validatePostalCode(postalCode, country);

  // Validate on blur or when country changes
  const handlePostalCodeChange = (value: string) => {
    setPostalCode(value);
    // Clear error when user starts typing
    if (postalCodeError) setPostalCodeError("");
  };

  const handleCountryChange = (value: "UK" | "USA") => {
    setCountry(value);
    // Re-validate postal code when country changes
    if (postalCode && !validatePostalCode(postalCode, value)) {
      setPostalCodeError(`Please enter a valid ${value === "USA" ? "5-digit US zip code" : "UK postcode"}.`);
    } else {
      setPostalCodeError("");
    }
  };

  // Validate postal code when user leaves the field
  const handlePostalCodeBlur = () => {
    if (postalCode && !validatePostalCode(postalCode, country)) {
      setPostalCodeError(`Please enter a valid ${country === "USA" ? "5-digit US zip code" : "UK postcode"}.`);
    }
  };

  // Handle search with validation
  const handleSearch = () => {
    // Validate before searching
    if (!validatePostalCode(postalCode, country)) {
      setPostalCodeError(`Please enter a valid ${country === "USA" ? "5-digit US zip code" : "UK postcode"}.`);
      return;
    }
    if (!hairstyle) {
      toast.error("Please select a hairstyle");
      return;
    }
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    if (!time) {
      toast.error("Please select a time");
      return;
    }
    performSearch();
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
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-50"
          >
            <div className="bg-gradient-to-b from-card to-background rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-border/50 flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-primary/95 text-background p-6 border-b border-border/10">
                <div className="flex items-center justify-between">
                  <div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 mb-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-xs font-medium bg-accent/20 px-3 py-1 rounded-full text-accent">
                        Smart Match
                      </span>
                    </motion.div>
                    <h2 className="text-2xl font-bold text-background">Find Your Perfect Stylist</h2>
                    <p className="text-sm text-background/80 mt-1">We&apos;ll find stylists based on your preferences</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClose}
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Content - Scrollable */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Calendar View for Selected Stylist */}
                {selectedStylistForCalendar && (
                  <motion.div
                    key="calendar"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-serif text-xl font-bold text-primary">{selectedStylistForCalendar.name}&apos;s Availability</h3>
                        <p className="text-sm text-detail">Select a date and time that works for you</p>
                      </div>
                      <button
                        onClick={() => setSelectedStylistForCalendar(null)}
                        className="text-sm text-accent hover:underline"
                      >
                        ← Back to results
                      </button>
                    </div>

                    {/* Stylist Info */}
                    <div className="flex items-center gap-4 p-4 bg-accent/5 rounded-xl">
                      <img 
                        src={selectedStylistForCalendar.photo} 
                        alt={selectedStylistForCalendar.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-accent/30"
                      />
                      <div>
                        <p className="font-semibold text-primary">{selectedStylistForCalendar.name}</p>
                        <div className="flex items-center gap-2 text-sm text-detail">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span>{selectedStylistForCalendar.rating}</span>
                          <span>•</span>
                          <MapPin className="w-4 h-4" />
                          <span>{selectedStylistForCalendar.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Available Dates */}
                    <div>
                      <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent" />
                        Select a Date
                      </h4>
                      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                        {getAvailableDates(selectedStylistForCalendar).map((d) => (
                          <button
                            key={d.date}
                            onClick={() => d.available && setDate(d.date)}
                            disabled={!d.available}
                            className={`p-2 rounded-lg text-center transition-all ${
                              date === d.date 
                                ? "bg-accent text-primary font-semibold" 
                                : d.available 
                                  ? "bg-card border border-border hover:border-accent/50" 
                                  : "bg-muted/30 text-detail/50 cursor-not-allowed"
                            }`}
                          >
                            <div className="text-xs">{d.dayName.slice(0, 3)}</div>
                            <div className="font-bold">{new Date(d.date + "T00:00:00").getDate()}</div>
                            <div className="text-xs">{new Date(d.date + "T00:00:00").toLocaleDateString("en-US", { month: "short" })}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Available Times */}
                    {date && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-accent" />
                          Available Times
                        </h4>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {getAvailableTimes(selectedStylistForCalendar, date).map((t) => (
                            <button
                              key={t.time}
                              onClick={() => {
                                const matchingResult = closestMatches.find(r => r.stylist.id === selectedStylistForCalendar.id) || 
                                  exactMatches.find(r => r.stylist.id === selectedStylistForCalendar.id);
                                if (matchingResult) {
                                  handleBookWithAdjustedTime(matchingResult, date, t.time);
                                }
                              }}
                              className="p-2 rounded-lg text-sm text-center bg-card border border-border hover:border-accent hover:bg-accent/5 transition-all"
                            >
                              {t.display}
                            </button>
                          ))}
                        </div>
                        {getAvailableTimes(selectedStylistForCalendar, date).length === 0 && (
                          <p className="text-sm text-amber-600">No available times on this date. Please select another date.</p>
                        )}
                      </motion.div>
                    )}

                    {/* Quick Book Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const matchingResult = closestMatches.find(r => r.stylist.id === selectedStylistForCalendar.id) || 
                          exactMatches.find(r => r.stylist.id === selectedStylistForCalendar.id);
                        if (matchingResult) {
                          const firstAvailableDate = getAvailableDates(selectedStylistForCalendar).find(d => d.available);
                          const availableTimes = getAvailableTimes(selectedStylistForCalendar, date || firstAvailableDate?.date || "");
                          if (availableTimes.length > 0) {
                            handleBookWithAdjustedTime(matchingResult, date || firstAvailableDate?.date || "", availableTimes[0].time);
                          }
                        }
                      }}
                      className="w-full bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-5 h-5" />
                      Book Appointment
                    </motion.button>
                  </motion.div>
                )}

                {/* Form Step */}
                {step === "form" && !selectedStylistForCalendar && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {[
                        { icon: Users, label: "50+ Stylists", value: "Available" },
                        { icon: Star, label: "4.9 ★ Avg", value: "Rating" },
                        { icon: Shield, label: "Verified", value: "All Pros" },
                      ].map((stat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-accent/5 rounded-xl p-3 text-center border border-accent/10"
                        >
                          <stat.icon className="w-4 h-4 text-accent mx-auto mb-1" />
                          <p className="text-xs font-semibold text-primary">{stat.label}</p>
                          <p className="text-xs text-detail">{stat.value}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Location Info */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-primary flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-accent" />
                        Your Location
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {/* Country Selector */}
                        <div className="col-span-1">
                          <select
                            value={country}
                            onChange={(e) => handleCountryChange(e.target.value as "UK" | "USA")}
                            className="w-full px-3 py-3.5 rounded-xl border-2 border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                          >
                            <option value="UK">UK</option>
                            <option value="USA">USA</option>
                          </select>
                        </div>
                        {/* Postal Code Input */}
                        <div className="col-span-2">
                          <input
                            type="text"
                            value={postalCode}
                            onChange={(e) => handlePostalCodeChange(e.target.value)}
                            onBlur={handlePostalCodeBlur}
                            placeholder={getPostalCodePlaceholder()}
                            className={`w-full px-4 py-3.5 rounded-xl border-2 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all ${
                              postalCodeError ? "border-destructive focus:border-destructive" : "border-border"
                            }`}
                          />
                        </div>
                      </div>
                      {/* Error Message */}
                      {postalCodeError && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-sm text-destructive flex items-center gap-1"
                        >
                          <AlertCircle className="w-4 h-4" /> {postalCodeError}
                        </motion.p>
                      )}
                      <p className="text-xs text-detail">
                        {getPostalCodeHelper()}
                      </p>
                    </div>

                    {/* Hairstyle Selection */}
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-primary flex items-center gap-2">
                        <Scissors className="w-4 h-4 text-accent" />
                        Hairstyle
                      </label>
                      <select
                        value={hairstyle}
                        onChange={(e) => setHairstyle(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border-2 border-border bg-background text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all appearance-none"
                      >
                        <option value="">Select a hairstyle...</option>
                        {allHairstyles.map((style) => (
                          <option key={style.id} value={style.name}>
                            {style.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Date & Time Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-primary flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-accent" />
                          Date
                        </label>
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          min={getMinDate()}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-border bg-background text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-primary flex items-center gap-2">
                          <Clock className="w-4 h-4 text-accent" />
                          Time
                        </label>
                        <select
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-xl border-2 border-border bg-background text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                        >
                          {Array.from({ length: 12 }, (_, i) => {
                            const hour = String(i + 9).padStart(2, "0");
                            const period = i < 4 ? "AM" : "PM";
                            return (
                              <option key={hour} value={`${hour}:00`}>
                                {i + 9}:00 {period}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    {/* Search Button */}
                    <motion.button
                      whileHover={{ scale: canSearch ? 1.02 : 1 }}
                      whileTap={{ scale: canSearch ? 0.98 : 1 }}
                      onClick={handleSearch}
                      disabled={!canSearch}
                      className="w-full bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Search className="w-5 h-5" />
                      {canSearch ? "Find Matching Stylists" : "Fill all fields to search"}
                    </motion.button>

                    {/* No Match Message */}
                    {showNoMatchMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3"
                      >
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-amber-800">No Stylists Found</p>
                          <p className="text-xs text-amber-700 mt-1">
                            No stylists match all your criteria. Try adjusting your date, time, or location.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Loading Step */}
                {(step === "loading" || isSearching) && !selectedStylistForCalendar && (
                  <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <MatchingLoader 
                      variant="magical"
                      subMessage="Finding the best stylists for you..."
                      indeterminate={true}
                    />
                  </motion.div>
                )}

                {/* Results Step */}
                {step === "results" && !selectedStylistForCalendar && (exactMatches.length > 0 || closestMatches.length > 0) && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {/* Exact Matches Section - Direct booking */}
                    {exactMatches.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-4">
                          <CheckCircle className="w-5 h-5 text-accent" />
                          <h3 className="font-serif text-xl font-bold text-primary">Matching Stylists Found</h3>
                          <span className="bg-accent/20 text-accent text-xs px-2 py-1 rounded-full">
                            {exactMatches.length} available
                          </span>
                        </div>
                        <div className="space-y-4">
                          {exactMatches.map((result) => (
                            <StylistMatchCard
                              key={result.stylist.id}
                              stylist={result.stylist}
                              matchedService={result.matchedService}
                              onBookNow={() => handleBookNow(result)}
                              onFindAnother={exactMatches.length > 1 ? () => handleFindAnother(result) : undefined}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Closest Matches Section - Must select date/time */}
                    {closestMatches.length > 0 && (
                      <div className="mt-6">
                        {exactMatches.length === 0 && (
                          <div className="flex items-center gap-2 mb-4">
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                            <h3 className="font-serif text-xl font-bold text-primary">No Exact Match Available</h3>
                          </div>
                        )}
                        <p className="text-sm text-detail mb-4">
                          {exactMatches.length === 0 
                            ? "No exact stylist available at this time. Here are the closest matches. Please select a date and time to check availability:"
                            : "More stylists you might like:"}
                        </p>
                        <div className="space-y-4">
                          {closestMatches.slice(0, 5).map((result) => (
                            <StylistMatchCard
                              key={result.stylist.id}
                              stylist={result.stylist}
                              matchedService={result.matchedService}
                              onSelectDate={() => handleViewCalendar(result.stylist)}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Back to Search */}
                    <button
                      onClick={() => setStep("form")}
                      className="w-full mt-4 py-3 text-sm text-detail hover:text-primary transition-colors"
                    >
                      ← Modify Search Criteria
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MatchModal;