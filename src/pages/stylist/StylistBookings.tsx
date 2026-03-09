import { useState } from "react";
import { bookings } from "@/data/demo-data";

const StylistBookings = () => {
  const [tab, setTab] = useState("upcoming");
  const [localBookings, setLocalBookings] = useState(bookings);
  const myBookings = localBookings.filter((b) => b.stylistId === "s1" && b.status === tab);

  const handleAction = (id, newStatus) => {
    setLocalBookings(localBookings.map((b) => b.id === id ? { ...b, status: newStatus } : b));
  };

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold">Manage Bookings</h2>
      <div className="flex gap-2">
        {["pending", "upcoming", "completed", "cancelled"].map((t) => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{t}</button>
        ))}
      </div>
      <div className="space-y-3">
        {myBookings.map((b) => (
          <div key={b.id} className="bg-card rounded-xl p-5 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold">{b.service}</p>
              <p className="text-sm text-muted-foreground">{b.customerName} · {b.date} at {b.time}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">${b.price}</span>
              {tab === "pending" && (
                <>
                  <button onClick={() => handleAction(b.id, "upcoming")} className="btn-primary text-xs px-3 py-1.5">Accept</button>
                  <button onClick={() => handleAction(b.id, "cancelled")} className="text-xs px-3 py-1.5 rounded-lg border border-destructive text-destructive hover:bg-destructive/10">Decline</button>
                </>
              )}
              {tab === "upcoming" && <button onClick={() => handleAction(b.id, "completed")} className="btn-cta text-xs px-3 py-1.5">Mark Complete</button>}
            </div>
          </div>
        ))}
        {myBookings.length === 0 && <p className="text-sm text-muted-foreground py-8 text-center">No {tab} bookings</p>}
      </div>
    </div>
  );
};

export default StylistBookings;
