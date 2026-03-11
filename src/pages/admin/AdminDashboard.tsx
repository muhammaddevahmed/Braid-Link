import { motion } from "framer-motion";
import { 
  Users, Scissors, Calendar, DollarSign, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Activity, Clock, 
  CheckCircle, XCircle, Star, Award, Shield, Sparkles,
  UserCheck, UserPlus, Briefcase, CreditCard
} from "lucide-react";
import { bookings, stylists, users } from "@/data/demo-data";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const totalRevenue = stylists.reduce((a, s) => a + s.totalEarnings, 0);
  const totalPendingBookings = bookings.filter(b => b.status === "pending-approval").length;
  const totalCompletedBookings = bookings.filter(b => b.status === "completed").length;
  const totalActiveStylists = stylists.filter(s => s.verified).length;
  const averageRating = stylists.reduce((a, s) => a + s.rating, 0) / stylists.length;

  const stats = [
    { 
      label: "Total Users", 
      value: users.length, 
      icon: Users, 
      trend: "+12%",
      trendUp: true,
      color: "from-blue-500/20 to-blue-500/5",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    { 
      label: "Active Stylists", 
      value: stylists.length, 
      icon: Scissors, 
      trend: "+3",
      trendUp: true,
      color: "from-purple-500/20 to-purple-500/5",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    { 
      label: "Total Bookings", 
      value: bookings.length, 
      icon: Calendar, 
      trend: "+18%",
      trendUp: true,
      color: "from-green-500/20 to-green-500/5",
      iconColor: "text-green-600",
      bgColor: "bg-green-100"
    },
    { 
      label: "Revenue", 
      value: `$${totalRevenue.toLocaleString()}`, 
      icon: DollarSign, 
      trend: "+23%",
      trendUp: true,
      color: "from-amber-500/20 to-amber-500/5",
      iconColor: "text-amber-600",
      bgColor: "bg-amber-100"
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
              <Shield className="w-3.5 h-3.5" />
              Admin Dashboard
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Welcome, Admin</h2>
          <p className="text-detail mt-1 font-brand">Monitor platform performance and manage operations</p>
        </div>

       
      </motion.div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -4 }}
            className="bg-card rounded-2xl p-5 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${
                stat.trendUp ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"
              } px-2 py-1 rounded-full`}>
                {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </span>
            </div>
            <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
            <p className="text-sm text-detail">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings - Takes 2 columns */}
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
                  <h3 className="font-serif font-semibold text-lg text-primary">Recent Bookings</h3>
                  <p className="text-xs text-detail">Latest appointments across platform</p>
                </div>
              </div>
              <Link 
                to="/admin/bookings" 
                className="text-primary hover:text-primary/80 text-sm font-semibold flex items-center gap-1 group"
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
                  <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-serif font-semibold text-primary">{b.service}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          b.status === "upcoming" ? "bg-green-100 text-green-700" :
                          b.status === "completed" ? "bg-blue-100 text-blue-700" :
                          b.status === "pending-approval" ? "bg-yellow-100 text-yellow-700" :
                          "bg-gray-100 text-gray-700"
                        }`}>
                          {b.status}
                        </span>
                      </div>
                      <p className="text-sm text-detail flex items-center gap-2">
                        <Users className="w-3.5 h-3.5" /> {b.customerName} 
                        <span className="text-detail/50">→</span> 
                        <Scissors className="w-3.5 h-3.5" /> {b.stylistName}
                      </p>
                      <p className="text-xs text-detail mt-1">{b.date} at {b.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">${b.price}</p>
                      <p className="text-xs text-detail">Booking #{b.id.slice(-4)}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            
          </div>
        </motion.div>

       
      </div>

    

      
    </div>
  );
};

export default AdminDashboard;