import { users, stylists } from "@/data/demo-data";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, Trash2, Search, Filter, User, Mail, 
  Shield, Crown, Award, MoreVertical, CheckCircle,
  XCircle, AlertCircle, Eye, Edit, Download,
  ChevronDown, ChevronUp, Users as UsersIcon,
  UserPlus, UserCheck, UserX, Calendar
} from "lucide-react";
import { toast } from "sonner";

const AdminUsers = () => {
  const [list, setList] = useState(users.map(u => ({ ...u })));
  const [stylistList, setStylistList] = useState(stylists.map(s => ({ ...s })));
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "date">("name");
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  // Get subscription plan name
  const getSubscriptionName = (plan: string) => {
    const plans: Record<string, string> = {
      starter: "Starter",
      growth: "Growth",
      pro: "Pro"
    };
    return plans[plan] || plan;
  };

  // Get plan color
  const getPlanColor = (plan: string) => {
    switch(plan) {
      case "starter": return "bg-blue-100 text-blue-700 border-blue-200";
      case "growth": return "bg-purple-100 text-purple-700 border-purple-200";
      case "pro": return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // Find stylist by user id
  const getStylistByUserId = (userId: string) => {
    return stylistList.find(s => s.id === userId);
  };

  const toggleFeatured = (stylistId: string) => {
    setStylistList(stylistList.map(s => 
      s.id === stylistId ? { ...s, featured: !s.featured } : s
    ));
  };

  const toggleUserStatus = (userId: string) => {
    setList(list.map(u => {
      if (u.id === userId) {
        const newStatus = u.status === "active" ? "suspended" : "active";
        toast.success(`User ${u.name}'s status set to ${newStatus}.`);
        return { ...u, status: newStatus as "active" | "suspended" };
      }
      return u;
    }));
  };

  const deleteUser = (userId: string) => {
    setList(list.filter(u => u.id !== userId));
  };

  const filteredUsers = list.filter(user => {
    if (searchTerm && !user.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !user.email.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (roleFilter !== "all" && user.role !== roleFilter) return false;
    if (statusFilter !== "all" && user.status !== statusFilter) return false;
    return true;
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  const stats = {
    total: list.length,
    active: list.filter(u => u.status === "active").length,
    suspended: list.filter(u => u.status === "suspended").length,
    stylists: list.filter(u => u.role === "stylist").length,
    customers: list.filter(u => u.role === "customer").length,
    admins: list.filter(u => u.role === "admin").length,
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.5 } }),
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
              <UsersIcon className="w-3.5 h-3.5" />
              User Management
            </span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-primary">Users</h2>
          <p className="text-detail mt-1 font-brand">Manage platform users and their roles</p>
        </div>

        
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-6 gap-4"
      >
        {[
          { label: "Total Users", value: stats.total, icon: UsersIcon, color: "bg-primary/10 text-primary" },
          { label: "Active", value: stats.active, icon: UserCheck, color: "bg-green-100 text-green-700" },
          { label: "Suspended", value: stats.suspended, icon: UserX, color: "bg-red-100 text-red-700" },
          { label: "Stylists", value: stats.stylists, icon: Crown, color: "bg-purple-100 text-purple-700" },
          { label: "Customers", value: stats.customers, icon: User, color: "bg-blue-100 text-blue-700" },
          { label: "Admins", value: stats.admins, icon: Shield, color: "bg-amber-100 text-amber-700" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-xl p-3 border border-border/50 flex items-center gap-2"
          >
            <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <div>
              <p className="text-lg font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-detail">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-card rounded-2xl p-5 border border-border/50 shadow-lg"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Roles</option>
              <option value="customer">Customers</option>
              <option value="stylist">Stylists</option>
              <option value="admin">Admins</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>

            <button className="px-4 py-3 rounded-xl border border-border hover:bg-primary/5 transition-colors">
              <Filter className="w-4 h-4 text-primary" />
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || roleFilter !== "all" || statusFilter !== "all") && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
            <span className="text-xs text-detail">Active filters:</span>
            {searchTerm && (
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1">
                Search: "{searchTerm}"
                <button onClick={() => setSearchTerm("")} className="hover:text-primary/80">×</button>
              </span>
            )}
            {roleFilter !== "all" && (
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1">
                Role: {roleFilter}
                <button onClick={() => setRoleFilter("all")} className="hover:text-primary/80">×</button>
              </span>
            )}
            {statusFilter !== "all" && (
              <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-1">
                Status: {statusFilter}
                <button onClick={() => setStatusFilter("all")} className="hover:text-primary/80">×</button>
              </span>
            )}
          </div>
        )}
      </motion.div>

      {/* Users Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-card rounded-2xl border border-border/50 overflow-hidden shadow-xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-6 py-4 font-semibold text-primary">User</th>
                <th className="text-left px-6 py-4 font-semibold text-primary">Email</th>
                <th className="text-left px-6 py-4 font-semibold text-primary">Role</th>
                <th className="text-left px-6 py-4 font-semibold text-primary">Plan</th>
                <th className="text-left px-6 py-4 font-semibold text-primary">Status</th>
                <th className="text-left px-6 py-4 font-semibold text-primary">Joined</th>
                <th className="text-left px-6 py-4 font-semibold text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {sortedUsers.map((u, idx) => {
                  const isStylist = u.role === "stylist";
                  const stylist = isStylist ? getStylistByUserId(u.id) : null;
                  const isFeatured = stylist?.featured || false;
                  const isExpanded = expandedUser === u.id;

                  return (
                    <motion.tr
                      key={u.id}
                      custom={idx}
                      variants={fadeUp}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -20 }}
                      className={`border-b border-border last:border-0 hover:bg-primary/5 transition-colors ${
                        isExpanded ? "bg-primary/5" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={u.avatar} 
                            alt={u.name} 
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" 
                          />
                          <div>
                            <p className="font-semibold text-primary">{u.name}</p>
                            <p className="text-xs text-detail">ID: {u.id.slice(-6)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-primary">{u.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          {u.role === "admin" && <Shield className="w-4 h-4 text-amber-500" />}
                          {u.role === "stylist" && <Crown className="w-4 h-4 text-purple-500" />}
                          {u.role === "customer" && <User className="w-4 h-4 text-blue-500" />}
                          <span className="text-sm capitalize">{u.role}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {isStylist && stylist ? (
                          <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${getPlanColor(stylist.subscriptionPlan)}`}>
                            {getSubscriptionName(stylist.subscriptionPlan)}
                          </span>
                        ) : (
                          <span className="text-xs text-detail">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-3 py-1.5 rounded-full flex items-center gap-1 w-fit ${
                          u.status === "active" 
                            ? "bg-green-100 text-green-700" 
                            : "bg-red-100 text-red-700"
                        }`}>
                          {u.status === "active" ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {u.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-detail flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Mar 15, 2026
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {isStylist && (
                            <button 
                              onClick={() => toggleFeatured(stylist!.id)}
                              className={`text-xs px-3 py-1.5 rounded-lg border flex items-center gap-1.5 transition-all ${
                                isFeatured 
                                  ? "border-amber-300 bg-amber-50 text-amber-700" 
                                  : "border-border hover:bg-primary/5 text-detail"
                              }`}
                            >
                              <Star className={`w-3 h-3 ${isFeatured ? "fill-amber-500 text-amber-500" : ""}`} />
                              {isFeatured ? "Featured" : "Feature"}
                            </button>
                          )}
                          
                          <button 
                            onClick={() => toggleUserStatus(u.id)}
                            className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                              u.status === "active" 
                                ? "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100" 
                                : "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                            }`}
                          >
                            {u.status === "active" ? "Suspend" : "Activate"}
                          </button>

                          <div className="relative">
                            <button className="p-1.5 rounded-lg border border-border hover:bg-muted transition-colors">
                              <MoreVertical className="w-4 h-4 text-detail" />
                            </button>
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {sortedUsers.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <UsersIcon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-bold text-primary mb-2">No users found</h3>
            <p className="text-detail mb-6 max-w-sm mx-auto">
              No users match your search criteria. Try adjusting your filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setRoleFilter("all");
                setStatusFilter("all");
              }}
              className="text-primary font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Table Footer */}
        {sortedUsers.length > 0 && (
          <div className="px-6 py-4 border-t border-border flex items-center justify-between">
            <p className="text-xs text-detail">
              Showing {sortedUsers.length} of {list.length} users
            </p>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg border border-border hover:bg-primary/5 transition-colors disabled:opacity-50">
                <ChevronDown className="w-4 h-4 text-detail rotate-90" />
              </button>
              <span className="text-sm text-primary">Page 1 of 1</span>
              <button className="p-2 rounded-lg border border-border hover:bg-primary/5 transition-colors disabled:opacity-50">
                <ChevronUp className="w-4 h-4 text-detail rotate-90" />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminUsers;