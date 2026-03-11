import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hairstyleCategories, hairstyles } from "@/data/demo-data";
import { 
  Plus, Trash2, CheckCircle2, AlertCircle, Edit2, 
  DollarSign, Clock, Tag, Save, X, Sparkles,
  FolderOpen, Scissors, Loader2, Info, ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceWithHairstyle {
  id: string;
  categoryId: string;
  hairstyleId: string;
  price: number;
  duration: string;
  notes: string;
}

const StylistServices = () => {
  const [services, setServices] = useState<ServiceWithHairstyle[]>([]);
  const [savedServices, setSavedServices] = useState<ServiceWithHairstyle[]>([]);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [editPriceValue, setEditPriceValue] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [expandedService, setExpandedService] = useState<string | null>(null);

  // New service form state
  const [newServiceForm, setNewServiceForm] = useState({
    categoryId: "",
    hairstyleId: "",
    price: "",
  });

  // Load demo services on mount
  useEffect(() => {
    const demoServices: ServiceWithHairstyle[] = [
      {
        id: "demo_1",
        categoryId: "cat-braids",
        hairstyleId: "h1",
        price: 120,
        duration: "4-5 hours",
        notes: "Premium synthetic hair included. Gentle tension technique for comfort.",
      },
      {
        id: "demo_2",
        categoryId: "cat-twists",
        hairstyleId: "h4",
        price: 160,
        duration: "4-6 hours",
        notes: "Two-strand twists with sleek finish. Includes edge control.",
      },
    ];

    setServices(demoServices);
    setSavedServices(demoServices);
  }, []);

  const addService = () => {
    if (!newServiceForm.categoryId || !newServiceForm.hairstyleId || !newServiceForm.price) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
      return;
    }

    const selectedCategory = hairstyleCategories.find(c => c.id === newServiceForm.categoryId);
    const selectedHairstyle = selectedCategory?.hairstyles.find(h => h.id === newServiceForm.hairstyleId);

    if (!selectedHairstyle) return;

    const fullHairstyleDetails = hairstyles.find(h => h.id === newServiceForm.hairstyleId);

    const newService: ServiceWithHairstyle = {
      id: `svc_${Date.now()}`,
      categoryId: newServiceForm.categoryId,
      hairstyleId: newServiceForm.hairstyleId,
      price: Number(newServiceForm.price),
      duration: fullHairstyleDetails?.duration || "Contact for duration",
      notes: "",
    };
    
    setServices([...services, newService]);
    setNewServiceForm({ categoryId: "", hairstyleId: "", price: "" });
    setHasChanges(true);
    setSaveStatus("success");
    setTimeout(() => setSaveStatus("idle"), 2000);
  };

  const updatePrice = (serviceId: string, newPrice: number) => {
    const updatedServices = services.map((s) =>
      s.id === serviceId ? { ...s, price: newPrice } : s
    );
    setServices(updatedServices);
    setEditingPrice(null);
    setHasChanges(true);
  };

  const deleteService = (serviceId: string) => {
    const updatedServices = services.filter((s) => s.id !== serviceId);
    setServices(updatedServices);
    setDeleteConfirm(null);
    setHasChanges(true);
    if (updatedServices.length === 0) {
      setHasChanges(false);
    }
  };

  const saveServices = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSavedServices(JSON.parse(JSON.stringify(services)));
      setHasChanges(false);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 500);
  };

  const getSelectedCategory = (categoryId: string) => {
    return hairstyleCategories.find((c) => c.id === categoryId);
  };

  const getSelectedHairstyle = (categoryId: string, hairstyleId: string) => {
    const category = getSelectedCategory(categoryId);
    return category?.hairstyles.find((h) => h.id === hairstyleId);
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  const totalValue = services.reduce((sum, s) => sum + s.price, 0);
  const averagePrice = services.length > 0 ? Math.round(totalValue / services.length) : 0;

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
              <Scissors className="w-3.5 h-3.5" />
              Service Menu
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">My Services</h2>
          <p className="text-detail mt-1 font-brand">
            {services.length > 0
              ? `${services.length} service${services.length !== 1 ? "s" : ""} offered`
              : "No services added yet"}
          </p>
        </div>

        
      </motion.div>

      {/* Status Messages */}
      <AnimatePresence>
        {saveStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-100 border-2 border-green-500 rounded-xl p-4 flex items-center gap-3 shadow-lg"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-green-800">Success!</p>
              <p className="text-xs text-green-700">Services saved successfully</p>
            </div>
          </motion.div>
        )}
        
        {saveStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-100 border-2 border-red-500 rounded-xl p-4 flex items-center gap-3 shadow-lg"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-red-800">Error</p>
              <p className="text-xs text-red-700">Please fill all fields before saving</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Services Grid */}
      {services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((svc, idx) => {
            const selectedCategory = getSelectedCategory(svc.categoryId);
            const selectedHairstyle = getSelectedHairstyle(svc.categoryId, svc.hairstyleId);
            const isDeleting = deleteConfirm === svc.id;
            const isEditing = editingPrice === svc.id;
            const isExpanded = expandedService === svc.id;

            return (
              <motion.div
                key={svc.id}
                custom={idx}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                layout
                className="group"
              >
                <div className={cn(
                  "bg-card rounded-2xl border-2 transition-all duration-300 overflow-hidden",
                  isExpanded ? "border-primary shadow-xl" : "border-border/50 hover:border-primary/30 hover:shadow-lg"
                )}>
                  {/* Service Header */}
                  <div 
                    className="p-5 cursor-pointer"
                    onClick={() => setExpandedService(isExpanded ? null : svc.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {selectedCategory?.name}
                          </span>
                          {svc.notes && (
                            <span className="text-xs bg-muted text-detail px-2 py-1 rounded-full">
                              Has notes
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif font-bold text-xl text-primary">
                          {selectedHairstyle?.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">${svc.price}</p>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-detail" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="flex items-center gap-3 text-sm text-detail">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {svc.duration}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5">
                          <div className="border-t border-border pt-4 space-y-4">
                            {/* Service Details */}
                            <div className="bg-primary/5 rounded-xl p-4">
                              <h4 className="text-xs font-semibold text-primary mb-3 flex items-center gap-1">
                                <Info className="w-3 h-3" /> Service Details
                              </h4>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-detail">Duration</span>
                                  <span className="text-sm font-semibold text-primary">{svc.duration}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-detail">Price</span>
                                  {isEditing ? (
                                    <div className="flex gap-2 items-center">
                                      <input
                                        type="number"
                                        className="w-24 px-3 py-1.5 rounded-lg text-sm border-2 border-primary bg-background text-primary font-semibold"
                                        value={editPriceValue}
                                        onChange={(e) => setEditPriceValue(e.target.value)}
                                        min="0"
                                        step="0.01"
                                      />
                                      <button
                                        onClick={() => updatePrice(svc.id, Number(editPriceValue))}
                                        className="px-3 py-1.5 text-xs font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                                      >
                                        Save
                                      </button>
                                      <button
                                        onClick={() => setEditingPrice(null)}
                                        className="p-1.5 text-xs font-semibold bg-muted text-detail rounded-lg hover:bg-muted/80 transition"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2">
                                      <span className="text-lg font-bold text-primary">${svc.price}</span>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setEditingPrice(svc.id);
                                          setEditPriceValue(svc.price.toString());
                                        }}
                                        className="p-1.5 text-primary hover:bg-primary/10 rounded-lg transition"
                                      >
                                        <Edit2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Notes */}
                            {svc.notes && (
                              <div className="bg-primary/5 rounded-xl p-4">
                                <h4 className="text-xs font-semibold text-primary mb-2">Notes</h4>
                                <p className="text-sm text-detail">{svc.notes}</p>
                              </div>
                            )}

                            {/* Delete Section */}
                            <div className="pt-2">
                              {isDeleting ? (
                                <div className="space-y-2">
                                  <p className="text-xs text-destructive font-medium">Are you sure you want to delete this service?</p>
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => deleteService(svc.id)}
                                      className="flex-1 py-2 text-xs bg-destructive text-white rounded-lg hover:bg-destructive/90 font-medium transition"
                                    >
                                      Yes, Delete
                                    </button>
                                    <button
                                      onClick={() => setDeleteConfirm(null)}
                                      className="flex-1 py-2 text-xs bg-muted text-detail rounded-lg hover:bg-muted/80 font-medium transition"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirm(svc.id)}
                                  className="w-full py-2 text-xs text-destructive hover:bg-destructive/10 rounded-lg font-medium flex items-center justify-center gap-2 transition"
                                >
                                  <Trash2 className="w-3.5 h-3.5" /> Delete Service
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Add New Service Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-6 border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Plus className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-primary">Add New Service</h3>
            <p className="text-xs text-detail">Select from available hairstyles and set your price</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Category Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary flex items-center gap-1.5">
              <FolderOpen className="w-4 h-4 text-primary" /> Category *
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              value={newServiceForm.categoryId}
              onChange={(e) =>
                setNewServiceForm({
                  ...newServiceForm,
                  categoryId: e.target.value,
                  hairstyleId: "",
                })
              }
            >
              <option value="">Choose a category...</option>
              {hairstyleCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Hairstyle Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary flex items-center gap-1.5">
              <Scissors className="w-4 h-4 text-primary" /> Hairstyle *
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!newServiceForm.categoryId}
              value={newServiceForm.hairstyleId}
              onChange={(e) =>
                setNewServiceForm({ ...newServiceForm, hairstyleId: e.target.value })
              }
            >
              <option value="">
                {newServiceForm.categoryId ? "Choose a hairstyle..." : "Select a category first"}
              </option>
              {newServiceForm.categoryId &&
                getSelectedCategory(newServiceForm.categoryId)?.hairstyles.map((h) => {
                  const fullHairstyle = hairstyles.find(hs => hs.id === h.id);
                  return (
                    <option key={h.id} value={h.id}>
                      {h.name} - {fullHairstyle?.duration || 'N/A'}
                    </option>
                  )
                })}
            </select>
          </div>

          {/* Price Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-primary" /> Price ($) *
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              placeholder="e.g., 120"
              value={newServiceForm.price}
              onChange={(e) => setNewServiceForm({ ...newServiceForm, price: e.target.value })}
              min="0"
              step="0.01"
            />
          </div>

          {/* Add Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addService}
            className="w-full bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all text-sm mt-4"
          >
            <Plus className="w-5 h-5" /> Add Service
          </motion.button>
        </div>
      </motion.div>

      {/* Save Button */}
      {services.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3 sticky bottom-4 bg-card/80 backdrop-blur-sm p-4 rounded-2xl border border-border/50 shadow-xl"
        >
          <button
            onClick={saveServices}
            disabled={!hasChanges || saveStatus === "saving"}
            className={`w-full py-4 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg ${
              hasChanges && saveStatus !== "saving"
                ? "bg-primary text-white hover:bg-primary/90 hover:scale-[1.02]"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {saveStatus === "saving" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                {hasChanges ? "Save Changes" : "All Saved"}
              </>
            )}
          </button>
          {hasChanges && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-detail font-semibold text-center flex items-center justify-center gap-1"
            >
              <AlertCircle className="w-3 h-3 text-primary" />
              You have unsaved changes
            </motion.p>
          )}
        </motion.div>
      )}

      {/* Empty State */}
      {services.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-card rounded-2xl border-2 border-dashed border-primary/30"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Scissors className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-serif text-xl font-bold text-primary mb-2">No Services Added</h3>
          <p className="text-detail mb-6 max-w-sm mx-auto">
            Start adding services to your profile so customers can book appointments with you.
          </p>
          <button
            onClick={() => document.getElementById('add-service')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl"
          >
            <Plus className="w-4 h-4" />
            Add Your First Service
          </button>
        </motion.div>
      )}

      {/* Tip */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs text-detail italic flex items-center justify-center gap-1"
      >
        <Sparkles className="w-3 h-3 text-primary" />
        Tip: Select from categories and hairstyles created by admin. Set your price and save.
      </motion.p>
    </div>
  );
};

export default StylistServices;