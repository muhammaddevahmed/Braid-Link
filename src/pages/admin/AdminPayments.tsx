import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  DollarSign, CreditCard, TrendingUp, Calendar,
  Search, Filter, Download, Eye, ArrowUpRight,
  CheckCircle, XCircle, AlertCircle, Clock,
  ChevronDown, ChevronUp, FileText, Printer,
  Wallet, Receipt, Banknote
} from "lucide-react";

const AdminPayments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");
  const [expandedTransaction, setExpandedTransaction] = useState<string | null>(null);

  const transactions = [
    { id: "t1", customer: "Sarah Mitchell", stylist: "Angela Johnson", service: "Box Braids", amount: 120, fee: 12, date: "2026-02-28", status: "completed", paymentMethod: "Visa •••• 4242", refundable: true },
    { id: "t2", customer: "Lisa Thompson", stylist: "Tiffany Moore", service: "Crochet Braids", amount: 100, fee: 10, date: "2026-02-22", status: "completed", paymentMethod: "Mastercard •••• 5555", refundable: true },
    { id: "t3", customer: "Kim Brown", stylist: "Destiny Williams", service: "Goddess Locs", amount: 200, fee: 20, date: "2026-02-10", status: "completed", paymentMethod: "PayPal", refundable: true },
    { id: "t4", customer: "Aisha Patel", stylist: "Jasmine Carter", service: "Fulani Braids", amount: 140, fee: 14, date: "2026-02-20", status: "completed", paymentMethod: "Visa •••• 1234", refundable: true },
    { id: "t5", customer: "Sarah Mitchell", stylist: "Jasmine Carter", service: "Lemonade Braids", amount: 130, fee: 13, date: "2026-02-15", status: "refunded", paymentMethod: "Amex •••• 9876", refundable: false },
  ];

  const getStatusConfig = (status: string) => {
    switch(status) {
      case "completed":
        return { 
          bg: "bg-green-100", 
          text: "text-green-700", 
          icon: CheckCircle,
          label: "Completed"
        };
      case "refunded":
        return { 
          bg: "bg-red-100", 
          text: "text-red-700", 
          icon: XCircle,
          label: "Refunded"
        };
      case "pending":
        return { 
          bg: "bg-amber-100", 
          text: "text-amber-700", 
          icon: Clock,
          label: "Pending"
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

  const filteredTransactions = transactions.filter(t => {
    if (searchTerm && !t.customer.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !t.stylist.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !t.service.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    
    if (dateFilter !== "all") {
      const transactionDate = new Date(t.date + "T00:00:00");
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dateFilter === "week" && diffDays > 7) return false;
      if (dateFilter === "month" && diffDays > 30) return false;
    }
    
    return true;
  });

  const stats = {
    total: transactions.reduce((sum, t) => sum + t.amount, 0),
    fees: transactions.reduce((sum, t) => sum + t.fee, 0),
    count: transactions.length,
    completed: transactions.filter(t => t.status === "completed").length,
    refunded: transactions.filter(t => t.status === "refunded").length,
    average: Math.round(transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length)
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      year: "numeric"
    });
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
              <Wallet className="w-3.5 h-3.5" />
              Payment Management
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Transactions</h2>
          <p className="text-detail mt-1 font-brand">Monitor and manage all platform payments</p>
        </div>

        
      </motion.div>

      

      

      {/* Search and Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-5 border border-border/50 shadow-lg"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <input
              type="text"
              placeholder="Search by customer, stylist, or service..."
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
              <option value="completed">Completed</option>
              <option value="refunded">Refunded</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Time</option>
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

      {/* Transactions Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-6 py-4 font-semibold text-primary">Date</th>
                <th className="text-left px-6 py-4 font-semibold text-primary">Customer</th>
                <th className="text-left px-6 py-4 font-semibold text-primary">Stylist</th>
                <th className="text-left px-6 py-4 font-semibold text-primary">Service</th>
                <th className="text-left px-6 py-4 font-semibold text-primary">Amount</th>
                <th className="text-left px-6 py-4 font-semibold text-primary">Fee</th>
                <th className="text-left px-6 py-4 font-semibold text-primary">Status</th>
                
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredTransactions.map((t, idx) => {
                  const status = getStatusConfig(t.status);
                  const StatusIcon = status.icon;

                  return (
                    <motion.tr
                      key={t.id}
                      custom={idx}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -20 }}
                      className="border-b border-border last:border-0 hover:bg-primary/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-detail" />
                          <span className="text-detail">{formatDate(t.date)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-semibold text-primary">
                              {t.customer.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium text-primary">{t.customer}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-detail">{t.stylist}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-detail">{t.service}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-lg font-bold text-primary">${t.amount}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-detail">${t.fee}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1 w-fit ${status.bg} ${status.text}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                      </td>
                      
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredTransactions.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-bold text-primary mb-2">No transactions found</h3>
            <p className="text-detail mb-6 max-w-sm mx-auto">
              No transactions match your search criteria. Try adjusting your filters.
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
        {filteredTransactions.length > 0 && (
          <div className="px-6 py-4 border-t border-border flex items-center justify-between">
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button className="p-1 rounded-lg border border-border hover:bg-primary/5 transition-colors disabled:opacity-50">
                  <ChevronDown className="w-4 h-4 text-detail rotate-90" />
                </button>
                <span className="text-sm text-primary">Page 1 of 1</span>
                <button className="p-1 rounded-lg border border-border hover:bg-primary/5 transition-colors disabled:opacity-50">
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

export default AdminPayments;