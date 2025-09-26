// Authentication utilities and types
import { apiClient } from './api';
import { extractCorrectErrorMessage } from './error-utils';
import type { TsFixme } from './types';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_role: 'user' | 'creator' | 'system_admin';
  // Computed properties for compatibility
  name: string;
  handle: string;
  role: 'user' | 'creator' | 'system_admin';
  status: 'active' | 'inactive' | 'pending_approval';
  joinedAt: string;
  stats: {
    articlesPublished: number;
    totalViews: number;
    totalReactions: number;
    totalComments: number;
    followers: number;
    following: number;
  };
}

export interface AuthResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_role: 'user' | 'creator' | 'system_admin';
  refresh_token: string;
  access_token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  handle: string;
}

// Helper function to transform API response to User interface
function transformAuthResponseToUser(authResponse: AuthResponse): User {
  const fullName = `${authResponse.first_name} ${authResponse.last_name}`.trim() || 'User';
  const handle = `@${authResponse.email.split('@')[0]}`;
  
  return {
    id: authResponse.id,
    email: authResponse.email,
    first_name: authResponse.first_name,
    last_name: authResponse.last_name,
    user_role: authResponse.user_role,
    // Computed properties for compatibility
    name: fullName,
    handle: handle,
    role: authResponse.user_role,
    status: 'active' as const,
    joinedAt: new Date().toISOString(),
    stats: {
      articlesPublished: 0,
      totalViews: 0,
      totalReactions: 0,
      totalComments: 0,
      followers: 0,
      following: 0,
    },
  };
}

// Auth API functions - All requests tunneled to external API using axios
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<{ user: User; token: string; refreshToken: string }> => {
    try {
      // console.log('Login API credentials:', credentials);
      
      const response = await apiClient.post('/auth/login/', credentials);
      const authResponse = response.data as AuthResponse;
      
      // Transform API response to our format
      const user = transformAuthResponseToUser(authResponse);
      
      return {
        user,
        token: authResponse.access_token,
        refreshToken: authResponse.refresh_token,
      };
    } catch (error) {
      console.error('Login API error:', error);
      throw new Error(extractCorrectErrorMessage(error, 'Login failed. Please try again.'));
    }
  },

  register: async (data: RegisterData): Promise<{ user: User; token: string; refreshToken: string }> => {
    try {
      const response = await apiClient.post('/auth/register/', data);
      const authResponse = response.data as AuthResponse;
      
      // Transform API response to our format
      const user = transformAuthResponseToUser(authResponse);
      
      return {
        user,
        token: authResponse.access_token,
        refreshToken: authResponse.refresh_token,
      };
    } catch (error) {
      console.error('Register API error:', error);
      throw new Error(extractCorrectErrorMessage(error, 'Registration failed. Please try again.'));
    }
  },

  logout: async (): Promise<void> => {
    try {
      const token = tokenManager.getToken();
      if (!token) return;

      await apiClient.post('/auth/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Logout API error:', error);
      // Don't throw error for logout - always clear local state
    }
  },

  refreshToken: async (refreshToken: string): Promise<{ user: User; token: string; refreshToken: string }> => {
    try {
      const response = await apiClient.post('/auth/refresh', { refreshToken });
      const authResponse = response.data as AuthResponse;
      
      // Transform API response to our format
      const user = transformAuthResponseToUser(authResponse);
      
      return {
        user,
        token: authResponse.access_token,
        refreshToken: authResponse.refresh_token,
      };
    } catch (error) {
      console.error('Refresh token API error:', error);
      throw new Error(extractCorrectErrorMessage(error, 'Token refresh failed'));
    }
  },

  getCurrentUser: async (): Promise<User | null> => {
    try {
      const token = tokenManager.getToken();
      if (!token) return null;

      const response = await apiClient.get('/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Transform API response to our User format
      const userData = response.data;
      if (userData.id && userData.email) {
        return transformAuthResponseToUser(userData as AuthResponse);
      }
      
      return null;
    } catch (error: TsFixme) {
      console.error('Get current user API error:', error);
      
      if (error.response?.status === 401) {
        // Token expired, try to refresh
        const refreshToken = tokenManager.getRefreshToken();
        if (refreshToken) {
          try {
            const refreshResponse = await authApi.refreshToken(refreshToken);
            tokenManager.setToken(refreshResponse.token);
            if (refreshResponse.refreshToken) {
              tokenManager.setRefreshToken(refreshResponse.refreshToken);
            }
            return refreshResponse.user;
          } catch {
            // Refresh failed, clear tokens
            tokenManager.removeToken();
            return null;
          }
        } else {
          tokenManager.removeToken();
          return null;
        }
      }
      
      return null;
    }
  },

  updateProfile: async (updates: Partial<User>): Promise<User> => {
    try {
      const token = tokenManager.getToken();
      if (!token) throw new Error('No authentication token');

      const response = await apiClient.patch('/auth/profile', updates, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.data.user || response.data;
    } catch (error) {
      console.error('Update profile API error:', error);
      throw new Error(extractCorrectErrorMessage(error, 'Profile update failed'));
    }
  },
};

// Token management
export const tokenManager = {
  setToken: (token: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      // Also set cookie for server-side access
      document.cookie = `auth_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
    }
  },

  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  },

  removeToken: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('refresh_token');
      // Also remove cookie
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  },

  setRefreshToken: (refreshToken: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('refresh_token', refreshToken);
      // Also set cookie for server-side access
      document.cookie = `refresh_token=${refreshToken}; path=/; max-age=${30 * 24 * 60 * 60}; secure; samesite=strict`;
    }
  },

  getRefreshToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refresh_token');
    }
    return null;
  },
};

// Role-based access control
export const hasRole = (user: User | null, role: string): boolean => {
  return user?.user_role === role || user?.role === role;
};

export const hasAnyRole = (user: User | null, roles: string[]): boolean => {
  if (!user) return false;
  return roles.includes(user.user_role) || roles.includes(user.role);
};

export const canCreateArticles = (user: User | null): boolean => {
  return hasAnyRole(user, ['creator', 'system_admin']);
};

export const canApproveContent = (user: User | null): boolean => {
  return hasRole(user, 'system_admin');
};

export const canManageUsers = (user: User | null): boolean => {
  return hasRole(user, 'system_admin');
};

export const canRequestCreatorRole = (user: User | null): boolean => {
  return hasRole(user, 'user');
};

export const isActive = (user: User | null): boolean => {
  return user?.status === 'active';
};
