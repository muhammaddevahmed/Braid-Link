import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Phone, Camera, CheckCircle,
  Save, X, Edit, MapPin, Shield,
  Lock, Eye, EyeOff, BadgeCheck, Sparkles,
  AlertCircle, Hash, Globe
} from "lucide-react";
import { toast } from "sonner";

const CustomerProfile = () => {
  const { user, updatePassword, updateProfile } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    postalCode: user?.postalCode || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (form.newPassword) {
      if (form.newPassword.length < 8) {
        newErrors.newPassword = "Password must be at least 8 characters";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.newPassword)) {
        newErrors.newPassword = "Password must contain uppercase, lowercase and number";
      }
      if (form.newPassword !== form.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match";
      }
      if (!form.currentPassword) {
        newErrors.currentPassword = "Current password is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before saving");
      return;
    }

    const profileData = {
      name: form.name,
      phone: form.phone,
      location: form.location,
      postalCode: form.postalCode,
    };

    await updateProfile(profileData);

    if (
      form.newPassword &&
      form.newPassword === form.confirmPassword &&
      form.currentPassword
    ) {
      try {
        await updatePassword(form.currentPassword, form.newPassword);
        toast.success("Profile and password updated successfully!");
      } catch {
        toast.error("Password update failed, but profile was saved");
      }
    } else {
      toast.success("Profile updated successfully!");
    }

    setSaved(true);
    setEditing(false);

    setTimeout(() => setSaved(false), 2000);
  };

  const handleCancel = () => {
    setForm({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      location: user?.location || "",
      postalCode: user?.postalCode || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setErrors({});
    setEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 bg-gradient-to-b from-background to-secondary/10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              Customer Profile
            </span>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <BadgeCheck className="w-3.5 h-3.5" />
              Verified Account
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Profile Settings</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage your personal information and account security</p>
        </motion.div>

        {/* Main Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden"
        >
          {/* Cover Photo */}
          <div className="h-32 bg-gradient-to-r from-accent/80 via-accent/60 to-accent/40 relative">
            {editing && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm text-primary px-4 py-2 rounded-lg text-xs font-medium flex items-center gap-2 hover:bg-background transition-all shadow-md border border-white/20"
              >
                
              
              </motion.button>
            )}
          </div>

          {/* Profile Content */}
          <div className="p-6 md:p-8">
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-16 mb-8">
              <div className="relative group">
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center ring-4 ring-background shadow-xl overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-bold text-white">
                      {getInitials(form.name || "User")}
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
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-serif text-3xl font-bold text-primary">{form.name}</h3>
                  <Shield className="w-5 h-5 text-accent" />
                </div>
                <p className="text-muted-foreground text-sm mt-1 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent" /> {form.email}
                </p>
              </div>

              {!editing && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setEditing(true)}
                  className="bg-accent text-primary text-sm px-6 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-accent/90 transition-all shadow-md"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </motion.button>
              )}
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-sm font-semibold text-primary mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-accent" />
                  Personal Information
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <User className="w-3 h-3 text-accent" /> Full Name
                    </label>
                    <input
                      className={`w-full p-3 rounded-lg border ${
                        errors.name ? 'border-rose-300 bg-rose-50' : 'border-border'
                      } bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all ${
                        !editing ? 'bg-muted/50' : ''
                      }`}
                      value={form.name}
                      disabled={!editing}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    {errors.name && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-accent" /> Email
                    </label>
                    <input
                      className={`w-full p-3 rounded-lg border ${
                        errors.email ? 'border-rose-300 bg-rose-50' : 'border-border'
                      } bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all ${
                        !editing ? 'bg-muted/50' : ''
                      }`}
                      value={form.email}
                      disabled={!editing}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    {errors.email && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-accent" /> Phone
                    </label>
                    <input
                      className="w-full p-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all disabled:bg-muted/50"
                      value={form.phone}
                      disabled={!editing}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-accent" /> Location
                    </label>
                    <input
                      className="w-full p-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all disabled:bg-muted/50"
                      value={form.location}
                      disabled={!editing}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                    />
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                      <Hash className="w-3 h-3 text-accent" /> Postal Code
                    </label>
                    <input
                      className="w-full p-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all disabled:bg-muted/50"
                      value={form.postalCode}
                      disabled={!editing}
                      onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Password Change Section */}
              {editing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-border pt-6"
                >
                  <h4 className="text-sm font-semibold text-primary mb-4 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-accent" />
                    Change Password (Optional)
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Current Password */}
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className={`w-full p-3 rounded-lg border ${
                            errors.currentPassword ? 'border-rose-300 bg-rose-50' : 'border-border'
                          } bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all pr-10`}
                          value={form.currentPassword}
                          onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.currentPassword && (
                        <p className="text-xs text-rose-600 mt-1">{errors.currentPassword}</p>
                      )}
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className={`w-full p-3 rounded-lg border ${
                            errors.newPassword ? 'border-rose-300 bg-rose-50' : 'border-border'
                          } bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all pr-10`}
                          value={form.newPassword}
                          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.newPassword && (
                        <p className="text-xs text-rose-600 mt-1">{errors.newPassword}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Confirm Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          className={`w-full p-3 rounded-lg border ${
                            errors.confirmPassword ? 'border-rose-300 bg-rose-50' : 'border-border'
                          } bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all pr-10`}
                          value={form.confirmPassword}
                          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-xs text-rose-600 mt-1">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-accent" />
                    Leave blank to keep current password
                  </p>
                </motion.div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
              {editing ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCancel}
                    className="px-6 py-3 rounded-lg border border-border text-muted-foreground hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-all flex items-center gap-2 text-sm font-medium"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSave}
                    className="px-6 py-3 rounded-lg bg-accent text-primary hover:bg-accent/90 transition-all flex items-center gap-2 text-sm font-medium shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </motion.button>
                </>
              ) : null}
            </div>
          </div>
        </motion.div>

        {/* Trust Message */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 bg-card/50 px-3 py-2 rounded-full border border-border w-fit mx-auto">
            <Shield className="w-3 h-3 text-accent" />
            Your information is secure and encrypted
            <Sparkles className="w-3 h-3 text-accent" />
          </p>
        </motion.div>
      </div>

      {/* Save Success Toast */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-emerald-100 text-emerald-800 px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 border border-emerald-200 z-50"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-200 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <p className="font-semibold text-sm">Profile Updated</p>
              <p className="text-xs text-emerald-700">Your changes have been saved successfully</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerProfile;