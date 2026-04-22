import { Settings, Save, Globe, Mail, Percent, DollarSign, Shield, Sparkles, BadgeCheck, Zap, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const AdminSettings = () => (
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
            <Settings className="w-3.5 h-3.5" />
            Platform Configuration
          </span>
          <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" />
            Live
          </span>
        </div>
        <h2 className="font-serif text-3xl font-bold text-primary">Platform Settings</h2>
        <p className="text-muted-foreground mt-1 text-sm">Configure global platform settings and preferences</p>
      </div>
    </motion.div>

    {/* Main Settings Card */}
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card rounded-xl border border-border shadow-lg overflow-hidden"
    >
      {/* Card Header */}
      <div className="bg-gradient-to-r from-accent/5 to-accent/0 px-6 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-accent" />
          <h3 className="font-serif font-semibold text-lg text-primary">General Settings</h3>
        </div>
        <p className="text-xs text-muted-foreground mt-1">These settings affect the entire platform</p>
      </div>

      {/* Settings Form */}
      <div className="p-6 space-y-5">
      

        {/* Platform Fee */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary flex items-center gap-1.5">
            <div className="w-5 h-5 rounded bg-accent/10 flex items-center justify-center">
              <Percent className="w-3.5 h-3.5 text-accent" />
            </div>
            Platform Fee
          </label>
          <div className="relative">
            <input 
              type="number" 
              className="w-full pl-4 pr-12 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" 
              defaultValue="15" 
              step="0.1"
              min="0"
              max="100"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">%</span>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-accent" />
            Percentage deducted from each transaction
          </p>
        </div>

        {/* Currency Fixed */}
        <div className="space-y-2">
          <label className="text-xs text-muted-foreground opacity-50 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-muted-foreground" />
            Currency: GBP (Fixed)
          </label>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-2"></div>

        {/* Security Note */}
        <div className="bg-accent/5 rounded-lg p-4 border border-accent/20 flex items-start gap-3">
          <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-primary">Changes take effect immediately</p>
            <p className="text-xs text-muted-foreground mt-1">
              Updating these settings will affect all users and transactions. Please review carefully before saving.
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button className="px-6 py-3 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-accent/30 hover:bg-accent/5 transition-all text-sm font-medium">
            Cancel
          </button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-accent hover:bg-accent/90 text-primary px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-md"
            onClick={() => alert('Settings saved successfully!')}
          >
            <Save className="w-4 h-4" />
            Save Changes
          </motion.button>
        </div>
      </div>
    </motion.div>

    {/* Footer Note */}
    <motion.p 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-xs text-center text-muted-foreground"
    >
      All changes are automatically saved to the platform configuration
    </motion.p>
  </div>
);

export default AdminSettings;
