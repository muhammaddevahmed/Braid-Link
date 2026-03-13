import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  X,
  DollarSign,
  Clock,
  Wallet,
  Banknote,
  CreditCard,
  Search,
  Eye,
  Download,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Calendar,
  User,
  Receipt,
  Shield,
  Sparkles,
  BadgeCheck,
  Zap,
  ArrowUpRight,
  Filter
} from "lucide-react";

type WithdrawalRequest = {
  id: string;
  stylist: string;
  amount: number;
  method: string;
  date: string;
  status: "pending" | "approved" | "rejected";
  account: string;
  processingTime: string;
  approvedDate?: string;
};

const AdminWithdrawals = () => {
  const [requests, setRequests] = useState<WithdrawalRequest[]>([
    {
      id: "w1",
      stylist: "Angela Johnson",
      amount: 500,
      method: "PayPal",
      date: "2026-03-05",
      status: "pending",
      account: "angela.j@email.com",
      processingTime: "2-3 days",
    },
    {
      id: "w2",
      stylist: "Destiny Williams",
      amount: 800,
      method: "Bank Transfer",
      date: "2026-03-04",
      status: "pending",
      account: "****4532",
      processingTime: "3-4 days",
    },
    {
      id: "w3",
      stylist: "Maya Robinson",
      amount: 1200,
      method: "PayPal",
      date: "2026-03-03",
      status: "approved",
      account: "maya.r@email.com",
      processingTime: "2-3 days",
      approvedDate: "2026-03-04",
    },
    {
      id: "w4",
      stylist: "Tiffany Moore",
      amount: 350,
      method: "Bank Transfer",
      date: "2026-03-01",
      status: "approved",
      account: "****9876",
      processingTime: "3-4 days",
      approvedDate: "2026-03-02",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [methodFilter, setMethodFilter] = useState<string>("all");
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "approved",
              approvedDate: new Date().toISOString().split("T")[0],
            }
          : r
      )
    );
  };

  const handleReject = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-amber-50",
          text: "text-amber-700",
          icon: Clock,
          label: "Pending",
          border: "border-amber-200"
        };
      case "approved":
        return {
          bg: "bg-emerald-50",
          text: "text-emerald-700",
          icon: CheckCircle,
          label: "Approved",
          border: "border-emerald-200"
        };
      case "rejected":
        return {
          bg: "bg-rose-50",
          text: "text-rose-700",
          icon: XCircle,
          label: "Rejected",
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

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "PayPal":
        return <Wallet className="w-4 h-4 text-blue-600" />;
      case "Bank Transfer":
        return <Banknote className="w-4 h-4 text-purple-600" />;
      default:
        return <CreditCard className="w-4 h-4 text-gray-600" />;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "PayPal":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Bank Transfer":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const filteredRequests = requests.filter((r) => {
    if (searchTerm && !r.stylist.toLowerCase().includes(searchTerm.toLowerCase()))
      return false;
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (methodFilter !== "all" && r.method !== methodFilter) return false;
    return true;
  });

  const stats = {
    total: requests.reduce((sum, r) => sum + r.amount, 0),
    pending: requests.filter((r) => r.status === "pending").length,
    approved: requests.filter((r) => r.status === "approved").length,
    pendingAmount: requests
      .filter((r) => r.status === "pending")
      .reduce((sum, r) => sum + r.amount, 0),
    approvedAmount: requests
      .filter((r) => r.status === "approved")
      .reduce((sum, r) => sum + r.amount, 0),
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const avgRequest =
    requests.length > 0 ? Math.round(stats.total / requests.length) : 0;

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
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
              <Receipt className="w-3.5 h-3.5" />
              Withdrawal Management
            </span>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              {stats.pending} Pending
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">
            Withdrawal Requests
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Process stylist withdrawal requests
          </p>
        </div>

        {/* Export Button */}
        <button className="px-4 py-2.5 rounded-lg border border-border hover:border-accent/30 hover:bg-accent/5 transition-all flex items-center gap-2 text-sm text-muted-foreground">
          <Download className="w-4 h-4 text-accent" />
          Export Report
        </button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        {[
          { label: "Total", value: `$${stats.total}`, icon: DollarSign, color: "bg-accent/10 text-accent", iconColor: "text-accent" },
          { label: "Pending", value: stats.pending, icon: Clock, color: "bg-amber-100 text-amber-700", iconColor: "text-amber-600" },
          { label: "Approved", value: stats.approved, icon: CheckCircle, color: "bg-emerald-100 text-emerald-700", iconColor: "text-emerald-600" },
          { label: "Pending Amt", value: `$${stats.pendingAmount}`, icon: AlertCircle, color: "bg-orange-100 text-orange-700", iconColor: "text-orange-600" },
          { label: "Approved Amt", value: `$${stats.approvedAmount}`, icon: TrendingUp, color: "bg-blue-100 text-blue-700", iconColor: "text-blue-600" },
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
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
              placeholder="Search stylist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            >
              <option value="all">All Methods</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || statusFilter !== "all" || methodFilter !== "all") && (
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
            {methodFilter !== "all" && (
              <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full flex items-center gap-1">
                Method: {methodFilter}
                <button onClick={() => setMethodFilter("all")} className="hover:text-accent/80">×</button>
              </span>
            )}
          </div>
        )}
      </motion.div>

      {/* Requests List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredRequests.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-card rounded-xl border border-border shadow-lg"
            >
              <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-10 h-10 text-accent" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-2">No requests found</h3>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                No withdrawal requests match your search criteria. Try adjusting your filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setMethodFilter("all");
                }}
                className="text-accent font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            filteredRequests.map((request, idx) => {
              const status = getStatusConfig(request.status);
              const StatusIcon = status.icon;
              const methodIcon = getMethodIcon(request.method);
              const methodColor = getMethodColor(request.method);
              const isExpanded = expandedRequest === request.id;

              return (
                <motion.div
                  key={request.id}
                  custom={idx}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  layout
                  className={`bg-card rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                    isExpanded 
                      ? "border-accent shadow-xl" 
                      : "border-border hover:border-accent/30 hover:shadow-md"
                  }`}
                >
                  <div className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-serif font-semibold text-lg text-primary">{request.stylist}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${methodColor}`}>
                            {methodIcon} {request.method}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5 bg-accent/5 px-2.5 py-1.5 rounded-full">
                            <DollarSign className="w-3.5 h-3.5 text-accent" />${request.amount}
                          </span>

                          <span className="flex items-center gap-1.5 bg-accent/5 px-2.5 py-1.5 rounded-full">
                            <Calendar className="w-3.5 h-3.5 text-accent" />
                            {formatDate(request.date)}
                          </span>

                          <span className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 border ${status.bg} ${status.text} ${status.border}`}>
                            <StatusIcon className="w-3.5 h-3.5" />
                            {status.label}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {request.status === "pending" && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleApprove(request.id)}
                              className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-all shadow-md flex items-center gap-2"
                            >
                              <Check className="w-4 h-4" /> Approve
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleReject(request.id)}
                              className="border border-rose-200 text-rose-600 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-rose-50 transition-all flex items-center gap-2"
                            >
                              <X className="w-4 h-4" /> Reject
                            </motion.button>
                          </>
                        )}

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setExpandedRequest(isExpanded ? null : request.id)}
                          className={`p-2.5 rounded-lg transition-all ${
                            isExpanded 
                              ? 'bg-accent text-primary' 
                              : 'hover:bg-accent/10 text-accent'
                          }`}
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-border">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
                                <p className="text-xs text-muted-foreground mb-2">Account Details</p>
                                <p className="text-sm font-medium text-primary">{request.account}</p>
                              </div>
                              <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
                                <p className="text-xs text-muted-foreground mb-2">Processing Time</p>
                                <p className="text-sm font-medium text-primary">{request.processingTime}</p>
                              </div>
                            </div>

                            {request.status === "approved" && request.approvedDate && (
                              <div className="mt-3 bg-emerald-50 rounded-lg p-3 flex items-center gap-2 border border-emerald-200">
                                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                                <span className="text-sm text-emerald-700">
                                  Approved on {formatDate(request.approvedDate)}
                                </span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Footer Stats */}
      {filteredRequests.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between text-xs text-muted-foreground bg-card/50 backdrop-blur-sm px-5 py-3 rounded-lg border border-border"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-accent" />
              <span>Pending: <strong className="text-primary">${stats.pendingAmount}</strong></span>
            </div>
            <div className="w-px h-3 bg-border" />
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Approved: <strong className="text-primary">${stats.approvedAmount}</strong></span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Showing {filteredRequests.length} of {requests.length} requests</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminWithdrawals;


