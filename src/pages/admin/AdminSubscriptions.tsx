import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { subscriptionPlans as initialPlans, SubscriptionPlan } from "@/data/demo-data";
import { Edit2, X, Check } from "lucide-react";
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
      toast.success("Package updated successfully!");
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h2 
          className="font-serif text-2xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Subscription Plans Management
        </motion.h2>
      </div>
      <p className="text-sm text-muted-foreground">Editing functionality is enabled for this page. You can modify plan details, but adding or deleting plans is disabled.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plans.map((p, idx) => (
          <motion.div 
            key={p.id} 
            className="bg-card rounded-xl p-5 border border-border hover:shadow-lg transition-all duration-200 flex flex-col"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            {editingId === p.id && formData ? (
              <div className="space-y-3 flex-grow flex flex-col">
                <h3 className="font-serif font-semibold">Editing:</h3>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-2 py-1 rounded border border-input bg-background text-sm font-semibold"
                />
                 <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs">Monthly Price</label>
                      <input
                        type="number"
                        value={formData.monthlyPrice}
                        onChange={(e) => setFormData({ ...formData, monthlyPrice: Number(e.target.value) })}
                        className="w-full px-2 py-1 rounded border border-input bg-background font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-xs">Yearly Price</label>
                      <input
                        type="number"
                        value={formData.yearlyPrice}
                        onChange={(e) => setFormData({ ...formData, yearlyPrice: Number(e.target.value) })}
                        className="w-full px-2 py-1 rounded border border-input bg-background font-bold"
                      />
                    </div>
                </div>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-2 py-1 rounded border border-input bg-background text-sm"
                  rows={2}
                />
                <div className="space-y-1 flex-grow">
                  <label className="text-xs">Features</label>
                  {formData.features.map((f, i) => (
                    <div key={i} className="flex gap-1">
                      <input
                        value={f}
                        onChange={(e) => updateFeature(i, e.target.value)}
                        className="flex-1 px-2 py-1 rounded border border-input bg-background text-xs"
                      />
                      {formData.features.length > 1 && (
                        <button onClick={() => removeFeature(i)} className="p-1">
                          <X className="w-3 h-3 text-destructive" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={addFeature} className="text-xs text-primary">+ Add</button>
                </div>
                <div className="flex gap-2 pt-2">
                  <button onClick={handleSave} className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Save
                  </button>
                  <button onClick={resetForm} className="text-xs px-3 py-1.5 rounded border border-input hover:bg-muted">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif font-semibold text-lg">{p.name}</h3>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(p)} className="p-1.5 rounded hover:bg-muted">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                 <div className="flex items-baseline gap-4 mb-3">
                    <p className="text-2xl font-bold">
                      ${p.monthlyPrice}<span className="text-sm text-muted-foreground font-normal">/mo</span>
                    </p>
                    <p className="text-lg font-bold">
                      ${p.yearlyPrice}<span className="text-sm text-muted-foreground font-normal">/yr</span>
                    </p>
                </div>
                <p className="text-sm text-muted-foreground mb-3 flex-grow">{p.description}</p>
                <div className="text-sm space-y-1">
                  {p.features.map((f, i) => (
                    <p key={i} className="text-muted-foreground flex items-start gap-2">
                      <Check className="w-3 h-3 text-green-500 mt-1 shrink-0" />
                      <span>{f}</span>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminSubscriptions;
