import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, Shield, Clock, Mail, AlertCircle,
  CheckCircle, Archive, Trash2, ChevronDown, ChevronRight,
  Bell, User, Calendar, Tag, Filter, AlertTriangle,
  Flag, ThumbsUp, ThumbsDown, Info, Star, Search,
  Inbox, BadgeCheck, Zap
} from "lucide-react";

interface Message {
  id: string;
  from: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  type: "dispute" | "general" | "warning" | "approval" | "info";
}

const StylistMessages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      from: "Admin Team",
      subject: "⚠️ Dispute Resolution: Booking #B3",
      message: "We have reviewed the dispute filed by Lisa Thompson regarding the Box Braids service. After investigation, we found that the braids came undone within a week due to improper technique. We have issued a partial refund to the customer and placed a warning on your account. Please ensure all services meet quality standards. Repeated violations may result in account suspension.\n\nIf you have any questions about this decision, please reply to this message or contact our dispute resolution team.",
      date: "2026-02-22",
      read: false,
      type: "dispute"
    },
    {
      id: "m2",
      from: "Admin Team",
      subject: "🎉 Stylist Application Approved",
      message: "Congratulations! Your stylist application has been approved. You can now start accepting bookings and managing your profile. Welcome to the BraidBook community!\n\nHere are some next steps:\n• Complete your profile with photos\n• Set your availability schedule\n• Add your services and pricing\n• Share your portfolio to attract clients",
      date: "2026-01-10",
      read: true,
      type: "approval"
    },
    {
      id: "m3",
      from: "Support Team",
      subject: "📅 Upcoming Booking Reminder",
      message: "You have an upcoming booking tomorrow at 2:00 PM with Sarah Johnson for Knotless Braids. Please ensure you're prepared and arrive on time. You can view the booking details in your dashboard.",
      date: "2026-03-04",
      read: false,
      type: "info"
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread" | "dispute" | "info">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getMessageIcon = (type: string) => {
    switch(type) {
      case "dispute": return AlertTriangle;
      case "warning": return AlertCircle;
      case "approval": return CheckCircle;
      case "info": return Info;
      default: return MessageSquare;
    }
  };

  const getMessageColor = (type: string) => {
    switch(type) {
      case "dispute": return {
        bg: "bg-rose-50",
        text: "text-rose-700",
        icon: AlertTriangle,
        border: "border-rose-200",
        gradient: "from-rose-500/10 to-rose-500/5"
      };
      case "warning": return {
        bg: "bg-orange-50",
        text: "text-orange-700",
        icon: AlertCircle,
        border: "border-orange-200",
        gradient: "from-orange-500/10 to-orange-500/5"
      };
      case "approval": return {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        icon: CheckCircle,
        border: "border-emerald-200",
        gradient: "from-emerald-500/10 to-emerald-500/5"
      };
      case "info": return {
        bg: "bg-blue-50",
        text: "text-blue-700",
        icon: Info,
        border: "border-blue-200",
        gradient: "from-blue-500/10 to-blue-500/5"
      };
      default: return {
        bg: "bg-gray-50",
        text: "text-gray-700",
        icon: MessageSquare,
        border: "border-gray-200",
        gradient: "from-gray-500/10 to-gray-500/5"
      };
    }
  };

  const markAsRead = (id: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      )
    );
  };

  const deleteMessage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMessages(prev => prev.filter(msg => msg.id !== id));
    if (selectedMessage === id) {
      setSelectedMessage(null);
    }
  };

  const archiveMessage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Archive functionality
    console.log("Archive message", id);
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === "unread" && msg.read) return false;
    if (filter === "dispute" && msg.type !== "dispute") return false;
    if (filter === "info" && !["info", "approval"].includes(msg.type)) return false;
    if (searchTerm && !msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !msg.message.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const unreadCount = messages.filter(m => !m.read).length;

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
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
              <Mail className="w-3.5 h-3.5" />
              Message Center
            </span>
            {unreadCount > 0 && (
              <span className="bg-rose-100 text-rose-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <Bell className="w-3.5 h-3.5" />
                {unreadCount} unread
              </span>
            )}
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Messages</h2>
          <p className="text-muted-foreground mt-1 text-sm">Communications from admin and support team</p>
        </div>
      </motion.div>

      {/* Messages List */}
      {filteredMessages.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-card rounded-xl p-12 border border-border text-center"
        >
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <Inbox className="w-8 h-8 text-accent" />
          </div>
          <h3 className="font-serif text-xl font-bold text-primary mb-2">No messages found</h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            {searchTerm 
              ? "No messages match your search criteria. Try different keywords."
              : filter !== "all" 
                ? `No ${filter} messages in your inbox.`
                : "Your inbox is empty. When you receive messages, they'll appear here."
            }
          </p>
          {(searchTerm || filter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilter("all");
              }}
              className="text-accent font-semibold hover:underline"
            >
              Clear filters
            </button>
          )}
        </motion.div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((msg, idx) => {
            const colors = getMessageColor(msg.type);
            const Icon = colors.icon;
            const isSelected = selectedMessage === msg.id;

            return (
              <motion.div
                key={msg.id}
                custom={idx}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className={`group rounded-xl border-2 transition-all duration-300 overflow-hidden cursor-pointer ${
                  isSelected 
                    ? "border-accent shadow-xl" 
                    : msg.read 
                      ? "border-border hover:border-accent/30 hover:shadow-md" 
                      : "border-accent/30 bg-accent/5"
                }`}
                onClick={() => {
                  setSelectedMessage(isSelected ? null : msg.id);
                  if (!msg.read) markAsRead(msg.id);
                }}
              >
                {/* Message Header */}
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-serif font-semibold text-primary">{msg.from}</h3>
                          {!msg.read && (
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                          )}
                          <span className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
                            {msg.type.charAt(0).toUpperCase() + msg.type.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-primary mb-1">{msg.subject}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-accent" />
                            {formatDate(msg.date)}
                          </span>
                          {msg.type === "dispute" && (
                            <span className="flex items-center gap-1 text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                              <AlertTriangle className="w-3 h-3" />
                              Action Required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {!msg.read && (
                        <span className="bg-accent/10 text-accent text-xs px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                      <motion.div
                        animate={{ rotate: isSelected ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          isSelected ? 'bg-accent text-primary' : 'bg-accent/10 text-accent'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Expanded Message Content */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        <div className="border-t border-border pt-4 space-y-4">
                          {/* Message Content */}
                          <div className={`bg-gradient-to-br ${colors.gradient} rounded-lg p-4 border ${colors.border}`}>
                            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                              {msg.message}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                             
                              <button 
                                className="w-8 h-8 rounded-lg hover:bg-rose-50 text-rose-600 transition-colors flex items-center justify-center"
                                onClick={(e) => deleteMessage(msg.id, e)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {msg.type === "approval" && (
                              <button 
                                className="bg-accent text-primary text-xs px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-all flex items-center gap-1"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Go to dashboard
                                }}
                              >
                                Go to Dashboard
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>

                          {/* Message Meta */}
                          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-accent/5 p-3 rounded-lg border border-accent/10">
                            <Info className="w-3.5 h-3.5 text-accent" />
                            <span>Message ID: {msg.id} • Sent via admin portal</span>
                            <BadgeCheck className="w-3.5 h-3.5 text-accent ml-auto" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StylistMessages;