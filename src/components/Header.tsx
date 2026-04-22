import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Menu, X, User, LogOut, ChevronDown, Zap, Sparkles, 
  Home, Scissors, Search, Users, CreditCard, HelpCircle, 
  Mail, LayoutDashboard, Heart, Shield, Crown, Award,
  Bell, Settings, Star, Clock
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
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-lg" 
          : "bg-background/80 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo Section - ENLARGED and website name removed */}
        <Link to="/" className="flex items-center mr-8">
          <motion.div
            whileHover={{ rotate: 3, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="relative"
          >
            <img src={logo} alt="BraidLink" className="h-24 w-auto drop-shadow-xl" />
            <motion.div
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0, 0.7, 0]
              }}
              transition={{ 
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-accent/30 rounded-full blur-3xl -z-10"
            />
            
            {/* Decorative sparkle */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [0.8, 1.3, 0.8]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-3 -right-3"
            >
              <Sparkles className="w-5 h-5 text-accent" />
            </motion.div>
          </motion.div>
        </Link>

        {/* Desktop Navigation - Premium redesign */}
        <nav className="hidden lg:flex items-center gap-0">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.to);
            
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`relative text-sm font-medium whitespace-nowrap transition-all px-3 py-2.5 rounded-xl flex items-center gap-2 group ${
                  active
                    ? "text-accent bg-gradient-to-r from-accent/10 to-accent/5"
                    : "text-muted-foreground hover:text-primary hover:bg-accent/5"
                }`}
              >
                <Icon className={`w-4 h-4 transition-all ${
                  active 
                    ? 'text-accent' 
                    : 'text-muted-foreground group-hover:text-accent group-hover:scale-110'
                }`} />
                {link.label}
                
                {active && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-2 right-2 h-0.5 bg-gradient-to-r from-accent/0 via-accent to-accent/0 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Section - Premium redesign */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setProfileOpen(!profileOpen)}
                className={`flex items-center gap-3 pl-2 pr-4 py-2 rounded-xl transition-all duration-300 border ${
                  profileOpen 
                    ? 'bg-accent/10 border-accent/30 shadow-lg' 
                    : 'hover:bg-accent/5 border-transparent hover:border-accent/20'
                }`}
              >
                <div className="relative">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-accent/30 group-hover:ring-accent/50 transition-all"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center ring-2 ring-accent/30 shadow-lg">
                      <span className="text-sm font-bold text-primary">
                        {getInitials(user?.name || 'User')}
                      </span>
                    </div>
                  )}
                  
                  {/* Online status indicator */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-background"
                  />
                </div>
                
                <div className="text-left">
                  <span className="text-sm font-semibold text-primary block leading-tight">
                    {user?.name?.split(" ")[0]}
                  </span>
                  <span className="text-xs text-muted-foreground capitalize flex items-center gap-1">
                    <Shield className="w-3 h-3 text-accent" />
                    {user?.role}
                  </span>
                </div>
                
                <motion.div
                  animate={{ rotate: profileOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute right-0 top-full mt-2 w-72 bg-card rounded-2xl border border-border/50 shadow-2xl overflow-hidden"
                  >
                    {/* Profile Header with Gradient */}
                    <div className="relative p-5 bg-gradient-to-br from-primary to-primary/95">
                      <div className="absolute inset-0 opacity-10" 
                           style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '16px 16px' }} />
                      
                      <div className="relative z-10 flex items-center gap-3">
                        {user?.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-xl object-cover ring-2 ring-white/30" />
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30">
                            <span className="text-xl font-bold text-white">
                              {getInitials(user?.name || 'User')}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="text-base font-semibold text-white">{user?.name}</p>
                          <p className="text-xs text-white/80 flex items-center gap-1 mt-1">
                            <Mail className="w-3 h-3" /> {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2">
                      {shouldShowDashboard() && (
                        <Link 
                          to={getDashboardLink()} 
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-accent/5 rounded-xl transition-all group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <LayoutDashboard className="w-4 h-4 text-accent" />
                          </div>
                          <span className="text-primary font-medium">Dashboard</span>
                          <span className="ml-auto text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                            {user?.role}
                          </span>
                        </Link>
                      )}

                      <div className="h-px bg-border/50 my-2" />

                      {/* Logout */}
                      <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-destructive/5 rounded-xl transition-all w-full text-left group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <LogOut className="w-4 h-4 text-destructive" />
                        </div>
                        <span className="text-destructive font-medium">Sign Out</span>
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
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-4 py-2.5 flex items-center gap-2 group whitespace-nowrap"
              >
                <User className="w-4 h-4 group-hover:text-accent transition-colors group-hover:scale-110" />
                Sign In
              </Link>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to="/signup" 
                  className="bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold text-base px-8 py-3 rounded-xl flex items-center gap-2 group hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 whitespace-nowrap w-fit"
                >
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  Get Started
                </Link>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile Menu Button - Premium */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="lg:hidden relative w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center border border-accent/20 hover:border-accent/30 transition-all"
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

      {/* Mobile Menu - Premium redesign */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t border-border/50 bg-card/95 backdrop-blur-md overflow-hidden"
          >
            <div className="p-5 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.to);
                
                return (
                  <Link 
                    key={link.to} 
                    to={link.to} 
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 py-4 px-4 text-sm font-medium rounded-xl transition-all ${
                      active
                        ? "bg-gradient-to-r from-accent/10 to-accent/5 text-accent"
                        : "text-muted-foreground hover:text-primary hover:bg-accent/5"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${active ? 'text-accent' : 'text-muted-foreground'}`} />
                    {link.label}
                    {active && (
                      <motion.div
                        layoutId="mobileActive"
                        className="ml-auto w-2 h-2 rounded-full bg-accent"
                      />
                    )}
                  </Link>
                );
              })}

              {/* Mobile User Section - Premium */}
              <div className="pt-6 mt-4 border-t border-border space-y-3">
                {isAuthenticated ? (
                  <>
                    {/* User Info Card */}
                    <div className="bg-gradient-to-br from-accent/5 to-accent/0 rounded-xl p-4 border border-accent/20">
                      <div className="flex items-center gap-3">
                        {user?.avatar ? (
                          <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-accent/30" />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center ring-2 ring-accent/30">
                            <span className="text-base font-bold text-primary">
                              {getInitials(user?.name || 'User')}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-semibold text-primary">{user?.name}</p>
                          <p className="text-xs text-muted-foreground capitalize flex items-center gap-1 mt-1">
                            <Shield className="w-3 h-3 text-accent" />
                            {user?.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    {shouldShowDashboard() && (
                      <Link 
                        to={getDashboardLink()} 
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 py-3 px-4 text-sm font-medium hover:bg-accent/5 rounded-xl transition-all group"
                      >
                        <LayoutDashboard className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                        Dashboard
                      </Link>
                    )}

                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 py-3 px-4 text-sm font-medium text-destructive hover:bg-destructive/5 rounded-xl transition-all w-full text-left group"
                    >
                      <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 py-3 px-4 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent/5 rounded-xl transition-all group"
                    >
                      <User className="w-4 h-4 group-hover:text-accent group-hover:scale-110 transition-transform" />
                      Sign In
                    </Link>
                    
                    <Link 
                      to="/signup" 
                      onClick={() => setMobileOpen(false)}
                      className="bg-gradient-to-r from-accent to-accent/90 text-primary font-semibold text-base px-6 py-4 inline-flex items-center justify-center gap-2 w-full mt-2 rounded-xl hover:shadow-lg hover:shadow-accent/25 transition-all group whitespace-nowrap"
                    >
                      <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
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