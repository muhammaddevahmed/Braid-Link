import { useState, useRef } from "react";
import { hairstyleCategories } from "@/data/demo-data";
import { Plus, Edit2, Trash2, ChevronDown, ChevronUp, Upload } from "lucide-react";

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

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold">Hairstyle Categories</h2>

      {/* Add New Category */}
      <div className="bg-card rounded-xl p-5 border border-border">
        <h3 className="font-semibold mb-3 text-sm">Add New Category</h3>
        <div className="flex gap-2">
          <input
            className="flex-1 px-3 py-2.5 rounded-lg border border-input bg-background text-sm"
            placeholder="Category name (e.g., Braids, Twists)"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button
            onClick={addCategory}
            className="btn-cta text-sm flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.id} className="bg-card rounded-xl border border-border overflow-hidden">
            {/* Category Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
              <button
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === category.id ? null : category.id
                  )
                }
                className="flex items-center gap-3 flex-1 text-left"
              >
                {expandedCategory === category.id ? (
                  <ChevronUp className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                )}
                {editingCategoryId === category.id ? (
                  <input
                    autoFocus
                    className="px-2 py-1 rounded border border-input bg-background text-sm flex-1"
                    value={editingCategoryName}
                    onChange={(e) => setEditingCategoryName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") updateCategoryName(category.id);
                      if (e.key === "Escape") setEditingCategoryId(null);
                    }}
                  />
                ) : (
                  <div>
                    <p className="font-medium text-sm">{category.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {category.hairstyles.length} hairstyles
                    </p>
                  </div>
                )}
              </button>
              <div className="flex gap-1">
                {editingCategoryId === category.id ? (
                  <>
                    <button
                      onClick={() => updateCategoryName(category.id)}
                      className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingCategoryId(null)}
                      className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded hover:bg-muted"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingCategoryId(category.id);
                        setEditingCategoryName(category.name);
                      }}
                      className="p-1.5 rounded hover:bg-muted"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteCategory(category.id)}
                      className="p-1.5 rounded hover:bg-destructive/10 text-destructive"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Hairstyles List */}
            {expandedCategory === category.id && (
              <div className="px-4 py-3 space-y-3 bg-muted/30">
                {/* Existing Hairstyles */}
                {category.hairstyles.map((hairstyle, idx) => (
                  <div
                    key={hairstyle.id}
                    className="bg-card rounded-lg p-3 border border-border/50 text-sm"
                  >
                    <div className="grid grid-cols-1 gap-2 mb-2">
                      <input
                        className="px-3 py-2 rounded border border-input bg-background text-sm"
                        placeholder="Hairstyle name"
                        value={hairstyle.name}
                        onChange={(e) =>
                          updateHairstyle(category.id, idx, {
                            name: e.target.value,
                          })
                        }
                      />
                      <textarea
                        className="px-3 py-2 rounded border border-input bg-background text-sm resize-none"
                        rows={2}
                        placeholder="Short description (1-2 lines)"
                        value={hairstyle.description}
                        onChange={(e) =>
                          updateHairstyle(category.id, idx, {
                            description: e.target.value,
                          })
                        }
                      />
                      <div>
                        <label className="text-xs font-medium block mb-1">Upload Image</label>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            ref={(el) => {
                              if (el) fileInputRefs.current[`edit-${category.id}-${idx}`] = el;
                            }}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleImageUpload(file, category.id, idx, false);
                              }
                            }}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const inputKey = `edit-${category.id}-${idx}`;
                              fileInputRefs.current[inputKey]?.click();
                            }}
                            className="w-full px-3 py-2 rounded border border-dashed border-input bg-muted/50 hover:bg-muted text-sm text-muted-foreground font-medium flex items-center justify-center gap-2 transition"
                          >
                            <Upload className="w-3.5 h-3.5" />{" "}
                            {hairstyle.image ? "Change Image" : "Upload Image"}
                          </button>
                        </div>
                      </div>
                    </div>
                    {hairstyle.image && (
                      <img
                        src={hairstyle.image}
                        alt={hairstyle.name}
                        className="w-full max-h-40 object-contain rounded mb-2 bg-muted/50 p-2"
                      />
                    )}
                    <button
                      onClick={() => deleteHairstyle(category.id, idx)}
                      className="w-full py-1 text-xs bg-destructive/10 text-destructive rounded hover:bg-destructive/20"
                    >
                      Delete Hairstyle
                    </button>
                  </div>
                ))}

                {/* Add New Hairstyle */}
                <div className="bg-card rounded-lg p-3 border border-border/50 border-dashed">
                  <div className="grid grid-cols-1 gap-2 mb-2">
                    <input
                      className="px-3 py-2 rounded border border-input bg-background text-sm"
                      placeholder="New hairstyle name"
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
                      className="px-3 py-2 rounded border border-input bg-background text-sm resize-none"
                      rows={2}
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
                    <div>
                      <label className="text-xs font-medium block mb-1">Upload Image</label>
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
                          className="w-full px-3 py-2 rounded border border-dashed border-input bg-muted/50 hover:bg-muted text-sm text-muted-foreground font-medium flex items-center justify-center gap-2 transition"
                        >
                          <Upload className="w-3.5 h-3.5" /> {newHairstyle[category.id]?.image ? "Change Image" : "Upload Image"}
                        </button>
                      </div>
                      {newHairstyle[category.id]?.image && (
                        <img
                          src={newHairstyle[category.id]!.image}
                          alt="preview"
                          className="w-full max-h-40 object-contain rounded mt-2 bg-muted/50 p-2"
                        />
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => addHairstyle(category.id)}
                    className="w-full py-1.5 text-xs bg-primary/10 text-primary rounded hover:bg-primary/20 font-medium flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Hairstyle
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground italic">
        💡 Tip: Changes to categories and hairstyles will automatically update across the website and stylist service selection.
      </p>
    </div>
  );
};

export default AdminCategories;
