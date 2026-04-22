import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, ChevronRight, ChevronLeft, LogIn, Shield, X, 
  CreditCard, Clock, User, Mail, Phone, MapPin, Award,
  Scissors, Calendar, Star, Sparkles, AlertCircle, Info,
  Briefcase, Hash, FileText, Plus, Trash2, CheckCircle, Camera, HelpCircle,
  Globe, Clock3, BadgeCheck, Layers
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { subscriptionPlans } from "@/data/demo-data";
import { toast } from "sonner";

const steps = ["Personal Details", "Availability", "Review"];

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
    reasonForApplying: "",
    identityProof: null as File | null,

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
      if (!form.reasonForApplying.trim()) {
        newErrors.reasonForApplying = "Please tell us why you are applying.";
      }
      if (!form.identityProof) {
        newErrors.identityProof = "Proof of identity is required for verification.";
      }
    }
    
    if (stepIndex === 1) {
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

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

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
      let identityProofBase64 = "";
      if (form.identityProof) {
        try {
          identityProofBase64 = await fileToBase64(form.identityProof);
        } catch (error) {
          toast.error("Failed to process identity proof image.");
          setIsSubmitting(false);
          return;
        }
      }

      const applicationData = {
        ...form,
        identityProof: identityProofBase64,
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



  if (!isAuthenticated) {
    return (
      <div className="py-20 bg-gradient-to-b from-background to-secondary/10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center max-w-md">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="bg-card rounded-3xl p-8 md:p-10 border border-border/50 shadow-2xl"
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto mb-6">
              <LogIn className="w-10 h-10 text-accent" />
            </div>
            <h2 className="font-serif text-2xl font-bold mb-3 text-primary">Authentication Required</h2>
            <p className="text-muted-foreground mb-8">Please log in as a stylist to apply for a stylist account.</p>
            <Link to="/login" className="bg-accent text-primary font-semibold w-full block text-center py-4 rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-accent/25 text-base">
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
            transition={{ type: "spring", duration: 0.6 }}
            className="bg-card rounded-3xl p-8 md:p-10 border border-border/50 shadow-2xl"
          >
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-destructive/10 to-destructive/5 flex items-center justify-center mx-auto mb-6">
              <X className="w-10 h-10 text-destructive" />
            </div>
            <h2 className="font-serif text-2xl font-bold mb-3 text-primary">Stylist Account Required</h2>
            <p className="text-muted-foreground mb-8">You are currently logged in as a Customer. To become a stylist, you must create a separate Stylist account.</p>
            <button 
              onClick={() => { 
                localStorage.removeItem("braidbook_user"); 
                window.location.href = "/signup"; 
              }} 
              className="bg-accent text-primary font-semibold w-full block text-center py-4 rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-accent/25 text-base"
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
            transition={{ type: "spring", duration: 0.6 }}
          >
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mx-auto">
                <Clock className="w-12 h-12 text-accent" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -top-2 -right-2 w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-xl"
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
            </div>
            <h1 className="font-serif text-3xl font-bold mb-3 text-primary">Application Pending</h1>
            <p className="text-muted-foreground mb-8 text-lg">Your application is under review. This usually takes up to 48 hours. We'll notify you by email once it's approved.</p>
            <Link to="/" className="bg-accent text-primary font-semibold inline-flex items-center gap-2 px-8 py-4 rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-accent/25">
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
            transition={{ type: "spring", duration: 0.6 }}
          >
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-green-500/10 to-green-500/5 flex items-center justify-center mx-auto">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
            </div>
            <h1 className="font-serif text-3xl font-bold mb-3 text-primary">Application Approved!</h1>
            <p className="text-muted-foreground mb-8 text-lg">Congratulations! Your stylist profile is approved. Please log out and log back in to access your stylist dashboard.</p>
            <button onClick={() => {
              window.location.href = "/stylist/select-plan";
            }} className="bg-accent text-primary font-semibold inline-flex items-center gap-2 px-8 py-4 rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-accent/25 group">
              Select Plan & Start <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
            transition={{ type: "spring", duration: 0.6 }}
          >
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-green-500/10 to-green-500/5 flex items-center justify-center mx-auto">
                <Shield className="w-12 h-12 text-green-500" />
              </div>
            </div>
            <h1 className="font-serif text-3xl font-bold mb-3 text-primary">Account Active</h1>
            <p className="text-muted-foreground mb-8 text-lg">Your stylist account is fully active and ready to go.</p>
            <Link to="/stylist/dashboard" className="bg-accent text-primary font-semibold w-full block text-center py-4 rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-accent/25 text-base">
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
            transition={{ type: "spring", duration: 0.6 }}
          >
            <div className="relative mb-8">
              <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-green-500/10 to-green-500/5 flex items-center justify-center mx-auto">
                <Check className="w-12 h-12 text-green-500" />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -top-2 -right-2 w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-xl"
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
            </div>
            <h1 className="font-serif text-3xl font-bold mb-3 text-primary">Application Submitted!</h1>
            <p className="text-muted-foreground mb-8 text-lg">Thank you for applying. We'll review your application within 48 hours and notify you by email.</p>
            <button 
              onClick={() => navigate("/")} 
              className="bg-accent text-primary font-semibold inline-flex items-center gap-2 px-8 py-4 rounded-xl hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-accent/25 group"
            >
              Back to Home <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-20 bg-gradient-to-b from-background to-secondary/10 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header - Premium redesign */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm text-accent text-xs font-medium px-5 py-2.5 rounded-full mb-6 border border-accent/20 shadow-lg">
            <Award className="w-4 h-4" />
            <span>Join Our Network</span>
            <span className="w-1 h-1 rounded-full bg-accent/50" />
            <span>Step {step + 1} of {steps.length}</span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
            Become a Stylist
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join our network of talented braiding professionals and grow your business
          </p>
        </motion.div>

        {/* Progress Bar - Premium redesign */}
        <div className="relative mb-12">
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-2 rounded-full bg-gradient-to-r from-accent to-accent/80"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          
          {/* Step Indicators - Premium */}
          <div className="flex justify-between mt-4 px-2">
            {steps.map((title, index) => (
              <div key={index} className="text-center">
                <div className={`text-xs font-medium transition-colors ${
                  index <= step ? 'text-accent' : 'text-muted-foreground'
                }`}>
                  Step {index + 1}
                </div>
                <div className={`hidden sm:block text-sm font-medium mt-1 transition-colors ${
                  index <= step ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {title}
                </div>
                <div className={`w-2 h-2 rounded-full mt-2 mx-auto transition-all ${
                  index < step ? 'bg-accent' : 
                  index === step ? 'bg-accent ring-4 ring-accent/20 animate-pulse' : 
                  'bg-muted'
                }`} />
              </div>
            ))}
          </div>
        </div>

        {/* Main Form Card - Premium redesign */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-card rounded-3xl p-6 md:p-8 lg:p-10 border border-border/50 shadow-2xl hover:shadow-3xl transition-shadow"
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={step} 
              initial={{ opacity: 0, x: 30 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -30 }} 
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            >
              {/* Step 0: Personal Details - Premium redesign */}
              {step === 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                      <User className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl md:text-2xl font-semibold text-primary">Personal Details</h2>
                      <p className="text-sm text-muted-foreground">Tell us about yourself</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                        <User className="w-4 h-4 text-accent" /> Full Name
                      </label>
                      <input 
                        className={`w-full px-4 py-3.5 rounded-xl border ${errors.name ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50`}
                        value={form.name} 
                        onChange={(e) => setForm({ ...form, name: e.target.value })} 
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-xs text-destructive flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.name}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                        <Mail className="w-4 h-4 text-accent" /> Email
                      </label>
                      <input 
                        type="email"
                        className={`w-full px-4 py-3.5 rounded-xl border ${errors.email ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50`}
                        value={form.email} 
                        onChange={(e) => setForm({ ...form, email: e.target.value })} 
                        placeholder="your@email.com"
                      />
                      {errors.email && <p className="text-xs text-destructive flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                        <Phone className="w-4 h-4 text-accent" /> Phone
                      </label>
                      <input 
                        className={`w-full px-4 py-3.5 rounded-xl border ${errors.phone ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50`}
                        value={form.phone} 
                        onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && <p className="text-xs text-destructive flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.phone}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                        <Briefcase className="w-4 h-4 text-accent" /> Experience Level
                      </label>
                      <select 
                        className={`w-full px-4 py-3.5 rounded-xl border ${errors.experience ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all appearance-none cursor-pointer`}
                        value={form.experience} 
                        onChange={(e) => setForm({ ...form, experience: e.target.value })}
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23b87a5d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundSize: '1rem', backgroundRepeat: 'no-repeat' }}
                      >
                        <option value="">Select experience level</option>
                        <option value="beginner">Beginner (Just Starting)</option>
                        <option value="1-2">1-2 Years</option>
                        <option value="3-5">3-5 Years</option>
                        <option value="5-10">5-10 Years</option>
                        <option value="10+">10+ Years</option>
                      </select>
                      {errors.experience && <p className="text-xs text-destructive flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.experience}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-accent" /> Bio
                    </label>
                    <textarea 
                      className={`w-full px-4 py-3.5 rounded-xl border ${errors.bio ? 'border-destructive' : 'border-border'} bg-background text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50`}
                      value={form.bio} 
                      onChange={(e) => setForm({ ...form, bio: e.target.value })} 
                      placeholder="Tell potential clients about yourself, your experience, and your specialties..."
                    />
                    {errors.bio && <p className="text-xs text-destructive flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.bio}</p>}
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-accent" /> Why are you applying and why are you the best fit?
                    </label>
                    <textarea 
                      className={`w-full px-4 py-3.5 rounded-xl border ${errors.reasonForApplying ? 'border-destructive' : 'border-border'} bg-background text-sm h-32 resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50`}
                      value={form.reasonForApplying} 
                      onChange={(e) => setForm({ ...form, reasonForApplying: e.target.value })} 
                      placeholder="Tell us what makes you stand out..."
                    />
                    {errors.reasonForApplying && <p className="text-xs text-destructive flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.reasonForApplying}</p>}
                  </div>
                  
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-accent" /> Proof of Identity (Passport, Driving Licence, etc.)
                    </label>
                    <input 
                      type="file"
                      accept="image/png, image/jpeg, image/webp"
                      onChange={(e) => setForm({ ...form, identityProof: e.target.files ? e.target.files[0] : null })}
                      className={`w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent/10 file:text-accent hover:file:bg-accent/20
                        ${errors.identityProof ? 'border-destructive' : 'border-border'}`
                      }
                    />
                    {form.identityProof && <p className="text-xs text-green-600 flex items-center gap-1 mt-1"><CheckCircle className="w-3 h-3" /> {form.identityProof.name}</p>}
                    {errors.identityProof && <p className="text-xs text-destructive flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.identityProof}</p>}
                    <p className="text-xs text-muted-foreground mt-1">
                      This is required for verification and will not be shown on your public profile.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-accent" /> Location
                      </label>
                      <input 
                        className={`w-full px-4 py-3.5 rounded-xl border ${errors.location ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50`}
                        value={form.location} 
                        onChange={(e) => setForm({ ...form, location: e.target.value })} 
                        placeholder="City, State"
                      />
                      {errors.location && <p className="text-xs text-destructive flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.location}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                        <Globe className="w-4 h-4 text-accent" /> Country
                      </label>
                      <select 
                        className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all appearance-none cursor-pointer"
                        value={form.country} 
                        onChange={(e) => setForm({ ...form, country: e.target.value, postalCode: '' })}
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23b87a5d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundSize: '1rem', backgroundRepeat: 'no-repeat' }}
                      >
                        <option value="UK">United Kingdom</option>
                        <option value="US">United States</option>
                      </select>
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                        <Hash className="w-4 h-4 text-accent" /> Postal Code
                      </label>
                      <input 
                        className={`w-full px-4 py-3.5 rounded-xl border ${errors.postalCode ? 'border-destructive' : 'border-border'} bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50`}
                        value={form.postalCode} 
                        onChange={(e) => setForm({ ...form, postalCode: e.target.value })} 
                        placeholder={form.country === 'US' ? 'Enter 5-digit zip code' : 'Enter UK postcode'}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {form.country === 'US'
                          ? "US zip codes should be 5 digits (e.g., 90210)."
                          : "UK postcodes are alphanumeric (e.g., SW1A 0AA)."}
                      </p>
                      {errors.postalCode && <p className="text-xs text-destructive flex items-center gap-1 mt-1"><AlertCircle className="w-3 h-3" /> {errors.postalCode}</p>}
                    </div>
                  </div>
                </div>
              )}



              {/* Step 1: Availability - Premium redesign */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl md:text-2xl font-semibold text-primary">Availability Schedule</h2>
                      <p className="text-sm text-muted-foreground">Set your weekly working hours</p>
                    </div>
                  </div>
                  
                  {errors.availability && (
                    <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-sm text-destructive flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errors.availability}
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    {days.map((day) => {
                      const isActive = !!form.availability[day];
                      return (
                        <motion.div 
                          key={day} 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border transition-all ${
                            isActive 
                              ? 'border-accent/30 bg-accent/5' 
                              : 'border-border hover:border-accent/20 hover:bg-accent/2'
                          }`}
                        >
                          <label className="flex items-center gap-3 sm:w-40">
                            <input 
                              type="checkbox" 
                              checked={isActive} 
                              onChange={() => {
                                const a = { ...form.availability };
                                if (isActive) delete a[day]; 
                                else a[day] = { start: "09:00", end: "17:00" };
                                setForm({ ...form, availability: a });
                              }} 
                              className="w-4 h-4 rounded border-border text-accent focus:ring-accent/20 focus:ring-2"
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
                                className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                              />
                              <span className="text-sm text-muted-foreground">to</span>
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
                                className="px-3 py-2 rounded-lg border border-border bg-background text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                              />
                            </motion.div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Review - Premium redesign */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                      <Award className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h2 className="font-serif text-xl md:text-2xl font-semibold text-primary">Review & Submit</h2>
                      <p className="text-sm text-muted-foreground">Please review your application details</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl p-6 border border-accent/20">
                    <h3 className="font-serif font-semibold text-primary mb-4 flex items-center gap-2">
                      <User className="w-4 h-4 text-accent" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                      <div className="p-3 bg-background rounded-lg">
                        <p className="text-muted-foreground text-xs mb-1">Name</p>
                        <p className="font-medium text-primary">{form.name || "—"}</p>
                      </div>
                      <div className="p-3 bg-background rounded-lg">
                        <p className="text-muted-foreground text-xs mb-1">Email</p>
                        <p className="font-medium text-primary">{form.email || "—"}</p>
                      </div>
                      <div className="p-3 bg-background rounded-lg">
                        <p className="text-muted-foreground text-xs mb-1">Phone</p>
                        <p className="font-medium text-primary">{form.phone || "—"}</p>
                      </div>
                      <div className="p-3 bg-background rounded-lg">
                        <p className="text-muted-foreground text-xs mb-1">Experience</p>
                        <p className="font-medium text-primary">{form.experience || "—"} years</p>
                      </div>
                      <div className="p-3 bg-background rounded-lg">
                        <p className="text-muted-foreground text-xs mb-1">Location</p>
                        <p className="font-medium text-primary">{form.location || "—"}</p>
                      </div>
                      <div className="p-3 bg-background rounded-lg">
                        <p className="text-muted-foreground text-xs mb-1">Postal Code</p>
                        <p className="font-medium text-primary">{form.postalCode || "—"}</p>
                      </div>
                    </div>
                    <div className="p-3 bg-background rounded-lg col-span-2">
                      <p className="text-muted-foreground text-xs mb-1">Reason for Applying</p>
                      <p className="font-medium text-primary">{form.reasonForApplying || "—"}</p>
                    </div>
                    <div className="p-3 bg-background rounded-lg col-span-2">
                      <p className="text-muted-foreground text-xs mb-1">Proof of Identity</p>
                      {form.identityProof ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <p className="font-medium text-primary">{form.identityProof.name}</p>
                        </div>
                      ) : <p className="font-medium text-destructive">Not provided</p>}
                    </div>

                    

                    
                    <h3 className="font-serif font-semibold text-primary mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      Availability
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(form.availability).map(([day, times]) => (
                        <div key={day} className="flex items-center gap-2 p-3 bg-background rounded-lg border border-border/50">
                          <span className="font-medium text-primary w-16">{day.slice(0,3)}</span>
                          <span className="text-muted-foreground">{times.start} - {times.end}</span>
                        </div>
                      ))}
                      {Object.keys(form.availability).length === 0 && (
                        <p className="text-muted-foreground col-span-2 text-center py-4">No availability set</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-accent/10 rounded-xl p-5 flex items-start gap-3 border border-accent/20">
                    <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                      By submitting this application, you agree to our Terms of Service and Privacy Policy. 
                      Your application will be reviewed within 48 hours.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons - Premium redesign */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border/50">
            <motion.button 
              whileHover={{ x: -5 }}
              onClick={() => setStep(Math.max(0, step - 1))} 
              disabled={step === 0} 
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back
            </motion.button>
            
            {step < steps.length - 1 ? (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="bg-accent text-primary font-semibold rounded-xl px-8 py-3.5 transition-all flex items-center gap-2 text-sm hover:shadow-lg hover:shadow-accent/25 group"
              >
                Continue <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            ) : (
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit} 
                disabled={isSubmitting} 
                className="bg-accent text-primary font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3.5 rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-accent/25 group"
              >
                {isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <>Submit Application <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                )}
              </motion.button>
            )}
          </div>
        </motion.div>
        
        {/* Trust Message - Premium redesign */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-muted-foreground mt-8 flex items-center justify-center gap-2"
        >
          <Shield className="w-3 h-3 text-accent" />
          Your information is secure and will only be used for your stylist application.
        </motion.p>
      </div>
    </div>
  );
};

export default BecomeStylistPage;