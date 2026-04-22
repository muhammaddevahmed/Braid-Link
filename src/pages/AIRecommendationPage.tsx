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
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, CalendarDays } from 'lucide-react';

type FlowState = 'upload' | 'processing' | 'suggestion' | 'date-selection' | 'matching' | 'matched' | 'confirmed';

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

  const savedState = loadSavedState();

  const [flowState, setFlowState] = useState<FlowState>(savedState?.flowState || 'upload');
  const [matchedStylist, setMatchedStylist] = useState<Stylist | null>(savedState?.matchedStylist || null);
  const [frontImage, setFrontImage] = useState<string | null>(savedState?.frontImage || null);
  const [backImage, setBackImage] = useState<string | null>(savedState?.backImage || null);
  const [selectedDate, setSelectedDate] = useState<string>(savedState?.selectedDate || '');
  const [selectedTime, setSelectedTime] = useState<string>(savedState?.selectedTime || '');
  const [rejectedStylistIds, setRejectedStylistIds] = useState<Set<string>>(
    savedState?.rejectedStylistIds ? new Set(savedState.rejectedStylistIds) : new Set()
  );
  const { user } = useAuth();
  const navigate = useNavigate();
  const { createBooking } = useBooking();

  const times = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i + 1);
    return d.toISOString().split("T")[0];
  });

  useEffect(() => {
    const stateToSave = {
      flowState,
      matchedStylist,
      frontImage,
      backImage,
      selectedDate,
      selectedTime,
      rejectedStylistIds: Array.from(rejectedStylistIds)
    };
    sessionStorage.setItem('aiRecommendationState', JSON.stringify(stateToSave));
  }, [flowState, matchedStylist, frontImage, backImage, selectedDate, selectedTime, rejectedStylistIds]);

  useEffect(() => {
    // Check for user on initial render and whenever user state changes
    if (user === null) {
      toast.error('You need to be logged in to access AI Recommendation.');
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (flowState === 'processing') {
      const timer = setTimeout(() => {
        setFlowState('suggestion');
      }, 5000); // 5-second processing simulation
      return () => clearTimeout(timer);
    }
    if (flowState === 'matching') {
      const timer = setTimeout(() => {
        // Mock finding a stylist
        setMatchedStylist(stylists.find(s => s.id === 's1') || stylists[0]);
        setFlowState('matched');
      }, 3000); // 3-second matching simulation
      return () => clearTimeout(timer);
    }
  }, [flowState]);

  const handleUploadComplete = (front: string, back: string) => {
    setFrontImage(front);
    setBackImage(back);
    setFlowState('processing');
  };

  const handleSuggestionAccepted = () => {
    setFlowState('date-selection');
  };

  const handleDateTimeSelected = () => {
    if (selectedDate && selectedTime) {
      setFlowState('matching');
    } else {
      toast.error("Please select a date and time.");
    }
  };

  const handleFindAnother = async () => {
    if (matchedStylist) {
      // Add current stylist to rejected list
      const newRejected = new Set([...rejectedStylistIds, matchedStylist.id]);
      setRejectedStylistIds(newRejected);

      // Find available stylists
      const availableStylist = stylists.find(s => !newRejected.has(s.id));

      if (!availableStylist) {
        toast.error("No more stylists available. Try adjusting your preferences.");
        return;
      }

      // Show loading and then set new stylist
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
          ...mockStyleSuggestion,
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
    setFlowState('upload');
    setMatchedStylist(null);
    setFrontImage(null);
    setBackImage(null);
    setSelectedDate('');
    setSelectedTime('');
    setRejectedStylistIds(new Set());
  };

  const renderContent = () => {
    switch (flowState) {
      case 'upload':
        return <AIUploadSection onUploadComplete={handleUploadComplete} />;
      case 'processing':
        return <AIProcessingLoader />;
      case 'suggestion':
        return <AISuggestionCard onAccept={handleSuggestionAccepted} onTryAnother={() => setFlowState('processing')} />;
      case 'date-selection':
        return (
          <div className="space-y-8 max-w-2xl mx-auto">
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
                      className={`p-4 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${isSelected
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
                    className={`p-4 rounded-xl text-sm font-medium border-2 transition-all duration-200 ${selectedTime === t
                      ? "bg-accent text-primary border-accent shadow-lg"
                      : "border-border hover:border-accent/30 hover:bg-accent/5"
                      }`}
                  >
                    {t}
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="text-center pt-4">
              <button
                onClick={handleDateTimeSelected}
                disabled={!selectedDate || !selectedTime}
                className="bg-accent text-primary font-semibold inline-flex items-center gap-2 px-8 py-3 rounded-lg text-lg hover:bg-accent/90 transition-all disabled:bg-muted disabled:cursor-not-allowed"
              >
                Find Stylist
              </button>
            </div>
          </div>
        )
      case 'matching':
        return <AIAutoMatchLoader />;
      case 'matched':
        return (
          <>
            <SelectedAIStyleDetails />
            <AutoMatchedStylistCard 
              stylist={matchedStylist} 
              onAccept={handleStylistAccepted}
              onViewProfile={() => navigate(`/stylist/${matchedStylist?.id}`, { state: { from: '/ai-recommendation', label: 'AI Recommendation' } })}
              onFindAnother={handleFindAnother}
            />
          </>
        );
      case 'confirmed':
        return (
          <div className="text-center py-12">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", duration: 0.6 }}>
              <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
              <h2 className="font-serif text-3xl font-bold text-primary mb-4">Booking Request Sent!</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Your request has been sent to {matchedStylist?.name}. You will be notified once it is approved.
              </p>
              <Link to="/customer/bookings" className="bg-accent text-primary font-semibold inline-flex items-center gap-2 px-8 py-3 rounded-lg text-lg hover:bg-accent/90 transition-all">
                <Calendar className="w-5 h-5" />
                View My Bookings
              </Link>
            </motion.div>
          </div>
        );
      default:
        return <AIUploadSection onUploadComplete={handleUploadComplete} />;
    }
  };

  // While redirecting or if user is not logged in, render nothing.
  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative mb-8 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary">
          AI-Powered Style Recommendation
        </h1>
        {flowState !== 'upload' && flowState !== 'confirmed' && (
          <button onClick={handleStartOver} className="mt-4 text-sm font-medium text-muted-foreground hover:text-accent transition-colors">
            ← Start Over
          </button>
        )}
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default AIRecommendationPage;
