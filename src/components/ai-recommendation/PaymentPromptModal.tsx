import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  mockStyleSuggestion, 
  mockHealthReport 
} from '@/data/ai-data';
import { Stylist } from '@/data/demo-data';
import { 
  CreditCard, 
  Shield, 
  Clock, 
  Calendar, 
  CheckCircle, 
  AlertCircle,
  DollarSign,
  Sparkles,
  Heart,
  Star,
  Lock,
  ArrowRight
} from 'lucide-react';

interface PaymentPromptModalProps {
  stylist: Stylist | null;
  selectedDate?: string;
  selectedTime?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const PaymentPromptModal = ({ 
  stylist, 
  selectedDate, 
  selectedTime, 
  onConfirm, 
  onCancel 
}: PaymentPromptModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'paypal'>('card');

  if (!stylist) return null;

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
    
    setTimeout(() => {
      if (onConfirm) {
        onConfirm();
      }
    }, 1500);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  // Format date for display
  const formattedDate = selectedDate 
    ? new Date(selectedDate).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : 'Date to be confirmed';

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleCancel()}>
      <DialogContent className="max-w-md md:max-w-lg p-0 overflow-hidden rounded-2xl border-border/50 shadow-2xl">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="payment-form"
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header with gradient */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent" />
                <DialogHeader className="relative p-6 pb-2 text-center">
                  <div className="flex justify-center mb-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring" }}
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center"
                    >
                      <CreditCard className="w-7 h-7 text-accent" />
                    </motion.div>
                  </div>
                  <DialogTitle className="text-2xl md:text-3xl font-serif font-bold text-primary">
                    Confirm & Pay
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground mt-1">
                    You're just one step away from securing your appointment
                  </DialogDescription>
                </DialogHeader>
              </div>

              {/* Content */}
              <div className="px-6 py-4">
                {/* Booking Summary Card */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-accent/5 to-muted/30 rounded-xl p-4 mb-6 border border-accent/10"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img 
                        src={mockStyleSuggestion.image} 
                        alt={mockStyleSuggestion.name} 
                        className="w-20 h-20 rounded-xl object-cover shadow-md" 
                      />
                      <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                        <Heart className="w-3 h-3 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-primary text-lg">{mockStyleSuggestion.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="w-3.5 h-3.5 text-accent" />
                        <span>with {stylist.name}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-600">
                          {mockStyleSuggestion.safety}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Appointment Details */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="space-y-3 mb-6"
                >
                  <div className="flex items-center justify-between py-2 border-b border-border/30">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Date</span>
                    </div>
                    <span className="font-medium text-primary">{formattedDate}</span>
                  </div>
                  {selectedTime && (
                    <div className="flex items-center justify-between py-2 border-b border-border/30">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Time</span>
                      </div>
                      <span className="font-medium text-primary">{selectedTime}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-2 border-b border-border/30">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Duration</span>
                    </div>
                    <span className="font-medium text-primary">{mockStyleSuggestion.duration / 60} hours</span>
                  </div>
                </motion.div>

                {/* Price Breakdown */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-muted/30 rounded-xl p-4 mb-6"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Service Price</span>
                    <span className="font-medium">£{mockStyleSuggestion.price}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Service Fee</span>
                    <span className="font-medium">£{(mockStyleSuggestion.price * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border/30 my-2 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-primary">Total</span>
                      <span className="font-bold text-xl text-primary">
                        £{(mockStyleSuggestion.price * 1.05).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Payment Methods */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mb-6"
                >
                  <p className="text-sm font-medium text-primary mb-3">Payment Method</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedPaymentMethod('card')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        selectedPaymentMethod === 'card'
                          ? 'border-accent bg-accent/5'
                          : 'border-border/50 hover:border-accent/30'
                      }`}
                    >
                      <CreditCard className={`w-4 h-4 ${selectedPaymentMethod === 'card' ? 'text-accent' : 'text-muted-foreground'}`} />
                      <span className="text-sm font-medium">Credit Card</span>
                    </button>
                    <button
                      onClick={() => setSelectedPaymentMethod('paypal')}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        selectedPaymentMethod === 'paypal'
                          ? 'border-accent bg-accent/5'
                          : 'border-border/50 hover:border-accent/30'
                      }`}
                    >
                      <span className="text-sm font-medium text-primary">PayPal</span>
                    </button>
                  </div>
                </motion.div>

                {/* Trust Message */}
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-4">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Secure payment encrypted</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  <Shield className="w-3.5 h-3.5" />
                  <span>Booking guaranteed</span>
                </div>
              </div>

              {/* Footer Buttons */}
              <DialogFooter className="p-6 pt-0 gap-3">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="flex-1 border-border/50 hover:bg-muted/50"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={isProcessing}
                  className="flex-1 bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold hover:shadow-lg transition-all group"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Pay Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </DialogFooter>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              className="p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-10 h-10 text-green-500" />
              </motion.div>
              <DialogTitle className="text-2xl font-serif font-bold text-primary mb-2">
                Payment Successful!
              </DialogTitle>
              <DialogDescription className="text-muted-foreground mb-4">
                Your booking has been confirmed. You will receive a confirmation email shortly.
              </DialogDescription>
              <div className="bg-accent/5 rounded-xl p-4 mb-4 text-left">
                <p className="text-sm font-medium text-primary mb-2">Booking Reference:</p>
                <code className="text-xs bg-muted px-2 py-1 rounded">BOOK-{Math.random().toString(36).substring(2, 10).toUpperCase()}</code>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentPromptModal;