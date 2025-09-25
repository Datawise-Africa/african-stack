"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  History
} from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUserArticles, useUserProfile } from "@/features/user/hooks";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "views">("latest");

  const { data: userProfile, isLoading: profileLoading } = useUserProfile();
  const { data: articlesData, isLoading: articlesLoading } = useUserArticles();

  const publishedArticles = articlesData?.published || [];
  const draftArticles = articlesData?.drafts || [];
  const allArticles = [...publishedArticles, ...draftArticles];

  // Filter and sort articles
  const filteredArticles = allArticles
    .filter(article => {
      if (statusFilter !== "all" && article.status !== statusFilter) return false;
      if (searchQuery && !article.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.reactionsCount - a.reactionsCount;
        case "views":
          return (b.views || 0) - (a.views || 0);
        default:
          return new Date(b.updatedAt || b.publishedAt || "").getTime() - 
                 new Date(a.updatedAt || a.publishedAt || "").getTime();
      }
    });

  const totalViews = publishedArticles.reduce((sum, article) => sum + (article.views || 0), 0);
  const totalReactions = publishedArticles.reduce((sum, article) => sum + article.reactionsCount, 0);
  const totalComments = publishedArticles.reduce((sum, article) => sum + article.commentsCount, 0);
  const avgReadTime = publishedArticles.length > 0 
    ? Math.round(publishedArticles.reduce((sum, article) => sum + article.readTimeMins, 0) / publishedArticles.length)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            <p className="text-muted-foreground">
              Welcome back, {userProfile?.name || "Creator"}! Here's what's happening with your content.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button asChild>
              <Link href="/dashboard/articles/new">
                <Plus className="w-4 h-4 mr-2" />
                New Article
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Articles</p>
                        <p className="text-2xl font-bold">{allArticles.length}</p>
                      </div>
                      <BookOpen className="h-8 w-8 text-primary" />
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {publishedArticles.length} published, {draftArticles.length} drafts
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                        <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
                      </div>
                      <Eye className="h-8 w-8 text-primary" />
                    </div>
                    <div className="mt-2 text-sm text-green-500">
                      +12% from last month
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Engagement</p>
                        <p className="text-2xl font-bold">{totalReactions + totalComments}</p>
                      </div>
                      <Heart className="h-8 w-8 text-primary" />
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {totalReactions} reactions, {totalComments} comments
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Avg. Read Time</p>
                        <p className="text-2xl font-bold">{avgReadTime}m</p>
                      </div>
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Per article
                    </div>
                  </CardContent>
                </Card>
              </div>

        {/* Recent Articles */}
        <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Recent Articles</CardTitle>
                      <CardDescription>
                        Your latest published articles and drafts
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/dashboard/articles">
                        View All
                      </Link>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredArticles.slice(0, 5).map((article) => (
                      <div key={article.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-lg mb-1">
                                <Link 
                                  href={article.status === 'published' ? `/articles/${article.slug}` : `/me/articles/${article.id}/edit`}
                                  className="hover:text-primary transition-colors"
                                >
                                  {article.title}
                                </Link>
                              </h3>
                              <p className="text-muted-foreground text-sm line-clamp-2">
                                {article.excerpt}
                              </p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={article.status === 'published' ? `/articles/${article.slug}` : `/me/articles/${article.id}/edit`}>
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    {article.status === 'published' ? 'View' : 'Edit'}
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/me/articles/${article.id}/edit`}>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                            <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                              {article.status === 'published' ? 'Published' : 'Draft'}
                            </Badge>
                            <Badge variant="outline">{article.category.name}</Badge>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {article.status === 'published' 
                                ? new Date(article.publishedAt!).toLocaleDateString()
                                : `Updated ${new Date(article.updatedAt!).toLocaleDateString()}`
                              }
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {article.views || 0} views
                            </div>
                            <div className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              {article.reactionsCount} reactions
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {article.commentsCount} comments
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {article.readTimeMins} min read
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
        </CardContent>
        </Card>
      </div>
    </div>
  );
}
