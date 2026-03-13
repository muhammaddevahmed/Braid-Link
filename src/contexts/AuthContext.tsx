import React, { createContext, useContext, useState, ReactNode } from "react";
import { users as initialUsers, User } from "@/data/demo-data";

// The AuthUser type now includes location and bio
type AuthUser = User;

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (data: {
    name: string;
    email: string;
    phone: string;
    role: "customer" | "stylist";
    profileImage?: string;
    city?: string;
    country: "UK" | "USA";
  }) => boolean;
  updatePassword: (currentPassword: string, newPassword: string) => boolean;
  updateProfile: (profileData: Partial<Pick<AuthUser, 'name' | 'phone' | 'postalCode' | 'location'>>) => boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userList, setUserList] = useState<AuthUser[]>([...initialUsers]);
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem("braidbook_user");
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  });

  const login = (email: string, _password: string): boolean => {
    const found = userList.find((u) => u.email === email);
    if (found) {
      setUser(found);
      localStorage.setItem("braidbook_user", JSON.stringify(found));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("braidbook_user");
  };

  const updatePassword = (currentPassword: string, newPassword: string): boolean => {
    if (!user) return false;

    // Mock validation - always allow for demo
    // In real app, verify currentPassword against stored hash
    
    const updatedUser = { ...user, password: newPassword }; // Mock
    setUser(updatedUser);
    localStorage.setItem("braidbook_user", JSON.stringify(updatedUser));

    // Update userList if needed
    setUserList(userList.map(u => u.id === user.id ? updatedUser : u));

    return true;
  };

  const updateProfile = (profileData: Partial<Pick<AuthUser, 'name' | 'phone' | 'postalCode' | 'location'>>): boolean => {
    if (!user) return false;

    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    localStorage.setItem("braidbook_user", JSON.stringify(updatedUser));
    setUserList(userList.map(u => u.id === user.id ? updatedUser : u));
    return true;
  };

  const signup = (data: {
    name: string;
    email: string;
    phone: string;
    role: "customer" | "stylist";
    profileImage?: string;
    city?: string;
    country: "UK" | "USA";
  }): boolean => {
    if (userList.some((u) => u.email === data.email)) {
      // User already exists
      return false;
    }

    const newUser: AuthUser = {
      id: `new_${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
      city: data.city,
      country: data.country,
      avatar:
        data.profileImage ||
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      joinDate: new Date().toISOString().split("T")[0],
      status: data.role === 'stylist' ? 'pending' : 'active',
    };

    setUserList([...userList, newUser]);
    setUser(newUser);
    localStorage.setItem("braidbook_user", JSON.stringify(newUser));

    return true;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, signup, updatePassword, updateProfile, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

