import { useState } from "react";
import { motion } from "framer-motion";
import { subscriptionPlans } from "@/data/demo-data";
import { Check, X, Clock } from "lucide-react";
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
              ? "btn-cta w-full text-sm text-center block"
              : "bg-detail text-detail-foreground hover:bg-detail/90 font-semibold rounded-xl px-6 py-3 transition-all w-full text-sm text-center block"
          }
        >
          Become a Stylist
        </Link>
      );
    }

    if (user.role === "stylist") {
      if (user.status === "pending") {
        return (
          <div className="w-full text-sm text-center">
            <div className="font-semibold rounded-xl px-6 py-3 transition-all w-full bg-muted text-muted-foreground border border-dashed flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              Approval Pending
            </div>
            <p className="text-xs mt-2 text-detail">
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
                ? "btn-cta w-full text-sm text-center block"
                : "bg-detail text-detail-foreground hover:bg-detail/90 font-semibold rounded-xl px-6 py-3 transition-all w-full text-sm text-center block"
            }
          >
            Choose Plan
          </Link>
        );
      }
    }
    // Render nothing for customers or other roles
    return null;
  };

  return (
    <div className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <h1 className="font-serif text-4xl font-bold text-primary">
            Stylist Subscription Plans
          </h1>
          <p className="text-detail mt-2 font-brand">
            Join our platform to connect with clients, manage your bookings, and
            grow your braiding business. All stylist applications are reviewed
            by our admin team before approval.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 my-8">
          <Label htmlFor="billing-cycle" className={`font-medium transition-colors ${billingCycle === 'monthly' ? 'text-primary' : 'text-detail'}`}>
            Monthly
          </Label>
          <Switch
            id="billing-cycle"
            checked={billingCycle === "yearly"}
            onCheckedChange={(checked) =>
              setBillingCycle(checked ? "yearly" : "monthly")
            }
          />
          <Label htmlFor="billing-cycle" className={`font-medium transition-colors ${billingCycle === 'yearly' ? 'text-primary' : 'text-detail'}`}>
            Yearly
          </Label>
          <span className="text-xs font-semibold bg-accent/20 text-accent px-2 py-1 rounded-md">SAVE 15%</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {subscriptionPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`bg-card rounded-2xl p-6 border flex flex-col ${
                plan.popular
                  ? "border-accent ring-2 ring-accent/30 relative"
                  : "border-detail/20"
              } card-hover`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <div className="flex-grow">
                <h3 className="font-serif text-xl font-semibold text-primary">
                  {plan.name}
                </h3>
                <p className="text-sm text-detail mt-1 font-brand">
                  {plan.description}
                </p>
                <div className="mt-4 mb-6">
                  <span className="text-4xl font-bold text-primary">
                    $
                    {billingCycle === "monthly"
                      ? plan.monthlyPrice
                      : plan.yearlyPrice}
                  </span>
                  <span className="text-detail">
                    /{billingCycle === "monthly" ? "month" : "year"}
                  </span>
                  {billingCycle === 'yearly' && (
                    <p className="text-xs text-detail font-brand mt-1">
                      Billed as ${plan.yearlyPrice} annually.
                    </p>
                  )}
                </div>
                
                <div className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 text-sm text-primary"
                    >
                      <Check className="w-4 h-4 text-accent flex-shrink-0" /> {f}
                    </div>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <div
                      key={f}
                      className="flex items-center gap-2 text-sm text-detail"
                    >
                      <X className="w-4 h-4 flex-shrink-0" /> {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                {getButton(plan)}
              </div>
            </motion.div>
          ))}
        </div>
        {user && user.role === 'customer' && (
          <div className="text-center mt-12 text-detail font-brand">
            <p>Looking to book an appointment? <Link to="/find-stylist" className="text-accent font-semibold hover:underline">Find a stylist near you</Link>.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingPage;
