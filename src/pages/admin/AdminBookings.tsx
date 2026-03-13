import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bookings, stylists } from "@/data/demo-data";
import { 
  Calendar, Clock, DollarSign, User, Scissors, Search, 
  Filter, ChevronDown, ChevronUp, Trash2, CheckCircle, 
  XCircle, AlertCircle, TrendingUp, Users, Star, Activity,
  Eye, MoreVertical, Download, Sparkles, Zap, BadgeCheck,
  ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { toast } from "sonner";

const AdminBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bookingList, setBookingList] = useState(bookings);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "price">("date");
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "upcoming":
        return { 
          bg: "bg-blue-50", 
          text: "text-blue-700", 
          icon: Calendar,
          label: "Upcoming",
          border: "border-blue-200"
        };
      case "completed":
        return { 
          bg: "bg-emerald-50", 
          text: "text-emerald-700", 
          icon: CheckCircle,
          label: "Completed",
          border: "border-emerald-200"
        };
      case "pending":
      case "pending-approval":
        return { 
          bg: "bg-amber-50", 
          text: "text-amber-700", 
          icon: AlertCircle,
          label: "Pending",
          border: "border-amber-200"
        };
      case "cancelled":
      case "rejected":
        return { 
          bg: "bg-rose-50", 
          text: "text-rose-700", 
          icon: XCircle,
          label: "Cancelled",
          border: "border-rose-200"
        };
      default:
        return { 
          bg: "bg-gray-50", 
          text: "text-gray-700", 
          icon: AlertCircle,
          label: status,
          border: "border-gray-200"
        };
    }
  };

  const deleteBooking = (id: string) => {
    setBookingList(prev => prev.filter(b => b.id !== id));
    toast.success("Booking has been deleted.");
  };

  const filteredBookings = bookingList.filter(booking => {
    if (searchTerm && !booking.service.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !booking.stylistName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    if (statusFilter !== "all" && booking.status !== statusFilter) return false;
    
    if (dateFilter !== "all") {
      const bookingDate = new Date(booking.date + "T00:00:00");
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - bookingDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dateFilter === "today" && diffDays > 0) return false;
      if (dateFilter === "week" && diffDays > 7) return false;
      if (dateFilter === "month" && diffDays > 30) return false;
    }
    
    return true;
  });

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.price - a.price;
    }
  });

  const totalPages = Math.ceil(sortedBookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBookings = sortedBookings.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateFilter]);

  const stats = {
    total: bookingList.length,
    upcoming: bookingList.filter(b => b.status === "upcoming").length,
    completed: bookingList.filter(b => b.status === "completed").length,
    pending: bookingList.filter(b => b.status === "pending" || b.status === "pending-approval").length,
    cancelled: bookingList.filter(b => b.status === "cancelled" || b.status === "rejected").length,
    revenue: bookingList.reduce((sum, b) => sum + b.price, 0)
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
        day: "numeric",
        year: "numeric"
      });
    }
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
  };

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
            <span className="bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Booking Management
            </span>
           
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">All Bookings</h2>
          <p className="text-muted-foreground mt-1 text-sm">Monitor and manage all platform appointments</p>
        </div>

     
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-6 gap-4"
      >
        {[
          { label: "Total", value: stats.total, icon: Calendar, color: "bg-accent/10 text-accent", iconColor: "text-accent" },
          { label: "Upcoming", value: stats.upcoming, icon: Calendar, color: "bg-blue-100 text-blue-700", iconColor: "text-blue-600" },
          { label: "Completed", value: stats.completed, icon: CheckCircle, color: "bg-emerald-100 text-emerald-700", iconColor: "text-emerald-600" },
          { label: "Pending", value: stats.pending, icon: AlertCircle, color: "bg-amber-100 text-amber-700", iconColor: "text-amber-600" },
          { label: "Cancelled", value: stats.cancelled, icon: XCircle, color: "bg-rose-100 text-rose-700", iconColor: "text-rose-600" },
          { label: "Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: DollarSign, color: "bg-purple-100 text-purple-700", iconColor: "text-purple-600" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-lg p-4 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-md flex items-center gap-3"
          >
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
              <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-xl p-5 border border-border shadow-md"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
            <input
              type="text"
              placeholder="Search by service, customer, or stylist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            >
              <option value="all">All Status</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "price")}
              className="px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            >
              <option value="date">Latest First</option>
              <option value="price">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || statusFilter !== "all" || dateFilter !== "all") && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground">Active filters:</span>
            {searchTerm && (
              <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full flex items-center gap-1">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm("")} className="hover:text-accent/80">×</button>
              </span>
            )}
            {statusFilter !== "all" && (
              <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full flex items-center gap-1">
                Status: {statusFilter}
                <button onClick={() => setStatusFilter("all")} className="hover:text-accent/80">×</button>
              </span>
            )}
            {dateFilter !== "all" && (
              <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full flex items-center gap-1">
                Date: {dateFilter}
                <button onClick={() => setDateFilter("all")} className="hover:text-accent/80">×</button>
              </span>
            )}
          </div>
        )}
      </motion.div>

      {/* Bookings Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl border border-border overflow-hidden shadow-lg"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-6 py-4 font-semibold text-primary">Service</th>
                <th className="text-left px-6 py-4 font-semibold text-primary">Customer</th>
                <th className="text-left px-6 py-4 font-semibold text-primary">Stylist</th>
                <th className="text-left px-6 py-4 font-semibold text-primary">Date & Time</th>
                <th className="text-left px-6 py-4 font-semibold text-primary">Price</th>
                <th className="text-left px-6 py-4 font-semibold text-primary">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {paginatedBookings.map((booking, idx) => {
                  const status = getStatusConfig(booking.status);
                  const StatusIcon = status.icon;

                  return (
                    <motion.tr
                      key={booking.id}
                      custom={idx}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -20 }}
                      className="border-b border-border last:border-0 hover:bg-accent/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                            <Scissors className="w-4 h-4 text-accent" />
                          </div>
                          <span className="font-medium text-primary">{booking.service}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{booking.customerName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{booking.stylistName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-primary font-medium">{formatDate(booking.date)}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3 text-accent" /> {booking.time}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-primary">${booking.price}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1 w-fit border ${status.bg} ${status.text} ${status.border}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-accent/10 text-accent transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-accent/10 text-accent transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteBooking(booking.id)}
                            className="p-1.5 rounded-lg hover:bg-rose-100 text-rose-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {sortedBookings.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-accent" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-2">No bookings found</h3>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              No bookings match your search criteria. Try adjusting your filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setDateFilter("all");
              }}
              className="text-accent font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Table Footer */}
        {sortedBookings.length > 0 && (
          <div className="px-6 py-4 border-t border-border flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Showing {Math.min(startIndex + 1, sortedBookings.length)} - {Math.min(startIndex + itemsPerPage, sortedBookings.length)} of {sortedBookings.length} bookings
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Rows per page:</span>
                <select 
                  className="text-xs border border-border rounded-lg px-2 py-1.5 bg-background focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg border border-border hover:bg-accent/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronDown className="w-4 h-4 text-muted-foreground rotate-90" />
                </button>
                <span className="text-sm text-primary">Page {currentPage} of {totalPages}</span>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg border border-border hover:bg-accent/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronUp className="w-4 h-4 text-muted-foreground rotate-90" />
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminBookings;