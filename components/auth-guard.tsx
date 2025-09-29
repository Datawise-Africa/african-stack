"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/contexts/auth-context";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: string[];
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export function AuthGuard({
  children,
  requireAuth = true,
  allowedRoles = [],
  redirectTo = "/auth/login",
  fallback = <div>Loading...</div>,
}: AuthGuardProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    if (requireAuth && !isAuthenticated) {
      const searchParams = new URLSearchParams();
      if (pathname) {
        searchParams.set("redirect", pathname);
      }
      const query = searchParams.toString();
      router.replace(query ? `${redirectTo}?${query}` : redirectTo);
      return;
    }

    if (
      allowedRoles.length > 0 &&
      user &&
      !allowedRoles.includes(user.user_role) &&
      !allowedRoles.includes(user.role)
    ) {
      router.replace("/unauthorized");
    }
  }, [
    allowedRoles,
    isAuthenticated,
    isLoading,
    redirectTo,
    requireAuth,
    router,
    pathname,
    user,
  ]);

  if (isLoading) {
    return <>{fallback}</>;
  }

  if (requireAuth && !isAuthenticated) {
    return <>{fallback}</>;
  }

  if (
    allowedRoles.length > 0 &&
    user &&
    !allowedRoles.includes(user.user_role) &&
    !allowedRoles.includes(user.role)
  ) {
    return <div>Unauthorized</div>;
  }

  return <>{children}</>;
}

export function withAuthGuard<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<AuthGuardProps, "children"> = {}
) {
  const GuardedComponent = (props: P) => (
    <AuthGuard {...options}>
      <Component {...props} />
    </AuthGuard>
  );
  GuardedComponent.displayName = `WithAuthGuard(${Component.displayName || Component.name || "Component"})`;
  return GuardedComponent;
}

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallback?: React.ReactNode;
}

export function RoleGuard({ children, allowedRoles, fallback }: RoleGuardProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (
    !user ||
    (!allowedRoles.includes(user.user_role) &&
      !allowedRoles.includes(user.role))
  ) {
    return <>{fallback || <div>Access denied</div>}</>;
  }

  return <>{children}</>;
}
