import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/useBookingHook";
import { motion, AnimatePresence } from "framer-motion";
import { hairstyleCategories, stylists } from "@/data/demo-data";
import { matchStylists, MatchCriteria, MatchResult } from "@/lib/matchingEngine";
import StylistMatchCard from "@/components/smart-match/StylistMatchCard";
import MatchingLoader from "@/components/smart-match/MatchingLoader";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Send, ArrowLeft } from "lucide-react";

const InstantMatchResultPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { getRejectedInstantMatchForCustomer, clearRejectedInstantMatch } = useBooking();
  const [step, setStep] = useState<"loading" | "results" | "empty">("loading");
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [rejectedStylistIds, setRejectedStylistIds] = useState<Set<string>>(new Set());
  const [rejectionReason, setRejectionReason] = useState("");
  const allHairstyles = hairstyleCategories.flatMap((cat) => cat.hairstyles);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "customer") {
      navigate("/login");
      return;
    }

    const rejectedMatch = getRejectedInstantMatchForCustomer(user.id);
    if (!rejectedMatch) {
      // No rejected match, go to home
      navigate("/");
      return;
    }

    // Start loading and search
    const performSearch = async (rejectedMatch: { rejectedStylistIds: string[]; searchCriteria: { hairstyle: string; date: string; time: string; minPrice: number; maxPrice: number }; bookingId: string }) => {
      setRejectedStylistIds(new Set(rejectedMatch.rejectedStylistIds));
      setRejectionReason(`Previous stylist unavailable. Let's find you another match!`);

      // Show loading animation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const criteria: MatchCriteria = {
        hairstyle: rejectedMatch.searchCriteria.hairstyle,
        date: rejectedMatch.searchCriteria.date,
        time: rejectedMatch.searchCriteria.time,
        minPrice: rejectedMatch.searchCriteria.minPrice,
        maxPrice: rejectedMatch.searchCriteria.maxPrice,
        customerPostalCode: user?.postalCode || "",
      };

      const results = matchStylists(criteria, stylists);
      const filteredResults = results.filter(r => !rejectedMatch.rejectedStylistIds.includes(r.stylist.id));

      if (filteredResults.length === 0) {
        setStep("empty");
        return;
      }

      setMatchResult(filteredResults[0]);
      setStep("results");
    };

    performSearch(rejectedMatch);
  }, [isAuthenticated, user?.id, user?.role, user?.postalCode, getRejectedInstantMatchForCustomer, navigate]);

  const handleFindAnother = async () => {
    if (!matchResult) return;

    // Add current stylist to rejected list
    setRejectedStylistIds(prev => new Set([...prev, matchResult.stylist.id]));
    setRejectionReason(`${matchResult.stylist.name} rejected your booking request.`);

    const rejectedMatch = getRejectedInstantMatchForCustomer(user?.id || "");
    if (rejectedMatch) {
      const criteria: MatchCriteria = {
        hairstyle: rejectedMatch.searchCriteria.hairstyle,
        date: rejectedMatch.searchCriteria.date,
        time: rejectedMatch.searchCriteria.time,
        minPrice: rejectedMatch.searchCriteria.minPrice,
        maxPrice: rejectedMatch.searchCriteria.maxPrice,
        customerPostalCode: user?.postalCode || "",
      };

      const results = matchStylists(criteria, stylists);
      const updatedRejected = new Set([...rejectedStylistIds, matchResult.stylist.id]);
      const filteredResults = results.filter(r => !updatedRejected.has(r.stylist.id));

      if (filteredResults.length === 0) {
        toast.error("No more stylists available. Try adjusting your preferences.");
        navigate("/");
        return;
      }

      setMatchResult(filteredResults[0]);
    }
  };

  const handleBookNow = () => {
    if (!matchResult) return;

    const hairstyleId = allHairstyles.find(h => h.name === matchResult.stylist.specialties[0])?.id || "";
    const rejectedMatch = getRejectedInstantMatchForCustomer(user?.id || "");
    if (rejectedMatch) {
      navigate(`/booking?stylist=${matchResult.stylist.id}&style=${hairstyleId}&date=${rejectedMatch.searchCriteria.date}&time=${rejectedMatch.searchCriteria.time}&postal=${user?.postalCode}&isInstantMatch=true`);
    }
  };

  const handleClose = () => {
    if (user?.id) {
      const rejectedMatch = getRejectedInstantMatchForCustomer(user.id);
      if (rejectedMatch) {
        clearRejectedInstantMatch(rejectedMatch.bookingId);
      }
    }
    navigate("/");
  };

  if (!isAuthenticated) {
    return <div className="h-screen"></div>;
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.button
          onClick={handleClose}
          whileHover={{ x: -5 }}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </motion.button>

        <AnimatePresence mode="wait">
          {step === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MatchingLoader />
            </motion.div>
          )}

          {step === "results" && matchResult && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {rejectionReason && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-100 text-red-700 px-4 py-3 rounded-lg text-sm font-medium border border-red-200"
                >
                  ❌ {rejectionReason}
                </motion.div>
              )}

              <StylistMatchCard
                stylist={matchResult.stylist}
                hairstyle={matchResult.stylist.specialties[0] || ""}
                price={matchResult.stylist.services[0]?.price || 0}
                onBookNow={handleBookNow}
                onFindAnother={handleFindAnother}
                isRejected={false}
                onViewProfile={() => navigate(`/stylist/${matchResult.stylist.id}`, { state: { from: '/instant-match-result', label: 'Instant Match' } })}
              />
            </motion.div>
          )}

          {step === "empty" && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <h2 className="font-serif text-2xl font-bold mb-4">No More Stylists Available</h2>
              <p className="text-muted-foreground mb-8">
                Sorry, we couldn't find any more stylists matching your criteria. Try adjusting your preferences.
              </p>
              <Link to="/" className="btn-primary">
                Go Back Home
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InstantMatchResultPage;