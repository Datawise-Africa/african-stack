"use client";

import { useState } from "react";
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
  UserCircle,
  Bell,
  Home,
  Plus,
  HelpCircle,
  MessageSquare,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import { RoleGuard } from "@/components/role-guard";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useRole } from "@/hooks/use-role";

const creatorNavigation = [
  { 
    name: "Overview", 
    href: "/dashboard", 
    icon: BarChart3, 
    description: "Dashboard overview",
    roles: ['creator'] 
  },
  { 
    name: "Profile", 
    href: "/dashboard/profile", 
    icon: User, 
    description: "Your profile and stats",
    roles: ['creator'] 
  },
  { 
    name: "Articles", 
    href: "/dashboard/articles", 
    icon: BookOpen, 
    description: "Manage your articles",
    roles: ['creator'] 
  },
  { 
    name: "Analytics", 
    href: "/dashboard/analytics", 
    icon: TrendingUp, 
    description: "Performance metrics",
    roles: ['creator'] 
  },
  { 
    name: "Content Calendar", 
    href: "/dashboard/calendar", 
    icon: Calendar, 
    description: "Plan your content",
    roles: ['creator'] 
  },
  { 
    name: "Bookmarks", 
    href: "/dashboard/bookmarks", 
    icon: Bookmark, 
    description: "Saved articles",
    roles: ['creator'] 
  },
  { 
    name: "Read History", 
    href: "/dashboard/history", 
    icon: History, 
    description: "Reading history",
    roles: ['creator'] 
  },
  { 
    name: "Audience", 
    href: "/dashboard/audience", 
    icon: Users, 
    description: "Manage followers",
    roles: ['creator'] 
  },
  { 
    name: "Goals", 
    href: "/dashboard/goals", 
    icon: Target, 
    description: "Content goals",
    roles: ['creator'] 
  },
  { 
    name: "Settings", 
    href: "/dashboard/settings", 
    icon: Settings, 
    description: "Account settings",
    roles: ['creator'] 
  }
];

const adminNavigation = [
  { 
    name: "Admin Overview", 
    href: "/admin", 
    icon: Shield, 
    description: "System administration",
    roles: ['system_admin'] 
  },
  { 
    name: "User Management", 
    href: "/admin/users", 
    icon: UserCheck, 
    description: "Manage users and roles",
    roles: ['system_admin'] 
  },
  { 
    name: "Content Moderation", 
    href: "/admin/content", 
    icon: FileText, 
    description: "Approve articles and content",
    roles: ['system_admin'] 
  },
  { 
    name: "System Analytics", 
    href: "/admin/analytics", 
    icon: TrendingUp, 
    description: "Platform-wide analytics",
    roles: ['system_admin'] 
  },
  { 
    name: "Settings", 
    href: "/admin/settings", 
    icon: Settings, 
    description: "System settings",
    roles: ['system_admin'] 
  }
];

export function SharedDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useRole();

  // Choose navigation based on current route and user role
  const isAdminRoute = pathname.startsWith('/admin');
  const navigation = isAdminRoute ? adminNavigation : creatorNavigation;
  
  // Filter navigation items based on user role
  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <QueryProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <RoleGuard allowedRoles={['creator', 'system_admin']}>
          <div className="min-h-screen bg-muted/30 flex">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
              <div 
                className="fixed inset-0 z-50 bg-black/50 lg:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <div className={cn(
              "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:fixed lg:inset-y-0 lg:left-0",
              sidebarOpen ? "translate-x-0" : "-translate-x-full",
              sidebarCollapsed && "lg:w-16"
            )}>
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
                    {!sidebarCollapsed && (
                      <span>Back to Homepage</span>
                    )}
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
                          isActive ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground",
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
                        {!sidebarCollapsed && (
                          <span>New Article</span>
                        )}
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
            <div className={cn(
              "flex-1 flex flex-col min-w-0",
              sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
            )}>
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
                      {filteredNavigation.find(item => item.href === pathname)?.name || "Dashboard"}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {filteredNavigation.find(item => item.href === pathname)?.description || "Manage your content"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Notifications */}
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                      3
                    </span>
                  </Button>
                  
                  {/* User Profile Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <UserCircle className="h-6 w-6" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground capitalize">
                            {user.role.replace('_', ' ')}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={isAdminRoute ? "/admin/settings" : "/dashboard/settings"} className="flex items-center">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={isAdminRoute ? "/admin" : "/dashboard/profile"} className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600 focus:text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Page content */}
              <main className="flex-1 overflow-auto">
                {children}
              </main>
            </div>
          </div>
        </RoleGuard>
      </ThemeProvider>
    </QueryProvider>
  );
}
