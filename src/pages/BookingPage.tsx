import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { hairstyles, stylists } from "@/data/demo-data";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/BookingContext";
import { MapPin, ChevronRight, ChevronLeft, Star, Check, Calendar, Clock, LogIn, Send } from "lucide-react";
import { toast } from "sonner";

const BookingPage = () => {
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { createBooking } = useBooking();

  const initPostal = params.get("postal") || "";
  const initStyleId = params.get("style") || "";
  const initStylistId = params.get("stylist") || "";
  const initServiceId = params.get("service") || "";

  const [step, setStep] = useState(initStylistId ? 2 : initStyleId ? 1 : 0);
  const [postalCode, setPostalCode] = useState(initPostal);
  const [selectedStyle, setSelectedStyle] = useState(initStyleId);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedStylist, setSelectedStylist] = useState(initStylistId);
  const [selectedServiceId, setSelectedServiceId] = useState(initServiceId);
  const [confirmed, setConfirmed] = useState(false);
  const [notes, setNotes] = useState("");

  const times = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() + i + 1);
    return d.toISOString().split("T")[0];
  });

  const matchedStylists = stylists.filter((s) => {
    if (selectedStyle) return s.specialties.some((sp) => hairstyles.find((h) => h.id === selectedStyle)?.name === sp);
    return true;
  });

  const chosenStylist = stylists.find((s) => s.id === selectedStylist);
  const chosenStyle = hairstyles.find((h) => h.id === selectedStyle);
  const chosenService = chosenStylist?.services.find((sv) => sv.id === selectedServiceId) ||
    chosenStylist?.services.find((sv) => sv.name === chosenStyle?.name) ||
    (chosenStylist?.services[0] || null);

  const servicePrice = chosenService?.price || chosenStyle?.avgPrice || 0;
  const platformFee = Math.round(servicePrice * 0.05);
  const totalAmount = servicePrice + platformFee;

  const stepTitles = ["Enter Location", "Choose Hairstyle", "Select Date & Time", "Choose Stylist", "Select Service", "Review & Request"];
  const totalSteps = stepTitles.length;

  useEffect(() => {
    if (!isAuthenticated) {
      toast.info("Please log in as a customer to book an appointment.");
      navigate("/login", { state: { from: location }, replace: true });
    } else if (user?.role !== 'customer') {
      toast.error("Only customers can book appointments.");
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  const handleRequestAppointment = () => {
    if (!user || !chosenStylist || !chosenService || !selectedDate || !selectedTime) {
      toast.error("Your booking details are incomplete. Please review your selections.");
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
      <div className="py-20">
        <div className="container mx-auto px-4 text-center max-w-md">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <Send className="w-10 h-10 text-accent" />
            </div>
            <h1 className="font-serif text-3xl font-bold mb-3">Request Sent!</h1>
            <p className="text-muted-foreground mb-2">
              Your booking request has been sent to {chosenStylist?.name}. You will be notified once they approve it, and then you can proceed with payment.
            </p>
            <div className="bg-card rounded-2xl p-6 border border-border text-left mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Stylist</span><span className="font-semibold">{chosenStylist?.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-semibold">{chosenService?.name || chosenStyle?.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-semibold">{selectedDate}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-semibold">{selectedTime}</span></div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-base">
                <span>Estimated Total</span><span>${totalAmount}</span>
              </div>
            </div>
            <div className="flex gap-3 mt-6 justify-center">
              <Link to="/customer/bookings" className="btn-primary text-sm">View My Bookings</Link>
              <Link to="/" className="btn-cta text-sm">Back to Home</Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="font-serif text-3xl font-bold text-center mb-2">Book Your Appointment</h1>
        <p className="text-muted-foreground text-center mb-8">Step {step + 1} of {totalSteps} — {stepTitles[step]}</p>

        <div className="w-full bg-muted rounded-full h-2.5 mb-8 overflow-hidden">
          <motion.div
            className="h-2.5 rounded-full"
            style={{ background: "var(--gradient-ocean)" }}
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="bg-card rounded-2xl p-6 md:p-8 border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              {/* Steps 0-4 are largely the same, so they are omitted for brevity in this thought block but are included in the final code */}
              
              {step === 0 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-lg font-semibold">Where are you located?</h2>
                  <div className="relative max-w-sm">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Enter postal code" className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                  </div>
                </div>
              )}

              {step === 1 && (
                 <div className="space-y-4">
                  <h2 className="font-serif text-lg font-semibold">Choose Your Hairstyle</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {hairstyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setSelectedStyle(style.id)}
                        className={`text-left rounded-xl overflow-hidden border-2 transition-all duration-200 hover-scale ${selectedStyle === style.id ? "border-accent ring-2 ring-accent/30" : "border-transparent hover:border-muted-foreground/20"}`}
                      >
                        <div className="aspect-square"><img src={style.image} alt={style.name} className="w-full h-full object-cover" loading="lazy" /></div>
                        <div className="p-2.5">
                          <p className="text-sm font-medium">{style.name}</p>
                          <p className="text-xs text-muted-foreground">${style.avgPrice} · {style.duration}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <h2 className="font-serif text-lg font-semibold">Select Date & Time</h2>
                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center gap-1.5"><Calendar className="w-4 h-4 text-accent" /> Date</label>
                    <div className="flex flex-wrap gap-2">
                      {dates.map((d) => {
                        const dateObj = new Date(d + "T00:00:00");
                        return (
                          <button key={d} onClick={() => setSelectedDate(d)} className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${selectedDate === d ? "bg-primary text-primary-foreground border-primary shadow-md" : "border-input hover:bg-muted hover:border-muted-foreground/30"}`}>
                            {dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block flex items-center gap-1.5"><Clock className="w-4 h-4 text-accent" /> Time</label>
                    <div className="flex flex-wrap gap-2">
                      {times.map((t) => (
                        <button key={t} onClick={() => setSelectedTime(t)} className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${selectedTime === t ? "bg-primary text-primary-foreground border-primary shadow-md" : "border-input hover:bg-muted hover:border-muted-foreground/30"}`}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-lg font-semibold">Choose Your Stylist</h2>
                  <div className="space-y-3">
                    {matchedStylists.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => { setSelectedStylist(s.id); setSelectedServiceId(""); }}
                        className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 ${selectedStylist === s.id ? "border-accent bg-accent/5 shadow-md" : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"}`}
                      >
                        <img src={s.photo} alt={s.name} className="w-14 h-14 rounded-xl object-cover" />
                        <div className="flex-1">
                          <p className="font-semibold">{s.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Star className="w-3.5 h-3.5 fill-secondary text-secondary" /> {s.rating} · {s.location}
                          </div>
                        </div>
                        <span className="font-semibold">${Math.min(...s.services.map((sv) => sv.price))}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && chosenStylist && (
                 <div className="space-y-4">
                  <h2 className="font-serif text-lg font-semibold">Select a Service from {chosenStylist.name}</h2>
                  <div className="space-y-3">
                    {chosenStylist.services.map((sv) => (
                      <button
                        key={sv.id}
                        onClick={() => setSelectedServiceId(sv.id)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${selectedServiceId === sv.id ? "border-accent bg-accent/5 shadow-md" : "border-border hover:border-muted-foreground/30 hover:bg-muted/30"}`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{sv.name}</p>
                            <p className="text-sm text-muted-foreground mt-0.5">{sv.description}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Clock className="w-3 h-3" /> {sv.duration}</p>
                          </div>
                          <span className="font-bold text-lg">${sv.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <h2 className="font-serif text-lg font-semibold">Review Your Request</h2>
                  <div className="bg-muted/40 rounded-xl p-5 space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Stylist</span><span className="font-medium">{chosenStylist?.name}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{chosenService?.name || chosenStyle?.name}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{selectedDate}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{selectedTime}</span></div>
                    <div className="border-t border-border pt-3 flex justify-between font-bold text-base">
                      <span>Estimated Total</span><span className="text-accent">${totalAmount}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Optional Notes for Stylist</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      placeholder="e.g., 'My hair is color-treated', 'Please use a gentle touch on my scalp', etc."
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8 pt-5 border-t border-border">
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            {step < totalSteps - 1 ? (
              <button onClick={() => setStep(step + 1)} disabled={
                  (step === 1 && !selectedStyle) ||
                  (step === 2 && (!selectedDate || !selectedTime)) ||
                  (step === 3 && !selectedStylist) ||
                  (step === 4 && !selectedServiceId)
                } 
                className="btn-primary flex items-center gap-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleRequestAppointment}
                className="btn-cta text-sm flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Booking Request
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
