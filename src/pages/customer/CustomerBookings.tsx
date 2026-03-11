import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/useBookingHook";
import { stylists, Booking } from "@/data/demo-data";
import { 
  Star, CreditCard, XCircle, Clock, Calendar, 
  MapPin, CheckCircle, AlertCircle, Sparkles, 
  ChevronRight, DollarSign, Scissors, User,
  Download, RefreshCw, Shield, Award
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PaymentDialog } from "@/components/PaymentDialog";
import { cn } from "@/lib/utils";

const CustomerBookings = () => {
  const { user } = useAuth();
  const { getCustomerBookings, updateBookingStatus } = useBooking();
  const [tab, setTab] = useState("upcoming");
  const [paymentBooking, setPaymentBooking] = useState<Booking | null>(null);
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-xl" />
          ))}
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const myBookings = getCustomerBookings(user.id);
  const filteredBookings = myBookings.filter((b) => b.status === tab);
  
  const statusTabs: ("pending-approval" | "approved" | "upcoming" | "completed" | "cancelled")[] = 
    ["pending-approval", "approved", "upcoming", "completed", "cancelled"];

  const handleCancelBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, "cancelled");
    setExpandedBooking(null);
  };

  const getStatusPill = (status: string) => {
    switch (status) {
      case "pending-approval": 
        return { 
          bg: "bg-yellow-100", 
          text: "text-yellow-800", 
          icon: Clock,
          label: "Awaiting Approval" 
        };
      case "approved": 
        return { 
          bg: "bg-blue-100", 
          text: "text-blue-800", 
          icon: CheckCircle,
          label: "Approved" 
        };
      case "upcoming": 
        return { 
          bg: "bg-green-100", 
          text: "text-green-800", 
          icon: Calendar,
          label: "Upcoming" 
        };
      case "completed": 
        return { 
          bg: "bg-purple-100", 
          text: "text-purple-800", 
          icon: Star,
          label: "Completed" 
        };
      case "rejected":
      case "cancelled": 
        return { 
          bg: "bg-red-100", 
          text: "text-red-800", 
          icon: AlertCircle,
          label: "Cancelled" 
        };
      default: 
        return { 
          bg: "bg-gray-100", 
          text: "text-gray-800", 
          icon: AlertCircle,
          label: status 
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

      {/* Header with Stats */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h2 className="font-serif text-3xl font-bold text-primary">My Bookings</h2>
          <p className="text-detail mt-1 font-brand">Manage your appointments and payments</p>
        </div>
        
       
      </motion.div>

      {/* Tabs with Icons */}
      <motion.div 
        className="flex gap-2 flex-wrap border-b border-border pb-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {statusTabs.map((t) => {
          const status = getStatusPill(t);
          const StatusIcon = status.icon;
          return (
            <button 
              key={t} 
              onClick={() => setTab(t)} 
              className={cn(
                "px-5 py-2.5 rounded-t-xl text-sm font-medium transition-all duration-200 flex items-center gap-2",
                tab === t 
                  ? "bg-primary text-primary-foreground shadow-md border-b-2 border-accent" 
                  : "bg-transparent hover:bg-muted/50 text-detail border-b-2 border-transparent"
              )}
            >
              <StatusIcon className="w-4 h-4" />
              <span className="capitalize">{t.replace('-', ' ')}</span>
              <span className={cn(
                "ml-1 text-xs px-1.5 py-0.5 rounded-full",
                tab === t ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-detail"
              )}>
                {counts[t]}
              </span>
            </button>
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
                    "bg-card rounded-2xl border transition-all duration-300 overflow-hidden",
                    isExpanded ? "border-accent shadow-xl" : "border-border/50 hover:border-accent/30 hover:shadow-lg"
                  )}
                >
                  {/* Main Booking Row */}
                  <div className="p-5 cursor-pointer" onClick={() => setExpandedBooking(isExpanded ? null : b.id)}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img 
                            src={stylist?.photo} 
                            alt={stylist?.name} 
                            className="w-14 h-14 rounded-xl object-cover ring-2 ring-accent/20"
                          />
                          {stylist?.featured && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                              <Award className="w-3 h-3 text-primary" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-serif font-semibold text-primary text-lg">{b.service}</h3>
                          <p className="text-sm text-detail flex items-center gap-1 mt-1">
                            <User className="w-3.5 h-3.5" /> with {b.stylistName}
                          </p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-detail">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" /> {formatDate(b.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> {b.time}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 sm:flex-row-reverse">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">${b.price}</p>
                          <div className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
                            status.bg, status.text
                          )}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {status.label}
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-detail"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-border"
                      >
                        <div className="p-5 bg-muted/20 space-y-4">
                          {/* Service Details */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                              { icon: Scissors, label: "Service", value: b.service },
                              { icon: Calendar, label: "Date", value: formatDate(b.date) },
                              { icon: Clock, label: "Time", value: b.time },
                              { icon: DollarSign, label: "Price", value: `$${b.price}` },
                            ].map((item, i) => (
                              <div key={i} className="bg-card rounded-xl p-3 border border-border/50">
                                <div className="flex items-center gap-2 mb-1">
                                  <item.icon className="w-3.5 h-3.5 text-accent" />
                                  <span className="text-xs text-detail">{item.label}</span>
                                </div>
                                <p className="text-sm font-semibold text-primary">{item.value}</p>
                              </div>
                            ))}
                          </div>

                          {/* Stylist Info */}
                          {stylist && (
                            <div className="bg-card rounded-xl p-4 border border-border/50">
                              <h4 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                                <User className="w-4 h-4 text-accent" />
                                About {stylist.name}
                              </h4>
                              <p className="text-sm text-detail mb-3">{stylist.bio}</p>
                              <div className="flex items-center gap-4 text-xs">
                                <span className="flex items-center gap-1">
                                  <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                                  {stylist.rating} ({stylist.reviewCount} reviews)
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5" />
                                  {stylist.location}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3 justify-end">
                            {tab === "pending-approval" && (
                              <div className="flex items-center gap-2 text-sm text-detail bg-yellow-50 px-4 py-2 rounded-xl border border-yellow-200">
                                <Clock className="w-4 h-4 text-yellow-600" />
                                Awaiting stylist approval
                              </div>
                            )}
                            
                            {tab === "approved" && (
                              <>
                                <button
                                  onClick={() => setPaymentBooking(b)}
                                  className="btn-cta text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 group"
                                >
                                  <CreditCard className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                  Pay Now
                                </button>
                                <button
                                  onClick={() => handleCancelBooking(b.id)}
                                  className="border border-destructive text-destructive px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-destructive hover:text-destructive-foreground transition-all flex items-center gap-2"
                                >
                                  <XCircle className="w-4 h-4" />
                                  Cancel
                                </button>
                              </>
                            )}
                            
                            {tab === "upcoming" && (
                              <>
                                <Link
                                  to={`/reschedule?booking=${b.id}`}
                                  className="border border-accent text-accent px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-accent/10 transition-all flex items-center gap-2"
                                >
                                  <RefreshCw className="w-4 h-4" />
                                  Reschedule
                                </Link>
                                <button
                                  onClick={() => handleCancelBooking(b.id)}
                                  className="border border-destructive text-destructive px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-destructive hover:text-destructive-foreground transition-all flex items-center gap-2"
                                >
                                  <XCircle className="w-4 h-4" />
                                  Cancel
                                </button>
                              </>
                            )}
                            
                            {tab === "completed" && (
                              <>
                                <Link
                                  to={`/review-stylist?stylist=${b.stylistId}&service=${encodeURIComponent(b.service)}&booking=${b.id}`}
                                  className="btn-primary text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 group"
                                >
                                  <Star className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                  Leave Review
                                </Link>
                                <button
                                  onClick={() => {/* Download receipt */}}
                                  className="border border-border text-detail px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-muted transition-all flex items-center gap-2"
                                >
                                  <Download className="w-4 h-4" />
                                  Receipt
                                </button>
                              </>
                            )}
                            
                            {tab === "cancelled" && (
                              <button
                                onClick={() => {/* Rebook */}}
                                className="btn-cta text-sm px-6 py-2.5 rounded-xl flex items-center gap-2"
                              >
                                <RefreshCw className="w-4 h-4" />
                                Book Again
                              </button>
                            )}
                          </div>

                          {/* Security Note */}
                          {tab === "approved" && (
                            <div className="flex items-center gap-2 text-xs text-detail bg-accent/5 p-3 rounded-xl border border-accent/10">
                              <Shield className="w-3.5 h-3.5 text-accent" />
                              <span>Your payment is secure. You'll be charged only after stylist confirmation.</span>
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-card rounded-2xl border border-border/50"
            >
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                {tab === "completed" && <Star className="w-8 h-8 text-accent" />}
                {tab === "cancelled" && <XCircle className="w-8 h-8 text-accent" />}
                {tab === "pending-approval" && <Clock className="w-8 h-8 text-accent" />}
                {tab === "approved" && <CheckCircle className="w-8 h-8 text-accent" />}
                {tab === "upcoming" && <Calendar className="w-8 h-8 text-accent" />}
              </div>
              <h3 className="font-serif text-xl font-bold text-primary mb-2">
                No {tab.replace('-', ' ')} bookings
              </h3>
              <p className="text-detail mb-6 max-w-sm mx-auto">
                {tab === "upcoming" && "You don't have any upcoming appointments. Book a stylist to get started!"}
                {tab === "completed" && "No completed bookings yet. Your past appointments will appear here."}
                {tab === "cancelled" && "No cancelled bookings. When you cancel an appointment, it will appear here."}
                {tab === "pending-approval" && "No pending approvals. Bookings waiting for stylist confirmation will show here."}
                {tab === "approved" && "No approved bookings. Approved bookings awaiting payment will appear here."}
              </p>
              {tab === "upcoming" && (
                <Link 
                  to="/find-stylist" 
                  className="btn-cta inline-flex items-center gap-2 px-6 py-3 rounded-xl"
                >
                  Find a Stylist <ChevronRight className="w-4 h-4" />
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