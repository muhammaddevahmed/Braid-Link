import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const CustomerProfile = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "" });
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6 max-w-lg">
      <h2 className="font-serif text-2xl font-bold">Edit Profile</h2>
      <div className="bg-card rounded-xl p-6 border border-border space-y-4">
        <div className="flex items-center gap-4 mb-2">
          <img src={user?.avatar} alt="" className="w-16 h-16 rounded-full object-cover" />
          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </div>
        <div><label className="text-sm font-medium mb-1 block">Full Name</label><input className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
        <div><label className="text-sm font-medium mb-1 block">Email</label><input type="email" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        <div><label className="text-sm font-medium mb-1 block">Phone</label><input className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }} className="btn-cta text-sm">{saved ? "Saved ✓" : "Save Changes"}</button>
      </div>
    </div>
  );
};

export default CustomerProfile;
