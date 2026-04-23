import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { stylists } from "@/data/demo-data";
import { 
  User, Mail, Phone, Camera, CheckCircle, 
  Save, X, Edit, Shield, 
  Award, MapPin, Lock, Globe,
  Sparkles, Briefcase, Hash, FileText,
  BadgeCheck, Zap, Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const StylistProfile = () => {
  const { user } = useAuth();
  const stylistData = stylists.find(st => st.id === user?.id) || {} as any;
  const s = {
    name: user?.name || stylistData.name || '',
    phone: user?.phone || stylistData.phone || '',
    location: stylistData.location || '',
    postalCode: stylistData.postalCode || '',
    experience: (stylistData as any).experience || 0,
    bio: stylistData.bio || '',
    email: user?.email || stylistData.email || '',
    verified: (stylistData as any).verified || false,
  };
  const [form, setForm] = useState({ 
    name: user?.name || s.name || "", 
    bio: s.bio || "", 
    experience: String(s.experience || "0"), 
    location: s.location || "", 
    postalCode: s.postalCode || "",
    country: user?.country || "USA",
    phone: user?.phone || s.phone || "(555) 123-4567",
    email: user?.email || s.email || "stylist@example.com",
  });
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "contact">("profile");
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    const newErrors: Record<string, string> = {};
    if (form.postalCode?.trim()) {
        const isValid = form.country === 'USA' 
          ? /^\d{5}$/.test(form.postalCode) 
          : /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}$/i.test(form.postalCode);
        if (!isValid) {
          newErrors.postalCode = `Please enter a valid ${form.country === 'USA' ? '5-digit US zip code' : 'UK postcode'}.`;
        }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCancel = () => {
    setForm({ 
      name: s.name, 
      bio: s.bio, 
      experience: String(s.experience), 
      location: s.location, 
      postalCode: s.postalCode,
      country: user?.country || "USA",
      phone: s.phone || "(555) 123-4567",
      email: s.email || "stylist@example.com",
    });
    setEditing(false);
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
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
              <User className="w-3.5 h-3.5" />
              Stylist Profile
            </span>
            {s.verified && (
              <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <BadgeCheck className="w-3.5 h-3.5" />
                Verified Professional
              </span>
            )}
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Profile Settings</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage your public profile and professional information</p>
        </div>

        {!editing && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setEditing(true)}
            className="bg-accent text-primary text-sm px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-accent/90 transition-all"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </motion.button>
        )}
      </motion.div>

      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-xl border border-border shadow-lg overflow-hidden"
      >
        {/* Cover Photo with Gradient */}
        <div className="h-32 bg-gradient-to-r from-accent/80 via-accent/60 to-accent/40 relative">
          {editing && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm text-primary px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 hover:bg-background transition-all shadow-md border border-white/20"
            >
              <Camera className="w-3.5 h-3.5 text-accent" />
              Change Cover
            </motion.button>
          )}
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {/* Avatar and Title Section */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-16 mb-8">
            <div className="relative group">
              <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center ring-4 ring-background shadow-xl overflow-hidden">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-white">
                    {getInitials(s.name)}
                  </span>
                )}
              </div>
              
              {editing && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full bg-accent flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-2 border-background"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="w-4 h-4 text-primary" />
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
                  {form.name}
                </h3>
                <Shield className="w-5 h-5 text-accent" />
              </div>
              
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <p className="text-muted-foreground flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-accent" /> {form.location}
                </p>
                <span className="w-1 h-1 rounded-full bg-border" />
                <p className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Briefcase className="w-4 h-4 text-accent" /> {form.experience} years experience
                </p>
              </div>
            </div>

            {editing && (
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancel}
                  className="border border-border text-muted-foreground hover:text-rose-600 hover:border-rose-200 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-rose-50 transition-all flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="bg-accent text-primary text-sm px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 shadow-md hover:bg-accent/90 transition-all"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </motion.button>
              </div>
            )}
          </div>

          {/* Tabs */}
          {!editing && (
            <div className="flex gap-2 mb-6 border-b border-border">
              {[
                { id: "profile", label: "Profile", icon: User },
                { id: "contact", label: "Contact", icon: Mail },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`px-5 py-2.5 rounded-t-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      isActive
                        ? "bg-accent text-primary"
                        : "text-muted-foreground hover:text-primary hover:bg-accent/5"
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
                      <User className="w-4 h-4 text-accent" /> Full Name
                    </label>
                    <input 
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" 
                      value={form.name} 
                      onChange={(e) => setForm({ ...form, name: e.target.value })} 
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-accent" /> Experience (years)
                    </label>
                    <input 
                      type="number"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" 
                      value={form.experience} 
                      onChange={(e) => setForm({ ...form, experience: e.target.value })} 
                      placeholder="5"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-accent" /> Email
                    </label>
                    <input 
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" 
                      value={form.email} 
                      onChange={(e) => setForm({ ...form, email: e.target.value })} 
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-accent" /> Phone
                    </label>
                    <input 
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" 
                      value={form.phone} 
                      onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-accent" /> Location
                    </label>
                    <input 
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" 
                      value={form.location} 
                      onChange={(e) => setForm({ ...form, location: e.target.value })} 
                      placeholder="City, State"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-accent" /> Country
                    </label>
                    <select 
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" 
                      value={form.country} 
                      onChange={(e) => setForm(prevForm => ({ ...prevForm, country: e.target.value as 'UK' | 'USA', postalCode: '' }))}
                    >
                      <option value="UK">United Kingdom</option>
                      <option value="USA">United States</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <Hash className="w-4 h-4 text-accent" /> Postal Code
                    </label>
                    <input 
                      className={`w-full px-4 py-3 rounded-lg border ${errors.postalCode ? 'border-rose-500' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all`} 
                      value={form.postalCode} 
                      onChange={(e) => setForm({ ...form, postalCode: e.target.value })} 
                      placeholder={form.country === 'UK' ? 'Enter UK postcode' : 'Enter 5-digit zip code'}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {form.country === 'UK'
                        ? "UK postcodes are alphanumeric (e.g., SW1A 0AA)."
                        : "US zip codes should be 5 digits (e.g., 90210)."}
                    </p>
                    {errors.postalCode && <p className="text-xs text-rose-600">{errors.postalCode}</p>}
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-accent" /> Bio
                  </label>
                  <textarea 
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" 
                    value={form.bio} 
                    onChange={(e) => setForm({ ...form, bio: e.target.value })} 
                    placeholder="Tell clients about yourself and your experience..."
                  />
                </div>

               

                {/* Security Note */}
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/20 flex items-start gap-3">
                  <Lock className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Your professional information is visible to customers. Keep it updated to attract more bookings.
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
                        className="bg-accent/5 rounded-lg p-4 border border-accent/10 hover:border-accent/30 transition-all"
                      >
                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <User className="w-3 h-3 text-accent" /> Full Name
                        </p>
                        <p className="font-semibold text-primary">{form.name}</p>
                      </motion.div>

                      <motion.div 
                        custom={1}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="bg-accent/5 rounded-lg p-4 border border-accent/10 hover:border-accent/30 transition-all"
                      >
                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <Briefcase className="w-3 h-3 text-accent" /> Experience
                        </p>
                        <p className="font-semibold text-primary">{form.experience} years</p>
                      </motion.div>

                      <motion.div 
                        custom={2}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="bg-accent/5 rounded-lg p-4 border border-accent/10 hover:border-accent/30 transition-all"
                      >
                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-accent" /> Location
                        </p>
                        <p className="font-semibold text-primary">{form.location}</p>
                      </motion.div>

                      <motion.div 
                        custom={3}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="bg-accent/5 rounded-lg p-4 border border-accent/10 hover:border-accent/30 transition-all"
                      >
                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <Hash className="w-3 h-3 text-accent" /> Postal Code
                        </p>
                        <p className="font-semibold text-primary">{form.postalCode}, {form.country}</p>
                      </motion.div>
                    </div>

                    <motion.div 
                      custom={4}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      className="bg-accent/5 rounded-lg p-4 border border-accent/10 hover:border-accent/30 transition-all"
                    >
                      <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                        <FileText className="w-3 h-3 text-accent" /> Bio
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{form.bio}</p>
                    </motion.div>

                 
                  </>
                )}

                {activeTab === "contact" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="bg-accent/5 rounded-lg p-5 border border-accent/10">
                      <h4 className="text-sm font-semibold text-primary mb-4">Contact Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/10 transition-colors">
                          <Mail className="w-4 h-4 text-accent" />
                          <span className="text-sm text-muted-foreground">{form.email}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/10 transition-colors">
                          <Phone className="w-4 h-4 text-accent" />
                          <span className="text-sm text-muted-foreground">{form.phone}</span>
                        </div>
                      </div>
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
            className="fixed bottom-8 right-8 bg-emerald-100 text-emerald-800 px-6 py-4 rounded-lg shadow-xl flex items-center gap-3 border border-emerald-200 z-50"
          >
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <div>
              <p className="font-semibold">Profile Updated</p>
              <p className="text-xs">Your changes have been saved successfully</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust Message */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
          <Shield className="w-3 h-3 text-accent" />
          Your profile is visible to customers. Keep it professional to attract more bookings.
        </p>
      </motion.div>
    </div>
  );
};

export default StylistProfile;