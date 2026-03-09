import { users, stylists } from "@/data/demo-data";
import { useState } from "react";
import { Star, Trash2 } from "lucide-react";

const AdminUsers = () => {
  const [list, setList] = useState(users.map(u => ({ ...u })));
  const [stylistList, setStylistList] = useState(stylists.map(s => ({ ...s })));

  // Get subscription plan name
  const getSubscriptionName = (plan: string) => {
    const plans: Record<string, string> = {
      starter: "Starter",
      growth: "Growth",
      pro: "Pro"
    };
    return plans[plan] || plan;
  };

  // Find stylist by user id
  const getStylistByUserId = (userId: string) => {
    return stylistList.find(s => s.id === userId);
  };

  const toggleFeatured = (stylistId: string) => {
    setStylistList(stylistList.map(s => 
      s.id === stylistId ? { ...s, featured: !s.featured } : s
    ));
  };

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold">User Management</h2>
      <div className="bg-card rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border bg-muted/50"><th className="text-left px-4 py-3 font-medium">Name</th><th className="text-left px-4 py-3 font-medium">Email</th><th className="text-left px-4 py-3 font-medium">Role</th><th className="text-left px-4 py-3 font-medium">Plan</th><th className="text-left px-4 py-3 font-medium">Status</th><th className="text-left px-4 py-3 font-medium">Actions</th></tr></thead>
          <tbody>{list.map((u) => {
            const isStylest = u.role === "stylist";
            const stylist = isStylest ? getStylistByUserId(u.id) : null;
            const isFeatured = stylist?.featured || false;
            
            return (
            <tr key={u.id} className="border-b border-border last:border-0">
              <td className="px-4 py-3 flex items-center gap-2"><img src={u.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />{u.name}</td>
              <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
              <td className="px-4 py-3 capitalize">{u.role}</td>
              <td className="px-4 py-3">
                {isStylest && stylist ? (
                  <span className="text-xs font-semibold text-accent">
                    {getSubscriptionName(stylist.subscriptionPlan)}
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">-</span>
                )}
              </td>
              <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${u.status === "active" ? "bg-green-100 text-green-700" : "bg-destructive/10 text-destructive"}`}>{u.status}</span></td>
              <td className="px-4 py-3 flex gap-1">
                {isStylest && (
                  <button 
                    onClick={() => toggleFeatured(stylist!.id)}
                    className={`text-xs px-3 py-1 rounded border flex items-center gap-1 transition ${
                      isFeatured 
                        ? "border-accent bg-accent/10 text-accent" 
                        : "border-border hover:bg-muted text-muted-foreground"
                    }`}
                  >
                    <Star className="w-3 h-3" fill={isFeatured ? "currentColor" : "none"} /> 
                    {isFeatured ? "Featured" : "Feature"}
                  </button>
                )}
                <button onClick={() => setList(list.map(l => l.id === u.id ? { ...l, status: l.status === "active" ? "suspended" as const : "active" as const } : l))} className="text-xs px-2 py-1 rounded border border-input hover:bg-muted">{u.status === "active" ? "Suspend" : "Activate"}</button>
                <button className="text-xs px-2 py-1 rounded border border-destructive text-destructive hover:bg-destructive/10"><Trash2 className="w-3 h-3" /></button>
              </td>
            </tr>
            );
          })}</tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
