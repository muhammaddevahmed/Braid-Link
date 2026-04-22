import { useState } from "react";
import { motion } from "framer-motion";
import { subscriptionPlans } from "@/data/demo-data";
import { Check, X, Clock, Sparkles, Crown, Star, Shield, Zap, ChevronRight, Award, Gift, Users, BadgeCheck, TrendingUp, Calendar, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const { user } = useAuth();

  if (user?.role === "customer") {
    return (
      <div className="py-20 bg-gradient-to-b from-background to-secondary/10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-md">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="bg-card rounded-3xl p-8 md:p-10 border border-border/50 shadow-2xl"
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-destructive/10 to-destructive/5 flex items-center justify-center mx-auto mb-6">
              <X className="w-10 h-10 text-destructive" />
            </div>
            <h2 className="font-serif text-2xl font-bold mb-3 text-primary">Stylist Account Required</h2>
            <p className="text-muted-foreground mb-8">You are currently logged in as a Customer. To view stylist plans, you must create a separate Stylist account.</p>
            <button 
              onClick={() => { 
                localStorage.removeItem("braidbook_user"); 
                window.location.href = "/signup"; 
              }} 
              className="bg-accent text-primary font-semibold w-full block text-center py-4 rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-accent/25 text-base"
            >
              Create Stylist Account
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  const getButton = (plan: (typeof subscriptionPlans)[0]) => {
    if (!user || user.role === "customer") {
      return null;
    }

    if (user.role === "stylist") {
      if (user.status === "pending") {
        return (
          <div className="w-full text-sm text-center">
            <div className="font-semibold rounded-xl px-6 py-4 transition-all w-full bg-muted text-muted-foreground border border-dashed flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 animate-pulse" />
              Approval Pending
            </div>
            <p className="text-xs mt-3 text-muted-foreground">
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
                ? "bg-accent text-primary font-semibold w-full text-sm text-center py-4 rounded-xl flex items-center justify-center gap-2 group hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-accent/25"
                : "bg-primary/10 text-primary hover:bg-primary/20 font-semibold rounded-xl px-6 py-4 transition-all duration-300 w-full text-sm text-center block border border-primary/20"
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
      {/* Hero Section - Refined premium design */}
      <section className="relative overflow-hidden py-20 md:py-24 bg-gradient-to-br from-primary via-primary to-primary/95">
        {/* Sophisticated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 left-20 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[140px] animate-pulse delay-1000" />
          
          {/* Refined pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" 
               style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            {/* Premium badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white text-xs font-medium px-5 py-2.5 rounded-full mb-6 border border-white/20 shadow-xl"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Stylist Plans</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>Start Growing Your Business</span>
            </motion.div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Subscription Plans <br />
              <span className="text-accent relative inline-block">
                for Stylists
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 4L200 4" stroke="currentColor" strokeWidth="6" strokeLinecap="round" className="text-accent/40"/>
                </svg>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
              Join our platform to connect with clients, manage your bookings, and grow your braiding business.
              All stylist applications are reviewed before approval.
            </p>
          </motion.div>
        </div>

        {/* Elegant curved divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 60L60 52C120 44 240 28 360 24C480 20 600 28 720 32C840 36 960 36 1080 32C1200 28 1320 20 1380 16L1440 12V60H0Z" fill="hsl(var(--background))" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          {/* Trust Badges - Premium redesign */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 mb-12 max-w-3xl mx-auto"
          >
            {[
              { icon: Users, label: "Active Clients", value: "10,000+", color: "from-blue-500/20 to-blue-500/5" },
              { icon: Star, label: "Stylist Rating", value: "4.9 ★", color: "from-yellow-500/20 to-yellow-500/5" },
              { icon: Zap, label: "Fast Booking", value: "Instant", color: "from-purple-500/20 to-purple-500/5" },
              { icon: Shield, label: "Secure Payments", value: "100%", color: "from-green-500/20 to-green-500/5" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-card rounded-xl p-5 border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                    <p className="font-serif font-bold text-xl text-primary">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Billing Toggle - Premium redesign */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 my-12"
          >
            <div className="flex items-center gap-4 p-1.5 bg-muted/30 rounded-2xl border border-border/50">
              <Label htmlFor="billing-cycle" className={`font-medium px-4 py-2 rounded-xl transition-all cursor-pointer ${billingCycle === 'monthly' ? 'bg-accent text-primary shadow-md' : 'text-muted-foreground hover:text-primary'}`}>
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
              <Label htmlFor="billing-cycle" className={`font-medium px-4 py-2 rounded-xl transition-all cursor-pointer ${billingCycle === 'yearly' ? 'bg-accent text-primary shadow-md' : 'text-muted-foreground hover:text-primary'}`}>
                Yearly
              </Label>
            </div>
            
            <motion.span 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
              className="text-xs font-bold bg-gradient-to-r from-accent to-accent/80 text-primary px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg"
            >
              <Gift className="w-3 h-3" /> SAVE 15%
            </motion.span>
          </motion.div>

          {/* Pricing Cards - Premium redesign */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {subscriptionPlans.map((plan, i) => (
              <motion.div
                key={plan.id}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -8 }}
                className={`relative bg-card rounded-3xl overflow-hidden border-2 flex flex-col h-full ${
                  plan.popular
                    ? "border-accent shadow-2xl scale-105 md:scale-110 z-10"
                    : "border-border/50 hover:border-accent/30 shadow-lg hover:shadow-xl"
                }`}
              >
                {/* Popular Badge - Premium */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-accent to-accent/90 text-primary text-center py-3 text-sm font-bold flex items-center justify-center gap-1.5">
                    <Crown className="w-4 h-4" />
                    MOST POPULAR
                    <Crown className="w-4 h-4" />
                  </div>
                )}

                {/* Card Header */}
                <div className={`p-6 md:p-8 ${plan.popular ? 'pt-12' : ''}`}>
                  <h3 className="font-serif text-2xl font-bold text-primary mb-2 mt-4">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                  
                  {/* Price - Premium */}
                  <div className="mb-6">
                    <div className="flex items-end gap-1">
                      <span className="text-3xl font-bold text-primary">£</span>
                      <span className="text-6xl font-bold text-primary">
                        {billingCycle === "monthly"
                          ? plan.monthlyPrice
                          : plan.yearlyPrice}
                      </span>
                      <span className="text-muted-foreground mb-2 ml-1">
                        /{billingCycle === "monthly" ? "mo" : "yr"}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && (
                      <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
                        <BadgeCheck className="w-3.5 h-3.5 text-accent" />
                        Billed annually (£{plan.yearlyPrice}/year)
                      </p>
                    )}
                    {plan.popular && billingCycle === 'yearly' && (
                      <p className="text-xs text-accent font-semibold mt-2 bg-accent/10 px-3 py-1.5 rounded-full inline-block">
                        Save £{(plan.monthlyPrice * 12) - plan.yearlyPrice} per year!
                      </p>
                    )}
                  </div>

                  {/* Features List - Premium */}
                  <div className="space-y-4 mt-8">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">What's included</p>
                    {plan.features.map((f) => (
                      <div
                        key={f}
                        className="flex items-start gap-3 text-sm text-primary"
                      >
                        <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-accent" />
                        </div>
                        <span>{f}</span>
                      </div>
                    ))}
                    
                    {plan.notIncluded.length > 0 && (
                      <>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-4">Not included</p>
                        {plan.notIncluded.map((f) => (
                          <div
                            key={f}
                            className="flex items-start gap-3 text-sm text-muted-foreground opacity-70"
                          >
                            <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                              <X className="w-3.5 h-3.5" />
                            </div>
                            <span>{f}</span>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-auto p-6 md:p-8 pt-0">
                  <div className="border-t border-border/50 pt-6">
                    {getButton(plan)}
                    
                    {/* Additional info for pending/active states */}
                    {user?.role === 'stylist' && user?.status === 'active' && (
                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
                        <CreditCard className="w-3 h-3 text-accent" />
                        <span>You are on an active stylist plan</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Teaser - Premium redesign */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-20 text-center"
          >
            <div className="bg-gradient-to-br from-card to-secondary/5 rounded-3xl p-8 md:p-10 border border-border/50 max-w-2xl mx-auto shadow-xl">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto mb-5">
                <Award className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-3">
                Questions About Plans?
              </h3>
              <p className="text-muted-foreground mb-8">
                Learn more about our subscription plans, features, and how they can help grow your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/faq"
                  className="bg-primary/10 text-primary hover:bg-primary/20 font-semibold inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl transition-all duration-300 border border-primary/20 group"
                >
                  Visit FAQ
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="bg-accent text-primary font-semibold inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-accent/25 group"
                >
                  Contact Support
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>

        

          {/* Money Back Guarantee - Premium redesign */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground bg-card/50 backdrop-blur-sm px-6 py-3 rounded-full border border-border/50 shadow-sm">
              
             
              
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-accent" />
                No hidden fees
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Note - Premium redesign */}
      <div className="border-t border-border/40 py-8 bg-gradient-to-b from-secondary/5 to-secondary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs text-muted-foreground/60 tracking-wide flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3 text-accent" />
            All plans include access to the BraidLink platform
            <span className="w-1 h-1 rounded-full bg-accent/30" />
            © 2026 BraidLink
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;