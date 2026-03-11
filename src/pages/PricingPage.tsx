import { useState } from "react";
import { motion } from "framer-motion";
import { subscriptionPlans } from "@/data/demo-data";
import { Check, X, Clock, Sparkles, Crown, Star, Shield, Zap, ChevronRight, Award, Gift, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const { user } = useAuth();

  const getButton = (plan: (typeof subscriptionPlans)[0]) => {
    if (!user) {
      return (
        <Link
          to="/signup?role=stylist"
          className={
            plan.popular
              ? "btn-cta w-full text-sm text-center py-4 rounded-xl font-semibold flex items-center justify-center gap-2 group"
              : "bg-detail text-detail-foreground hover:bg-detail/90 font-semibold rounded-xl px-6 py-4 transition-all w-full text-sm text-center block"
          }
        >
          {plan.popular ? (
            <>
              Become a Stylist <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          ) : (
            "Become a Stylist"
          )}
        </Link>
      );
    }

    if (user.role === "stylist") {
      if (user.status === "pending") {
        return (
          <div className="w-full text-sm text-center">
            <div className="font-semibold rounded-xl px-6 py-4 transition-all w-full bg-muted text-muted-foreground border border-dashed flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 animate-pulse" />
              Approval Pending
            </div>
            <p className="text-xs mt-3 text-detail">
              You can choose a plan once your profile is approved by an admin.
            </p>
          </div>
        );
      }
      if (user.status === "active") {
        return (
          <Link
            to="/stylist/subscription"
            className={
              plan.popular
                ? "btn-cta w-full text-sm text-center py-4 rounded-xl font-semibold flex items-center justify-center gap-2 group"
                : "bg-detail text-detail-foreground hover:bg-detail/90 font-semibold rounded-xl px-6 py-4 transition-all w-full text-sm text-center block"
            }
          >
            {plan.popular ? (
              <>
                Choose Plan <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            ) : (
              "Choose Plan"
            )}
          </Link>
        );
      }
    }
    // Render nothing for customers or other roles
    return null;
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  return (
    <div className="relative bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-20 bg-gradient-to-b from-primary to-primary/95">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-80 h-80 bg-accent/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[120px] animate-pulse delay-1000" />
          <div className="absolute inset-0 opacity-5" 
               style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm text-background text-xs font-medium px-5 py-2.5 rounded-full mb-6 border border-accent/30 shadow-lg"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Stylist Plans</span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
              <span>Start Growing Your Business</span>
            </motion.div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight">
              Subscription Plans <br />
              <span className="text-accent relative">
                for Stylists
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4L200 4" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-accent/30"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-background/80 max-w-2xl mx-auto leading-relaxed font-brand">
              Join our platform to connect with clients, manage your bookings, and grow your braiding business.
              All stylist applications are reviewed before approval.
            </p>
          </motion.div>
        </div>

        {/* Curved divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Trust Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto"
          >
            {[
              { icon: Users, label: "Active Clients", value: "10,000+" },
              { icon: Star, label: "Stylist Rating", value: "4.9 ★" },
              { icon: Zap, label: "Fast Booking", value: "Instant" },
              { icon: Shield, label: "Secure Payments", value: "100%" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-card rounded-xl p-4 border border-border/50 flex items-center gap-3 hover:shadow-lg transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-detail">{stat.label}</p>
                  <p className="font-bold text-primary">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Billing Toggle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center justify-center gap-4 my-10"
          >
            <Label htmlFor="billing-cycle" className={`font-medium transition-colors ${billingCycle === 'monthly' ? 'text-primary' : 'text-detail'}`}>
              Monthly
            </Label>
            <Switch
              id="billing-cycle"
              checked={billingCycle === "yearly"}
              onCheckedChange={(checked) =>
                setBillingCycle(checked ? "yearly" : "monthly")
              }
              className="data-[state=checked]:bg-accent"
            />
            <Label htmlFor="billing-cycle" className={`font-medium transition-colors ${billingCycle === 'yearly' ? 'text-primary' : 'text-detail'}`}>
              Yearly
            </Label>
            <motion.span 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
              className="text-xs font-bold bg-accent text-primary px-3 py-1.5 rounded-full flex items-center gap-1"
            >
              <Gift className="w-3 h-3" /> SAVE 15%
            </motion.span>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {subscriptionPlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -8 }}
                className={`relative bg-card rounded-2xl overflow-hidden border-2 flex flex-col ${
                  plan.popular
                    ? "border-accent shadow-2xl scale-105 md:scale-110 z-10"
                    : "border-border/50 hover:border-accent/30 shadow-lg"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-accent text-primary text-center py-2 text-sm font-bold flex items-center justify-center gap-1">
                    <Crown className="w-4 h-4" />
                    MOST POPULAR
                    <Crown className="w-4 h-4" />
                  </div>
                )}

                {/* Card Header */}
                <div className={`p-6 ${plan.popular ? 'pt-10' : ''}`}>
                  <h3 className="font-serif text-2xl font-bold text-primary mb-2">{plan.name}</h3>
                  <p className="text-sm text-detail font-brand mb-4">{plan.description}</p>
                  
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold text-primary">$</span>
                      <span className="text-5xl font-bold text-primary">
                        {billingCycle === "monthly"
                          ? plan.monthlyPrice
                          : plan.yearlyPrice}
                      </span>
                      <span className="text-detail mb-1">
                        /{billingCycle === "monthly" ? "mo" : "yr"}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <p className="text-xs text-detail font-brand mt-2 flex items-center gap-1">
                        <Check className="w-3 h-3 text-accent" />
                        Billed annually (${plan.yearlyPrice}/year)
                      </p>
                    )}
                    {plan.popular && billingCycle === 'yearly' && (
                      <p className="text-xs text-accent font-semibold mt-2">
                        Save ${(plan.monthlyPrice * 12) - plan.yearlyPrice} per year!
                      </p>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mt-6">
                    {plan.features.map((f) => (
                      <div
                        key={f}
                        className="flex items-start gap-2 text-sm text-primary"
                      >
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((f) => (
                      <div
                        key={f}
                        className="flex items-start gap-2 text-sm text-detail opacity-60"
                      >
                        <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-auto p-6 pt-0">
                  <div className="border-t border-border/50 pt-6">
                    {getButton(plan)}
                    
                    {/* Additional info for pending/active states */}
                    {user?.role === 'stylist' && user?.status === 'active' && (
                      <p className="text-xs text-center text-detail mt-3">
                        You are on an active stylist plan
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Teaser */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="bg-card rounded-2xl p-8 border border-border/50 max-w-2xl mx-auto">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-bold text-primary mb-2">
                Questions About Plans?
              </h3>
              <p className="text-detail mb-6">
                Learn more about our subscription plans, features, and how they can help grow your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/faq"
                  className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm"
                >
                  Visit FAQ
                </Link>
                <Link
                  to="/contact"
                  className="btn-cta inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Customer Section */}
          {user && user.role === 'customer' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12 p-6 bg-accent/5 rounded-xl border border-accent/20"
            >
              <p className="text-detail font-brand flex items-center justify-center gap-2">
                <Star className="w-4 h-4 text-accent" />
                Looking to book an appointment? 
                <Link to="/find-stylist" className="text-accent font-semibold hover:underline inline-flex items-center gap-1">
                  Find a stylist near you <ChevronRight className="w-3 h-3" />
                </Link>
              </p>
            </motion.div>
          )}

          {/* Money Back Guarantee */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-2 text-xs text-detail bg-card px-4 py-2 rounded-full border border-border/50">
              <Shield className="w-3 h-3 text-accent" />
              <span>30-day money-back guarantee</span>
              <span className="w-1 h-1 rounded-full bg-detail/30" />
              <span>Cancel anytime</span>
              <span className="w-1 h-1 rounded-full bg-detail/30" />
              <span>No hidden fees</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="border-t border-border py-6 bg-secondary/10">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs text-detail flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3 text-accent" />
            All plans include access to the BraidLink platform | © 2026 BraidLink
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;