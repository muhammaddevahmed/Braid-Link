import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { bookings as initialBookings, stylists } from "@/data/demo-data";
import { Star, CheckCircle, XCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const tabs = ["upcoming", "completed", "cancelled"];

const CustomerBookings = () => {
  const [tab, setTab] = useState("upcoming");
  const [myBookings, setMyBookings] = useState(initialBookings.filter((b) => b.customerId === "c1"));
  const [reviewedIds, setReviewedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filtered = myBookings.filter((b) => b.status === tab);

  const handleMarkComplete = (bookingId) => {
    setMyBookings(myBookings.map((b) => b.id === bookingId ? { ...b, status: "completed" } : b));
  };

  const handleDeclineBooking = (bookingId) => {
    setMyBookings(myBookings.map((b) => b.id === bookingId ? { ...b, status: "cancelled" } : b));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-2">
          {tabs.map((t) => (
            <Skeleton key={t} className="h-10 w-28" />
          ))}
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.h2 
        className="font-serif text-2xl font-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Bookings
      </motion.h2>

      <motion.div 
        className="flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {tabs.map((t) => (
          <button 
            key={t} 
            onClick={() => setTab(t)} 
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${tab === t ? "bg-primary text-primary-foreground shadow-md" : "bg-card hover:bg-muted text-muted-foreground border border-border"}`}
          >
            {t} ({myBookings.filter((b) => b.status === t).length})
          </button>
        ))}
      </motion.div>

      <div className="space-y-3">
        {filtered.map((b, idx) => {
          const stylist = stylists.find((s) => s.id === b.stylistId);
          const isReviewed = reviewedIds.includes(b.id);
          return (
            <motion.div 
              key={b.id} 
              className="bg-card rounded-xl p-5 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-all duration-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="flex items-center gap-4">
                <img src={stylist?.photo} alt="" className="w-12 h-12 rounded-full object-cover ring-2 ring-border" />
                <div>
                  <p className="font-semibold">{b.service}</p>
                  <p className="text-sm text-muted-foreground">with {b.stylistName}</p>
                  <p className="text-xs text-muted-foreground">{b.date} at {b.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="font-bold">${b.price}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${b.status === "upcoming" ? "bg-primary/10 text-primary" : b.status === "completed" ? "bg-green-100 text-green-700" : "bg-destructive/10 text-destructive"}`}>
                    {b.status}
                  </span>
                </div>
                {tab === "upcoming" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMarkComplete(b.id)}
                      className="btn-cta text-xs px-3 py-1.5 flex items-center gap-1 hover-scale"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Complete
                    </button>
                    <button
                      onClick={() => handleDeclineBooking(b.id)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors flex items-center gap-1"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Decline
                    </button>
                  </div>
                )}
                {tab === "completed" && !isReviewed && (
                  <Link
                    to={`/review-stylist?stylist=${b.stylistId}&service=${encodeURIComponent(b.service)}&booking=${b.id}`}
                    className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1 hover-scale"
                  >
                    <Star className="w-3.5 h-3.5" /> Leave Review
                  </Link>
                )}
                {tab === "completed" && isReviewed && (
                  <span className="text-xs text-green-600 flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-green-600" /> Reviewed</span>
                )}
              </div>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <motion.p 
            className="text-sm text-muted-foreground py-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No {tab} bookings
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default CustomerBookings;
