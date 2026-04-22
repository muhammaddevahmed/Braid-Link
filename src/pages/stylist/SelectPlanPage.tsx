import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { subscriptionPlans } from "@/data/demo-data";
import { 
  Check, CreditCard, Lock, ShieldCheck, ChevronLeft, 
  Sparkles, Crown, Award, Zap, Gift, Star, Calendar,
  ArrowRight, AlertCircle, Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SelectPlanPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [step, setStep] = useState(1); // 1: Plan Selection, 2: Payment
  const [isProcessing, setIsProcessing] = useState(false);

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

    if (cardNumber.length < 16) {
      toast.error("Please enter a valid 16-digit card number.");
      return;
    }

    if (cardCvv.length < 3) {
      toast.error("Please enter a valid CVV.");
      return;
    }

    setIsProcessing(true);
    const appKey = `stylist_application_${user.id}`;
    const appData = localStorage.getItem(appKey);
    
    const toastId = toast.loading("Processing payment...");

    setTimeout(() => {
      if (appData) {
        const app = JSON.parse(appData);
        app.planId = selectedPlan;
        app.billingCycle = billingCycle;
        app.status = 'active';
        app.subscriptionDate = new Date().toISOString();
        localStorage.setItem(appKey, JSON.stringify(app));
        
        toast.dismiss(toastId);
        toast.success("Payment successful! Your stylist account is now active.");
        setIsProcessing(false);
        navigate('/stylist/dashboard');
      } else {
        toast.dismiss(toastId);
        toast.error("Application data not found. Please contact support.");
        setIsProcessing(false);
      }
    }, 1500);
  };

  const selectedPlanDetails = subscriptionPlans.find(p => p.id === selectedPlan);
  const currentPrice = selectedPlanDetails ? (billingCycle === 'monthly' ? selectedPlanDetails.monthlyPrice : selectedPlanDetails.yearlyPrice) : 0;
  const yearlySavings = selectedPlanDetails ? (selectedPlanDetails.monthlyPrice * 12 - selectedPlanDetails.yearlyPrice) : 0;

  const getPlanIcon = (planId: string) => {
    switch(planId) {
      case "basic": return <Zap className="w-5 h-5" />;
      case "professional": return <Crown className="w-5 h-5" />;
      case "premium": return <Award className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const getPlanColor = (planId: string) => {
    switch(planId) {
      case "basic": return {
        bg: "from-blue-500/20 to-blue-500/5",
        border: "border-blue-500/30",
        text: "text-blue-600",
        button: "bg-blue-600 hover:bg-blue-700"
      };
      case "professional": return {
        bg: "from-purple-500/20 to-purple-500/5",
        border: "border-purple-500/30",
        text: "text-purple-600",
        button: "bg-purple-600 hover:bg-purple-700"
      };
      case "premium": return {
        bg: "from-amber-500/20 to-amber-500/5",
        border: "border-amber-500/30",
        text: "text-amber-600",
        button: "bg-amber-600 hover:bg-amber-700"
      };
      default: return {
        bg: "from-gray-500/20 to-gray-500/5",
        border: "border-gray-500/30",
        text: "text-gray-600",
        button: "bg-gray-600 hover:bg-gray-700"
      };
    }
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl w-full"
      >
        {step === 1 ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-medium px-5 py-2.5 rounded-full mb-4 border border-primary/30"
              >
                <Sparkles className="w-4 h-4" />
                <span>Congratulations! Your Application is Approved</span>
              </motion.div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-3">Choose Your Plan</h1>
              <p className="text-detail max-w-xl mx-auto">
                Select the perfect subscription plan to activate your stylist account and start accepting bookings.
              </p>
            </div>

            {/* Billing Toggle */}
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
                className="data-[state=checked]:bg-primary"
              />
              <Label htmlFor="billing-cycle" className={`font-medium transition-colors ${billingCycle === 'yearly' ? 'text-primary' : 'text-detail'}`}>
                Yearly
              </Label>
              <motion.span 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
                className="text-xs font-bold bg-primary text-white px-3 py-1.5 rounded-full flex items-center gap-1"
              >
                <Gift className="w-3 h-3" /> SAVE 15%
              </motion.span>
            </div>

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {subscriptionPlans.map((plan, idx) => {
                const isSelected = selectedPlan === plan.id;
                const colors = getPlanColor(plan.id);
                const Icon = getPlanIcon(plan.id);
                const yearlyPrice = Math.round(plan.monthlyPrice * 12 * 0.85);
                const displayPrice = billingCycle === "monthly" ? plan.monthlyPrice : yearlyPrice;

                return (
                  <motion.div
                    key={plan.id}
                    custom={idx}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -8 }}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`cursor-pointer relative bg-card rounded-2xl border-2 overflow-hidden transition-all duration-300 h-full flex flex-col ${
                      isSelected 
                        ? 'border-primary shadow-2xl scale-105 z-10' 
                        : 'border-border/50 hover:border-primary/30 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {/* Popular Badge */}
                    {plan.id === "professional" && (
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-center py-2 text-xs font-bold flex items-center justify-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        MOST POPULAR
                        <Sparkles className="w-3 h-3" />
                      </div>
                    )}

                    <div className={`p-6 ${plan.id === "professional" ? "pt-10" : ""}`}>
                      {/* Plan Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center`}>
                          <div className={colors.text}>{Icon}</div>
                        </div>
                        {isSelected && (
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>

                      <h3 className="font-serif text-xl font-bold text-primary mb-2">{plan.name}</h3>
                      <p className="text-sm text-detail mb-4 h-12">{plan.description}</p>

                      {/* Price */}
                      <div className="mb-6">
                        <div className="flex items-end gap-1">
                          <span className="text-4xl font-bold text-primary">£{displayPrice}</span>
                          <span className="text-detail mb-1">/{billingCycle === "monthly" ? "mo" : "yr"}</span>
                        </div>
                        {billingCycle === "yearly" && (
                          <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                            <Gift className="w-3 h-3" />
                            Save £{plan.monthlyPrice * 12 - yearlyPrice} per year!
                          </p>
                        )}
                      </div>

                      {/* Features */}
                      <ul className="space-y-3 mb-6 flex-grow">
                        {plan.features.slice(0, 4).map((feature, i) => (
                          <li key={i} className="text-xs flex items-start gap-2 text-detail">
                            <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Selected Indicator */}
                      {isSelected && (
                        <div className="mt-2 text-center">
                          <span className="text-xs text-primary font-semibold">Selected</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Continue Button */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleContinue}
                className="btn-cta px-12 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-2 group"
              >
                Continue to Payment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <p className="text-xs text-detail mt-4 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-primary" />
                Secure checkout • 30-day money-back guarantee
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Back Button */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <button 
                onClick={() => setStep(1)} 
                className="flex items-center text-sm text-detail hover:text-primary transition-colors group"
              >
                <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> 
                Back to Plans
              </button>
            </motion.div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Payment Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-xl">
                  <h2 className="font-serif text-2xl font-bold text-primary mb-2">Payment Details</h2>
                  <p className="text-detail mb-6">Complete your subscription to activate your stylist account.</p>
                  
                  <div className="space-y-5">
                    {/* Card Number */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-primary" /> Card Number
                      </label>
                      <div className="relative group">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary group-focus-within:scale-110 transition-transform" />
                        <input 
                          type="text" 
                          value={cardNumber} 
                          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))} 
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                          placeholder="1234 5678 9012 3456" 
                        />
                      </div>
                      <p className="text-xs text-detail">
                        {cardNumber.length}/16 digits
                      </p>
                    </div>

                    {/* Cardholder Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary">Cardholder Name</label>
                      <input 
                        type="text" 
                        value={cardName} 
                        onChange={(e) => setCardName(e.target.value)} 
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                        placeholder="John Doe" 
                      />
                    </div>

                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Expiry Date</label>
                        <input 
                          type="text" 
                          value={cardExpiry} 
                          onChange={(e) => setCardExpiry(e.target.value)} 
                          className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                          placeholder="MM/YY" 
                          maxLength={5} 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">CVV</label>
                        <input 
                          type="password" 
                          value={cardCvv} 
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))} 
                          className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" 
                          placeholder="123" 
                          maxLength={4} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Security Message */}
                  <div className="mt-6 flex items-center gap-2 text-xs text-detail bg-primary/5 p-4 rounded-xl border border-primary/20">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span>Your payment information is encrypted and secure. We never store your full card details.</span>
                  </div>
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-2xl border border-primary/20 shadow-xl h-fit sticky top-24">
                  <h3 className="font-serif text-xl font-bold text-primary mb-6">Order Summary</h3>
                  
                  {/* Plan Details */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-card rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        {selectedPlanDetails?.id === "basic" && <Zap className="w-5 h-5 text-primary" />}
                        {selectedPlanDetails?.id === "professional" && <Crown className="w-5 h-5 text-primary" />}
                        {selectedPlanDetails?.id === "premium" && <Award className="w-5 h-5 text-primary" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary">{selectedPlanDetails?.name} Plan</p>
                        <p className="text-xs text-detail capitalize">{billingCycle} billing</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-detail">Subtotal</span>
                      <span className="font-medium text-primary">£{currentPrice}</span>
                    </div>

                    {billingCycle === "yearly" && (
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-detail flex items-center gap-1">
                          <Gift className="w-3 h-3 text-green-600" /> Yearly Savings
                        </span>
                        <span className="font-medium text-green-600">-£{yearlySavings}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center py-3">
                      <span className="font-bold text-primary text-lg">Total</span>
                      <span className="font-bold text-3xl text-primary">£{currentPrice}</span>
                    </div>

                    
                  </div>
                  
                  {/* Pay Button */}
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="btn-cta w-full py-4 rounded-xl flex items-center justify-center gap-2 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Pay £{currentPrice} & Activate Account
                      </>
                    )}
                  </motion.button>

                  <p className="text-xs text-center text-detail mt-4">
                    By confirming, you agree to our Terms of Service and Privacy Policy.
                  </p>

                  {/* Trust Badges */}
                  <div className="flex items-center justify-center gap-4 mt-6 text-xs text-detail">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-primary" />
                      Secure
                    </span>
                    <span className="w-1 h-1 rounded-full bg-detail/30" />
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-primary" />
                      Encrypted
                    </span>
                    <span className="w-1 h-1 rounded-full bg-detail/30" />
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-primary" />
                      30-day guarantee
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default SelectPlanPage;