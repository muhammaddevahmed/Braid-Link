import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { stylists } from "@/data/demo-data";
import { 
  Star, Check, MessageCircle, Sparkles, Award,
  ChevronRight, Heart, ThumbsUp, Camera, Quote,
  AlertCircle, Shield, Calendar, Clock
} from "lucide-react";

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
  const [recommend, setRecommend] = useState<boolean | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const reviewTags = [
    "Professional", "Friendly", "Skilled", "Punctual", 
    "Clean workspace", "Good value", "Attention to detail", 
    "Great communication", "Would book again"
  ];

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter(t => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-20 bg-gradient-to-b from-background to-secondary/10 min-h-screen">
        <div className="container mx-auto px-4 text-center max-w-md">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Check className="w-12 h-12 text-green-600" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
            </div>
            
            <h1 className="font-serif text-3xl font-bold mb-3 text-primary">Thank You!</h1>
            <p className="text-detail mb-6">Your review has been submitted successfully. It helps other customers find great stylists!</p>
            
            <div className="bg-primary/5 rounded-xl p-5 border border-primary/20 mb-6 text-left">
              <h3 className="font-serif font-semibold text-primary mb-3 flex items-center gap-2">
                <Star className="w-4 h-4 fill-primary text-primary" />
                Review Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-detail">Rating</span>
                  <div className="flex gap-1">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-detail">Service</span>
                  <span className="font-medium text-primary">{service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-detail">Stylist</span>
                  <span className="font-medium text-primary">{stylist?.name}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/customer/bookings" className="btn-primary text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" />
                View Bookings
              </Link>
              <Link to="/customer/dashboard" className="btn-cta text-sm px-6 py-3 rounded-xl flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!stylist) {
    return (
      <div className="py-20 bg-gradient-to-b from-background to-secondary/10 min-h-screen">
        <div className="container mx-auto px-4 text-center max-w-md">
          <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-xl">
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-primary mb-2">Stylist Not Found</h2>
            <p className="text-detail mb-6">The stylist you're trying to review could not be found.</p>
            <Link to="/customer/bookings" className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl">
              Back to Bookings
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gradient-to-b from-background to-secondary/10 min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-medium px-5 py-2.5 rounded-full mb-4 border border-primary/30">
              <MessageCircle className="w-4 h-4" />
              <span>Share Your Experience</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-3">Write a Review</h1>
            <p className="text-detail max-w-md mx-auto">
              Help others by sharing your experience with {stylist.name}
            </p>
          </div>

          {/* Stylist Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card rounded-2xl p-6 border border-border/50 shadow-xl mb-6"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <img 
                  src={stylist.photo} 
                  alt={stylist.name} 
                  className="w-20 h-20 rounded-xl object-cover ring-2 ring-primary/20" 
                />
                {stylist.featured && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Award className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl font-bold text-primary">{stylist.name}</h3>
                <p className="text-sm text-detail flex items-center gap-2 mt-1">
                  <Calendar className="w-3.5 h-3.5" /> Booking #{bookingId}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {service}
                  </span>
                  <span className="text-xs bg-muted text-detail px-3 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Review Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Rating Section */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-primary" /> Your Rating
                </label>
                <div className="flex flex-col items-center p-6 bg-primary/5 rounded-xl border border-primary/20">
                  <div className="flex gap-2 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform focus:outline-none"
                      >
                        <Star 
                          className={`w-10 h-10 transition-all ${
                            (hoverRating || rating) >= star 
                              ? "fill-primary text-primary drop-shadow-lg" 
                              : "text-muted-foreground/30"
                          }`} 
                        />
                      </motion.button>
                    ))}
                  </div>
                  
                  <AnimatePresence>
                    {rating > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center"
                      >
                        <p className="text-lg font-semibold text-primary">
                          {rating === 5 && "Excellent! 🌟"}
                          {rating === 4 && "Great! ✨"}
                          {rating === 3 && "Good 👍"}
                          {rating === 2 && "Fair 👌"}
                          {rating === 1 && "Poor 💔"}
                        </p>
                        <p className="text-xs text-detail mt-1">
                          {rating === 5 && "You had an amazing experience!"}
                          {rating === 4 && "You were very satisfied!"}
                          {rating === 3 && "It was a decent experience"}
                          {rating === 2 && "There's room for improvement"}
                          {rating === 1 && "We're sorry to hear that"}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

             

              {/* Review Text */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 text-primary" /> Your Review
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Tell others about your experience with the stylist, the service quality, and anything else you'd like to share..."
                  required
                />
                <p className="text-xs text-detail text-right">
                  {comment.length}/500 characters
                </p>
              </div>

             

              

              {/* Submit Button */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={rating === 0 || !comment.trim()} 
                className="btn-cta w-full text-sm py-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Star className="w-4 h-4" />
                Submit Review
              </motion.button>

              {/* Trust Message */}
              <p className="text-xs text-center text-detail flex items-center justify-center gap-1">
                <Shield className="w-3 h-3 text-primary" />
                Your review will be public and helps the community
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewStylistPage;