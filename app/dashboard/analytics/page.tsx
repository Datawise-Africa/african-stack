"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Eye, 
  Heart, 
  MessageCircle, 
  MoreHorizontal,
  Users,
  Clock,
  Download,
  ArrowUp,
  ArrowDown} from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCurrentUser, useUserArticles } from "@/features/user/hooks";

export default function DashboardAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d" | "1y">("30d");

  const { data: currentUser } = useCurrentUser();
  const { data: articlesData } = useUserArticles(currentUser?.id || '');

  const publishedArticles = articlesData?.filter(article => article.status === 'published') || [];

  // Calculate analytics data
  const totalViews = publishedArticles.reduce((sum, article) => sum + (article.views || 0), 0);
  const totalReactions = publishedArticles.reduce((sum, article) => sum + article.reactionsCount, 0);
  const totalComments = publishedArticles.reduce((sum, article) => sum + article.commentsCount, 0);
  const avgReadTime = publishedArticles.length > 0 
    ? Math.round(publishedArticles.reduce((sum, article) => sum + article.readTimeMins, 0) / publishedArticles.length)
    : 0;

  // Mock data for charts (in a real app, this would come from an analytics API)
  const monthlyData = [
    { month: "Jan", views: 1200, reactions: 45, comments: 12 },
    { month: "Feb", views: 1800, reactions: 67, comments: 18 },
    { month: "Mar", views: 2200, reactions: 89, comments: 25 },
    { month: "Apr", views: 1900, reactions: 72, comments: 20 },
    { month: "May", views: 2500, reactions: 95, comments: 28 },
    { month: "Jun", views: 2800, reactions: 110, comments: 32 },
  ];

  const topArticles = publishedArticles
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  const categoryStats = publishedArticles.reduce((acc, article) => {
    const category = article.category.name;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Analytics</h1>
                  <p className="text-muted-foreground">
                    Track your content performance and audience engagement
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        {timeRange === "7d" ? "Last 7 days" : 
                         timeRange === "30d" ? "Last 30 days" : 
                         timeRange === "90d" ? "Last 90 days" : "Last year"}
                        <MoreHorizontal className="w-4 h-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setTimeRange("7d")}>
                        Last 7 days
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTimeRange("30d")}>
                        Last 30 days
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTimeRange("90d")}>
                        Last 90 days
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTimeRange("1y")}>
                        Last year
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                        <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
                        <div className="flex items-center text-sm text-green-500 mt-1">
                          <ArrowUp className="w-3 h-3 mr-1" />
                          +12.5% from last month
                        </div>
                      </div>
                      <Eye className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Engagement</p>
                        <p className="text-2xl font-bold">{totalReactions + totalComments}</p>
                        <div className="flex items-center text-sm text-green-500 mt-1">
                          <ArrowUp className="w-3 h-3 mr-1" />
                          +8.2% from last month
                        </div>
                      </div>
                      <Heart className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Avg. Read Time</p>
                        <p className="text-2xl font-bold">{avgReadTime}m</p>
                        <div className="flex items-center text-sm text-red-500 mt-1">
                          <ArrowDown className="w-3 h-3 mr-1" />
                          -2.1% from last month
                        </div>
                      </div>
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Followers</p>
                        <p className="text-2xl font-bold">{currentUser?.stats.followers || 0}</p>
                        <div className="flex items-center text-sm text-green-500 mt-1">
                          <ArrowUp className="w-3 h-3 mr-1" />
                          +5.3% from last month
                        </div>
                      </div>
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Views Over Time */}
                <Card>
                  <CardHeader>
                    <CardTitle>Views Over Time</CardTitle>
                    <CardDescription>
                      Your article views for the selected period
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-end justify-between space-x-2">
                      {monthlyData.map((data) => (
                        <div key={data.month} className="flex flex-col items-center space-y-2">
                          <div 
                            className="w-8 bg-primary rounded-t"
                            style={{ height: `${(data.views / 3000) * 200}px` }}
                          />
                          <span className="text-xs text-muted-foreground">{data.month}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Category Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Content by Category</CardTitle>
                    <CardDescription>
                      Distribution of your published articles
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(categoryStats).map(([category, count]) => (
                        <div key={category} className="flex items-center justify-between">
                          <span className="text-sm font-medium">{category}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${(count / publishedArticles.length) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground w-8 text-right">
                              {count}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

        {/* Top Performing Articles */}
        <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Top Performing Articles</CardTitle>
                  <CardDescription>
                    Your most viewed and engaged articles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topArticles.map((article, index) => (
                      <div key={article.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate">
                            <Link 
                              href={`/articles/${article.slug}`}
                              className="hover:text-primary transition-colors"
                            >
                              {article.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">
                            {article.excerpt}
                          </p>
                        </div>
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {article.views || 0}
                          </div>
                          <div className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {article.reactionsCount}
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {article.commentsCount}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

        {/* Engagement Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Engagement Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {totalViews > 0 ? ((totalReactions + totalComments) / totalViews * 100).toFixed(1) : 0}%
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Reactions and comments per view
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Avg. Views per Article</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {publishedArticles.length > 0 ? Math.round(totalViews / publishedArticles.length) : 0}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Average views across all articles
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Content Frequency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {publishedArticles.length > 0 ? Math.round(publishedArticles.length / 12) : 0}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Articles per month (estimated)
                    </p>
                  </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}
