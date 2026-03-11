import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { stylists } from "@/data/demo-data";
import { 
  User, Mail, Phone, Camera, CheckCircle, 
  Save, X, Edit, Shield, 
  Award, MapPin, Lock, Globe,
  Sparkles, Briefcase, Hash, FileText,
 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const StylistProfile = () => {
  const { user } = useAuth();
  const s = stylists.find(st => st.id === user?.id) || {} as any;
  const [form, setForm] = useState({ 
    name: s.name || "", 
    bio: s.bio || "", 
    experience: String(s.experience || "0"), 
    location: s.location || "", 
    postalCode: s.postalCode || "",
    country: user?.country || "USA",
    phone: s.phone || "(555) 123-4567",
    email: s.email || "stylist@example.com",
    website: s.website || "www.stylistportfolio.com",
    specialties: s.specialties || ["Knotless", "Boho", "Box Braids"]
  });
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);
  const [avatarHover, setAvatarHover] = useState(false);
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
    if (form.postalCode) {
        const isValid = form.country === 'US' 
          ? /^\d{5}$/.test(form.postalCode) 
          : /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}$/i.test(form.postalCode);
        if (!isValid) {
          newErrors.postalCode = `Please enter a valid ${form.country === 'US' ? '5-digit US zip code' : 'UK postcode'}.`;
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
      website: s.website || "www.stylistportfolio.com",
      specialties: s.specialties || ["Knotless", "Boho", "Box Braids"]
    });
    setEditing(false);
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              Stylist Profile
            </span>
            {s.verified && (
              <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Verified Professional
              </span>
            )}
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Profile Settings</h2>
          <p className="text-detail mt-1 font-brand">Manage your public profile and professional information</p>
        </div>

        {!editing && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setEditing(true)}
            className="btn-primary text-sm px-6 py-3 rounded-xl flex items-center gap-2"
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
                    {getInitials(s.name)}
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
                  {form.name}
                </h3>
                <Shield className="w-6 h-6 text-primary" />
                
              </div>
              
              <div className="flex flex-wrap items-center gap-4 mt-2">
                <p className="text-detail flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {form.location}
                </p>
                <span className="w-1 h-1 rounded-full bg-detail/30" />
                <p className="text-detail flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> {form.experience} years experience
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
                { id: "contact", label: "Contact", icon: Mail },
              
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
                      <Briefcase className="w-4 h-4 text-primary" /> Experience (years)
                    </label>
                    <input 
                      type="number"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                      value={form.experience} 
                      onChange={(e) => setForm({ ...form, experience: e.target.value })} 
                      placeholder="5"
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
                      <MapPin className="w-4 h-4 text-primary" /> Country
                    </label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                      value={form.country} 
                      onChange={(e) => setForm({ ...form, country: e.target.value, postalCode: '' })}
                    >
                      <option value="UK">United Kingdom</option>
                      <option value="USA">United States</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <Hash className="w-4 h-4 text-primary" /> Postal Code
                    </label>
                    <input 
                      className={`w-full px-4 py-3 rounded-xl border ${errors.postalCode ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all`} 
                      value={form.postalCode} 
                      onChange={(e) => setForm({ ...form, postalCode: e.target.value })} 
                      placeholder={form.country === 'US' ? 'Enter 5-digit zip code' : 'Enter UK postcode'}
                    />
                    <p className="text-xs text-detail mt-1">
                      {form.country === 'US'
                        ? "US zip codes should be 5 digits (e.g., 90210)."
                        : "UK postcodes are alphanumeric (e.g., SW1A 0AA)."}
                    </p>
                    {errors.postalCode && <p className="text-xs text-destructive">{errors.postalCode}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <Globe className="w-4 h-4 text-primary" /> Website
                    </label>
                    <input 
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                      value={form.website} 
                      onChange={(e) => setForm({ ...form, website: e.target.value })} 
                      placeholder="www.yourportfolio.com"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-primary" /> Bio
                  </label>
                  <textarea 
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm h-24 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                    value={form.bio} 
                    onChange={(e) => setForm({ ...form, bio: e.target.value })} 
                    placeholder="Tell clients about yourself and your experience..."
                  />
                </div>

                {/* Specialties */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-primary" /> Specialties
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Knotless", "Boho", "Box Braids", "Cornrows", "Twists", "Fulani", "Goddess", "Stitch"].map((specialty) => (
                      <span 
                        key={specialty}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Security Note */}
                <div className="bg-primary/5 rounded-xl p-4 border border-primary/20 flex items-start gap-3">
                  <Lock className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-detail">
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
                        className="bg-primary/5 rounded-xl p-4 border border-primary/20 hover:border-primary/40 transition-all"
                      >
                        <p className="text-xs text-detail mb-1 flex items-center gap-1">
                          <User className="w-3 h-3 text-primary" /> Full Name
                        </p>
                        <p className="font-semibold text-primary">{form.name}</p>
                      </motion.div>

                      <motion.div 
                        custom={1}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="bg-primary/5 rounded-xl p-4 border border-primary/20 hover:border-primary/40 transition-all"
                      >
                        <p className="text-xs text-detail mb-1 flex items-center gap-1">
                          <Briefcase className="w-3 h-3 text-primary" /> Experience
                        </p>
                        <p className="font-semibold text-primary">{form.experience} years</p>
                      </motion.div>

                      <motion.div 
                        custom={2}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="bg-primary/5 rounded-xl p-4 border border-primary/20 hover:border-primary/40 transition-all"
                      >
                        <p className="text-xs text-detail mb-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-primary" /> Location
                        </p>
                        <p className="font-semibold text-primary">{form.location}</p>
                      </motion.div>

                      <motion.div 
                        custom={3}
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="bg-primary/5 rounded-xl p-4 border border-primary/20 hover:border-primary/40 transition-all"
                      >
                        <p className="text-xs text-detail mb-1 flex items-center gap-1">
                          <Hash className="w-3 h-3 text-primary" /> Postal Code
                        </p>
                        <p className="font-semibold text-primary">{form.postalCode}, {form.country}</p>
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
                        <FileText className="w-3 h-3 text-primary" /> Bio
                      </p>
                      <p className="text-sm text-detail leading-relaxed">{form.bio}</p>
                    </motion.div>

                    <motion.div 
                      custom={5}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      className="space-y-3"
                    >
                      <p className="text-xs text-detail flex items-center gap-1">
                        <Award className="w-3 h-3 text-primary" /> Specialties
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {form.specialties.map((specialty) => (
                          <span 
                            key={specialty}
                            className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium border border-primary/20"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}

                {activeTab === "contact" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="bg-primary/5 rounded-xl p-5 border border-primary/20">
                      <h4 className="text-sm font-semibold text-primary mb-4">Contact Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors">
                          <Mail className="w-4 h-4 text-primary" />
                          <span className="text-sm text-detail">{form.email}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors">
                          <Phone className="w-4 h-4 text-primary" />
                          <span className="text-sm text-detail">{form.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary/10 transition-colors">
                          <Globe className="w-4 h-4 text-primary" />
                          <span className="text-sm text-detail">{form.website}</span>
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

      {/* Trust Message */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <p className="text-xs text-detail flex items-center justify-center gap-1">
          <Shield className="w-3 h-3 text-primary" />
          Your profile is visible to customers. Keep it professional to attract more bookings.
        </p>
      </motion.div>
    </div>
  );
};

export default StylistProfile;