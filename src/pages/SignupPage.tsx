import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Lock, Eye, EyeOff, User, Phone, User as UserIcon,
  Sparkles, Shield, CheckCircle, AlertCircle, Camera, ArrowRight,
  Crown, Scissors, Calendar, Star, MapPin, Hash,
  BadgeCheck, Zap, Heart, Globe, Clock, Award
} from "lucide-react";
import { toast } from "sonner";

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "customer" as "customer" | "stylist",
    profileImage: null as File | null,
    city: "",
    country: "UK" as "UK" | "USA",
    postalCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_SIZE_MB = 2;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_SIZE_BYTES) {
        toast.error(`Image size cannot exceed ${MAX_SIZE_MB}MB.`);
        e.target.value = ""; // Clear the file input
        return;
      }
      setForm({ ...form, profileImage: file });
    }
  };

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[@$!%*?&]/.test(password)) strength += 10;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setForm({ ...form, password: newPassword });
    checkPasswordStrength(newPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!/^[a-zA-Z\s]+$/.test(form.name)) {
      setError("Name can only contain letters and spaces.");
      setIsLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Invalid email format.");
      setIsLoading(false);
      return;
    }

    if (!/^\+?([0-9]{1,3})\)?[-. ]?([0-9]{10})$/.test(form.phone)) {
      setError("Invalid phone number format.");
      setIsLoading(false);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }
    
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(form.password)) {
      setError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      setIsLoading(false);
      return;
    }

    let profileImageBase64 = "";
    if (form.profileImage) {
      try {
        profileImageBase64 = await fileToBase64(form.profileImage);
      } catch (error) {
        setError("Failed to process profile image.");
        setIsLoading(false);
        return;
      }
    }

    // Parse city and country from form fields
    const city = form.role === "customer" ? form.city : "";
    const country = form.country;
    
    if (form.role === "customer") {
      // Validate postal code based on country
      if (form.country === "USA") {
        if (!/^\d{5}$/.test(form.postalCode)) {
          setError("Please enter a valid 5-digit US zip code.");
          setIsLoading(false);
          return;
        }
      } else {
        if (!/^[A-Z]{1,2}[0-9R][0-9A-Z]? ?[0-9][A-Z]{2}$/i.test(form.postalCode)) {
          setError("Please enter a valid UK postcode.");
          setIsLoading(false);
          return;
        }
      }
    }

    // Simulate API call
    setTimeout(() => {
      const success = signup({
        name: form.name,
        email: form.email,
        phone: form.phone,
        role: form.role,
        profileImage: profileImageBase64,
        city,
        country,
      });

      if (success) {
        toast.success("Account created successfully!");
        if (form.role === "customer") {
          navigate('/booking');
        } else {
          navigate('/become-stylist');
        }
      } else {
        setError("An account with this email already exists.");
      }
      setIsLoading(false);
    }, 1000);
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return "bg-destructive";
    if (passwordStrength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 50) return "Weak password";
    if (passwordStrength < 75) return "Medium password";
    return "Strong password";
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-16 px-4 bg-gradient-to-b from-background to-secondary/10">
      {/* Animated Background - Refined */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] animate-pulse delay-1000" />
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header - Premium redesign */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring" }}
            className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm text-accent text-xs font-medium px-5 py-2.5 rounded-full mb-4 border border-accent/20 shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            <span>Join BraidLink Today</span>
          </motion.div>
          
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">Create Account</h1>
          <p className="text-muted-foreground">Start your journey with us</p>
        </div>

        {/* Main Card - Premium redesign */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-3xl p-6 md:p-8 shadow-2xl border border-border/50"
        >
          {/* Role Selection Cards - Premium redesign */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <label className="text-sm font-medium mb-4 flex text-primary items-center gap-2">
              <div className="w-5 h-5 rounded-lg bg-accent/10 flex items-center justify-center">
                <User className="w-3 h-3 text-accent" />
              </div>
              I want to join as
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "customer", label: "Customer", icon: Star, desc: "Book appointments", badge: "Find stylists" },
                { value: "stylist", label: "Hair Stylist", icon: Scissors, desc: "Offer services", badge: "Grow business" }
              ].map((role, i) => (
                <motion.button
                  key={role.value}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  type="button"
                  onClick={() => setForm({ ...form, role: role.value as "customer" | "stylist" })}
                  className={`relative p-5 rounded-xl border-2 transition-all duration-300 ${
                    form.role === role.value 
                      ? "border-accent bg-accent/5 shadow-xl scale-[1.02]" 
                      : "border-border hover:border-accent/30 hover:bg-accent/5 hover:shadow-lg"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-3 transition-all ${
                      form.role === role.value 
                        ? "bg-accent shadow-lg" 
                        : "bg-gradient-to-br from-accent/10 to-accent/5"
                    }`}>
                      <role.icon className={`w-6 h-6 ${
                        form.role === role.value ? "text-primary" : "text-accent"
                      }`} />
                    </div>
                    <span className="text-sm font-semibold text-primary">{role.label}</span>
                    <span className="text-xs text-muted-foreground mt-1">{role.desc}</span>
                    <span className="text-[10px] text-accent mt-2 bg-accent/10 px-2 py-1 rounded-full">
                      {role.badge}
                    </span>
                  </div>
                  {form.role === role.value && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message - Premium */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-3 flex items-start gap-2 border border-destructive/20"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-accent/10 flex items-center justify-center">
                  <User className="w-3 h-3 text-accent" />
                </div>
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent/70 group-focus-within:text-accent transition-colors" />
                <input 
                  type="text" 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })} 
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50" 
                  placeholder="Enter your full name" 
                  required 
                />
              </div>
            </div>

            {/* Profile Image - Premium redesign */}
            {(form.role === "customer" || form.role === "stylist") && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-accent/10 flex items-center justify-center">
                    <Camera className="w-3 h-3 text-accent" />
                  </div>
                  {form.role === "stylist" ? "Professional Photo" : "Profile Image"}
                </label>
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center overflow-hidden border-2 border-border group-hover:border-accent transition-colors shadow-md">
                      {form.profileImage ? (
                        <img 
                          src={URL.createObjectURL(form.profileImage)} 
                          alt="Profile Preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <UserIcon className="w-10 h-10 text-accent/30" />
                      )}
                    </div>
                    <label 
                      htmlFor="profile-image-upload" 
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-accent flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg hover:shadow-accent/25"
                    >
                      <Camera className="w-4 h-4 text-primary" />
                    </label>
                    <input id="profile-image-upload" type="file" accept="image/*" className="hidden" onChange={handleProfileImageChange} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">
                      Upload {form.role === "stylist" ? "a professional photo" : "a profile picture"} {form.role === "stylist" ? "(required)" : "(optional)"}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <BadgeCheck className="w-3 h-3 text-accent" />
                      <p className="text-xs text-muted-foreground">PNG or JPG, max 2MB</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* City & Country - Premium redesign */}
            {form.role === "customer" && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Country Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded bg-accent/10 flex items-center justify-center">
                      <Globe className="w-3 h-3 text-accent" />
                    </div>
                    Country
                  </label>
                  <select 
                    value={form.country} 
                    onChange={(e) => setForm({ ...form, country: e.target.value as "UK" | "USA", postalCode: "" })} 
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all appearance-none cursor-pointer"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23b87a5d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundSize: '1rem', backgroundRepeat: 'no-repeat' }}
                    required
                  >
                    <option value="UK">United Kingdom</option>
                    <option value="USA">United States</option>
                  </select>
                </div>

                {/* Postal Code */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded bg-accent/10 flex items-center justify-center">
                      <Hash className="w-3 h-3 text-accent" />
                    </div>
                    Postal Code
                  </label>
                  <input 
                    type="text" 
                    value={form.postalCode} 
                    onChange={(e) => setForm({ ...form, postalCode: e.target.value })} 
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50" 
                    placeholder={form.country === "USA" ? "Enter 5-digit zip code (e.g., 90210)" : "Enter UK postcode (e.g., SW1A 0AA)"} 
                    required 
                  />
                  <p className="text-xs text-muted-foreground">
                    {form.country === "USA" 
                      ? "US zip codes should be 5 digits (e.g., 90210)." 
                      : "UK postcodes are alphanumeric (e.g., SW1A 0AA)."}
                  </p>
                </div>

                {/* City */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded bg-accent/10 flex items-center justify-center">
                      <MapPin className="w-3 h-3 text-accent" />
                    </div>
                    City
                  </label>
                  <input 
                    type="text" 
                    value={form.city} 
                    onChange={(e) => setForm({ ...form, city: e.target.value })} 
                    className="w-full px-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50" 
                    placeholder="Enter your city" 
                    required 
                  />
                </div>
              </motion.div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-accent/10 flex items-center justify-center">
                  <Mail className="w-3 h-3 text-accent" />
                </div>
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent/70 group-focus-within:text-accent transition-colors" />
                <input 
                  type="email" 
                  value={form.email} 
                  onChange={(e) => setForm({ ...form, email: e.target.value })} 
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50" 
                  placeholder="your@email.com" 
                  required 
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-accent/10 flex items-center justify-center">
                  <Phone className="w-3 h-3 text-accent" />
                </div>
                Phone Number
              </label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent/70 group-focus-within:text-accent transition-colors" />
                <input 
                  type="tel" 
                  value={form.phone} 
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all placeholder:text-muted-foreground/50" 
                  placeholder="(555) 123-4567" 
                  required 
                />
              </div>
            </div>

            {/* Password - Premium redesign */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-accent/10 flex items-center justify-center">
                  <Lock className="w-3 h-3 text-accent" />
                </div>
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent/70 group-focus-within:text-accent transition-colors" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={form.password} 
                  onChange={handlePasswordChange} 
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" 
                  placeholder="••••••••" 
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Password Strength Indicator - Premium */}
              {form.password && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 space-y-2"
                >
                  <div className="flex gap-1 h-1.5">
                    {[1, 2, 3, 4].map((segment) => (
                      <div 
                        key={segment} 
                        className={`flex-1 rounded-full transition-all duration-300 ${
                          passwordStrength >= segment * 25 
                            ? getPasswordStrengthColor() 
                            : 'bg-muted'
                        }`} 
                      />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {getPasswordStrengthText()}
                    </p>
                    {passwordStrength >= 75 && (
                      <BadgeCheck className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${form.password.length >= 8 ? 'bg-green-500' : 'bg-muted'}`} />
                      8+ chars
                    </span>
                    <span className="flex items-center gap-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${/[a-z]/.test(form.password) ? 'bg-green-500' : 'bg-muted'}`} />
                      lowercase
                    </span>
                    <span className="flex items-center gap-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(form.password) ? 'bg-green-500' : 'bg-muted'}`} />
                      uppercase
                    </span>
                    <span className="flex items-center gap-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(form.password) ? 'bg-green-500' : 'bg-muted'}`} />
                      number
                    </span>
                    <span className="flex items-center gap-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${/[@$!%*?&]/.test(form.password) ? 'bg-green-500' : 'bg-muted'}`} />
                      special
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-accent/10 flex items-center justify-center">
                  <Lock className="w-3 h-3 text-accent" />
                </div>
                Confirm Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent/70 group-focus-within:text-accent transition-colors" />
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  value={form.confirmPassword} 
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} 
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all" 
                  placeholder="••••••••" 
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-destructive flex items-center gap-1 mt-1"
                >
                  <AlertCircle className="w-3 h-3" /> Passwords don't match
                </motion.p>
              )}
              {form.confirmPassword && form.password === form.confirmPassword && form.password && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-green-500 flex items-center gap-1 mt-1"
                >
                  <CheckCircle className="w-3 h-3" /> Passwords match
                </motion.p>
              )}
            </div>

            {/* Submit Button - Premium */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={isLoading}
              className="w-full bg-accent text-primary font-semibold text-sm py-4 rounded-xl flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-accent/25 group"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>

            {/* Terms - Premium */}
            <p className="text-xs text-center text-muted-foreground mt-4">
              By creating an account, you agree to our{" "}
              <Link to="/terms" className="text-accent hover:underline font-medium">Terms of Service</Link>{" "}
              and{" "}
              <Link to="/privacy-policy" className="text-accent hover:underline font-medium">Privacy Policy</Link>
            </p>
          </form>

          {/* Divider - Premium */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-4 text-muted-foreground">Already have an account?</span>
            </div>
          </div>

          {/* Login Link - Premium */}
          <div className="text-center">
            <Link 
              to="/login" 
              className="text-accent font-semibold text-sm hover:text-accent/80 inline-flex items-center gap-1 group"
            >
              Sign In <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Trust Badge - Premium redesign */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50 shadow-sm">
            <Shield className="w-3 h-3 text-accent" />
            <span>Your information is secure and encrypted</span>
            <Zap className="w-3 h-3 text-accent" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPage;