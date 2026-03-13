import { stylists } from "@/data/demo-data";
import { 
  DollarSign, TrendingUp, Clock, CreditCard, Check, 
  AlertCircle, Lock, Wallet, ArrowUpRight, Calendar,
  Download, Receipt, History, Shield, Sparkles,
  ChevronRight, PiggyBank, Banknote, Landmark
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StylistEarnings = () => {
  const s = stylists[0];
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [step, setStep] = useState("form"); // form, confirm, submitted
  const [selectedPeriod, setSelectedPeriod] = useState("6m");

  const monthlyData = [
    { month: "Oct", amount: 3200 }, 
    { month: "Nov", amount: 3800 }, 
    { month: "Dec", amount: 4500 },
    { month: "Jan", amount: 3600 }, 
    { month: "Feb", amount: 4100 }, 
    { month: "Mar", amount: 3800 },
  ];

  const [withdrawals, setWithdrawals] = useState([
    { id: "w1", amount: 1500, card: "****4532", status: "completed", requestDate: "2026-02-20", processDate: "2026-02-24" },
    { id: "w2", amount: 2000, card: "****4532", status: "processing", requestDate: "2026-03-05", processDate: "Est. 2026-03-09" },
  ]);

  const handleSubmitRequest = () => {
    const estDate = new Date();
    estDate.setDate(estDate.getDate() + 4);
    const newW = {
      id: `w${Date.now()}`,
      amount: Number(withdrawAmount),
      card: "****" + cardNumber.slice(-4),
      status: "pending",
      requestDate: new Date().toISOString().split("T")[0],
      processDate: "Est. " + estDate.toISOString().split("T")[0],
    };
    setWithdrawals([newW, ...withdrawals]);
    setStep("submitted");
  };

  const totalPending = 420;
  const totalAvailable = s.totalEarnings - withdrawals.reduce((sum, w) => sum + w.amount, 0);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
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
              <Wallet className="w-3.5 h-3.5" />
              Earnings Dashboard
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Earnings</h2>
          <p className="text-muted-foreground mt-1 text-sm">Track your income and manage withdrawals</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { 
            label: "Total Earnings", 
            value: formatCurrency(s.totalEarnings), 
            icon: DollarSign, 
            trend: "+12.5%",
            gradient: "from-emerald-500/10 to-emerald-500/5",
            iconColor: "text-emerald-600",
            trendColor: "bg-emerald-100 text-emerald-700"
          },
          { 
            label: "This Month", 
            value: formatCurrency(s.monthlyEarnings), 
            icon: TrendingUp, 
            trend: "+8.2%",
            gradient: "from-blue-500/10 to-blue-500/5",
            iconColor: "text-blue-600",
            trendColor: "bg-blue-100 text-blue-700"
          },
          { 
            label: "Available", 
            value: formatCurrency(totalAvailable), 
            icon: Banknote, 
            trend: "Ready to withdraw",
            gradient: "from-purple-500/10 to-purple-500/5",
            iconColor: "text-purple-600",
            trendColor: "bg-purple-100 text-purple-700"
          },
          { 
            label: "Pending", 
            value: formatCurrency(totalPending), 
            icon: Clock, 
            trend: "Processing",
            gradient: "from-amber-500/10 to-amber-500/5",
            iconColor: "text-amber-600",
            trendColor: "bg-amber-100 text-amber-700"
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -4 }}
            className="bg-card rounded-xl p-5 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.trendColor}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-primary mb-1">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Withdrawal Request Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold text-primary">Request Withdrawal</h3>
            <p className="text-xs text-muted-foreground">Transfer your earnings to your bank account</p>
          </div>
          <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground bg-accent/5 px-2 py-1 rounded-full">
            <Lock className="w-3 h-3 text-accent" /> Secure
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === "submitted" ? (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-8"
            >
              <div className="relative w-20 h-20 mx-auto mb-4">
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Check className="w-10 h-10 text-emerald-600" />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center"
                >
                  <Sparkles className="w-3 h-3 text-primary" />
                </motion.div>
              </div>
              
              <h4 className="font-serif text-xl font-semibold text-primary mb-2">Withdrawal Requested!</h4>
              <p className="text-muted-foreground text-sm mb-6">Your withdrawal request has been submitted successfully</p>
              
              <div className="bg-accent/5 rounded-xl p-5 border border-accent/10 max-w-sm mx-auto text-left mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Amount</span>
                    <span className="text-lg font-bold text-primary">${withdrawAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Card</span>
                    <span className="text-sm font-medium text-primary">****{cardNumber.slice(-4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Status</span>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">Pending Review</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Est. Completion</span>
                    <span className="text-sm font-medium text-primary">
                      {(() => { const d = new Date(); d.setDate(d.getDate() + 4); 
                        return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }); })()}
                    </span>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => { setStep("form"); setWithdrawAmount(""); setCardNumber(""); setCardName(""); setCardExpiry(""); }} 
                className="bg-accent text-primary text-sm px-6 py-3 rounded-lg font-medium hover:bg-accent/90 transition-all"
              >
                New Request
              </button>
            </motion.div>
          ) : step === "confirm" ? (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-md mx-auto space-y-6"
            >
              <div className="bg-accent/5 rounded-xl p-5 border border-accent/10">
                <h4 className="font-serif font-semibold text-primary mb-4">Review Your Request</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Withdrawal Amount</span>
                    <span className="font-bold text-xl text-primary">${withdrawAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Card</span>
                    <span className="font-medium flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-accent" /> ****{cardNumber.slice(-4)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cardholder</span>
                    <span className="font-medium">{cardName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Processing Time</span>
                    <span className="font-medium">3-4 business days</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="font-semibold text-primary">You'll Receive</span>
                    <span className="font-bold text-xl text-primary">${withdrawAmount}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">
                  Your withdrawal will be reviewed by admin and funds will be transferred to your card within 3-4 business days.
                </p>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setStep("form")} 
                  className="flex-1 border border-border text-muted-foreground hover:text-primary hover:border-accent/30 text-sm py-3 rounded-lg font-medium transition-all"
                >
                  Go Back
                </button>
                <button 
                  onClick={handleSubmitRequest} 
                  className="flex-1 bg-accent text-primary text-sm py-3 rounded-lg font-medium hover:bg-accent/90 transition-all"
                >
                  Confirm Withdrawal
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="max-w-md mx-auto space-y-6"
            >
              {/* Available Balance */}
              <div className="bg-accent/5 rounded-xl p-4 border border-accent/10 flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Available for withdrawal</span>
                <span className="text-2xl font-bold text-primary">{formatCurrency(totalAvailable)}</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">Withdrawal Amount</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                    <input 
                      type="number" 
                      value={withdrawAmount} 
                      onChange={(e) => setWithdrawAmount(e.target.value)} 
                      className="w-full pl-10 pr-4 py-3.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" 
                      placeholder="Enter amount"
                      max={totalAvailable}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Min: $50 • Max: {formatCurrency(totalAvailable)}
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-4 h-4 text-accent" />
                    <span className="text-sm font-semibold text-primary">Card Details</span>
                    <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground bg-accent/5 px-2 py-1 rounded-full">
                      <Lock className="w-3 h-3 text-accent" /> Encrypted
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Card Number</label>
                      <input 
                        type="text" 
                        value={cardNumber} 
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))} 
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" 
                        placeholder="1234 5678 9012 3456" 
                      />
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Name on Card</label>
                      <input 
                        type="text" 
                        value={cardName} 
                        onChange={(e) => setCardName(e.target.value)} 
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" 
                        placeholder="Angela Johnson" 
                      />
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Expiry Date</label>
                      <input 
                        type="text" 
                        value={cardExpiry} 
                        onChange={(e) => setCardExpiry(e.target.value)} 
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" 
                        placeholder="MM/YY" 
                        maxLength={5} 
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep("confirm")}
                  disabled={!withdrawAmount || Number(withdrawAmount) <= 0 || !cardNumber || !cardName || !cardExpiry}
                  className="bg-accent text-primary text-sm w-full py-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2 hover:bg-accent/90 transition-all"
                >
                  Continue to Review <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Withdrawal History */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <History className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-primary">Withdrawal History</h3>
              <p className="text-xs text-muted-foreground">Recent transactions</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {withdrawals.map((w, i) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg bg-accent/5 border border-accent/10 hover:border-accent/30 transition-all"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  w.status === "completed" ? "bg-emerald-100" :
                  w.status === "processing" ? "bg-blue-100" : "bg-amber-100"
                }`}>
                  {w.status === "completed" ? (
                    <Check className="w-5 h-5 text-emerald-600" />
                  ) : w.status === "processing" ? (
                    <Clock className="w-5 h-5 text-blue-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-primary">${w.amount.toLocaleString()} to {w.card}</p>
                  <p className="text-xs text-muted-foreground">Requested: {w.requestDate}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs px-3 py-1.5 rounded-full capitalize font-medium ${
                  w.status === "completed" ? "bg-emerald-100 text-emerald-700" :
                  w.status === "processing" ? "bg-blue-100 text-blue-700" :
                  "bg-amber-100 text-amber-700"
                }`}>
                  {w.status}
                </span>
                <p className="text-xs text-muted-foreground mt-1">{w.processDate}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="mt-6 pt-6 border-t border-border flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-xs text-muted-foreground">All transactions are secure and encrypted</span>
          </div>
          <span className="text-xs text-muted-foreground">
            Total withdrawn: ${withdrawals.reduce((sum, w) => sum + w.amount, 0).toLocaleString()}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default StylistEarnings;