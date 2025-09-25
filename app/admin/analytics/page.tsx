"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users,
  FileText,
  Eye,
  Heart,
  MessageCircle,
  Bookmark,
  BarChart3,
  Activity
} from "lucide-react";

// Mock data
const platformStats = {
  totalUsers: 1250,
  totalArticles: 89,
  totalViews: 45600,
  totalReactions: 2340,
  totalComments: 890,
  totalBookmarks: 1200,
  activeUsers: 450,
  newUsersThisWeek: 25,
  articlesThisWeek: 8,
  viewsThisWeek: 3200
};

const topArticles = [
  {
    id: "1",
    title: "The Future of AI in Healthcare",
    author: "Dr. Sarah Johnson",
    views: 1250,
    reactions: 89,
    comments: 23,
    bookmarks: 45
  },
  {
    id: "2",
    title: "Building Scalable Web Applications",
    author: "Mike Chen",
    views: 980,
    reactions: 67,
    comments: 18,
    bookmarks: 32
  },
  {
    id: "3",
    title: "Understanding Machine Learning Basics",
    author: "Alex Rodriguez",
    views: 850,
    reactions: 54,
    comments: 15,
    bookmarks: 28
  }
];

const userGrowthData = [
  { month: "Jan", users: 800, articles: 15 },
  { month: "Feb", users: 920, articles: 22 },
  { month: "Mar", users: 1050, articles: 28 },
  { month: "Apr", users: 1180, articles: 35 },
  { month: "May", users: 1250, articles: 42 },
  { month: "Jun", users: 1250, articles: 89 }
];

const categoryStats = [
  { name: "Technology", articles: 35, views: 18500, percentage: 39.3 },
  { name: "AI/ML", articles: 28, views: 15200, percentage: 33.3 },
  { name: "Development", articles: 18, views: 8900, percentage: 19.5 },
  { name: "Design", articles: 8, views: 3000, percentage: 6.6 }
];

export default function SystemAnalytics() {
  const [selectedTab, setSelectedTab] = useState("overview");

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">System Analytics</h1>
        <p className="text-muted-foreground">
          Platform-wide performance metrics and insights
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{platformStats.newUsersThisWeek} this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.totalArticles}</div>
            <p className="text-xs text-muted-foreground">
              +{platformStats.articlesThisWeek} this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{platformStats.viewsThisWeek.toLocaleString()} this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reactions</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.totalReactions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across all articles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.totalComments}</div>
            <p className="text-xs text-muted-foreground">
              User engagement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookmarks</CardTitle>
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.totalBookmarks}</div>
            <p className="text-xs text-muted-foreground">
              Saved articles
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="articles">Top Articles</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="growth">Growth</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>Monthly user and article growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Chart visualization would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Articles by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryStats.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${category.percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{category.articles} articles</span>
                        <span>{category.views.toLocaleString()} views</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="articles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Articles</CardTitle>
              <CardDescription>Most viewed and engaged articles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topArticles.map((article, index) => (
                  <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold">{article.title}</h3>
                        <p className="text-sm text-muted-foreground">by {article.author}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{article.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{article.reactions}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{article.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Bookmark className="h-4 w-4" />
                        <span>{article.bookmarks}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
              <CardDescription>Detailed breakdown by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryStats.map((category) => (
                  <div key={category.name} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{category.name}</h3>
                      <Badge variant="outline">{category.articles} articles</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Views</p>
                        <p className="font-semibold">{category.views.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Avg. Views/Article</p>
                        <p className="font-semibold">{Math.round(category.views / category.articles)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Market Share</p>
                        <p className="font-semibold">{category.percentage}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growth" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Growth</CardTitle>
                <CardDescription>User and content growth over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userGrowthData.map((data, index) => (
                    <div key={data.month} className="flex items-center justify-between">
                      <span className="font-medium">{data.month}</span>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{data.users} users</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{data.articles} articles</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Growth Rate</CardTitle>
                <CardDescription>Percentage growth metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">User Growth Rate</span>
                    <Badge variant="default" className="bg-green-100 text-green-800">+15.6%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Content Growth Rate</span>
                    <Badge variant="default" className="bg-blue-100 text-blue-800">+112%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Engagement Growth</span>
                    <Badge variant="default" className="bg-purple-100 text-purple-800">+45.2%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Retention Rate</span>
                    <Badge variant="default" className="bg-orange-100 text-orange-800">+8.3%</Badge>
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
