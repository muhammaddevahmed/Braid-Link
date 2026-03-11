import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { hairstyleCategories } from "@/data/demo-data";
import { 
  Plus, Edit2, Trash2, ChevronDown, ChevronUp, Upload,
  FolderOpen, Image as ImageIcon, AlertCircle, CheckCircle,
  Save, X, Eye, EyeOff, Sparkles, Grid, List
} from "lucide-react";

interface HairstyleItem {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface CategoryData {
  id: string;
  name: string;
  hairstyles: HairstyleItem[];
}

const AdminCategories = () => {
  const [categories, setCategories] = useState<CategoryData[]>(
    JSON.parse(JSON.stringify(hairstyleCategories))
  );
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");
  const [newHairstyle, setNewHairstyle] = useState<Record<string, HairstyleItem>>({});
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Handle file upload and convert to base64
  const handleImageUpload = (
    file: File,
    categoryId: string,
    styleIndex?: number,
    isNew: boolean = false
  ) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target?.result as string;

      if (isNew) {
        // For new hairstyle
        setNewHairstyle({
          ...newHairstyle,
          [categoryId]: {
            ...newHairstyle[categoryId],
            image: base64Image,
          },
        });
      } else if (styleIndex !== undefined) {
        // For existing hairstyle
        updateHairstyle(categoryId, styleIndex, { image: base64Image });
      }
    };
    reader.readAsDataURL(file);
  };

  // Category management
  const addCategory = () => {
    if (newCategoryName.trim()) {
      const newId = `cat-${Date.now()}`;
      setCategories([
        ...categories,
        { id: newId, name: newCategoryName, hairstyles: [] },
      ]);
      setNewCategoryName("");
      setExpandedCategory(newId);
    }
  };

  const updateCategoryName = (id: string) => {
    if (editingCategoryName.trim()) {
      setCategories(
        categories.map((c) =>
          c.id === id ? { ...c, name: editingCategoryName } : c
        )
      );
      setEditingCategoryId(null);
      setEditingCategoryName("");
    }
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
    if (expandedCategory === id) setExpandedCategory(null);
  };

  // Hairstyle management
  const addHairstyle = (categoryId: string) => {
    const hairstyle = newHairstyle[categoryId];
    if (hairstyle && hairstyle.name.trim() && hairstyle.image.trim()) {
      setCategories(
        categories.map((c) =>
          c.id === categoryId
            ? {
                ...c,
                hairstyles: [
                  ...c.hairstyles,
                  { ...hairstyle, id: `h-${Date.now()}` },
                ],
              }
            : c
        )
      );
      setNewHairstyle({
        ...newHairstyle,
        [categoryId]: { id: "", name: "", description: "", image: "" },
      });
      // Reset file input
      const fileInputKey = `new-${categoryId}`;
      if (fileInputRefs.current[fileInputKey]) {
        fileInputRefs.current[fileInputKey]!.value = "";
      }
    }
  };

  const updateHairstyle = (
    categoryId: string,
    styleIndex: number,
    updates: Partial<HairstyleItem>
  ) => {
    setCategories(
      categories.map((c) =>
        c.id === categoryId
          ? {
              ...c,
              hairstyles: c.hairstyles.map((s, i) =>
                i === styleIndex ? { ...s, ...updates } : s
              ),
            }
          : c
      )
    );
  };

  const deleteHairstyle = (categoryId: string, styleIndex: number) => {
    setCategories(
      categories.map((c) =>
        c.id === categoryId
          ? {
              ...c,
              hairstyles: c.hairstyles.filter((_, i) => i !== styleIndex),
            }
          : c
      )
    );
  };

  const totalHairstyles = categories.reduce((acc, cat) => acc + cat.hairstyles.length, 0);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
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
              <FolderOpen className="w-3.5 h-3.5" />
              Category Management
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Hairstyle Categories</h2>
          <p className="text-detail mt-1 font-brand">
            {categories.length} categories • {totalHairstyles} hairstyles
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-card rounded-xl p-1 border border-border/50">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "grid" 
                ? "bg-primary text-white" 
                : "text-detail hover:bg-primary/10"
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "list" 
                ? "bg-primary text-white" 
                : "text-detail hover:bg-primary/10"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Add New Category Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-2xl p-6 border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Plus className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-primary">Add New Category</h3>
            <p className="text-xs text-detail">Create a new hairstyle category</p>
          </div>
        </div>

        <div className="flex gap-3">
          <input
            className="flex-1 px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            placeholder="Category name (e.g., Braids, Twists, Locs)"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCategory()}
          />
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={addCategory}
            className="btn-cta text-sm px-6 py-3.5 rounded-xl flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create Category
          </motion.button>
        </div>
      </motion.div>

      {/* Categories Grid/List */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-3"}>
        <AnimatePresence>
          {categories.map((category, idx) => (
            <motion.div
              key={category.id}
              custom={idx}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              layout
              className="group"
            >
              <div className="bg-card rounded-2xl border-2 border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                {/* Category Header */}
                <div className="p-5 border-b border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() =>
                        setExpandedCategory(
                          expandedCategory === category.id ? null : category.id
                        )
                      }
                      className="flex items-center gap-3 flex-1 text-left"
                    >
                      <motion.div
                        animate={{ rotate: expandedCategory === category.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-primary" />
                      </motion.div>
                      
                      {editingCategoryId === category.id ? (
                        <input
                          autoFocus
                          className="px-3 py-2 rounded-lg border border-primary bg-background text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-primary/30"
                          value={editingCategoryName}
                          onChange={(e) => setEditingCategoryName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") updateCategoryName(category.id);
                            if (e.key === "Escape") setEditingCategoryId(null);
                          }}
                        />
                      ) : (
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-serif font-semibold text-lg text-primary">{category.name}</h3>
                            <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">
                              {category.hairstyles.length}
                            </span>
                          </div>
                          <p className="text-xs text-detail mt-1">
                            {category.hairstyles.length} hairstyle{category.hairstyles.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      )}
                    </button>

                    <div className="flex items-center gap-1">
                      {editingCategoryId === category.id ? (
                        <>
                          <button
                            onClick={() => updateCategoryName(category.id)}
                            className="p-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                            title="Save"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingCategoryId(null)}
                            className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                            title="Cancel"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setEditingCategoryId(category.id);
                              setEditingCategoryName(category.name);
                            }}
                            className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors"
                            title="Edit Category"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteCategory(category.id)}
                            className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                            title="Delete Category"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hairstyles Section */}
                <AnimatePresence>
                  {expandedCategory === category.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 space-y-4 bg-muted/20">
                        {/* Existing Hairstyles Grid */}
                        {category.hairstyles.length > 0 && (
                          <div className="grid grid-cols-1 gap-3">
                            {category.hairstyles.map((hairstyle, idx) => (
                              <motion.div
                                key={hairstyle.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-card rounded-xl p-4 border border-border/50 hover:border-primary/30 transition-all"
                              >
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {/* Image Column */}
                                  <div className="md:col-span-1">
                                    <div className="relative group/image">
                                      <img
                                        src={hairstyle.image}
                                        alt={hairstyle.name}
                                        className="w-full h-32 object-cover rounded-lg border border-primary/20"
                                      />
                                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                                        <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                                          <Eye className="w-4 h-4 text-primary" />
                                        </button>
                                        <label className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors cursor-pointer">
                                          <Upload className="w-4 h-4 text-primary" />
                                          <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => {
                                              const file = e.target.files?.[0];
                                              if (file) {
                                                handleImageUpload(file, category.id, idx, false);
                                              }
                                            }}
                                          />
                                        </label>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Details Column */}
                                  <div className="md:col-span-2 space-y-3">
                                    <input
                                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                      placeholder="Hairstyle name"
                                      value={hairstyle.name}
                                      onChange={(e) =>
                                        updateHairstyle(category.id, idx, { name: e.target.value })
                                      }
                                    />
                                    <textarea
                                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                      rows={2}
                                      placeholder="Short description (1-2 lines)"
                                      value={hairstyle.description}
                                      onChange={(e) =>
                                        updateHairstyle(category.id, idx, { description: e.target.value })
                                      }
                                    />
                                    <div className="flex justify-end">
                                      <button
                                        onClick={() => deleteHairstyle(category.id, idx)}
                                        className="px-3 py-1.5 text-xs bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors flex items-center gap-1"
                                      >
                                        <Trash2 className="w-3 h-3" /> Delete
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* Add New Hairstyle Form */}
                        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-5 border-2 border-dashed border-primary/30">
                          <h4 className="font-serif font-semibold text-primary mb-4 flex items-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Add New Hairstyle to "{category.name}"
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Image Upload */}
                            <div>
                              <label className="text-xs font-medium text-primary mb-2 block">Hairstyle Image *</label>
                              <div className="relative">
                                <input
                                  type="file"
                                  accept="image/*"
                                  ref={(el) => {
                                    if (el) fileInputRefs.current[`new-${category.id}`] = el;
                                  }}
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      handleImageUpload(file, category.id, undefined, true);
                                    }
                                  }}
                                  className="hidden"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const inputKey = `new-${category.id}`;
                                    fileInputRefs.current[inputKey]?.click();
                                  }}
                                  className="w-full aspect-square rounded-xl border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-2 bg-primary/5"
                                >
                                  {newHairstyle[category.id]?.image ? (
                                    <img
                                      src={newHairstyle[category.id]!.image}
                                      alt="preview"
                                      className="w-full h-full object-cover rounded-xl"
                                    />
                                  ) : (
                                    <>
                                      <ImageIcon className="w-8 h-8 text-primary/50" />
                                      <span className="text-xs text-primary">Click to upload</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Details */}
                            <div className="md:col-span-2 space-y-3">
                              <input
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                placeholder="Hairstyle name *"
                                value={newHairstyle[category.id]?.name || ""}
                                onChange={(e) =>
                                  setNewHairstyle({
                                    ...newHairstyle,
                                    [category.id]: {
                                      ...newHairstyle[category.id],
                                      name: e.target.value,
                                    },
                                  })
                                }
                              />
                              <textarea
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                rows={3}
                                placeholder="Short description (1-2 lines)"
                                value={newHairstyle[category.id]?.description || ""}
                                onChange={(e) =>
                                  setNewHairstyle({
                                    ...newHairstyle,
                                    [category.id]: {
                                      ...newHairstyle[category.id],
                                      description: e.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>

                          {/* Add Button */}
                          <div className="mt-4 flex justify-end">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => addHairstyle(category.id)}
                              disabled={!newHairstyle[category.id]?.name || !newHairstyle[category.id]?.image}
                              className="btn-cta text-sm px-6 py-3 rounded-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="w-4 h-4" /> Add Hairstyle
                            </motion.button>
                          </div>
                        </div>

                        {/* Category Stats */}
                        <div className="flex items-center gap-4 text-xs text-detail pt-2">
                          <span className="flex items-center gap-1">
                            <ImageIcon className="w-3 h-3 text-primary" />
                            {category.hairstyles.length} hairstyles
                          </span>
                          <span className="w-1 h-1 rounded-full bg-detail/30" />
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-green-600" />
                            {category.hairstyles.filter(h => h.image).length} with images
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Tip */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-primary/5 rounded-xl p-4 border border-primary/20 flex items-start gap-3"
      >
        <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-xs text-detail">
          <span className="font-semibold text-primary">💡 Tip:</span> Changes to categories and hairstyles will automatically update across the website and stylist service selection. Make sure each hairstyle has a clear name, description, and quality image.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminCategories;