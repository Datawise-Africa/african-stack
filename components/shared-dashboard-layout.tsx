"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import {
  BarChart3,
  BookOpen,
  TrendingUp,
  Calendar,
  Bookmark,
  History,
  Users,
  Target,
  Settings,
  Zap,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  User,
  Shield,
  UserCheck,
  FileText,
  LogOut,
  Bell,
  Home,
  Plus,
  HelpCircle,
  MessageSquare,
  ChevronDown,
  Layers,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { RoleGuard } from "@/components/role-guard";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRole } from "@/hooks/use-role";
import { useAuth } from "@/contexts/auth-context";
import type { UserRole } from "@/lib/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type DashboardNavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  description: string;
  roles: UserRole[];
};

const creatorNavigation: DashboardNavItem[] = [
  {
    name: "Overview",
    href: "/dashboard/creator",
    icon: BarChart3,
    description: "Dashboard overview",
    roles: ["author"],
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
    description: "Your profile and stats",
    roles: ["author"],
  },
  {
    name: "Articles",
    href: "/dashboard/articles",
    icon: BookOpen,
    description: "Manage your articles",
    roles: ["author"],
  },
  {
    name: "Collections",
    href: "/dashboard/collections",
    icon: Layers,
    description: "Organise your article series",
    roles: ["author"],
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: TrendingUp,
    description: "Performance metrics",
    roles: ["author"],
  },
  {
    name: "Content Calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
    description: "Plan your content",
    roles: ["author"],
  },
  {
    name: "Bookmarks",
    href: "/dashboard/bookmarks",
    icon: Bookmark,
    description: "Saved articles",
    roles: ["author"],
  },
  {
    name: "Read History",
    href: "/dashboard/history",
    icon: History,
    description: "Reading history",
    roles: ["author"],
  },
  {
    name: "Audience",
    href: "/dashboard/audience",
    icon: Users,
    description: "Manage followers",
    roles: ["author"],
  },
  {
    name: "Goals",
    href: "/dashboard/goals",
    icon: Target,
    description: "Content goals",
    roles: ["author"],
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    description: "Account settings",
    roles: ["author"],
  },
];

const userNavigation: DashboardNavItem[] = [
  {
    name: "Overview",
    href: "/dashboard/user",
    icon: BarChart3,
    description: "Your dashboard",
    roles: ["user"],
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
    description: "Your profile and stats",
    roles: ["user"],
  },
  {
    name: "Bookmarks",
    href: "/dashboard/bookmarks",
    icon: Bookmark,
    description: "Saved articles",
    roles: ["user"],
  },
  {
    name: "Read History",
    href: "/dashboard/history",
    icon: History,
    description: "Reading history",
    roles: ["user"],
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    description: "Account settings",
    roles: ["user"],
  },
];

const adminNavigation: DashboardNavItem[] = [
  {
    name: "Admin Overview",
    href: "/admin",
    icon: Shield,
    description: "System administration",
    roles: ["admin"],
  },
  {
    name: "User Management",
    href: "/admin/users",
    icon: UserCheck,
    description: "Manage users and roles",
    roles: ["admin"],
  },
  {
    name: "Article Moderation",
    href: "/admin/articles",
    icon: FileText,
    description: "Review and approve articles",
    roles: ["admin"],
  },
  {
    name: "Categories",
    href: "/admin/categories",
    icon: Layers,
    description: "Create and manage blog categories",
    roles: ["admin"],
  },
  {
    name: "Content Moderation",
    href: "/admin/content",
    icon: FileText,
    description: "Approve articles and content",
    roles: ["admin"],
  },
  {
    name: "System Analytics",
    href: "/admin/analytics",
    icon: TrendingUp,
    description: "Platform-wide analytics",
    roles: ["admin"],
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    description: "System settings",
    roles: ["admin"],
  },
];

const dashboardNotifications = [
  {
    id: "notif-1",
    title: "Article published",
    description: "Your article “Building AI Solutions in Africa” is live.",
    href: "/articles/article-1",
    time: "2h ago",
    unread: true,
  },
  {
    id: "notif-2",
    title: "Draft reminder",
    description:
      "Remember to finish “Natural Language Processing for African Languages”.",
    href: "/dashboard/articles/article-5/edit",
    time: "1d ago",
    unread: true,
  },
  {
    id: "notif-3",
    title: "Collection update",
    description: "Readers are engaging with your AI Foundations collection.",
    href: "/dashboard/collections",
    time: "3d ago",
    unread: false,
  },
] as const;
const routeLinks: Map<UserRole, DashboardNavItem[]> = new Map();
routeLinks.set("user", userNavigation);
routeLinks.set("author", creatorNavigation);
routeLinks.set("admin", adminNavigation);
export function SharedDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useRole();
  const { logout } = useAuth();

  const userRole = //user?.role ?? user?.user_role ?? null;
    useMemo(() => {
      if (!user) return null;
      return user.user_role ?? user.user_role ?? null;
    }, [user]);

  // Choose navigation based on current route and user role
  const isAdminRoute = pathname.startsWith("/admin");

  const filteredNavigation = useMemo(() => {
    if (!userRole) return [];
    const currentRoutes = routeLinks.get(userRole!) ?? [];
    return currentRoutes;
  }, [userRole]);

  const displayEmail = user?.email ?? "";
  const displayRoleLabel = (userRole ?? "").replace("_", " ");
  const displayInitials = useMemo(() => {
    const { first_name, last_name } = user ?? {};
    return `${first_name?.[0] ?? "F"}${last_name?.[0] ?? "L"}`.toUpperCase();
  }, [user]);

  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <RoleGuard allowedRoles={["user", "author", "admin"]}>
          <div className="min-h-screen bg-muted/30 flex">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 z-50 bg-black/50 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <div
              className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:fixed lg:inset-y-0 lg:left-0",
                sidebarOpen ? "translate-x-0" : "-translate-x-full",
                sidebarCollapsed && "lg:w-16"
              )}
            >
              <div className="flex h-full flex-col">
                {/* Sidebar header */}
                <div className="flex h-16 items-center justify-between px-4 border-b">
                  {!sidebarCollapsed && (
                    <div className="flex items-center space-x-2">
                      {isAdminRoute ? (
                        <Shield className="h-6 w-6 text-primary" />
                      ) : (
                        <Zap className="h-6 w-6 text-primary" />
                      )}
                      <span className="text-lg font-semibold">
                        {isAdminRoute ? "Admin Panel" : "Dashboard"}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden lg:flex"
                      onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    >
                      {sidebarCollapsed ? (
                        <ChevronRight className="h-4 w-4" />
                      ) : (
                        <ChevronLeft className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Back to Homepage */}
                <div className="px-4 py-2 border-b">
                  <Link
                    href="/"
                    className={cn(
                      "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                      sidebarCollapsed && "justify-center"
                    )}
                    title={sidebarCollapsed ? "Back to Homepage" : undefined}
                  >
                    <Home className="h-4 w-4 flex-shrink-0" />
                    {!sidebarCollapsed && <span>Back to Homepage</span>}
                  </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 p-4">
                  {filteredNavigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                          isActive
                            ? "bg-muted text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                          sidebarCollapsed && "justify-center"
                        )}
                        title={sidebarCollapsed ? item.name : undefined}
                      >
                        <item.icon className="h-4 w-4 flex-shrink-0" />
                        {!sidebarCollapsed && (
                          <div className="flex-1 min-w-0">
                            <div className="truncate">{item.name}</div>
                            <div className="text-xs text-muted-foreground truncate">
                              {item.description}
                            </div>
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {/* Fixed Actions at Bottom */}
                <div className="p-4 border-t space-y-2">
                  {/* Quick Actions */}
                  <div className="space-y-1">
                    {!sidebarCollapsed && (
                      <p className="text-xs font-medium text-muted-foreground px-3 py-1">
                        Quick Actions
                      </p>
                    )}

                    {/* New Article Button (for creators) */}
                    {!isAdminRoute && (
                      <Link
                        href="/dashboard/articles/new"
                        className={cn(
                          "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
                          sidebarCollapsed && "justify-center"
                        )}
                        title={sidebarCollapsed ? "New Article" : undefined}
                      >
                        <Plus className="h-4 w-4 flex-shrink-0" />
                        {!sidebarCollapsed && <span>New Article</span>}
                      </Link>
                    )}

                    {/* Help & Support */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start h-auto p-3",
                            sidebarCollapsed && "px-3"
                          )}
                        >
                          <HelpCircle className="h-4 w-4 flex-shrink-0" />
                          {!sidebarCollapsed && (
                            <>
                              <span className="ml-3">Help & Support</span>
                              <ChevronDown className="ml-auto h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Help & Support</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Contact Support
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <HelpCircle className="mr-2 h-4 w-4" />
                          Documentation
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          User Guide
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Report Bug
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Stats Card */}
                  {!sidebarCollapsed && (
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">
                            {isAdminRoute ? "1,250" : "12"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {isAdminRoute ? "Users" : "Articles"}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>

            {/* Main content */}
            <div
              className={cn(
                "flex-1 flex flex-col min-w-0",
                sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
              )}
            >
              {/* Top bar */}
              <div className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                  <div>
                    <h1 className="text-lg font-semibold">
                      {filteredNavigation.find((item) => item.href === pathname)
                        ?.name || "Dashboard"}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {filteredNavigation.find((item) => item.href === pathname)
                        ?.description || "Manage your content"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Notifications */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-4 w-4" />
                        {dashboardNotifications.filter((item) => item.unread).length > 0 && (
                          <span className="absolute -top-1 -right-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white">
                            {dashboardNotifications.filter((item) => item.unread).length}
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                      <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {(dashboardNotifications.length as number) === 0 ? (
                        <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                          You&apos;re all caught up.
                        </div>
                      ) : (
                        dashboardNotifications.map((notification) => (
                          <DropdownMenuItem
                            asChild
                            key={notification.id}
                            className="whitespace-normal p-4"
                          >
                            <Link href={notification.href} className="flex flex-col gap-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold">
                                  {notification.title}
                                </span>
                                {notification.unread && (
                                  <Badge variant="default" className="text-[10px] uppercase">
                                    New
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {notification.description}
                              </p>
                              <span className="text-xs text-muted-foreground">
                                {notification.time}
                              </span>
                            </Link>
                          </DropdownMenuItem>
                        ))
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* User Profile Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full p-0"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{displayInitials}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {/* {} */}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {displayEmail}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground capitalize">
                            {displayRoleLabel || ""}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link
                          href={
                            isAdminRoute
                              ? "/admin/settings"
                              : "/dashboard/settings"
                          }
                          className="flex items-center"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href={isAdminRoute ? "/admin" : "/dashboard/profile"}
                          className="flex items-center"
                        >
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => void logout()}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Page content */}
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </div>
        </RoleGuard>
      </ThemeProvider>
    </QueryProvider>
  );
}
