import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reviews } from "@/data/demo-data";
import { 
  Star, ThumbsUp, MessageCircle, Calendar,
  User, Award, Trash2, Sparkles,
  ChevronDown, ChevronRight, BadgeCheck,
  Clock, CheckCircle, TrendingUp,
  Edit, Share2, Flag, Heart,
  Zap, Camera, Video, Coffee
} from "lucide-react";
import { Link } from "react-router-dom";

const CustomerReviews = () => {
  const [myReviews, setMyReviews] = useState(reviews.filter((r) => r.customerId === "c1"));
  const [expandedReview, setExpandedReview] = useState<string | null>(null);

  const handleDeleteReview = (id: string) => {
    setMyReviews(prev => prev.filter(r => r.id !== id));
  };

  const sortedReviews = [...myReviews].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const averageRating = myReviews.length > 0
    ? (myReviews.reduce((acc, r) => acc + r.rating, 0) / myReviews.length).toFixed(1)
    : 0;

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric", 
        year: "numeric" 
      });
    }
  };

  if (myReviews.length === 0) {
    return (
      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, type: "spring" }}
                className="bg-gradient-to-r from-accent/10 to-accent/5 text-accent text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-accent/20"
              >
                <Star className="w-3.5 h-3.5 fill-accent" />
                Reviews
              </motion.div>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">My Reviews</h2>
            <p className="text-muted-foreground flex items-center gap-1">
              <MessageCircle className="w-4 h-4 text-accent" />
              Share your experiences with stylists
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-20 bg-gradient-to-br from-card to-secondary/5 rounded-3xl border border-border/50 shadow-xl"
        >
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto">
              <MessageCircle className="w-10 h-10 text-accent" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-xl flex items-center justify-center shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
          </div>
          
          <h3 className="font-serif text-2xl font-bold text-primary mb-3">No reviews yet</h3>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            You haven't written any reviews. After your appointments, come back to share your experience!
          </p>
          
          <Link 
            to="/find-stylist" 
            className="bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold inline-flex items-center gap-2 px-8 py-4 rounded-xl hover:shadow-lg hover:shadow-accent/25 transition-all group"
          >
            Find a Stylist 
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header - Premium redesign */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: "spring" }}
              className="bg-gradient-to-r from-accent/10 to-accent/5 text-accent text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 border border-accent/20"
            >
              <Star className="w-3.5 h-3.5 fill-accent" />
              Your Feedback
            </motion.div>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">My Reviews</h2>
          
          <div className="flex items-center gap-4 text-muted-foreground">
           
            <div className="w-px h-4 bg-border" />
           
          </div>
        </div>

       
      </motion.div>

      {/* Reviews List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {sortedReviews.map((review, idx) => {
            const isExpanded = expandedReview === review.id;
            
            return (
              <motion.div
                key={review.id}
                layout
                custom={idx}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
                className="group"
              >
                <div className={`bg-card rounded-2xl border-2 transition-all duration-500 overflow-hidden ${
                  isExpanded 
                    ? "border-accent shadow-2xl" 
                    : "border-border/50 hover:border-accent/30 hover:shadow-xl"
                }`}>
                  {/* Review Header - Premium redesign */}
                  <div 
                    className="p-6 cursor-pointer relative"
                    onClick={() => setExpandedReview(isExpanded ? null : review.id)}
                  >
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="flex items-start justify-between relative z-10">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center border-2 border-accent/20 shadow-lg">
                          <User className="w-7 h-7 text-primary" />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-serif font-semibold text-primary text-lg">{review.service}</h3>
                            {review.rating >= 4 && (
                              <span className="bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 text-emerald-600 text-xs px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
                                <Award className="w-3 h-3" /> 
                                Recommended
                              </span>
                            )}
                            {review.rating === 5 && (
                              <BadgeCheck className="w-4 h-4 text-accent" />
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                            <span className="flex items-center gap-1.5 bg-accent/5 px-2 py-1 rounded-full">
                              <User className="w-3.5 h-3.5 text-accent" /> 
                              with <span className="font-medium text-primary">{review.stylistName}</span>
                            </span>
                            <span className="flex items-center gap-1.5 bg-accent/5 px-2 py-1 rounded-full">
                              <Calendar className="w-3.5 h-3.5 text-accent" /> 
                              {formatDate(review.date)}
                            </span>
                          </div>

                          {/* Star Rating */}
                          <div className="flex items-center gap-1 mt-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 transition-all ${
                                  i < review.rating
                                    ? "fill-accent text-accent scale-110"
                                    : "text-muted"
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-xs text-muted-foreground">
                              {review.rating}.0 / 5.0
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Action buttons - appear on hover */}
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-9 h-9 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive transition-all flex items-center justify-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteReview(review.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                        
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className={`
                            w-9 h-9 rounded-lg flex items-center justify-center
                            ${isExpanded 
                              ? 'bg-accent text-primary' 
                              : 'bg-accent/10 text-accent group-hover:bg-accent/20'
                            }
                          `}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Review Content - Premium */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="border-t border-border/50 pt-5">
                            {/* Review Comment */}
                            <div className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl p-5 mb-5 border border-accent/10">
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {review.comment}
                              </p>
                            </div>

                          

                           
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

     
    </div>
  );
};

export default CustomerReviews;