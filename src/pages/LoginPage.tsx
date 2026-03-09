import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigateAfterLogin = (user: { role: string; id: string }) => {
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

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const success = login(email, password);
    if (success) {
      const saved = JSON.parse(localStorage.getItem("braidbook_user") || "{}");
      navigateAfterLogin(saved);
    } else {
      setError("Invalid email or password");
    }
  };

  const quickLogin = (role: "customer" | "stylist" | "admin") => {
    const emails: Record<string, string> = {
      customer: "customer@demo.com",
      stylist: "stylist@demo.com",
      admin: "admin@demo.com",
    };
    login(emails[role], "123456");
    const saved = JSON.parse(localStorage.getItem("braidbook_user") || "{}");
    navigateAfterLogin(saved);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-primary">Welcome Back</h1>
          <p className="text-detail mt-2 font-brand">Sign in to your BraidLink account</p>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-detail/20">
          <form onSubmit={handleLogin} className="space-y-4">
            {error && <div className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</div>}
            <div>
              <label className="text-sm font-medium mb-1.5 block text-primary">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block text-primary">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-detail/20 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="••••••"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPassword ? <EyeOff className="w-4 h-4 text-detail" /> : <Eye className="w-4 h-4 text-detail" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-primary">
                <input type="checkbox" className="rounded border-detail/20" /> Remember me
              </label>
              <span className="text-sm text-accent cursor-pointer hover:underline font-semibold">Forgot password?</span>
            </div>
            <button type="submit" className="btn-cta w-full text-sm">Sign In</button>
          </form>

          <div className="mt-4 text-center text-sm text-detail font-brand">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-accent font-semibold hover:underline">Sign Up</Link>
          </div>
        </div>

        {/* Demo Accounts */}
        <div className="mt-6 bg-card rounded-xl p-6 shadow-sm border border-detail/20">
          <h3 className="font-serif font-semibold text-center mb-4 text-primary">Demo Login Accounts</h3>
          <div className="space-y-3">
            {[
              { role: "customer" as const, email: "customer@demo.com", label: "Customer Demo" },
              { role: "stylist" as const, email: "stylist@demo.com", label: "Stylist Demo" },
              { role: "admin" as const, email: "admin@demo.com", label: "Admin Demo" },
            ].map((demo) => (
              <div key={demo.role} className="flex items-center justify-between bg-accent/10 rounded-lg px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-primary">{demo.label}</p>
                  <p className="text-xs text-detail">{demo.email} / 123456</p>
                </div>
                <button
                  onClick={() => quickLogin(demo.role)}
                  className="btn-cta text-xs px-3 py-1.5"
                >
                  Login as {demo.role.charAt(0).toUpperCase() + demo.role.slice(1)}
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
