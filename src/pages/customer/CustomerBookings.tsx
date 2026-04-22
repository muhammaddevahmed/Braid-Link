import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/useBookingHook";
import { stylists, Booking } from "@/data/demo-data";
import { RescheduleDialog } from "@/components/RescheduleDialog";
import AssignedStylistCard from "@/components/AssignedStylistCard";
import { 
  Star, CreditCard, XCircle, Clock, Calendar, 
  MapPin, CheckCircle, AlertCircle, Sparkles, 
  ChevronRight, DollarSign, Scissors, User,
  Download, RefreshCw, Shield, Award,
  BadgeCheck, Zap, Gift, TrendingUp,
  Wallet, FileText, MessageCircle, Headphones,
  Bell, BellRing, CheckCheck, X, Heart
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PaymentDialog } from "@/components/PaymentDialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Star as StarIcon } from "lucide-react";


const CustomerBookings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getCustomerBookings, updateBookingStatus, requestReschedule } = useBooking();
  const [tab, setTab] = useState("upcoming");
  const [paymentBooking, setPaymentBooking] = useState<Booking | null>(null);
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);
  const [bookingToReview, setBookingToReview] = useState<string | null>(null);
  const [reviewData, setReviewData] = useState<{ rating: number; comment: string }>({ rating: 5, comment: "" });
  const [bookingToReschedule, setBookingToReschedule] = useState<Booking | null>(null);

  if (!user) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64" />
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-12 w-32 rounded-xl" />
          ))}
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const myBookings = getCustomerBookings(user.id);
  const filteredBookings = myBookings.filter((b) => {
    if (tab === "upcoming") {
      return b.status === "upcoming" || b.status === "reschedule-requested";
    }
    return b.status === tab;
  });
  
  const statusTabs: ("pending-approval" | "approved" | "upcoming" | "completed" | "cancelled" | "reschedule-requested")[] = 
    ["pending-approval", "approved", "upcoming", "reschedule-requested", "completed", "cancelled"];

  const handleCancelBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, "cancelled");
    setExpandedBooking(null);
  };

  const handleMarkComplete = (bookingId: string) => {
    updateBookingStatus(bookingId, "completed");
    setBookingToReview(bookingId);
    toast.success("Booking marked as completed! Please leave a review.");
  };

  const handleSubmitReview = (bookingId: string) => {
    if (reviewData.comment.trim().length < 10) {
      toast.error("Review must be at least 10 characters.");
      return;
    }
    // Mock: save review to localStorage
    const reviews = JSON.parse(localStorage.getItem("customerReviews") || "[]");
    reviews.push({ bookingId, rating: reviewData.rating, comment: reviewData.comment, date: new Date().toISOString() });
    localStorage.setItem("customerReviews", JSON.stringify(reviews));
    setBookingToReview(null);
    setReviewData({ rating: 5, comment: "" });
    toast.success("Review submitted! Thank you.");
  };

  const handleRescheduleRequest = (bookingId: string, newDate: Date, newTime: string) => {
    requestReschedule(bookingId, newDate.toISOString().split('T')[0], newTime);
    setBookingToReschedule(null);
    toast.success("Reschedule request sent! Awaiting stylist approval.");
  };

  const getStatusPill = (status: string) => {
    switch (status) {
      case "pending-approval": 
        return { 
          bg: "bg-amber-50", 
          text: "text-amber-700", 
          icon: Clock,
          label: "Awaiting Approval",
          border: "border-amber-200",
          gradient: "from-amber-500/10 to-amber-500/5"
        };
      case "approved": 
        return { 
          bg: "bg-blue-50", 
          text: "text-blue-700", 
          icon: CheckCircle,
          label: "Approved",
          border: "border-blue-200",
          gradient: "from-blue-500/10 to-blue-500/5"
        };
      case "upcoming": 
        return { 
          bg: "bg-green-50", 
          text: "text-green-700", 
          icon: Calendar,
          label: "Upcoming",
          border: "border-green-200",
          gradient: "from-green-500/10 to-green-500/5"
        };
      case "reschedule-requested":
        return {
          bg: "bg-yellow-50",
          text: "text-yellow-700",
          icon: RefreshCw,
          label: "Reschedule Requested",
          border: "border-yellow-200",
          gradient: "from-yellow-500/10 to-yellow-500/5"
        };
      case "completed": 
        return { 
          bg: "bg-purple-50", 
          text: "text-purple-700", 
          icon: Star,
          label: "Completed",
          border: "border-purple-200",
          gradient: "from-purple-500/10 to-purple-500/5"
        };
      case "rejected":
      case "cancelled": 
        return { 
          bg: "bg-rose-50", 
          text: "text-rose-700", 
          icon: AlertCircle,
          label: "Cancelled",
          border: "border-rose-200",
          gradient: "from-rose-500/10 to-rose-500/5"
        };
      default: 
        return { 
          bg: "bg-gray-50", 
          text: "text-gray-700", 
          icon: AlertCircle,
          label: status,
          border: "border-gray-200",
          gradient: "from-gray-500/10 to-gray-500/5"
        };
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", { 
      weekday: "short", 
      month: "short", 
      day: "numeric",
      year: "numeric"
    });
  };

  const getBookingCounts = () => {
    const counts: Record<string, number> = {};
    statusTabs.forEach(status => {
      counts[status] = myBookings.filter(b => b.status === status).length;
    });
    return counts;
  };

  const counts = getBookingCounts();

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
  };

  return (
    <div className="space-y-8">
      <PaymentDialog
        booking={paymentBooking}
        onClose={() => setPaymentBooking(null)}
        onPaymentSuccess={() => {
          setPaymentBooking(null);
          setTab("upcoming");
        }}
      />

      <RescheduleDialog
        booking={bookingToReschedule}
        onClose={() => setBookingToReschedule(null)}
        onReschedule={handleRescheduleRequest}
      />

      {/* Header with Stats - Premium redesign */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-gradient-to-r from-accent/10 to-accent/5 text-accent text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-accent/20">
              <Calendar className="w-3.5 h-3.5" />
              Booking Management
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">My Bookings</h2>
          <p className="text-muted-foreground mt-1 flex items-center gap-1">
            <Zap className="w-4 h-4 text-accent" />
            Manage your appointments and payments
          </p>
        </div>
        
       
      </motion.div>

      {/* Assigned Stylist Section - Show stylist from first upcoming booking */}
      {myBookings.length > 0 && (
        <>
          {(() => {
            const upcomingBooking = myBookings.find(b => b.status === "upcoming" || b.status === "approved");
            const stylist = upcomingBooking ? stylists.find(s => s.id === upcomingBooking.stylistId) : null;
            
            if (stylist && upcomingBooking) {
              return (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-8 mb-6"
                  >
                    <AssignedStylistCard
                      stylist={stylist}
                      onViewProfile={() => {
                        navigate(`/stylist/${stylist.id}`, { state: { from: '/customer/bookings', label: 'Customer Dashboard' } });
                      }}
                    />
                  </motion.div>
                </>
              );
            }
            return null;
          })()}
        </>
      )}

      <motion.div 
        className="flex gap-2 flex-wrap border-b border-border/50 pb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {statusTabs.map((t, index) => {
          const status = getStatusPill(t);
          const StatusIcon = status.icon;
          const isActive = tab === t;
          
          return (
            <motion.button 
              key={t} 
              onClick={() => setTab(t)} 
              custom={index}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className={cn(
                "px-5 py-3 rounded-t-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 relative group",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-primary hover:bg-muted/30"
              )}
            >
              <StatusIcon className={cn("w-4 h-4 transition-transform", isActive ? "text-accent" : "group-hover:text-accent group-hover:scale-110")} />
              <span className="capitalize">{t.replace('-', ' ')}</span>
              <span className={cn(
                "ml-1 text-xs px-2 py-0.5 rounded-full transition-all",
                isActive 
                  ? "bg-accent/20 text-accent border border-accent/30" 
                  : "bg-muted text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent"
              )}>
                {counts[t]}
              </span>
              
              {/* Active indicator line */}
              {isActive && (
                <motion.div
                  layoutId="activeTabLine"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/0 via-accent to-accent/0"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Bookings List */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((b, idx) => {
              const stylist = stylists.find((s) => s.id === b.stylistId);
              const status = getStatusPill(b.status);
              const StatusIcon = status.icon;
              const isExpanded = expandedBooking === b.id;

              return (
                <motion.div 
                  key={b.id} 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.05 }}
                  className={cn(
                    "bg-card rounded-2xl border-2 transition-all duration-500 overflow-hidden group",
                    isExpanded 
                      ? "border-accent shadow-2xl" 
                      : "border-border/50 hover:border-accent/30 hover:shadow-xl"
                  )}
                >
                  {/* Main Booking Row - Premium redesign */}
                  <div 
                    className="p-6 cursor-pointer relative" 
                    onClick={() => setExpandedBooking(isExpanded ? null : b.id)}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img 
                            src={stylist?.photo} 
                            alt={stylist?.name} 
                            className="w-16 h-16 rounded-xl object-cover ring-2 ring-accent/20 group-hover:ring-accent/40 transition-all"
                          />
                          {stylist?.featured && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full flex items-center justify-center shadow-lg">
                              <Award className="w-3 h-3 text-primary" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-serif font-semibold text-primary text-lg md:text-xl">{b.service}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <User className="w-3.5 h-3.5" /> with <span className="font-medium text-primary">{b.stylistName}</span>
                          </p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5 bg-accent/5 px-2 py-1 rounded-full">
                              <Calendar className="w-3.5 h-3.5 text-accent" /> {formatDate(b.date)}
                            </span>
                            <span className="flex items-center gap-1.5 bg-accent/5 px-2 py-1 rounded-full">
                              <Clock className="w-3.5 h-3.5 text-accent" /> {b.time}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:flex-row-reverse">
                        <div className="text-right">
                          <p className="text-3xl font-bold text-primary">£{b.price}</p>
                          <div className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border mt-1",
                            status.bg, status.text, status.border
                          )}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {status.label}
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                            isExpanded 
                              ? "bg-accent text-primary" 
                              : "bg-accent/10 text-accent group-hover:bg-accent/20"
                          )}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details - Premium redesign */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-border/50"
                      >
                        <div className="p-6 bg-gradient-to-br from-muted/20 to-transparent space-y-5">
                          {/* Service Details Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {[
                              { icon: Scissors, label: "Service", value: b.service, color: "from-purple-500/10 to-purple-500/5" },
                              { icon: Calendar, label: "Date", value: formatDate(b.date), color: "from-blue-500/10 to-blue-500/5" },
                              { icon: Clock, label: "Time", value: b.time, color: "from-green-500/10 to-green-500/5" },
                              { icon: DollarSign, label: "Price", value: `£${b.price}`, color: "from-amber-500/10 to-amber-500/5" },
                            ].map((item, i) => (
                              <motion.div 
                                key={i} 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className={`bg-gradient-to-br ${item.color} rounded-xl p-4 border border-accent/10 hover:shadow-md transition-all`}
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                                    <item.icon className="w-3.5 h-3.5 text-accent" />
                                  </div>
                                  <span className="text-xs text-muted-foreground">{item.label}</span>
                                </div>
                                <p className="text-sm font-semibold text-primary">{item.value}</p>
                              </motion.div>
                            ))}
                          </div>

                          {/* AI Recommendation Details */}
                          {b.bookingType === 'ai-recommended' && b.aiRecommendation && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15 }}
                              className="bg-gradient-to-br from-purple-500/5 to-purple-500/0 rounded-xl p-5 border border-purple-500/10 mb-4"
                            >
                              <h4 className="text-xs font-semibold text-primary mb-4 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                  <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                                </div>
                                AI Style Recommendation
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                  <h5 className="text-sm font-medium text-muted-foreground mb-2 text-center">Your Photo (Front)</h5>
                                  {b.aiRecommendation.frontImage ? (
                                    <img src={b.aiRecommendation.frontImage} alt="Your front view" className="rounded-lg w-full aspect-square object-cover border border-border shadow-sm" />
                                  ) : <p className="text-xs text-center text-muted-foreground">Not provided</p>}
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium text-muted-foreground mb-2 text-center">Your Photo (Back)</h5>
                                  {b.aiRecommendation.backImage ? (
                                    <img src={b.aiRecommendation.backImage} alt="Your back view" className="rounded-lg w-full aspect-square object-cover border border-border shadow-sm" />
                                  ) : <p className="text-xs text-center text-muted-foreground">Not provided</p>}
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium text-muted-foreground mb-2 text-center">AI Suggested Style</h5>
                                  {b.aiRecommendation.styleImage ? (
                                    <img src={b.aiRecommendation.styleImage} alt={b.aiRecommendation.styleName} className="rounded-lg w-full aspect-square object-cover border border-border shadow-sm" />
                                  ) : <div className="rounded-lg w-full aspect-square bg-muted flex items-center justify-center border border-border"><span className="text-xs text-muted-foreground">No image</span></div>}
                                  <p className="text-xs text-center mt-2 font-semibold text-primary">{b.aiRecommendation.styleName}</p>
                                </div>
                              </div>
                              {b.aiRecommendation.healthReport && (
                                <div className="mt-4 pt-4 border-t border-purple-500/20">
                                   <h4 className="text-xs font-semibold text-primary mb-3 flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-lg bg-green-500/10 flex items-center justify-center">
                                      <Heart className="w-3.5 h-3.5 text-green-500" />
                                    </div>
                                    AI Hair Health Report
                                  </h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                                    <div className="space-y-1.5 bg-background/50 p-3 rounded-lg">
                                      <p><strong className="text-primary">Health Score:</strong> {b.aiRecommendation.healthReport.hairHealthScore}/100</p>
                                      <p><strong className="text-primary">Risk Level:</strong> {b.aiRecommendation.healthReport.riskLevel}</p>
                                    </div>
                                    <div className="space-y-1.5 bg-background/50 p-3 rounded-lg">
                                      <p><strong className="text-primary block mb-1">Recommendations:</strong></p>
                                      <ul className="list-disc list-inside pl-1 text-xs space-y-1">
                                        {b.aiRecommendation.healthReport.recommendations?.map((rec: string, i: number) => <li key={i}>{rec}</li>)}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}

                          {/* Stylist Info - Premium */}
                          {stylist && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl p-5 border border-accent/20"
                            >
                              <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                                  <User className="w-3.5 h-3.5 text-accent" />
                                </div>
                                About {stylist.name}
                                {stylist.rating >= 4.8 && (
                                  <BadgeCheck className="w-4 h-4 text-accent ml-2" />
                                )}
                              </h4>
                              <p className="text-sm text-muted-foreground mb-3">{stylist.bio}</p>
                              <div className="flex items-center gap-4 text-xs">
                                <span className="flex items-center gap-1.5 bg-accent/10 px-2 py-1 rounded-full">
                                  <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                                  {stylist.rating} ({stylist.reviewCount} reviews)
                                </span>
                                <span className="flex items-center gap-1.5 bg-accent/10 px-2 py-1 rounded-full">
                                  <MapPin className="w-3.5 h-3.5 text-accent" />
                                  {stylist.location}
                                </span>
                              </div>
                            </motion.div>
                          )}

                          {/* Action Buttons - Premium */}
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-wrap gap-3 justify-end"
                          >
                            {bookingToReview === b.id && (
                              <motion.div 
                                layout
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="w-full p-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl space-y-4 mt-4"
                              >
                                <h4 className="font-semibold text-lg flex items-center gap-2 text-green-800">
                                  <CheckCircle className="w-5 h-5" />
                                  Leave your review
                                </h4>
                                <div className="flex items-center gap-2">
                                  {[1,2,3,4,5].map((r) => (
                                    <button
                                      key={r}
                                      type="button"
                                      className={cn(
                                        "p-1 rounded-lg transition-all",
                                        r <= reviewData.rating
                                          ? "text-amber-400 bg-amber-100"
                                          : "text-gray-300 hover:text-amber-400 hover:bg-amber-100"
                                      )}
                                      onClick={() => setReviewData((prev) => ({ ...prev, rating: r }))}
                                    >
                                      <StarIcon className="w-8 h-8 fill-current" />
                                    </button>
                                  ))}
                                </div>
                                <textarea
                                  value={reviewData.comment}
                                  onChange={(e) => setReviewData((prev) => ({ ...prev, comment: e.target.value }))}
                                  placeholder="Tell us about your experience (min 10 characters)..."
                                  className="w-full p-4 border border-border rounded-xl focus:ring-2 focus:ring-accent focus:border-accent resize-vertical min-h-[80px] text-sm"
                                  rows={3}
                                />
                                <div className="flex gap-3">
                                  <button
                                    onClick={() => setBookingToReview(null)}
                                    className="px-6 py-3 border border-muted-foreground text-muted-foreground rounded-xl hover:bg-muted text-sm font-medium transition-colors"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleSubmitReview(b.id)}
                                    disabled={reviewData.comment.trim().length < 10}
                                    className="btn-cta"
                                  >
                                    Submit Review
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </motion.div>

                          {/* Tab-specific notices and actions */}
                          {tab === "pending-approval" && (
                            <div className="flex items-center gap-2 text-sm bg-amber-50 px-4 py-2 rounded-xl border border-amber-200 mb-4">
                              <Clock className="w-4 h-4 text-amber-600 animate-pulse" />
                              <span className="text-amber-700">Awaiting stylist approval</span>
                            </div>
                          )}

                          {/* Action Buttons by Tab */}
                          {tab === "approved" && (
                            <>
                              <div className="flex flex-wrap gap-3 mb-4">
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => setPaymentBooking(b)}
                                  className="bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold px-6 py-3 rounded-xl flex items-center gap-2 group hover:shadow-lg hover:shadow-accent/25 transition-all"
                                >
                                  <CreditCard className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                  Pay Now
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleCancelBooking(b.id)}
                                  className="border-2 border-rose-200 text-rose-600 px-6 py-3 rounded-xl text-sm font-medium hover:bg-rose-50 transition-all flex items-center gap-2"
                                >
                                  <XCircle className="w-4 h-4" />
                                  Cancel
                                </motion.button>
                              </div>
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="flex items-center gap-2 text-xs text-muted-foreground bg-accent/5 p-3 rounded-xl border border-accent/10"
                              >
                                <Shield className="w-4 h-4 text-accent" />
                                <span>Your payment is secure. You'll be charged only after stylist confirmation.</span>
                                <BadgeCheck className="w-4 h-4 text-accent ml-auto" />
                              </motion.div>
                            </>
                          )}
                          
                          {tab === "upcoming" && (
                            <div className="flex flex-wrap gap-3 mb-4">
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMarkComplete(b.id);
                                }}
                                className="btn-cta flex items-center gap-2 group"
                              >
                                <CheckCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                Mark Completed
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setBookingToReschedule(b)}
                                className="border-2 border-amber-300 text-amber-700 px-6 py-3 rounded-xl text-sm font-medium hover:bg-amber-50 transition-all flex items-center gap-2"
                              >
                                <RefreshCw className="w-4 h-4" />
                                Reschedule
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleCancelBooking(b.id)}
                                className="border-2 border-rose-200 text-rose-600 px-6 py-3 rounded-xl text-sm font-medium hover:bg-rose-50 transition-all flex items-center gap-2"
                              >
                                <XCircle className="w-4 h-4" />
                                Cancel
                              </motion.button>
                            </div>
                          )}
                          {b.status === "reschedule-requested" && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded-r-lg"
                            >
                              <p className="font-semibold">Reschedule Requested!</p>
                              <p className="text-sm">
                                You requested to move this booking to{" "}
                                <span className="font-bold">{formatDate(b.rescheduleDate!)}</span> at{" "}
                                <span className="font-bold">{b.rescheduleTime}</span>.
                              </p>
                              <p className="text-sm mt-1">Awaiting stylist approval.</p>
                            </motion.div>
                          )}
                          
                          {tab === "completed" && (
                            <div className="flex flex-wrap gap-3 mb-4">
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMarkComplete(b.id);
                                }}
                                className="btn-cta flex items-center gap-2 group"
                              >
                                <CheckCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                Review Stylist
                              </motion.button>
                              
                            </div>
                          )}
                          
                          {tab === "cancelled" && (
                            <div className="flex justify-end mb-4">
                              <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold px-8 py-3 rounded-xl flex items-center gap-2 group hover:shadow-lg hover:shadow-accent/25 transition-all"
                              >
                                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                                Book Again
                              </motion.button>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-gradient-to-br from-card to-secondary/5 rounded-3xl border border-border/50 shadow-xl"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto">
                  {tab === "completed" && <Star className="w-10 h-10 text-accent" />}
                  {tab === "cancelled" && <X className="w-10 h-10 text-accent" />}
                  {tab === "pending-approval" && <Clock className="w-10 h-10 text-accent" />}
                  {tab === "approved" && <CheckCircle className="w-10 h-10 text-accent" />}
                  {tab === "upcoming" && <Calendar className="w-10 h-10 text-accent" />}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-accent" />
                </div>
              </div>
              
              <h3 className="font-serif text-2xl font-bold text-primary mb-3">
                No {tab.replace('-', ' ')} bookings
              </h3>
              
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {tab === "upcoming" && "You don't have any upcoming appointments. Book a stylist to get started!"}
                {tab === "completed" && "No completed bookings yet. Your past appointments will appear here."}
                {tab === "cancelled" && "No cancelled bookings. When you cancel an appointment, it will appear here."}
                {tab === "pending-approval" && "No pending approvals. Bookings waiting for stylist confirmation will show here."}
                {tab === "approved" && "No approved bookings. Approved bookings awaiting payment will appear here."}
              </p>
              
              {tab === "upcoming" && (
                <Link 
                  to="/find-stylist" 
                  className="bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold inline-flex items-center gap-2 px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-accent/25 transition-all group"
                >
                  Find a Stylist 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomerBookings;