"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Plus, 
  Edit, 
  Eye, 
  Heart, 
  MessageCircle, 
  Calendar,
  MoreHorizontal,
  Trash2,
  ExternalLink,
  TrendingUp,
  BarChart3,
  Users,
  Clock,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  BookOpen,
  Target,
  Zap,
  Bookmark,
  History,
  Save,
  User,
  Mail,
  Globe,
  Bell,
  Shield,
  Palette,
  Monitor,
  Sun,
  Moon
} from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUserProfile } from "@/features/user/hooks";

export default function DashboardSettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "privacy" | "appearance">("profile");
  const [isSaving, setIsSaving] = useState(false);

  const { data: userProfile } = useUserProfile();

  // Mock settings state
  const [settings, setSettings] = useState({
    profile: {
      name: userProfile?.name || "Dr. Sarah Johnson",
      email: userProfile?.email || "sarah@example.com",
      handle: userProfile?.handle || "sarahj",
      bio: userProfile?.bio || "AI researcher and tech entrepreneur passionate about building solutions for African challenges.",
      location: userProfile?.location || "Cape Town, South Africa",
      website: userProfile?.website || "https://sarahjohnson.dev",
      avatarUrl: userProfile?.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      newFollower: true,
      newComment: true,
      newReaction: false,
      weeklyDigest: true,
      marketingEmails: false
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      showLocation: true,
      allowDirectMessages: true,
      showReadHistory: false
    },
    appearance: {
      theme: "system",
      language: "en",
      timezone: "Africa/Johannesburg",
      dateFormat: "MM/DD/YYYY"
    }
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    // Show success message
  };

  const tabs = [
    { id: "profile", name: "Profile", icon: User, description: "Manage your profile information" },
    { id: "notifications", name: "Notifications", icon: Bell, description: "Control your notification preferences" },
    { id: "privacy", name: "Privacy", icon: Shield, description: "Manage your privacy settings" },
    { id: "appearance", name: "Appearance", icon: Palette, description: "Customize your experience" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Settings</h1>
                  <p className="text-muted-foreground">
                    Manage your account settings and preferences
                  </p>
                </div>
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>

        {/* Settings Tabs */}
        <Card className="mb-6">
                <CardContent className="p-0">
                  <div className="flex border-b">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex-1 px-6 py-4 text-left hover:bg-muted/50 transition-colors ${
                          activeTab === tab.id ? 'border-b-2 border-primary bg-muted/50' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <tab.icon className="w-4 h-4" />
                          <span className="font-medium">{tab.name}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{tab.description}</p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

        {/* Profile Settings */}
        {activeTab === "profile" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Update your public profile information
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={settings.profile.avatarUrl}
                          alt="Profile"
                          className="w-16 h-16 rounded-full"
                        />
                        <div>
                          <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Change Avatar
                          </Button>
                          <p className="text-xs text-muted-foreground mt-1">
                            JPG, PNG or GIF. Max size 2MB.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={settings.profile.name}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              profile: { ...prev.profile, name: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="handle">Handle</Label>
                          <Input
                            id="handle"
                            value={settings.profile.handle}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              profile: { ...prev.profile, handle: e.target.value }
                            }))}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={settings.profile.email}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                              profile: { ...prev.profile, email: e.target.value }
                            }))}
                        />
                      </div>

                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={settings.profile.bio}
                          onChange={(e) => setSettings(prev => ({
                            ...prev,
                            profile: { ...prev.profile, bio: e.target.value }
                          }))}
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={settings.profile.location}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              profile: { ...prev.profile, location: e.target.value }
                            }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            value={settings.profile.website}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              profile: { ...prev.profile, website: e.target.value }
                            }))}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

        {/* Notification Settings */}
        {activeTab === "notifications" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>
                        Choose how you want to be notified about activity
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={settings.notifications.emailNotifications}
                          onCheckedChange={(checked) => setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, emailNotifications: checked }
                          }))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={settings.notifications.pushNotifications}
                          onCheckedChange={(checked) => setSettings(prev => ({
                            ...prev,
                            notifications: { ...prev.notifications, pushNotifications: checked }
                          }))}
                        />
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Specific Notifications</h4>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="new-follower">New Follower</Label>
                            <p className="text-sm text-muted-foreground">When someone follows you</p>
                          </div>
                          <Switch
                            id="new-follower"
                            checked={settings.notifications.newFollower}
                            onCheckedChange={(checked) => setSettings(prev => ({
                              ...prev,
                              notifications: { ...prev.notifications, newFollower: checked }
                            }))}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="new-comment">New Comment</Label>
                            <p className="text-sm text-muted-foreground">When someone comments on your articles</p>
                          </div>
                          <Switch
                            id="new-comment"
                            checked={settings.notifications.newComment}
                            onCheckedChange={(checked) => setSettings(prev => ({
                              ...prev,
                              notifications: { ...prev.notifications, newComment: checked }
                            }))}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="new-reaction">New Reaction</Label>
                            <p className="text-sm text-muted-foreground">When someone reacts to your articles</p>
                          </div>
                          <Switch
                            id="new-reaction"
                            checked={settings.notifications.newReaction}
                            onCheckedChange={(checked) => setSettings(prev => ({
                              ...prev,
                              notifications: { ...prev.notifications, newReaction: checked }
                            }))}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="weekly-digest">Weekly Digest</Label>
                            <p className="text-sm text-muted-foreground">Weekly summary of your content performance</p>
                          </div>
                          <Switch
                            id="weekly-digest"
                            checked={settings.notifications.weeklyDigest}
                            onCheckedChange={(checked) => setSettings(prev => ({
                              ...prev,
                              notifications: { ...prev.notifications, weeklyDigest: checked }
                            }))}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="marketing-emails">Marketing Emails</Label>
                            <p className="text-sm text-muted-foreground">Product updates and promotional content</p>
                          </div>
                          <Switch
                            id="marketing-emails"
                            checked={settings.notifications.marketingEmails}
                            onCheckedChange={(checked) => setSettings(prev => ({
                              ...prev,
                              notifications: { ...prev.notifications, marketingEmails: checked }
                            }))}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

        {/* Privacy Settings */}
        {activeTab === "privacy" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Privacy Settings</CardTitle>
                      <CardDescription>
                        Control who can see your information and content
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="profile-visibility">Profile Visibility</Label>
                          <p className="text-sm text-muted-foreground mb-2">Who can see your profile</p>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" className="w-full justify-between">
                                {settings.privacy.profileVisibility === "public" ? "Public" : "Private"}
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full">
                              <DropdownMenuItem onClick={() => setSettings(prev => ({
                                ...prev,
                                privacy: { ...prev.privacy, profileVisibility: "public" }
                              }))}>
                                Public
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setSettings(prev => ({
                                ...prev,
                                privacy: { ...prev.privacy, profileVisibility: "private" }
                              }))}>
                                Private
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="show-email">Show Email</Label>
                              <p className="text-sm text-muted-foreground">Display your email on your profile</p>
                            </div>
                            <Switch
                              id="show-email"
                              checked={settings.privacy.showEmail}
                              onCheckedChange={(checked) => setSettings(prev => ({
                                ...prev,
                                privacy: { ...prev.privacy, showEmail: checked }
                              }))}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="show-location">Show Location</Label>
                              <p className="text-sm text-muted-foreground">Display your location on your profile</p>
                            </div>
                            <Switch
                              id="show-location"
                              checked={settings.privacy.showLocation}
                              onCheckedChange={(checked) => setSettings(prev => ({
                                ...prev,
                                privacy: { ...prev.privacy, showLocation: checked }
                              }))}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="allow-dm">Allow Direct Messages</Label>
                              <p className="text-sm text-muted-foreground">Let other users send you direct messages</p>
                            </div>
                            <Switch
                              id="allow-dm"
                              checked={settings.privacy.allowDirectMessages}
                              onCheckedChange={(checked) => setSettings(prev => ({
                                ...prev,
                                privacy: { ...prev.privacy, allowDirectMessages: checked }
                              }))}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="show-read-history">Show Read History</Label>
                              <p className="text-sm text-muted-foreground">Display your reading history on your profile</p>
                            </div>
                            <Switch
                              id="show-read-history"
                              checked={settings.privacy.showReadHistory}
                              onCheckedChange={(checked) => setSettings(prev => ({
                                ...prev,
                                privacy: { ...prev.privacy, showReadHistory: checked }
                              }))}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

        {/* Appearance Settings */}
        {activeTab === "appearance" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Appearance Settings</CardTitle>
                      <CardDescription>
                        Customize your experience and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="theme">Theme</Label>
                        <p className="text-sm text-muted-foreground mb-2">Choose your preferred theme</p>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                              {settings.appearance.theme === "system" ? "System" : 
                               settings.appearance.theme === "light" ? "Light" : "Dark"}
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-full">
                            <DropdownMenuItem onClick={() => setSettings(prev => ({
                              ...prev,
                              appearance: { ...prev.appearance, theme: "system" }
                            }))}>
                              <Monitor className="w-4 h-4 mr-2" />
                              System
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSettings(prev => ({
                              ...prev,
                              appearance: { ...prev.appearance, theme: "light" }
                            }))}>
                              <Sun className="w-4 h-4 mr-2" />
                              Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSettings(prev => ({
                              ...prev,
                              appearance: { ...prev.appearance, theme: "dark" }
                            }))}>
                              <Moon className="w-4 h-4 mr-2" />
                              Dark
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div>
                        <Label htmlFor="language">Language</Label>
                        <p className="text-sm text-muted-foreground mb-2">Choose your preferred language</p>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                              English
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-full">
                            <DropdownMenuItem>English</DropdownMenuItem>
                            <DropdownMenuItem>Français</DropdownMenuItem>
                            <DropdownMenuItem>Español</DropdownMenuItem>
                            <DropdownMenuItem>العربية</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div>
                        <Label htmlFor="timezone">Timezone</Label>
                        <p className="text-sm text-muted-foreground mb-2">Your local timezone</p>
                        <Input
                          id="timezone"
                          value={settings.appearance.timezone}
                          readOnly
                        />
                      </div>

                      <div>
                        <Label htmlFor="date-format">Date Format</Label>
                        <p className="text-sm text-muted-foreground mb-2">How dates are displayed</p>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between">
                              {settings.appearance.dateFormat}
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-full">
                            <DropdownMenuItem onClick={() => setSettings(prev => ({
                              ...prev,
                              appearance: { ...prev.appearance, dateFormat: "MM/DD/YYYY" }
                            }))}>
                              MM/DD/YYYY
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSettings(prev => ({
                              ...prev,
                              appearance: { ...prev.appearance, dateFormat: "DD/MM/YYYY" }
                            }))}>
                              DD/MM/YYYY
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSettings(prev => ({
                              ...prev,
                              appearance: { ...prev.appearance, dateFormat: "YYYY-MM-DD" }
                            }))}>
                              YYYY-MM-DD
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
        </div>
        )}
      </div>
    </div>
  );
}
