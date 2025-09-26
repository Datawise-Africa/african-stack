"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Eye, 
  Heart, 
  MessageCircle, 
  MoreHorizontal,
  Trash2,
  ExternalLink,
  Clock,
  BookOpen} from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUserArticles, useCurrentUser } from "@/features/user/hooks";
import { AuthGuard } from "@/components/auth-guard";

export default function CreatorDashboardPage() {
  const [searchQuery] = useState("");
  const [statusFilter] = useState<"all" | "published" | "draft">("all");
  const [sortBy] = useState<"latest" | "popular" | "views">("latest");

  const { data: currentUser } = useCurrentUser();
  const { data: articlesData, isLoading: articlesLoading } = useUserArticles(currentUser?.id || '');
  
  const isLoading = articlesLoading;

  const publishedArticles = articlesData?.filter(article => article.status === 'published') || [];
  const draftArticles = articlesData?.filter(article => article.status === 'draft') || [];
  const allArticles = [...publishedArticles, ...draftArticles];

  // Filter and sort articles
  const filteredArticles = allArticles
    .filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || article.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "latest":
          return new Date(b.publishedAt || b.updatedAt || '1970-01-01').getTime() - new Date(a.publishedAt || a.updatedAt || '1970-01-01').getTime();
        case "popular":
          return (b.reactionsCount || 0) - (a.reactionsCount || 0);
        case "views":
          return (b.views || 0) - (a.views || 0);
        default:
          return 0;
      }
    });

  // Calculate stats
  const totalViews = allArticles.reduce((sum, article) => sum + (article.views || 0), 0);
  const totalReactions = allArticles.reduce((sum, article) => sum + (article.reactionsCount || 0), 0);
  const avgReadTime = allArticles.length > 0 
    ? Math.round(allArticles.reduce((sum, article) => sum + (article.readTimeMins || 0), 0) / allArticles.length)
    : 0;

  return (
    <AuthGuard requireAuth={true} allowedRoles={['creator', 'system_admin']}>
      <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Creator Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {currentUser?.name || "Creator"}! Here&apos;s what&apos;s happening with your content.
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
                  <p className="text-sm font-medium text-muted-foreground">Total Reactions</p>
                  <p className="text-2xl font-bold">{totalReactions.toLocaleString()}</p>
                </div>
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Across all articles
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
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-2 text-muted-foreground">Loading articles...</p>
                </div>
              ) : filteredArticles.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No articles found</p>
                  <p className="text-sm">Start by creating your first article</p>
                </div>
              ) : (
                filteredArticles.slice(0, 5).map((article) => (
                  <div key={article.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                          {article.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(article.publishedAt || article.updatedAt || '1970-01-01').toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-semibold truncate">
                        <Link href={article.status === 'published' ? `/articles/${article.slug}` : `/dashboard/articles/${article.id}/edit`} className="hover:text-primary">
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
                          <Link href={article.status === 'published' ? `/articles/${article.slug}` : `/dashboard/articles/${article.id}/edit`}>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {article.status === 'published' ? 'View' : 'Edit'}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/articles/${article.id}/edit`}>
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
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
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
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </AuthGuard>
  );
}
