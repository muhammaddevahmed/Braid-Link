import { useState } from "react";
import { Check, X } from "lucide-react";

const AdminWithdrawals = () => {
  const [requests, setRequests] = useState([
    { id: "w1", stylist: "Angela Johnson", amount: 500, method: "PayPal", date: "2026-03-05", status: "pending" },
    { id: "w2", stylist: "Destiny Williams", amount: 800, method: "Bank Transfer", date: "2026-03-04", status: "pending" },
    { id: "w3", stylist: "Maya Robinson", amount: 1200, method: "PayPal", date: "2026-03-03", status: "approved" },
    { id: "w4", stylist: "Tiffany Moore", amount: 350, method: "Bank Transfer", date: "2026-03-01", status: "approved" },
  ]);

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold">Withdrawal Requests</h2>
      <div className="space-y-3">{requests.map((w) => (
        <div key={w.id} className="bg-card rounded-xl p-5 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-semibold">{w.stylist}</p>
            <p className="text-sm text-muted-foreground">${w.amount} via {w.method} · {w.date}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${w.status === "pending" ? "bg-secondary/30 text-accent" : "bg-green-100 text-green-700"}`}>{w.status}</span>
            {w.status === "pending" && (
              <>
                <button onClick={() => setRequests(requests.map(r => r.id === w.id ? { ...r, status: "approved" } : r))} className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Approve</button>
                <button onClick={() => setRequests(requests.filter(r => r.id !== w.id))} className="text-xs px-3 py-1.5 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 flex items-center gap-1"><X className="w-3.5 h-3.5" /> Reject</button>
              </>
            )}
          </div>
        </div>
      ))}</div>
    </div>
  );
};

export default AdminWithdrawals;
