import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/BookingContext";
import { stylists, Booking } from "@/data/demo-data";
import { Star, CreditCard, XCircle, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PaymentDialog } from "@/components/PaymentDialog";
import { cn } from "@/lib/utils";

const CustomerBookings = () => {
  const { user } = useAuth();
  const { getCustomerBookings, updateBookingStatus } = useBooking();
  const [tab, setTab] = useState("upcoming");
  const [paymentBooking, setPaymentBooking] = useState<Booking | null>(null);

  if (!user) {
    // Or a loading spinner, or a message
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (<Skeleton key={i} className="h-10 w-28" />))}
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (<Skeleton key={i} className="h-24 w-full rounded-xl" />))}
        </div>
      </div>
    );
  }

  const myBookings = getCustomerBookings(user.id);
  const filteredBookings = myBookings.filter((b) => b.status === tab);
  
  const statusTabs: ("pending-approval" | "approved" | "upcoming" | "completed" | "cancelled")[] = 
    ["pending-approval", "approved", "upcoming", "completed", "cancelled"];

  const handleCancelBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, "cancelled");
  };

  const getStatusPill = (status: string) => {
    switch (status) {
      case "pending-approval": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-blue-100 text-blue-800";
      case "upcoming": return "bg-green-100 text-green-800";
      case "completed": return "bg-gray-100 text-gray-800";
      case "rejected":
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <PaymentDialog
        booking={paymentBooking}
        onClose={() => setPaymentBooking(null)}
        onPaymentSuccess={() => {
          setPaymentBooking(null);
          setTab("upcoming"); // Switch tab to see the newly confirmed booking
        }}
      />
      <motion.h2 
        className="font-serif text-2xl font-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Bookings
      </motion.h2>

      <motion.div 
        className="flex gap-2 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {statusTabs.map((t) => (
          <button 
            key={t} 
            onClick={() => setTab(t)} 
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${tab === t ? "bg-primary text-primary-foreground shadow-md" : "bg-card hover:bg-muted text-muted-foreground border border-border"}`}
          >
            {t.replace('-', ' ')} ({myBookings.filter((b) => b.status === t).length})
          </button>
        ))}
      </motion.div>

      <div className="space-y-3">
        {filteredBookings.map((b, idx) => {
          const stylist = stylists.find((s) => s.id === b.stylistId);
          return (
            <motion.div 
              key={b.id} 
              className="bg-card rounded-xl p-5 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-all duration-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="flex items-center gap-4">
                <img src={stylist?.photo} alt={stylist?.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-border" />
                <div>
                  <p className="font-semibold">{b.service}</p>
                  <p className="text-sm text-muted-foreground">with {b.stylistName}</p>
                  <p className="text-xs text-muted-foreground">{b.date} at {b.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-bold">${b.price}</p>
                  <span className={cn('text-xs px-2 py-0.5 rounded-full capitalize font-semibold', getStatusPill(b.status))}>
                    {b.status.replace('-', ' ')}
                  </span>
                </div>
                {tab === "pending-approval" && (
                   <div className="flex items-center gap-1 text-muted-foreground text-xs">
                     <Clock className="w-3.5 h-3.5" /> Awaiting Stylist Approval
                   </div>
                )}
                 {tab === "approved" && (
                  <button
                    onClick={() => setPaymentBooking(b)}
                    className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1 hover-scale"
                  >
                    <CreditCard className="w-3.5 h-3.5" /> Pay Now
                  </button>
                )}
                {tab === "upcoming" && (
                  <button
                    onClick={() => handleCancelBooking(b.id)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Cancel
                  </button>
                )}
                {tab === "completed" && (
                  <Link
                    to={`/review-stylist?stylist=${b.stylistId}&service=${encodeURIComponent(b.service)}&booking=${b.id}`}
                    className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1 hover-scale"
                  >
                    <Star className="w-3.5 h-3.5" /> Leave Review
                  </Link>
                )}
              </div>
            </motion.div>
          );
        })}
        {filteredBookings.length === 0 && (
          <motion.p 
            className="text-sm text-muted-foreground py-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No {tab.replace('-', ' ')} bookings found.
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default CustomerBookings;
