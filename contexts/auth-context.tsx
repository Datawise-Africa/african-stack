"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, authApi, tokenManager } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string, handle: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = tokenManager.getToken();
      console.log('Auth initialization - token exists:', !!token);
      
       if (token) {
        try {
          console.log('Fetching current user...');
          const userData = await authApi.getCurrentUser();
          console.log('Current user data:', userData);
          setUser(userData);
        } catch (error) {
          console.error('Failed to get current user:', error);
          tokenManager.removeToken();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string, rememberMe = false) => {
    try {
      setIsLoading(true);
      console.log('Starting login process...');
      const response = await authApi.login({ email, password, rememberMe });
      console.log('Login response received:', response);
      
      // Store tokens
      tokenManager.setToken(response.token);
      if (response.refreshToken) {
        tokenManager.setRefreshToken(response.refreshToken);
      }
      
      console.log('Setting user:', response.user);
      setUser(response.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, handle: string) => {
    try {
      setIsLoading(true);
      const response = await authApi.register({ name, email, password, handle });
      
      // Store tokens
      tokenManager.setToken(response.token);
      if (response.refreshToken) {
        tokenManager.setRefreshToken(response.refreshToken);
      }
      
      setUser(response.user);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      tokenManager.removeToken();
      setUser(null);
    }
  };

  const refreshUser = async () => {
    try {
      const userData = await authApi.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      tokenManager.removeToken();
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
