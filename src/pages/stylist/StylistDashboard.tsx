import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { bookings, reviews, stylists } from "@/data/demo-data";
import { 
  Calendar, DollarSign, Star, TrendingUp, 
  Clock, Users, Award, Sparkles, ChevronRight,
  MessageCircle, ThumbsUp, Briefcase, Shield,
  CheckCircle, AlertCircle, Zap, Heart, MapPin,
  BadgeCheck, Gift, Target, Coffee, Sun,
  Bell, Settings, UserCheck, BarChart
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

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-10">
      {/* Welcome Section - Premium redesign */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="bg-gradient-to-r from-accent/10 to-accent/5 text-accent text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-accent/20"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Stylist Dashboard
            </motion.div>
            
            {s.status === 'active' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, type: "spring" }}
                className="bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 text-emerald-600 text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-emerald-200"
              >
                <BadgeCheck className="w-3.5 h-3.5" />
                Verified Professional
              </motion.div>
            )}
            
            {user?.country && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 text-blue-600 text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-blue-200"
              >
                <MapPin className="w-3.5 h-3.5" />
                {user.country}
              </motion.div>
            )}
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">
            {getGreeting()}, {user?.name?.split(' ')[0]}!
          </h2>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <BarChart className="w-4 h-4 text-accent" />
            <p className="text-sm">Here's what's happening with your business today</p>
          </div>
        </div>
        
        {/* Quick Actions - Premium */}
        <div className="flex gap-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link 
              to="/stylist/availability" 
              className="border-2 border-accent/30 text-accent hover:bg-accent/5 font-semibold text-sm px-5 py-3 rounded-xl flex items-center gap-2 transition-all"
            >
              <Calendar className="w-4 h-4" />
              Availability
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link 
              to="/stylist/bookings" 
              className="bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold text-sm px-5 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all group"
            >
              <Briefcase className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Manage Bookings
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid - Premium redesign */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {[
          { 
            label: "Upcoming", 
            value: upcoming.length, 
            icon: Calendar, 
            trend: "+2 from last week",
            color: "from-blue-500/20 to-blue-500/5",
            iconColor: "text-blue-500",
            badge: "appointments"
          },
          { 
            label: "Pending Approval", 
            value: pendingApproval.length, 
            icon: Clock, 
            trend: "Awaiting response",
            color: "from-yellow-500/20 to-yellow-500/5",
            iconColor: "text-yellow-500",
            badge: "requests"
          },
          { 
            label: "Total Earnings", 
            value: `$${s.totalEarnings.toLocaleString()}`, 
            icon: DollarSign, 
            trend: "+$450 this month",
            color: "from-green-500/20 to-green-500/5",
            iconColor: "text-green-500",
            badge: "lifetime"
          },
          { 
            label: "Rating", 
            value: s.rating, 
            icon: Star, 
            trend: `${myReviews.length} reviews`,
            color: "from-purple-500/20 to-purple-500/5",
            iconColor: "text-purple-500",
            badge: "excellent"
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -6 }}
            className="bg-card rounded-xl p-5 border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-xl group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <TrendingUp className="w-4 h-4 text-accent/50 group-hover:text-accent transition-colors" />
            </div>
            <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <span className="text-[10px] bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                {stat.badge}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{stat.trend}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Upcoming Appointments - Premium redesign */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 hover:shadow-xl transition-all duration-300 h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-xl text-primary">Upcoming Appointments</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Zap className="w-3 h-3 text-accent" />
                    Your scheduled services
                  </p>
                </div>
              </div>
              
              <Link 
                to="/stylist/bookings" 
                className="text-accent hover:text-accent/80 text-sm font-semibold flex items-center gap-1 group bg-accent/5 px-3 py-2 rounded-lg hover:bg-accent/10 transition-all"
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
                    <div className="flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-accent/5 to-accent/0 border border-accent/10 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                          <Users className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-serif font-semibold text-primary text-lg">{b.service}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                            <UserCheck className="w-3.5 h-3.5 text-accent" />
                            with <span className="font-medium text-primary">{b.customerName}</span>
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs bg-accent/10 text-accent px-3 py-1.5 rounded-full flex items-center gap-1.5">
                              <Calendar className="w-3 h-3" />
                              {formatDate(b.date)}
                            </span>
                            <span className="text-xs bg-accent/10 text-accent px-3 py-1.5 rounded-full flex items-center gap-1.5">
                              <Clock className="w-3 h-3" />
                              {b.time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">${b.price}</p>
                        <p className="text-xs text-muted-foreground mt-1">+ fees</p>
                        <span className="inline-block mt-2 text-[10px] bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full">
                          Confirmed
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl border border-accent/10">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-serif font-semibold text-primary text-lg mb-2">No upcoming appointments</h4>
                  <p className="text-sm text-muted-foreground mb-4">Your schedule is clear for now</p>
                  <Link 
                    to="/stylist/availability" 
                    className="text-accent font-semibold text-sm hover:text-accent/80 transition-colors"
                  >
                    Update your availability →
                  </Link>
                </div>
              )}
            </div>

            {upcoming.length > 0 && (
              <div className="mt-6 pt-5 border-t border-border/50 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary text-lg">{upcoming.length}</span> total upcoming appointments
                </p>
                <Link 
                  to="/stylist/availability" 
                  className="text-sm text-accent hover:text-accent/80 font-semibold flex items-center gap-1 group"
                >
                  Update availability <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Column - Reviews & Stats */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
        

         
        </motion.div>
      </div>

      {/* Quick Tips - Premium redesign */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-2xl p-6 md:p-8 border border-accent/20 shadow-lg"
      >
        <div className="flex items-start gap-5">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center flex-shrink-0 shadow-lg">
            <Award className="w-7 h-7 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-serif font-semibold text-xl text-primary mb-3">Tips to Grow Your Business</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Calendar, text: "Keep your availability up to date to get more bookings" },
                { icon: Clock, text: "Respond to booking requests quickly (within 2 hours)" },
                { icon: Star, text: "Encourage clients to leave reviews after appointments" }
              ].map((tip, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -2 }}
                  className="flex items-start gap-3 p-3 rounded-xl bg-background/50 border border-accent/10 hover:border-accent/30 transition-all"
                >
                  <tip.icon className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{tip.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trust Badge - Premium redesign */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center mt-8"
      >
        <div className="inline-flex items-center gap-3 text-xs text-muted-foreground bg-card/50 backdrop-blur-sm px-5 py-2.5 rounded-full border border-border/50 shadow-sm">
          <Shield className="w-3.5 h-3.5 text-accent" />
          <span>Your dashboard is private and secure</span>

          <BadgeCheck className="w-3.5 h-3.5 text-accent" />
        </div>
      </motion.div>
    </div>
  );
};

export default StylistDashboard;