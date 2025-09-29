"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  UserPlus,
  CheckCircle,
  AlertCircle,
  Star,
  Clock,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { useRole } from "@/hooks/use-role";
import {
  useCreatorRequests,
  useSubmitCreatorRequest,
} from "@/features/creator/query";

export default function RequestCreatorPage() {
  const { user, canRequestCreatorRole } = useRole();
  const [reason, setReason] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    data: requests = [],
    isPending: isLoadingRequests,
    isError,
    error,
  } = useCreatorRequests(Boolean(user), user?.id);
  const submitMutation = useSubmitCreatorRequest();

  const pendingRequests = useMemo(
    () => requests.filter((request) => request.status === "pending"),
    [requests]
  );

  const handleSubmit = async () => {
    if (!reason.trim()) return;

    try {
      await submitMutation.mutateAsync(reason.trim());
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit role request:", error);
    }
  };

  if (!canRequestCreatorRole()) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You already have creator access or are not eligible to request
                it.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-green-500" />
                <CardTitle>Request Submitted Successfully</CardTitle>
              </div>
              <CardDescription>
                Your request to become a creator has been submitted.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                <p className="text-sm text-green-800 dark:text-green-200">
                  Our team will review your application and get back to you
                  within 24-48 hours. You&apos;ll receive an email notification
                  once your request has been processed.
                </p>
              </div>
              <div className="flex space-x-2">
                <Button asChild>
                  <Link href="/articles">Browse Articles</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Go Home</Link>
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Request Creator Access</h1>
          <p className="text-muted-foreground">
            Join our community of content creators and share your knowledge
          </p>
        </div>

        {/* View Existing Requests */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Your Creator Requests</span>
                  </CardTitle>
                  <CardDescription>
                    Track the status of your creator role applications
                  </CardDescription>
                </div>
                {requests.length > 0 && (
                  <Link href="/request-creator/status">
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      View All Requests
                    </Button>
                  </Link>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isLoadingRequests ? (
                <div className="flex flex-col items-center justify-center py-8 text-sm text-muted-foreground">
                  <div className="animate-spin h-6 w-6 border-b-2 border-primary rounded-full mb-3" />
                  Loading your requests...
                </div>
              ) : isError ? (
                <div className="flex items-center space-x-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span>{error?.message ?? "Failed to load creator role requests."}</span>
                </div>
              ) : requests.length === 0 ? (
                <div className="text-center py-4 text-sm text-muted-foreground">
                  You have not submitted any creator requests yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {requests.map((request) => {
                    const submittedOn = new Date(request.created_at).toLocaleDateString();
                    const badgeVariant =
                      request.status === "approved"
                        ? "default"
                        : request.status === "revoked"
                        ? "destructive"
                        : "secondary";
                    const badgeLabel =
                      request.status === "pending"
                        ? "Pending review"
                        : request.status === "approved"
                        ? "Approved"
                        : "Revoked";

                    return (
                      <div
                        key={request.id}
                        className="flex flex-col gap-3 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
                      >
                        <div className="flex items-start gap-3">
                          <Clock className="mt-1 h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">
                              Submitted on {submittedOn}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {request.reason}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-1 text-right">
                          <Badge variant={badgeVariant}>{badgeLabel}</Badge>
                          <p className="text-xs text-muted-foreground">
                            Updated {new Date(request.updated_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  {pendingRequests.length > 0 && (
                    <div className="text-center py-4 text-sm text-muted-foreground">
                      You have {pendingRequests.length} pending request{pendingRequests.length > 1 ? "s" : ""}.
                      Check back for updates or view all your requests.
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <UserPlus className="w-6 h-6 text-primary" />
                  <CardTitle>Application Form</CardTitle>
                </div>
                <CardDescription>
                  Tell us about yourself and why you want to become a creator
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">
                    Current Role: {user?.user_role}
                  </Badge>
                  <Badge variant="secondary">Requesting: Creator</Badge>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">
                    Why do you want to become a creator?
                  </Label>
                  <Textarea
                    id="reason"
                    placeholder="Tell us about your background, expertise, and what kind of content you plan to create. Be specific about your experience and how you can contribute to the African tech community..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="min-h-[200px]"
                  />
                  <p className="text-sm text-muted-foreground">
                    {reason.length}/1000 characters
                  </p>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium">
                        What happens after you submit?
                      </p>
                      <ul className="mt-1 space-y-1 text-muted-foreground">
                        <li>
                          • Our team will review your application within 24-48
                          hours
                        </li>
                        <li>
                          • You&apos;ll receive an email notification of the
                          decision
                        </li>
                        <li>
                          • If approved, you&apos;ll gain access to the creator
                          dashboard
                        </li>
                        <li>
                          • You can start writing and publishing articles
                          immediately
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!reason.trim() || submitMutation.isPending}
                  className="w-full"
                >
                  {submitMutation.isPending
                    ? "Submitting..."
                    : "Submit Application"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Creator Benefits</CardTitle>
                <CardDescription>
                  What you&apos;ll get as a creator
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Publish Articles</p>
                    <p className="text-sm text-muted-foreground">
                      Share your knowledge and insights
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Build Your Audience</p>
                    <p className="text-sm text-muted-foreground">
                      Grow your following and influence
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Analytics Dashboard</p>
                    <p className="text-sm text-muted-foreground">
                      Track your content performance
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Community Access</p>
                    <p className="text-sm text-muted-foreground">
                      Connect with other creators
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
                <CardDescription>What we look for in creators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <p className="text-sm">
                    Relevant experience in tech, business, or related fields
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <p className="text-sm">
                    Clear writing ability and communication skills
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <p className="text-sm">
                    Commitment to sharing valuable content
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <p className="text-sm">
                    Understanding of African tech ecosystem
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
