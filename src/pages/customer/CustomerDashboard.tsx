import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { bookings, stylists, reviews } from "@/data/demo-data";
import { Calendar, Star, Heart, ArrowRight } from "lucide-react";

const CustomerDashboard = () => {
  const upcoming = bookings.filter((b) => b.customerId === "c1" && b.status === "upcoming");
  const recent = bookings.filter((b) => b.customerId === "c1" && b.status === "completed").slice(0, 2);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold">Welcome back, Sarah!</h2>
        <p className="text-muted-foreground text-sm">Here's what's happening with your appointments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Upcoming", value: upcoming.length, icon: Calendar, color: "bg-primary/10 text-primary" },
          { label: "Completed", value: 5, icon: Star, color: "bg-secondary/30 text-accent" },
          { label: "Favorites", value: 3, icon: Heart, color: "bg-cta/10 text-cta" },
          { label: "Reviews", value: 4, icon: Star, color: "bg-green-100 text-green-700" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-card rounded-xl p-4 border border-border">
            <div className={`w-9 h-9 rounded-lg ${stat.color} flex items-center justify-center mb-3`}><stat.icon className="w-4 h-4" /></div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Upcoming */}
      <div className="bg-card rounded-xl p-5 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif font-semibold text-lg">Upcoming Bookings</h3>
          <Link to="/customer/bookings" className="text-sm text-cta hover:underline flex items-center gap-1">View All <ArrowRight className="w-3.5 h-3.5" /></Link>
        </div>
        <div className="space-y-3">
          {upcoming.map((b) => (
            <div key={b.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <img src={stylists.find((s) => s.id === b.stylistId)?.photo} alt="" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-sm">{b.service}</p>
                  <p className="text-xs text-muted-foreground">with {b.stylistName} · {b.date} at {b.time}</p>
                </div>
              </div>
              <span className="font-semibold text-sm">${b.price}</span>
            </div>
          ))}
          {upcoming.length === 0 && <p className="text-sm text-muted-foreground">No upcoming bookings</p>}
        </div>
      </div>

      {/* Recommended */}
      <div className="bg-card rounded-xl p-5 border border-border">
        <h3 className="font-serif font-semibold text-lg mb-4">Recommended Stylists</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stylists.slice(0, 3).map((s) => (
            <Link key={s.id} to={`/stylist/${s.id}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
              <img src={s.photo} alt={s.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-medium">{s.name}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Star className="w-3 h-3 fill-secondary text-secondary" /> {s.rating}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
