import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "@/contexts/useBookingHook";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { 
  Calendar, Clock, DollarSign, User, 
  CheckCircle, XCircle, AlertCircle, Clock as ClockIcon,
  ChevronDown, ChevronRight, MessageCircle, Filter,
  ThumbsUp, ThumbsDown, Star, Sparkles, Award,
  Eye, EyeOff, Phone, Mail, MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

const StylistBookings = () => {
  const [tab, setTab] = useState("pending-approval");
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "price">("date");
  const { user } = useAuth();
  const { getStylistBookings, updateBookingStatus } = useBooking();

  // This component should only be rendered for stylists, so user should not be null.
  const allBookings = user ? getStylistBookings(user.id) : [];
  const myBookings = allBookings.filter(b => b.status === tab);

  const handleApprove = (bookingId: string) => {
    updateBookingStatus(bookingId, "approved");
  };

  const handleReject = (bookingId: string) => {
    updateBookingStatus(bookingId, "rejected");
  };

  const handleMarkComplete = (bookingId: string) => {
    updateBookingStatus(bookingId, "completed");
  };

  const statusTabs: ("pending-approval" | "approved" | "upcoming" | "completed" | "rejected")[] = 
    ["pending-approval", "approved", "upcoming", "completed", "rejected"];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending-approval": 
        return { 
          color: "border-yellow-500", 
          bg: "bg-yellow-50", 
          text: "text-yellow-700", 
          icon: AlertCircle,
          label: "Pending Approval"
        };
      case "approved": 
        return { 
          color: "border-blue-500", 
          bg: "bg-blue-50", 
          text: "text-blue-700", 
          icon: CheckCircle,
          label: "Approved"
        };
      case "upcoming": 
        return { 
          color: "border-green-500", 
          bg: "bg-green-50", 
          text: "text-green-700", 
          icon: Calendar,
          label: "Upcoming"
        };
      case "completed": 
        return { 
          color: "border-purple-500", 
          bg: "bg-purple-50", 
          text: "text-purple-700", 
          icon: Star,
          label: "Completed"
        };
      case "rejected":
      case "cancelled": 
        return { 
          color: "border-red-500", 
          bg: "bg-red-50", 
          text: "text-red-700", 
          icon: XCircle,
          label: "Rejected"
        };
      default: 
        return { 
          color: "border-border", 
          bg: "bg-card", 
          text: "text-detail", 
          icon: ClockIcon,
          label: status 
        };
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", { 
        weekday: "short", 
        month: "short", 
        day: "numeric" 
      });
    }
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
  };

  const getCounts = () => {
    const counts: Record<string, number> = {};
    statusTabs.forEach(status => {
      counts[status] = allBookings.filter(b => b.status === status).length;
    });
    return counts;
  };

  const counts = getCounts();

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Booking Management
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Manage Bookings</h2>
          <p className="text-detail mt-1 font-brand">View and manage all your appointment requests</p>
        </div>

       
      </motion.div>

      {/* Tabs with Counts */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 flex-wrap border-b border-border pb-2"
      >
        {statusTabs.map((t) => {
          const config = getStatusConfig(t);
          const Icon = config.icon;
          return (
            <button 
              key={t} 
              onClick={() => setTab(t)} 
              className={`px-5 py-2.5 rounded-t-xl text-sm font-medium capitalize transition-all duration-200 flex items-center gap-2 ${
                tab === t 
                  ? "bg-primary text-white shadow-md" 
                  : "text-detail hover:text-primary hover:bg-primary/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.replace('-', ' ')}</span>
              <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
                tab === t 
                  ? "bg-white/20 text-white" 
                  : "bg-muted text-detail"
              }`}>
                {counts[t] || 0}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* Bookings List */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {myBookings.length > 0 ? (
            myBookings.map((b, idx) => {
              const config = getStatusConfig(b.status);
              const StatusIcon = config.icon;
              const isExpanded = expandedBooking === b.id;

              return (
                <motion.div
                  key={b.id}
                  layout
                  custom={idx}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group"
                >
                  <div className={cn(
                    "bg-card rounded-2xl border-2 transition-all duration-300 overflow-hidden",
                    isExpanded ? "border-primary shadow-xl" : "border-border/50 hover:border-primary/30 hover:shadow-lg"
                  )}>
                    {/* Main Booking Row */}
                    <div 
                      className="p-5 cursor-pointer"
                      onClick={() => setExpandedBooking(isExpanded ? null : b.id)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          {/* Status Icon */}
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center",
                            config.bg
                          )}>
                            <StatusIcon className={cn("w-6 h-6", config.text)} />
                          </div>

                          {/* Booking Info */}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-serif font-semibold text-primary text-lg">{b.service}</h3>
                              <span className={cn(
                                "text-xs px-2 py-0.5 rounded-full font-medium",
                                config.bg, config.text
                              )}>
                                {config.label}
                              </span>
                            </div>
                            
                            <p className="text-sm text-detail flex items-center gap-2">
                              <User className="w-3.5 h-3.5" /> {b.customerName}
                            </p>
                            
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(b.date)}
                              </span>
                              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {b.time}
                              </span>
                            </div>

                            {b.notes && !isExpanded && (
                              <p className="text-xs text-detail mt-2 italic line-clamp-1">
                                "Note: {b.notes}"
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 sm:flex-row-reverse">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">${b.price}</p>
                            <p className="text-xs text-detail">+ fees</p>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-detail"
                          >
                            <ChevronDown className="w-5 h-5" />
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
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5">
                            <div className="border-t border-border pt-4 space-y-4">
                              {/* Customer Details */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-primary/5 rounded-xl p-4">
                                  <h4 className="text-xs font-semibold text-primary mb-3 flex items-center gap-1">
                                    <User className="w-3 h-3" /> Customer Details
                                  </h4>
                                  <div className="space-y-2">
                                    <p className="text-sm flex items-center gap-2">
                                      <Phone className="w-3.5 h-3.5 text-primary" />
                                      <span className="text-detail">(555) 123-4567</span>
                                    </p>
                                    <p className="text-sm flex items-center gap-2">
                                      <Mail className="w-3.5 h-3.5 text-primary" />
                                      <span className="text-detail">{b.customerName.toLowerCase().replace(' ', '.')}@email.com</span>
                                    </p>
                                  </div>
                                </div>

                                <div className="bg-primary/5 rounded-xl p-4">
                                  <h4 className="text-xs font-semibold text-primary mb-3 flex items-center gap-1">
                                    <MessageCircle className="w-3 h-3" /> Notes
                                  </h4>
                                  <p className="text-sm text-detail">
                                    {b.notes || "No additional notes provided."}
                                  </p>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex flex-wrap gap-3 justify-end">
                                {tab === "pending-approval" && (
                                  <>
                                    <button 
                                      onClick={() => handleApprove(b.id)}
                                      className="btn-primary text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 group"
                                    >
                                      <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                      Approve Booking
                                    </button>
                                    <button 
                                      onClick={() => handleReject(b.id)}
                                      className="border-2 border-destructive text-destructive px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-destructive hover:text-white transition-all flex items-center gap-2 group"
                                    >
                                      <ThumbsDown className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                      Reject
                                    </button>
                                  </>
                                )}
                                
                                {tab === "approved" && (
                                  <div className="flex items-center gap-2">
                                    <span className="bg-blue-100 text-blue-800 px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2">
                                      <ClockIcon className="w-4 h-4" />
                                      Awaiting Payment
                                    </span>
                                    <button className="border border-primary text-primary px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/10 transition-all">
                                      Send Reminder
                                    </button>
                                  </div>
                                )}
                                
                                {tab === "upcoming" && (
                                  <button 
                                    onClick={() => handleMarkComplete(b.id)}
                                    className="btn-cta text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 group"
                                  >
                                    <CheckCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    Mark as Completed
                                  </button>
                                )}
                                
                                {tab === "completed" && (
                                  <Link 
                                    to={`/stylist/review/${b.id}`}
                                    className="btn-outline text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 group"
                                  >
                                    <Star className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    View Review
                                  </Link>
                                )}
                                
                                {tab === "rejected" && (
                                  <button 
                                    onClick={() => {/* Archive functionality */}}
                                    className="border border-destructive text-destructive px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-destructive/10 transition-all"
                                  >
                                    Archive
                                  </button>
                                )}
                              </div>

                              {/* Timeline/Status Info */}
                              <div className="bg-muted/30 rounded-xl p-3 flex items-center gap-3 text-xs text-detail">
                                <ClockIcon className="w-3.5 h-3.5 text-primary" />
                                <span>Booking created on {b.date} · Last updated: Today at 10:30 AM</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-card rounded-2xl border border-border/50"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                {tab === "pending-approval" && <AlertCircle className="w-8 h-8 text-primary" />}
                {tab === "approved" && <CheckCircle className="w-8 h-8 text-primary" />}
                {tab === "upcoming" && <Calendar className="w-8 h-8 text-primary" />}
                {tab === "completed" && <Star className="w-8 h-8 text-primary" />}
                {tab === "rejected" && <XCircle className="w-8 h-8 text-primary" />}
              </div>
              <h3 className="font-serif text-xl font-bold text-primary mb-2">
                No {tab.replace('-', ' ')} bookings
              </h3>
              <p className="text-detail mb-6 max-w-sm mx-auto">
                {tab === "pending-approval" && "You don't have any pending booking requests. New requests will appear here."}
                {tab === "approved" && "No approved bookings yet. Approve pending requests to see them here."}
                {tab === "upcoming" && "No upcoming appointments. Your schedule is clear."}
                {tab === "completed" && "No completed bookings yet. Complete appointments will appear here."}
                {tab === "rejected" && "No rejected bookings. Rejected appointments will appear here."}
              </p>
              {tab === "pending-approval" && (
                <Link 
                  to="/stylist/availability" 
                  className="text-primary font-semibold hover:underline"
                >
                  Update your availability to get more requests
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

     
    </div>
  );
};

export default StylistBookings;