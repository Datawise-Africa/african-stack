"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { canCreateArticles, canManageUsers } from "@/lib/auth";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push('/auth/login');
      return;
    }

    // Redirect based on user role
    if (canManageUsers(user)) {
      router.push('/admin');
    } else if (canCreateArticles(user)) {
      router.push('/dashboard/creator');
    } else {
      router.push('/dashboard/user');
    }
  }, [user, isLoading, router]);

  // Show loading while redirecting
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Redirecting to your dashboard...</p>
        </div>
      </div>
    </div>
  );
}