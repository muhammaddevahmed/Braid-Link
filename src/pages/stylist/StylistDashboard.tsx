import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { bookings, reviews, stylists } from "@/data/demo-data";
import { 
  Calendar, DollarSign, Star, TrendingUp, 
  Clock, Users, Award, Sparkles, ChevronRight,
  MessageCircle, ThumbsUp, Briefcase, Shield,
  CheckCircle, AlertCircle, Zap, Heart, MapPin
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

const StylistDashboard = () => {
  const { user } = useAuth();
  const s = stylists.find(st => st.id === user?.id) || stylists[0];
  const myBookings = bookings.filter((b) => b.stylistId === "s1");
  const upcoming = myBookings.filter((b) => b.status === "upcoming");
  const pendingApproval = myBookings.filter((b) => b.status === "pending-approval");
  const completed = myBookings.filter((b) => b.status === "completed");
  const myReviews = reviews.filter((r) => r.stylistId === "s1").slice(0, 3);

  const totalClients = new Set(myBookings.map(b => b.customerId)).size;
  const completionRate = Math.round((completed.length / myBookings.length) * 100) || 0;

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
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
        month: "short", 
        day: "numeric" 
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Stylist Dashboard
            </span>
            {s.status === 'active' && (
              <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Verified Professional
              </span>
            )}
             {user?.country && (
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {user.country}
              </span>
            )}
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Welcome back, {user?.name}!</h2>
          <p className="text-detail mt-1 font-brand">Here's what's happening with your business today</p>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-2">
          <Link 
            to="/stylist/availability" 
            className="btn-outline text-sm px-4 py-2.5 rounded-xl flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Availability
          </Link>
          <Link 
            to="/stylist/bookings" 
            className="btn-primary text-sm px-4 py-2.5 rounded-xl flex items-center gap-2"
          >
            <Briefcase className="w-4 h-4" />
            Manage Bookings
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { 
            label: "Upcoming", 
            value: upcoming.length, 
            icon: Calendar, 
            trend: "+2 from last week",
            color: "from-blue-500/20 to-blue-500/5",
            iconColor: "text-blue-600",
            bgColor: "bg-blue-100"
          },
          { 
            label: "Pending Approval", 
            value: pendingApproval.length, 
            icon: Clock, 
            trend: "Awaiting response",
            color: "from-yellow-500/20 to-yellow-500/5",
            iconColor: "text-yellow-600",
            bgColor: "bg-yellow-100"
          },
          { 
            label: "Total Earnings", 
            value: `$${s.totalEarnings.toLocaleString()}`, 
            icon: DollarSign, 
            trend: "+$450 this month",
            color: "from-green-500/20 to-green-500/5",
            iconColor: "text-green-600",
            bgColor: "bg-green-100"
          },
          { 
            label: "Rating", 
            value: s.rating, 
            icon: Star, 
            trend: `${myReviews.length} reviews`,
            color: "from-purple-500/20 to-purple-500/5",
            iconColor: "text-purple-600",
            bgColor: "bg-purple-100"
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -4 }}
            className="bg-card rounded-2xl p-5 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
            <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
            <p className="text-sm text-detail flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              {stat.label}
            </p>
            <p className="text-xs text-detail mt-2 opacity-70">{stat.trend}</p>
          </motion.div>
        ))}
      </div>

    

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments - Takes 2 columns */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-lg text-primary">Upcoming Appointments</h3>
                  <p className="text-xs text-detail">Your scheduled services</p>
                </div>
              </div>
              <Link 
                to="/stylist/bookings" 
                className="text-primary hover:text-primary/80 text-sm font-semibold flex items-center gap-1 group"
              >
                View All
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {upcoming.length > 0 ? (
                upcoming.slice(0, 4).map((b, i) => (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-serif font-semibold text-primary">{b.service}</h4>
                          <p className="text-sm text-detail">with {b.customerName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(b.date)}
                            </span>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {b.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">${b.price}</p>
                        <p className="text-xs text-detail">+ fees</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-serif font-semibold text-primary mb-1">No upcoming appointments</h4>
                  <p className="text-sm text-detail mb-4">Your schedule is clear for now</p>
                </div>
              )}
            </div>

            {upcoming.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                <p className="text-xs text-detail">
                  <span className="font-semibold text-primary">{upcoming.length}</span> total upcoming appointments
                </p>
                <Link 
                  to="/stylist/availability" 
                  className="text-xs text-primary hover:text-primary/80 font-semibold flex items-center gap-1"
                >
                  Update availability <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>
        </motion.div>

       
      </div>

      {/* Quick Tips */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-serif font-semibold text-primary mb-2">Tips to Grow Your Business</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                "Keep your availability up to date to get more bookings",
                "Respond to booking requests quickly (within 2 hours)",
                "Encourage clients to leave reviews after appointments"
              ].map((tip, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-detail">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trust Badge */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center gap-2 text-xs text-detail"
      >
        <Shield className="w-3 h-3 text-primary" />
        <span>Your dashboard is private and secure</span>
        <Heart className="w-3 h-3 text-primary ml-2" />
        <span>{totalClients} happy clients</span>
      </motion.div>
    </div>
  );
};

export default StylistDashboard;