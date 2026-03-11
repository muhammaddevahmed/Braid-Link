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
          bg: "bg-amber-100",
          text: "text-amber-700",
          icon: Clock,
          label: "Pending",
        };
      case "approved":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          icon: CheckCircle,
          label: "Approved",
        };
      case "rejected":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          icon: XCircle,
          label: "Rejected",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          icon: AlertCircle,
          label: status,
        };
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "PayPal":
        return <Wallet className="w-4 h-4" />;
      case "Bank Transfer":
        return <Banknote className="w-4 h-4" />;
      default:
        return <CreditCard className="w-4 h-4" />;
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
        className="flex justify-between items-center"
      >
        <div>
          <h2 className="text-3xl font-bold text-primary">
            Withdrawal Requests
          </h2>
          <p className="text-detail">Process stylist withdrawal requests</p>
        </div>

        
      </motion.div>

      

      {/* Search */}
      <div className="bg-card p-5 rounded-xl border">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4" />
            <input
              className="w-full pl-10 pr-3 py-2 border rounded-lg"
              placeholder="Search stylist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Requests */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredRequests.map((request, idx) => {
            const status = getStatusConfig(request.status);
            const StatusIcon = status.icon;
            const methodIcon = getMethodIcon(request.method);
            const isExpanded = expandedRequest === request.id;

            return (
              <motion.div
                key={request.id}
                custom={idx}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                layout
                className="bg-card border rounded-xl p-5"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{request.stylist}</h3>

                    <div className="flex gap-3 text-sm text-detail mt-1">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />${request.amount}
                      </span>

                      <span className="flex items-center gap-1">
                        {methodIcon} {request.method}
                      </span>

                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(request.date)}
                      </span>
                    </div>

                    <span
                      className={`text-xs px-2 py-1 rounded ${status.bg} ${status.text}`}
                    >
                      <StatusIcon className="w-3 h-3 inline mr-1" />
                      {status.label}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {request.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(request.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => handleReject(request.id)}
                          className="border px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    <button
                      onClick={() =>
                        setExpandedRequest(
                          isExpanded ? null : request.id
                        )
                      }
                      className="p-2"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 border-t pt-4 text-sm">
                    <p>
                      <b>Account:</b> {request.account}
                    </p>
                    <p>
                      <b>Processing:</b> {request.processingTime}
                    </p>

                    {request.status === "approved" && (
                      <p>
                        <b>Approved on:</b>{" "}
                        {formatDate(request.approvedDate ?? request.date)}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer Stats */}
      <div className="text-center text-xs text-detail">
        Pending: ${stats.pendingAmount} • Approved: ${stats.approvedAmount}
      </div>
    </div>
  );
};

export default AdminWithdrawals;