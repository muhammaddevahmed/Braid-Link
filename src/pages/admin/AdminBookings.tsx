import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bookings, stylists } from "@/data/demo-data";
import { 
  Calendar, Clock, DollarSign, User, Scissors, Search, 
  Filter, ChevronDown, ChevronUp, Trash2, CheckCircle, 
  XCircle, AlertCircle, TrendingUp, Users, Star, Activity
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
          bg: "bg-blue-100", 
          text: "text-blue-700", 
          icon: Calendar,
          label: "Upcoming"
        };
      case "completed":
        return { 
          bg: "bg-green-100", 
          text: "text-green-700", 
          icon: CheckCircle,
          label: "Completed"
        };
      case "pending":
      case "pending-approval":
        return { 
          bg: "bg-amber-100", 
          text: "text-amber-700", 
          icon: AlertCircle,
          label: "Pending"
        };
      case "cancelled":
      case "rejected":
        return { 
          bg: "bg-red-100", 
          text: "text-red-700", 
          icon: XCircle,
          label: "Cancelled"
        };
      default:
        return { 
          bg: "bg-gray-100", 
          text: "text-gray-700", 
          icon: AlertCircle,
          label: status
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
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Booking Management
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">All Bookings</h2>
          <p className="text-detail mt-1 font-brand">Monitor and manage all platform appointments</p>
        </div>

       
      </motion.div>

     

      {/* Search and Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-2xl p-5 border border-border/50 shadow-lg"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <input
              type="text"
              placeholder="Search by service, customer, or stylist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
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
              className="px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>

          
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || statusFilter !== "all" || dateFilter !== "all") && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
            <span className="text-xs text-detail">Active filters:</span>
            {searchTerm && (
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm("")} className="hover:text-primary/80">×</button>
              </span>
            )}
            {statusFilter !== "all" && (
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1">
                Status: {statusFilter}
                <button onClick={() => setStatusFilter("all")} className="hover:text-primary/80">×</button>
              </span>
            )}
            {dateFilter !== "all" && (
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1">
                Date: {dateFilter}
                <button onClick={() => setDateFilter("all")} className="hover:text-primary/80">×</button>
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
        className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-xl"
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
                      className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Scissors className="w-4 h-4 text-primary" />
                          <span className="font-medium text-primary">{booking.service}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-detail" />
                          <span className="text-detail">{booking.customerName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-detail" />
                          <span className="text-detail">{booking.stylistName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-primary font-medium">{formatDate(booking.date)}</span>
                          <span className="text-xs text-detail flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {booking.time}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-primary">${booking.price}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1 w-fit ${status.bg} ${status.text}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          
                          
                          <button
                            onClick={() => deleteBooking(booking.id)}
                            className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
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
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-bold text-primary mb-2">No bookings found</h3>
            <p className="text-detail mb-6 max-w-sm mx-auto">
              No bookings match your search criteria. Try adjusting your filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setDateFilter("all");
              }}
              className="text-primary font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Table Footer */}
        {sortedBookings.length > 0 && (
          <div className="px-6 py-4 border-t border-border flex items-center justify-between">
            <p className="text-xs text-detail">
              Showing {Math.min(startIndex + 1, sortedBookings.length)} - {Math.min(startIndex + itemsPerPage, sortedBookings.length)} of {sortedBookings.length} bookings
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-detail">Rows per page:</span>
                <select 
                  className="text-xs border border-border rounded-lg px-2 py-1 bg-background"
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
                  className="p-1 rounded-lg border border-border hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronDown className="w-4 h-4 text-detail rotate-90" />
                </button>
                <span className="text-sm text-primary">Page {currentPage} of {totalPages}</span>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1 rounded-lg border border-border hover:bg-primary/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronUp className="w-4 h-4 text-detail rotate-90" />
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