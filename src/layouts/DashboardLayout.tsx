import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Calendar, Heart, Star, User, Scissors, Image, Clock,
  DollarSign, CreditCard, Users, CheckSquare, Tag, Settings, MessageSquare,
  ChevronLeft, LogOut, Menu, X, FileText, HelpCircle, Bell, Shield,
  Award, Sparkles, ChevronRight, Home, Circle
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
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - Dark Theme */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 
        bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] 
        text-white transform transition-all duration-300 ease-in-out
        md:translate-x-0 shadow-2xl
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="p-5 flex items-center justify-between border-b border-white/10">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="relative"
              >
                <img src={logo} alt="BraidLink" className="h-9 w-auto brightness-0 invert drop-shadow-lg" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute inset-0 bg-accent/30 rounded-full blur-xl -z-10"
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg leading-tight text-white group-hover:text-accent transition-colors">
                  BraidLink
                </span>
                <span className="text-[10px] text-white/50 leading-tight">
                  {user?.role === "admin" ? "Administrator" : user?.role === "stylist" ? "Professional Stylist" : "Member"}
                </span>
              </div>
            </Link>
            <button 
              className="md:hidden w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Profile */}
          <div className="p-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                {user?.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-accent/50"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center ring-2 ring-accent/50">
                    <span className="text-lg font-bold text-accent">
                      {getInitials(user?.name || 'User')}
                    </span>
                  </div>
                )}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#1a1a1a]"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white">{user?.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <Shield className="w-3 h-3 text-accent" />
                  <p className="text-xs text-white/60 capitalize">{user?.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium
                    transition-all duration-200 group relative
                    ${isActive 
                      ? "bg-accent/20 text-accent border-l-4 border-accent" 
                      : "text-white/70 hover:text-white hover:bg-white/5"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-white/50 group-hover:text-white/70'}`} />
                    <span>{link.label}</span>
                  </div>
                  
                  {/* Badge */}
                  {link.badge && (
                    <span className="bg-accent/20 text-accent text-xs px-2 py-0.5 rounded-full border border-accent/30">
                      {link.badge}
                    </span>
                  )}

                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 w-1 h-6 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer Links */}
          <div className="p-4 border-t border-white/10 space-y-1">
            <Link 
              to="/" 
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200 group"
            >
              <Home className="w-4 h-4 text-white/50 group-hover:text-white/70" />
              <span>Back to Site</span>
              <ChevronRight className="w-3 h-3 ml-auto text-white/30 group-hover:text-white/50" />
            </Link>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200 w-full group"
            >
              <LogOut className="w-4 h-4 text-white/50 group-hover:text-white/70" />
              <span>Sign Out</span>
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 md:ml-72">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-xl border-b border-border/50 h-16 flex items-center px-4 md:px-6 shadow-sm">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="md:hidden w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-colors"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5 text-accent" />
              </motion.button>
              
              <div>
                <h1 className="font-serif font-semibold text-xl text-primary">
                  {links.find((l) => l.to === location.pathname)?.label || "Dashboard"}
                </h1>
                <p className="text-xs text-detail hidden sm:block">
                  Welcome back, {user?.name?.split(' ')[0]}
                </p>
              </div>
            </div>

            {/* Right Side Header Items */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center hover:bg-accent/20 transition-colors"
              >
                <Bell className="w-5 h-5 text-accent" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white text-xs rounded-full flex items-center justify-center border-2 border-card">
                    {notifications}
                  </span>
                )}
              </motion.button>

              {/* Quick Stats */}
              {user?.role === 'stylist' && (
                <div className="hidden md:flex items-center gap-2 bg-accent/5 px-3 py-1.5 rounded-xl border border-accent/20">
                  <Award className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium text-primary">Premium Plan</span>
                </div>
              )}
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
          className="p-4 md:p-6 lg:p-8"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardLayout;