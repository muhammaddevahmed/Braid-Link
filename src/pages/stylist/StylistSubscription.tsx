import { subscriptionPlans } from "@/data/demo-data";
import { Check, X, Crown, Sparkles, Award, Shield, Star, Zap, Gift, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StylistSubscription = () => {
  const [current, setCurrent] = useState("professional");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [showComparison, setShowComparison] = useState(false);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  const getPlanIcon = (planName: string) => {
    switch(planName) {
      case "Basic": return <Zap className="w-5 h-5" />;
      case "Professional": return <Crown className="w-5 h-5" />;
      case "Premium": return <Award className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getPlanColor = (planName: string) => {
    switch(planName) {
      case "Basic": return {
        bg: "from-blue-500/10 to-blue-500/5",
        border: "border-blue-500/20",
        text: "text-blue-600",
        button: "bg-blue-600 hover:bg-blue-700"
      };
      case "Professional": return {
        bg: "from-purple-500/10 to-purple-500/5",
        border: "border-purple-500/20",
        text: "text-purple-600",
        button: "bg-purple-600 hover:bg-purple-700"
      };
      case "Premium": return {
        bg: "from-amber-500/10 to-amber-500/5",
        border: "border-amber-500/20",
        text: "text-amber-600",
        button: "bg-amber-600 hover:bg-amber-700"
      };
      default: return {
        bg: "from-gray-500/10 to-gray-500/5",
        border: "border-gray-500/20",
        text: "text-gray-600",
        button: "bg-gray-600 hover:bg-gray-700"
      };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Crown className="w-3.5 h-3.5" />
              Subscription Management
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Subscription Plan</h2>
          <p className="text-muted-foreground mt-1 text-sm">Choose the perfect plan for your business needs</p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center gap-2 bg-card rounded-xl p-1 border border-border">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              billingCycle === "monthly"
                ? "bg-accent text-primary"
                : "text-muted-foreground hover:text-primary hover:bg-accent/5"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
              billingCycle === "yearly"
                ? "bg-accent text-primary"
                : "text-muted-foreground hover:text-primary hover:bg-accent/5"
            }`}
          >
            Yearly
            <span className="text-xs bg-accent text-primary px-1.5 py-0.5 rounded-full">Save 15%</span>
          </button>
        </div>
      </motion.div>

      {/* Current Plan Status */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-accent/5 to-accent/10 rounded-xl p-5 border border-accent/20"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Crown className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Current Plan</p>
              <p className="text-xl font-bold text-primary">Professional Plan</p>
              <p className="text-xs text-muted-foreground mt-1">Next billing: April 15, 2026</p>
            </div>
          </div>
          
        </div>
      </motion.div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionPlans.map((plan, idx) => {
          const isCurrent = current === plan.id;
          const colors = getPlanColor(plan.name);
          const Icon = getPlanIcon(plan.name);
          const yearlyPrice = Math.round(plan.monthlyPrice * 12 * 0.85); // 15% discount
          const displayPrice = billingCycle === "monthly" ? plan.monthlyPrice : yearlyPrice;

          return (
            <motion.div
              key={plan.id}
              custom={idx}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -8 }}
              className={`relative bg-card rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                isCurrent 
                  ? "border-accent shadow-2xl scale-105 z-10" 
                  : "border-border hover:border-accent/30 shadow-md hover:shadow-xl"
              }`}
            >
              {/* Popular Badge for Professional */}
              {plan.name === "Professional" && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-center py-2 text-xs font-bold flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  MOST POPULAR
                  <Sparkles className="w-3 h-3" />
                </div>
              )}

              {/* Plan Header */}
              <div className={`p-6 ${plan.name === "Professional" ? "pt-10" : ""}`}>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-4 border ${colors.border}`}>
                  <div className={colors.text}>{Icon}</div>
                </div>
                
                <h3 className="font-serif text-xl font-bold text-primary mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                
                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="text-3xl font-bold text-primary">${displayPrice}</span>
                    <span className="text-muted-foreground text-sm mb-1">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                  </div>
                  {billingCycle === "yearly" && (
                    <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full w-fit">
                      <Gift className="w-3 h-3" />
                      Save ${(plan.monthlyPrice * 12 - yearlyPrice)} per year!
                    </p>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-sm text-primary">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-sm text-muted-foreground opacity-60">
                      <X className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => setCurrent(plan.id)}
                  disabled={isCurrent}
                  className={`w-full py-3 rounded-lg text-sm font-semibold transition-all ${
                    isCurrent
                      ? "bg-muted text-muted-foreground cursor-default"
                      : `${colors.button} text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]`
                  }`}
                >
                  {isCurrent ? "Current Plan" : "Switch to " + plan.name}
                </button>

                {/* Plan Features Tagline */}
                {plan.name === "Premium" && (
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Best for established professionals
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Comparison Table Toggle */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="text-accent hover:text-accent/80 text-sm font-semibold flex items-center gap-1 mx-auto group"
        >
          <span>{showComparison ? "Hide" : "Show"} detailed comparison</span>
          <ChevronRight className={`w-4 h-4 transition-all group-hover:translate-x-1 ${showComparison ? "rotate-90" : ""}`} />
        </button>
      </motion.div>

      {/* Comparison Table */}
      <AnimatePresence>
        {showComparison && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-card rounded-xl p-6 border border-border mt-4">
              <h3 className="font-serif font-semibold text-primary mb-4">Plan Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Feature</th>
                      {subscriptionPlans.map((plan) => (
                        <th key={plan.id} className="text-center py-3 px-4">
                          <span className="font-semibold text-primary">{plan.name}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      "Monthly Price",
                      "Yearly Price (15% off)",
                      "Booking Management",
                      "Calendar Sync",
                      "Priority Support",
                      "Featured Listing",
                    ].map((feature, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-3 px-4 text-muted-foreground">{feature}</td>
                        {subscriptionPlans.map((plan) => (
                          <td key={plan.id} className="text-center py-3 px-4">
                            {feature === "Monthly Price" && `$${plan.monthlyPrice}`}
                            {feature === "Yearly Price (15% off)" && `$${Math.round(plan.monthlyPrice * 12 * 0.85)}`}
                            {feature !== "Monthly Price" && feature !== "Yearly Price (15% off)" && (
                              plan.name === "Basic" ? (
                                i < 5 ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-muted-foreground mx-auto" />
                              ) : plan.name === "Professional" ? (
                                i < 7 ? <Check className="w-4 h-4 text-emerald-600 mx-auto" /> : <X className="w-4 h-4 text-muted-foreground mx-auto" />
                              ) : (
                                <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                              )
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-xl p-6 border border-border"
      >
        <h3 className="font-serif font-semibold text-primary mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4 text-accent" />
          Frequently Asked Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              q: "Can I change plans anytime?",
              a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
            },
            {
              q: "Is there a setup fee?",
              a: "No, there are no setup fees. You only pay the monthly or yearly subscription amount."
            },
            {
              q: "What payment methods are accepted?",
              a: "We accept all major credit cards, PayPal, and bank transfers for yearly plans."
            },
            {
              q: "Can I cancel my subscription?",
              a: "Yes, you can cancel anytime. Your plan will remain active until the end of your billing period."
            }
          ].map((faq, i) => (
            <div key={i} className="p-4 bg-accent/5 rounded-lg border border-accent/10">
              <p className="text-sm font-semibold text-primary mb-1">{faq.q}</p>
              <p className="text-xs text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Trust Badge */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
      >
        <Shield className="w-3 h-3 text-accent" />
        <span>Secure payment processing</span>
      </motion.div>
    </div>
  );
};

export default StylistSubscription;