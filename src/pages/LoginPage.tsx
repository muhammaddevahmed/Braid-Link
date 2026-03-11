import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useBooking } from "@/contexts/useBookingHook";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Lock, Eye, EyeOff, LogIn, Sparkles, Shield, 
  ArrowRight, User, Scissors, Crown, CheckCircle, AlertCircle
} from "lucide-react";

const LoginPage = () => {
  const { login } = useAuth();
  const { getRejectedInstantMatchForCustomer } = useBooking();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigateAfterLogin = (user: { role: string; id: string }) => {
    // Check if customer has a rejected instant match
    if (user.role === "customer") {
      const rejectedMatch = getRejectedInstantMatchForCustomer(user.id);
      if (rejectedMatch) {
        navigate("/instant-match-result", { replace: true });
        return;
      }
    }

    const from = location.state?.from?.pathname;
    // If the user was redirected from a page, send them back there after login.
    // The ProtectedRoute will handle authorization, so this is safe.
    if (from && from !== '/login' && from !== '/signup') {
      // Special case: if an approved stylist logs in, always send to plan selection first.
      const appData = localStorage.getItem(`stylist_application_${user.id}`);
      if (user.role === 'stylist' && appData && JSON.parse(appData).status === 'approved') {
        navigate('/stylist/select-plan', { replace: true });
        return;
      }
      navigate(from, { replace: true });
      return;
    }

    if (user.role === 'customer') {
      navigate('/booking');
    } else if (user.role === 'stylist') {
      const appData = localStorage.getItem(`stylist_application_${user.id}`);
      if (appData && JSON.parse(appData).status === 'approved') {
        navigate('/stylist/select-plan');
      } else if (appData && JSON.parse(appData).status === 'active') {
        navigate('/stylist/dashboard');
      } else {
        navigate('/become-stylist');
      }
    } else { // admin
      navigate(`/${user.role}/dashboard`);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        const saved = JSON.parse(localStorage.getItem("braidbook_user") || "{}");
        navigateAfterLogin(saved);
      } else {
        setError("Invalid email or password");
      }
      setIsLoading(false);
    }, 1000);
  };

  const quickLogin = (role: "customer" | "stylist" | "admin") => {
    setIsLoading(true);
    const emails: Record<string, string> = {
      customer: "customer@demo.com",
      stylist: "stylist@demo.com",
      admin: "admin@demo.com",
    };
    
    setTimeout(() => {
      login(emails[role], "123456");
      const saved = JSON.parse(localStorage.getItem("braidbook_user") || "{}");
      navigateAfterLogin(saved);
      setIsLoading(false);
    }, 500);
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-b from-background to-secondary/10">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/5 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute inset-0 opacity-5" 
             style={{ backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-accent/10 backdrop-blur-sm text-accent text-xs font-medium px-5 py-2.5 rounded-full mb-4 border border-accent/30"
          >
            <Sparkles className="w-4 h-4" />
            <span>Welcome Back</span>
          </motion.div>
          
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">Sign In</h1>
          <p className="text-detail font-brand">Access your BraidLink account</p>
        </div>

        {/* Main Login Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl p-6 md:p-8 shadow-2xl border border-border/50"
        >
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Error Message */}
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

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-accent" /> Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent group-focus-within:scale-110 transition-transform" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-primary flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-accent" /> Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent group-focus-within:scale-110 transition-transform" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-detail hover:text-accent transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-primary cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-border text-accent focus:ring-accent" 
                />
                <span>Remember me</span>
              </label>
              <button 
                type="button"
                className="text-sm text-accent hover:text-accent/80 font-semibold hover:underline transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={isLoading}
              className="btn-cta w-full text-sm py-4 rounded-xl flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>Signing In...</>
              ) : (
                <>
                  Sign In <LogIn className="w-4 h-4" />
                </>
              )}
            </motion.button>

            {/* Sign Up Link */}
            <div className="text-center text-sm text-detail font-brand pt-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-accent font-semibold hover:underline inline-flex items-center gap-1">
                Create Account <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </form>
        </motion.div>

        {/* Demo Accounts Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-detail">Demo Access</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            {[
              { 
                role: "customer", 
                email: "customer@demo.com", 
                label: "Customer Demo", 
                icon: User,
                color: "from-blue-500/10 to-blue-500/5"
              },
              { 
                role: "stylist", 
                email: "stylist@demo.com", 
                label: "Stylist Demo", 
                icon: Scissors,
                color: "from-purple-500/10 to-purple-500/5"
              },
              { 
                role: "admin", 
                email: "admin@demo.com", 
                label: "Admin Demo", 
                icon: Crown,
                color: "from-amber-500/10 to-amber-500/5"
              },
            ].map((demo, i) => (
              <motion.div
                key={demo.role}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className={`bg-gradient-to-r ${demo.color} rounded-xl p-4 border border-border/50 hover:border-accent/30 transition-all duration-300 hover:shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <demo.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-primary">{demo.label}</p>
                      <p className="text-xs text-detail flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {demo.email}
                        <span className="mx-1">•</span>
                        <Lock className="w-3 h-3" /> 123456
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => quickLogin(demo.role as "customer" | "stylist" | "admin")}
                    disabled={isLoading}
                    className="btn-cta text-xs px-4 py-2 rounded-lg flex items-center gap-1 whitespace-nowrap"
                  >
                    Quick Login
                    <ArrowRight className="w-3 h-3" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Demo Info Note */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4 text-center"
          >
            <p className="text-xs text-detail flex items-center justify-center gap-1">
              <CheckCircle className="w-3 h-3 text-accent" />
              Use these demo accounts to explore the platform
            </p>
          </motion.div>
        </motion.div>

        {/* Trust Badge */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <div className="inline-flex items-center gap-2 text-xs text-detail bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
            <Shield className="w-3 h-3 text-accent" />
            <span>Secure login • 256-bit encryption</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;