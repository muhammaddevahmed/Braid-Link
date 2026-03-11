import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Phone, Camera, CheckCircle, 
  AlertCircle, Save, X, Edit, Shield, 
  Award, Calendar, MapPin, Lock, Globe,
  Sparkles, Heart, Star, ChevronRight,
  Clock, BadgeCheck, Bookmark
} from "lucide-react";

const CustomerProfile = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ 
    name: user?.name || "", 
    email: user?.email || "", 
    phone: user?.phone || "",
    location: "New York, NY",
    bio: "Hair enthusiast looking for the best braiding styles. I love trying new styles and sharing my experiences.",
    preferences: ["Knotless", "Boho", "Box Braids"]
  });
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);
  const [avatarHover, setAvatarHover] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "preferences" | "security">("profile");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCancel = () => {
    setForm({ 
      name: user?.name || "", 
      email: user?.email || "", 
      phone: user?.phone || "",
      location: "New York, NY",
      bio: "Hair enthusiast looking for the best braiding styles. I love trying new styles and sharing my experiences.",
      preferences: ["Knotless", "Boho", "Box Braids"]
    });
    setEditing(false);
  };

  const togglePreference = (pref: string) => {
    if (form.preferences.includes(pref)) {
      setForm({
        ...form,
        preferences: form.preferences.filter(p => p !== pref)
      });
    } else {
      setForm({
        ...form,
        preferences: [...form.preferences, pref]
      });
    }
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  const stats = [
    { label: "Bookings", value: "12", icon: Calendar },
    { label: "Reviews", value: "8", icon: Star },
    { label: "Favorites", value: "3", icon: Heart },
    { label: "Member Since", value: "2024", icon: Clock },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 border border-primary/20">
              <User className="w-3.5 h-3.5" />
              Personal Information
            </span>
            {!editing && (
              <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <BadgeCheck className="w-3.5 h-3.5" />
                Verified Account
              </span>
            )}
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">My Profile</h2>
          <p className="text-detail mt-1 font-brand">Manage your account settings and preferences</p>
        </div>

        {!editing && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setEditing(true)}
            className="btn-primary text-sm px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </motion.button>
        )}
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="bg-card rounded-xl p-4 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-detail">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-2xl border border-border/50 shadow-xl overflow-hidden"
      >
        {/* Cover Photo with Gradient */}
        <div className="h-32 bg-gradient-to-r from-primary via-primary/80 to-primary/60 relative">
          {editing && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm text-primary px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 hover:bg-background transition-all shadow-lg border border-white/20"
            >
              <Camera className="w-3.5 h-3.5" />
              Change Cover
            </motion.button>
          )}
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {/* Avatar and Title Section */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-16 mb-8">
            <div 
              className="relative group"
              onMouseEnter={() => setAvatarHover(true)}
              onMouseLeave={() => setAvatarHover(false)}
            >
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center ring-4 ring-background shadow-2xl overflow-hidden">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-white">
                    {getInitials(user?.name || "User")}
                  </span>
                )}
              </div>
              
              {editing && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-xl hover:scale-110 transition-transform border-2 border-background"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="w-4 h-4 text-white" />
                </motion.button>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-serif text-3xl font-bold text-primary">
                  {form.name || user?.name}
                </h3>
                <Shield className="w-6 h-6 text-primary" />
                {!editing && (
                  <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Active Member
                  </span>
                )}
              </div>
              
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <p className="text-detail flex items-center gap-2">
                  <Mail className="w-4 h-4" /> {user?.email}
                </p>
                <span className="w-1 h-1 rounded-full bg-detail/30" />
                <p className="text-detail flex items-center gap-2">
                  <Phone className="w-4 h-4" /> {form.phone || "Not provided"}
                </p>
              </div>
            </div>

            {editing && (
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancel}
                  className="border-2 border-destructive/30 text-destructive px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-destructive/10 transition-all flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="btn-cta text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </motion.button>
              </div>
            )}
          </div>

          {/* Tabs */}
          {!editing && (
            <div className="flex gap-2 mb-6 border-b border-border pb-2">
              {[
                { id: "profile", label: "Profile", icon: User },
                { id: "preferences", label: "Preferences", icon: Heart },
                { id: "security", label: "Security", icon: Lock },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`px-5 py-2.5 rounded-t-xl text-sm font-medium transition-all flex items-center gap-2 ${
                      activeTab === tab.id
                        ? "bg-primary text-white shadow-md"
                        : "text-detail hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Form Fields */}
          <AnimatePresence mode="wait">
            {editing ? (
              <motion.div
                key="edit"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <User className="w-4 h-4 text-primary" /> Full Name
                    </label>
                    <input 
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                      value={form.name} 
                      onChange={(e) => setForm({ ...form, name: e.target.value })} 
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-primary" /> Email
                    </label>
                    <input 
                      type="email" 
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                      value={form.email} 
                      onChange={(e) => setForm({ ...form, email: e.target.value })} 
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-primary" /> Phone
                    </label>
                    <input 
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                      value={form.phone} 
                      onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-primary" /> Location
                    </label>
                    <input 
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                      value={form.location} 
                      onChange={(e) => setForm({ ...form, location: e.target.value })} 
                      placeholder="City, State"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-primary" /> Country
                    </label>
                    <input 
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                      value={user?.country} 
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-primary" /> Bio
                  </label>
                  <textarea 
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                    value={form.bio} 
                    onChange={(e) => setForm({ ...form, bio: e.target.value })} 
                    placeholder="Tell us a bit about yourself..."
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-primary" /> Favorite Styles
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Knotless", "Boho", "Box Braids", "Cornrows", "Twists", "Fulani", "Goddess", "Stitch"].map((pref) => (
                      <button
                        key={pref}
                        onClick={() => togglePreference(pref)}
                        className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                          form.preferences.includes(pref)
                            ? "bg-primary text-white shadow-md scale-105"
                            : "bg-muted text-detail hover:bg-primary/10 border border-border"
                        }`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 border border-primary/20 flex items-start gap-3">
                  <Lock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-detail">
                    Your personal information is encrypted and secure. We never share your data with third parties.
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="view"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                {activeTab === "profile" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div 
                        custom={0}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="bg-primary/5 rounded-xl p-4 border border-primary/20 hover:border-primary/40 transition-all"
                      >
                        <p className="text-xs text-detail mb-1 flex items-center gap-1">
                          <User className="w-3 h-3 text-primary" /> Full Name
                        </p>
                        <p className="font-semibold text-primary">{form.name || user?.name}</p>
                      </motion.div>

                      <motion.div 
                        custom={1}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="bg-primary/5 rounded-xl p-4 border border-primary/20 hover:border-primary/40 transition-all"
                      >
                        <p className="text-xs text-detail mb-1 flex items-center gap-1">
                          <Mail className="w-3 h-3 text-primary" /> Email
                        </p>
                        <p className="font-semibold text-primary">{form.email || user?.email}</p>
                      </motion.div>

                      <motion.div 
                        custom={2}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="bg-primary/5 rounded-xl p-4 border border-primary/20 hover:border-primary/40 transition-all"
                      >
                        <p className="text-xs text-detail mb-1 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-primary" /> Phone
                        </p>
                        <p className="font-semibold text-primary">{form.phone || "Not provided"}</p>
                      </motion.div>

                      <motion.div 
                        custom={3}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="bg-primary/5 rounded-xl p-4 border border-primary/20 hover:border-primary/40 transition-all"
                      >
                        <p className="text-xs text-detail mb-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-primary" /> Location
                        </p>
                        <p className="font-semibold text-primary">{form.location}, {user?.country}</p>
                      </motion.div>
                    </div>

                    <motion.div 
                      custom={4}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      className="bg-primary/5 rounded-xl p-4 border border-primary/20 hover:border-primary/40 transition-all"
                    >
                      <p className="text-xs text-detail mb-2 flex items-center gap-1">
                        <Globe className="w-3 h-3 text-primary" /> Bio
                      </p>
                      <p className="text-sm text-detail leading-relaxed">{form.bio}</p>
                    </motion.div>
                  </>
                )}

                {activeTab === "preferences" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                      <p className="text-xs text-detail mb-3 flex items-center gap-1">
                        <Heart className="w-3 h-3 text-primary" /> Favorite Styles
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {form.preferences.map((pref) => (
                          <span 
                            key={pref}
                            className="px-3 py-1.5 bg-primary text-white rounded-full text-xs font-medium shadow-md"
                          >
                            {pref}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                      <p className="text-xs text-detail mb-3 flex items-center gap-1">
                        <Bookmark className="w-3 h-3 text-primary" /> Notification Preferences
                      </p>
                      <div className="space-y-2">
                        {["Email notifications", "SMS reminders", "Marketing emails"].map((pref) => (
                          <label key={pref} className="flex items-center gap-2 text-sm text-detail">
                            <input type="checkbox" className="rounded border-primary/30 text-primary focus:ring-primary" defaultChecked />
                            {pref}
                          </label>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "security" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                      <p className="text-xs text-detail mb-3 flex items-center gap-1">
                        <Lock className="w-3 h-3 text-primary" /> Password
                      </p>
                      <button className="btn-outline text-sm px-4 py-2 rounded-lg">
                        Change Password
                      </button>
                    </div>

                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                      <p className="text-xs text-detail mb-3 flex items-center gap-1">
                        <Shield className="w-3 h-3 text-primary" /> Two-Factor Authentication
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-detail">Enhance your account security</span>
                        <button className="btn-primary text-xs px-3 py-1.5 rounded-lg">
                          Enable 2FA
                        </button>
                      </div>
                    </div>

                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                      <p className="text-xs text-detail mb-3 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-primary" /> Recent Activity
                      </p>
                      <p className="text-sm text-detail">Last login: Today at 10:30 AM</p>
                      <p className="text-sm text-detail">IP Address: 192.168.1.1</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Success Toast */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 bg-green-100 text-green-800 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-green-200 z-50"
          >
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-semibold">Profile Updated</p>
              <p className="text-xs">Your changes have been saved successfully</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Account Link */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <button className="text-xs text-destructive hover:text-destructive/80 hover:underline flex items-center gap-1 mx-auto">
          <AlertCircle className="w-3 h-3" />
          Delete Account
        </button>
      </motion.div>
    </div>
  );
};

export default CustomerProfile;