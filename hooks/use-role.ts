"use client";

import { useState, useEffect } from "react";
import { UserRole } from "@/lib/types";

// Mock user data - in a real app, this would come from auth context
const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  handle: "@johndoe",
  role: "system_admin" as UserRole, // Changed to system_admin for testing
  status: "active" as "active" | "suspended" | "pending_approval",
  joinedAt: "2024-01-01T00:00:00Z",
  stats: {
    articlesPublished: 0,
    totalViews: 0,
    totalReactions: 0,
    totalComments: 0,
    followers: 0,
    following: 0,
  }
};

export function useRole() {
  const [user, setUser] = useState(mockUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const hasRole = (role: UserRole) => {
    return user.role === role;
  };

  const hasAnyRole = (roles: UserRole[]) => {
    return roles.includes(user.role);
  };

  const canCreateArticles = () => {
    return user.role === "creator" || user.role === "system_admin";
  };

  const canApproveContent = () => {
    return user.role === "system_admin";
  };

  const canManageUsers = () => {
    return user.role === "system_admin";
  };

  const canRequestCreatorRole = () => {
    return user.role === "user";
  };

  const isActive = () => {
    return user.status === "active";
  };

  const isPendingApproval = () => {
    return user.status === "pending_approval" as const;
  };

  return {
    user,
    isLoading,
    hasRole,
    hasAnyRole,
    canCreateArticles,
    canApproveContent,
    canManageUsers,
    canRequestCreatorRole,
    isActive,
    isPendingApproval,
  };
}
