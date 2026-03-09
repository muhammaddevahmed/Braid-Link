import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Calendar, Heart, Star, User, Scissors, Image, Clock,
  DollarSign, CreditCard, Users, CheckSquare, Tag, Settings, MessageSquare,
  ChevronLeft, LogOut, Menu, X, FileText, HelpCircle
} from "lucide-react";
import { useState } from "react";
import logo from "../assets/braidlink-logo.png";

const customerLinks = [
  { to: "/customer/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/customer/bookings", icon: Calendar, label: "Bookings" },
  { to: "/customer/favorites", icon: Heart, label: "Favorites" },
  { to: "/customer/reviews", icon: Star, label: "Reviews" },
  { to: "/customer/messages", icon: MessageSquare, label: "Messages" },
  { to: "/customer/profile", icon: User, label: "Profile" },
];

const stylistLinks = [
  { to: "/stylist/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/stylist/bookings", icon: Calendar, label: "Bookings" },
  { to: "/stylist/services", icon: Scissors, label: "Services" },
  { to: "/stylist/portfolio", icon: Image, label: "Portfolio" },
  { to: "/stylist/availability", icon: Clock, label: "Availability" },
  { to: "/stylist/earnings", icon: DollarSign, label: "Earnings" },
  { to: "/stylist/subscription", icon: CreditCard, label: "Subscription" },
  { to: "/stylist/messages", icon: MessageSquare, label: "Messages" },
  { to: "/stylist/profile", icon: User, label: "Profile" },
];

const adminLinks = [
  { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/admin/users", icon: Users, label: "Users" },
  { to: "/admin/stylist-approvals", icon: CheckSquare, label: "Stylist Approvals" },
  { to: "/admin/bookings", icon: Calendar, label: "Bookings" },
  { to: "/admin/categories", icon: Tag, label: "Categories" },
  { to: "/admin/subscriptions", icon: CreditCard, label: "Subscriptions" },
  { to: "/admin/faqs", icon: HelpCircle, label: "FAQs" },
  { to: "/admin/payments", icon: DollarSign, label: "Payments" },
  { to: "/admin/withdrawals", icon: FileText, label: "Withdrawals" },
  { to: "/admin/disputes", icon: MessageSquare, label: "Disputes" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = user?.role === "admin" ? adminLinks : user?.role === "stylist" ? stylistLinks : customerLinks;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary text-primary-foreground transform transition-transform duration-300 md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between border-b border-primary-foreground/10">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="BraidLink" className="h-8 w-auto brightness-0 invert" />
              <span className="font-serif font-bold text-lg">BraidLink</span>
            </Link>
            <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 border-b border-primary-foreground/10">
            <div className="flex items-center gap-3">
              <img src={user?.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold">{user?.name}</p>
                <p className="text-xs opacity-70 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-primary-foreground/10">
            <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back to Site
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/5 transition-colors w-full">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border h-14 flex items-center px-4 gap-3">
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-serif font-semibold text-lg capitalize">
            {links.find((l) => l.to === location.pathname)?.label || "Dashboard"}
          </h1>
        </header>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 md:p-6"
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardLayout;
