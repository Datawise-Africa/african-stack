"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Bookmark, 
  History, 
  Users, 
  Settings,
  Clock} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import { AuthGuard } from "@/components/auth-guard";

export default function UserDashboardPage() {
  const { user } = useAuth();

  return (
    <AuthGuard requireAuth={true} allowedRoles={['user']}>
      <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">User Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || "User"}! Here&apos;s your personal dashboard.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bookmarked Articles</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <Bookmark className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Articles you&apos;ve saved
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Read History</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <History className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Articles you&apos;ve read
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Reading Time</p>
                  <p className="text-2xl font-bold">0h</p>
                </div>
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Total time spent reading
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Your Role</p>
                  <p className="text-2xl font-bold capitalize">{user?.user_role || user?.role}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Current account type
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                What would you like to do?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-start">
                <Link href="/articles">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Articles
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/dashboard/bookmarks">
                  <Bookmark className="w-4 h-4 mr-2" />
                  View Bookmarks
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/dashboard/history">
                  <History className="w-4 h-4 mr-2" />
                  Read History
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link href="/request-creator">
                  <Users className="w-4 h-4 mr-2" />
                  Become a Creator
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                Manage your account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{user?.name || 'User'}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user?.user_role || user?.role}</p>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/profile">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookmarks</CardTitle>
              <CardDescription>
                Your recently saved articles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Bookmark className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No bookmarks yet</p>
                <p className="text-sm">Start exploring articles to bookmark your favorites</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reading History</CardTitle>
              <CardDescription>
                Articles you&apos;ve recently read
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No reading history yet</p>
                <p className="text-sm">Start reading articles to build your history</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </AuthGuard>
  );
}
