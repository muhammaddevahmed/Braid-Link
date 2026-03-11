import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, Shield, Clock, Mail, 
  ChevronDown, ChevronRight, AlertCircle, 
  CheckCircle, Archive, Trash2, Star,
  Bell, User, Calendar, Tag, Filter
} from "lucide-react";

interface Message {
  id: string;
  from: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
  type: "dispute" | "general" | "booking" | "payment" | "verification";
}

const CustomerMessages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      from: "Admin Team",
      subject: "Dispute Resolution: Booking #B4",
      message: "We have reviewed your dispute regarding the Cornrows service with Angela Johnson. After investigating both sides, we have issued a partial refund of $37.50 (50% of the service cost) to your original payment method. This should appear in your account within 3-5 business days. If you have any questions, please don't hesitate to reply to this message.",
      date: "2026-03-05",
      read: false,
      type: "dispute"
    },
    {
      id: "m2",
      from: "Admin Team",
      subject: "Account Verification Complete",
      message: "Your account has been successfully verified. You can now book appointments and leave reviews. Thank you for joining BraidLink! We're excited to have you as part of our community.",
      date: "2026-02-28",
      read: true,
      type: "verification"
    },
    {
      id: "m3",
      from: "Support Team",
      subject: "Booking Confirmation: #B123",
      message: "Your appointment with Sarah Johnson has been confirmed for March 15, 2026 at 2:00 PM. Please remember to arrive 10 minutes early. You can reschedule or cancel up to 24 hours before the appointment.",
      date: "2026-03-01",
      read: true,
      type: "booking"
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const getMessageIcon = (type: string) => {
    switch(type) {
      case "dispute": return AlertCircle;
      case "verification": return CheckCircle;
      case "booking": return Calendar;
      case "payment": return Mail;
      default: return MessageSquare;
    }
  };

  const getMessageColor = (type: string) => {
    switch(type) {
      case "dispute": return "text-orange-600 bg-orange-100";
      case "verification": return "text-green-600 bg-green-100";
      case "booking": return "text-blue-600 bg-blue-100";
      case "payment": return "text-purple-600 bg-purple-100";
      default: return "text-gray-600 bg-gray-100";
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

  const filteredMessages = messages;

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
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              Inbox
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Messages</h2>
          <p className="text-detail mt-1 font-brand">
            {unreadCount > 0 
              ? `You have ${unreadCount} unread message${unreadCount > 1 ? 's' : ''}`
              : 'No unread messages'
            }
          </p>
        </div>
      </motion.div>



      {/* Messages List */}
      {filteredMessages.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-card rounded-2xl p-12 border border-border/50 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-accent" />
          </div>
          <h3 className="font-serif text-xl font-bold text-primary mb-2">No messages found</h3>
          <p className="text-detail mb-6 max-w-sm mx-auto">
            Your inbox is empty. When you receive messages, they'll appear here.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((msg, idx) => {
            const Icon = getMessageIcon(msg.type);
            const colorClass = getMessageColor(msg.type);
            const isSelected = selectedMessage === msg.id;

            return (
              <motion.div
                key={msg.id}
                custom={idx}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className={`group rounded-2xl border-2 transition-all duration-300 overflow-hidden cursor-pointer ${
                  isSelected 
                    ? "border-accent shadow-xl" 
                    : msg.read 
                      ? "border-border/50 hover:border-accent/30 hover:shadow-lg" 
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
                      <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-serif font-semibold text-primary">{msg.from}</h3>
                          {!msg.read && (
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                          )}
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            msg.type === "dispute" ? "bg-orange-100 text-orange-700" :
                            msg.type === "verification" ? "bg-green-100 text-green-700" :
                            msg.type === "booking" ? "bg-blue-100 text-blue-700" :
                            "bg-gray-100 text-gray-700"
                          }`}>
                            {msg.type.charAt(0).toUpperCase() + msg.type.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-primary mb-1">{msg.subject}</p>
                        <div className="flex items-center gap-3 text-xs text-detail">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(msg.date)}
                          </span>
                          {msg.type === "dispute" && (
                            <span className="flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
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
                        className="text-detail"
                      >
                        <ChevronDown className="w-5 h-5" />
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
                        <div className="border-t border-border pt-4">
                          <div className="bg-muted/30 rounded-xl p-4 mb-4">
                            <p className="text-sm text-detail leading-relaxed whitespace-pre-line">
                              {msg.message}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button 
                                className="p-2 rounded-lg hover:bg-accent/10 text-accent transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Reply functionality
                                }}
                              >
                                <MessageSquare className="w-4 h-4" />
                              </button>
                              <button 
                                className="p-2 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Archive functionality
                                }}
                              >
                                <Archive className="w-4 h-4" />
                              </button>
                              <button 
                                className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                                onClick={(e) => deleteMessage(msg.id, e)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {msg.type === "dispute" && (
                              <button 
                                className="btn-cta text-xs px-4 py-2 rounded-lg flex items-center gap-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // View dispute details
                                }}
                              >
                                View Dispute Details
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            )}

                            {msg.type === "booking" && (
                              <button 
                                className="btn-primary text-xs px-4 py-2 rounded-lg flex items-center gap-2"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // View booking details
                                }}
                              >
                                View Booking
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            )}
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

      {/* Footer Stats */}
      {filteredMessages.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between text-xs text-detail pt-2"
        >
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-accent" />
            <span>{filteredMessages.length} message{filteredMessages.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 text-accent" />
            <span>{unreadCount} unread</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CustomerMessages;