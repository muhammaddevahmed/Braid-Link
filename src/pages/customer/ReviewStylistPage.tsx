import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { stylists } from "@/data/demo-data";
import { Star, Check } from "lucide-react";

const ReviewStylistPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const stylistId = params.get("stylist") || "";
  const service = params.get("service") || "";
  const bookingId = params.get("booking") || "";

  const stylist = stylists.find((s) => s.id === stylistId);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 text-center max-w-md">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-serif text-3xl font-bold mb-3">Thank You!</h1>
            <p className="text-muted-foreground mb-6">Your review has been submitted successfully. It helps other customers find great stylists!</p>
            <div className="flex gap-3 justify-center">
              <Link to="/customer/bookings" className="btn-primary text-sm px-6 py-2.5">View Bookings</Link>
              <Link to="/customer/dashboard" className="btn-cta text-sm px-6 py-2.5">Dashboard</Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!stylist) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">Stylist not found.</p>
        <Link to="/customer/bookings" className="btn-primary text-sm mt-4 inline-block">Back to Bookings</Link>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-serif text-3xl font-bold text-center mb-2">Review Your Experience</h1>
          <p className="text-muted-foreground text-center mb-8">How was your {service} with {stylist.name}?</p>

          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
              <img src={stylist.photo} alt={stylist.name} className="w-16 h-16 rounded-full object-cover" />
              <div>
                <h3 className="font-serif font-semibold text-lg">{stylist.name}</h3>
                <p className="text-sm text-muted-foreground">{service} · Booking #{bookingId}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star className={`w-8 h-8 ${(hoverRating || rating) >= star ? "fill-secondary text-secondary" : "text-muted-foreground/30"}`} />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    {rating === 5 ? "Excellent!" : rating === 4 ? "Great!" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Poor"}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Your Review</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-input bg-background text-sm h-32 resize-none"
                  placeholder="Tell others about your experience..."
                  required
                />
              </div>

              <button type="submit" disabled={rating === 0} className="btn-cta w-full text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                Submit Review
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewStylistPage;
