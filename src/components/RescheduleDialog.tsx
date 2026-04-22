import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Booking } from "@/data/demo-data";
import { toast } from "sonner";

interface RescheduleDialogProps {
  booking: Booking | null;
  onClose: () => void;
  onReschedule: (bookingId: string, newDate: Date, newTime: string) => void;
}

export const RescheduleDialog = ({ booking, onClose, onReschedule }: RescheduleDialogProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(booking ? new Date(booking.date) : new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  if (!booking) return null;

  // Mock available times for a given date
  const getAvailableTimes = (date: Date | undefined) => {
    if (!date) return [];
    // In a real app, this would fetch stylist's availability
    return ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];
  };

  const availableTimes = getAvailableTimes(selectedDate);

  const handleReschedule = () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a new date and time.");
      return;
    }
    onReschedule(booking.id, selectedDate, selectedTime);
  };

  return (
    <Dialog open={!!booking} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Reschedule Booking</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="mb-4">Select a new date and time for your booking for <strong>{booking.service}</strong>.</p>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              // Disable past dates
              disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
            />
          </div>
          {selectedDate && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2 text-center">Available Times for {selectedDate.toLocaleDateString()}</h4>
              <div className="grid grid-cols-3 gap-2">
                {availableTimes.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleReschedule} disabled={!selectedTime}>
            Request Reschedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
