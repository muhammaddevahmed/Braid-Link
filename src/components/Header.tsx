import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Menu, X, User, LogOut, ChevronDown, Zap, Sparkles, 
  Home, Scissors, Search, Users, CreditCard, HelpCircle, 
  Mail, LayoutDashboard, Heart, Shield, Crown
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/braidlink-logo.png";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setProfileOpen(false);
    setMobileOpen(false);
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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const navLinks = [
    { label: "Home", to: "/", icon: Home },
    { label: "Hairstyles", to: "/hairstyles", icon: Scissors },
    { label: "Find a Stylist", to: "/find-stylist", icon: Search },
    { label: "Become a Stylist", to: "/become-stylist", icon: Users },
    { label: "Pricing", to: "/pricing", icon: CreditCard },
    { label: "FAQ", to: "/faq", icon: HelpCircle },
    { label: "Contact", to: "/contact", icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg" 
          : "bg-background/80 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group mr-8">
          <motion.div
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="relative"
          >
            <img src={logo} alt="BraidLink" className="h-12 w-auto drop-shadow-md" />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0, 0.5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute inset-0 bg-accent/20 rounded-full blur-xl -z-10"
            />
          </motion.div>
          <div className="flex flex-col">
            <span className="font-brand text-xl text-primary font-bold leading-tight tracking-wide group-hover:text-accent transition-colors">
              BraidLink
            </span>
            <span className="font-tagline text-xs text-detail leading-tight tracking-wider hidden sm:block">
              Afro Hair Braiding
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm font-medium transition-all px-4 py-2.5 rounded-xl flex items-center gap-2 group ${
                  isActive(link.to)
                    ? "text-accent bg-accent/10"
                    : "text-detail hover:text-primary hover:bg-accent/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive(link.to) ? 'text-accent' : 'text-detail group-hover:text-primary'}`} />
                {link.label}
                {isActive(link.to) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-xl hover:bg-accent/5 transition-all border border-transparent hover:border-accent/20"
              >
                <div className="relative">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-9 h-9 rounded-xl object-cover ring-2 ring-accent/30 group-hover:ring-accent/50 transition-all"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center ring-2 ring-accent/30">
                      <span className="text-sm font-bold text-accent">
                        {getInitials(user?.name || 'User')}
                      </span>
                    </div>
                  )}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"
                  />
                </div>
                <div className="text-left">
                  <span className="text-sm font-semibold text-primary block">
                    {user?.name?.split(" ")[0]}
                  </span>
                  <span className="text-xs text-detail capitalize flex items-center gap-1">
                    <Shield className="w-3 h-3 text-accent" />
                    {user?.role}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-detail transition-transform duration-300 ${profileOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-card rounded-2xl border border-border/50 shadow-2xl overflow-hidden"
                  >
                    {/* Profile Header */}
                    <div className="p-4 bg-gradient-to-r from-accent/10 to-accent/5 border-b border-border">
                      <p className="text-sm font-semibold text-primary">{user?.name}</p>
                      <p className="text-xs text-detail flex items-center gap-1 mt-1">
                        <Mail className="w-3 h-3" /> {user?.email}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      {shouldShowDashboard() && (
                        <Link 
                          to={getDashboardLink()} 
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-accent/5 rounded-xl transition-all group"
                        >
                          <LayoutDashboard className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                          <span className="text-primary">Dashboard</span>
                          <span className="ml-auto text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                            {user?.role}
                          </span>
                        </Link>
                      )}

                     

                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-destructive/5 rounded-xl transition-all w-full text-left group mt-1 border-t border-border pt-3"
                      >
                        <LogOut className="w-4 h-4 text-destructive group-hover:scale-110 transition-transform" />
                        <span className="text-destructive">Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-sm font-medium text-detail hover:text-primary transition-colors px-4 py-2.5 flex items-center gap-2 group"
              >
                <User className="w-4 h-4 group-hover:text-accent transition-colors" />
                Sign In
              </Link>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to="/signup" 
                  className="btn-cta text-sm px-6 py-2.5 rounded-xl flex items-center gap-2 group"
                >
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Get Started
                </Link>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="lg:hidden relative w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-5 h-5 text-accent" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-5 h-5 text-accent" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-border/50 bg-card/95 backdrop-blur-md overflow-hidden"
          >
            <div className="p-4 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link 
                    key={link.to} 
                    to={link.to} 
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 py-3 px-4 text-sm font-medium rounded-xl transition-all ${
                      isActive(link.to)
                        ? "bg-accent/10 text-accent"
                        : "text-detail hover:text-primary hover:bg-accent/5"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive(link.to) ? 'text-accent' : 'text-detail'}`} />
                    {link.label}
                    {isActive(link.to) && (
                      <motion.div
                        layoutId="mobileActive"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-accent"
                      />
                    )}
                  </Link>
                );
              })}

              {/* Mobile User Section */}
              <div className="pt-4 mt-2 border-t border-border space-y-2">
                {isAuthenticated ? (
                  <>
                    {/* User Info */}
                    <div className="flex items-center gap-3 px-4 py-3">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-accent/30" />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center ring-2 ring-accent/30">
                          <span className="text-sm font-bold text-accent">
                            {getInitials(user?.name || 'User')}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-primary">{user?.name}</p>
                        <p className="text-xs text-detail capitalize">{user?.role}</p>
                      </div>
                    </div>

                    {shouldShowDashboard() && (
                      <Link 
                        to={getDashboardLink()} 
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 py-3 px-4 text-sm font-medium hover:bg-accent/5 rounded-xl transition-all"
                      >
                        <LayoutDashboard className="w-4 h-4 text-accent" />
                        Dashboard
                      </Link>
                    )}

                 

                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 py-3 px-4 text-sm font-medium text-destructive hover:bg-destructive/5 rounded-xl transition-all w-full text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 py-3 px-4 text-sm font-medium text-detail hover:text-primary hover:bg-accent/5 rounded-xl transition-all"
                    >
                      <User className="w-4 h-4" />
                      Sign In
                    </Link>
                    <Link 
                      to="/signup" 
                      onClick={() => setMobileOpen(false)}
                      className="btn-cta text-sm px-4 py-3 inline-flex items-center justify-center gap-2 w-full mt-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;