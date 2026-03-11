import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { subscriptionPlans as initialPlans, SubscriptionPlan } from "@/data/demo-data";
import { 
  Edit2, X, Check, Save, DollarSign, Calendar,
  Crown, Sparkles, Award, Zap, TrendingUp,
  Shield, AlertCircle, Info, ChevronDown, ChevronUp,
  Package, Tag, Plus
} from "lucide-react";
import { toast } from "sonner";

// Define a more specific type for the form data
type PlanFormData = Omit<SubscriptionPlan, 'id' | 'popular' | 'notIncluded'>;

const AdminSubscriptions = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>(() => {
    const savedPlans = localStorage.getItem("braidbook_subscription_plans");
    return savedPlans ? JSON.parse(savedPlans) : initialPlans;
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<PlanFormData | null>(null);
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("braidbook_subscription_plans", JSON.stringify(plans));
  }, [plans]);

  const handleEdit = (plan: SubscriptionPlan) => {
    setEditingId(plan.id);
    setFormData({
      name: plan.name,
      monthlyPrice: plan.monthlyPrice,
      yearlyPrice: plan.yearlyPrice,
      description: plan.description,
      features: [...plan.features]
    });
  };

  const handleSave = () => {
    if (editingId && formData) {
      setPlans(plans.map(p => 
        p.id === editingId 
          ? { ...p, ...formData, features: formData.features.filter(f => f.trim() !== "") }
          : p
      ));
      toast.success("Package updated successfully!", {
        icon: "🎉",
        description: "Changes have been saved."
      });
    }
    setEditingId(null);
    setFormData(null);
  };
  
  const resetForm = () => {
    setEditingId(null);
    setFormData(null);
  };

  const updateFeature = (index: number, value: string) => {
    if (formData) {
      const newFeatures = [...formData.features];
      newFeatures[index] = value;
      setFormData({ ...formData, features: newFeatures });
    }
  };

  const addFeature = () => {
    if (formData) {
      setFormData({ ...formData, features: [...formData.features, ""] });
    }
  };

  const removeFeature = (index: number) => {
    if (formData) {
      setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
    }
  };

  const getPlanIcon = (planName: string) => {
    switch(planName.toLowerCase()) {
      case "basic": return <Zap className="w-5 h-5" />;
      case "professional": return <Crown className="w-5 h-5" />;
      case "premium": return <Award className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getPlanColor = (planName: string) => {
    switch(planName.toLowerCase()) {
      case "basic": return {
        bg: "from-blue-500/20 to-blue-500/5",
        border: "border-blue-500/30",
        text: "text-blue-600",
        button: "bg-blue-600"
      };
      case "professional": return {
        bg: "from-purple-500/20 to-purple-500/5",
        border: "border-purple-500/30",
        text: "text-purple-600",
        button: "bg-purple-600"
      };
      case "premium": return {
        bg: "from-amber-500/20 to-amber-500/5",
        border: "border-amber-500/30",
        text: "text-amber-600",
        button: "bg-amber-600"
      };
      default: return {
        bg: "from-gray-500/20 to-gray-500/5",
        border: "border-gray-500/30",
        text: "text-gray-600",
        button: "bg-gray-600"
      };
    }
  };

  const stats = {
    total: plans.length,
    basic: plans.filter(p => p.name.toLowerCase() === "basic").length,
    professional: plans.filter(p => p.name.toLowerCase() === "professional").length,
    premium: plans.filter(p => p.name.toLowerCase() === "premium").length,
    avgPrice: Math.round(plans.reduce((acc, p) => acc + p.monthlyPrice, 0) / plans.length)
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
              <Package className="w-3.5 h-3.5" />
              Subscription Management
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Subscription Plans</h2>
          <p className="text-detail mt-1 font-brand">Manage pricing plans and features for stylists</p>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-2">
          <div className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-medium">
            {stats.total} Plans
          </div>
         
        </div>
      </motion.div>

      {/* Info Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3"
      >
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-blue-800">Editing Mode Enabled</p>
          <p className="text-xs text-blue-700">
            You can modify plan details (name, price, description, features). Adding or deleting plans is disabled to maintain system integrity.
          </p>
        </div>
      </motion.div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, idx) => {
          const colors = getPlanColor(plan.name);
          const Icon = getPlanIcon(plan.name);
          const isEditing = editingId === plan.id;
          const isExpanded = expandedPlan === plan.id;

          return (
            <motion.div
              key={plan.id}
              custom={idx}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              layout
              className="group"
            >
              <div className={`bg-card rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                isEditing 
                  ? "border-primary shadow-2xl scale-105 z-10" 
                  : "border-border/50 hover:border-primary/30 hover:shadow-xl"
              }`}>
                {/* Plan Header */}
                <div className={`p-6 bg-gradient-to-br ${colors.bg} border-b border-border/50`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center border-2 border-white/50`}>
                      <div className={colors.text}>{Icon}</div>
                    </div>
                    {plan.popular && (
                      <span className="bg-amber-100 text-amber-700 text-xs px-3 py-1 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Popular
                      </span>
                    )}
                  </div>

                  {isEditing ? (
                    <input
                      value={formData?.name || ""}
                      onChange={(e) => setFormData(prev => prev ? { ...prev, name: e.target.value } : null)}
                      className="text-xl font-serif font-bold bg-transparent border-b-2 border-primary/30 px-2 py-1 w-full mb-2 focus:outline-none focus:border-primary"
                      placeholder="Plan name"
                    />
                  ) : (
                    <h3 className="font-serif text-xl font-bold text-primary mb-2">{plan.name}</h3>
                  )}
                </div>

                {/* Plan Content */}
                <div className="p-6">
                  {/* Price Section */}
                  {isEditing ? (
                    <div className="space-y-3 mb-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-detail mb-1 block flex items-center gap-1">
                            <DollarSign className="w-3 h-3" /> Monthly
                          </label>
                          <input
                            type="number"
                            value={formData?.monthlyPrice || 0}
                            onChange={(e) => setFormData(prev => prev ? { ...prev, monthlyPrice: Number(e.target.value) } : null)}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-detail mb-1 block flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> Yearly
                          </label>
                          <input
                            type="number"
                            value={formData?.yearlyPrice || 0}
                            onChange={(e) => setFormData(prev => prev ? { ...prev, yearlyPrice: Number(e.target.value) } : null)}
                            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </div>
                      {formData?.yearlyPrice && formData?.monthlyPrice && (
                        <p className="text-xs text-green-600">
                          Save ${formData.monthlyPrice * 12 - formData.yearlyPrice} yearly
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-primary">${plan.monthlyPrice}</span>
                        <span className="text-detail">/mo</span>
                      </div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-xl font-bold text-primary">${plan.yearlyPrice}</span>
                        <span className="text-xs text-detail">/year</span>
                      </div>
                      <p className="text-xs text-green-600 mt-2">
                        Save ${plan.monthlyPrice * 12 - plan.yearlyPrice} yearly
                      </p>
                    </div>
                  )}

                  {/* Description */}
                  {isEditing ? (
                    <textarea
                      value={formData?.description || ""}
                      onChange={(e) => setFormData(prev => prev ? { ...prev, description: e.target.value } : null)}
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                      rows={2}
                      placeholder="Plan description"
                    />
                  ) : (
                    <p className="text-sm text-detail mb-4">{plan.description}</p>
                  )}

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-primary flex items-center gap-1">
                        <Check className="w-3 h-3" /> Features
                      </label>
                      {isEditing && (
                        <button 
                          onClick={addFeature}
                          className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add
                        </button>
                      )}
                    </div>
                    
                    <AnimatePresence>
                      {isEditing ? (
                        <div className="space-y-2">
                          {formData?.features.map((feature, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="flex gap-2"
                            >
                              <input
                                value={feature}
                                onChange={(e) => updateFeature(i, e.target.value)}
                                className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-primary/50"
                                placeholder="Feature description"
                              />
                              <button
                                onClick={() => removeFeature(i)}
                                className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {plan.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-detail">
                              <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Action Buttons */}
                  {isEditing ? (
                    <div className="flex gap-2 pt-4 border-t border-border">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSave}
                        className="flex-1 bg-green-600 text-white py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                      >
                        <Save className="w-4 h-4" /> Save Changes
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={resetForm}
                        className="px-4 py-2 border-2 border-destructive/30 text-destructive rounded-xl text-sm font-semibold hover:bg-destructive/10 transition-colors"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleEdit(plan)}
                        className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors flex items-center gap-1"
                      >
                        <Edit2 className="w-4 h-4" /> Edit Plan
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Stats */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-xl p-4 border border-border/50 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-primary" />
            <span className="text-sm text-detail">Total Plans: <strong className="text-primary">{plans.length}</strong></span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-primary" />
            <span className="text-sm text-detail">Avg. Price: <strong className="text-primary">${stats.avgPrice}</strong></span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-detail">
          <Shield className="w-3 h-3 text-primary" />
          <span>Changes are saved automatically</span>
        </div>
      </motion.div>

      {/* Help Text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs text-center text-detail flex items-center justify-center gap-1"
      >
        <AlertCircle className="w-3 h-3 text-primary" />
        Plan updates will be reflected immediately for all users. Make sure to review changes before saving.
      </motion.p>
    </div>
  );
};

export default AdminSubscriptions;