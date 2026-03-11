import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { hairstyles, stylists } from "@/data/demo-data";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/useBookingHook";
import { 
  MapPin, ChevronRight, ChevronLeft, Star, Check, Calendar, Clock, 
  LogIn, Send, Sparkles, Shield, DollarSign, Scissors, User, 
  MessageSquare, CreditCard, CheckCircle, AlertCircle, Info, Crown, Zap, Search
} from "lucide-react";
import { toast } from "sonner";
import MatchModal from "@/components/smart-match/MatchModal";

const BookingPage = () => {
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { createBooking } = useBooking();

  const initPostal = params.get("postal") || user?.postalCode || "";
  const initStyleId = params.get("style") || "";
  const initStylistId = params.get("stylist") || "";
  const initDate = params.get("date") || "";
  const initTime = params.get("time") || "";
  const isInstantMatch = params.get("isInstantMatch") === "true";

  const getBookingType = () => {
    if (isInstantMatch) return 'instant-match';
    if (initStylistId) return 'stylist';
    if (initStyleId) return 'hairstyle';
    return 'location';
  };

  const bookingType = getBookingType();

  const getInitialStep = () => {
    switch (bookingType) {
      case 'instant-match': return 5; // Skip directly to review/invoice step
      case 'stylist': return 2;
      case 'hairstyle': return 1;
      default: return 0;
    }
  }

  const [step, setStep] = useState(getInitialStep());
  const [postalCode, setPostalCode] = useState(initPostal);
  const [country, setCountry] = useState("UK");
  const [selectedStyle, setSelectedStyle] = useState(initStyleId);
  const [selectedDate, setSelectedDate] = useState(isInstantMatch ? initDate : "");
  const [selectedTime, setSelectedTime] = useState(isInstantMatch ? initTime : "");
  const [selectedStylist, setSelectedStylist] = useState(initStylistId);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [notes, setNotes] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);

  const times = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i + 1);
    return d.toISOString().split("T")[0];
  });

  const matchedStylists = stylists.filter((s) => {
    if (bookingType === 'stylist') return s.id === initStylistId;
    if (selectedStyle) return s.specialties.some((sp) => hairstyles.find((h) => h.id === selectedStyle)?.name === sp);
    return true;
  });

  const chosenStylist = stylists.find((s) => s.id === selectedStylist);
  const chosenStyle = hairstyles.find((h) => h.id === selectedStyle);
  const chosenService = chosenStylist?.services.find((sv) => sv.id === selectedServiceId) ||
    chosenStylist?.services.find((sv) => sv.name === chosenStyle?.name) ||
    (chosenStylist?.services[0] || null);

  const servicePrice = chosenService?.price || chosenStyle?.avgPrice || 0;
  const totalAmount = servicePrice;

  const stepTitles = bookingType === 'instant-match'
    ? ["Review & Confirm Booking"]
    : bookingType === 'stylist'
      ? ["Select Date & Time", "Select Service", "Review & Request"]
      : bookingType === 'hairstyle'
        ? ["Choose Hairstyle", "Select Date & Time", "Choose Stylist", "Select Service", "Review & Request"]
        : ["Enter Location", "Choose Hairstyle", "Select Date & Time", "Choose Stylist", "Select Service", "Review & Request"];
  const totalSteps = stepTitles.length;

  const currentStepTitle = stepTitles[step - getInitialStep()] || stepTitles[0];

  // Check if we can use the smart match feature
  const canUseSmartMatch = postalCode && selectedStyle && selectedDate && selectedTime && (bookingType === 'location' || bookingType === 'hairstyle');

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info("Please log in as a customer to book an appointment.");
      navigate("/login", { state: { from: location }, replace: true });
    } else if (user?.role !== 'customer') {
      toast.error("Only customers can book appointments.");
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  // Auto-select service for instant match
  useEffect(() => {
    if (isInstantMatch && selectedStyle && chosenStylist && !selectedServiceId) {
      const matchingService = chosenStylist.services.find((sv) => sv.name === chosenStyle?.name);
      if (matchingService) {
        setSelectedServiceId(matchingService.id);
      } else if (chosenStylist.services.length > 0) {
        setSelectedServiceId(chosenStylist.services[0].id);
      }
    }
  }, [isInstantMatch, selectedStyle, chosenStylist, chosenStyle, selectedServiceId]);

  // Helper to convert 12-hour format to 24-hour format for matching
  const convertTo24Hour = (time12h: string): string => {
    if (!time12h) return "";
    const [time, period] = time12h.split(' ');
    if (!time || !period) return time12h;
    const [hours] = time.split(':');
    let hour = parseInt(hours, 10);
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;
    return `${hour.toString().padStart(2, '0')}:00`;
  };

  // Handle stylist selection from MatchModal
  const handleStylistSelectedFromModal = (stylistId: string, serviceName: string, servicePrice: number) => {
    setSelectedStylist(stylistId);
    
    // Find the service that matches
    const stylist = stylists.find(s => s.id === stylistId);
    if (stylist) {
      const service = stylist.services.find(s => s.name === serviceName);
      if (service) {
        setSelectedServiceId(service.id);
      } else if (stylist.services.length > 0) {
        setSelectedServiceId(stylist.services[0].id);
      }
    }
    
    // Navigate to service selection step
    if (bookingType === 'location' || bookingType === 'hairstyle') {
      setStep(4); // Go to select service step
    }
    
    toast.success(`Selected ${stylist?.name}! Please review and confirm your booking.`);
  };

  const handleRequestAppointment = () => {
    if (!user || !chosenStylist || !chosenService || !selectedDate || !selectedTime) {
      toast.error("Your booking details are incomplete. Please review your selections.");
      return;
    }

    if (!agreedToTerms) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }

    const success = createBooking({
      customerId: user.id,
      customerName: user.name,
      stylistId: chosenStylist.id,
      stylistName: chosenStylist.name,
      service: chosenService.name,
      date: selectedDate,
      time: selectedTime,
      price: totalAmount,
      notes,
      bookingType: bookingType as "instant-match" | "stylist" | "hairstyle" | "location",
      searchCriteria: isInstantMatch && chosenStyle ? {
        hairstyle: chosenStyle.name,
        minPrice: Math.min(...chosenStylist.services.map(s => s.price)),
        maxPrice: Math.max(...chosenStylist.services.map(s => s.price)),
      } : undefined,
    });

    if (success) {
      setConfirmed(true);
    } else {
      toast.error("There was an issue sending your booking request. Please try again.");
    }
  };

  if (!isAuthenticated || user?.role !== 'customer') {
    return <div className="h-screen"></div>; // Render empty while redirecting
  }

  if (confirmed) {
    return (
      <div className="py-20 bg-gradient-to-b from-background to-secondary/20 min-h-screen">
        <div className="container mx-auto px-4 text-center max-w-md">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center mx-auto relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="absolute inset-0 rounded-full border-4 border-accent/30"
                />
                <Send className="w-10 h-10 text-accent" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute -top-2 -right-2 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-xl"
              >
                <CheckCircle className="w-6 h-6 text-primary" />
              </motion.div>
            </div>
            
            <h1 className="font-serif text-3xl font-bold mb-3 text-primary">Request Sent!</h1>
            <p className="text-detail mb-6 font-brand">
              Your booking request has been sent to {chosenStylist?.name}. You'll be notified once they approve it.
            </p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-2xl p-6 border border-border/50 shadow-xl text-left mb-6"
            >
              <h3 className="font-serif font-semibold text-primary mb-4 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                Booking Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-border/50">
                  <span className="text-detail">Stylist</span>
                  <span className="font-semibold text-primary">{chosenStylist?.name}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/50">
                  <span className="text-detail">Service</span>
                  <span className="font-semibold text-primary">{chosenService?.name || chosenStyle?.name}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/50">
                  <span className="text-detail">Date</span>
                  <span className="font-semibold text-primary">
                    {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { 
                      weekday: "short", 
                      month: "short", 
                      day: "numeric" 
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/50">
                  <span className="text-detail">Time</span>
                  <span className="font-semibold text-primary">{selectedTime}</span>
                </div>
                <div className="flex justify-between items-center pt-2 font-bold text-base">
                  <span className="text-detail">Estimated Total</span>
                  <span className="text-accent text-xl">${totalAmount}</span>
                </div>
              </div>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
              <Link to="/customer/bookings" className="btn-primary text-sm px-6 py-3 rounded-xl inline-flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" /> View My Bookings
              </Link>
              <Link to="/" className="btn-cta text-sm px-6 py-3 rounded-xl inline-flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" /> Browse More Styles
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const actualStep = step - getInitialStep();

  return (
    <div className="py-12 bg-gradient-to-b from-background to-secondary/10 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header with Booking Type Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm text-accent text-xs font-medium px-5 py-2.5 rounded-full mb-4 border border-accent/30">
            <Sparkles className="w-4 h-4" />
            <span className="capitalize">{bookingType.replace('-', ' ')} Booking</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
            <span>Step {actualStep + 1} of {totalSteps}</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-3">
            {currentStepTitle}
          </h1>
          <p className="text-detail max-w-xl mx-auto font-brand">
            {bookingType === 'instant-match' && "Review your instant match details before sending your request"}
            {bookingType === 'stylist' && "Complete your booking with your selected stylist"}
            {bookingType === 'hairstyle' && "Find the perfect stylist for your chosen hairstyle"}
            {bookingType === 'location' && "Discover talented braiders in your area"}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="relative mb-10">
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-3 rounded-full bg-gradient-to-r from-accent to-cta"
              initial={{ width: 0 }}
              animate={{ width: `${((actualStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          
          {/* Step Indicators */}
          <div className="flex justify-between mt-2 px-2">
            {stepTitles.map((title, index) => (
              <div key={index} className="text-center">
                <div className={`text-xs font-medium ${index <= actualStep ? 'text-accent' : 'text-detail'}`}>
                  Step {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-3xl p-6 md:p-8 border border-border/50 shadow-2xl"
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={step} 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -30 }} 
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            >
              
              {/* Step 0: Location */}
              {step === 0 && bookingType === 'location' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-semibold text-primary">Where are you located?</h2>
                      <p className="text-sm text-detail">Enter your postal code to find stylists near you</p>
                    </div>
                  </div>
                  
                  <div className="max-w-md mx-auto">
                    <div className="flex items-center gap-2">
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="px-4 py-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                      >
                        <option value="UK">UK</option>
                        <option value="US">US</option>
                      </select>
                      <div className="relative group flex-1">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent group-focus-within:scale-110 transition-transform" />
                        <input 
                          type="text" 
                          value={postalCode} 
                          onChange={(e) => setPostalCode(e.target.value)} 
                          placeholder={country === 'US' ? 'Enter 5-digit zip code' : 'Enter UK postcode'}
                          className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                          autoFocus
                        />
                      </div>
                    </div>
                    {postalCode && !(country === 'US' ? /^\d{5}$/.test(postalCode) : /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}$/i.test(postalCode)) && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-destructive mt-2 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" /> {`Please enter a valid ${country === 'US' ? '5-digit US zip code' : 'UK postcode'}.`}
                      </motion.p>
                    )}
                    <p className="text-xs text-detail mt-2">
                      {country === 'US'
                        ? "US zip codes should be 5 digits (e.g., 90210)."
                        : "UK postcodes are alphanumeric (e.g., SW1A 0AA)."}
                    </p>
                  </div>
                  
                  <div className="bg-accent/5 rounded-xl p-4 mt-4">
                    <p className="text-xs text-detail flex items-start gap-2">
                      <Info className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span>Your postal code helps us find stylists in your area. We respect your privacy and never share your location.</span>
                    </p>
                  </div>

                  {/* Smart Match Button - Shows after entering postal code */}
                  {postalCode && (country === 'US' ? /^\d{5}$/.test(postalCode) : /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}$/i.test(postalCode)) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-6 p-5 border-2 border-accent/30 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Zap className="w-4 h-4 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-primary text-sm">Try Smart Match</h3>
                          <p className="text-xs text-detail mt-0.5">AI-powered stylist recommendations based on your preferences</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsMatchModalOpen(true)}
                        className="w-full bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Search className="w-4 h-4" />
                        Find My Perfect Stylist
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 1: Choose Hairstyle */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Scissors className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-semibold text-primary">Choose Your Hairstyle</h2>
                      <p className="text-sm text-detail">Select from our premium braiding styles</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {hairstyles.map((style, i) => (
                      <motion.button
                        key={style.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`group text-left rounded-xl overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${
                          selectedStyle === style.id 
                            ? "border-accent ring-4 ring-accent/20" 
                            : "border-transparent hover:border-accent/30"
                        }`}
                      >
                        <div className="aspect-square relative overflow-hidden">
                          <img 
                            src={style.image} 
                            alt={style.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                            loading="lazy" 
                          />
                          {selectedStyle === style.id && (
                            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                              <Check className="w-4 h-4 text-primary" />
                            </div>
                          )}
                        </div>
                        <div className="p-3">
                          <p className="font-serif font-semibold text-primary">{style.name}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-accent font-bold">${style.avgPrice}</p>
                            <p className="text-xs text-detail">{style.duration}</p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Smart Match Button - Shows after selecting hairstyle */}
                  {selectedStyle && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-6 p-5 border-2 border-accent/30 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Zap className="w-4 h-4 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-primary text-sm">Find Available Stylists</h3>
                          <p className="text-xs text-detail mt-0.5">See who&apos;s available for {hairstyles.find(h => h.id === selectedStyle)?.name}</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsMatchModalOpen(true)}
                        className="w-full bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Search className="w-4 h-4" />
                        Find Matching Stylists
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 2: Select Date & Time */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-semibold text-primary">Select Date & Time</h2>
                      <p className="text-sm text-detail">Choose when you&apos;d like your appointment</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-3 flex text-primary items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" /> 
                      Available Dates
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {dates.map((d) => {
                        const dateObj = new Date(d + "T00:00:00");
                        const isSelected = selectedDate === d;
                        return (
                          <motion.button 
                            key={d} 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedDate(d)} 
                            className={`p-3 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                              isSelected 
                                ? "bg-accent text-primary border-accent shadow-lg" 
                                : "border-border hover:border-accent/30 hover:bg-accent/5"
                            }`}
                          >
                            <div className="text-xs opacity-70">{dateObj.toLocaleDateString("en-US", { weekday: "short" })}</div>
                            <div className="font-bold">{dateObj.getDate()}</div>
                            <div className="text-xs">{dateObj.toLocaleDateString("en-US", { month: "short" })}</div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-3 flex text-primary items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" /> 
                      Available Times
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {times.map((t) => (
                        <motion.button 
                          key={t} 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedTime(t)} 
                          className={`p-3 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                            selectedTime === t 
                              ? "bg-accent text-primary border-accent shadow-lg" 
                              : "border-border hover:border-accent/30 hover:bg-accent/5"
                          }`}
                        >
                          {t}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Smart Match Button - Shows after selecting date and time */}
                  {selectedDate && selectedTime && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-6 p-5 border-2 border-accent/30 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Search className="w-4 h-4 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-primary text-sm">Find Available Stylists</h3>
                          <p className="text-xs text-detail mt-0.5">See who&apos;s available on {selectedDate} at {selectedTime}</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsMatchModalOpen(true)}
                        className="w-full bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold py-3 rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Zap className="w-4 h-4" />
                        Find Matching Stylists Now
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              )}
              
              {/* Step 3: Choose Stylist */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-semibold text-primary">Choose Your Stylist</h2>
                      <p className="text-sm text-detail">Select from our expert braiders</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {matchedStylists.map((s, i) => (
                      <motion.button
                        key={s.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => { setSelectedStylist(s.id); setSelectedServiceId(""); }}
                        className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                          selectedStylist === s.id 
                            ? "border-accent bg-accent/5 shadow-xl" 
                            : "border-border hover:border-accent/30 hover:bg-muted/30"
                        }`}
                      >
                        <div className="relative">
                          <img src={s.photo} alt={s.name} className="w-16 h-16 rounded-xl object-cover" />
                          {s.featured && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                              <Crown className="w-3 h-3 text-primary" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-serif font-semibold text-primary">{s.name}</p>
                          <div className="flex items-center gap-3 text-sm text-detail mt-1">
                            <span className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-accent text-accent" /> {s.rating}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" /> {s.location}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {s.specialties.slice(0, 2).map(sp => (
                              <span key={sp} className="text-xs bg-accent/10 text-detail px-2 py-0.5 rounded-full">
                                {sp}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary text-lg">${Math.min(...s.services.map((sv) => sv.price))}</p>
                          <p className="text-xs text-detail">starting from</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Select Service */}
              {step === 4 && chosenStylist && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-semibold text-primary">Select a Service</h2>
                      <p className="text-sm text-detail">Choose from {chosenStylist.name}&apos;s services</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {chosenStylist.services.map((sv, i) => (
                      <motion.button
                        key={sv.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setSelectedServiceId(sv.id)}
                        className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                          selectedServiceId === sv.id 
                            ? "border-accent bg-accent/5 shadow-xl" 
                            : "border-border hover:border-accent/30 hover:bg-muted/30"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-serif font-semibold text-primary text-lg">{sv.name}</p>
                            <p className="text-sm text-detail mt-1">{sv.description}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs bg-accent/10 text-detail px-2 py-1 rounded-full flex items-center gap-1">
                                <Clock className="w-3 h-3 text-accent" /> {sv.duration}
                              </span>
                              {sv.name === chosenStyle?.name && (
                                <span className="text-xs bg-accent text-primary px-2 py-1 rounded-full flex items-center gap-1">
                                  <Check className="w-3 h-3" /> Recommended for you
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary text-2xl">${sv.price}</p>
                            {selectedServiceId === sv.id && (
                              <Check className="w-5 h-5 text-accent mt-1" />
                            )}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Review & Request */}
              {step === 5 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-semibold text-primary">Review Your Request</h2>
                      <p className="text-sm text-detail">Confirm all details before sending</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Booking Details */}
                    <div className="bg-muted/30 rounded-xl p-5 space-y-4">
                      <h3 className="font-serif font-semibold text-primary flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-accent" />
                        Appointment Details
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center pb-2 border-b border-border/50">
                          <span className="text-detail">Stylist</span>
                          <span className="font-semibold text-primary">{chosenStylist?.name}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-border/50">
                          <span className="text-detail">Service</span>
                          <span className="font-semibold text-primary">{chosenService?.name || chosenStyle?.name}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-border/50">
                          <span className="text-detail">Date</span>
                          <span className="font-semibold text-primary">
                            {selectedDate && new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { 
                              weekday: "short", 
                              month: "short", 
                              day: "numeric" 
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-border/50">
                          <span className="text-detail">Time</span>
                          <span className="font-semibold text-primary">{selectedTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price Breakdown */}
                    <div className="bg-muted/30 rounded-xl p-5 space-y-4">
                      <h3 className="font-serif font-semibold text-primary flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-accent" />
                        Price Breakdown
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-detail">Service Price</span>
                          <span className="font-medium">${servicePrice}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-border font-bold text-base">
                          <span className="text-detail">Total</span>
                          <span className="text-accent text-xl">${totalAmount}</span>
                        </div>
                        <p className="text-xs text-detail italic">
                          * This is the exact stylist price. No platform commission added.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Notes */}
                  <div className="bg-muted/30 rounded-xl p-5">
                    <label className="text-sm font-medium mb-2 flex text-primary items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-accent" />
                      Optional Notes for Stylist
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                      placeholder="e.g., 'My hair is color-treated', 'Please use a gentle touch on my scalp', etc."
                      rows={3}
                    />
                  </div>
                  
                  {/* Terms Agreement */}
                  <div className="flex items-start gap-3 bg-accent/5 rounded-xl p-4">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded border-border text-accent focus:ring-accent"
                    />
                    <label htmlFor="terms" className="text-sm text-detail">
                      I agree to the <Link to="/terms-of-service" className="text-accent font-semibold hover:underline">Terms of Service</Link> and 
                      understand that this is a booking request. The stylist will confirm availability before finalizing.
                    </label>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <motion.button 
              whileHover={{ x: -5 }}
              onClick={() => setStep(Math.max(getInitialStep(), step - 1))} 
              disabled={step === getInitialStep()} 
              className="flex items-center gap-2 text-sm font-medium text-detail hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </motion.button>
            
            {step < 5 ? (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(step + 1)} 
                disabled={
                  (step === 0 && !(country === 'US' ? /^\d{5}$/.test(postalCode) : /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}$/i.test(postalCode))) ||
                  (step === 1 && !selectedStyle) ||
                  (step === 2 && (!selectedDate || !selectedTime)) ||
                  (step === 3 && !selectedStylist) ||
                  (step === 4 && !selectedServiceId)
                }
                className="btn-primary flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRequestAppointment}
                disabled={!agreedToTerms}
                className="btn-cta text-sm flex items-center gap-2 px-8 py-3 rounded-xl shadow-lg hover:shadow-accent/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" /> Send Booking Request
              </motion.button>
            )}
          </div>
        </motion.div>
        
        {/* Trust Message */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-detail mt-6 flex items-center justify-center gap-2"
        >
          <Shield className="w-3 h-3 text-accent" />
          Your information is secure. No payment required until stylist confirms.
        </motion.p>

        {/* Smart Match Modal */}
        <MatchModal 
          isOpen={isMatchModalOpen}
          onClose={() => setIsMatchModalOpen(false)}
          customerPostalCode={postalCode}
          preSelectedHairstyle={selectedStyle ? hairstyles.find(h => h.id === selectedStyle)?.name || "" : ""}
          preSelectedDate={selectedDate}
          preSelectedTime={convertTo24Hour(selectedTime)}
          onStylistSelected={handleStylistSelectedFromModal}
        />
      </div>
    </div>
  );
};

export default BookingPage;

