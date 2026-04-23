import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/useBookingHook';
import { toast } from 'sonner';
import {
  AIUploadSection,
  AIProcessingLoader,
  AISuggestionCard,
  AIAutoMatchLoader,
  AutoMatchedStylistCard,
  SelectedAIStyleDetails,
} from '@/components/ai-recommendation';
import { stylists, Booking } from '@/data/demo-data';
import { Stylist } from '@/data/demo-data';
import { mockStyleSuggestion, mockHealthReport } from '@/data/ai-data';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, Calendar, Clock, CalendarDays, MapPin, 
  Sparkles, ArrowLeft, Shield, Award, Scissors, Star,
  ChevronRight, Loader2, Zap, Heart, RefreshCw
} from 'lucide-react';
import { Input } from '@/components/ui/input';

type FlowState = 'upload' | 'processing' | 'suggestion' | 'zip-code' | 'date-selection' | 'matching' | 'matched' | 'confirmed';

interface ManuallySelectedStylist {
  id: string;
  name: string;
  photo: string;
  rating: number;
  reviewCount: number;
  location: string;
  isManuallySelected: true;
}

const AIRecommendationPage = () => {
  const loadSavedState = () => {
    try {
      const saved = sessionStorage.getItem('aiRecommendationState');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  const loadSelectedStylist = (): ManuallySelectedStylist | null => {
    try {
      const saved = sessionStorage.getItem('selectedStylist');
      if (saved) {
        const stylist = JSON.parse(saved);
        sessionStorage.removeItem('selectedStylist');
        return stylist;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  const savedState = loadSavedState();
  const manualStylist = loadSelectedStylist();

  const getInitialFlowState = (): FlowState => {
    if (savedState?.flowState && savedState.frontImage) {
      return savedState.flowState;
    }
    if (manualStylist && savedState?.frontImage) {
      return savedState.flowState || 'suggestion';
    }
    return 'upload';
  };

  const [flowState, setFlowState] = useState<FlowState>(getInitialFlowState());
  const [matchedStylist, setMatchedStylist] = useState<Stylist | null>(savedState?.matchedStylist || null);
  const [frontImage, setFrontImage] = useState<string | null>(savedState?.frontImage || null);
  const [backImage, setBackImage] = useState<string | null>(savedState?.backImage || null);
  const [selectedDate, setSelectedDate] = useState<string>(savedState?.selectedDate || '');
  const [selectedTime, setSelectedTime] = useState<string>(savedState?.selectedTime || '');
  const [zipCode, setZipCode] = useState<string>(savedState?.zipCode || '');
  const [rejectedStylistIds, setRejectedStylistIds] = useState<Set<string>>(
    savedState?.rejectedStylistIds ? new Set(savedState.rejectedStylistIds) : new Set()
  );
  const [isManualStylistSelected, setIsManualStylistSelected] = useState(!!manualStylist);
  const [isNavigatingBack, setIsNavigatingBack] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { createBooking } = useBooking();

  useEffect(() => {
    if (manualStylist && !matchedStylist) {
      const fullStylist = stylists.find(s => s.id === manualStylist.id);
      if (fullStylist) {
        setMatchedStylist(fullStylist);
      }
    }
  }, [manualStylist, matchedStylist]);

  const generateAvailableDates = () => {
    if (isManualStylistSelected && matchedStylist?.availability) {
      const availableDays = Object.keys(matchedStylist.availability);
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const result: string[] = [];
      const today = new Date();
      for (let i = 1; i <= 30 && result.length < 14; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const dayName = dayNames[d.getDay()];
        if (availableDays.includes(dayName)) {
          result.push(d.toISOString().split("T")[0]);
        }
      }
      return result;
    }
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(); d.setDate(d.getDate() + i + 1);
      return d.toISOString().split("T")[0];
    });
  };

  const generateAvailableTimes = () => {
    if (isManualStylistSelected && matchedStylist?.availability && selectedDate) {
      const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dateObj = new Date(selectedDate + "T00:00:00");
      const dayName = dayNames[dateObj.getDay()];
      const daySchedule = matchedStylist.availability[dayName];
      if (!daySchedule) return [];

      const parseHour = (timeStr: string) => {
        const [hourStr] = timeStr.split(":");
        return parseInt(hourStr, 10);
      };

      const startHour = parseHour(daySchedule.start);
      const endHour = parseHour(daySchedule.end);
      const slots: string[] = [];

      for (let h = startHour; h < endHour; h++) {
        const period = h >= 12 ? "PM" : "AM";
        const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
        slots.push(`${displayHour}:00 ${period}`);
      }
      return slots;
    }
    return ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
  };

  const dates = generateAvailableDates();
  const times = generateAvailableTimes();

  useEffect(() => {
    const stateToSave = {
      flowState,
      matchedStylist,
      frontImage,
      backImage,
      selectedDate,
      selectedTime,
      zipCode,
      rejectedStylistIds: Array.from(rejectedStylistIds)
    };
    sessionStorage.setItem('aiRecommendationState', JSON.stringify(stateToSave));
  }, [flowState, matchedStylist, frontImage, backImage, selectedDate, selectedTime, zipCode, rejectedStylistIds]);

  useEffect(() => {
    if (user === null) {
      toast.error('You need to be logged in to access AI Recommendation.');
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    setSelectedTime('');
  }, [selectedDate]);

  useEffect(() => {
    if (flowState === 'processing') {
      const timer = setTimeout(() => {
        setFlowState('suggestion');
      }, 5000);
      return () => clearTimeout(timer);
    }
    if (flowState === 'matching') {
      if (isManualStylistSelected && matchedStylist) {
        setFlowState('matched');
        return;
      }
      const timer = setTimeout(() => {
        if (!isManualStylistSelected || !matchedStylist) {
          setMatchedStylist(stylists.find(s => s.id === 's1') || stylists[0]);
        }
        setFlowState('matched');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [flowState, isManualStylistSelected, matchedStylist]);

  const handleUploadComplete = (front: string, back: string) => {
    setFrontImage(front);
    setBackImage(back);
    setFlowState('processing');
  };

  const handleSuggestionAccepted = () => {
    if (isManualStylistSelected) {
      setFlowState('date-selection');
    } else {
      setFlowState('zip-code');
    }
  };

  const handleDateTimeSelected = () => {
    if (selectedDate && selectedTime) {
      if (isManualStylistSelected && matchedStylist) {
        setFlowState('matched');
      } else {
        setFlowState('matching');
      }
    } else {
      toast.error("Please select a date and time.");
    }
  };

  const handleZipCodeSubmit = () => {
    if (!zipCode.trim()) {
      toast.error("Please enter your zip/postal code.");
      return;
    }
    setFlowState('date-selection');
  };

  const handleFindAnother = async () => {
    if (matchedStylist) {
      const newRejected = new Set([...rejectedStylistIds, matchedStylist.id]);
      setRejectedStylistIds(newRejected);
      const availableStylist = stylists.find(s => !newRejected.has(s.id));
      if (!availableStylist) {
        toast.error("No more stylists available. Try adjusting your preferences.");
        return;
      }
      setFlowState('matching');
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setMatchedStylist(availableStylist);
      setFlowState('matched');
    }
  };

  const handleStylistAccepted = () => {
    if (matchedStylist && user && selectedDate && selectedTime) {
      const newBooking: Omit<Booking, "id" | "status"> = {
        stylistName: matchedStylist.name,
        stylistId: matchedStylist.id,
        service: mockStyleSuggestion.name,
        date: selectedDate,
        time: selectedTime,
        price: mockStyleSuggestion.price,
        customerId: user.id,
        customerName: user.name,
        bookingType: 'ai-recommended',
        aiRecommendation: {
          styleName: mockStyleSuggestion.name,
          styleImage: mockStyleSuggestion.image,
          confidence: mockStyleSuggestion.confidence,
          safety: mockStyleSuggestion.safety,
          tension: mockStyleSuggestion.tension,
          price: mockStyleSuggestion.price,
          duration: mockStyleSuggestion.duration,
          careNote: mockStyleSuggestion.careNote,
          frontImage: frontImage || undefined,
          backImage: backImage || undefined,
          healthReport: mockHealthReport,
        }
      };
      const success = createBooking(newBooking);
      if (success) {
        sessionStorage.removeItem('aiRecommendationState');
        setFlowState('confirmed');
      } else {
        toast.error("There was an issue creating your booking. Please try again.");
      }
    }
  };

  const handleStartOver = () => {
    sessionStorage.removeItem('aiRecommendationState');
    sessionStorage.removeItem('selectedStylist');
    setFlowState('upload');
    setMatchedStylist(null);
    setFrontImage(null);
    setBackImage(null);
    setSelectedDate('');
    setSelectedTime('');
    setRejectedStylistIds(new Set());
    setIsManualStylistSelected(false);
  };

  const handleGoBack = () => {
    setIsNavigatingBack(true);
    setTimeout(() => {
      switch (flowState) {
        case 'zip-code':
          setFlowState('suggestion');
          break;
        case 'date-selection':
          if (isManualStylistSelected) {
            setFlowState('suggestion');
          } else {
            setFlowState('zip-code');
          }
          break;
        case 'matched':
          setFlowState('date-selection');
          break;
        default:
          break;
      }
      setIsNavigatingBack(false);
    }, 300);
  };

  const renderContent = () => {
    switch (flowState) {
      case 'upload':
        return <AIUploadSection onUploadComplete={handleUploadComplete} />;
      case 'processing':
        return <AIProcessingLoader />;
      case 'suggestion':
        return <AISuggestionCard onAccept={handleSuggestionAccepted} onTryAnother={() => setFlowState('processing')} />;
      case 'zip-code':
        return (
          <div className="space-y-8 max-w-2xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center shadow-sm">
                <MapPin className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">Where are you located?</h2>
                <p className="text-muted-foreground mt-1">We'll find the best stylists in your area</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/50 dark:bg-card/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border shadow-lg"
            >
              <div className="relative">
                <label className="block text-sm font-semibold text-primary mb-2">Zip / Postal Code</label>
                <Input
                  type="text"
                  placeholder="Enter your zip code (e.g., 10001)"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.toUpperCase())}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleZipCodeSubmit();
                    }
                  }}
                  className="h-14 rounded-xl border-border/60 bg-background/50 text-lg pl-4 focus:border-accent focus:ring-accent/20 transition-all"
                  autoFocus
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground/50 text-sm">
                  {zipCode.length > 0 && <CheckCircle className="w-5 h-5 text-green-500" />}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                
                <button
                  onClick={handleZipCodeSubmit}
                  disabled={!zipCode.trim()}
                  className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-primary font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  Find Available Dates
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        );
      case 'date-selection':
        return (
          <div className="space-y-10 max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center shadow-sm">
                <CalendarDays className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">Select Your Appointment</h2>
                <p className="text-muted-foreground mt-1">Choose a date and time that works for you</p>
              </div>
            </motion.div>

            {isManualStylistSelected && matchedStylist && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-accent/5 to-transparent border-l-4 border-accent rounded-xl p-5"
              >
                <p className="font-semibold mb-3 flex items-center gap-2 text-primary">
                  <Clock className="w-4 h-4 text-accent" />
                  {matchedStylist.name}'s Weekly Schedule
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                  {Object.entries(matchedStylist.availability).map(([day, time]) => (
                    <div key={day} className="flex justify-between items-center border-b border-border/30 pb-1">
                      <span className="text-muted-foreground">{day.slice(0,3)}</span>
                      <span className="font-medium text-primary">{time.start} – {time.end}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-accent" />
                <label className="text-sm font-semibold text-primary">Available Dates</label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {dates.map((d, idx) => {
                  const dateObj = new Date(d + "T00:00:00");
                  const isSelected = selectedDate === d;
                  return (
                    <motion.button
                      key={d}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedDate(d)}
                      className={`p-4 rounded-xl text-center transition-all duration-200 ${
                        isSelected
                          ? "bg-accent text-primary shadow-lg ring-2 ring-accent/30"
                          : "bg-card border border-border/50 hover:border-accent/30 hover:shadow-md"
                      }`}
                    >
                      <div className="text-xs uppercase tracking-wider opacity-70 mb-1">{dateObj.toLocaleDateString("en-US", { weekday: "short" })}</div>
                      <div className="font-bold text-2xl">{dateObj.getDate()}</div>
                      <div className="text-xs mt-1">{dateObj.toLocaleDateString("en-US", { month: "short" })}</div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-accent" />
                <label className="text-sm font-semibold text-primary">Available Times</label>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {times.map((t, idx) => (
                  <motion.button
                    key={t}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.02 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTime(t)}
                    className={`p-3 rounded-xl text-center font-medium transition-all duration-200 ${
                      selectedTime === t
                        ? "bg-accent text-primary shadow-lg ring-2 ring-accent/30"
                        : "bg-card border border-border/50 hover:border-accent/30"
                    }`}
                  >
                    {t}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-6">
              <button
                onClick={() => setFlowState(isManualStylistSelected ? 'suggestion' : 'zip-code')}
                className="px-6 py-3 rounded-xl border border-border/50 font-medium text-primary hover:bg-muted/50 transition-all flex items-center justify-center gap-2 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back
              </button>
              <button
                onClick={handleDateTimeSelected}
                disabled={!selectedDate || !selectedTime}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-primary font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {isManualStylistSelected ? "Confirm & Continue" : "Find My Stylist"}
                <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        );
      case 'matching':
        return <AIAutoMatchLoader />;
      case 'matched':
        return (
          <div className="max-w-4xl mx-auto">
            <SelectedAIStyleDetails />
            {isManualStylistSelected && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mb-6"
              >
                <div className="bg-gradient-to-r from-accent/10 to-accent/5 text-accent px-5 py-2 rounded-full text-sm font-semibold border border-accent/30 flex items-center gap-2 shadow-sm">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  Your Selected Stylist
                </div>
              </motion.div>
            )}
            <AutoMatchedStylistCard 
              stylist={matchedStylist} 
              onAccept={handleStylistAccepted}
              onViewProfile={() => navigate(`/stylist/${matchedStylist?.id}`, { state: { from: '/ai-recommendation', label: 'AI Recommendation' } })}
              onFindAnother={handleFindAnother}
              isManuallySelected={isManualStylistSelected}
            />
          </div>
        );
      case 'confirmed':
        return (
          <div className="text-center py-12 px-4">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              transition={{ type: "spring", duration: 0.6 }}
              className="max-w-md mx-auto"
            >
              <div className="w-28 h-28 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-14 h-14 text-green-500" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-primary mb-4">Booking Request Sent!</h2>
              <p className="text-muted-foreground mb-8">
                Your request has been sent to <span className="font-semibold text-primary">{matchedStylist?.name}</span>. 
                You will be notified once it is approved.
              </p>
              <Link 
                to="/customer/bookings" 
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-primary font-semibold hover:shadow-lg transition-all group"
              >
                <Calendar className="w-5 h-5" />
                View My Bookings
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        );
      default:
        return <AIUploadSection onUploadComplete={handleUploadComplete} />;
    }
  };

  if (!user) {
    return null;
  }

  const getFlowProgress = () => {
    const steps = ['upload', 'processing', 'suggestion', 'zip-code', 'date-selection', 'matching', 'matched'];
    const currentIndex = steps.indexOf(flowState);
    if (currentIndex === -1 || flowState === 'confirmed') return null;
    return { current: currentIndex + 1, total: steps.length };
  };

  const progress = getFlowProgress();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header Section */}
        <div className="relative mb-8 md:mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-accent">AI-Powered</span>
          </motion.div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight">
            Style Intelligence
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Upload your photos and let our AI analyze your style, then get matched with the perfect stylist for you.
          </p>
          
          {progress && flowState !== 'upload' && flowState !== 'confirmed' && (
            <div className="max-w-md mx-auto mt-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress</span>
                <span>{progress.current} / {progress.total}</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-accent to-accent/60 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(progress.current / progress.total) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          )}
          
          {flowState !== 'upload' && flowState !== 'confirmed' && flowState !== 'processing' && flowState !== 'matching' && (
            <motion.button 
              onClick={handleGoBack}
              disabled={isNavigatingBack}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors flex items-center gap-1 text-sm group"
              whileHover={{ x: -2 }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </motion.button>
          )}
          
          {flowState !== 'upload' && flowState !== 'confirmed' && (
            <motion.button 
              onClick={handleStartOver}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors flex items-center gap-1 text-sm group"
              whileHover={{ scale: 1.05 }}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Start Over</span>
            </motion.button>
          )}
        </div>

        {/* Main Content with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={flowState}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        {/* Trust Badges */}
        {flowState === 'upload' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mt-12 pt-8 border-t border-border/30"
          >
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-4 h-4 text-accent" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Award className="w-4 h-4 text-accent" />
              <span>Top Rated Stylists</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Scissors className="w-4 h-4 text-accent" />
              <span>Expert Matching</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AIRecommendationPage;