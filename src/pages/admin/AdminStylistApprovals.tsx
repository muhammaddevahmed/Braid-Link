import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, X, Clock, MapPin, User, Mail, 
  Briefcase, FileText, Image, Star, Award,
  ChevronDown, ChevronUp, Search, Filter,
  Calendar, Shield, Sparkles, AlertCircle,
  ThumbsUp, ThumbsDown, Eye, Download,
  BadgeCheck, Zap, TrendingUp, Users, HelpCircle
} from "lucide-react";
import { toast } from "sonner";

interface Application {
  key: string;
  userId: string;
  name: string;
  email: string;
  location: string;
  experience: string;
  bio: string;
  status: string;
  submittedAt: string;
  profileImage?: string;
  portfolio?: string[];
  identityProof?: string;
  reasonForApplying?: string;
}

const AdminStylistApprovals = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "name">("date");
  const [filterExperience, setFilterExperience] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const apps: Application[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("stylist_application_")) {
        try {
          const appData = JSON.parse(localStorage.getItem(key) || "{}");
          if (appData.status === 'pending') {
             apps.push({ ...appData, key, userId: key.replace("stylist_application_", "") });
          }
        } catch (e) {
          console.error("Error parsing app", e);
        }
      }
    }
    
    // Sort applications
    if (sortBy === "date") {
      apps.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    } else {
      apps.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setApplications(apps);
  }, [sortBy]);

  const handleApprove = (app: Application) => {
    const updated = { ...app, status: 'approved', approvedAt: new Date().toISOString() };
    localStorage.setItem(app.key, JSON.stringify(updated));
    setApplications(prev => prev.filter(a => a.key !== app.key));
    toast.success(`Approved ${app.name}`, {
      icon: "🎉",
      description: "Stylist can now select a subscription plan."
    });
  };

  const handleReject = (app: Application) => {
    const updated = { ...app, status: 'rejected', rejectedAt: new Date().toISOString() };
    localStorage.setItem(app.key, JSON.stringify(updated));
    setApplications(prev => prev.filter(a => a.key !== app.key));
    toast.error(`Rejected ${app.name}`, {
      icon: "❌",
      description: "Application has been rejected."
    });
  };

  const filteredApplications = applications.filter(app => {
    if (searchTerm && !app.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !app.email.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    
    if (filterExperience !== "all") {
      const exp = parseInt(app.experience);
      if (filterExperience === "0-2" && (exp < 0 || exp > 2)) return false;
      if (filterExperience === "3-5" && (exp < 3 || exp > 5)) return false;
      if (filterExperience === "5+" && exp < 5) return false;
    }
    return true;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
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
              <Award className="w-3.5 h-3.5" />
              Stylist Applications
            </span>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" />
              {applications.length} Pending
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Stylist Approvals</h2>
          <p className="text-muted-foreground mt-1 text-sm">Review and manage stylist applications</p>
        </div>

        {/* Stats Badge */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded-lg flex items-center gap-2 border border-amber-200">
            <Clock className="w-4 h-4" />
            <span className="font-semibold">{applications.length}</span>
            <span className="text-sm">Pending</span>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl p-5 border border-border shadow-md"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={filterExperience}
              onChange={(e) => setFilterExperience(e.target.value)}
              className="px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            >
              <option value="all">All Experience</option>
              <option value="0-2">0-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "date" | "name")}
              className="px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
            >
              <option value="date">Latest First</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || filterExperience !== "all") && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground">Active filters:</span>
            {searchTerm && (
              <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full flex items-center gap-1">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm("")} className="hover:text-accent/80">×</button>
              </span>
            )}
            {filterExperience !== "all" && (
              <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full flex items-center gap-1">
                Experience: {filterExperience} years
                <button onClick={() => setFilterExperience("all")} className="hover:text-accent/80">×</button>
              </span>
            )}
          </div>
        )}
      </motion.div>

      {/* Applications Grid */}
      {filteredApplications.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-card rounded-xl border border-border shadow-lg"
        >
          <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            {searchTerm || filterExperience !== "all" ? (
              <Search className="w-10 h-10 text-accent" />
            ) : (
              <Sparkles className="w-10 h-10 text-accent" />
            )}
          </div>
          <h3 className="font-serif text-2xl font-bold text-primary mb-2">
            {searchTerm || filterExperience !== "all" ? "No applications found" : "No pending applications"}
          </h3>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
            {searchTerm || filterExperience !== "all" 
              ? "No applications match your search criteria. Try adjusting your filters."
              : "All stylist applications have been reviewed. Check back later for new submissions."}
          </p>
          {(searchTerm || filterExperience !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterExperience("all");
              }}
              className="text-accent font-semibold hover:underline"
            >
              Clear all filters
            </button>
          )}
        </motion.div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredApplications.map((app, idx) => {
              const isExpanded = expandedApp === app.key;

              return (
                <motion.div
                  key={app.key}
                  custom={idx}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -20 }}
                  layout
                  className="group"
                >
                  <div className={`bg-card rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                    isExpanded 
                      ? "border-accent shadow-xl" 
                      : "border-border hover:border-accent/30 hover:shadow-md"
                  }`}>
                    {/* Main Content */}
                    <div className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Profile Image */}
                        <div className="flex-shrink-0">
                          {app.profileImage ? (
                            <img 
                              src={app.profileImage} 
                              alt={app.name} 
                              className="w-28 h-28 rounded-lg object-cover border-2 border-accent/20 ring-2 ring-accent/10" 
                            />
                          ) : (
                            <div className="w-28 h-28 rounded-lg bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center border-2 border-accent/20">
                              <User className="w-10 h-10 text-accent" />
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-serif text-xl font-bold text-primary">{app.name}</h3>
                                {parseInt(app.experience) >= 5 && (
                                  <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full flex items-center gap-1 border border-amber-200">
                                    <Award className="w-3 h-3" /> Experienced
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                                <Mail className="w-3.5 h-3.5 text-accent" /> {app.email}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-2">
                                <span className="flex items-center gap-1 bg-accent/5 px-3 py-1.5 rounded-full border border-accent/10">
                                  <MapPin className="w-3.5 h-3.5 text-accent" /> {app.location}
                                </span>
                                <span className="flex items-center gap-1 bg-accent/5 px-3 py-1.5 rounded-full border border-accent/10">
                                  <Briefcase className="w-3.5 h-3.5 text-accent" /> {app.experience} Years
                                </span>
                                <span className="flex items-center gap-1 bg-accent/5 px-3 py-1.5 rounded-full border border-accent/10">
                                  <Clock className="w-3.5 h-3.5 text-accent" /> {formatDate(app.submittedAt)}
                                </span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                              <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleReject(app)}
                                className="w-10 h-10 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 transition-all flex items-center justify-center"
                                title="Reject Application"
                              >
                                <X className="w-5 h-5" />
                              </motion.button>
                              <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleApprove(app)}
                                className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-all flex items-center justify-center"
                                title="Approve Application"
                              >
                                <Check className="w-5 h-5" />
                              </motion.button>
                              <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setExpandedApp(isExpanded ? null : app.key)}
                                className="w-10 h-10 rounded-lg bg-accent/10 text-accent hover:bg-accent/20 transition-all flex items-center justify-center"
                              >
                                <Eye className="w-5 h-5" />
                              </motion.button>
                            </div>
                          </div>

                          {/* Bio Preview */}
                          <p className="text-sm text-muted-foreground mt-4 line-clamp-2 bg-accent/5 p-3 rounded-lg border border-accent/10">
                            {app.bio}
                          </p>
                        </div>
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
                          <div className="px-6 pb-6">
                            <div className="border-t border-border pt-4 space-y-4">
                              {/* Full Bio */}
                              <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
                                <h4 className="text-xs font-semibold text-primary mb-2 flex items-center gap-1">
                                  <FileText className="w-3 h-3 text-accent" /> Full Bio
                                </h4>
                                <p className="text-sm text-muted-foreground">{app.bio}</p>
                              </div>

                              {/* Reason For Applying */}
                              {app.reasonForApplying && (
                                <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
                                  <h4 className="text-xs font-semibold text-primary mb-2 flex items-center gap-1">
                                    <HelpCircle className="w-3 h-3 text-accent" /> Reason for Applying
                                  </h4>
                                  <p className="text-sm text-muted-foreground">{app.reasonForApplying}</p>
                                </div>
                              )}

                              {/* Identity Proof */}
                              {app.identityProof && (
                                <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
                                  <h4 className="text-xs font-semibold text-primary mb-3 flex items-center gap-1">
                                    <FileText className="w-3 h-3 text-accent" /> Proof of Identity
                                  </h4>
                                  <div 
                                    className="rounded-lg overflow-hidden border border-accent/20 group relative w-full h-48 bg-black/5 flex items-center justify-center cursor-zoom-in"
                                    onClick={() => setSelectedImage(app.identityProof || null)}
                                  >
                                    <img 
                                      src={app.identityProof} 
                                      alt="Proof of Identity" 
                                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Portfolio */}
                              {app.portfolio && app.portfolio.length > 0 && (
                                <div className="bg-accent/5 rounded-lg p-4 border border-accent/10">
                                  <h4 className="text-xs font-semibold text-primary mb-3 flex items-center gap-1">
                                    <Image className="w-3 h-3 text-accent" /> Portfolio ({app.portfolio.length} images)
                                  </h4>
                                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                    {app.portfolio.map((img, idx) => (
                                      <div 
                                        key={idx} 
                                        className="aspect-square rounded-lg overflow-hidden border border-accent/20 group cursor-zoom-in"
                                        onClick={() => setSelectedImage(img)}
                                      >
                                        <img 
                                          src={img} 
                                          alt={`Portfolio ${idx + 1}`} 
                                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Application Meta */}
                              <div className="bg-muted/30 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-3.5 h-3.5 text-accent" />
                                  <span className="text-muted-foreground">Submitted: {new Date(app.submittedAt).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Shield className="w-3.5 h-3.5 text-accent" />
                                  <span className="text-muted-foreground">ID: {app.userId.slice(-8)}</span>
                                </div>
                                <BadgeCheck className="w-4 h-4 text-accent" />
                              </div>

                              {/* Quick Actions */}
                              <div className="flex gap-3 justify-end">
                                <motion.button 
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleReject(app)}
                                  className="px-5 py-2.5 border border-rose-200 text-rose-600 rounded-lg text-sm font-medium hover:bg-rose-50 transition-all flex items-center gap-2"
                                >
                                  <ThumbsDown className="w-4 h-4" />
                                  Reject
                                </motion.button>
                                <motion.button 
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleApprove(app)}
                                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-md"
                                >
                                  <ThumbsUp className="w-4 h-4" />
                                  Approve
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Footer */}
                    <div className="bg-muted/20 px-6 py-3 border-t border-border flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-3 h-3 text-amber-500" />
                        <span className="text-muted-foreground">Pending review</span>
                      </div>
                      <button 
                        onClick={() => setExpandedApp(isExpanded ? null : app.key)}
                        className="flex items-center gap-1 text-accent hover:text-accent/80 transition-colors"
                      >
                        {isExpanded ? "Show less" : "View details"}
                        {isExpanded ? 
                          <ChevronUp className="w-3 h-3" /> : 
                          <ChevronDown className="w-3 h-3" />
                        }
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Summary Footer */}
      {filteredApplications.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between text-xs text-muted-foreground pt-4"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-accent" />
            <span>Showing {filteredApplications.length} of {applications.length} pending applications</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3 h-3 text-accent" />
            <span>Avg. review time: 2.4 days</span>
          </div>
        </motion.div>
      )}

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Zoomed preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminStylistApprovals;