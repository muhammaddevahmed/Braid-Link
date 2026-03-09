import { useState } from "react";
import { hairstyles } from "@/data/demo-data";
import { Plus, Edit2, Trash2 } from "lucide-react";

const AdminCategories = () => {
  const categories = [...new Set(hairstyles.map(h => h.category))];
  const [cats, setCats] = useState(categories);
  const [newCat, setNewCat] = useState("");

  return (
    <div className="space-y-6 max-w-lg">
      <h2 className="font-serif text-2xl font-bold">Hairstyle Categories</h2>
      <div className="flex gap-2">
        <input className="flex-1 px-3 py-2.5 rounded-lg border border-input bg-background text-sm" placeholder="New category name" value={newCat} onChange={(e) => setNewCat(e.target.value)} />
        <button onClick={() => { if (newCat) { setCats([...cats, newCat]); setNewCat(""); } }} className="btn-cta text-sm flex items-center gap-1"><Plus className="w-4 h-4" /> Add</button>
      </div>
      <div className="bg-card rounded-xl border border-border">
        {cats.map((c, i) => (
          <div key={c} className="flex items-center justify-between px-4 py-3 border-b border-border last:border-0">
            <div><p className="font-medium text-sm">{c}</p><p className="text-xs text-muted-foreground">{hairstyles.filter(h => h.category === c).length} styles</p></div>
            <div className="flex gap-1">
              <button className="p-1.5 rounded hover:bg-muted"><Edit2 className="w-3.5 h-3.5" /></button>
              <button onClick={() => setCats(cats.filter((_, j) => j !== i))} className="p-1.5 rounded hover:bg-destructive/10 text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;
