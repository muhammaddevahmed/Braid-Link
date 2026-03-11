import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { reviews } from "@/data/demo-data";
import { 
  Star, ThumbsUp, MessageCircle, Calendar,
  User, Award, Trash2,
  ChevronDown, ChevronRight,
  Clock, CheckCircle
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
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    });
  };

  if (myReviews.length === 0) {
    return (
      <div className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-accent" />
                Reviews
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-primary">My Reviews</h2>
            <p className="text-detail mt-1 font-brand">Share your experiences with stylists</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-card rounded-2xl border border-border/50"
        >
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-accent" />
          </div>
          <h3 className="font-serif text-xl font-bold text-primary mb-2">No reviews yet</h3>
          <p className="text-detail mb-6 max-w-sm mx-auto">
            You haven't written any reviews. After your appointments, come back to share your experience!
          </p>
          <Link 
            to="/find-stylist" 
            className="btn-cta inline-flex items-center gap-2 px-6 py-3 rounded-xl"
          >
            Find a Stylist <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-accent" />
              Your Feedback
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">My Reviews</h2>
          <p className="text-detail mt-1 font-brand">You've written {myReviews.length} review{myReviews.length !== 1 ? 's' : ''}</p>
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
                <div className={`bg-card rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                  isExpanded 
                    ? "border-accent shadow-xl" 
                    : "border-border/50 hover:border-accent/30 hover:shadow-lg"
                }`}>
                  {/* Review Header */}
                  <div 
                    className="p-5 cursor-pointer"
                    onClick={() => setExpandedReview(isExpanded ? null : review.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center border border-accent/20">
                          <User className="w-6 h-6 text-accent" />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-serif font-semibold text-primary">{review.service}</h3>
                            {review.rating >= 4 && (
                              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Award className="w-3 h-3" /> Recommended
                              </span>
                            )}
                          </div>
                          
                          <p className="text-sm text-detail flex items-center gap-2">
                            <span className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5" /> with {review.stylistName}
                            </span>
                            <span className="w-1 h-1 rounded-full bg-detail/30" />
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" /> {formatDate(review.date)}
                            </span>
                          </p>

                          <div className="flex items-center gap-1 mt-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-accent text-accent"
                                    : "text-muted"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteReview(review.id);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-detail" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Review Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5">
                          <div className="border-t border-border pt-4">
                            <p className="text-sm text-detail leading-relaxed">
                              {review.comment}
                            </p>

                            
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

      {/* Footer Stats */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-between text-xs text-detail pt-2"
      >
       
        <div className="flex items-center gap-2">
          <CheckCircle className="w-3.5 h-3.5 text-accent" />
          <span>{myReviews.length} total reviews</span>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerReviews;