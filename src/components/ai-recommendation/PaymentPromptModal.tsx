import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { mockStyleSuggestion } from '@/data/ai-data';
import { Stylist } from '@/data/demo-data';

const PaymentPromptModal = ({ stylist }: { stylist: Stylist | null }) => {
  if (!stylist) return null;

  return (
    <Dialog open={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Confirm Your Booking</DialogTitle>
          <DialogDescription className="text-center">You are one step away from securing your appointment.</DialogDescription>
        </DialogHeader>
        <div className="my-4">
          <div className="flex items-center gap-4">
            <img src={mockStyleSuggestion.image} alt={mockStyleSuggestion.name} className="w-24 h-24 rounded-lg object-cover" />
            <div>
              <h3 className="font-semibold">{mockStyleSuggestion.name}</h3>
              <p className="text-sm text-muted-foreground">with {stylist.name}</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price</span>
              <span className="font-semibold">£{mockStyleSuggestion.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-semibold">{mockStyleSuggestion.duration / 60} hours</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full bg-accent text-primary hover:bg-accent/90">
            Pay Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentPromptModal;

