import React, { createContext, useContext, useState, ReactNode } from "react";
import { users } from "@/data/demo-data";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "customer" | "stylist" | "admin";
  phone: string;
  avatar: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (data: { name: string; email: string; phone: string; role: "customer" | "stylist" }) => boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem("braidbook_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, _password: string): boolean => {
    const found = users.find((u) => u.email === email);
    if (found) {
      const authUser: AuthUser = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role,
        phone: found.phone,
        avatar: found.avatar,
      };
      setUser(authUser);
      localStorage.setItem("braidbook_user", JSON.stringify(authUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("braidbook_user");
  };

  const signup = (data: { name: string; email: string; phone: string; role: "customer" | "stylist" }): boolean => {
    const authUser: AuthUser = {
      id: `new_${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    };
    setUser(authUser);
    localStorage.setItem("braidbook_user", JSON.stringify(authUser));
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
