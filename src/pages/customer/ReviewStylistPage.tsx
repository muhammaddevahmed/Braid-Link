import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { stylists } from "@/data/demo-data";
import { 
  Star, Check, MessageCircle, Sparkles, Award,
  ChevronRight, Heart, ThumbsUp, Camera, Quote,
  AlertCircle, Shield, Calendar, Clock, BadgeCheck,
  Zap, Gift, Send, Pen, Edit, Smile,
  X, CheckCircle, Award as AwardIcon
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
            className="bg-card rounded-3xl p-8 md:p-10 border border-border/50 shadow-2xl"
          >
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 flex items-center justify-center mx-auto border-4 border-emerald-500/20">
                <Check className="w-12 h-12 text-emerald-500" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-accent to-accent/80 rounded-xl flex items-center justify-center shadow-xl"
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
            </div>
            
            <h1 className="font-serif text-3xl font-bold text-primary mb-3">Thank You!</h1>
            <p className="text-muted-foreground mb-8 text-lg">Your review has been submitted successfully. It helps other customers find great stylists!</p>
            
            <div className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl p-6 border border-accent/20 mb-8 text-left">
              <h3 className="font-serif font-semibold text-primary mb-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                </div>
                Review Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-2 bg-background/50 rounded-lg">
                  <span className="text-muted-foreground">Rating</span>
                  <div className="flex gap-1">
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 bg-background/50 rounded-lg">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-medium text-primary bg-accent/10 px-3 py-1 rounded-full">{service}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-background/50 rounded-lg">
                  <span className="text-muted-foreground">Stylist</span>
                  <span className="font-medium text-primary">{stylist?.name}</span>
                </div>
                {tags.length > 0 && (
                  <div className="flex justify-between items-center p-2 bg-background/50 rounded-lg">
                    <span className="text-muted-foreground">Tags</span>
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">{tags.length} selected</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/customer/bookings" className="bg-primary/10 text-primary hover:bg-primary/20 font-semibold text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all border border-primary/20 group">
                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                View Bookings
              </Link>
              <Link to="/customer/dashboard" className="bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent/25 transition-all group">
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
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
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-card rounded-3xl p-8 border border-border/50 shadow-2xl"
          >
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-destructive/10 to-destructive/5 flex items-center justify-center mx-auto mb-6 border border-destructive/20">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-primary mb-2">Stylist Not Found</h2>
            <p className="text-muted-foreground mb-8">The stylist you're trying to review could not be found.</p>
            <Link to="/customer/bookings" className="bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold inline-flex items-center gap-2 px-6 py-3.5 rounded-xl hover:shadow-lg hover:shadow-accent/25 transition-all group">
              Back to Bookings
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-20 bg-gradient-to-b from-background to-secondary/10 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header - Premium redesign */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/10 to-accent/5 text-accent text-xs font-medium px-5 py-2.5 rounded-full mb-4 border border-accent/20 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share Your Experience</span>
            </motion.div>
            
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-3">Write a Review</h1>
            <p className="text-muted-foreground max-w-md mx-auto flex items-center gap-2">
              <Pen className="w-4 h-4 text-accent" />
              Help others by sharing your experience with <span className="font-semibold text-primary">{stylist.name}</span>
            </p>
          </div>

          {/* Stylist Card - Premium redesign */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-card rounded-2xl p-6 md:p-8 border border-border/50 shadow-xl hover:shadow-2xl transition-all mb-8"
          >
            <div className="flex items-center gap-5">
              <div className="relative">
                <img 
                  src={stylist.photo} 
                  alt={stylist.name} 
                  className="w-24 h-24 rounded-xl object-cover ring-2 ring-accent/20 shadow-lg" 
                />
                {stylist.featured && (
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full flex items-center justify-center shadow-lg">
                    <AwardIcon className="w-4 h-4 text-white" />
                  </div>
                )}
                {stylist.rating >= 4.8 && (
                  <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center shadow-lg">
                    <BadgeCheck className="w-3.5 h-3.5 text-primary" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl font-bold text-primary">{stylist.name}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <Calendar className="w-3.5 h-3.5 text-accent" /> Booking #{bookingId}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-xs bg-gradient-to-r from-accent/10 to-accent/5 text-accent px-3 py-1.5 rounded-full border border-accent/20">
                    {service}
                  </span>
                  <span className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3 text-accent" /> {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Review Form - Premium redesign */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-3xl p-6 md:p-8 lg:p-10 border border-border/50 shadow-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Rating Section - Premium */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Star className="w-3.5 h-3.5 text-accent" />
                  </div>
                  Your Rating
                </label>
                
                <div className="flex flex-col items-center p-8 bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl border border-accent/20">
                  <div className="flex gap-3 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform focus:outline-none"
                      >
                        <Star 
                          className={`w-12 h-12 transition-all ${
                            (hoverRating || rating) >= star 
                              ? "fill-accent text-accent drop-shadow-xl scale-110" 
                              : "text-muted-foreground/20"
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
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <p className="text-xl font-semibold text-primary">
                            {rating === 5 && "Excellent! "}
                            {rating === 4 && "Great! "}
                            {rating === 3 && "Good "}
                            {rating === 2 && "Fair "}
                            {rating === 1 && "Poor "}
                          </p>
                          <span className="text-2xl">
                            {rating === 5 && "🌟"}
                            {rating === 4 && "✨"}
                            {rating === 3 && "👍"}
                            {rating === 2 && "👌"}
                            {rating === 1 && "💔"}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
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

              {/* Review Tags Section - Premium */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-lg bg-accent/10 flex items-center justify-center">
                    <BadgeCheck className="w-3.5 h-3.5 text-accent" />
                  </div>
                  What describes your experience best? (Optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {reviewTags.map((tag) => (
                    <motion.button
                      key={tag}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleTag(tag)}
                      className={`
                        px-4 py-2.5 rounded-full text-xs font-medium transition-all
                        ${tags.includes(tag)
                          ? "bg-gradient-to-r from-accent to-accent/90 text-primary shadow-md border border-accent/30"
                          : "bg-muted text-muted-foreground hover:bg-accent/10 border border-border"
                        }
                      `}
                    >
                      {tag}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Review Text - Premium */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Edit className="w-3.5 h-3.5 text-accent" />
                  </div>
                  Your Review
                </label>
                <div className="relative">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-border bg-background text-sm h-36 resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50"
                    placeholder="Tell others about your experience with the stylist, the service quality, and anything else you'd like to share..."
                    maxLength={500}
                    required
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded-full border border-border/50">
                    {comment.length}/500
                  </div>
                </div>
              </div>

              {/* Would You Recommend? - Premium */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-lg bg-accent/10 flex items-center justify-center">
                    <ThumbsUp className="w-3.5 h-3.5 text-accent" />
                  </div>
                  Would you recommend this stylist?
                </label>
                <div className="flex gap-3">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRecommend(true)}
                    className={`
                      flex-1 px-4 py-3.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2
                      ${recommend === true
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-lg"
                        : "bg-muted text-muted-foreground hover:bg-accent/10 border border-border"
                      }
                    `}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Yes
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRecommend(false)}
                    className={`
                      flex-1 px-4 py-3.5 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2
                      ${recommend === false
                        ? "bg-gradient-to-r from-rose-500 to-rose-400 text-white shadow-lg"
                        : "bg-muted text-muted-foreground hover:bg-accent/10 border border-border"
                      }
                    `}
                  >
                    <X className="w-4 h-4" />
                    No
                  </motion.button>
                </div>
              </div>

              {/* Submit Button - Premium */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={rating === 0 || !comment.trim()} 
                className="w-full bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold text-sm py-5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent/25 transition-all group"
              >
                <Send className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Submit Review
              </motion.button>

              {/* Trust Message - Premium */}
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-accent/5 px-4 py-2.5 rounded-full border border-accent/10">
                <Shield className="w-3.5 h-3.5 text-accent" />
                <span>Your review will be public and helps the community</span>
                <BadgeCheck className="w-3.5 h-3.5 text-accent" />
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewStylistPage;