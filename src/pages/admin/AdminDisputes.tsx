import { useState } from "react";
import { MessageSquare, Check, X, Send, Mail } from "lucide-react";

const AdminDisputes = () => {
  const [disputes, setDisputes] = useState([
    { id: "d1", customer: "Sarah Mitchell", stylist: "Angela Johnson", service: "Cornrows", reason: "Service was not as described. Braids were uneven.", date: "2026-03-02", status: "open", messages: [] },
    { id: "d2", customer: "Kim Brown", stylist: "Destiny Williams", service: "Goddess Locs", reason: "Appointment was 2 hours late with no communication.", date: "2026-02-28", status: "open", messages: [] },
    { id: "d3", customer: "Lisa Thompson", stylist: "Nicole Davis", service: "Box Braids", reason: "Braids came undone within a week.", date: "2026-02-20", status: "resolved", messages: [{ from: "Admin", to: "Both Parties", text: "We have reviewed this dispute and issued a partial refund.", date: "2026-02-22" }] },
  ]);

  const [contactingId, setContactingId] = useState(null);
  const [contactMessage, setContactMessage] = useState("");
  const [contactTarget, setContactTarget] = useState("both");
  const [sentNotifications, setSentNotifications] = useState([]);

  const handleSendMessage = (dispute) => {
    const notification = {
      id: `n${Date.now()}`,
      disputeId: dispute.id,
      from: "Admin",
      to: contactTarget === "both" ? `${dispute.customer} & ${dispute.stylist}` : contactTarget === "customer" ? dispute.customer : dispute.stylist,
      text: contactMessage,
      date: new Date().toISOString().split("T")[0],
    };

    setDisputes(disputes.map((d) =>
      d.id === dispute.id ? { ...d, messages: [...d.messages, notification] } : d
    ));
    setSentNotifications([notification, ...sentNotifications]);
    setContactMessage("");
    setContactingId(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="font-serif text-2xl font-bold">Dispute Management</h2>
      <div className="space-y-4">{disputes.map((d) => (
        <div key={d.id} className="bg-card rounded-xl p-5 border border-border">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-cta" /><span className="font-semibold text-sm">{d.customer} vs {d.stylist}</span></div>
              <p className="text-xs text-muted-foreground mt-1">{d.service} · {d.date}</p>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${d.status === "open" ? "bg-cta/10 text-cta" : "bg-green-100 text-green-700"}`}>{d.status}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{d.reason}</p>

          {/* Message History */}
          {d.messages.length > 0 && (
            <div className="mb-3 space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Communication History:</p>
              {d.messages.map((msg, i) => (
                <div key={i} className="bg-muted/50 rounded-lg p-3 text-xs">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{msg.from} → {msg.to}</span>
                    <span className="text-muted-foreground">{msg.date}</span>
                  </div>
                  <p className="text-muted-foreground">{msg.text}</p>
                </div>
              ))}
            </div>
          )}

          {d.status === "open" && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <button onClick={() => setDisputes(disputes.map(di => di.id === d.id ? { ...di, status: "resolved" } : di))} className="btn-primary text-xs flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Resolve</button>
                <button onClick={() => setContactingId(contactingId === d.id ? null : d.id)} className="text-xs px-3 py-1.5 rounded-lg border border-input hover:bg-muted flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Contact Parties</button>
              </div>

              {contactingId === d.id && (
                <div className="bg-muted/30 rounded-lg p-4 border border-border space-y-3">
                  <div>
                    <label className="text-xs font-medium mb-1 block">Send To</label>
                    <div className="flex gap-2">
                      {[
                        { val: "both", label: "Both Parties" },
                        { val: "customer", label: d.customer },
                        { val: "stylist", label: d.stylist },
                      ].map((t) => (
                        <button key={t.val} onClick={() => setContactTarget(t.val)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${contactTarget === t.val ? "bg-primary text-primary-foreground border-primary" : "border-input hover:bg-muted"}`}>{t.label}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium mb-1 block">Message</label>
                    <textarea
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm h-20 resize-none"
                      placeholder="Type your message to the parties..."
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSendMessage(d)}
                      disabled={!contactMessage.trim()}
                      className="btn-cta text-xs flex items-center gap-1 disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" /> Send to Dashboard
                    </button>
                    <button onClick={() => setContactingId(null)} className="text-xs px-3 py-1.5 rounded-lg border border-input hover:bg-muted">Cancel</button>
                  </div>
                  <p className="text-xs text-muted-foreground">This message will appear in the user's dashboard notifications.</p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}</div>

      {/* Recent Notifications Sent */}
      {sentNotifications.length > 0 && (
        <div className="bg-card rounded-xl p-5 border border-border">
          <h3 className="font-serif font-semibold mb-3">Recently Sent Notifications</h3>
          <div className="space-y-2">
            {sentNotifications.map((n) => (
              <div key={n.id} className="flex items-start gap-3 py-2 border-b border-border last:border-0">
                <Send className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="text-sm"><span className="font-medium">To: {n.to}</span></p>
                  <p className="text-xs text-muted-foreground">{n.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDisputes;
