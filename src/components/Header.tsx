import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/braidlink-logo.png";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setProfileOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    return `/${user.role}/dashboard`;
  };

  const shouldShowDashboard = () => {
    if (!user) return false;
    if (user.role === 'customer') return true;
    if (user.role === 'admin') return true;
    
    if (user.role === 'stylist') {
      const appData = localStorage.getItem(`stylist_application_${user.id}`);
      if (!appData) return false;
      try {
        const status = JSON.parse(appData).status;
        return status === 'approved' || status === 'active';
      } catch {
        return false;
      }
    }
    return false;
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Hairstyles", to: "/hairstyles" },
    { label: "Find a Stylist", to: "/find-stylist" },
    { label: "Become a Stylist", to: "/become-stylist" },
    { label: "Pricing", to: "/pricing" },
    { label: "FAQ", to: "/faq" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="BraidLink" className="h-10 w-auto" />
          <div className="flex flex-col">
            <span className="font-brand text-lg text-foreground leading-tight">BraidLink</span>
            <span className="font-tagline text-xs text-muted-foreground leading-tight hidden sm:block">Afro Hair Braiding</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-lg hover:bg-muted/50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <img src={user?.avatar} alt="" className="w-8 h-8 rounded-xl object-cover ring-2 ring-accent/30" />
                <span className="text-sm font-medium">{user?.name?.split(" ")[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-52 bg-card rounded-xl border border-border overflow-hidden"
                    style={{ boxShadow: "var(--shadow-elevated)" }}
                  >
                    <div className="p-3 border-b border-border">
                      <p className="text-sm font-semibold">{user?.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                    </div>
                    {shouldShowDashboard() && (
                      <Link to={getDashboardLink()} onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-3 text-sm hover:bg-muted/50 transition-colors">
                        <User className="w-4 h-4" /> Dashboard
                      </Link>
                    )}
                    <button onClick={handleLogout} className="flex items-center gap-2.5 px-4 py-3 text-sm hover:bg-muted/50 transition-colors w-full text-left text-destructive">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2">Sign In</Link>
              <Link to="/signup" className="btn-cta text-sm px-5 py-2.5">Get Started</Link>
            </>
          )}
        </div>

        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-border/50 bg-card overflow-hidden"
          >
            <div className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors">
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 mt-2 border-t border-border space-y-1">
                {isAuthenticated ? (
                  <>
                    {shouldShowDashboard() && (
                      <Link to={getDashboardLink()} onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 text-sm font-medium hover:bg-muted/50 rounded-lg">Dashboard</Link>
                    )}
                    <button onClick={handleLogout} className="block py-2.5 px-3 text-sm font-medium text-destructive hover:bg-muted/50 rounded-lg w-full text-left">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)} className="block py-2.5 px-3 text-sm font-medium hover:bg-muted/50 rounded-lg">Sign In</Link>
                    <Link to="/signup" onClick={() => setMobileOpen(false)} className="btn-cta text-sm px-4 py-2.5 inline-block mt-2">Get Started</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
