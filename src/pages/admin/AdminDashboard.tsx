import { motion } from "framer-motion";
import { Users, Scissors, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { bookings, stylists, users } from "@/data/demo-data";

const AdminDashboard = () => {
  const totalRevenue = stylists.reduce((a, s) => a + s.totalEarnings, 0);
  const stats = [
    { label: "Total Users", value: users.length, icon: Users, color: "bg-primary/10 text-primary" },
    { label: "Stylists", value: stylists.length, icon: Scissors, color: "bg-secondary/30 text-accent" },
    { label: "Bookings", value: bookings.length, icon: Calendar, color: "bg-cta/10 text-cta" },
    { label: "Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "bg-green-100 text-green-700" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold">Admin Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl p-4 border border-border">
            <div className={`w-9 h-9 rounded-lg ${s.color} flex items-center justify-center mb-3`}><s.icon className="w-4 h-4" /></div>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl p-5 border border-border">
          <h3 className="font-serif font-semibold mb-4">Recent Bookings</h3>
          <div className="space-y-3">{bookings.slice(0, 5).map((b) => (
            <div key={b.id} className="flex justify-between text-sm py-2 border-b border-border last:border-0">
              <div><p className="font-medium">{b.service}</p><p className="text-xs text-muted-foreground">{b.customerName} → {b.stylistName}</p></div>
              <div className="text-right"><p className="font-semibold">${b.price}</p><span className={`text-xs px-2 py-0.5 rounded-full ${b.status === "upcoming" ? "bg-primary/10 text-primary" : b.status === "completed" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>{b.status}</span></div>
            </div>
          ))}</div>
        </div>
        <div className="bg-card rounded-xl p-5 border border-border">
          <h3 className="font-serif font-semibold mb-4">Monthly Revenue</h3>
          <div className="flex items-end gap-2 h-40">
            {[{m:"Oct",v:12400},{m:"Nov",v:15200},{m:"Dec",v:18600},{m:"Jan",v:14800},{m:"Feb",v:17200},{m:"Mar",v:16500}].map((d) => (
              <div key={d.m} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md bg-primary/80" style={{ height: `${(d.v / 20000) * 100}%` }} />
                <span className="text-xs text-muted-foreground">{d.m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
