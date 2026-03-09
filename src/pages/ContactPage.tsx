import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Mail, Phone, MapPin, Send, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const ContactPage = () => {
  const { isAuthenticated, user } = useAuth();
  const [sent, setSent] = useState(false);
  const [category, setCategory] = useState("general");
  const [userType, setUserType] = useState("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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

  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-4xl font-bold text-primary">Contact Us</h1>
          <p className="text-detail mt-2 font-brand">Get help, report a dispute, or send us feedback</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"><Mail className="w-5 h-5 text-accent" /></div>
                <div><p className="font-medium text-sm text-primary">Email</p><p className="text-sm text-detail font-brand">support@braidlink.com</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"><Phone className="w-5 h-5 text-accent" /></div>
                <div><p className="font-medium text-sm text-primary">Phone</p><p className="text-sm text-detail font-brand">(555) 987-6543</p></div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0"><MapPin className="w-5 h-5 text-accent" /></div>
                <div><p className="font-medium text-sm text-primary">Office</p><p className="text-sm text-detail font-brand">123 Beauty Lane, Suite 200<br />New York, NY 10001</p></div>
              </div>

              <div className="bg-accent/10 rounded-xl p-5 border border-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-accent" />
                  <h3 className="font-semibold text-sm text-primary">Have a Dispute?</h3>
                </div>
                <p className="text-sm text-detail font-brand">
                  Whether you're a customer or stylist, use the form to file a complaint or dispute. Select "Dispute / Complaint" as the category and describe the issue. Our team will review and respond within 24-48 hours.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {sent ? (
              <div className="bg-card rounded-xl p-8 border border-detail/20 text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"><Send className="w-5 h-5 text-green-600" /></div>
                <h3 className="font-serif font-semibold text-lg mb-2 text-primary">
                  {category === "dispute" ? "Dispute Submitted!" : "Message Sent!"}
                </h3>
                <p className="text-sm text-detail font-brand">
                  {category === "dispute"
                    ? "Our dispute resolution team will review your case and contact both parties within 24-48 hours."
                    : "We'll get back to you within 24 hours."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 border border-detail/20 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block text-primary">I am a</label>
                  <select 
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:ring-2 focus:ring-accent"
                    disabled={isAuthenticated}
                  >
                    <option value="customer">Customer</option>
                    <option value="stylist">Hair Stylist</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block text-primary">Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:ring-2 focus:ring-accent">
                    <option value="general">General Inquiry</option>
                    <option value="dispute">Dispute / Complaint</option>
                    <option value="booking">Booking Issue</option>
                    <option value="payment">Payment Issue</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block text-primary">Name</label>
                  <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:ring-2 focus:ring-accent" 
                    required 
                    readOnly={isAuthenticated}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block text-primary">Email</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:ring-2 focus:ring-accent" 
                    required 
                    readOnly={isAuthenticated}
                  />
                </div>
                {category === "dispute" && (
                  <div><label className="text-sm font-medium mb-1 block text-primary">Booking ID or Other Party Name</label><input className="w-full px-3 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:ring-2 focus:ring-accent" placeholder="e.g. Booking #B123 or Angela Johnson" required /></div>
                )}
                <div><label className="text-sm font-medium mb-1 block text-primary">Subject</label><input className="w-full px-3 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:ring-2 focus:ring-accent" required /></div>
                <div><label className="text-sm font-medium mb-1 block text-primary">Message</label><textarea className="w-full px-3 py-2.5 rounded-lg border border-detail/20 bg-background text-sm h-28 resize-none focus:ring-2 focus:ring-accent" required /></div>
                <button type="submit" className="btn-cta w-full text-sm hover-scale">
                  {category === "dispute" ? "Submit Dispute" : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
