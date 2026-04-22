import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { 
  Mail, Lock, Save, Edit, User, Shield, 
  BadgeCheck, Sparkles, Zap, AlertCircle, Eye, EyeOff,
  Camera, Globe, Bell, Key
} from "lucide-react";

const AdminProfile = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    email: user?.email || "",
    password: "",
  });
  const [editing, setEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = () => {
    // Implement save logic here
    console.log("Saved data:", form);
    setEditing(false);
  };

  const handleCancel = () => {
    setForm({
      email: user?.email || "",
      password: "",
    });
    setEditing(false);
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
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
              <Shield className="w-3.5 h-3.5" />
              Admin Account
            </span>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <BadgeCheck className="w-3.5 h-3.5" />
              Verified
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Admin Profile</h2>
          <p className="text-muted-foreground mt-1 text-sm">Manage your admin account settings</p>
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
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl border border-border shadow-lg overflow-hidden"
      >
        {/* Card Header with Gradient */}
        <div className="bg-gradient-to-r from-accent/5 to-accent/0 px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-md">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-lg text-primary">{user?.name || "Admin User"}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <User className="w-3 h-3 text-accent" />
                Administrator • Platform Manager
              </p>
            </div>
            <BadgeCheck className="w-5 h-5 text-accent ml-auto" />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {editing ? (
            <div className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded bg-accent/10 flex items-center justify-center">
                    <Mail className="w-3.5 h-3.5 text-accent" />
                  </div>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded bg-accent/10 flex items-center justify-center">
                    <Lock className="w-3.5 h-3.5 text-accent" />
                  </div>
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-10 pr-12 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-accent" />
                  Leave blank to keep current password
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancel}
                  className="border border-border text-muted-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-accent/5 hover:text-accent transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="bg-accent text-primary text-sm px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-accent/90 transition-all shadow-md"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Email Display */}
              <div className="bg-accent/5 rounded-lg p-4 border border-accent/10 hover:border-accent/30 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-accent/10 flex items-center justify-center">
                    <Mail className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <p className="text-xs text-muted-foreground">Email Address</p>
                </div>
                <p className="font-semibold text-primary pl-8">{form.email || user?.email}</p>
              </div>

              {/* Password Display */}
              <div className="bg-accent/5 rounded-lg p-4 border border-accent/10 hover:border-accent/30 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded bg-accent/10 flex items-center justify-center">
                    <Lock className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <p className="text-xs text-muted-foreground">Password</p>
                </div>
                <div className="flex items-center justify-between pl-8">
                  <p className="font-semibold text-primary">••••••••••••</p>
                  <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                    <BadgeCheck className="w-3 h-3 inline mr-1" />
                    Secure
                  </span>
                </div>
              </div>

              {/* Account Info Note */}
              <div className="bg-accent/5 rounded-lg p-4 border border-accent/10 mt-4 flex items-start gap-3">
                <Shield className="w-4 h-4 text-accent mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  Your admin account has full access to platform settings and user management.
                  Keep your credentials secure and never share them with anyone.
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Security Tips Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-xl border border-border shadow-sm p-5 flex items-start gap-4"
      >
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
          <Key className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-primary mb-1">Security Recommendations</h4>
          <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
            <li>Use a strong, unique password with at least 12 characters</li>
            <li>Enable two-factor authentication for added security</li>
            <li>Regularly review account activity and login history</li>
          </ul>
        </div>
        <Sparkles className="w-5 h-5 text-accent ml-auto" />
      </motion.div>

      {/* Footer Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xs text-center text-muted-foreground flex items-center justify-center gap-2"
      >
        <Shield className="w-3 h-3 text-accent" />
        Last login: Today at 10:30 AM • IP: 192.168.1.1
        <Zap className="w-3 h-3 text-accent" />
      </motion.p>
    </div>
  );
};

export default AdminProfile;