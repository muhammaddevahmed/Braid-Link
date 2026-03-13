import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Calendar, Heart, Star, User, Scissors, Image, Clock,
  DollarSign, CreditCard, Users, CheckSquare, Tag, Settings, MessageSquare,
  ChevronLeft, LogOut, Menu, X, FileText, HelpCircle, Bell, Shield,
  Award, Sparkles, ChevronRight, Home, Circle, BadgeCheck, Zap,
  TrendingUp, Activity, Gift, Target
} from "lucide-react";
import { useState, useEffect } from "react";
import logo from "../assets/braidlink-logo.png";

const customerLinks = [
  { to: "/customer/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/customer/bookings", icon: Calendar, label: "Bookings" },
  { to: "/customer/favorites", icon: Heart, label: "Favorites" },
  { to: "/customer/reviews", icon: Star, label: "Reviews" },
  { to: "/customer/messages", icon: MessageSquare, label: "Messages", badge: 2 },
  { to: "/customer/profile", icon: User, label: "Profile" },
];

const stylistLinks = [
  { to: "/stylist/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/stylist/bookings", icon: Calendar, label: "Bookings", badge: 3 },
  { to: "/stylist/services", icon: Scissors, label: "Services" },
  { to: "/stylist/portfolio", icon: Image, label: "Portfolio" },
  { to: "/stylist/availability", icon: Clock, label: "Availability" },
  { to: "/stylist/earnings", icon: DollarSign, label: "Earnings" },
  { to: "/stylist/subscription", icon: CreditCard, label: "Subscription" },
  { to: "/stylist/messages", icon: MessageSquare, label: "Messages", badge: 1 },
  { to: "/stylist/profile", icon: User, label: "Profile" },
];

const adminLinks = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/users", icon: Users, label: "Users" },
  { to: "/admin/stylist-approvals", icon: CheckSquare, label: "Stylist Approvals", badge: 5 },
  { to: "/admin/bookings", icon: Calendar, label: "Bookings" },
  { to: "/admin/categories", icon: Tag, label: "Categories" },
  { to: "/admin/subscriptions", icon: CreditCard, label: "Subscriptions" },
  { to: "/admin/faqs", icon: HelpCircle, label: "FAQs" },
  { to: "/admin/payments", icon: DollarSign, label: "Payments" },
  { to: "/admin/withdrawals", icon: FileText, label: "Withdrawals" },
  { to: "/admin/disputes", icon: MessageSquare, label: "Disputes", badge: 2 },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
  { to: "/admin/profile", icon: User, label: "Profile" },
];

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const links = user?.role === "admin" ? adminLinks : user?.role === "stylist" ? stylistLinks : customerLinks;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/5 flex">
      {/* Sidebar - Premium Dark Theme */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-80 
        bg-gradient-to-b from-[#1a1a1a] via-[#151515] to-[#0d0d0d]
        text-white transform transition-all duration-500 ease-out
        md:translate-x-0 shadow-2xl
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/3 rounded-full blur-[80px]" />
          <div className="absolute inset-0 opacity-[0.02]" 
               style={{ backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`, backgroundSize: '24px 24px' }} />
        </div>

        <div className="flex flex-col h-full relative z-10">
          {/* Logo Area - BIGGER as requested */}
          <div className="p-6 flex items-center justify-between border-b border-white/10">
            <Link to="/" className="flex items-center gap-4 group">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="relative"
              >
                <img src={logo} alt="BraidLink" className="h-14 w-auto brightness-0 invert drop-shadow-2xl" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0, 0.4, 0]
                  }}
                  transition={{ 
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-accent/30 rounded-full blur-2xl -z-10"
                />
                
                {/* Decorative sparkle */}
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-3 -right-3"
                >
                  <Sparkles className="w-5 h-5 text-accent" />
                </motion.div>
              </motion.div>
              
              <div className="flex flex-col">
                <span className="font-serif font-bold text-2xl leading-tight text-white group-hover:text-accent transition-colors">
                  BraidLink
                </span>
                <span className="text-xs text-white/50 leading-tight flex items-center gap-1">
                  <Shield className="w-3 h-3 text-accent" />
                  {user?.role === "admin" ? "Administrator" : user?.role === "stylist" ? "Professional Stylist" : "Member"}
                </span>
              </div>
            </Link>
            
            <button 
              className="md:hidden w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile - Premium */}
          <div className="p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
            <div className="flex items-center gap-4">
              <div className="relative">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-16 h-16 rounded-xl object-cover ring-2 ring-accent/50 shadow-xl"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center ring-2 ring-accent/50 shadow-xl">
                    <span className="text-2xl font-bold text-primary">
                      {getInitials(user?.name || 'User')}
                    </span>
                  </div>
                )}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#1a1a1a]"
                />
                
                {/* Verified badge for stylists */}
                {user?.role === 'stylist' && (
                  <div className="absolute -top-2 -right-2 bg-accent rounded-full p-1.5 shadow-lg border-2 border-[#1a1a1a]">
                    <BadgeCheck className="w-3.5 h-3.5 text-primary" />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <p className="text-base font-semibold text-white">{user?.name}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <Shield className="w-3.5 h-3.5 text-accent" />
                  <p className="text-xs text-white/70 capitalize">{user?.role}</p>
                </div>
                
                {/* Quick stat for stylists */}
                {user?.role === 'stylist' && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 bg-accent/20 px-2 py-1 rounded-full">
                      <TrendingUp className="w-3 h-3 text-accent" />
                      <span className="text-[10px] text-white/90">+28% this month</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation - Premium */}
          <nav className="flex-1 p-5 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    flex items-center justify-between px-5 py-3.5 rounded-xl text-sm font-medium
                    transition-all duration-300 group relative overflow-hidden
                    ${isActive 
                      ? "bg-gradient-to-r from-accent/20 to-accent/5 text-accent border-l-4 border-accent shadow-lg" 
                      : "text-white/70 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  {/* Hover effect background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />
                  
                  <div className="flex items-center gap-3 relative z-10">
                    <Icon className={`w-5 h-5 transition-all ${isActive ? 'text-accent' : 'text-white/50 group-hover:text-white/70 group-hover:scale-110'}`} />
                    <span>{link.label}</span>
                  </div>
                  
                  {/* Badge */}
                  {link.badge && (
                    <span className="bg-accent/20 text-accent text-xs px-2.5 py-1 rounded-full border border-accent/30 font-medium relative z-10">
                      {link.badge}
                    </span>
                  )}

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 w-1.5 h-8 bg-gradient-to-b from-accent to-accent/70 rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer Links - Premium */}
          <div className="p-5 border-t border-white/10 space-y-2 bg-gradient-to-t from-black/20 to-transparent">
            <Link 
              to="/" 
              className="flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300 group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
              <Home className="w-5 h-5 text-white/50 group-hover:text-white/70 group-hover:scale-110 transition-all relative z-10" />
              <span className="relative z-10">Back to Site</span>
              <ChevronRight className="w-4 h-4 ml-auto text-white/30 group-hover:text-white/50 group-hover:translate-x-1 transition-all relative z-10" />
            </Link>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300 w-full group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-destructive/0 via-destructive/5 to-destructive/0"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.8 }}
              />
              <LogOut className="w-5 h-5 text-white/50 group-hover:text-white/70 group-hover:scale-110 transition-all relative z-10" />
              <span className="relative z-10">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-80">
        {/* Header - Premium */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border/50 h-20 flex items-center px-4 md:px-6 lg:px-8 shadow-sm">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="md:hidden w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center hover:from-accent/20 hover:to-accent/10 transition-all border border-accent/20"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5 text-accent" />
              </motion.button>
              
              <div>
                <h1 className="font-serif font-semibold text-2xl text-primary">
                  {links.find((l) => l.to === location.pathname)?.label || "Dashboard"}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Zap className="w-3.5 h-3.5 text-accent" />
                  <p className="text-xs text-muted-foreground">
                    Welcome back, {user?.name?.split(' ')[0]}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side Header Items */}
            <div className="flex items-center gap-3">
              {/* Quick Stats */}
              {user?.role === 'stylist' && (
                <div className="hidden md:flex items-center gap-3 bg-gradient-to-r from-accent/10 to-accent/5 px-4 py-2 rounded-xl border border-accent/20">
                  <Award className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium text-primary">Premium Plan</span>
                  <div className="w-px h-4 bg-border/50 mx-1" />
                  
                </div>
              )}

              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center hover:from-accent/20 hover:to-accent/10 transition-all border border-accent/20"
              >
                <Bell className="w-5 h-5 text-accent" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center border-2 border-card shadow-lg">
                    {notifications}
                  </span>
                )}
              </motion.button>

              {/* Activity Indicator */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="hidden md:block w-2 h-2 bg-green-500 rounded-full"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="p-6 md:p-8 lg:p-10"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardLayout;