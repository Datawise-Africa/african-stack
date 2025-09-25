"use client";

import { ReactNode } from "react";
import { SharedDashboardLayout } from "@/components/shared-dashboard-layout";
import { AuthGuard } from "@/components/auth-guard";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthGuard requireAuth={true}>
      <SharedDashboardLayout>
        {children}
      </SharedDashboardLayout>
    </AuthGuard>
  );
}
