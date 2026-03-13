import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { bookings, stylists, reviews } from "@/data/demo-data";
import { 
  Calendar, Star, Heart, ArrowRight, Clock, 
  MapPin, Sparkles, Award, Shield, ChevronRight,
  Scissors, User, MessageCircle, TrendingUp,
  BadgeCheck, Zap, Gift, Target, Bell, Coffee,
  Sun, Moon, Cloud, Gift as GiftIcon
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

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="space-y-8">
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
              Customer Dashboard
            </motion.div>
            
            {user?.country && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, type: "spring" }}
                className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 text-blue-600 text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-blue-500/20"
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
            <Calendar className="w-4 h-4 text-accent" />
            <p className="text-sm">
              {new Date().toLocaleDateString("en-US", { 
                weekday: "long", 
                month: "long", 
                day: "numeric",
                year: "numeric"
              })}
            </p>
          </div>
        </div>
        
        {/* Quick Action - Premium button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link 
            to="/find-stylist" 
            className="bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm group hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
          >
            <Scissors className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Book New Appointment
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Stats Grid - Premium redesign */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {[
          { 
            label: "Upcoming", 
            value: upcoming.length, 
            icon: Calendar, 
            gradient: "from-blue-500/20 to-blue-500/5",
            iconColor: "text-blue-500",
            badge: "appointments"
          },
          { 
            label: "Completed", 
            value: totalCompleted, 
            icon: Star, 
            gradient: "from-purple-500/20 to-purple-500/5",
            iconColor: "text-purple-500",
            badge: "services"
          },
          { 
            label: "Favorites", 
            value: favoriteStylists, 
            icon: Heart, 
            gradient: "from-pink-500/20 to-pink-500/5",
            iconColor: "text-pink-500",
            badge: "stylists"
          },
          { 
            label: "Reviews", 
            value: totalReviews, 
            icon: MessageCircle, 
            gradient: "from-green-500/20 to-green-500/5",
            iconColor: "text-green-500",
            badge: "written"
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -6 }}
            className="bg-card rounded-2xl p-5 border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-xl group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
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
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Upcoming Bookings - Premium redesign */}
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
                  <h3 className="font-serif font-semibold text-xl text-primary">Upcoming Bookings</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Zap className="w-3 h-3 text-accent" />
                    Your scheduled appointments
                  </p>
                </div>
              </div>
              
              <Link 
                to="/customer/bookings" 
                className="text-accent hover:text-accent/80 text-sm font-semibold flex items-center gap-1 group bg-accent/5 px-3 py-2 rounded-lg hover:bg-accent/10 transition-all"
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
                        <div className="flex items-center justify-between p-5 rounded-xl bg-gradient-to-r from-accent/5 to-accent/0 border border-accent/10 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
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
                              <h4 className="font-serif font-semibold text-primary text-lg">{b.service}</h4>
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                <User className="w-3.5 h-3.5" /> with <span className="font-medium text-primary">{b.stylistName}</span>
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
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-3xl font-bold text-primary">${b.price}</p>
                            <p className="text-xs text-muted-foreground mt-1">+ fees</p>
                            <span className="inline-block mt-2 text-[10px] bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full">
                              Confirmed
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-center py-12 bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl border border-accent/10">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="font-serif font-semibold text-primary text-lg mb-2">No upcoming bookings</h4>
                  <p className="text-sm text-muted-foreground mb-5">Ready to book your next style?</p>
                  <Link 
                    to="/find-stylist" 
                    className="bg-accent text-primary font-semibold inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm hover:bg-accent/90 transition-all shadow-md hover:shadow-accent/25 group"
                  >
                    Find a Stylist
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              )}
            </div>

            {upcoming.length > 0 && (
              <div className="mt-6 pt-5 border-t border-border/50 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary text-lg">{upcoming.length}</span> upcoming appointments
                </p>
                <Link 
                  to="/customer/bookings" 
                  className="text-sm text-accent hover:text-accent/80 font-semibold flex items-center gap-1 group"
                >
                  Manage bookings <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right Column - Premium redesign */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-xl text-primary">Recent Activity</h3>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Target className="w-3 h-3 text-accent" />
                  Your latest appointments
                </p>
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
                      className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-muted/30 to-muted/10 hover:from-muted/40 hover:to-muted/20 transition-all border border-border/50 hover:border-accent/20 group"
                    >
                      <img 
                        src={stylist?.photo} 
                        alt={stylist?.name} 
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-accent/10 group-hover:ring-accent/30 transition-all" 
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-primary">{b.service}</p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <User className="w-3 h-3" /> {b.stylistName} · {formatDate(b.date)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-xs bg-gradient-to-r from-green-500/10 to-green-500/5 text-green-600 px-3 py-1.5 rounded-full border border-green-500/20">
                          Completed
                        </span>
                        <span className="text-[10px] text-muted-foreground mt-1">${b.price}</span>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <Coffee className="w-12 h-12 text-accent/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">No recent activity</p>
                </div>
              )}
            </div>

            {recent.length > 0 && (
              <div className="mt-5 pt-4 border-t border-border/50">
                <Link 
                  to="/customer/bookings?status=completed" 
                  className="text-sm text-accent hover:text-accent/80 font-semibold flex items-center justify-between group"
                >
                  View all completed bookings
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </motion.div>

          {/* Quick Tips Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-2xl p-6 border border-accent/20 shadow-lg"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                <GiftIcon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h4 className="font-serif font-semibold text-primary mb-2">Pro Tip</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Book your appointments at least 3 days in advance to get your preferred time slots with top stylists.
                </p>
                <Link 
                  to="/find-stylist" 
                  className="text-xs text-accent font-semibold flex items-center gap-1 group"
                >
                  Browse stylists now
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust Badge - Premium redesign */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center mt-8"
      >
        <div className="inline-flex items-center gap-3 text-xs text-muted-foreground bg-card/50 backdrop-blur-sm px-5 py-2.5 rounded-full border border-border/50 shadow-sm">
          <Shield className="w-3.5 h-3.5 text-accent" />
          <span>Your data is secure • 100% satisfaction guaranteed</span>
          <BadgeCheck className="w-3.5 h-3.5 text-accent" />
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerDashboard;