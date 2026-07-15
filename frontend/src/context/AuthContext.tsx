"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@/types";
import { loginRequest, registerRequest } from "@/services/authService";
import {
  getToken,
  getStoredUser,
  setToken,
  setStoredUser,
  clearAuthStorage,
} from "@/utils/tokenStorage";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getStoredUser();
    if (storedToken && storedUser) {
      setTokenState(storedToken);
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  function applyAuthResult(newToken: string, newUser: User) {
    setToken(newToken);
    setStoredUser(newUser);
    setTokenState(newToken);
    setUser(newUser);
  }

  async function login(email: string, password: string) {
    const result = await loginRequest(email, password);
    applyAuthResult(result.token, result.user);
  }

  async function register(name: string, email: string, password: string) {
    const result = await registerRequest(name, email, password);
    applyAuthResult(result.token, result.user);
  }

  function logout() {
    clearAuthStorage();
    setTokenState(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
