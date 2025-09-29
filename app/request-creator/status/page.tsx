"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, ArrowLeft, CheckCircle2, Clock, RefreshCw } from "lucide-react";

import { AuthGuard } from "@/components/auth-guard";
import { useRole } from "@/hooks/use-role";
import { useCreatorRequests } from "@/features/creator/query";

export default function RequestCreatorStatusPage() {
  const { user } = useRole();
  const {
    data: requests = [],
    isPending,
    isError,
    error,
    refetch,
  } = useCreatorRequests(Boolean(user));

  const summary = useMemo(() => {
    const pending = requests.filter((request) => request.status === "pending");
    const approved = requests.filter((request) => request.status === "approved");
    const revoked = requests.filter((request) => request.status === "revoked");

    return {
      total: requests.length,
      pending: pending.length,
      approved: approved.length,
      revoked: revoked.length,
    };
  }, [requests]);

  return (
    <AuthGuard requireAuth allowedRoles={["user", "author", "admin"]}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <Button variant="ghost" asChild className="mb-4">
                <Link href="/request-creator">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to request page
                </Link>
              </Button>
              <h1 className="text-3xl font-bold">Creator Requests History</h1>
              <p className="text-muted-foreground">
                Review the progress of all your submissions to become a creator.
              </p>
            </div>
            <Button variant="outline" onClick={() => refetch()} disabled={isPending}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Total requests</p>
                <p className="text-2xl font-semibold">{summary.total}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-semibold text-amber-500">
                  {summary.pending}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-semibold text-emerald-600">
                  {summary.approved}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">Revoked</p>
                <p className="text-2xl font-semibold text-rose-500">
                  {summary.revoked}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Submission Timeline</CardTitle>
              <CardDescription>
                Latest requests appear first. Select a request to view more details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isPending ? (
                <div className="flex flex-col items-center justify-center py-10 text-sm text-muted-foreground">
                  <div className="mb-3 h-6 w-6 animate-spin rounded-full border-b-2 border-primary" />
                  Loading your requests...
                </div>
              ) : isError ? (
                <div className="flex items-center space-x-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error?.message ?? "Failed to load creator requests."}</span>
                </div>
              ) : requests.length === 0 ? (
                <div className="py-10 text-center text-sm text-muted-foreground">
                  You have not submitted any creator requests yet.
                </div>
              ) : (
                requests
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                  )
                  .map((request) => {
                    let badgeVariant: "default" | "destructive" | "secondary" = "secondary";
                    let badgeLabel = "Pending review";
                    let BadgeIcon = Clock;

                    if (request.status === "approved") {
                      badgeVariant = "default";
                      badgeLabel = "Approved";
                      BadgeIcon = CheckCircle2;
                    } else if (request.status === "revoked") {
                      badgeVariant = "destructive";
                      badgeLabel = "Revoked";
                      BadgeIcon = AlertCircle;
                    }

                    return (
                      <div
                        key={request.id}
                        className="rounded-lg border p-4"
                      >
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>
                                Submitted {new Date(request.created_at).toLocaleDateString()}
                              </span>
                              <Separator orientation="vertical" />
                              <span>
                                Updated {new Date(request.updated_at).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="font-medium">{request.reason}</p>
                            <p className="text-xs text-muted-foreground">
                              Contact email: {request.user_email}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={badgeVariant}
                              className="flex items-center gap-1 capitalize"
                            >
                              <BadgeIcon className="h-4 w-4" />
                              {badgeLabel}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    );
                  })
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  );
}
