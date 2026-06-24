import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { apiRequest } from "../api/api";
import type { User } from "../types";

interface LoginResponse {
  token: string;
  user: User;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, program: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("studyconnect_token");
    const savedUser = localStorage.getItem("studyconnect_user");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const saveSession = (session: LoginResponse) => {
    setToken(session.token);
    setUser(session.user);
    localStorage.setItem("studyconnect_token", session.token);
    localStorage.setItem("studyconnect_user", JSON.stringify(session.user));
  };

  const login = async (email: string, password: string) => {
    const session = await apiRequest<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    saveSession(session);
  };

  const register = async (name: string, email: string, password: string, program: string) => {
    const session = await apiRequest<LoginResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, program }),
    });
    saveSession(session);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("studyconnect_token");
    localStorage.removeItem("studyconnect_user");
  };

  const value = useMemo(
    () => ({ user, token, login, register, logout }),
    [user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
