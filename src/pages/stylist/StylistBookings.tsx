import { useState } from "react";
import { useBooking } from "@/contexts/BookingContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const StylistBookings = () => {
  const [tab, setTab] = useState("pending-approval");
  const { user } = useAuth();
  const { getStylistBookings, updateBookingStatus } = useBooking();

  // This component should only be rendered for stylists, so user should not be null.
  const myBookings = user ? getStylistBookings(user.id).filter(b => b.status === tab) : [];

  const handleApprove = (bookingId: string) => {
    updateBookingStatus(bookingId, "approved");
  };

  const handleReject = (bookingId: string) => {
    updateBookingStatus(bookingId, "rejected");
  };

  const handleMarkComplete = (bookingId: string) => {
    updateBookingStatus(bookingId, "completed");
  };

  const statusTabs: ("pending-approval" | "approved" | "upcoming" | "completed" | "rejected")[] = 
    ["pending-approval", "approved", "upcoming", "completed", "rejected"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending-approval": return "border-yellow-500";
      case "approved": return "border-blue-500";
      case "upcoming": return "border-green-500";
      case "completed": return "border-gray-400";
      case "rejected":
      case "cancelled": return "border-red-500";
      default: return "border-border";
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold">Manage Bookings</h2>
      <div className="flex gap-2 flex-wrap">
        {statusTabs.map((t) => (
          <button 
            key={t} 
            onClick={() => setTab(t)} 
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            {t.replace('-', ' ')}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {myBookings.map((b) => (
          <div key={b.id} className={cn("bg-card rounded-xl p-5 border-l-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4", getStatusColor(b.status))}>
            <div>
              <p className="font-semibold">{b.service}</p>
              <p className="text-sm text-muted-foreground">{b.customerName} · {b.date} at {b.time}</p>
              {b.notes && <p className="text-xs text-muted-foreground mt-1 italic">Note: "{b.notes}"</p>}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="font-bold">${b.price}</span>
              {tab === "pending-approval" && (
                <>
                  <button onClick={() => handleApprove(b.id)} className="btn-primary text-xs px-3 py-1.5">Approve</button>
                  <button onClick={() => handleReject(b.id)} className="text-xs px-3 py-1.5 rounded-lg border border-destructive text-destructive hover:bg-destructive/10">Reject</button>
                </>
              )}
              {tab === "approved" && (
                <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full">Awaiting Payment</span>
              )}
              {tab === "upcoming" && (
                <button onClick={() => handleMarkComplete(b.id)} className="btn-cta text-xs px-3 py-1.5">Mark as Completed</button>
              )}
            </div>
          </div>
        ))}
        {myBookings.length === 0 && <p className="text-sm text-muted-foreground py-8 text-center">No {tab.replace('-', ' ')} bookings</p>}
      </div>
    </div>
  );
};

export default StylistBookings;
