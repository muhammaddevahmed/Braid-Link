import { stylists } from "@/data/demo-data";
import { DollarSign, TrendingUp, Clock, CreditCard, Check, AlertCircle, Lock } from "lucide-react";
import { useState } from "react";

const StylistEarnings = () => {
  const s = stylists[0];
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [step, setStep] = useState("form"); // form, confirm, submitted

  const monthlyData = [
    { month: "Oct", amount: 3200 }, { month: "Nov", amount: 3800 }, { month: "Dec", amount: 4500 },
    { month: "Jan", amount: 3600 }, { month: "Feb", amount: 4100 }, { month: "Mar", amount: 3800 },
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

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold">Earnings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-2xl p-5 border border-border card-hover"><div className="flex items-center gap-2 text-muted-foreground text-sm mb-2"><DollarSign className="w-4 h-4" /> Total Earnings</div><p className="text-3xl font-bold">${s.totalEarnings.toLocaleString()}</p></div>
        <div className="bg-card rounded-2xl p-5 border border-border card-hover"><div className="flex items-center gap-2 text-muted-foreground text-sm mb-2"><TrendingUp className="w-4 h-4" /> This Month</div><p className="text-3xl font-bold">${s.monthlyEarnings.toLocaleString()}</p></div>
        <div className="bg-card rounded-2xl p-5 border border-border card-hover"><div className="flex items-center gap-2 text-muted-foreground text-sm mb-2"><Clock className="w-4 h-4" /> Pending</div><p className="text-3xl font-bold">$420</p></div>
      </div>

      <div className="bg-card rounded-2xl p-5 border border-border">
        <h3 className="font-serif font-semibold mb-4">Monthly Earnings</h3>
        <div className="flex items-end gap-2 h-40">
          {monthlyData.map((m) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-lg transition-all hover:opacity-90" style={{ height: `${(m.amount / 5000) * 100}%`, background: "var(--gradient-hero)" }} />
              <span className="text-xs text-muted-foreground">{m.month}</span>
              <span className="text-xs font-medium">${(m.amount / 1000).toFixed(1)}k</span>
            </div>
          ))}
        </div>
      </div>

      {/* Withdrawal Request - Card Only */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="font-serif font-semibold mb-5 flex items-center gap-2"><CreditCard className="w-5 h-5 text-primary" /> Request Withdrawal</h3>

        {step === "submitted" ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8 text-accent" /></div>
            <h4 className="font-serif font-semibold text-lg mb-2">Withdrawal Requested!</h4>
            <p className="text-sm text-muted-foreground mb-1">Amount: <strong>${withdrawAmount}</strong></p>
            <p className="text-sm text-muted-foreground mb-4">Processing takes <strong>3-4 business days</strong>. You'll be notified when funds are transferred to your card.</p>
            <div className="bg-muted/50 rounded-xl p-4 text-left text-sm space-y-2 max-w-sm mx-auto">
              <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="text-secondary font-semibold">Pending Review</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Card</span><span className="font-medium">****{cardNumber.slice(-4)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Est. Completion</span><span className="font-medium">{(() => { const d = new Date(); d.setDate(d.getDate() + 4); return d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }); })()}</span></div>
            </div>
            <button onClick={() => { setStep("form"); setWithdrawAmount(""); setCardNumber(""); setCardName(""); setCardExpiry(""); }} className="btn-primary text-sm mt-5">New Request</button>
          </div>
        ) : step === "confirm" ? (
          <div className="max-w-md space-y-4">
            <div className="bg-muted/40 rounded-xl p-5 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Withdrawal Amount</span><span className="font-bold text-lg">${withdrawAmount}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Card</span><span className="font-medium flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" /> ****{cardNumber.slice(-4)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Cardholder</span><span className="font-medium">{cardName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Processing Time</span><span className="font-medium">3-4 business days</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Platform Fee</span><span className="font-medium">$0.00</span></div>
              <div className="border-t border-border pt-2 flex justify-between font-bold"><span>You'll Receive</span><span className="text-accent">${withdrawAmount}</span></div>
            </div>
            <div className="bg-secondary/10 rounded-xl p-3 flex items-start gap-2 text-sm border border-secondary/20">
              <AlertCircle className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
              <p className="text-muted-foreground">Your withdrawal will be reviewed by admin and funds will be transferred to your card within 3-4 business days.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep("form")} className="btn-outline text-sm flex-1 py-2.5">Go Back</button>
              <button onClick={handleSubmitRequest} className="btn-cta text-sm flex-1 py-2.5">Confirm Withdrawal</button>
            </div>
          </div>
        ) : (
          <div className="max-w-md space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Withdrawal Amount ($)</label>
              <input type="number" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Enter amount" />
            </div>

            <div className="pt-2 border-t border-border">
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold">Card Details</span>
                <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                  <Lock className="w-3 h-3" /> Secure
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Card Number</label>
                  <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="1234 5678 9012 3456" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Name on Card</label>
                  <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Angela Johnson" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Expiry Date</label>
                  <input type="text" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="MM/YY" maxLength={5} />
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep("confirm")}
              disabled={!withdrawAmount || Number(withdrawAmount) <= 0 || !cardNumber || !cardName}
              className="btn-cta text-sm w-full disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              Continue to Review
            </button>
          </div>
        )}
      </div>

      {/* Withdrawal History */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <h3 className="font-serif font-semibold mb-4">Withdrawal History</h3>
        <div className="space-y-3">
          {withdrawals.map((w) => (
            <div key={w.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div>
                <p className="text-sm font-medium">${w.amount.toLocaleString()} to {w.card}</p>
                <p className="text-xs text-muted-foreground">Requested: {w.requestDate}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2.5 py-1 rounded-full capitalize font-medium ${
                  w.status === "completed" ? "bg-accent/15 text-accent" :
                  w.status === "processing" ? "bg-primary/10 text-primary" :
                  "bg-secondary/15 text-secondary-foreground"
                }`}>{w.status}</span>
                <p className="text-xs text-muted-foreground mt-1">{w.processDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StylistEarnings;
