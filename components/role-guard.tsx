"use client";

import { ReactNode } from "react";
import { useRole } from "@/hooks/use-role";
import { UserRole } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Lock, UserPlus } from "lucide-react";
import Link from "next/link";

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: ReactNode;
  requireActive?: boolean;
}

export function RoleGuard({ 
  children, 
  allowedRoles, 
  fallback,
  requireActive = true 
}: RoleGuardProps) {
  const { 
    user,
    isLoading, 
    hasAnyRole, 
    isActive, 
    isPendingApproval,
    canRequestCreatorRole 
  } = useRole();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Lock className="w-6 h-6 text-muted-foreground" />
                <CardTitle>Sign In Required</CardTitle>
              </div>
              <CardDescription>
                Please sign in to access this section of the dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/auth/login">Go to Login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Check if user is active (if required)
  if (requireActive && !isActive()) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                <CardTitle>Account Suspended</CardTitle>
              </div>
              <CardDescription>
                Your account has been suspended. Please contact support for assistance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/contact">Contact Support</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Check if user has pending approval
  if (isPendingApproval()) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <UserPlus className="w-6 h-6 text-blue-500" />
                <CardTitle>Account Pending Approval</CardTitle>
              </div>
              <CardDescription>
                Your account is pending approval. You&apos;ll receive an email notification once it&apos;s reviewed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This usually takes 24-48 hours. In the meantime, you can browse and read articles.
              </p>
              <Button asChild>
                <Link href="/articles">Browse Articles</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Check if user has required role
  if (!hasAnyRole(allowedRoles)) {
    if (fallback) {
      return <>{fallback}</>;
    }

    // Default fallback based on what they're trying to access
    if (allowedRoles.includes("author") && canRequestCreatorRole()) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Lock className="w-6 h-6 text-muted-foreground" />
                  <CardTitle>Creator Access Required</CardTitle>
                </div>
                <CardDescription>
                  You need creator access to {allowedRoles.includes("admin") ? "access this feature" : "create and manage articles"}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  As a creator, you&apos;ll be able to write and publish articles on African Stack. 
                  Our team will review your application and get back to you within 24-48 hours.
                </p>
                <div className="flex space-x-2">
                  <Button asChild>
                    <Link href="/request-creator">Request Creator Access</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/articles">Browse Articles</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Lock className="w-6 h-6 text-muted-foreground" />
                <CardTitle>Access Denied</CardTitle>
              </div>
              <CardDescription>
                You don&apos;t have permission to access this feature.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/">Go Home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
