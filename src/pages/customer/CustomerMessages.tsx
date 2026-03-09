import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Shield, Clock } from "lucide-react";

const CustomerMessages = () => {
  const [messages] = useState([
    {
      id: "m1",
      from: "Admin",
      subject: "Dispute Resolution: Booking #B4",
      message: "We have reviewed your dispute regarding the Cornrows service with Angela Johnson. After investigating both sides, we have issued a partial refund of $37.50 (50% of the service cost) to your original payment method. This should appear in your account within 3-5 business days.",
      date: "2026-03-05",
      read: false,
      type: "dispute"
    },
    {
      id: "m2",
      from: "Admin",
      subject: "Account Verification Complete",
      message: "Your account has been successfully verified. You can now book appointments and leave reviews. Thank you for joining BraidBook!",
      date: "2026-02-28",
      read: true,
      type: "general"
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <motion.h2 
        className="font-serif text-2xl font-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Admin Messages
      </motion.h2>

      {messages.length === 0 ? (
        <div className="bg-card rounded-xl p-12 border border-border text-center">
          <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No messages from admin</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg, idx) => (
            <motion.div
              key={msg.id}
              className={`bg-card rounded-xl p-5 border transition-all duration-200 cursor-pointer ${
                selectedMessage === msg.id 
                  ? "border-primary shadow-md" 
                  : msg.read 
                    ? "border-border hover:border-muted-foreground/30" 
                    : "border-primary/30 bg-primary/5"
              }`}
              onClick={() => setSelectedMessage(selectedMessage === msg.id ? null : msg.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-sm">{msg.from}</p>
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {msg.date}
                    </p>
                  </div>
                </div>
                {msg.type === "dispute" && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-cta/10 text-cta">Dispute</span>
                )}
              </div>
              
              <p className="font-medium text-sm mb-2">{msg.subject}</p>
              
              {selectedMessage === msg.id && (
                <motion.div
                  className="pt-3 border-t border-border mt-3"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <p className="text-sm text-muted-foreground leading-relaxed">{msg.message}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerMessages;
