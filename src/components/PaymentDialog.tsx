import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBooking } from "@/contexts/useBookingHook";
import { Booking } from "@/data/demo-data";
import { toast } from "sonner";
import { 
  CreditCard, Lock, Shield, CheckCircle, 
  Calendar, Clock, User, DollarSign, Sparkles,
  AlertCircle, BadgeCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentDialogProps {
  booking: Booking | null;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

export const PaymentDialog = ({ booking, onClose, onPaymentSuccess }: PaymentDialogProps) => {
  const { updateBookingStatus } = useBooking();
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  if (!booking) return null;

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setCardExpiry(formatted);
  };

  const handlePayment = () => {
    // Basic validation
    if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) {
      toast.error("Invalid card number. Please enter a 16-digit card number.");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(cardName)) {
      toast.error("Invalid card name. Please enter a valid name.");
      return;
    }

    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardExpiry)) {
      toast.error("Invalid expiry date. Please use MM/YY format.");
      return;
    }

    if (!/^[0-9]{3,4}$/.test(cardCvv)) {
      toast.error("Invalid CVV. Please enter a 3 or 4-digit CVV.");
      return;
    }

    if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
      toast.error("Please fill in all card details.");
      return;
    }
    
    // Simulate payment processing
    setIsProcessing(true);
    toast.loading("Processing payment...");
    
    setTimeout(() => {
      updateBookingStatus(booking.id, "upcoming");
      toast.dismiss();
      toast.success("Payment successful! Your booking is confirmed.");
      setIsProcessing(false);
      onPaymentSuccess();
    }, 1500);
  };

  return (
    <Dialog open={!!booking} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[450px] p-0 gap-0 bg-background/95 backdrop-blur-sm border-2 border-accent/20 shadow-2xl overflow-hidden">
        {/* Premium Header with Gradient */}
        <div className="relative bg-gradient-to-br from-primary via-primary to-primary/95 px-6 py-6">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-[60px] animate-pulse" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-accent/8 rounded-full blur-[60px] animate-pulse delay-1000" />
            <div className="absolute inset-0 opacity-[0.03]" 
                 style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '24px 24px' }} />
          </div>

          <DialogHeader className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/20">
                <CreditCard className="w-3 h-3 text-accent" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-1 text-white/60 text-xs">
                <Lock className="w-3 h-3" />
                <span>256-bit</span>
              </div>
            </div>
            
            <DialogTitle className="text-2xl font-serif font-bold text-white mb-2">
              Complete Your Payment
            </DialogTitle>
            
            <DialogDescription className="text-white/80 text-sm">
              Pay for your booking with <span className="text-accent font-semibold">{booking.stylistName}</span>
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Booking Summary - Premium */}
        <div className="px-6 pt-6 pb-2">
          <div className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl p-4 border border-accent/20">
            <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
              <BadgeCheck className="w-4 h-4 text-accent" />
              Booking Summary
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-accent" />
                  Stylist
                </span>
                <span className="font-semibold text-primary">{booking.stylistName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  Date
                </span>
                <span className="font-semibold text-primary">
                  {new Date(booking.date + "T00:00:00").toLocaleDateString("en-US", { 
                    weekday: "short", 
                    month: "short", 
                    day: "numeric" 
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  Time
                </span>
                <span className="font-semibold text-primary">{booking.time}</span>
              </div>
              <div className="flex justify-between items-center pt-2 mt-2 border-t border-border/50">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-accent" />
                  Total Amount
                </span>
                <span className="font-bold text-accent text-xl">${booking.price}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="px-6 py-4">
          <div className="space-y-4">
            {/* Card Number */}
            <div className="space-y-2">
              <Label htmlFor="card-number" className="text-sm font-medium text-primary flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-accent/10 flex items-center justify-center">
                  <CreditCard className="w-3 h-3 text-accent" />
                </div>
                Card Number
              </Label>
              <div className="relative">
                <Input 
                  id="card-number" 
                  placeholder="1234 5678 9012 3456" 
                  value={cardNumber} 
                  onChange={handleCardNumberChange}
                  onFocus={() => setFocusedField('card')}
                  onBlur={() => setFocusedField(null)}
                  maxLength={19}
                  className="pl-10 pr-4 py-3 rounded-xl border-border focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                />
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent/70" />
              </div>
            </div>

            {/* Name on Card */}
            <div className="space-y-2">
              <Label htmlFor="card-name" className="text-sm font-medium text-primary flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-accent/10 flex items-center justify-center">
                  <User className="w-3 h-3 text-accent" />
                </div>
                Name on Card
              </Label>
              <Input 
                id="card-name" 
                placeholder="John Doe" 
                value={cardName} 
                onChange={e => setCardName(e.target.value)}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                className="px-4 py-3 rounded-xl border-border focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
              />
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry-date" className="text-sm font-medium text-primary">Expiry</Label>
                <Input 
                  id="expiry-date" 
                  placeholder="MM/YY" 
                  value={cardExpiry} 
                  onChange={handleExpiryChange}
                  onFocus={() => setFocusedField('expiry')}
                  onBlur={() => setFocusedField(null)}
                  maxLength={5}
                  className="px-4 py-3 rounded-xl border-border focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv" className="text-sm font-medium text-primary">CVV</Label>
                <div className="relative">
                  <Input 
                    id="cvv" 
                    placeholder="123" 
                    type="password" 
                    value={cardCvv} 
                    onChange={e => setCardCvv(e.target.value)}
                    onFocus={() => setFocusedField('cvv')}
                    onBlur={() => setFocusedField(null)}
                    maxLength={4}
                    className="pl-10 pr-4 py-3 rounded-xl border-border focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent/70" />
                </div>
              </div>
            </div>

            {/* Security Note */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-accent/5 rounded-lg p-3 border border-accent/10 mt-2">
              <Shield className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Your payment information is encrypted and secure. We never store your full card details.</span>
            </div>
          </div>
        </div>

        {/* Footer with Buttons */}
        <DialogFooter className="px-6 py-4 border-t border-border/50 bg-gradient-to-b from-secondary/5 to-secondary/10">
          <div className="w-full flex items-center gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="flex-1 border-2 border-border hover:bg-accent/5 hover:border-accent/30 transition-all h-12"
            >
              Cancel
            </Button>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1"
            >
              <Button 
                type="submit" 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold h-12 rounded-xl hover:shadow-lg hover:shadow-accent/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Pay ${booking.price}
                  </div>
                )}
              </Button>
            </motion.div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};