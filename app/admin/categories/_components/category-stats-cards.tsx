"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FolderOpen, Layers, RefreshCw } from "lucide-react";

interface CategoryStatsCardsProps {
  totalCategories: number;
  totalArticles: number;
  isPending: boolean;
  isRefetching: boolean;
}

export function CategoryStatsCards({
  totalCategories,
  totalArticles,
  isPending,
  isRefetching,
}: CategoryStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
          <Layers className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isPending ? "…" : totalCategories}
          </div>
          <p className="text-xs text-muted-foreground">
            Categories available for articles
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Articles Tagged</CardTitle>
          <FolderOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isPending ? "…" : totalArticles}
          </div>
          <p className="text-xs text-muted-foreground">
            Total articles linked to categories
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Last Synced</CardTitle>
          <RefreshCw className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isRefetching ? "Syncing…" : "Up to date"}
          </div>
          <p className="text-xs text-muted-foreground">
            Data refreshes automatically after each change
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
