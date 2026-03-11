import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { bookings, stylists, reviews } from "@/data/demo-data";
import { 
  Calendar, Star, Heart, ArrowRight, Clock, 
  MapPin, Sparkles, Award, Shield, ChevronRight,
  Scissors, User, MessageCircle, TrendingUp
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const upcoming = bookings.filter((b) => b.customerId === "c1" && b.status === "upcoming");
  const recent = bookings.filter((b) => b.customerId === "c1" && b.status === "completed").slice(0, 2);
  const totalCompleted = bookings.filter((b) => b.customerId === "c1" && b.status === "completed").length;
  const favoriteStylists = 3; // This would come from actual favorites data
  const totalReviews = reviews.filter((r) => r.customerId === "c1").length;

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
        weekday: "short", 
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
            <span className="bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Customer Dashboard
            </span>
            {user?.country && (
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {user.country}
              </span>
            )}
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Welcome back, {user?.name}!</h2>
          <p className="text-detail mt-1 font-brand">Here's what's happening with your appointments</p>
        </div>
        
        {/* Quick Action */}
        <Link 
          to="/find-stylist" 
          className="btn-cta inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm group"
        >
          <Scissors className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          Book New Appointment
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { 
            label: "Upcoming", 
            value: upcoming.length, 
            icon: Calendar, 
            color: "from-blue-500/20 to-blue-500/5",
            iconColor: "text-blue-600",
            bgColor: "bg-blue-100"
          },
          { 
            label: "Completed", 
            value: totalCompleted, 
            icon: Star, 
            color: "from-purple-500/20 to-purple-500/5",
            iconColor: "text-purple-600",
            bgColor: "bg-purple-100"
          },
          { 
            label: "Favorites", 
            value: favoriteStylists, 
            icon: Heart, 
            color: "from-pink-500/20 to-pink-500/5",
            iconColor: "text-pink-600",
            bgColor: "bg-pink-100"
          },
          { 
            label: "Reviews", 
            value: totalReviews, 
            icon: MessageCircle, 
            color: "from-green-500/20 to-green-500/5",
            iconColor: "text-green-600",
            bgColor: "bg-green-100"
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -4 }}
            className="bg-card rounded-2xl p-5 border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-xl"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
              <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
            <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
            <p className="text-sm text-detail flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-accent" />
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Bookings - Takes 2 columns */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-lg text-primary">Upcoming Bookings</h3>
                  <p className="text-xs text-detail">Your scheduled appointments</p>
                </div>
              </div>
              <Link 
                to="/customer/bookings" 
                className="text-accent hover:text-accent/80 text-sm font-semibold flex items-center gap-1 group"
              >
                View All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {upcoming.length > 0 ? (
                upcoming.map((b, i) => {
                  const stylist = stylists.find((s) => s.id === b.stylistId);
                  return (
                    <motion.div
                      key={b.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group"
                    >
                      <Link to={`/customer/bookings`} className="block">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-accent/5 border border-accent/10 hover:border-accent/30 transition-all duration-300 hover:shadow-md">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <img 
                                src={stylist?.photo} 
                                alt={stylist?.name} 
                                className="w-14 h-14 rounded-xl object-cover ring-2 ring-accent/20 group-hover:ring-accent/40 transition-all"
                              />
                              {stylist?.featured && (
                                <div className="absolute -top-2 -right-2 w-5 h-5 bg-accent rounded-full flex items-center justify-center">
                                  <Award className="w-3 h-3 text-primary" />
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-serif font-semibold text-primary">{b.service}</h4>
                              <p className="text-sm text-detail flex items-center gap-1 mt-1">
                                <User className="w-3.5 h-3.5" /> with {b.stylistName}
                              </p>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {formatDate(b.date)}
                                </span>
                                <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {b.time}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-primary">${b.price}</p>
                            <p className="text-xs text-detail">+ fees</p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-serif font-semibold text-primary mb-1">No upcoming bookings</h4>
                  <p className="text-sm text-detail mb-4">Ready to book your next style?</p>
                  <Link 
                    to="/find-stylist" 
                    className="btn-cta inline-flex items-center gap-2 px-4 py-2 text-sm"
                  >
                    Find a Stylist
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {upcoming.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                <p className="text-xs text-detail">
                  <span className="font-semibold text-primary">{upcoming.length}</span> upcoming appointments
                </p>
                <Link 
                  to="/customer/bookings" 
                  className="text-xs text-accent hover:text-accent/80 font-semibold flex items-center gap-1"
                >
                  Manage bookings <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-lg text-primary">Recent Activity</h3>
                <p className="text-xs text-detail">Your latest appointments</p>
              </div>
            </div>

            <div className="space-y-3">
              {recent.length > 0 ? (
                recent.map((b, i) => {
                  const stylist = stylists.find((s) => s.id === b.stylistId);
                  return (
                    <motion.div
                      key={b.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <img src={stylist?.photo} alt={stylist?.name} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-primary">{b.service}</p>
                        <p className="text-xs text-detail">with {b.stylistName} · {formatDate(b.date)}</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Completed</span>
                    </motion.div>
                  );
                })
              ) : (
                <p className="text-sm text-detail text-center py-4">No recent activity</p>
              )}
            </div>
          </motion.div>

       
        </div>
      </div>

     

      {/* Trust Badge */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center gap-2 text-xs text-detail bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50"
      >
        <Shield className="w-3 h-3 text-accent" />
        <span>Your data is secure • 100% satisfaction guaranteed</span>
      </motion.div>
    </div>
  );
};

export default CustomerDashboard;