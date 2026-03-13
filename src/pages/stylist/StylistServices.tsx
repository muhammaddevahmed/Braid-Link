import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hairstyleCategories, hairstyles } from "@/data/demo-data";
import { 
  Plus, Trash2, CheckCircle2, AlertCircle, Edit2, 
  DollarSign, Clock, Tag, Save, X, Sparkles,
  FolderOpen, Scissors, Loader2, Info, ChevronDown,
  BadgeCheck, Zap, TrendingUp, Package,
  Layers, Calendar, Star, Shield
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
    <div className="space-y-10">
      {/* Header - Premium redesign */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="bg-gradient-to-r from-accent/10 to-accent/5 text-accent text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-accent/20"
            >
              <Scissors className="w-3.5 h-3.5" />
              Service Menu
            </motion.div>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">My Services</h2>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Package className="w-4 h-4 text-accent" />
            <p className="text-sm">
              {services.length > 0
                ? `${services.length} service${services.length !== 1 ? "s" : ""} offered`
                : "No services added yet"}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        {services.length > 0 && (
          <div className="flex items-center gap-3 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-border/50">
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">Avg:</span>
              <span className="font-semibold text-primary">${averagePrice}</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-accent" />
              <span className="text-muted-foreground">Total:</span>
              <span className="font-semibold text-primary">${totalValue}</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Status Messages - Premium */}
      <AnimatePresence>
        {saveStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border-2 border-emerald-500/30 rounded-xl p-5 flex items-center gap-4 shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-800">Success!</p>
              <p className="text-xs text-emerald-700">Services saved successfully</p>
            </div>
            <BadgeCheck className="w-5 h-5 text-emerald-500 ml-auto" />
          </motion.div>
        )}
        
        {saveStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-rose-500/10 to-rose-500/5 border-2 border-rose-500/30 rounded-xl p-5 flex items-center gap-4 shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-rose-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-rose-800">Error</p>
              <p className="text-xs text-rose-700">Please fill all fields before saving</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Services Grid - Premium redesign */}
      {services.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  "bg-card rounded-2xl border-2 transition-all duration-500 overflow-hidden",
                  isExpanded ? "border-accent shadow-2xl" : "border-border/50 hover:border-accent/30 hover:shadow-xl"
                )}>
                  {/* Service Header - Premium */}
                  <div 
                    className="p-6 cursor-pointer relative"
                    onClick={() => setExpandedService(isExpanded ? null : svc.id)}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="flex items-start justify-between mb-3 relative z-10">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold bg-gradient-to-r from-accent/10 to-accent/5 text-accent px-3 py-1.5 rounded-full border border-accent/20">
                            {selectedCategory?.name}
                          </span>
                          {svc.notes && (
                            <span className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full flex items-center gap-1">
                              <Info className="w-3 h-3" />
                              Has notes
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif font-bold text-xl md:text-2xl text-primary group-hover:text-accent transition-colors">
                          {selectedHairstyle?.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <p className="text-2xl md:text-3xl font-bold text-primary">${svc.price}</p>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                            isExpanded 
                              ? "bg-accent text-primary" 
                              : "bg-accent/10 text-accent group-hover:bg-accent/20"
                          )}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Quick Info - Premium */}
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1.5 bg-accent/5 px-3 py-1.5 rounded-full">
                        <Clock className="w-3.5 h-3.5 text-accent" /> 
                        <span className="text-muted-foreground">{svc.duration}</span>
                      </span>
                    </div>
                  </div>

                  {/* Expanded Content - Premium */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="border-t border-border/50 pt-5 space-y-4">
                            {/* Service Details - Premium */}
                            <div className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl p-5 border border-accent/10">
                              <h4 className="text-xs font-semibold text-primary mb-4 flex items-center gap-2">
                                <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                                  <Info className="w-3.5 h-3.5 text-accent" />
                                </div>
                                Service Details
                              </h4>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5 text-accent" /> Duration
                                  </span>
                                  <span className="text-sm font-semibold text-primary">{svc.duration}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-background/50 rounded-lg">
                                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                                    <DollarSign className="w-3.5 h-3.5 text-accent" /> Price
                                  </span>
                                  {isEditing ? (
                                    <div className="flex gap-2 items-center">
                                      <input
                                        type="number"
                                        className="w-24 px-3 py-1.5 rounded-lg text-sm border-2 border-accent bg-background text-primary font-semibold"
                                        value={editPriceValue}
                                        onChange={(e) => setEditPriceValue(e.target.value)}
                                        min="0"
                                        step="0.01"
                                      />
                                      <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => updatePrice(svc.id, Number(editPriceValue))}
                                        className="px-3 py-1.5 text-xs font-semibold bg-accent text-primary rounded-lg hover:bg-accent/90 transition"
                                      >
                                        Save
                                      </motion.button>
                                      <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setEditingPrice(null)}
                                        className="p-1.5 text-xs font-semibold bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition"
                                      >
                                        <X className="w-3 h-3" />
                                      </motion.button>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2">
                                      <span className="text-lg font-bold text-primary">${svc.price}</span>
                                      <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setEditingPrice(svc.id);
                                          setEditPriceValue(svc.price.toString());
                                        }}
                                        className="w-7 h-7 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent flex items-center justify-center transition"
                                      >
                                        <Edit2 className="w-3.5 h-3.5" />
                                      </motion.button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Notes - Premium */}
                            {svc.notes && (
                              <div className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl p-5 border border-accent/10">
                                <h4 className="text-xs font-semibold text-primary mb-3 flex items-center gap-2">
                                  <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                                    <Tag className="w-3.5 h-3.5 text-accent" />
                                  </div>
                                  Notes
                                </h4>
                                <p className="text-sm text-muted-foreground bg-background/50 p-3 rounded-lg">{svc.notes}</p>
                              </div>
                            )}

                            {/* Delete Section - Premium */}
                            <div className="pt-2">
                              {isDeleting ? (
                                <div className="space-y-3 p-4 bg-rose-50 rounded-xl border border-rose-200">
                                  <p className="text-xs text-rose-700 font-medium flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    Are you sure you want to delete this service?
                                  </p>
                                  <div className="flex gap-2">
                                    <motion.button
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={() => deleteService(svc.id)}
                                      className="flex-1 py-2.5 text-xs bg-rose-500 text-white rounded-lg hover:bg-rose-600 font-medium transition"
                                    >
                                      Yes, Delete
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={() => setDeleteConfirm(null)}
                                      className="flex-1 py-2.5 text-xs bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 font-medium transition"
                                    >
                                      Cancel
                                    </motion.button>
                                  </div>
                                </div>
                              ) : (
                                <motion.button
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => setDeleteConfirm(svc.id)}
                                  className="w-full py-3 text-xs text-rose-600 hover:bg-rose-50 rounded-lg font-medium flex items-center justify-center gap-2 transition border border-rose-200"
                                >
                                  <Trash2 className="w-3.5 h-3.5" /> Delete Service
                                </motion.button>
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

      {/* Add New Service Section - Premium redesign */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl p-6 md:p-8 border-2 border-dashed border-accent/30 hover:border-accent/50 transition-all"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
            <Plus className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-primary">Add New Service</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <Sparkles className="w-3 h-3 text-accent" />
              Select from available hairstyles and set your price
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Category Selection - Premium */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-lg bg-accent/10 flex items-center justify-center">
                <FolderOpen className="w-3.5 h-3.5 text-accent" />
              </div>
              Category *
            </label>
            <select
              className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all appearance-none cursor-pointer"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23b87a5d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundSize: '1rem', backgroundRepeat: 'no-repeat' }}
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

          {/* Hairstyle Selection - Premium */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-lg bg-accent/10 flex items-center justify-center">
                <Scissors className="w-3.5 h-3.5 text-accent" />
              </div>
              Hairstyle *
            </label>
            <select
              className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23b87a5d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundSize: '1rem', backgroundRepeat: 'no-repeat' }}
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

          {/* Price Input - Premium */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-lg bg-accent/10 flex items-center justify-center">
                <DollarSign className="w-3.5 h-3.5 text-accent" />
              </div>
              Price ($) *
            </label>
            <input
              type="number"
              className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50"
              placeholder="e.g., 120"
              value={newServiceForm.price}
              onChange={(e) => setNewServiceForm({ ...newServiceForm, price: e.target.value })}
              min="0"
              step="0.01"
            />
          </div>

          {/* Add Button - Premium */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addService}
            className="w-full bg-gradient-to-r from-accent to-accent/90 text-primary font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all text-sm mt-4 group"
          >
            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" /> Add Service
          </motion.button>
        </div>
      </motion.div>

      {/* Save Button - Premium */}
      {services.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3 sticky bottom-4 bg-card/80 backdrop-blur-sm p-5 rounded-2xl border border-border/50 shadow-xl"
        >
          <button
            onClick={saveServices}
            disabled={!hasChanges || saveStatus === "saving"}
            className={`w-full py-4 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg ${
              hasChanges && saveStatus !== "saving"
                ? "bg-gradient-to-r from-accent to-accent/90 text-primary hover:shadow-xl hover:scale-[1.02]"
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
              className="text-xs text-muted-foreground font-medium text-center flex items-center justify-center gap-1"
            >
              <AlertCircle className="w-3 h-3 text-accent" />
              You have unsaved changes
            </motion.p>
          )}
        </motion.div>
      )}

      {/* Empty State - Premium redesign */}
      {services.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-gradient-to-br from-card to-secondary/5 rounded-3xl border-2 border-dashed border-accent/30 shadow-xl"
        >
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto">
              <Scissors className="w-10 h-10 text-accent" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
          </div>
          
          <h3 className="font-serif text-2xl font-bold text-primary mb-3">No Services Added</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Start adding services to your profile so customers can book appointments with you.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => document.getElementById('add-service')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold inline-flex items-center gap-2 px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-accent/25 transition-all group"
          >
            <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Add Your First Service
          </motion.button>
        </motion.div>
      )}

      {/* Tip - Premium */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs text-muted-foreground italic flex items-center justify-center gap-1"
      >
        <Sparkles className="w-3 h-3 text-accent" />
        Tip: Select from categories and hairstyles created by admin. Set your price and save.
      </motion.p>
    </div>
  );
};

export default StylistServices;