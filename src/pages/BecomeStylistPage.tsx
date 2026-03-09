import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, LogIn, Shield, X, CreditCard, Clock } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { subscriptionPlans } from "@/data/demo-data";
import { toast } from "sonner";
const steps = ["Personal Details", "Services", "Availability", "Submit"];



const BecomeStylistPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(0);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: user?.name || "", email: user?.email || "", phone: "", bio: "", experience: "", location: "", postalCode: "",
    services: [{ name: "", price: "", duration: "" }],
    availability: {} as Record<string, { start: string; end: string }>,
  });
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    if (user) {
      setForm(f => ({ ...f, name: f.name || user.name, email: f.email || user.email }));
      const app = localStorage.getItem(`stylist_application_${user.id}`);
      if (app) {
        setApplicationStatus(JSON.parse(app).status);
      }
    }
  }, [user]);



  const handleSubmit = async () => {
    if (!user) {
      toast.error("You must be logged in to submit.");
      return;
    }
    setIsSubmitting(true);
    try {
      const applicationData = {
        ...form,
        status: 'pending',
        submittedAt: new Date().toISOString(),
      };
      localStorage.setItem(`stylist_application_${user.id}`, JSON.stringify(applicationData));
      setSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit. Image might be too large.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="py-20 bg-background min-h-[60vh] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-md">
          <div className="bg-card rounded-xl p-8 border border-detail/20 shadow-lg">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <LogIn className="w-8 h-8 text-accent" />
            </div>
            <h2 className="font-serif text-2xl font-bold mb-3 text-primary">Authentication Required</h2>
            <p className="text-muted-foreground mb-8">Please log in as a stylist to apply for a stylist account.</p>
            <Link to="/login" className="btn-cta w-full block text-center py-3">Log In / Sign Up</Link>
          </div>
        </div>
      </div>
    );
  }

  if (user?.role === 'customer') {
    return (
      <div className="py-20 bg-background min-h-[60vh] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-md">
          <div className="bg-card rounded-xl p-8 border border-detail/20 shadow-lg">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <X className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="font-serif text-2xl font-bold mb-3 text-primary">Stylist Account Required</h2>
            <p className="text-muted-foreground mb-8">You are currently logged in as a Customer. To become a stylist, you must create a separate Stylist account.</p>
            <button onClick={() => { localStorage.removeItem("braidbook_user"); window.location.href = "/signup"; }} className="btn-cta w-full block text-center py-3">Create Stylist Account</button>
          </div>
        </div>
      </div>
    );
  }

  if (applicationStatus === 'pending') {
    return (
      <div className="py-20 bg-background min-h-[60vh] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-md">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-accent" />
            </div>
            <h1 className="font-serif text-3xl font-bold mb-3">Application Pending</h1>
            <p className="text-muted-foreground mb-8">Your application is under review. This usually takes up to 48 hours. We'll notify you by email once it's approved.</p>
            <Link to="/" className="btn-primary text-sm">Back to Home</Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (applicationStatus === 'approved') {
    return (
      <div className="py-20 bg-background min-h-[60vh] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-md">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-serif text-3xl font-bold mb-3">Application Approved!</h1>
            <p className="text-muted-foreground mb-8">Congratulations! Your stylist profile is approved. Please log out and log back in to access your stylist dashboard.</p>
            <button onClick={() => {
              window.location.href = "/stylist/select-plan";
            }} className="btn-cta text-sm">Select Plan & Start</button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (applicationStatus === 'active') {
    return (
      <div className="py-20 bg-background min-h-[60vh] flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-md">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-serif text-3xl font-bold mb-3">Account Active</h1>
            <p className="text-muted-foreground mb-8">Your stylist account is fully active.</p>
            <Link to="/stylist/dashboard" className="btn-primary w-full block text-center py-3">Go to Dashboard</Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="py-20">
        <div className="container mx-auto px-4 text-center max-w-md">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-serif text-3xl font-bold mb-3">Application Submitted for Review!</h1>
            <p className="text-muted-foreground mb-6">Thank you for applying. We'll review your application within 48 hours and notify you by email.</p>
            <button onClick={() => navigate("/")} className="btn-primary text-sm">Back to Home</button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-bold text-primary">Become a Stylist</h1>
          <p className="text-detail mt-2 font-brand">Join our network of talented braiding professionals</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i <= step ? "bg-accent text-primary" : "bg-muted text-detail"
              }`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className="hidden sm:block text-xs ml-2 font-medium text-primary">{s}</span>
              {i < steps.length - 1 && <div className={`w-8 sm:w-12 h-0.5 mx-2 ${i < step ? "bg-accent" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl p-6 border border-detail/20">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              {step === 0 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-lg font-semibold text-primary">Personal Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="text-sm font-medium mb-1 block text-primary">Full Name</label><input className="w-full px-3 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:ring-2 focus:ring-accent" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
                    <div><label className="text-sm font-medium mb-1 block text-primary">Email</label><input type="email" className="w-full px-3 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:ring-2 focus:ring-accent" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                    <div><label className="text-sm font-medium mb-1 block text-primary">Phone</label><input className="w-full px-3 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:ring-2 focus:ring-accent" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
                    <div><label className="text-sm font-medium mb-1 block text-primary">Experience (years)</label><input type="number" className="w-full px-3 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:ring-2 focus:ring-accent" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} /></div>
                  </div>

                  <div><label className="text-sm font-medium mb-1 block text-primary">Bio</label><textarea className="w-full px-3 py-2.5 rounded-lg border border-detail/20 bg-background text-sm h-24 resize-none focus:ring-2 focus:ring-accent" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} /></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div><label className="text-sm font-medium mb-1 block text-primary">Location</label><input className="w-full px-3 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:ring-2 focus:ring-accent" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="City, State" /></div>
                    <div><label className="text-sm font-medium mb-1 block text-primary">Postal Code</label><input className="w-full px-3 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:ring-2 focus:ring-accent" value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} /></div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-lg font-semibold text-primary">Your Services</h2>
                  {form.services.map((svc, i) => (
                    <div key={i} className="grid grid-cols-3 gap-3 items-end">
                      <div><label className="text-sm font-medium mb-1 block text-primary">Service</label><input className="w-full px-3 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:ring-2 focus:ring-accent" value={svc.name} onChange={(e) => { const s = [...form.services]; s[i].name = e.target.value; setForm({ ...form, services: s }); }} placeholder="e.g. Box Braids" /></div>
                      <div><label className="text-sm font-medium mb-1 block text-primary">Price ($)</label><input type="number" className="w-full px-3 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:ring-2 focus:ring-accent" value={svc.price} onChange={(e) => { const s = [...form.services]; s[i].price = e.target.value; setForm({ ...form, services: s }); }} /></div>
                      <div><label className="text-sm font-medium mb-1 block text-primary">Duration</label><input className="w-full px-3 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:ring-2 focus:ring-accent" value={svc.duration} onChange={(e) => { const s = [...form.services]; s[i].duration = e.target.value; setForm({ ...form, services: s }); }} placeholder="e.g. 4-5 hours" /></div>
                    </div>
                  ))}
                  <button onClick={() => setForm({ ...form, services: [...form.services, { name: "", price: "", duration: "" }] })} className="text-sm text-accent hover:underline font-semibold">+ Add another service</button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="font-serif text-lg font-semibold text-primary">Availability Schedule</h2>
                  <div className="space-y-3">
                    {days.map((day) => {
                      const isActive = !!form.availability[day];
                      return (
                        <div key={day} className="flex items-center gap-4">
                          <label className="flex items-center gap-2 w-28">
                            <input type="checkbox" checked={isActive} onChange={() => {
                              const a = { ...form.availability };
                              if (isActive) delete a[day]; else a[day] = { start: "10:00", end: "18:00" };
                              setForm({ ...form, availability: a });
                            }} className="rounded border-detail/20" />
                            <span className="text-sm font-medium text-primary">{day}</span>
                          </label>
                          {isActive && (
                            <div className="flex items-center gap-2">
                              <input type="time" value={form.availability[day]?.start} onChange={(e) => setForm({ ...form, availability: { ...form.availability, [day]: { ...form.availability[day], start: e.target.value } } })} className="px-2 py-1.5 rounded border border-detail/20 bg-background text-sm focus:ring-2 focus:ring-accent" />
                              <span className="text-sm text-detail">to</span>
                              <input type="time" value={form.availability[day]?.end} onChange={(e) => setForm({ ...form, availability: { ...form.availability, [day]: { ...form.availability[day], end: e.target.value } } })} className="px-2 py-1.5 rounded border border-detail/20 bg-background text-sm focus:ring-2 focus:ring-accent" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="text-center py-6">
                  <h2 className="font-serif text-lg font-semibold mb-3 text-primary">Review & Submit</h2>
                  <p className="text-sm text-detail mb-6 font-brand">Please review your application details before submitting.</p>
                  <div className="text-left bg-accent/5 rounded-lg p-4 text-sm space-y-2 border border-accent/20">
                    <p className="text-primary"><strong>Name:</strong> {form.name || "—"}</p>
                    <p className="text-primary"><strong>Email:</strong> {form.email || "—"}</p>
                    <p className="text-primary"><strong>Location:</strong> {form.location || "—"}</p>
                    <p className="text-primary"><strong>Available days:</strong> {Object.keys(form.availability).join(", ") || "—"}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-6 pt-4 border-t border-detail/20">
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="flex items-center gap-1 text-sm font-medium text-detail hover:text-primary disabled:opacity-30">
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            {step < steps.length - 1 ? (
              <button onClick={() => setStep(step + 1)} className="bg-detail text-detail-foreground hover:bg-detail/90 font-semibold rounded-xl px-6 py-3 transition-all flex items-center gap-1 text-sm">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={isSubmitting} className="btn-cta text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeStylistPage;
