import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { subscriptionPlans } from "@/data/demo-data";
import { Check, CreditCard, Lock, ShieldCheck, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const SelectPlanPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [step, setStep] = useState(1); // 1: Plan Selection, 2: Payment

  // Payment State
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const handleContinue = () => {
    setStep(2);
  };

  const handlePayment = () => {
    if (!user) {
      toast.error("Authentication error. Please log in again.");
      navigate('/login');
      return;
    }

    if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
      toast.error("Please fill in all payment details.");
      return;
    }

    const appKey = `stylist_application_${user.id}`;
    const appData = localStorage.getItem(appKey);
    
    const toastId = toast.loading("Processing payment...");

    setTimeout(() => {
      if (appData) {
        const app = JSON.parse(appData);
        app.planId = selectedPlan;
        app.status = 'active'; // Mark as active after plan selection
        localStorage.setItem(appKey, JSON.stringify(app));
        
        toast.dismiss(toastId);
        toast.success(`Payment successful! Subscribed to ${subscriptionPlans.find(p => p.id === selectedPlan)?.name} plan.`);
        navigate('/stylist/dashboard');
      } else {
        toast.dismiss(toastId);
        toast.error("Application data not found. Please contact support.");
      }
    }, 1500);
  };

  const selectedPlanDetails = subscriptionPlans.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full bg-card p-8 rounded-2xl border border-border shadow-lg"
      >
        {step === 1 ? (
          <>
            <div className="text-center mb-8">
              <h1 className="font-serif text-3xl font-bold text-primary">Congratulations & Welcome!</h1>
              <p className="text-muted-foreground mt-2">Your application is approved. Choose a subscription plan to get started.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => (
                <div 
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`cursor-pointer rounded-xl border-2 p-6 transition-all ${selectedPlan === plan.id ? 'border-accent bg-accent/5 ring-2 ring-accent' : 'border-detail/10 hover:border-detail/30'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-primary text-lg">{plan.name}</h3>
                    {selectedPlan === plan.id && <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center"><Check className="w-4 h-4 text-primary" /></div>}
                  </div>
                  <div className="text-3xl font-serif font-bold text-primary mb-2">${plan.price}<span className="text-sm font-sans font-normal text-muted-foreground">/{plan.period}</span></div>
                  <p className="text-xs text-muted-foreground mb-4 h-12">{plan.description}</p>
                  <ul className="space-y-2">
                    {plan.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="text-xs flex items-start gap-2 text-detail"><Check className="w-3 h-3 text-green-600 mt-0.5 shrink-0" /> {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button onClick={handleContinue} className="btn-cta px-10 py-3">Continue to Payment</button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <button onClick={() => setStep(1)} className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to Plans
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-primary mb-4">Payment Details</h2>
                <p className="text-muted-foreground mb-6">Complete your subscription to activate your account.</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input 
                        type="text" 
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Cardholder Name</label>
                    <input 
                      type="text" 
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Expiry Date</label>
                      <input 
                        type="text" 
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">CVC</label>
                      <input 
                        type="password" 
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <span>Your payment information is encrypted and secure.</span>
                </div>
              </div>
              
              <div className="bg-muted/30 p-6 rounded-xl border border-border h-fit">
                <h3 className="font-serif font-semibold text-lg mb-4">Order Summary</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="font-medium">{selectedPlanDetails?.name}</span>
                </div>
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-border">
                  <span className="text-muted-foreground">Billing Cycle</span>
                  <span className="font-medium">Monthly</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-primary">${selectedPlanDetails?.price}</span>
                </div>
                
                <button onClick={handlePayment} className="btn-cta w-full py-3 flex items-center justify-center gap-2">
                  <Lock className="w-4 h-4" /> Pay ${selectedPlanDetails?.price} & Activate
                </button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  By confirming, you agree to our Terms of Service. Subscription auto-renews monthly.
                </p>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default SelectPlanPage;