"use client";

import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

import { tokenManager } from "@/lib/auth";
import { User } from "@/lib/types";
import { RegisterFormValues } from "@/lib/schema/auth-schema";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<void>;
  logout: () => Promise<void>;
  register: (payload: RegisterFormValues) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
  initialUser?: User | null;
}

async function parseJson<T>(response: Response): Promise<T> {
  try {
    return (await response.json()) as T;
  } catch (error) {
    console.error("Failed to parse JSON response", error);
    throw new Error("Unexpected server response");
  }
}

export function AuthProvider({ children, initialUser }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(initialUser ?? null);
  const [isHydrating, setIsHydrating] = useState(initialUser === undefined);
  const [isProcessing, setIsProcessing] = useState(false);

  const fetchSession = useCallback(async () => {
    setIsHydrating(true);

    try {
      const response = await fetch("/api/session", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          setUser(null);
          return;
        }

        const data = await parseJson<{ error?: string }>(response);
        throw new Error(data.error || "Failed to load session");
      }

      const data = await parseJson<{ user: User | null }>(response);
      setUser(data.user ?? null);
    } catch (error) {
      console.error("Failed to fetch session", error);
      setUser(null);
    } finally {
      setIsHydrating(false);
    }
  }, []);

  useEffect(() => {
    if (initialUser === undefined) {
      fetchSession();
    }
  }, [initialUser, fetchSession]);

  const login = useCallback(async (email: string, password: string) => {
    setIsProcessing(true);

    try {
      const response = await fetch("/api/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await parseJson<{ error?: string }>(response);
        throw new Error(data.error || "Login failed. Please try again.");
      }

      const data = await parseJson<{
        user: User;
        token: string;
        refreshToken?: string;
      }>(response);

      setUser(data.user);
      tokenManager.setToken(data.token);
      if (data.refreshToken) {
        tokenManager.setRefreshToken(data.refreshToken);
      }
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const register = useCallback(
    async ({
      agreeToTerms: _,
      confirmPassword: __,
      ...rest
    }: RegisterFormValues) => {
      setIsProcessing(true);

      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(rest),
        });

        if (!response.ok) {
          const data = await parseJson<{ error?: string }>(response);
          throw new Error(
            data.error || "Registration failed. Please try again."
          );
        }

        const data = await parseJson<{
          user: User;
          token: string;
          refreshToken?: string;
        }>(response);

        setUser(data.user);
        tokenManager.setToken(data.token);
        if (data.refreshToken) {
          tokenManager.setRefreshToken(data.refreshToken);
        }
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    setIsProcessing(true);

    try {
      await fetch("/api/session", {
        method: "DELETE",
        credentials: "include",
      });
    } catch (error) {
      console.error("Failed to log out", error);
    } finally {
      tokenManager.removeToken();
      setUser(null);
      setIsProcessing(false);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    await fetchSession();
  }, [fetchSession]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isLoading: isHydrating || isProcessing,
      isAuthenticated: Boolean(user),
      login,
      logout,
      register,
      refreshUser,
    }),
    [user, isHydrating, isProcessing, login, logout, register, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
