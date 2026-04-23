import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { BookingProvider } from "@/contexts/BookingContext";

import PublicLayout from "@/layouts/PublicLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import HairstylesPage from "@/pages/HairstylesPage";
import StylistProfilePage from "@/pages/StylistProfilePage";
import PricingPage from "@/pages/PricingPage";
import BecomeStylistPage from "@/pages/BecomeStylistPage";
import FAQPage from "@/pages/FAQPage";
import ContactPage from "@/pages/ContactPage";
import BookingPage from "@/pages/BookingPage";
import AIRecommendationPage from "@/pages/AIRecommendationPage";
import FindStylistPage from "@/pages/FindStylistPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import NotFound from "@/pages/NotFound";

import CustomerDashboard from "@/pages/customer/CustomerDashboard";
import CustomerBookings from "@/pages/customer/CustomerBookings";
import CustomerFavorites from "@/pages/customer/CustomerFavorites";
import CustomerReviews from "@/pages/customer/CustomerReviews";
import CustomerProfile from "@/pages/customer/CustomerProfile";
import CustomerMessages from "@/pages/customer/CustomerMessages";
import ReviewStylistPage from "@/pages/customer/ReviewStylistPage";

import StylistDashboard from "@/pages/stylist/StylistDashboard";
import StylistBookings from "@/pages/stylist/StylistBookings";
import StylistServices from "@/pages/stylist/StylistServices";
import StylistPortfolio from "@/pages/stylist/StylistPortfolio";
import StylistAvailability from "@/pages/stylist/StylistAvailability";
import StylistEarnings from "@/pages/stylist/StylistEarnings";
import StylistSubscription from "@/pages/stylist/StylistSubscription";
import StylistProfile from "@/pages/stylist/StylistProfile";
import StylistMessages from "@/pages/stylist/StylistMessages";
import SelectPlanPage from "@/pages/stylist/SelectPlanPage";

import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminStylistApprovals from "@/pages/admin/AdminStylistApprovals";
import AdminBookings from "@/pages/admin/AdminBookings";
import AdminCategories from "@/pages/admin/AdminCategories";
import AdminSubscriptions from "@/pages/admin/AdminSubscriptions";
import AdminFAQs from "./pages/admin/AdminFAQs";
import AdminPayments from "@/pages/admin/AdminPayments";
import AdminWithdrawals from "@/pages/admin/AdminWithdrawals";
import AdminDisputes from "@/pages/admin/AdminDisputes";
import AdminSettings from "@/pages/admin/AdminSettings";
import AdminProfile from "@/pages/admin/AdminProfile";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role: string }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/login" />;

  if (user?.role !== role) {
    // If a non-matching user tries to access a route, redirect them appropriately.
    // Customers trying to access protected routes are sent to the stylist application page.
    if (user?.role === 'customer') {
      return <Navigate to="/customer/dashboard" replace />;
    }
    // Other roles are sent to their own dashboard.
    return <Navigate to={`/${user?.role}/dashboard`} replace />;
  }

  // Add specific checks for stylists to enforce the application/plan selection flow.
  if (user.role === 'stylist' && location.pathname !== '/stylist/select-plan') {
    const appData = localStorage.getItem(`stylist_application_${user.id}`);
    const appStatus = appData ? JSON.parse(appData).status : null;
    if (appStatus === 'approved') return <Navigate to="/stylist/select-plan" replace />;
    if (appStatus === 'pending' || !appStatus) {
      // If pending or not applied yet, redirect to application page
      return <Navigate to="/become-stylist" replace />;
    }
  }

  return children;
};

const AppRoutes = () => (
  <Routes>
    {/* Public */}
    <Route element={<PublicLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/hairstyles" element={<HairstylesPage />} />
      <Route path="/stylist/:id" element={<StylistProfilePage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/become-stylist" element={<BecomeStylistPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/find-stylist" element={<FindStylistPage />} />
      <Route path="/ai-recommendation" element={<AIRecommendationPage />} />
      <Route path="/review-stylist" element={<ReviewStylistPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-of-service" element={<TermsOfServicePage />} />
    </Route>

    {/* Customer */}
    <Route element={<ProtectedRoute role="customer"><DashboardLayout /></ProtectedRoute>}>
      <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      <Route path="/customer/bookings" element={<CustomerBookings />} />
      <Route path="/customer/favorites" element={<CustomerFavorites />} />
      <Route path="/customer/reviews" element={<CustomerReviews />} />
      <Route path="/customer/messages" element={<CustomerMessages />} />
      <Route path="/customer/profile" element={<CustomerProfile />} />
    </Route>

    {/* Standalone stylist routes */}
    <Route path="/stylist/select-plan" element={<ProtectedRoute role="stylist"><SelectPlanPage /></ProtectedRoute>} />

    {/* Stylist */}
    <Route element={<ProtectedRoute role="stylist"><DashboardLayout /></ProtectedRoute>}>
      <Route path="/stylist/dashboard" element={<StylistDashboard />} />
      <Route path="/stylist/bookings" element={<StylistBookings />} />
      <Route path="/stylist/services" element={<StylistServices />} />
      <Route path="/stylist/portfolio" element={<StylistPortfolio />} />
      <Route path="/stylist/availability" element={<StylistAvailability />} />
      <Route path="/stylist/earnings" element={<StylistEarnings />} />
      <Route path="/stylist/subscription" element={<StylistSubscription />} />
      <Route path="/stylist/messages" element={<StylistMessages />} />
      <Route path="/stylist/profile" element={<StylistProfile />} />
    </Route>

    {/* Admin */}
    <Route element={<ProtectedRoute role="admin"><DashboardLayout /></ProtectedRoute>}>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/stylist-approvals" element={<AdminStylistApprovals />} />
      <Route path="/admin/bookings" element={<AdminBookings />} />
      <Route path="/admin/categories" element={<AdminCategories />} />
      <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
      <Route path="/admin/faqs" element={<AdminFAQs />} />
      <Route path="/admin/payments" element={<AdminPayments />} />
      <Route path="/admin/withdrawals" element={<AdminWithdrawals />} />
      <Route path="/admin/disputes" element={<AdminDisputes />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
      <Route path="/admin/profile" element={<AdminProfile />} />
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BookingProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppRoutes />
          </BrowserRouter>
        </BookingProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
