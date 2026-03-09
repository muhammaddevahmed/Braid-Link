import { motion } from "framer-motion";
import { bookings, reviews, stylists } from "@/data/demo-data";
import { Calendar, DollarSign, Star, TrendingUp } from "lucide-react";

const StylistDashboard = () => {
  const s = stylists[0];
  const myBookings = bookings.filter((b) => b.stylistId === "s1");
  const upcoming = myBookings.filter((b) => b.status === "upcoming");
  const myReviews = reviews.filter((r) => r.stylistId === "s1").slice(0, 3);

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold">Welcome, {s.name}!</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "This Week", value: upcoming.length, icon: Calendar, color: "bg-primary/10 text-primary" },
          { label: "Total Earnings", value: `$${s.totalEarnings.toLocaleString()}`, icon: DollarSign, color: "bg-secondary/30 text-accent" },
          { label: "Monthly", value: `$${s.monthlyEarnings.toLocaleString()}`, icon: TrendingUp, color: "bg-green-100 text-green-700" },
          { label: "Rating", value: s.rating, icon: Star, color: "bg-cta/10 text-cta" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl p-4 border border-border">
            <div className={`w-9 h-9 rounded-lg ${stat.color} flex items-center justify-center mb-3`}><stat.icon className="w-4 h-4" /></div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>
      <div className="bg-card rounded-xl p-5 border border-border">
        <h3 className="font-serif font-semibold text-lg mb-4">Upcoming Appointments</h3>
        <div className="space-y-3">
          {upcoming.map((b) => (
            <div key={b.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div><p className="font-medium text-sm">{b.service}</p><p className="text-xs text-muted-foreground">{b.customerName} · {b.date} at {b.time}</p></div>
              <span className="font-semibold text-sm">${b.price}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card rounded-xl p-5 border border-border">
        <h3 className="font-serif font-semibold text-lg mb-4">Recent Reviews</h3>
        <div className="space-y-3">
          {myReviews.map((r) => (
            <div key={r.id} className="pb-3 border-b border-border last:border-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium">{r.customerName}</span>
                <div className="flex">{Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="w-3 h-3 fill-secondary text-secondary" />)}</div>
              </div>
              <p className="text-sm text-muted-foreground">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StylistDashboard;
