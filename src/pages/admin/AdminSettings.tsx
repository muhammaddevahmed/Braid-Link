import { Settings } from "lucide-react";

const AdminSettings = () => (
  <div className="space-y-6 max-w-lg">
    <h2 className="font-serif text-2xl font-bold">Platform Settings</h2>
    <div className="bg-card rounded-xl p-6 border border-border space-y-4">
      <div><label className="text-sm font-medium mb-1 block">Platform Name</label><input className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm" defaultValue="BraidBook" /></div>
      <div><label className="text-sm font-medium mb-1 block">Support Email</label><input className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm" defaultValue="support@braidbook.com" /></div>
      <div><label className="text-sm font-medium mb-1 block">Platform Fee (%)</label><input type="number" className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm" defaultValue="10" /></div>
      <div><label className="text-sm font-medium mb-1 block">Currency</label>
        <select className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm"><option>USD</option><option>EUR</option><option>GBP</option></select>
      </div>
      <button className="btn-cta text-sm">Save Settings</button>
    </div>
  </div>
);

export default AdminSettings;
