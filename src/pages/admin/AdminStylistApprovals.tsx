import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, X, Clock, MapPin, User, Mail, 
  Briefcase, FileText, Image, Star, Award,
  ChevronDown, ChevronUp, Search, Filter,
  Calendar, Shield, Sparkles, AlertCircle,
  ThumbsUp, ThumbsDown, Eye, Download
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
}

const AdminStylistApprovals = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "name">("date");
  const [filterExperience, setFilterExperience] = useState<string>("all");

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
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              Stylist Applications
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Stylist Approvals</h2>
          <p className="text-detail mt-1 font-brand">Review and manage stylist applications</p>
        </div>

        {/* Stats Badge */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 text-amber-700 px-4 py-2 rounded-xl flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="font-semibold">{applications.length}</span>
            <span className="text-sm">Pending</span>
          </div>
        
        </div>
      </motion.div>

      

      {/* Applications Grid */}
      {filteredApplications.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-card rounded-2xl border border-border/50"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            {searchTerm || filterExperience !== "all" ? (
              <Search className="w-8 h-8 text-primary" />
            ) : (
              <Sparkles className="w-8 h-8 text-primary" />
            )}
          </div>
          <h3 className="font-serif text-xl font-bold text-primary mb-2">
            {searchTerm || filterExperience !== "all" ? "No applications found" : "No pending applications"}
          </h3>
          <p className="text-detail mb-6 max-w-sm mx-auto">
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
              className="text-primary font-semibold hover:underline"
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
                  <div className={`bg-card rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                    isExpanded 
                      ? "border-primary shadow-xl" 
                      : "border-border/50 hover:border-primary/30 hover:shadow-lg"
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
                              className="w-28 h-28 rounded-xl object-cover border-2 border-primary/20 ring-2 ring-primary/10" 
                            />
                          ) : (
                            <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border-2 border-primary/20">
                              <User className="w-10 h-10 text-primary" />
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
                                  <span className="bg-amber-100 text-amber-700 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                    <Award className="w-3 h-3" /> Experienced
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-detail flex items-center gap-1 mb-2">
                                <Mail className="w-3.5 h-3.5" /> {app.email}
                              </p>
                              
                              <div className="flex flex-wrap gap-3 text-sm text-detail mt-2">
                                <span className="flex items-center gap-1 bg-primary/5 px-3 py-1.5 rounded-full">
                                  <MapPin className="w-3.5 h-3.5 text-primary" /> {app.location}
                                </span>
                                <span className="flex items-center gap-1 bg-primary/5 px-3 py-1.5 rounded-full">
                                  <Briefcase className="w-3.5 h-3.5 text-primary" /> {app.experience} Years Experience
                                </span>
                                <span className="flex items-center gap-1 bg-primary/5 px-3 py-1.5 rounded-full">
                                  <Clock className="w-3.5 h-3.5 text-primary" /> Submitted {formatDate(app.submittedAt)}
                                </span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleReject(app)}
                                className="p-3 text-destructive hover:bg-destructive/10 rounded-xl transition-all hover:scale-105"
                                title="Reject Application"
                              >
                                <X className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={() => handleApprove(app)}
                                className="p-3 text-green-600 hover:bg-green-50 rounded-xl transition-all hover:scale-105"
                                title="Approve Application"
                              >
                                <Check className="w-5 h-5" />
                              </button>
                              <button 
                                onClick={() => setExpandedApp(isExpanded ? null : app.key)}
                                className="p-3 text-primary hover:bg-primary/10 rounded-xl transition-all"
                              >
                                <Eye className="w-5 h-5" />
                              </button>
                            </div>
                          </div>

                          {/* Bio Preview */}
                          <p className="text-sm text-detail mt-4 line-clamp-2">
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
                              <div className="bg-primary/5 rounded-xl p-4">
                                <h4 className="text-xs font-semibold text-primary mb-2 flex items-center gap-1">
                                  <FileText className="w-3 h-3" /> Full Bio
                                </h4>
                                <p className="text-sm text-detail">{app.bio}</p>
                              </div>

                              {/* Portfolio */}
                              {app.portfolio && app.portfolio.length > 0 && (
                                <div className="bg-primary/5 rounded-xl p-4">
                                  <h4 className="text-xs font-semibold text-primary mb-3 flex items-center gap-1">
                                    <Image className="w-3 h-3" /> Portfolio ({app.portfolio.length} images)
                                  </h4>
                                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                                    {app.portfolio.map((img, idx) => (
                                      <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-primary/20">
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
                              <div className="bg-muted/30 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-3.5 h-3.5 text-primary" />
                                  <span className="text-detail">Submitted: {new Date(app.submittedAt).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Shield className="w-3.5 h-3.5 text-primary" />
                                  <span className="text-detail">Application ID: {app.userId}</span>
                                </div>
                              </div>

                              {/* Quick Actions */}
                              <div className="flex gap-3 justify-end">
                                <button 
                                  onClick={() => handleReject(app)}
                                  className="px-4 py-2 border-2 border-destructive text-destructive rounded-xl text-sm font-medium hover:bg-destructive/10 transition-all flex items-center gap-2"
                                >
                                  <ThumbsDown className="w-4 h-4" />
                                  Reject Application
                                </button>
                                <button 
                                  onClick={() => handleApprove(app)}
                                  className="px-6 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-all flex items-center gap-2"
                                >
                                  <ThumbsUp className="w-4 h-4" />
                                  Approve Application
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Footer */}
                    <div className="bg-muted/20 px-6 py-3 border-t border-border flex items-center justify-between text-xs text-detail">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-3 h-3 text-amber-500" />
                        <span>Pending review</span>
                      </div>
                      <button 
                        onClick={() => setExpandedApp(isExpanded ? null : app.key)}
                        className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
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
          className="flex items-center justify-between text-xs text-detail pt-4"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 h-3 text-primary" />
            <span>Showing {filteredApplications.length} of {applications.length} pending applications</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-primary" />
            <span>Average review time: 2.4 days</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminStylistApprovals;