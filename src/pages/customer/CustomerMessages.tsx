import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, Shield, Clock, Mail, 
  ChevronDown, ChevronRight, AlertCircle, 
  CheckCircle, Archive, Trash2, Star,
  Bell, User, Calendar, Tag, Filter,
  Inbox, Sparkles, Zap, BadgeCheck,
  Reply, Eye, EyeOff, Bookmark,
  Download, Share2, Flag
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
  const [filter, setFilter] = useState<string>("all");

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
      case "dispute": return "text-amber-600 bg-amber-100 border-amber-200";
      case "verification": return "text-emerald-600 bg-emerald-100 border-emerald-200";
      case "booking": return "text-blue-600 bg-blue-100 border-blue-200";
      case "payment": return "text-purple-600 bg-purple-100 border-purple-200";
      default: return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getMessageGradient = (type: string) => {
    switch(type) {
      case "dispute": return "from-amber-500/10 to-amber-500/5";
      case "verification": return "from-emerald-500/10 to-emerald-500/5";
      case "booking": return "from-blue-500/10 to-blue-500/5";
      case "payment": return "from-purple-500/10 to-purple-500/5";
      default: return "from-gray-500/10 to-gray-500/5";
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

  const filteredMessages = filter === "all" 
    ? messages 
    : messages.filter(m => m.type === filter);

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

  const messageTypes = [
    { value: "all", label: "All Messages", icon: Inbox },
    { value: "dispute", label: "Disputes", icon: AlertCircle },
    { value: "verification", label: "Verification", icon: CheckCircle },
    { value: "booking", label: "Bookings", icon: Calendar },
    { value: "payment", label: "Payments", icon: Mail },
  ];

  return (
    <div className="space-y-8">
      {/* Header - Premium redesign */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="bg-gradient-to-r from-accent/10 to-accent/5 text-accent text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-accent/20"
            >
              <Inbox className="w-3.5 h-3.5" />
              Message Center
            </motion.div>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">Messages</h2>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Bell className="w-4 h-4 text-accent" />
            <p className="text-sm">
              {unreadCount > 0 
                ? <span>You have <span className="font-semibold text-primary">{unreadCount}</span> unread message{unreadCount > 1 ? 's' : ''}</span>
                : 'No unread messages'
              }
            </p>
          </div>
        </div>

       
      </motion.div>

      {/* Messages List */}
      {filteredMessages.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-card to-secondary/5 rounded-3xl p-12 border border-border/50 shadow-xl text-center"
        >
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto">
              <MessageSquare className="w-10 h-10 text-accent" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-xl flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
          </div>
          
          <h3 className="font-serif text-2xl font-bold text-primary mb-3">No messages found</h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            Your inbox is empty. When you receive messages, they'll appear here.
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg, idx) => {
            const Icon = getMessageIcon(msg.type);
            const colorClass = getMessageColor(msg.type);
            const gradientClass = getMessageGradient(msg.type);
            const isSelected = selectedMessage === msg.id;

            return (
              <motion.div
                key={msg.id}
                custom={idx}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className={`group rounded-2xl border-2 transition-all duration-500 overflow-hidden cursor-pointer ${
                  isSelected 
                    ? "border-accent shadow-2xl" 
                    : msg.read 
                      ? "border-border/50 hover:border-accent/30 hover:shadow-xl" 
                      : "border-accent/30 bg-gradient-to-r from-accent/5 to-transparent"
                }`}
                onClick={() => {
                  setSelectedMessage(isSelected ? null : msg.id);
                  if (!msg.read) markAsRead(msg.id);
                }}
              >
                {/* Message Header - Premium */}
                <div className={`p-6 ${isSelected ? 'bg-gradient-to-br ' + gradientClass : ''}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl ${colorClass} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-serif font-semibold text-primary text-lg">{msg.from}</h3>
                          {!msg.read && (
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                              <span className="text-xs text-accent font-medium">New</span>
                            </span>
                          )}
                          <span className={`
                            text-xs px-3 py-1 rounded-full border flex items-center gap-1
                            ${msg.type === "dispute" ? "bg-amber-50 text-amber-700 border-amber-200" :
                              msg.type === "verification" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                              msg.type === "booking" ? "bg-blue-50 text-blue-700 border-blue-200" :
                              "bg-gray-50 text-gray-700 border-gray-200"}
                          `}>
                            <Icon className="w-3 h-3" />
                            {msg.type.charAt(0).toUpperCase() + msg.type.slice(1)}
                          </span>
                        </div>
                        
                        <p className="text-base font-medium text-primary mb-2">{msg.subject}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1.5 bg-accent/5 px-2 py-1 rounded-full">
                            <Calendar className="w-3.5 h-3.5 text-accent" />
                            {formatDate(msg.date)}
                          </span>
                          {msg.type === "dispute" && (
                            <span className="flex items-center gap-1.5 bg-amber-50 px-2 py-1 rounded-full text-amber-700">
                              <AlertCircle className="w-3.5 h-3.5" />
                              Action Required
                            </span>
                          )}
                          {msg.type === "verification" && msg.read && (
                            <span className="flex items-center gap-1.5 bg-emerald-50 px-2 py-1 rounded-full text-emerald-700">
                              <BadgeCheck className="w-3.5 h-3.5" />
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {!msg.read && (
                        <span className="bg-accent text-primary text-xs px-3 py-1.5 rounded-full font-medium shadow-sm">
                          New
                        </span>
                      )}
                      <motion.div
                        animate={{ rotate: isSelected ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center
                          ${isSelected 
                            ? 'bg-accent text-primary' 
                            : 'bg-accent/10 text-accent group-hover:bg-accent/20'
                          }
                        `}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Expanded Message Content - Premium */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-border/50 pt-5">
                          {/* Message Content */}
                          <div className={`bg-gradient-to-br ${gradientClass} rounded-xl p-5 mb-5 border border-accent/10`}>
                            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                              {msg.message}
                            </p>
                          </div>

                          {/* Action Buttons - Premium */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              
                              
                              <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-10 h-10 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive transition-all flex items-center justify-center"
                                onClick={(e) => deleteMessage(msg.id, e)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            </div>

                            

                         

                          
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

export default CustomerMessages;