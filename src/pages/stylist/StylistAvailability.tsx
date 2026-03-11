import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stylists } from "@/data/demo-data";
import { 
  Plus, Trash2, Clock, Calendar, CheckCircle2, 
  AlertCircle, Save, X, ChevronDown, ChevronUp,
  Sun, Moon, Coffee, Sunset, Sparkles, Shield
} from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const StylistAvailability = () => {
  const [availability, setAvailability] = useState(stylists[0].availability);
  const [savedAvailability, setSavedAvailability] = useState(stylists[0].availability);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [bulkAction, setBulkAction] = useState<"all" | "weekdays" | "weekend" | "none">("none");

  const handleToggleDay = (day: string) => {
    const a = { ...availability };
    if (a[day]) {
      delete a[day];
    } else {
      a[day] = { start: "09:00", end: "17:00" };
    }
    setAvailability(a);
    setHasChanges(true);
  };

  const handleTimeChange = (day: string, field: "start" | "end", value: string) => {
    setAvailability({
      ...availability,
      [day]: { ...availability[day], [field]: value }
    });
    setHasChanges(true);
  };

  const handleBulkAction = (action: "all" | "weekdays" | "weekend" | "none") => {
    const a = { ...availability };
    
    if (action === "none") {
      // Clear all
      days.forEach(day => {
        delete a[day];
      });
    } else {
      const targetDays = action === "all" 
        ? days 
        : action === "weekdays" 
          ? days.slice(0, 5) 
          : days.slice(5);
      
      targetDays.forEach(day => {
        a[day] = { start: "09:00", end: "17:00" };
      });
    }
    
    setAvailability(a);
    setBulkAction(action);
    setHasChanges(true);
  };

  const handleSave = () => {
    if (Object.keys(availability).length === 0) {
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
      return;
    }

    setSaveStatus("saving");
    
    // Simulate API call
    setTimeout(() => {
      setSavedAvailability({ ...availability });
      setHasChanges(false);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000);
  };

  const getDayIcon = (day: string) => {
    if (day === "Saturday" || day === "Sunday") {
      return <Sun className="w-4 h-4 text-orange-500" />;
    }
    if (day === "Friday") {
      return <Sunset className="w-4 h-4 text-purple-500" />;
    }
    if (day === "Monday") {
      return <Coffee className="w-4 h-4 text-brown-500" />;
    }
    return <Clock className="w-4 h-4 text-primary" />;
  };

  const getDayStatus = (day: string) => {
    if (availability[day]) {
      return { available: true, color: "bg-green-100 text-green-700 border-green-200" };
    }
    return { available: false, color: "bg-red-100 text-red-700 border-red-200" };
  };

  const activeDaysCount = Object.keys(availability).length;
  const weekdaysActive = days.slice(0, 5).filter(d => availability[d]).length;
  const weekendActive = days.slice(5).filter(d => availability[d]).length;

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Weekly Schedule
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Availability Schedule</h2>
          <p className="text-detail mt-1 font-brand">
            Set your weekly working hours to receive bookings
          </p>
        </div>

        
      </motion.div>

      {/* Status Messages */}
      <AnimatePresence>
        {saveStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-100 border-2 border-green-500 rounded-xl p-4 flex items-center gap-3 shadow-lg"
          >
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-green-800">Schedule Saved!</p>
              <p className="text-xs text-green-700">Your availability has been updated successfully</p>
            </div>
          </motion.div>
        )}
        
        {saveStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-100 border-2 border-red-500 rounded-xl p-4 flex items-center gap-3 shadow-lg"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-red-800">Cannot Save</p>
              <p className="text-xs text-red-700">Please set at least one available day</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl p-4 border border-border/50 flex flex-wrap gap-2"
      >
        <span className="text-xs font-medium text-primary px-2 py-1">Bulk Actions:</span>
        <button
          onClick={() => handleBulkAction("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            bulkAction === "all" 
              ? "bg-primary text-white" 
              : "bg-muted text-detail hover:bg-primary/10"
          }`}
        >
          All Days
        </button>
        <button
          onClick={() => handleBulkAction("weekdays")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            bulkAction === "weekdays" 
              ? "bg-primary text-white" 
              : "bg-muted text-detail hover:bg-primary/10"
          }`}
        >
          Weekdays (Mon-Fri)
        </button>
        <button
          onClick={() => handleBulkAction("weekend")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            bulkAction === "weekend" 
              ? "bg-primary text-white" 
              : "bg-muted text-detail hover:bg-primary/10"
          }`}
        >
          Weekend
        </button>
        <button
          onClick={() => handleBulkAction("none")}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-all"
        >
          Clear All
        </button>
      </motion.div>

      {/* Availability Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-3"
      >
        {days.map((day, idx) => {
          const slot = availability[day];
          const status = getDayStatus(day);
          const isExpanded = expandedDay === day;

          return (
            <motion.div
              key={day}
              custom={idx}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="group"
            >
              <div className={`bg-card rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                slot 
                  ? "border-primary/30 hover:border-primary" 
                  : "border-border/50 hover:border-destructive/30"
              }`}>
                {/* Day Header */}
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => setExpandedDay(isExpanded ? null : day)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        slot ? "bg-primary/10" : "bg-muted"
                      }`}>
                        {getDayIcon(day)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif font-semibold text-primary">{day}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${status.color}`}>
                            {slot ? "Available" : "Unavailable"}
                          </span>
                        </div>
                        {slot && (
                          <p className="text-xs text-detail mt-1">
                            {slot.start} - {slot.end}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={!!slot}
                          onChange={() => handleToggleDay(day)}
                        />
                        <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-detail" />
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Expanded Time Settings */}
                <AnimatePresence>
                  {isExpanded && slot && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-2">
                        <div className="border-t border-border pt-4">
                          <p className="text-xs text-detail mb-3">Set working hours for {day}</p>
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <label className="text-xs text-detail mb-1 block">Start Time</label>
                              <input
                                type="time"
                                value={slot.start}
                                onChange={(e) => handleTimeChange(day, "start", e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                              />
                            </div>
                            <span className="text-sm text-detail mt-6">to</span>
                            <div className="flex-1">
                              <label className="text-xs text-detail mb-1 block">End Time</label>
                              <input
                                type="time"
                                value={slot.end}
                                onChange={(e) => handleTimeChange(day, "end", e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                              />
                            </div>
                          </div>

                          {/* Quick time presets */}
                          <div className="flex gap-2 mt-3">
                            {[
                              { label: "Morning", start: "09:00", end: "12:00" },
                              { label: "Afternoon", start: "13:00", end: "17:00" },
                              { label: "Full Day", start: "09:00", end: "18:00" },
                            ].map((preset) => (
                              <button
                                key={preset.label}
                                onClick={() => {
                                  handleTimeChange(day, "start", preset.start);
                                  handleTimeChange(day, "end", preset.end);
                                }}
                                className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                              >
                                {preset.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>



      {/* Save Button */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="sticky bottom-4 bg-card/80 backdrop-blur-sm p-4 rounded-2xl border border-border/50 shadow-xl"
      >
        <button
          onClick={handleSave}
          disabled={!hasChanges || saveStatus === "saving"}
          className={`w-full py-4 text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg ${
            hasChanges && saveStatus !== "saving"
              ? "bg-primary text-white hover:bg-primary/90 hover:scale-[1.02]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {saveStatus === "saving" ? (
            <>
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Saving Schedule...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              {hasChanges ? "Save Changes" : "All Saved"}
            </>
          )}
        </button>
        {hasChanges && (
          <p className="text-xs text-center text-detail mt-2 flex items-center justify-center gap-1">
            <AlertCircle className="w-3 h-3 text-primary" />
            You have unsaved changes to your schedule
          </p>
        )}
      </motion.div>

      {/* Trust Message */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-xs text-center text-detail flex items-center justify-center gap-1"
      >
        <Shield className="w-3 h-3 text-primary" />
        Your availability is private and only shown to customers when booking
      </motion.p>
    </div>
  );
};

export default StylistAvailability;