"use client";

import { ReactNode } from "react";
import { SharedDashboardLayout } from "@/components/shared-dashboard-layout";
import { AuthGuard } from "@/components/auth-guard";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthGuard requireAuth={true} allowedRoles={['system_admin']}>
      <SharedDashboardLayout>
        {children}
      </SharedDashboardLayout>
    </AuthGuard>
  );
}
