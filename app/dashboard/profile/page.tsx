"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useRole } from "@/hooks/use-role";
import { maskSensitiveValue } from "@/lib/utils";

export default function ProfilePage() {
  const { user, isLoading } = useRole();

  const profile = useMemo(() => {
    if (!user) {
      return {
        id: "",
        maskedId: "",
        name: "User",
        email: "",
        maskedEmail: "",
        handle: "",
        role: "user",
        initials: "U",
      };
    }

    const trimmedName = user.name?.trim() ?? "";
    const fallbackName = [user.first_name, user.last_name].filter(Boolean).join(" ");
    const name = trimmedName || fallbackName || "User";

    const email = user.email ?? "";
    const handle = user.handle || (email ? `@${email.split("@")[0]}` : "");
    const role = (user.role ?? user.user_role ?? "user").replace(/_/g, " ");

    const source = name || email || handle;
    const initials = source
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("")
      .trim() || "U";

    return {
      name,
      email,
      maskedEmail: email,
      handle,
      role,
      initials,
      id: user.id,
      maskedId: maskSensitiveValue(user.id, 0, 2),
    };
  }, [user]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="py-12 text-center">
              <div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full mx-auto" />
              <p className="mt-4 text-muted-foreground">Loading your profile...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>We couldn&apos;t find your profile</CardTitle>
              <CardDescription>
                Please sign in again to continue.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                You may have been signed out or your session expired.
              </div>
              <Button asChild>
                <Link href="/auth/login">Sign in</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <Card>
          <CardContent className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between py-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 text-lg">
                <AvatarFallback>{profile.initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold leading-none">{profile.name}</h1>
                  <Badge variant="secondary" className="capitalize">
                    {profile.role}
                  </Badge>
                </div>
                {profile.handle && (
                  <p className="text-sm text-muted-foreground">{profile.handle}</p>
                )}
                {profile.email && (
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                )}
              </div>
            </div>
            <Button asChild variant="outline">
              <Link href="/dashboard/settings">Edit profile</Link>
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Basic details connected to your African Stack profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground">User ID</p>
                <p className="font-medium break-all">{profile.maskedId}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium">{profile.maskedEmail || "—"}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">Display name</p>
                <p className="font-medium">{profile.name}</p>
              </div>
              <Separator />
              <div>
                <p className="text-muted-foreground">Handle</p>
                <p className="font-medium">{profile.handle || "Not set"}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Profile status</CardTitle>
              <CardDescription>
                Keep your account up to date and request creator access when ready.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="font-medium">Current role</p>
                <p className="text-muted-foreground">
                  {profile.role === "user"
                    ? "You can browse content and interact with articles."
                    : "You have extended permissions on the platform."}
                </p>
              </div>
              <Separator />
              <div>
                <p className="font-medium">Next steps</p>
                <p className="text-muted-foreground">
                  Completeness of your profile helps us personalise your experience. Add any missing details in settings.
                </p>
              </div>
              <Separator />
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm">
                  <Link href="/dashboard/settings">Update details</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link href="/request-creator">Request creator role</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
