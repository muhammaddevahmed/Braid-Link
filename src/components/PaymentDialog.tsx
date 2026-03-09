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
import { useBooking } from "@/contexts/BookingContext";
import { Booking } from "@/data/demo-data";
import { toast } from "sonner";
import { CreditCard, Lock } from "lucide-react";

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

  if (!booking) return null;

  const handlePayment = () => {
    // Basic validation
    if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
      toast.error("Please fill in all card details.");
      return;
    }
    // Simulate payment processing
    console.log("Processing payment for booking:", booking.id);
    
    // Use a timeout to simulate network delay
    toast.loading("Processing payment...");
    setTimeout(() => {
      updateBookingStatus(booking.id, "upcoming");
      toast.dismiss();
      toast.success("Payment successful! Your booking is confirmed.");
      onPaymentSuccess();
    }, 1500);
  };

  return (
    <Dialog open={!!booking} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
          <DialogDescription>
            Pay for your booking with {booking.stylistName} for the amount of ${booking.price}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2 mb-1">
            <CreditCard className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-sm">Card Details</h3>
            <div className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" /> Secure
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input id="card-number" placeholder="1234 5678 9012 3456" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="card-name">Name on Card</Label>
            <Input id="card-name" placeholder="John Doe" value={cardName} onChange={e => setCardName(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="expiry-date">Expiry</Label>
              <Input id="expiry-date" placeholder="MM/YY" value={cardExpiry} onChange={e => setCardExpiry(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" type="password" value={cardCvv} onChange={e => setCardCvv(e.target.value)} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" onClick={handlePayment}>Pay ${booking.price}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
