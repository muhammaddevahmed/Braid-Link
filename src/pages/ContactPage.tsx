import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Mail, Phone, MapPin, Send, AlertTriangle, 
  MessageSquare, HelpCircle, Star, Clock, CheckCircle,
  ChevronRight, Shield, Users, Headphones, Sparkles,
  BadgeCheck, Globe, Clock3, MessageCircle, FileText,
  ThumbsUp, Zap, Award
} from "lucide-react";
import { toast } from "sonner";

const ContactPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [sent, setSent] = useState(false);
  const [category, setCategory] = useState("general");
  const [userType, setUserType] = useState("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [bookingId, setBookingId] = useState("");

  // Auto-fill form based on logged-in user
  useEffect(() => {
    if (isAuthenticated && user) {
      setUserType(user.role);
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [isAuthenticated, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success(category === "dispute" ? "Dispute submitted successfully!" : "Message sent successfully!");
  };

  const resetForm = () => {
    setSent(false);
    setCategory("general");
    setSubject("");
    setMessage("");
    setBookingId("");
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  return (
    <div className="relative bg-background">
      {/* Hero Section - Refined premium design */}
      <section className="relative overflow-hidden py-20 md:py-24 bg-gradient-to-br from-primary via-primary to-primary/95">
        {/* Sophisticated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-20 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[140px] animate-pulse delay-1000" />
          
          {/* Refined pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Premium badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-xs font-medium px-5 py-2.5 rounded-full mb-6 border border-white/20 shadow-xl"
            >
              <Headphones className="w-4 h-4 text-accent" />
              <span>24/7 Support</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>Response within 24h</span>
            </motion.div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Get in Touch <br />
              <span className="text-accent relative inline-block">
                With Us
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4L200 4" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-accent/40"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Have questions? Need help? Our support team is here to assist you with any inquiries, disputes, or feedback.
            </p>
          </motion.div>
        </div>

        {/* Elegant curved divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          {/* Quick Stats - Premium redesign */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-12"
          >
            {[
              { icon: Clock, label: "Response Time", value: "< 24 hours", color: "from-blue-500/20 to-blue-500/5" },
              { icon: Users, label: "Happy Customers", value: "10,000+", color: "from-green-500/20 to-green-500/5" },
              { icon: Star, label: "Support Rating", value: "4.9 ★", color: "from-yellow-500/20 to-yellow-500/5" },
              { icon: Shield, label: "Secure", value: "100%", color: "from-purple-500/20 to-purple-500/5" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-card rounded-xl p-5 border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                    <p className="font-serif font-bold text-xl text-primary">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Contact Info - Left Column - Premium redesign */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Contact Methods - Premium */}
              <div className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg hover:shadow-xl transition-all">
                <h2 className="font-serif text-xl md:text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-accent" />
                  </div>
                  Contact Methods
                </h2>
                
                <div className="space-y-5">
                  <motion.div 
                    custom={0}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="flex items-start gap-4 group hover:bg-accent/5 p-4 rounded-xl transition-all cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-accent/20">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-primary">Email</p>
                      <p className="text-sm text-muted-foreground">support@braidlink.com</p>
                      <div className="flex items-center gap-1 mt-2">
                        <BadgeCheck className="w-3 h-3 text-accent" />
                        <p className="text-xs text-accent">24/7 Support</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    custom={1}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="flex items-start gap-4 group hover:bg-accent/5 p-4 rounded-xl transition-all cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-accent/20">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-primary">Phone</p>
                      <p className="text-sm text-muted-foreground">(555) 987-6543</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Clock className="w-3 h-3 text-accent" />
                        <p className="text-xs text-accent">Mon-Fri, 9am-6pm EST</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    custom={2}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="flex items-start gap-4 group hover:bg-accent/5 p-4 rounded-xl transition-all cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 border border-accent/20">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-primary">Office</p>
                      <p className="text-sm text-muted-foreground">123 Beauty Lane, Suite 200</p>
                      <p className="text-sm text-muted-foreground">New York, NY 10001</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Dispute Info Card - Premium */}
              <motion.div 
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-2xl p-6 md:p-8 border border-accent/20 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shadow-lg">
                    <AlertTriangle className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-serif font-semibold text-primary text-lg">Have a Dispute?</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-5">
                  Whether you're a customer or stylist, use the form to file a complaint or dispute. 
                  Select "Dispute / Complaint" as the category and describe the issue.
                </p>
                
                <div className="bg-background rounded-xl p-4 mb-5 border border-accent/10">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Clock3 className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <span className="text-muted-foreground">Response within</span>
                      <span className="font-bold text-primary ml-2">24-48 hours</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    setCategory("dispute");
                    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-accent font-semibold text-sm flex items-center gap-2 hover:gap-3 transition-all group"
                >
                  File a Dispute 
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>

              {/* Trust Badge - Premium */}
              <motion.div 
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg hover:shadow-xl transition-all text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-serif font-semibold text-primary mb-2">Secure & Confidential</h4>
                <p className="text-xs text-muted-foreground">
                  All communications are encrypted and handled with strict confidentiality.
                </p>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <BadgeCheck className="w-4 h-4 text-accent" />
                  <span className="text-xs text-accent">End-to-end encrypted</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form - Right Column - Premium redesign */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
              id="contact-form"
            >
              {sent ? (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="bg-card rounded-3xl p-8 md:p-10 border border-border/50 shadow-2xl text-center"
                >
                  <div className="relative mb-8">
                    <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-green-500/10 to-green-500/5 flex items-center justify-center mx-auto">
                      {category === "dispute" ? (
                        <AlertTriangle className="w-12 h-12 text-green-500" />
                      ) : (
                        <Send className="w-12 h-12 text-green-500" />
                      )}
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="absolute -top-2 -right-2 w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-xl"
                    >
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </motion.div>
                  </div>
                  
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-3">
                    {category === "dispute" ? "Dispute Submitted!" : "Message Sent!"}
                  </h3>
                  
                  <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg">
                    {category === "dispute"
                      ? "Our dispute resolution team will review your case and contact both parties within 24-48 hours."
                      : "Thank you for reaching out. We'll get back to you within 24 hours."}
                  </p>
                  
                  <div className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl p-6 mb-8 text-left border border-accent/10">
                    <p className="text-sm text-primary font-medium mb-4 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-accent" />
                      What happens next?
                    </p>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                          <CheckCircle className="w-3.5 h-3.5 text-accent" />
                        </div>
                        <span>We've received your {category === "dispute" ? "dispute" : "message"}</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                          <CheckCircle className="w-3.5 h-3.5 text-accent" />
                        </div>
                        <span>A support representative will review your case</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                          <CheckCircle className="w-3.5 h-3.5 text-accent" />
                        </div>
                        <span>You'll receive a response via email within 24 hours</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                      onClick={resetForm}
                      className="bg-primary/10 text-primary hover:bg-primary/20 font-semibold px-6 py-3 rounded-xl transition-all duration-300 border border-primary/20 group"
                    >
                      Send Another Message
                    </button>
                    <button 
                      onClick={() => window.location.href = "/"}
                      className="bg-accent text-primary font-semibold px-6 py-3 rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-accent/25 group"
                    >
                      Back to Home
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="bg-card rounded-3xl p-6 md:p-8 lg:p-10 border border-border/50 shadow-2xl space-y-6"
                >
                  <h2 className="font-serif text-xl md:text-2xl font-semibold text-primary mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-accent" />
                    </div>
                    Send us a Message
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* User Type */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-accent" /> I am a
                      </label>
                      <select 
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all appearance-none cursor-pointer"
                        disabled={isAuthenticated}
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23b87a5d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundSize: '1rem', backgroundRepeat: 'no-repeat' }}
                      >
                        <option value="customer">Customer</option>
                        <option value="stylist">Hair Stylist</option>
                        
                      </select>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-accent" /> Category
                      </label>
                      <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all appearance-none cursor-pointer"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23b87a5d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundSize: '1rem', backgroundRepeat: 'no-repeat' }}
                      >
                        <option value="general">General Inquiry</option>
                        <option value="dispute">⚠️ Dispute / Complaint</option>
                        <option value="booking">📅 Booking Issue</option>
                        <option value="payment">💰 Payment Issue</option>
                        <option value="feedback">⭐ Feedback</option>
                      </select>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-accent" /> Full Name
                    </label>
                    <input 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50" 
                      required 
                      readOnly={isAuthenticated}
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-accent" /> Email Address
                    </label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50" 
                      required 
                      readOnly={isAuthenticated}
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Booking ID (conditional) */}
                  {category === "dispute" && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="space-y-2"
                    >
                      <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-accent" /> Booking ID or Other Party Name
                      </label>
                      <input 
                        value={bookingId}
                        onChange={(e) => setBookingId(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50" 
                        placeholder="e.g. Booking #B123 or Angela Johnson"
                        required={category === "dispute"}
                      />
                      <p className="text-xs text-muted-foreground">This helps us identify the issue faster</p>
                    </motion.div>
                  )}

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-accent" /> Subject
                    </label>
                    <input 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50" 
                      required 
                      placeholder="Brief summary of your message"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-accent" /> Message
                    </label>
                    <textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm h-36 resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50" 
                      required 
                      placeholder="Please provide as much detail as possible..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="bg-accent text-primary font-semibold w-full text-sm py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-accent/25 group"
                  >
                    <Send className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    {category === "dispute" ? "Submit Dispute" : "Send Message"}
                  </motion.button>

                  {/* Form Footer */}
                  <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-2">
                    <Shield className="w-3 h-3 text-accent" />
                    Your information is secure and confidential
                  </p>
                </motion.form>
              )}
            </motion.div>
          </div>

          {/* FAQ Section - Premium redesign */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20"
          >
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-accent/30" />
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
                Frequently Asked Questions
              </h2>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-accent/30" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                {
                  q: "How quickly do you respond?",
                  a: "We aim to respond to all inquiries within 24 hours during business days.",
                  icon: Clock
                },
                {
                  q: "What information do I need for a dispute?",
                  a: "Please provide your booking ID, the other party's name, and a detailed description of the issue.",
                  icon: AlertTriangle
                },
                {
                  q: "Can I contact support on weekends?",
                  a: "Yes, our email support is available 24/7. Phone support is available Mon-Fri.",
                  icon: Headphones
                },
                {
                  q: "Is my information secure?",
                  a: "Absolutely. All communications are encrypted and handled confidentially.",
                  icon: Shield
                }
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="bg-card rounded-xl p-6 border border-border/50 hover:border-accent/30 transition-all hover:shadow-lg group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <faq.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">{faq.q}</h3>
                      <p className="text-sm text-muted-foreground">{faq.a}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Note - Premium redesign */}
      <div className="border-t border-border/40 py-8 bg-gradient-to-b from-secondary/5 to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-muted-foreground/60 tracking-wide flex items-center justify-center gap-2">
            <Headphones className="w-3 h-3 text-accent" />
            We're here to help 24/7
            <span className="w-1 h-1 rounded-full bg-accent/30" />
            © 2026 BraidLink. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;