import { motion } from "framer-motion";
import { 
  Users, Scissors, Calendar, DollarSign, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Activity, Clock, 
  CheckCircle, XCircle, Star, Award, Shield, Sparkles,
  UserCheck, UserPlus, Briefcase, CreditCard, Zap,
  BarChart, PieChart, LineChart, Globe, Bell, 
  Settings, Filter, Download, MoreHorizontal,
  BadgeCheck, AlertCircle, Eye
} from "lucide-react";
import { bookings, stylists, users } from "@/data/demo-data";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const totalRevenue = stylists.reduce((a, s) => a + s.totalEarnings, 0);
  const totalPendingBookings = bookings.filter(b => b.status === "pending-approval").length;
  const totalCompletedBookings = bookings.filter(b => b.status === "completed").length;
  const totalActiveStylists = stylists.filter(s => s.status === "active").length;
  const averageRating = stylists.reduce((a, s) => a + s.rating, 0) / stylists.length;

  const stats = [
    { 
      label: "Total Users", 
      value: users.length, 
      icon: Users, 
      trend: "+12%",
      trendUp: true,
      color: "from-blue-500/10 to-blue-500/5",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-200",
      description: "Active platform users"
    },
    { 
      label: "Active Stylists", 
      value: stylists.length, 
      icon: Scissors, 
      trend: "+3",
      trendUp: true,
      color: "from-purple-500/10 to-purple-500/5",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-200",
      description: "Verified professionals"
    },
    { 
      label: "Total Bookings", 
      value: bookings.length, 
      icon: Calendar, 
      trend: "+18%",
      trendUp: true,
      color: "from-green-500/10 to-green-500/5",
      iconColor: "text-green-600",
      bgColor: "bg-green-100",
      borderColor: "border-green-200",
      description: "All time appointments"
    },
    { 
      label: "Revenue", 
      value: `£${totalRevenue.toLocaleString()}`, 
      icon: DollarSign, 
      trend: "+23%",
      trendUp: true,
      color: "from-amber-500/10 to-amber-500/5",
      iconColor: "text-amber-600",
      bgColor: "bg-amber-100",
      borderColor: "border-amber-200",
      description: "Total platform revenue"
    },
  ];

  const monthlyData = [
    { month: "Oct", amount: 12400 },
    { month: "Nov", amount: 15200 },
    { month: "Dec", amount: 18600 },
    { month: "Jan", amount: 14800 },
    { month: "Feb", amount: 17200 },
    { month: "Mar", amount: 16500 },
  ];

  const recentActivity = [
    { type: "booking", user: "Sarah Johnson", action: "booked", target: "Knotless Braids", time: "5 min ago", status: "pending" },
    { type: "stylist", user: "Angela Johnson", action: "completed", target: "Booking #B123", time: "1 hour ago", status: "completed" },
    { type: "review", user: "Lisa Thompson", action: "left a review for", target: "Maria Smith", time: "3 hours ago", status: "review" },
    { type: "payment", user: "System", action: "processed payout for", target: "3 stylists", time: "5 hours ago", status: "payment" },
  ];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const maxAmount = Math.max(...monthlyData.map(d => d.amount));

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5" />
              Admin Dashboard
            </motion.div>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              Live Overview
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Welcome, Admin</h2>
          <p className="text-muted-foreground mt-1 text-sm">Monitor platform performance and manage operations</p>
        </div>

      
      </motion.div>

      {/* Main Stats Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="bg-card rounded-xl p-5 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-lg group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 px-2 py-1 rounded-full ${
                stat.trendUp ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
              }`}>
                {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-primary mb-1">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="text-[10px] text-muted-foreground/60 mt-1">{stat.description}</p>
          </motion.div>
        ))}
      </motion.div>

     

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings - Takes 2 columns */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-lg text-primary">Recent Bookings</h3>
                  <p className="text-xs text-muted-foreground">Latest appointments across platform</p>
                </div>
              </div>
              <Link 
                to="/admin/bookings" 
                className="text-accent hover:text-accent/80 text-sm font-medium flex items-center gap-1 group"
              >
                View All
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
            
            <div className="space-y-3">
              {bookings.slice(0, 5).map((b, i) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="flex items-center justify-between p-4 rounded-lg bg-accent/5 border border-accent/10 hover:border-accent/30 transition-all duration-300 hover:shadow-md">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-serif font-semibold text-primary">{b.service}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          b.status === "upcoming" ? "bg-emerald-100 text-emerald-700" :
                          b.status === "completed" ? "bg-blue-100 text-blue-700" :
                          b.status === "pending-approval" ? "bg-amber-100 text-amber-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {b.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-accent" /> {b.customerName} 
                        <span className="text-muted-foreground/30">→</span> 
                        <Scissors className="w-3.5 h-3.5 text-accent" /> {b.stylistName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-accent" />
                        {b.date} at {b.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">£{b.price}</p>
                      <p className="text-xs text-muted-foreground">#{b.id.slice(-4)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View More Link */}
            <div className="mt-4 pt-4 border-t border-border">
              <Link 
                to="/admin/bookings" 
                className="text-sm text-accent hover:text-accent/80 font-medium flex items-center justify-between group"
              >
                <span>View all bookings</span>
                <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>

      
      </div>

      {/* Quick Actions Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Manage Users", icon: Users, link: "/admin/users", color: "from-blue-500/10 to-blue-500/5" },
          { label: "Stylist Approvals", icon: UserPlus, link: "/admin/stylist-approvals", color: "from-purple-500/10 to-purple-500/5" },
          { label: "View Disputes", icon: AlertCircle, link: "/admin/disputes", color: "from-amber-500/10 to-amber-500/5" },
          { label: "Analytics", icon: BarChart, link: "/admin/analytics", color: "from-green-500/10 to-green-500/5" },
        ].map((item, i) => (
          <Link key={i} to={item.link}>
            <motion.div
              whileHover={{ y: -2 }}
              className="bg-card rounded-xl p-4 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-md cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <item.icon className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm font-medium text-primary">{item.label}</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;