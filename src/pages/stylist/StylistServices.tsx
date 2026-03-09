import { useState, useEffect } from "react";
import { stylists, hairstyleCategories } from "@/data/demo-data";
import { Plus, Trash2, CheckCircle2, AlertCircle, Edit2 } from "lucide-react";

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
        notes: "Premium synthetic hair included",
      },
      {
        id: "demo_2",
        categoryId: "cat-twists",
        hairstyleId: "h4",
        price: 160,
        duration: "4-6 hours",
        notes: "Two-strand twists with sleek finish",
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

    const newService: ServiceWithHairstyle = {
      id: `svc_${Date.now()}`,
      categoryId: newServiceForm.categoryId,
      hairstyleId: newServiceForm.hairstyleId,
      price: Number(newServiceForm.price),
      duration: selectedHairstyle.duration || "Contact for duration",
      notes: "",
    };

    setServices([...services, newService]);
    setNewServiceForm({ categoryId: "", hairstyleId: "", price: "" });
    setHasChanges(true);
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
  };

  const saveServices = () => {
    if (services.length === 0) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
      return;
    }

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

  return (
    <div className="space-y-8">
      {/* Services Overview Header */}
      <div>
        <h2 className="font-serif text-2xl font-bold">My Services</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {services.length > 0
            ? `${services.length} service${services.length !== 1 ? "s" : ""}`
            : "No services added yet"}
        </p>
      </div>

      {/* Status Messages */}
      {saveStatus === "success" && (
        <div className="bg-secondary border-2 border-accent rounded-lg p-4 flex items-center gap-2 text-sm text-primary font-semibold shadow-md">
          <CheckCircle2 className="w-5 h-5 text-accent" />
          Services saved successfully!
        </div>
      )}
      {saveStatus === "error" && (
        <div className="bg-secondary border-2 border-destructive rounded-lg p-4 flex items-center gap-2 text-sm text-destructive font-semibold shadow-md">
          <AlertCircle className="w-5 h-5" />
          Please fill all fields (Category, Hairstyle, Price) before saving.
        </div>
      )}

      {/* Services Preview Section - Display all added services */}
      {services.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-sm">Your Services ({services.length})</h3>
          <div className="space-y-3">
            {services.map((svc) => {
              const selectedCategory = getSelectedCategory(svc.categoryId);
              const selectedHairstyle = getSelectedHairstyle(svc.categoryId, svc.hairstyleId);
              const isDeleting = deleteConfirm === svc.id;
              const isEditing = editingPrice === svc.id;

              return (
                <div
                  key={svc.id}
                  className="bg-gradient-to-br from-secondary via-secondary to-accent/10 rounded-xl p-5 border-2 border-accent shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-accent uppercase tracking-widest letter-spacing">
                        {selectedCategory?.name}
                      </p>
                      <p className="font-serif font-bold text-2xl text-primary mt-2">
                        {selectedHairstyle?.name}
                      </p>
                      <p className="text-xs text-primary/70 mt-2 leading-relaxed">{selectedHairstyle?.description}</p>
                    </div>
                    <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
                  </div>

                  <div className="space-y-3 pt-4 border-t-2 border-accent/30">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-primary/80">Duration</span>
                      <span className="text-sm font-bold text-primary">{svc.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-primary/80">Price</span>
                      {isEditing ? (
                        <div className="flex gap-2 items-center">
                          <input
                            type="number"
                            className="w-24 px-3 py-1.5 rounded-lg text-sm border-2 border-accent bg-white text-primary font-semibold"
                            value={editPriceValue}
                            onChange={(e) => setEditPriceValue(e.target.value)}
                            min="0"
                            step="0.01"
                          />
                          <button
                            onClick={() => updatePrice(svc.id, Number(editPriceValue))}
                            className="px-3 py-1.5 text-xs font-semibold bg-accent text-primary rounded-lg hover:bg-accent/90 transition"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingPrice(null)}
                            className="px-3 py-1.5 text-xs font-semibold bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition"
                          >
                            X
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-accent">${svc.price}</span>
                          <button
                            onClick={() => {
                              setEditingPrice(svc.id);
                              setEditPriceValue(svc.price.toString());
                            }}
                            className="p-1.5 text-accent hover:bg-accent/10 rounded-lg transition"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="pt-4 border-t-2 border-accent/30 flex gap-2">
                    {isDeleting ? (
                      <>
                        <button
                          onClick={() => deleteService(svc.id)}
                          className="flex-1 py-2 text-xs bg-destructive text-white rounded hover:bg-destructive/90 font-medium"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="flex-1 py-2 text-xs bg-muted rounded hover:bg-muted/80 font-medium"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(svc.id)}
                        className="w-full py-2 text-xs text-destructive hover:bg-destructive/10 rounded font-medium flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    )}
                  </div>
                  {isDeleting && (
                    <p className="text-xs text-destructive font-medium mt-2">Are you sure you want to delete this service?</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add New Service Section */}
      <div className="space-y-4 border-t-2 border-accent pt-8">
        <h3 className="font-serif text-xl font-bold text-primary">Add New Service</h3>
        <div className="bg-secondary rounded-xl p-6 border-2 border-accent space-y-5 shadow-lg">
          {/* Category Selection */}
          <div>
            <label className="text-xs font-medium mb-2 block">Select Category *</label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
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
          <div>
            <label className="text-xs font-medium mb-2 block">
              Select Hairstyle {newServiceForm.categoryId ? "*" : "(Choose category first)"}
            </label>
            <select
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
                getSelectedCategory(newServiceForm.categoryId)?.hairstyles.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Price Input */}
          <div>
            <label className="text-xs font-medium mb-2 block">Price ($) *</label>
            <input
              type="number"
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm"
              placeholder="e.g., 120"
              value={newServiceForm.price}
              onChange={(e) => setNewServiceForm({ ...newServiceForm, price: e.target.value })}
              min="0"
              step="0.01"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={addService}
            className="w-full bg-accent hover:bg-accent/90 text-primary font-bold py-3 rounded-lg flex items-center justify-center gap-2 shadow-md transition text-sm"
          >
            <Plus className="w-5 h-5" /> Add Service
          </button>
        </div>
      </div>

      {/* Save Button */}
      {services.length > 0 && (
        <div className="space-y-3">
          <button
            onClick={saveServices}
            disabled={!hasChanges || saveStatus === "saving"}
            className={`w-full py-3 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition shadow-lg ${
              hasChanges && saveStatus !== "saving"
                ? "bg-accent hover:bg-accent/90 text-primary"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {saveStatus === "saving" ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                {hasChanges ? "Save Services" : "All Saved"}
              </>
            )}
          </button>
          {hasChanges && (
            <p className="text-xs text-detail font-semibold text-center">You have unsaved changes</p>
          )}
        </div>
      )}

      <p className="text-xs text-primary/60 italic">
        💡 Tip: Select from categories and hairstyles created by admin. Set your price and save.
      </p>
    </div>
  );
};

export default StylistServices;
