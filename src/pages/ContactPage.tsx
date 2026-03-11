import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Mail, Phone, MapPin, Send, AlertTriangle, 
  MessageSquare, HelpCircle, Star, Clock, CheckCircle,
  ChevronRight, Shield, Users, Headphones, Sparkles
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
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-b from-primary to-primary/95">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[120px] animate-pulse delay-1000" />
          <div className="absolute inset-0 opacity-5" 
               style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm text-background text-xs font-medium px-5 py-2.5 rounded-full mb-6 border border-accent/30 shadow-lg"
            >
              <Headphones className="w-4 h-4 text-accent" />
              <span>24/7 Support</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
              <span>Response within 24h</span>
            </motion.div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight">
              Get in Touch <br />
              <span className="text-accent relative">
                With Us
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4L200 4" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-accent/30"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto leading-relaxed font-brand">
              Have questions? Need help? Our support team is here to assist you with any inquiries, disputes, or feedback.
            </p>
          </motion.div>
        </div>

        {/* Curved divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          >
            {[
              { icon: Clock, label: "Response Time", value: "< 24 hours" },
              { icon: Users, label: "Happy Customers", value: "10,000+" },
              { icon: Star, label: "Support Rating", value: "4.9 ★" },
              { icon: Shield, label: "Secure", value: "100%" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-card rounded-xl p-4 border border-border/50 flex items-center gap-3 hover:shadow-lg transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-detail">{stat.label}</p>
                  <p className="font-bold text-primary">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info - Left Column */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Contact Methods */}
              <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg">
                <h2 className="font-serif text-xl font-semibold text-primary mb-6 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-accent" />
                  Contact Methods
                </h2>
                
                <div className="space-y-5">
                  <motion.div 
                    custom={0}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="flex items-start gap-4 group hover:bg-accent/5 p-3 rounded-xl transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-primary">Email</p>
                      <p className="text-sm text-detail font-brand">support@braidlink.com</p>
                      <p className="text-xs text-accent mt-1">24/7 Support</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    custom={1}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="flex items-start gap-4 group hover:bg-accent/5 p-3 rounded-xl transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-primary">Phone</p>
                      <p className="text-sm text-detail font-brand">(555) 987-6543</p>
                      <p className="text-xs text-accent mt-1">Mon-Fri, 9am-6pm EST</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    custom={2}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="flex items-start gap-4 group hover:bg-accent/5 p-3 rounded-xl transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-primary">Office</p>
                      <p className="text-sm text-detail font-brand">123 Beauty Lane, Suite 200</p>
                      <p className="text-sm text-detail font-brand">New York, NY 10001</p>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Dispute Info Card */}
              <motion.div 
                custom={3}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-6 border border-accent/20 shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-serif font-semibold text-primary">Have a Dispute?</h3>
                </div>
                
                <p className="text-sm text-detail font-brand mb-4">
                  Whether you're a customer or stylist, use the form to file a complaint or dispute. 
                  Select "Dispute / Complaint" as the category and describe the issue.
                </p>
                
                <div className="bg-background rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="text-detail">Response within</span>
                    <span className="font-bold text-primary">24-48 hours</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    setCategory("dispute");
                    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-accent font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                >
                  File a Dispute <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>

              {/* Trust Badge */}
              <motion.div 
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg text-center"
              >
                <Shield className="w-12 h-12 text-accent mx-auto mb-3" />
                <h4 className="font-serif font-semibold text-primary mb-2">Secure & Confidential</h4>
                <p className="text-xs text-detail">
                  All communications are encrypted and handled with strict confidentiality.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form - Right Column */}
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
                  className="bg-card rounded-2xl p-8 md:p-10 border border-border/50 shadow-2xl text-center"
                >
                  <div className="relative mb-8">
                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                      {category === "dispute" ? (
                        <AlertTriangle className="w-10 h-10 text-green-600" />
                      ) : (
                        <Send className="w-10 h-10 text-green-600" />
                      )}
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center"
                    >
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </motion.div>
                  </div>
                  
                  <h3 className="font-serif text-2xl font-bold text-primary mb-3">
                    {category === "dispute" ? "Dispute Submitted!" : "Message Sent!"}
                  </h3>
                  
                  <p className="text-detail mb-8 max-w-md mx-auto">
                    {category === "dispute"
                      ? "Our dispute resolution team will review your case and contact both parties within 24-48 hours."
                      : "Thank you for reaching out. We'll get back to you within 24 hours."}
                  </p>
                  
                  <div className="bg-accent/5 rounded-xl p-4 mb-8 text-left">
                    <p className="text-sm text-primary font-medium mb-2">What happens next?</p>
                    <ul className="space-y-2 text-sm text-detail">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span>We've received your {category === "dispute" ? "dispute" : "message"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span>A support representative will review your case</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span>You'll receive a response via email within 24 hours</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                      onClick={resetForm}
                      className="btn-primary px-6 py-3 rounded-xl text-sm"
                    >
                      Send Another Message
                    </button>
                    <button 
                      onClick={() => window.location.href = "/"}
                      className="btn-cta px-6 py-3 rounded-xl text-sm"
                    >
                      Back to Home
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-2xl space-y-5"
                >
                  <h2 className="font-serif text-xl font-semibold text-primary mb-6 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-accent" />
                    Send us a Message
                  </h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* User Type */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-accent" /> I am a
                      </label>
                      <select 
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                        disabled={isAuthenticated}
                      >
                        <option value="customer">Customer</option>
                        <option value="stylist">Hair Stylist</option>
                        <option value="other">Other</option>
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
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
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
                    <label className="text-sm font-medium text-primary">Full Name</label>
                    <input 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" 
                      required 
                      readOnly={isAuthenticated}
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">Email Address</label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" 
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
                      className="space-y-2"
                    >
                      <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-accent" /> Booking ID or Other Party Name
                      </label>
                      <input 
                        value={bookingId}
                        onChange={(e) => setBookingId(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" 
                        placeholder="e.g. Booking #B123 or Angela Johnson"
                        required={category === "dispute"}
                      />
                      <p className="text-xs text-detail">This helps us identify the issue faster</p>
                    </motion.div>
                  )}

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">Subject</label>
                    <input 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" 
                      required 
                      placeholder="Brief summary of your message"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary">Message</label>
                    <textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all" 
                      required 
                      placeholder="Please provide as much detail as possible..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="btn-cta w-full text-sm py-4 rounded-xl flex items-center justify-center gap-2 mt-4"
                  >
                    <Send className="w-4 h-4" />
                    {category === "dispute" ? "Submit Dispute" : "Send Message"}
                  </motion.button>

                  {/* Form Footer */}
                  <p className="text-center text-xs text-detail mt-4 flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3 text-accent" />
                    Your information is secure and confidential
                  </p>
                </motion.form>
              )}
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16"
          >
            <h2 className="font-serif text-2xl font-bold text-primary text-center mb-8">
              Frequently Asked Questions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              {[
                {
                  q: "How quickly do you respond?",
                  a: "We aim to respond to all inquiries within 24 hours during business days."
                },
                {
                  q: "What information do I need for a dispute?",
                  a: "Please provide your booking ID, the other party's name, and a detailed description of the issue."
                },
                {
                  q: "Can I contact support on weekends?",
                  a: "Yes, our email support is available 24/7. Phone support is available Mon-Fri."
                },
                {
                  q: "Is my information secure?",
                  a: "Absolutely. All communications are encrypted and handled confidentially."
                }
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="bg-card rounded-xl p-5 border border-border/50 hover:border-accent/30 transition-colors"
                >
                  <h3 className="font-semibold text-primary mb-2 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-accent" />
                    {faq.q}
                  </h3>
                  <p className="text-sm text-detail">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="border-t border-border py-6 bg-secondary/10">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs text-detail flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3 text-accent" />
            We're here to help 24/7 | © 2026 BraidLink. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;