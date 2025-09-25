"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  FileText, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Clock,
  BarChart3,
  UserCheck,
  AlertTriangle
} from "lucide-react";

// Mock data
const mockStats = {
  totalUsers: 1250,
  totalArticles: 89,
  pendingApprovals: 12,
  totalViews: 45600,
  monthlyGrowth: 15.2,
  topCategories: [
    { name: "AI & Machine Learning", count: 23, growth: 12 },
    { name: "Startup Stories", count: 18, growth: 8 },
    { name: "Tech Policy", count: 15, growth: 25 },
    { name: "Data Science", count: 12, growth: 5 },
  ]
};

const mockRoleRequests = [
  {
    id: "1",
    user: { name: "John Doe", handle: "@johndoe", avatarUrl: "" },
    reason: "I'm a software engineer with 5 years of experience in AI and want to share my knowledge about machine learning applications in Africa.",
    status: "pending",
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2", 
    user: { name: "Sarah Johnson", handle: "@sarahj", avatarUrl: "" },
    reason: "I run a tech startup in Lagos and want to document our journey and share insights with other entrepreneurs.",
    status: "pending",
    createdAt: "2024-01-14T14:20:00Z"
  }
];

const mockArticleApprovals = [
  {
    id: "1",
    article: {
      title: "Building Scalable AI Solutions for African Markets",
      author: { name: "Dr. Aisha Mohammed", handle: "@aisham" },
      status: "pending_approval"
    },
    createdAt: "2024-01-15T09:15:00Z"
  },
  {
    id: "2",
    article: {
      title: "The Future of Fintech in Nigeria",
      author: { name: "Emeka Okafor", handle: "@emeka" },
      status: "pending_approval"
    },
    createdAt: "2024-01-14T16:45:00Z"
  }
];

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">System Administration</h1>
          <p className="text-muted-foreground">
            Manage users, content, and platform analytics
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{mockStats.monthlyGrowth}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalArticles}</div>
              <p className="text-xs text-muted-foreground">
                {mockStats.pendingApprovals} pending approval
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.pendingApprovals}</div>
              <p className="text-xs text-muted-foreground">
                Requires attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="content">Content Moderation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Categories</CardTitle>
                  <CardDescription>Most popular content categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockStats.topCategories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{category.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {category.count} articles
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">+{category.growth}%</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">New article published</p>
                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">New user registered</p>
                        <p className="text-xs text-muted-foreground">5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-amber-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Role request pending</p>
                        <p className="text-xs text-muted-foreground">10 minutes ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Role Requests</CardTitle>
                <CardDescription>Users requesting creator access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRoleRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium">{request.user.name}</h4>
                            <Badge variant="outline">{request.user.handle}</Badge>
                            <Badge variant="secondary">Pending</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {request.reason}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Requested {new Date(request.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Moderation Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Article Approvals</CardTitle>
                <CardDescription>Articles pending publication approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockArticleApprovals.map((approval) => (
                    <div key={approval.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{approval.article.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            by {approval.article.author.name} ({approval.article.author.handle})
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Submitted {new Date(approval.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Monthly user registration trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                      <p>Chart visualization would go here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Performance</CardTitle>
                  <CardDescription>Article views and engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                      <p>Performance metrics would go here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
  );
}
