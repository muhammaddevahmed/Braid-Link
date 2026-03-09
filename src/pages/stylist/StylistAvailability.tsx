import { useState } from "react";
import { stylists } from "@/data/demo-data";
import { Plus, Trash2 } from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const StylistAvailability = () => {
  const [availability, setAvailability] = useState(stylists[0].availability);

  return (
    <div className="space-y-6 max-w-lg">
      <h2 className="font-serif text-2xl font-bold">Availability Schedule</h2>
      <div className="bg-card rounded-xl p-5 border border-border space-y-3">
        {days.map((day) => {
          const slot = availability[day];
          return (
            <div key={day} className="flex items-center gap-4">
              <label className="flex items-center gap-2 w-28">
                <input type="checkbox" checked={!!slot} onChange={() => {
                  const a = { ...availability };
                  if (slot) delete a[day]; else a[day] = { start: "10:00", end: "18:00" };
                  setAvailability(a);
                }} className="rounded" />
                <span className="text-sm font-medium">{day}</span>
              </label>
              {slot && (
                <div className="flex items-center gap-2">
                  <input type="time" value={slot.start} onChange={(e) => setAvailability({ ...availability, [day]: { ...slot, start: e.target.value } })} className="px-2 py-1.5 rounded border border-input bg-background text-sm" />
                  <span className="text-sm">to</span>
                  <input type="time" value={slot.end} onChange={(e) => setAvailability({ ...availability, [day]: { ...slot, end: e.target.value } })} className="px-2 py-1.5 rounded border border-input bg-background text-sm" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button className="btn-cta text-sm">Save Schedule</button>
    </div>
  );
};

export default StylistAvailability;
