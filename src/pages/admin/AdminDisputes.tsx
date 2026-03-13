import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, Check, X, Send, Mail, AlertCircle,
  Scale, Users, Calendar, Clock, Flag, Shield,
  ChevronDown, ChevronUp, Eye, FileText, ThumbsUp,
  ThumbsDown, AlertTriangle, Info, UserCheck,
  BadgeCheck, Sparkles, Zap, Filter, Search
} from "lucide-react";

const AdminDisputes = () => {
  const [disputes, setDisputes] = useState([
    { 
      id: "d1", 
      customer: "Sarah Mitchell", 
      stylist: "Angela Johnson", 
      service: "Cornrows", 
      reason: "Service was not as described. Braids were uneven and started coming loose after 3 days.",
      date: "2026-03-02", 
      status: "open", 
      priority: "high",
      messages: [] 
    },
    { 
      id: "d2", 
      customer: "Kim Brown", 
      stylist: "Destiny Williams", 
      service: "Goddess Locs", 
      reason: "Appointment was 2 hours late with no communication. Stylist didn't respond to messages.",
      date: "2026-02-28", 
      status: "open", 
      priority: "medium",
      messages: [] 
    },
    { 
      id: "d3", 
      customer: "Lisa Thompson", 
      stylist: "Nicole Davis", 
      service: "Box Braids", 
      reason: "Braids came undone within a week. Poor quality work.",
      date: "2026-02-20", 
      status: "resolved", 
      priority: "low",
      messages: [{ 
        from: "Admin", 
        to: "Both Parties", 
        text: "We have reviewed this dispute and issued a partial refund of $60 (50% of service cost) to the customer.", 
        date: "2026-02-22" 
      }] 
    },
  ]);

  const [contactingId, setContactingId] = useState<string | null>(null);
  const [contactMessage, setContactMessage] = useState("");
  const [contactTarget, setContactTarget] = useState("both");
  const [sentNotifications, setSentNotifications] = useState([]);
  const [expandedDispute, setExpandedDispute] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "open" | "resolved">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSendMessage = (dispute) => {
    const notification = {
      id: `n${Date.now()}`,
      disputeId: dispute.id,
      from: "Admin",
      to: contactTarget === "both" ? `${dispute.customer} & ${dispute.stylist}` : contactTarget === "customer" ? dispute.customer : dispute.stylist,
      text: contactMessage,
      date: new Date().toISOString().split("T")[0],
    };

    setDisputes(disputes.map((d) =>
      d.id === dispute.id ? { ...d, messages: [...d.messages, notification] } : d
    ));
    setSentNotifications([notification, ...sentNotifications]);
    setContactMessage("");
    setContactingId(null);
  };

  const handleResolve = (id: string) => {
    setDisputes(disputes.map(d => 
      d.id === id ? { ...d, status: "resolved" } : d
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case "high": return "bg-rose-50 text-rose-700 border-rose-200";
      case "medium": return "bg-amber-50 text-amber-700 border-amber-200";
      case "low": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusConfig = (status: string) => {
    switch(status) {
      case "open":
        return { 
          bg: "bg-amber-50", 
          text: "text-amber-700", 
          icon: AlertCircle,
          label: "Open",
          border: "border-amber-200"
        };
      case "resolved":
        return { 
          bg: "bg-emerald-50", 
          text: "text-emerald-700", 
          icon: Check,
          label: "Resolved",
          border: "border-emerald-200"
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

  const filteredDisputes = disputes.filter(d => {
    if (filter !== "all" && d.status !== filter) return false;
    if (searchTerm && !d.customer.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !d.stylist.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !d.service.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: disputes.length,
    open: disputes.filter(d => d.status === "open").length,
    resolved: disputes.filter(d => d.status === "resolved").length,
    high: disputes.filter(d => d.priority === "high").length,
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
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
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
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
              <Scale className="w-3.5 h-3.5" />
              Dispute Management
            </span>
            <span className="bg-amber-100 text-amber-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              {stats.open} Open
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Dispute Resolution</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage and resolve conflicts between customers and stylists</p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Total Disputes", value: stats.total, icon: Scale, color: "bg-accent/10 text-accent", iconColor: "text-accent" },
          { label: "Open", value: stats.open, icon: AlertCircle, color: "bg-amber-100 text-amber-700", iconColor: "text-amber-600" },
          { label: "Resolved", value: stats.resolved, icon: Check, color: "bg-emerald-100 text-emerald-700", iconColor: "text-emerald-600" },
          { label: "High Priority", value: stats.high, icon: Flag, color: "bg-rose-100 text-rose-700", iconColor: "text-rose-600" },
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
              placeholder="Search by customer, stylist, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
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
            {[
              { value: "all", label: "All Disputes" },
              { value: "open", label: "Open" },
              { value: "resolved", label: "Resolved" },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value as typeof filter)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f.value
                    ? "bg-accent text-primary shadow-sm"
                    : "border border-border bg-card hover:bg-accent/5 text-muted-foreground"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || filter !== "all") && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground">Active filters:</span>
            {searchTerm && (
              <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full flex items-center gap-1">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm("")} className="hover:text-accent/80">×</button>
              </span>
            )}
            {filter !== "all" && (
              <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full flex items-center gap-1">
                Status: {filter}
                <button onClick={() => setFilter("all")} className="hover:text-accent/80">×</button>
              </span>
            )}
          </div>
        )}
      </motion.div>

      {/* Disputes List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredDisputes.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-card rounded-xl border border-border shadow-lg"
            >
              <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Scale className="w-10 h-10 text-accent" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-2">No disputes found</h3>
              <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                {searchTerm || filter !== "all"
                  ? "No disputes match your search criteria."
                  : "There are no disputes to display."}
              </p>
              {(searchTerm || filter !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilter("all");
                  }}
                  className="text-accent font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </motion.div>
          ) : (
            filteredDisputes.map((dispute, idx) => {
              const status = getStatusConfig(dispute.status);
              const StatusIcon = status.icon;
              const isExpanded = expandedDispute === dispute.id;

              return (
                <motion.div
                  key={dispute.id}
                  custom={idx}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  layout
                  className="group"
                >
                  <div className={`bg-card rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                    dispute.status === "open" 
                      ? "border-amber-200 hover:border-amber-300 hover:shadow-md" 
                      : "border-emerald-200 hover:border-emerald-300 hover:shadow-md"
                  }`}>
                    {/* Main Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-12 h-12 rounded-lg ${
                            dispute.status === "open" ? "bg-amber-100" : "bg-emerald-100"
                          } flex items-center justify-center`}>
                            <Scale className={`w-5 h-5 ${
                              dispute.status === "open" ? "text-amber-600" : "text-emerald-600"
                            }`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-serif font-semibold text-lg text-primary">
                                {dispute.customer} <span className="text-muted-foreground mx-1">vs</span> {dispute.stylist}
                              </h3>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${status.bg} ${status.text} border ${status.border} flex items-center gap-1`}>
                                <StatusIcon className="w-3 h-3" />
                                {status.label}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1.5 bg-accent/5 px-2.5 py-1.5 rounded-full">
                                <Calendar className="w-3.5 h-3.5 text-accent" /> {formatDate(dispute.date)}
                              </span>
                              <span className="flex items-center gap-1.5 bg-accent/5 px-2.5 py-1.5 rounded-full">
                                <MessageSquare className="w-3.5 h-3.5 text-accent" /> {dispute.service}
                              </span>
                              <span className={`text-xs px-3 py-1.5 rounded-full border ${getPriorityColor(dispute.priority)}`}>
                                {dispute.priority} priority
                              </span>
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={() => setExpandedDispute(isExpanded ? null : dispute.id)}
                          className={`p-2.5 rounded-lg transition-all ${
                            isExpanded 
                              ? 'bg-accent text-primary' 
                              : 'hover:bg-accent/10 text-accent'
                          }`}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Dispute Reason */}
                      <div className="bg-accent/5 rounded-lg p-4 mb-4 border border-accent/10">
                        <p className="text-sm text-muted-foreground leading-relaxed">{dispute.reason}</p>
                      </div>

                      {/* Action Buttons */}
                      {dispute.status === "open" && (
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleResolve(dispute.id)}
                            className="bg-emerald-600 text-white px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1 hover:bg-emerald-700 transition-colors shadow-md"
                          >
                            <Check className="w-3.5 h-3.5" /> Mark as Resolved
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setContactingId(contactingId === dispute.id ? null : dispute.id)}
                            className="border border-accent text-accent px-4 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1 hover:bg-accent/5 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" /> Contact Parties
                          </motion.button>
                        </div>
                      )}
                    </div>

                    {/* Message History */}
                    {dispute.messages.length > 0 && (
                      <div className="px-6 pb-4">
                        <p className="text-xs font-medium text-primary mb-2 flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-accent" /> Communication History
                        </p>
                        <div className="space-y-2">
                          {dispute.messages.map((msg, i) => (
                            <div key={i} className="bg-accent/5 rounded-lg p-3 text-xs border border-accent/10">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium text-primary">{msg.from} → {msg.to}</span>
                                <span className="text-muted-foreground flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-accent" /> {msg.date}
                                </span>
                              </div>
                              <p className="text-muted-foreground">{msg.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Contact Form */}
                    {contactingId === dispute.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="border-t border-border pt-4">
                            <div className="bg-accent/5 rounded-lg p-4 border border-accent/20 space-y-4">
                              <div>
                                <label className="text-xs font-medium text-primary mb-2 block">Send To</label>
                                <div className="flex gap-2">
                                  {[
                                    { val: "both", label: "Both Parties" },
                                    { val: "customer", label: dispute.customer },
                                    { val: "stylist", label: dispute.stylist },
                                  ].map((t) => (
                                    <button
                                      key={t.val}
                                      onClick={() => setContactTarget(t.val)}
                                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                                        contactTarget === t.val
                                          ? "bg-accent text-primary border-accent"
                                          : "border-border hover:bg-accent/5 text-muted-foreground"
                                      }`}
                                    >
                                      {t.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <label className="text-xs font-medium text-primary mb-2 block">Message</label>
                                <textarea
                                  value={contactMessage}
                                  onChange={(e) => setContactMessage(e.target.value)}
                                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                                  placeholder="Type your message to the parties..."
                                />
                              </div>

                              <div className="flex gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleSendMessage(dispute)}
                                  disabled={!contactMessage.trim()}
                                  className="bg-accent text-primary text-sm px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 hover:bg-accent/90 transition-all shadow-md"
                                >
                                  <Send className="w-4 h-4" /> Send to Dashboard
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => setContactingId(null)}
                                  className="border border-border text-muted-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-accent/5 hover:text-accent transition-all flex items-center gap-2"
                                >
                                  <X className="w-4 h-4" /> Cancel
                                </motion.button>
                              </div>

                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Info className="w-3 h-3 text-accent" />
                                This message will appear in the user's dashboard notifications.
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Recent Notifications Sent */}
      {sentNotifications.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl p-6 border border-border shadow-md"
        >
          <h3 className="font-serif text-xl font-bold text-primary mb-4 flex items-center gap-2">
            <Send className="w-5 h-5 text-accent" />
            Recently Sent Notifications
          </h3>
          <div className="space-y-3">
            {sentNotifications.map((n) => (
              <div key={n.id} className="flex items-start gap-3 p-3 bg-accent/5 rounded-lg border border-accent/10">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-primary">To: {n.to}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3 text-accent" /> {n.date}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">{n.text}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Footer Stats */}
      {filteredDisputes.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-between text-xs text-muted-foreground bg-card/50 backdrop-blur-sm px-5 py-3 rounded-lg border border-border"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-accent" />
            <span>Showing {filteredDisputes.length} of {disputes.length} disputes</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Last updated: Today</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminDisputes;