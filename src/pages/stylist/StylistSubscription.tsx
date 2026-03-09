import { subscriptionPlans } from "@/data/demo-data";
import { Check, X } from "lucide-react";
import { useState } from "react";

const StylistSubscription = () => {
  const [current, setCurrent] = useState("professional");

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold">Subscription Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subscriptionPlans.map((plan) => (
          <div key={plan.id} className={`bg-card rounded-xl p-5 border ${current === plan.id ? "border-cta ring-2 ring-cta/20" : "border-border"}`}>
            <h3 className="font-serif font-semibold">{plan.name}</h3>
            <div className="mt-2 mb-4"><span className="text-3xl font-bold">${plan.price}</span><span className="text-muted-foreground">/{plan.period}</span></div>
            <div className="space-y-2 mb-4">
              {plan.features.map((f) => <div key={f} className="flex items-center gap-2 text-sm"><Check className="w-3.5 h-3.5 text-green-600" />{f}</div>)}
              {plan.notIncluded.map((f) => <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground"><X className="w-3.5 h-3.5" />{f}</div>)}
            </div>
            <button onClick={() => setCurrent(plan.id)} className={current === plan.id ? "w-full text-sm py-2 rounded-lg bg-muted text-muted-foreground font-medium" : "btn-primary w-full text-sm py-2"}>
              {current === plan.id ? "Current Plan" : "Switch Plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StylistSubscription;
