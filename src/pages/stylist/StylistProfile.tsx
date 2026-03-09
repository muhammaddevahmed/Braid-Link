import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { stylists } from "@/data/demo-data";

const StylistProfile = () => {
  const { user } = useAuth();
  const s = stylists[0];
  const [form, setForm] = useState({ name: s.name, bio: s.bio, experience: String(s.experience), location: s.location, postalCode: s.postalCode });
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6 max-w-lg">
      <h2 className="font-serif text-2xl font-bold">Profile Settings</h2>
      <div className="bg-card rounded-xl p-6 border border-border space-y-4">
        <div className="flex items-center gap-4 mb-2">
          <img src={user?.avatar} alt="" className="w-16 h-16 rounded-full object-cover" />
          <div><p className="font-semibold">{s.name}</p><p className="text-sm text-muted-foreground">{s.location}</p></div>
        </div>
        <div><label className="text-sm font-medium mb-1 block">Name</label><input className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div><label className="text-sm font-medium mb-1 block">Bio</label><textarea className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm h-24 resize-none" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-medium mb-1 block">Experience (years)</label><input type="number" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} /></div>
          <div><label className="text-sm font-medium mb-1 block">Postal Code</label><input className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm" value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} /></div>
        </div>
        <div><label className="text-sm font-medium mb-1 block">Location</label><input className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} className="btn-cta text-sm">{saved ? "Saved ✓" : "Save Changes"}</button>
      </div>
    </div>
  );
};

export default StylistProfile;
