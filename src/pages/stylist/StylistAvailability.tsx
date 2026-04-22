import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stylists } from "@/data/demo-data";
import { 
  Clock, Calendar, CheckCircle2, 
  AlertCircle, Save, ChevronDown,
  Sun, Moon, Coffee, Sunset, Shield,
  Zap, Sparkles, BadgeCheck
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
      return <Coffee className="w-4 h-4 text-amber-600" />;
    }
    return <Clock className="w-4 h-4 text-accent" />;
  };

  const getDayStatus = (day: string) => {
    if (availability[day]) {
      return { 
        available: true, 
        bg: "bg-emerald-100", 
        text: "text-emerald-700", 
        border: "border-emerald-200",
        icon: BadgeCheck,
        label: "Available"
      };
    }
    return { 
      available: false, 
      bg: "bg-rose-100", 
      text: "text-rose-700", 
      border: "border-rose-200",
      icon: AlertCircle,
      label: "Unavailable"
    };
  };

  const activeDaysCount = Object.keys(availability).length;
  const weekdaysActive = days.slice(0, 5).filter(d => availability[d]).length;
  const weekendActive = days.slice(5).filter(d => availability[d]).length;

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-accent/10 text-accent text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Weekly Schedule
            </span>
            {activeDaysCount > 0 && (
              <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                {activeDaysCount} active days
              </span>
            )}
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Availability Schedule</h2>
          <p className="text-muted-foreground mt-1 text-sm">
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
            className="bg-emerald-100 border border-emerald-300 rounded-xl p-4 flex items-center gap-3 shadow-lg"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-200 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-800">Schedule Saved!</p>
              <p className="text-xs text-emerald-700">Your availability has been updated successfully</p>
            </div>
            <BadgeCheck className="w-5 h-5 text-emerald-600 ml-auto" />
          </motion.div>
        )}
        
        {saveStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-rose-100 border border-rose-300 rounded-xl p-4 flex items-center gap-3 shadow-lg"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-200 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-rose-700" />
            </div>
            <div>
              <p className="text-sm font-semibold text-rose-800">Cannot Save</p>
              <p className="text-xs text-rose-700">Please set at least one available day</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-xl p-4 border border-border flex flex-wrap items-center gap-2"
      >
        <span className="text-xs font-medium text-primary px-2 py-1 bg-accent/5 rounded-lg">Bulk Actions:</span>
        <button
          onClick={() => handleBulkAction("all")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            bulkAction === "all" 
              ? "bg-accent text-primary shadow-sm" 
              : "bg-muted text-muted-foreground hover:bg-accent/10"
          }`}
        >
          All Days
        </button>
        <button
          onClick={() => handleBulkAction("weekdays")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            bulkAction === "weekdays" 
              ? "bg-accent text-primary shadow-sm" 
              : "bg-muted text-muted-foreground hover:bg-accent/10"
          }`}
        >
          Weekdays (Mon-Fri)
        </button>
        <button
          onClick={() => handleBulkAction("weekend")}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            bulkAction === "weekend" 
              ? "bg-accent text-primary shadow-sm" 
              : "bg-muted text-muted-foreground hover:bg-accent/10"
          }`}
        >
          Weekend
        </button>
        <button
          onClick={() => handleBulkAction("none")}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-rose-100 text-rose-700 hover:bg-rose-200 transition-all border border-rose-200"
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
          const StatusIcon = status.icon;
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
                  ? "border-accent/30 hover:border-accent hover:shadow-md" 
                  : "border-border hover:border-rose-300 hover:shadow-sm"
              }`}>
                {/* Day Header */}
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => setExpandedDay(isExpanded ? null : day)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        slot ? "bg-accent/10" : "bg-muted"
                      }`}>
                        {getDayIcon(day)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif font-semibold text-primary">{day}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${status.bg} ${status.text} border ${status.border}`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </div>
                        {slot && (
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-accent" />
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
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent/30 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                      </label>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                          isExpanded ? 'bg-accent/10' : ''
                        }`}
                      >
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
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
                          <div className="flex items-center gap-1 mb-3">
                            <Clock className="w-3.5 h-3.5 text-accent" />
                            <p className="text-xs text-muted-foreground">Set working hours for {day}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-1">
                              <label className="text-xs text-muted-foreground mb-1 block">Start</label>
                              <input
                                type="time"
                                value={slot.start}
                                onChange={(e) => handleTimeChange(day, "start", e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                              />
                            </div>
                            <span className="text-sm text-muted-foreground mt-6">→</span>
                            <div className="flex-1">
                              <label className="text-xs text-muted-foreground mb-1 block">End</label>
                              <input
                                type="time"
                                value={slot.end}
                                onChange={(e) => handleTimeChange(day, "end", e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                              />
                            </div>
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
        className="sticky bottom-4 bg-card/80 backdrop-blur-sm p-4 rounded-xl border border-border shadow-lg"
      >
        <button
          onClick={handleSave}
          disabled={!hasChanges || saveStatus === "saving"}
          className={`w-full py-4 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-md ${
            hasChanges && saveStatus !== "saving"
              ? "bg-accent text-primary hover:bg-accent/90 hover:scale-[1.02]"
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
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-center text-muted-foreground mt-2 flex items-center justify-center gap-1"
          >
            <AlertCircle className="w-3 h-3 text-accent" />
            You have unsaved changes to your schedule
          </motion.p>
        )}
      </motion.div>

      {/* Trust Message */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center"
      >
        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 bg-card/50 px-3 py-1.5 rounded-full border border-border">
          <Shield className="w-3 h-3 text-accent" />
          Your availability is private and only shown to customers when booking
          <Sparkles className="w-3 h-3 text-accent" />
        </p>
      </motion.div>
    </div>
  );
};

export default StylistAvailability;