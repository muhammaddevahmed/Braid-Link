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
  Eye, EyeOff, Phone, Mail, MapPin, BadgeCheck,
  Zap, Gift, Bell, BellRing, Send, CheckCheck,
  Shield, TrendingUp, Users, FileText
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
          color: "border-amber-500", 
          bg: "bg-amber-50", 
          text: "text-amber-700", 
          icon: AlertCircle,
          label: "Pending Approval",
          gradient: "from-amber-500/10 to-amber-500/5"
        };
      case "approved": 
        return { 
          color: "border-blue-500", 
          bg: "bg-blue-50", 
          text: "text-blue-700", 
          icon: CheckCircle,
          label: "Approved",
          gradient: "from-blue-500/10 to-blue-500/5"
        };
      case "upcoming": 
        return { 
          color: "border-green-500", 
          bg: "bg-green-50", 
          text: "text-green-700", 
          icon: Calendar,
          label: "Upcoming",
          gradient: "from-green-500/10 to-green-500/5"
        };
      case "completed": 
        return { 
          color: "border-purple-500", 
          bg: "bg-purple-50", 
          text: "text-purple-700", 
          icon: Star,
          label: "Completed",
          gradient: "from-purple-500/10 to-purple-500/5"
        };
      case "rejected":
      case "cancelled": 
        return { 
          color: "border-rose-500", 
          bg: "bg-rose-50", 
          text: "text-rose-700", 
          icon: XCircle,
          label: "Rejected",
          gradient: "from-rose-500/10 to-rose-500/5"
        };
      default: 
        return { 
          color: "border-border", 
          bg: "bg-card", 
          text: "text-muted-foreground", 
          icon: ClockIcon,
          label: status,
          gradient: "from-gray-500/10 to-gray-500/5"
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
    <div className="space-y-10">
      {/* Header - Premium redesign */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="bg-gradient-to-r from-accent/10 to-accent/5 text-accent text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-accent/20"
            >
              <Calendar className="w-3.5 h-3.5" />
              Booking Management
            </motion.div>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">Manage Bookings</h2>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <FileText className="w-4 h-4 text-accent" />
            <p className="text-sm">View and manage all your appointment requests</p>
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-border/50">
          <div className="flex items-center gap-2 text-sm">
            <BellRing className="w-4 h-4 text-accent" />
            <span className="text-muted-foreground">Pending:</span>
            <span className="font-semibold text-primary">{counts["pending-approval"]}</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2 text-sm">
            <CheckCheck className="w-4 h-4 text-green-500" />
            <span className="text-muted-foreground">Upcoming:</span>
            <span className="font-semibold text-primary">{counts.upcoming}</span>
          </div>
        </div>
      </motion.div>

      {/* Tabs with Counts - Premium redesign */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 flex-wrap border-b border-border/50 pb-2"
      >
        {statusTabs.map((t, index) => {
          const config = getStatusConfig(t);
          const Icon = config.icon;
          const isActive = tab === t;
          
          return (
            <motion.button 
              key={t} 
              custom={index}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              onClick={() => setTab(t)} 
              className={cn(
                "px-5 py-3 rounded-t-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 relative group",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-primary hover:bg-accent/5"
              )}
            >
              <Icon className={cn("w-4 h-4 transition-transform", isActive ? "text-accent" : "group-hover:text-accent group-hover:scale-110")} />
              <span className="capitalize">{t.replace('-', ' ')}</span>
              <span className={cn(
                "ml-1 text-xs px-2 py-0.5 rounded-full transition-all",
                isActive 
                  ? "bg-accent/20 text-accent border border-accent/30" 
                  : "bg-muted text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent"
              )}>
                {counts[t] || 0}
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
                    "bg-card rounded-2xl border-2 transition-all duration-500 overflow-hidden",
                    isExpanded 
                      ? "border-accent shadow-2xl" 
                      : "border-border/50 hover:border-accent/30 hover:shadow-xl"
                  )}>
                    {/* Main Booking Row - Premium redesign */}
                    <div 
                      className="p-6 cursor-pointer relative"
                      onClick={() => setExpandedBooking(isExpanded ? null : b.id)}
                    >
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                        <div className="flex items-start gap-4">
                          {/* Status Icon - Premium */}
                          <div className={cn(
                            "w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-md",
                            config.gradient
                          )}>
                            <StatusIcon className={cn("w-7 h-7", config.text)} />
                          </div>

                          {/* Booking Info - Premium */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-serif font-semibold text-primary text-lg md:text-xl">{b.service}</h3>
                              <span className={cn(
                                "text-xs px-3 py-1 rounded-full font-medium border",
                                config.bg, config.text, config.color.replace('border-', 'border-')
                              )}>
                                {config.label}
                              </span>
                            </div>
                            
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <User className="w-3.5 h-3.5 text-accent" /> 
                              <span className="font-medium text-primary">{b.customerName}</span>
                            </p>
                            
                            <div className="flex items-center gap-2 mt-3">
                              <span className="text-xs bg-accent/10 text-accent px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                <Calendar className="w-3 h-3" />
                                {formatDate(b.date)}
                              </span>
                              <span className="text-xs bg-accent/10 text-accent px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                <Clock className="w-3 h-3" />
                                {b.time}
                              </span>
                            </div>

                            {b.notes && !isExpanded && (
                              <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground bg-accent/5 px-3 py-1.5 rounded-full">
                                <MessageCircle className="w-3 h-3 text-accent" />
                                <span className="italic">"{b.notes.substring(0, 40)}..."</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 sm:flex-row-reverse">
                          <div className="text-right">
                            <p className="text-3xl font-bold text-primary">${b.price}</p>
                            <p className="text-xs text-muted-foreground">+ fees</p>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className={cn(
                              "w-9 h-9 rounded-lg flex items-center justify-center transition-all",
                              isExpanded 
                                ? "bg-accent text-primary" 
                                : "bg-accent/10 text-accent group-hover:bg-accent/20"
                            )}
                          >
                            <ChevronDown className="w-5 h-5" />
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
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6">
                            <div className="border-t border-border/50 pt-5 space-y-5">
                              {/* Customer Details - Premium */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <motion.div 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.1 }}
                                  className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl p-5 border border-accent/10"
                                >
                                  <h4 className="text-xs font-semibold text-primary mb-4 flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                                      <User className="w-3.5 h-3.5 text-accent" />
                                    </div>
                                    Customer Details
                                  </h4>
                                  <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-2 bg-background/50 rounded-lg">
                                      <Phone className="w-4 h-4 text-accent" />
                                      <span className="text-sm text-muted-foreground">(555) 123-4567</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-2 bg-background/50 rounded-lg">
                                      <Mail className="w-4 h-4 text-accent" />
                                      <span className="text-sm text-muted-foreground">{b.customerName.toLowerCase().replace(' ', '.')}@email.com</span>
                                    </div>
                                  </div>
                                </motion.div>

                                <motion.div 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.15 }}
                                  className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl p-5 border border-accent/10"
                                >
                                  <h4 className="text-xs font-semibold text-primary mb-4 flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                                      <MessageCircle className="w-3.5 h-3.5 text-accent" />
                                    </div>
                                    Notes
                                  </h4>
                                  <p className="text-sm text-muted-foreground bg-background/50 p-3 rounded-lg">
                                    {b.notes || "No additional notes provided."}
                                  </p>
                                </motion.div>
                              </div>

                              {/* Action Buttons - Premium */}
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-wrap gap-3 justify-end"
                              >
                                {tab === "pending-approval" && (
                                  <>
                                    <motion.button 
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={() => handleApprove(b.id)}
                                      className="bg-gradient-to-r from-green-500 to-green-400 text-white font-semibold text-sm px-6 py-3 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all group"
                                    >
                                      <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                      Approve Booking
                                    </motion.button>
                                    <motion.button 
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={() => handleReject(b.id)}
                                      className="border-2 border-rose-200 text-rose-600 px-6 py-3 rounded-xl text-sm font-medium hover:bg-rose-50 transition-all flex items-center gap-2 group"
                                    >
                                      <ThumbsDown className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                      Reject
                                    </motion.button>
                                  </>
                                )}
                                
                                {tab === "approved" && (
                                  <div className="flex items-center gap-3">
                                    <span className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 text-blue-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 border border-blue-200">
                                      <ClockIcon className="w-4 h-4" />
                                      Awaiting Payment
                                    </span>
                                    
                                  </div>
                                )}
                                
                                
                                
                                {tab === "completed" && (
                                  <Link 
                                    to={`/stylist/review/${b.id}`}
                                    className="border-2 border-accent/30 text-accent hover:bg-accent/5 font-semibold text-sm px-6 py-3 rounded-xl flex items-center gap-2 transition-all group"
                                  >
                                    <Star className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    View Review
                                  </Link>
                                )}
                                
                                {tab === "rejected" && (
                                  <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {/* Archive functionality */}}
                                    className="border-2 border-rose-200 text-rose-600 px-6 py-3 rounded-xl text-sm font-medium hover:bg-rose-50 transition-all"
                                  >
                                    Archive
                                  </motion.button>
                                )}
                              </motion.div>

                              {/* Timeline/Status Info - Premium */}
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.25 }}
                                className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl p-4 flex items-center gap-3 text-xs text-muted-foreground border border-accent/10"
                              >
                                <ClockIcon className="w-4 h-4 text-accent" />
                                <span>Booking created on {b.date} · Last updated: Today at 10:30 AM</span>
                                <BadgeCheck className="w-4 h-4 text-accent ml-auto" />
                              </motion.div>
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-gradient-to-br from-card to-secondary/5 rounded-3xl border border-border/50 shadow-xl"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto">
                  {tab === "pending-approval" && <AlertCircle className="w-10 h-10 text-accent" />}
                  {tab === "approved" && <CheckCircle className="w-10 h-10 text-accent" />}
                  {tab === "upcoming" && <Calendar className="w-10 h-10 text-accent" />}
                  {tab === "completed" && <Star className="w-10 h-10 text-accent" />}
                  {tab === "rejected" && <XCircle className="w-10 h-10 text-accent" />}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-accent" />
                </div>
              </div>
              
              <h3 className="font-serif text-2xl font-bold text-primary mb-3">
                No {tab.replace('-', ' ')} bookings
              </h3>
              
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                {tab === "pending-approval" && "You don't have any pending booking requests. New requests will appear here."}
                {tab === "approved" && "No approved bookings yet. Approve pending requests to see them here."}
                {tab === "upcoming" && "No upcoming appointments. Your schedule is clear."}
                {tab === "completed" && "No completed bookings yet. Complete appointments will appear here."}
                {tab === "rejected" && "No rejected bookings. Rejected appointments will appear here."}
              </p>
              
              {tab === "pending-approval" && (
                <Link 
                  to="/stylist/availability" 
                  className="bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold inline-flex items-center gap-2 px-6 py-3.5 rounded-xl hover:shadow-lg hover:shadow-accent/25 transition-all group"
                >
                  Update your availability to get more requests
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

export default StylistBookings;