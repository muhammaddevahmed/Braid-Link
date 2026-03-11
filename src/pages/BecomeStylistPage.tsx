import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, ChevronRight, ChevronLeft, LogIn, Shield, X, 
  CreditCard, Clock, User, Mail, Phone, MapPin, Award,
  Scissors, Calendar, Star, Sparkles, AlertCircle, Info,
  Briefcase, Hash, FileText, Plus, Trash2
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { subscriptionPlans } from "@/data/demo-data";
import { toast } from "sonner";

const steps = ["Personal Details", "Services", "Availability", "Review"];

const BecomeStylistPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [step, setStep] = useState(0);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: user?.name || "", 
    email: user?.email || "", 
    phone: "", 
    bio: "", 
    experience: "", 
    location: "", 
    postalCode: "",
    country: "UK",
    services: [{ name: "", price: "", duration: "" }],
    availability: {} as Record<string, { start: string; end: string }>,
  });
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (stepIndex === 0) {
      if (!form.name.trim()) newErrors.name = "Name is required";
      if (!form.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
      if (!form.phone.trim()) newErrors.phone = "Phone is required";
      if (!form.experience) newErrors.experience = "Experience is required";
      if (!form.bio.trim()) newErrors.bio = "Bio is required";
      if (!form.location.trim()) newErrors.location = "Location is required";
      if (!form.postalCode.trim()) {
        newErrors.postalCode = "Postal code is required";
      } else {
        const isValid = form.country === 'US' 
          ? /^\d{5}$/.test(form.postalCode) 
          : /^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}$/i.test(form.postalCode);
        if (!isValid) {
          newErrors.postalCode = `Please enter a valid ${form.country === 'US' ? '5-digit US zip code' : 'UK postcode'}.`;
        }
      }
    }
    
    if (stepIndex === 1) {
      form.services.forEach((service, index) => {
        if (!service.name.trim()) newErrors[`service_name_${index}`] = "Service name required";
        if (!service.price) newErrors[`service_price_${index}`] = "Price required";
        if (!service.duration.trim()) newErrors[`service_duration_${index}`] = "Duration required";
      });
    }
    
    if (stepIndex === 2) {
      if (Object.keys(form.availability).length === 0) {
        newErrors.availability = "Please set at least one available day";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(step)) {
      toast.error("Please complete all required fields");
      return;
    }
    
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
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addService = () => {
    setForm({ 
      ...form, 
      services: [...form.services, { name: "", price: "", duration: "" }] 
    });
  };

  const removeService = (index: number) => {
    if (form.services.length > 1) {
      const updated = form.services.filter((_, i) => i !== index);
      setForm({ ...form, services: updated });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="py-20 bg-gradient-to-b from-background to-secondary/10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-md">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" }}
            className="bg-card rounded-3xl p-8 border border-border/50 shadow-2xl"
          >
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
              <LogIn className="w-10 h-10 text-accent" />
            </div>
            <h2 className="font-serif text-2xl font-bold mb-3 text-primary">Authentication Required</h2>
            <p className="text-detail mb-8">Please log in as a stylist to apply for a stylist account.</p>
            <Link to="/login" className="btn-cta w-full block text-center py-4 rounded-xl text-base font-semibold">
              Log In / Sign Up
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (user?.role === 'customer') {
    return (
      <div className="py-20 bg-gradient-to-b from-background to-secondary/10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-md">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-card rounded-3xl p-8 border border-border/50 shadow-2xl"
          >
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <X className="w-10 h-10 text-destructive" />
            </div>
            <h2 className="font-serif text-2xl font-bold mb-3 text-primary">Stylist Account Required</h2>
            <p className="text-detail mb-8">You are currently logged in as a Customer. To become a stylist, you must create a separate Stylist account.</p>
            <button 
              onClick={() => { 
                localStorage.removeItem("braidbook_user"); 
                window.location.href = "/signup"; 
              }} 
              className="btn-cta w-full block text-center py-4 rounded-xl text-base font-semibold"
            >
              Create Stylist Account
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (applicationStatus === 'pending') {
    return (
      <div className="py-20 bg-gradient-to-b from-background to-secondary/10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-md">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" }}
          >
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <Clock className="w-12 h-12 text-accent" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
            </div>
            <h1 className="font-serif text-3xl font-bold mb-3 text-primary">Application Pending</h1>
            <p className="text-detail mb-8 font-brand">Your application is under review. This usually takes up to 48 hours. We'll notify you by email once it's approved.</p>
            <Link to="/" className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl">
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (applicationStatus === 'approved') {
    return (
      <div className="py-20 bg-gradient-to-b from-background to-secondary/10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-md">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" }}
          >
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Check className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h1 className="font-serif text-3xl font-bold mb-3 text-primary">Application Approved!</h1>
            <p className="text-detail mb-8">Congratulations! Your stylist profile is approved. Please log out and log back in to access your stylist dashboard.</p>
            <button onClick={() => {
              window.location.href = "/stylist/select-plan";
            }} className="btn-cta inline-flex items-center gap-2 px-8 py-4 rounded-xl">
              Select Plan & Start <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (applicationStatus === 'active') {
    return (
      <div className="py-20 bg-gradient-to-b from-background to-secondary/10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-md">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Shield className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h1 className="font-serif text-3xl font-bold mb-3 text-primary">Account Active</h1>
            <p className="text-detail mb-8">Your stylist account is fully active and ready to go.</p>
            <Link to="/stylist/dashboard" className="btn-primary w-full block text-center py-4 rounded-xl text-base">
              Go to Dashboard
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="py-20 bg-gradient-to-b from-background to-secondary/10 min-h-screen">
        <div className="container mx-auto px-4 text-center max-w-md">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" }}
          >
            <div className="relative mb-8">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Check className="w-12 h-12 text-green-600" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.div>
            </div>
            <h1 className="font-serif text-3xl font-bold mb-3 text-primary">Application Submitted!</h1>
            <p className="text-detail mb-8 font-brand">Thank you for applying. We'll review your application within 48 hours and notify you by email.</p>
            <button 
              onClick={() => navigate("/")} 
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl"
            >
              Back to Home
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gradient-to-b from-background to-secondary/10 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm text-accent text-xs font-medium px-5 py-2.5 rounded-full mb-4 border border-accent/30">
            <Award className="w-4 h-4" />
            <span>Join Our Network</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
            <span>Step {step + 1} of {steps.length}</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-3">
            Become a Stylist
          </h1>
          <p className="text-detail max-w-xl mx-auto font-brand">
            Join our network of talented braiding professionals and grow your business
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="relative mb-10">
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-3 rounded-full bg-gradient-to-r from-accent to-cta"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          
          {/* Step Indicators */}
          <div className="flex justify-between mt-2 px-2">
            {steps.map((title, index) => (
              <div key={index} className="text-center">
                <div className={`text-xs font-medium ${index <= step ? 'text-accent' : 'text-detail'}`}>
                  Step {index + 1}
                </div>
                <div className="hidden sm:block text-xs text-detail mt-1">
                  {title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-3xl p-6 md:p-8 border border-border/50 shadow-2xl"
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={step} 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -30 }} 
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            >
              {/* Step 0: Personal Details */}
              {step === 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-semibold text-primary">Personal Details</h2>
                      <p className="text-sm text-detail">Tell us about yourself</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                        <User className="w-4 h-4 text-accent" /> Full Name
                      </label>
                      <input 
                        className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all`}
                        value={form.name} 
                        onChange={(e) => setForm({ ...form, name: e.target.value })} 
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                        <Mail className="w-4 h-4 text-accent" /> Email
                      </label>
                      <input 
                        type="email"
                        className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all`}
                        value={form.email} 
                        onChange={(e) => setForm({ ...form, email: e.target.value })} 
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-accent" /> Phone
                      </label>
                      <input 
                        className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all`}
                        value={form.phone} 
                        onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-accent" /> Experience Level
                      </label>
                      <select 
                        className={`w-full px-4 py-3 rounded-xl border ${errors.experience ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all appearance-none cursor-pointer`}
                        value={form.experience} 
                        onChange={(e) => setForm({ ...form, experience: e.target.value })}
                      >
                        <option value="">Select experience level</option>
                        <option value="beginner">Beginner (Just Starting)</option>
                        <option value="1-2">1-2 Years</option>
                        <option value="3-5">3-5 Years</option>
                        <option value="5-10">5-10 Years</option>
                        <option value="10+">10+ Years</option>
                      </select>
                      {errors.experience && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.experience}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-accent" /> Bio
                    </label>
                    <textarea 
                      className={`w-full px-4 py-3 rounded-xl border ${errors.bio ? 'border-destructive' : 'border-border'} bg-background text-sm h-28 resize-none focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all`}
                      value={form.bio} 
                      onChange={(e) => setForm({ ...form, bio: e.target.value })} 
                      placeholder="Tell potential clients about yourself, your experience, and your specialties..."
                    />
                    {errors.bio && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.bio}</p>}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-accent" /> Location
                      </label>
                      <input 
                        className={`w-full px-4 py-3 rounded-xl border ${errors.location ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all`}
                        value={form.location} 
                        onChange={(e) => setForm({ ...form, location: e.target.value })} 
                        placeholder="City, State"
                      />
                      {errors.location && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.location}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-accent" /> Country
                      </label>
                      <select 
                        className={`w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all`}
                        value={form.country} 
                        onChange={(e) => setForm({ ...form, country: e.target.value, postalCode: '' })}
                      >
                        <option value="UK">United Kingdom</option>
                        <option value="US">United States</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                        <Hash className="w-4 h-4 text-accent" /> Postal Code
                      </label>
                      <input 
                        className={`w-full px-4 py-3 rounded-xl border ${errors.postalCode ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all`}
                        value={form.postalCode} 
                        onChange={(e) => setForm({ ...form, postalCode: e.target.value })} 
                        placeholder={form.country === 'US' ? 'Enter 5-digit zip code' : 'Enter UK postcode'}
                      />
                      <p className="text-xs text-detail mt-1">
                        {form.country === 'US'
                          ? "US zip codes should be 5 digits (e.g., 90210)."
                          : "UK postcodes are alphanumeric (e.g., SW1A 0AA)."}
                      </p>
                      {errors.postalCode && <p className="text-xs text-destructive flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.postalCode}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Services */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Scissors className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-semibold text-primary">Your Services</h2>
                      <p className="text-sm text-detail">Add the braiding services you offer</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {form.services.map((svc, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative p-5 bg-accent/5 rounded-xl border border-accent/20"
                      >
                        {form.services.length > 1 && (
                          <button
                            onClick={() => removeService(i)}
                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center hover:scale-110 transition-transform"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-medium text-primary">Service Name</label>
                            <input 
                              className={`w-full px-3 py-2.5 rounded-lg border ${errors[`service_name_${i}`] ? 'border-destructive' : 'border-border'} bg-background text-sm focus:ring-2 focus:ring-accent`}
                              value={svc.name} 
                              onChange={(e) => { 
                                const s = [...form.services]; 
                                s[i].name = e.target.value; 
                                setForm({ ...form, services: s }); 
                              }} 
                              placeholder="e.g. Box Braids" 
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-xs font-medium text-primary">Price ($)</label>
                            <input 
                              type="number"
                              className={`w-full px-3 py-2.5 rounded-lg border ${errors[`service_price_${i}`] ? 'border-destructive' : 'border-border'} bg-background text-sm focus:ring-2 focus:ring-accent`}
                              value={svc.price} 
                              onChange={(e) => { 
                                const s = [...form.services]; 
                                s[i].price = e.target.value; 
                                setForm({ ...form, services: s }); 
                              }} 
                              placeholder="150" 
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-xs font-medium text-primary">Duration</label>
                            <input 
                              className={`w-full px-3 py-2.5 rounded-lg border ${errors[`service_duration_${i}`] ? 'border-destructive' : 'border-border'} bg-background text-sm focus:ring-2 focus:ring-accent`}
                              value={svc.duration} 
                              onChange={(e) => { 
                                const s = [...form.services]; 
                                s[i].duration = e.target.value; 
                                setForm({ ...form, services: s }); 
                              }} 
                              placeholder="e.g. 4-5 hours" 
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    <button 
                      onClick={addService} 
                      className="text-accent hover:text-accent/80 text-sm font-semibold flex items-center gap-1.5 mt-2"
                    >
                      <Plus className="w-4 h-4" /> Add another service
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Availability */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-semibold text-primary">Availability Schedule</h2>
                      <p className="text-sm text-detail">Set your weekly working hours</p>
                    </div>
                  </div>
                  
                  {errors.availability && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-sm text-destructive flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.availability}
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    {days.map((day) => {
                      const isActive = !!form.availability[day];
                      return (
                        <motion.div 
                          key={day} 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-border hover:border-accent/30 transition-colors"
                        >
                          <label className="flex items-center gap-3 sm:w-36">
                            <input 
                              type="checkbox" 
                              checked={isActive} 
                              onChange={() => {
                                const a = { ...form.availability };
                                if (isActive) delete a[day]; 
                                else a[day] = { start: "09:00", end: "17:00" };
                                setForm({ ...form, availability: a });
                              }} 
                              className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                            />
                            <span className="text-sm font-medium text-primary">{day}</span>
                          </label>
                          
                          {isActive && (
                            <motion.div 
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center gap-3 flex-1"
                            >
                              <input 
                                type="time" 
                                value={form.availability[day]?.start || "09:00"} 
                                onChange={(e) => setForm({ 
                                  ...form, 
                                  availability: { 
                                    ...form.availability, 
                                    [day]: { 
                                      ...form.availability[day], 
                                      start: e.target.value 
                                    } 
                                  } 
                                })} 
                                className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:ring-2 focus:ring-accent"
                              />
                              <span className="text-sm text-detail">to</span>
                              <input 
                                type="time" 
                                value={form.availability[day]?.end || "17:00"} 
                                onChange={(e) => setForm({ 
                                  ...form, 
                                  availability: { 
                                    ...form.availability, 
                                    [day]: { 
                                      ...form.availability[day], 
                                      end: e.target.value 
                                    } 
                                  } 
                                })} 
                                className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:ring-2 focus:ring-accent"
                              />
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Award className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl font-semibold text-primary">Review & Submit</h2>
                      <p className="text-sm text-detail">Please review your application details</p>
                    </div>
                  </div>
                  
                  <div className="bg-accent/5 rounded-xl p-6 border border-accent/20">
                    <h3 className="font-serif font-semibold text-primary mb-4 flex items-center gap-2">
                      <User className="w-4 h-4 text-accent" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                      <div>
                        <p className="text-detail text-xs">Name</p>
                        <p className="font-medium text-primary">{form.name || "—"}</p>
                      </div>
                      <div>
                        <p className="text-detail text-xs">Email</p>
                        <p className="font-medium text-primary">{form.email || "—"}</p>
                      </div>
                      <div>
                        <p className="text-detail text-xs">Phone</p>
                        <p className="font-medium text-primary">{form.phone || "—"}</p>
                      </div>
                      <div>
                        <p className="text-detail text-xs">Experience</p>
                        <p className="font-medium text-primary">{form.experience || "—"} years</p>
                      </div>
                      <div>
                        <p className="text-detail text-xs">Location</p>
                        <p className="font-medium text-primary">{form.location || "—"}</p>
                      </div>
                      <div>
                        <p className="text-detail text-xs">Postal Code</p>
                        <p className="font-medium text-primary">{form.postalCode || "—"}</p>
                      </div>
                    </div>
                    
                    <h3 className="font-serif font-semibold text-primary mb-4 flex items-center gap-2">
                      <Scissors className="w-4 h-4 text-accent" />
                      Services
                    </h3>
                    <div className="space-y-2 mb-6">
                      {form.services.map((svc, i) => (
                        <div key={i} className="flex items-center justify-between text-sm p-2 bg-background rounded-lg">
                          <span className="font-medium text-primary">{svc.name || "—"}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-detail">${svc.price || "0"}</span>
                            <span className="text-detail">{svc.duration || "—"}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <h3 className="font-serif font-semibold text-primary mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      Availability
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(form.availability).map(([day, times]) => (
                        <div key={day} className="flex items-center gap-2 p-2 bg-background rounded-lg">
                          <span className="font-medium text-primary w-20">{day.slice(0,3)}</span>
                          <span className="text-detail">{times.start} - {times.end}</span>
                        </div>
                      ))}
                      {Object.keys(form.availability).length === 0 && (
                        <p className="text-detail">No availability set</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-accent/10 rounded-xl p-4 flex items-start gap-3">
                    <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-detail">
                      By submitting this application, you agree to our Terms of Service and Privacy Policy. 
                      Your application will be reviewed within 48 hours.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <motion.button 
              whileHover={{ x: -5 }}
              onClick={() => setStep(Math.max(0, step - 1))} 
              disabled={step === 0} 
              className="flex items-center gap-2 text-sm font-medium text-detail hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </motion.button>
            
            {step < steps.length - 1 ? (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="bg-accent text-primary font-semibold rounded-xl px-8 py-3 transition-all flex items-center gap-2 text-sm hover:shadow-lg hover:shadow-accent/20"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </motion.button>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit} 
                disabled={isSubmitting} 
                className="btn-cta text-sm disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-xl flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <>Submit Application <ChevronRight className="w-4 h-4" /></>
                )}
              </motion.button>
            )}
          </div>
        </motion.div>
        
        {/* Trust Message */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-detail mt-6 flex items-center justify-center gap-2"
        >
          <Shield className="w-3 h-3 text-accent" />
          Your information is secure and will only be used for your stylist application.
        </motion.p>
      </div>
    </div>
  );
};

export default BecomeStylistPage;