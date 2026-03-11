import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, Save, Edit, User, Shield } from "lucide-react";

const AdminProfile = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    email: user?.email || "",
    password: "",
  });
  const [editing, setEditing] = useState(false);

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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="font-serif text-3xl font-bold text-primary">Admin Profile</h2>
          <p className="text-detail mt-1 font-brand">Manage your admin account settings</p>
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl border border-border/50 shadow-xl p-8"
      >
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center ring-4 ring-background shadow-lg">
                <Shield className="w-12 h-12 text-primary" />
            </div>
            <div className="text-center sm:text-left">
                <h3 className="font-serif text-2xl font-bold text-primary">{user?.name || "Admin User"}</h3>
                <p className="text-detail flex items-center gap-2 mt-1">
                    <User className="w-4 h-4" />
                    Administrator
                </p>
            </div>
        </div>


        {editing ? (
          <div className="space-y-6">
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
                <Lock className="w-4 h-4 text-primary" /> Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter new password"
              />
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCancel}
                className="border-2 border-destructive/30 text-destructive px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-destructive/10 transition-all"
              >
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
          </div>
        ) : (
          <div className="space-y-6">
             <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                <p className="text-xs text-detail mb-1 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-primary" /> Email
                </p>
                <p className="font-semibold text-primary">{form.email || user?.email}</p>
             </div>
             <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                <p className="text-xs text-detail mb-1 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-primary" /> Password
                </p>
                <p className="font-semibold text-primary">**********</p>
             </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminProfile;
