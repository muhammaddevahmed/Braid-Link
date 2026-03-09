import { motion } from "framer-motion";
import { subscriptionPlans } from "@/data/demo-data";
import { Check, X } from "lucide-react";
import { Link } from "react-router-dom";

const PricingPage = () => (
  <div className="py-12 md:py-20 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl font-bold text-primary">Simple, Transparent Pricing</h1>
        <p className="text-detail mt-2 font-brand">Choose the plan that fits your business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {subscriptionPlans.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-card rounded-2xl p-6 border ${plan.popular ? "border-accent ring-2 ring-accent/30 relative" : "border-detail/20"} card-hover`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <h3 className="font-serif text-xl font-semibold text-primary">{plan.name}</h3>
            <p className="text-sm text-detail mt-1 font-brand">{plan.description}</p>
            <div className="mt-4 mb-6">
              <span className="text-4xl font-bold text-primary">${plan.price}</span>
              <span className="text-detail">/{plan.period}</span>
            </div>
            <Link to="/become-stylist" className={plan.popular ? "btn-cta w-full text-sm text-center block" : "bg-detail text-detail-foreground hover:bg-detail/90 font-semibold rounded-xl px-6 py-3 transition-all w-full text-sm text-center block"}>
              Get Started
            </Link>
            <div className="mt-6 space-y-3">
              {plan.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-primary">
                  <Check className="w-4 h-4 text-accent flex-shrink-0" /> {f}
                </div>
              ))}
              {plan.notIncluded.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-detail">
                  <X className="w-4 h-4 flex-shrink-0" /> {f}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default PricingPage;
