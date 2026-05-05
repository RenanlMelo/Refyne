"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getCookie, eraseCookie } from "../utils/cookies";

export interface User {
  userId: number;
  email: string;
  userType: "CANDIDATE" | "STARTUP";
  profileCompleted: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  refreshUser: () => Promise<User | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  console.log("[AuthContext.tsx] Initializing state: loading = true");

  const refreshUser = useCallback(async () => {
    const token = getCookie("token");
    
    if (!token) {
      console.log("[AuthContext.tsx] refreshUser: No token found. Setting loading = false");
      setUser(null);
      setLoading(false);
      return null;
    }

    try {
      console.log("[AuthContext.tsx] refreshUser: Fetching user data. Setting loading = true");
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = response.data;
      console.log("[AuthContext.tsx] refreshUser: User data fetched successfully", userData);
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      eraseCookie("token");
      setUser(null);
      return null;
    } finally {
      console.log("[AuthContext.tsx] refreshUser: Finally block reached. Setting loading = false");
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    eraseCookie("token");
    setUser(null);
  }, []);

  useEffect(() => {
    console.log("[AuthContext.tsx] useEffect: Calling refreshUser()");
    refreshUser();
  }, [refreshUser]);

  console.log("[AuthContext.tsx] Rendering AuthProvider. Current loading:", loading);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
