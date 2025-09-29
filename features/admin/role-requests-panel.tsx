import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Clock,
  RefreshCw,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";

import type {
  BecomeCreatorRequest,
  CreatorRequestStatus,
} from "@/features/creator/query";
import { useUpdateCreatorRequestStatus } from "@/features/creator/query";

interface RoleRequestsPanelProps {
  requests: BecomeCreatorRequest[];
  summary: {
    total: number;
    pending: number;
    approved: number;
    revoked: number;
  };
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  onRefetch: () => void;
}

export function RoleRequestsPanel({
  requests,
  summary,
  isLoading,
  isError,
  errorMessage,
  onRefetch,
}: RoleRequestsPanelProps) {
  const updateMutation = useUpdateCreatorRequestStatus();

  const [dialogState, setDialogState] = useState<{
    request: BecomeCreatorRequest;
    action: CreatorRequestStatus;
  } | null>(null);

  const isMutating = updateMutation.isPending;
  const activeId = updateMutation.variables?.id;
  const mutationError = updateMutation.error?.message;

  const closeDialog = () => {
    if (!isMutating) {
      setDialogState(null);
    }
  };

  const handleStatusUpdate = () => {
    if (!dialogState) return;
    const { request, action } = dialogState;
    updateMutation.mutate(
      { id: request.id, status: action },
      {
        onSuccess: () => {
          onRefetch();
          setDialogState(null);
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Role Requests</CardTitle>
            <CardDescription>Users requesting creator access</CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary">{summary.pending} pending</Badge>
            <Badge variant="outline">{summary.approved} approved</Badge>
            <Badge variant="outline">{summary.revoked} revoked</Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={onRefetch}
              disabled={isLoading}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8 text-sm text-muted-foreground">
            <div className="mb-3 h-6 w-6 animate-spin rounded-full border-b-2 border-primary" />
            Loading role requests...
          </div>
        ) : isError ? (
          <div className="flex items-center space-x-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            <Clock className="h-4 w-4" />
            <span>{errorMessage ?? "Failed to load creator requests."}</span>
          </div>
        ) : requests.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No role requests found.
          </div>
        ) : (
          requests
            .slice()
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((request) => {
              const badgeVariant =
                request.status === "approved"
                  ? "default"
                  : request.status === "revoked"
                  ? "destructive"
                  : "secondary";
              const badgeLabel =
                request.status === "approved"
                  ? "Approved"
                  : request.status === "revoked"
                  ? "Revoked"
                  : "Pending";

              return (
                <div key={request.id} className="rounded-lg border p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">
                          {request.first_name} {request.last_name}
                        </h4>
                        <Badge variant="outline">{request.user_email}</Badge>
                        <Badge variant={badgeVariant}>{badgeLabel}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {request.reason}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Submitted{" "}
                        {new Date(request.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex shrink-0 space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          setDialogState({ request, action: "revoked" })
                        }
                      >
                        <XCircle className="mr-1 h-4 w-4" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          setDialogState({ request, action: "approved" })
                        }
                      >
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Approve
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
        )}
      </CardContent>

      <Dialog open={Boolean(dialogState)} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-lg">
          {dialogState && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {dialogState.action === "approved" ? "Approve" : "Reject"}{" "}
                  request
                  <Badge
                    variant={
                      dialogState.action === "approved"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {dialogState.action}
                  </Badge>
                </DialogTitle>
                <DialogDescription>
                  Review the details below before confirming this action.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Requester</p>
                  <p className="text-sm text-muted-foreground">
                    {dialogState.request.first_name}{" "}
                    {dialogState.request.last_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {dialogState.request.user_email}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Reason</p>
                  <p className="text-sm text-muted-foreground">
                    {dialogState.request.reason}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>
                    Submitted{" "}
                    {new Date(dialogState.request.created_at).toLocaleString()}
                  </span>
                  <ArrowRight className="h-3 w-3" />
                  <span>
                    Last updated{" "}
                    {new Date(dialogState.request.updated_at).toLocaleString()}
                  </span>
                </div>
                {mutationError && (
                  <div className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                    {mutationError}
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={closeDialog}
                  disabled={isMutating}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleStatusUpdate}
                  disabled={isMutating}
                  variant={
                    dialogState.action === "approved"
                      ? "default"
                      : "destructive"
                  }
                >
                  {isMutating && activeId === dialogState.request.id
                    ? "Saving..."
                    : dialogState.action === "approved"
                    ? "Approve"
                    : "Reject"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
