import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { subscriptionPlans as initialPlans } from "@/data/demo-data";
import { Edit2, Plus, Trash2, X, Check } from "lucide-react";
import { toast } from "sonner";

const AdminSubscriptions = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    period: "month",
    description: "",
    features: [""]
  });

  const handleEdit = (plan: typeof initialPlans[0]) => {
    setEditingId(plan.id);
    setFormData({
      name: plan.name,
      price: plan.price,
      period: plan.period,
      description: plan.description,
      features: [...plan.features]
    });
  };

  const handleSave = () => {
    if (editingId) {
      setPlans(plans.map(p => 
        p.id === editingId 
          ? { ...p, ...formData }
          : p
      ));
      toast.success("Package updated successfully!");
    }
    setEditingId(null);
    resetForm();
  };

  const handleAdd = () => {
    const newPlan = {
      id: `p${plans.length + 1}`,
      ...formData,
      features: formData.features.filter(f => f.trim() !== ""),
      notIncluded: []
    };
    setPlans([...plans, newPlan]);
    setIsAdding(false);
    resetForm();
    toast.success("Package added successfully!");
  };

  const handleDelete = (id: string) => {
    setPlans(plans.filter(p => p.id !== id));
    toast.success("Package deleted successfully!");
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      period: "month",
      description: "",
      features: [""]
    });
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ""] });
  };

  const removeFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h2 
          className="font-serif text-2xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Subscription Plans
        </motion.h2>
        <button 
          onClick={() => setIsAdding(true)}
          className="btn-cta text-sm flex items-center gap-1 hover-scale"
        >
          <Plus className="w-4 h-4" /> Add Package
        </button>
      </div>

      {/* Add New Package Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            className="bg-card rounded-xl p-6 border-2 border-primary"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif font-semibold text-lg">New Package</h3>
              <button onClick={() => { setIsAdding(false); resetForm(); }} className="p-1 hover:bg-muted rounded">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Plan Name</label>
                  <input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                    placeholder="e.g. Premium"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Price</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Billing Period</label>
                <select
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                >
                  <option value="month">Month</option>
                  <option value="year">Year</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
                  placeholder="Brief description"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Features</label>
                {formData.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      value={feature}
                      onChange={(e) => updateFeature(idx, e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm"
                      placeholder="Feature description"
                    />
                    {formData.features.length > 1 && (
                      <button onClick={() => removeFeature(idx)} className="p-2 hover:bg-muted rounded">
                        <X className="w-4 h-4 text-destructive" />
                      </button>
                    )}
                  </div>
                ))}
                <button onClick={addFeature} className="text-sm text-primary hover:underline">+ Add Feature</button>
              </div>
              <div className="flex gap-2">
                <button onClick={handleAdd} className="btn-cta text-sm flex items-center gap-1">
                  <Check className="w-4 h-4" /> Save Package
                </button>
                <button onClick={() => { setIsAdding(false); resetForm(); }} className="text-sm px-4 py-2 rounded-lg border border-input hover:bg-muted">
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((p, idx) => (
          <motion.div 
            key={p.id} 
            className="bg-card rounded-xl p-5 border border-border hover:shadow-lg transition-all duration-200"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            {editingId === p.id ? (
              <div className="space-y-3">
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-2 py-1 rounded border border-input bg-background text-sm font-semibold"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-20 px-2 py-1 rounded border border-input bg-background text-lg font-bold"
                  />
                  <select
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    className="px-2 py-1 rounded border border-input bg-background text-sm"
                  >
                    <option value="month">/ month</option>
                    <option value="year">/ year</option>
                  </select>
                </div>
                <input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-2 py-1 rounded border border-input bg-background text-sm"
                />
                <div className="space-y-1">
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
                  <button onClick={() => { setEditingId(null); resetForm(); }} className="text-xs px-3 py-1.5 rounded border border-input hover:bg-muted">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-serif font-semibold">{p.name}</h3>
                    <p className="text-2xl font-bold mt-1">
                      ${p.price}<span className="text-sm text-muted-foreground font-normal">/{p.period}</span>
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(p)} className="p-1.5 rounded hover:bg-muted">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{p.description}</p>
                <div className="text-sm space-y-1">
                  {p.features.map((f, i) => (
                    <p key={i} className="text-muted-foreground">• {f}</p>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminSubscriptions;
