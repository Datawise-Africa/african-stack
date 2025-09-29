"use client";

import { useCallback, useMemo } from "react";

import { useAuth } from "@/contexts/auth-context";
import type { User, UserRole } from "@/lib/types";

type UserStatus = "active" | "suspended" | "pending_approval";

type ExtendedUser = {
  status?: UserStatus;
};

type SessionUser = (User & ExtendedUser) | null;

export function useRole() {
  const { user, isLoading } = useAuth();

  const resolvedUser = useMemo<SessionUser>(() => {
    if (!user) return null;

    return {
      ...user,
      role: user.role ?? user.user_role,
      user_role: user.user_role ?? user.role,
    };
  }, [user]);

  const resolvedRole = resolvedUser?.role ?? resolvedUser?.user_role ?? null;

  const hasRole = useCallback(
    (role: UserRole) => resolvedRole === role,
    [resolvedRole]
  );

  const hasAnyRole = useCallback(
    (roles: UserRole[]) => {
      if (!resolvedRole) return false;
      return roles.includes(resolvedRole as UserRole);
    },
    [resolvedRole]
  );

  const canCreateArticles = useCallback(() => {
    if (!resolvedRole) return false;
    return resolvedRole === "creator" || resolvedRole === "system_admin";
  }, [resolvedRole]);

  const canApproveContent = useCallback(() => {
    return resolvedRole === "system_admin";
  }, [resolvedRole]);

  const canManageUsers = useCallback(() => {
    return resolvedRole === "system_admin";
  }, [resolvedRole]);

  const canRequestCreatorRole = useCallback(() => {
    return resolvedRole === "user";
  }, [resolvedRole]);

  const isActive = useCallback(() => {
    if (!resolvedUser) return false;
    const status = resolvedUser.status;
    if (!status) return true;
    return status === "active";
  }, [resolvedUser]);

  const isPendingApproval = useCallback(() => {
    if (!resolvedUser) return false;
    const status = resolvedUser.status;
    return status === "pending_approval";
  }, [resolvedUser]);

  return {
    user: resolvedUser,
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
