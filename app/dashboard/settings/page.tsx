"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Save, Bell, Shield } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useRole } from "@/hooks/use-role";
import { maskSensitiveValue } from "@/lib/utils";

const DEFAULT_PROFILE = {
  id: "",
  maskedId: "",
  name: "User",
  roleLabel: "user",
  handle: "",
  email: "",
  maskedEmail: "",
  initials: "U",
};

type ActiveTab = "profile" | "notifications";

export default function DashboardSettingsPage() {
  const { user, isLoading } = useRole();
  const [activeTab, setActiveTab] = useState<ActiveTab>("profile");
  const [isSaving, setIsSaving] = useState(false);

  const derivedProfile = useMemo(() => {
    if (!user) {
      return DEFAULT_PROFILE;
    }

    const email = user.email ?? "";
    const trimmedName = user.name?.trim() ?? "";
    const fallbackName = [user.first_name, user.last_name].filter(Boolean).join(" ");
    const name = trimmedName || fallbackName || "User";
    const handle = user.handle || (email ? `@${email.split("@")[0]}` : "");
    const roleLabel = (user.role ?? user.user_role ?? "user").replace(/_/g, " ");

    const source = name || email || handle;
    const initials = source
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((segment) => segment[0]?.toUpperCase() ?? "")
      .join("")
      .trim() || "U";

    return {
      id: user.id ?? "",
      maskedId: maskSensitiveValue(user.id ?? "", 3, 2),
      name,
      roleLabel,
      handle,
      email,
      maskedEmail: maskSensitiveValue(email, 2, 2),
      initials,
    };
  }, [user]);

  const profileDefaults = useMemo(
    () => ({
      name: derivedProfile.name,
      handle: derivedProfile.handle,
      email: derivedProfile.email,
      bio: "",
    }),
    [derivedProfile]
  );

  const [profileForm, setProfileForm] = useState(profileDefaults);
  const [notifications, setNotifications] = useState({
    weeklyDigest: true,
    commentAlerts: true,
    productAnnouncements: false,
  });
  const [privacy, setPrivacy] = useState({
    showEmail: false,
    allowMessages: true,
  });

  useEffect(() => {
    setProfileForm(profileDefaults);
  }, [profileDefaults]);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardContent className="py-12 text-center">
              <div className="animate-spin h-8 w-8 border-b-2 border-primary rounded-full mx-auto" />
              <p className="mt-4 text-muted-foreground">Loading your settings...</p>
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
              <CardTitle>We couldn&apos;t load your settings</CardTitle>
              <CardDescription>Please sign in again to continue.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                You may have been signed out or your session expired.
              </p>
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
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Account settings</h1>
            <p className="text-muted-foreground">
              Manage your profile details and communication preferences.
            </p>
          </div>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save changes"}
          </Button>
        </div>

        <Card>
          <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between py-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 text-lg">
                <AvatarFallback>{derivedProfile.initials}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold leading-none">
                    {derivedProfile.name}
                  </h2>
                  <Badge variant="secondary" className="capitalize">
                    {derivedProfile.roleLabel}
                  </Badge>
                </div>
                {derivedProfile.handle && (
                  <p className="text-sm text-muted-foreground">{derivedProfile.handle}</p>
                )}
                {derivedProfile.maskedEmail && (
                  <p className="text-xs text-muted-foreground">{derivedProfile.maskedEmail}</p>
                )}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              User ID: <span className="font-medium">{derivedProfile.maskedId}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 py-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Name</p>
              <p>{derivedProfile.name}</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Email</p>
              <p>{derivedProfile.maskedEmail || "—"}</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Handle</p>
              <p>{derivedProfile.handle || "Not set"}</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Role</p>
              <p className="capitalize">{derivedProfile.roleLabel}</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button
            variant={activeTab === "profile" ? "default" : "outline"}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </Button>
          <Button
            variant={activeTab === "notifications" ? "default" : "outline"}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </Button>
        </div>

        {activeTab === "profile" && (
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Profile details</CardTitle>
                <CardDescription>
                  These details control how other people see you on African Stack.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Display name</Label>
                    <Input
                      id="name"
                      value={profileForm.name}
                      onChange={(event) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          name: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="handle">Handle</Label>
                    <Input
                      id="handle"
                      value={profileForm.handle}
                      onChange={(event) =>
                        setProfileForm((prev) => ({
                          ...prev,
                          handle: event.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileForm.email}
                    onChange={(event) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    We use your email for account recovery and important updates.
                  </p>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileForm.bio}
                    onChange={(event) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        bio: event.target.value,
                      }))
                    }
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Share a short description about yourself (optional).
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy</CardTitle>
                <CardDescription>Control how others can reach you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Show email</p>
                    <p className="text-sm text-muted-foreground">
                      Display a masked version of your email on your profile.
                    </p>
                  </div>
                  <Switch
                    checked={privacy.showEmail}
                    onCheckedChange={(checked) =>
                      setPrivacy((prev) => ({ ...prev, showEmail: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Allow messages</p>
                    <p className="text-sm text-muted-foreground">
                      Let other members start a conversation with you.
                    </p>
                  </div>
                  <Switch
                    checked={privacy.allowMessages}
                    onCheckedChange={(checked) =>
                      setPrivacy((prev) => ({ ...prev, allowMessages: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Email notifications
                </CardTitle>
                <CardDescription>
                  Choose the updates that should arrive in your inbox.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly digest</p>
                    <p className="text-sm text-muted-foreground">
                      Summary of new content and recommendations.
                    </p>
                  </div>
                  <Switch
                    checked={notifications.weeklyDigest}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, weeklyDigest: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Comment alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when someone comments on your work.
                    </p>
                  </div>
                  <Switch
                    checked={notifications.commentAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, commentAlerts: checked }))
                    }
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Product announcements</p>
                    <p className="text-sm text-muted-foreground">
                      Hear about new features and improvements.
                    </p>
                  </div>
                  <Switch
                    checked={notifications.productAnnouncements}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        productAnnouncements: checked,
                      }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Security tips
                </CardTitle>
                <CardDescription>
                  Recommended actions to keep your account secure.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>
                  • Use a strong, unique password for your account.
                </p>
                <p>
                  • Enable multi-factor authentication when it becomes available.
                </p>
                <p>
                  • Keep your contact email up to date for recovery purposes.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
