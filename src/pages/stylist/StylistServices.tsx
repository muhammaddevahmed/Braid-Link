import { useState } from "react";
import { stylists } from "@/data/demo-data";
import { Plus, Trash2 } from "lucide-react";

const StylistServices = () => {
  const [services, setServices] = useState(stylists[0].services.map(s => ({ ...s })));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl font-bold">My Services</h2>
        <button onClick={() => setServices([...services, { id: `new_${Date.now()}`, name: "", price: 0, duration: "", description: "", image: "" }])} className="btn-cta text-xs flex items-center gap-1"><Plus className="w-4 h-4" /> Add Service</button>
      </div>
      <div className="space-y-3">
        {services.map((svc, i) => (
          <div key={svc.id} className="bg-card rounded-xl p-5 border border-border">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div><label className="text-xs font-medium mb-1 block">Service Name</label><input className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" value={svc.name} onChange={(e) => { const s = [...services]; s[i].name = e.target.value; setServices(s); }} /></div>
              <div><label className="text-xs font-medium mb-1 block">Price ($)</label><input type="number" className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" value={svc.price} onChange={(e) => { const s = [...services]; s[i].price = Number(e.target.value); setServices(s); }} /></div>
              <div className="flex gap-2 items-end">
                <div className="flex-1"><label className="text-xs font-medium mb-1 block">Duration</label><input className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm" value={svc.duration} onChange={(e) => { const s = [...services]; s[i].duration = e.target.value; setServices(s); }} /></div>
                <button onClick={() => setServices(services.filter((_, j) => j !== i))} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn-primary text-sm">Save Changes</button>
    </div>
  );
};

export default StylistServices;
