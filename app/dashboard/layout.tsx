"use client";

import { ReactNode } from "react";
import { SharedDashboardLayout } from "@/components/shared-dashboard-layout";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SharedDashboardLayout>
      {children}
    </SharedDashboardLayout>
  );
}
