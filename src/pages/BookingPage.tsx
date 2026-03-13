import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { hairstyles, stylists } from "@/data/demo-data";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/useBookingHook";
import { 
  MapPin, ChevronRight, ChevronLeft, Star, Check, Calendar, Clock, 
  LogIn, Send, Sparkles, Shield, DollarSign, Scissors, User, 
  MessageSquare, CreditCard, CheckCircle, AlertCircle, Info, Crown, Zap, Search,
  Clock3, BadgeCheck, Wallet, Heart, CalendarDays, Scissors as ScissorsIcon
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
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState(""); 
  const [selectedStylist, setSelectedStylist] = useState(initStylistId);



  // Set validated instant match values after validation functions defined
  useEffect(() => {
    if (isInstantMatch) {
      if (isValidDate(initDate)) {
        setSelectedDate(initDate);
      } else {
        toast.error("Invalid date from instant match. Please select a new date.");
      }
      setSelectedTime(initTime || "");
    }
  }, []);
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

  // Helper to convert 24-hour format to 12-hour format for display (Instant Match fix)
  const formatTime = (time24h: string): string => {
    if (!time24h || !time24h.includes(':')) return time24h;
    const [hoursStr] = time24h.split(':');
    const hours = parseInt(hoursStr, 10);
    const displayHour = hours % 12 === 0 ? 12 : hours % 12;
    const period = hours >= 12 ? 'PM' : 'AM';
    return `${displayHour.toString().padStart(2, '0')}:00 ${period}`;
  };

  // Validate date format from URL params (Instant Match fix)
  const isValidDate = (dateStr: string): boolean => {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateStr) && !isNaN(new Date(dateStr).getTime());
  };

  // Use validated init values for instant match
  const validatedDate = isInstantMatch && isValidDate(initDate) ? initDate : "";
  const validatedTime = isInstantMatch ? initTime : "";

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
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="absolute inset-0 rounded-3xl border-4 border-accent/20"
                />
                <Send className="w-12 h-12 text-accent" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -top-2 -right-2 w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-xl"
              >
                <CheckCircle className="w-5 h-5 text-primary" />
              </motion.div>
            </div>
            
            <h1 className="font-serif text-3xl font-bold mb-3 text-primary">Request Sent!</h1>
            <p className="text-muted-foreground mb-6 text-lg">
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
                  <span className="text-muted-foreground">Stylist</span>
                  <span className="font-semibold text-primary">{chosenStylist?.name}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/50">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-semibold text-primary">{chosenService?.name || chosenStyle?.name}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/50">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-semibold text-primary">
                    {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { 
                      weekday: "short", 
                      month: "short", 
                      day: "numeric" 
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-border/50">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-semibold text-primary">{formatTime(selectedTime)}</span>
                </div> 
                <div className="flex justify-between items-center pt-2 font-bold text-base">
                  <span className="text-muted-foreground">Estimated Total</span>
                  <span className="text-accent text-xl">${totalAmount}</span>
                </div>
              </div>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
              <Link to="/customer/bookings" className="bg-accent text-primary font-semibold text-sm px-6 py-3 rounded-xl inline-flex items-center justify-center gap-2 hover:bg-accent/90 transition-all shadow-lg hover:shadow-accent/25 group">
                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" /> View My Bookings
              </Link>
              <Link to="/" className="border-2 border-accent/30 text-primary font-semibold text-sm px-6 py-3 rounded-xl inline-flex items-center justify-center gap-2 hover:bg-accent/5 transition-all group">
                <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" /> Browse More Styles
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const actualStep = step - getInitialStep();

  return (
    <div className="py-16 md:py-20 bg-gradient-to-b from-background to-secondary/10 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header with Booking Type Badge - Premium redesign */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm text-accent text-xs font-medium px-5 py-2.5 rounded-full mb-4 border border-accent/20 shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span className="capitalize">{bookingType.replace('-', ' ')} Booking</span>
            <span className="w-1 h-1 rounded-full bg-accent/50" />
            <span>Step {actualStep + 1} of {totalSteps}</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
            {currentStepTitle}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {bookingType === 'instant-match' && "Review your instant match details before sending your request"}
            {bookingType === 'stylist' && "Complete your booking with your selected stylist"}
            {bookingType === 'hairstyle' && "Find the perfect stylist for your chosen hairstyle"}
            {bookingType === 'location' && "Discover talented braiders in your area"}
          </p>
        </motion.div>

        {/* Progress Bar - Premium redesign */}
        <div className="relative mb-12">
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-accent to-accent/80"
              initial={{ width: 0 }}
              animate={{ width: `${((actualStep + 1) / totalSteps) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          
          {/* Step Indicators */}
          <div className="flex justify-between mt-4 px-2">
            {stepTitles.map((title, index) => (
              <div key={index} className="text-center">
                <div className={`text-xs font-medium transition-colors ${
                  index <= actualStep ? 'text-accent' : 'text-muted-foreground'
                }`}>
                  Step {index + 1}
                </div>
                <div className={`hidden sm:block text-xs font-medium mt-1 max-w-[100px] truncate ${
                  index <= actualStep ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {title}
                </div>
                <div className={`w-2 h-2 rounded-full mt-2 mx-auto transition-all ${
                  index < actualStep ? 'bg-accent' : 
                  index === actualStep ? 'bg-accent ring-4 ring-accent/20 animate-pulse' : 
                  'bg-muted'
                }`} />
              </div>
            ))}
          </div>
        </div>

        {/* Main Card - Premium redesign */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-card rounded-3xl p-6 md:p-8 lg:p-10 border border-border/50 shadow-2xl hover:shadow-3xl transition-shadow"
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={step} 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -30 }} 
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            >
              
              {/* Step 0: Location - Premium redesign */}
              {step === 0 && bookingType === 'location' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl md:text-2xl font-semibold text-primary">Where are you located?</h2>
                      <p className="text-sm text-muted-foreground">Enter your postal code to find stylists near you</p>
                    </div>
                  </div>
                  
                  <div className="max-w-md mx-auto">
                    <div className="flex items-center gap-3">
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="px-4 py-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23b87a5d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundSize: '1rem', backgroundRepeat: 'no-repeat' }}
                      >
                        <option value="UK">UK</option>
                        <option value="US">US</option>
                      </select>
                      <div className="relative group flex-1">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-accent/70 group-focus-within:text-accent transition-colors" />
                        <input 
                          type="text" 
                          value={postalCode} 
                          onChange={(e) => setPostalCode(e.target.value)} 
                          placeholder={country === 'US' ? 'Enter 5-digit zip code' : 'Enter UK postcode'}
                          className="w-full pl-12 pr-4 py-4 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50"
                          autoFocus
                        />
                      </div>
                    </div>
                    {postalCode && !(country === 'US' ? /^\d{5}$/.test(postalCode) : /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}$/i.test(postalCode)) && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-destructive mt-3 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" /> {`Please enter a valid ${country === 'US' ? '5-digit US zip code' : 'UK postcode'}.`}
                      </motion.p>
                    )}
                    <p className="text-xs text-muted-foreground mt-3">
                      {country === 'US'
                        ? "US zip codes should be 5 digits (e.g., 90210)."
                        : "UK postcodes are alphanumeric (e.g., SW1A 0AA)."}
                    </p>
                  </div>
                  
                  <div className="bg-accent/5 rounded-xl p-5 mt-4 border border-accent/10">
                    <p className="text-sm text-muted-foreground flex items-start gap-3">
                      <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <span>Your postal code helps us find stylists in your area. We respect your privacy and never share your location.</span>
                    </p>
                  </div>

                  {/* Smart Match Button - Premium redesign */}
                  {postalCode && (country === 'US' ? /^\d{5}$/.test(postalCode) : /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}$/i.test(postalCode)) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-8 p-6 border-2 border-accent/30 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/0 shadow-lg"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                          <Zap className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-primary text-base">Try Smart Match</h3>
                          <p className="text-sm text-muted-foreground mt-1">We'll find stylists based on your preferences</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsMatchModalOpen(true)}
                        className="w-full bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                      >
                        <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Instant Match
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 1: Choose Hairstyle - Premium redesign */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                      <Scissors className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl md:text-2xl font-semibold text-primary">Choose Your Hairstyle</h2>
                      <p className="text-sm text-muted-foreground">Select from our premium braiding styles</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {hairstyles.map((style, i) => (
                      <motion.button
                        key={style.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`group text-left rounded-xl overflow-hidden border-2 transition-all duration-300 hover:shadow-xl ${
                          selectedStyle === style.id 
                            ? "border-accent ring-4 ring-accent/20 shadow-xl" 
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
                            <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-accent flex items-center justify-center shadow-lg">
                              <Check className="w-4 h-4 text-primary" />
                            </div>
                          )}
                          <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                            ${style.avgPrice}
                          </div>
                        </div>
                        <div className="p-3">
                          <p className="font-serif font-semibold text-primary">{style.name}</p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {style.duration}
                            </p>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Smart Match Button - Premium redesign */}
                  {selectedStyle && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-8 p-6 border-2 border-accent/30 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/0 shadow-lg"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                          <Search className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-primary text-base">Find Available Stylists</h3>
                          <p className="text-sm text-muted-foreground mt-1">See who's available for {hairstyles.find(h => h.id === selectedStyle)?.name}</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsMatchModalOpen(true)}
                        className="w-full bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                      >
                        <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Find Matching Stylists
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Step 2: Select Date & Time - Premium redesign */}
              {step === 2 && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                      <CalendarDays className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl md:text-2xl font-semibold text-primary">Select Date & Time</h2>
                      <p className="text-sm text-muted-foreground">Choose when you'd like your appointment</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-4 flex text-primary items-center gap-2">
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
                            className={`p-4 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
                              isSelected 
                                ? "bg-accent text-primary border-accent shadow-lg" 
                                : "border-border hover:border-accent/30 hover:bg-accent/5"
                            }`}
                          >
                            <div className="text-xs opacity-70 mb-1">{dateObj.toLocaleDateString("en-US", { weekday: "short" })}</div>
                            <div className="font-bold text-lg">{dateObj.getDate()}</div>
                            <div className="text-xs">{dateObj.toLocaleDateString("en-US", { month: "short" })}</div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-4 flex text-primary items-center gap-2">
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
                          className={`p-4 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${
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

                  {/* Smart Match Button - Premium redesign */}
                  {selectedDate && selectedTime && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mt-8 p-6 border-2 border-accent/30 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/0 shadow-lg"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                          <Search className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-primary text-base">Find Available Stylists</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            See who's available on {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { 
                              weekday: "short", 
                              month: "short", 
                              day: "numeric" 
                            })} at {selectedTime}
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsMatchModalOpen(true)}
                        className="w-full bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold py-4 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                      >
                        <Zap className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        Find Matching Stylists Now
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              )}
              
              {/* Step 3: Choose Stylist - Premium redesign */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                      <User className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl md:text-2xl font-semibold text-primary">Choose Your Stylist</h2>
                      <p className="text-sm text-muted-foreground">Select from our expert braiders</p>
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
                        className={`w-full text-left flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-xl ${
                          selectedStylist === s.id 
                            ? "border-accent bg-accent/5 shadow-xl" 
                            : "border-border hover:border-accent/30 hover:bg-muted/30"
                        }`}
                      >
                        <div className="relative">
                          <img src={s.photo} alt={s.name} className="w-16 h-16 rounded-xl object-cover" />
                          {s.featured && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center shadow-lg">
                              <Crown className="w-3 h-3 text-primary" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-serif font-semibold text-primary text-lg">{s.name}</p>
                            {s.rating >= 4.9 && (
                              <BadgeCheck className="w-4 h-4 text-accent" />
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-accent text-accent" /> {s.rating} ({s.reviewCount})
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" /> {s.location}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {s.specialties.slice(0, 3).map(sp => (
                              <span key={sp} className="text-xs bg-accent/10 text-muted-foreground px-2 py-1 rounded-full border border-accent/20">
                                {sp}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary text-2xl">${Math.min(...s.services.map((sv) => sv.price))}</p>
                          <p className="text-xs text-muted-foreground">starting from</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Select Service - Premium redesign */}
              {step === 4 && chosenStylist && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                      <Wallet className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl md:text-2xl font-semibold text-primary">Select a Service</h2>
                      <p className="text-sm text-muted-foreground">Choose from {chosenStylist.name}'s services</p>
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
                        className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-xl ${
                          selectedServiceId === sv.id 
                            ? "border-accent bg-accent/5 shadow-xl" 
                            : "border-border hover:border-accent/30 hover:bg-muted/30"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-serif font-semibold text-primary text-lg">{sv.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">{sv.description}</p>
                            <div className="flex items-center gap-3 mt-3">
                              <span className="text-xs bg-accent/10 text-muted-foreground px-3 py-1.5 rounded-full flex items-center gap-1 border border-accent/20">
                                <Clock className="w-3 h-3 text-accent" /> {sv.duration}
                              </span>
                              {sv.name === chosenStyle?.name && (
                                <span className="text-xs bg-accent text-primary px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                                  <Check className="w-3 h-3" /> Recommended
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <p className="font-bold text-primary text-3xl">${sv.price}</p>
                            {selectedServiceId === sv.id && (
                              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center mt-2 ml-auto">
                                <Check className="w-4 h-4 text-primary" />
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Review & Request - Premium redesign */}
              {step === 5 && (
                <div className="space-y-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl md:text-2xl font-semibold text-primary">Review Your Request</h2>
                      <p className="text-sm text-muted-foreground">Confirm all details before sending</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Booking Details - Premium */}
                    <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl p-6 border border-border/50">
                      <h3 className="font-serif font-semibold text-primary flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                          <Calendar className="w-3.5 h-3.5 text-accent" />
                        </div>
                        Appointment Details
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center pb-2 border-b border-border/50">
                          <span className="text-muted-foreground">Stylist</span>
                          <span className="font-semibold text-primary">{chosenStylist?.name}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-border/50">
                          <span className="text-muted-foreground">Service</span>
                          <span className="font-semibold text-primary">{chosenService?.name || chosenStyle?.name}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-border/50">
                          <span className="text-muted-foreground">Date</span>
                          <span className="font-semibold text-primary">
                            {selectedDate && new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { 
                              weekday: "short", 
                              month: "short", 
                              day: "numeric" 
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Time</span>
                          <span className="font-semibold text-primary">{formatTime(selectedTime)}</span>
                </div> 
                      </div>
                    </div>
                    
                    {/* Price Breakdown - Premium */}
                    <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl p-6 border border-border/50">
                      <h3 className="font-serif font-semibold text-primary flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                          <DollarSign className="w-3.5 h-3.5 text-accent" />
                        </div>
                        Price Breakdown
                      </h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Service Price</span>
                          <span className="font-medium text-primary">${servicePrice}</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-border font-bold text-base">
                          <span className="text-muted-foreground">Total</span>
                          <span className="text-accent text-2xl">${totalAmount}</span>
                        </div>
                        <p className="text-xs text-muted-foreground italic mt-2">
                          * Exact stylist price. No platform commission added.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Notes - Premium */}
                  <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl p-6 border border-border/50">
                    <label className="text-sm font-medium mb-3 flex text-primary items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                        <MessageSquare className="w-3.5 h-3.5 text-accent" />
                      </div>
                      Optional Notes for Stylist
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50"
                      placeholder="e.g., 'My hair is color-treated', 'Please use a gentle touch on my scalp', etc."
                      rows={3}
                    />
                  </div>
                  
                  {/* Terms Agreement - Premium */}
                  <div className="flex items-start gap-4 bg-accent/5 rounded-xl p-5 border border-accent/10">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1 w-5 h-5 rounded border-border text-accent focus:ring-accent/20 focus:ring-2"
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the <Link to="/terms-of-service" className="text-accent font-semibold hover:underline">Terms of Service</Link> and 
                      understand that this is a booking request. The stylist will confirm availability before finalizing.
                    </label>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons - Premium redesign */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
            <motion.button 
              whileHover={{ x: -5 }}
              onClick={() => setStep(Math.max(getInitialStep(), step - 1))} 
              disabled={step === getInitialStep()} 
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
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
                className="bg-accent text-primary font-semibold flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-accent/25 transition-all group"
              >
                Continue <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRequestAppointment}
                disabled={!agreedToTerms}
                className="bg-accent text-primary font-semibold text-sm flex items-center gap-2 px-8 py-3 rounded-xl shadow-lg hover:shadow-accent/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <Send className="w-4 h-4 group-hover:scale-110 transition-transform" /> Send Booking Request
              </motion.button>
            )}
          </div>
        </motion.div>
        
        {/* Trust Message - Premium redesign */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-muted-foreground mt-8 flex items-center justify-center gap-2"
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