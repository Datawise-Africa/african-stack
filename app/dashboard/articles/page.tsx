"use client";

import { useState } from "react";
import { useUserArticles, useCurrentUser } from "@/features/user/hooks";
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
  Clock,
  Search,
  Filter,
  Download,
  Upload,
  BookOpen} from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function DashboardArticlesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "views">("latest");

  const { data: currentUser } = useCurrentUser();
  const { data: articlesData, isLoading: articlesLoading } = useUserArticles(currentUser?.id || '');

  const publishedArticles = articlesData?.filter(article => article.status === 'published') || [];
  const draftArticles = articlesData?.filter(article => article.status === 'draft') || [];
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Articles</h1>
            <p className="text-muted-foreground">
              Manage your published articles and drafts
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <Button asChild>
              <Link href="/dashboard/articles/new">
                <Plus className="w-4 h-4 mr-2" />
                New Article
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{publishedArticles.length}</div>
                    <div className="text-sm text-muted-foreground">Published</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{draftArticles.length}</div>
                    <div className="text-sm text-muted-foreground">Drafts</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {allArticles.reduce((sum, article) => sum + (article.views || 0), 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Views</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {allArticles.reduce((sum, article) => sum + article.reactionsCount, 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Reactions</div>
                  </CardContent>
                </Card>
              </div>

        {/* Filters and Search */}
        <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          <Filter className="w-4 h-4 mr-2" />
                          Status: {statusFilter === "all" ? "All" : statusFilter === "published" ? "Published" : "Drafts"}
                          <MoreHorizontal className="w-4 h-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                          All Articles
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setStatusFilter("published")}>
                          Published
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setStatusFilter("draft")}>
                          Drafts
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Sort: {sortBy === "latest" ? "Latest" : sortBy === "popular" ? "Popular" : "Views"}
                          <MoreHorizontal className="w-4 h-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSortBy("latest")}>
                          Latest
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy("popular")}>
                          Most Popular
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy("views")}>
                          Most Views
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>

        {/* Articles List */}
        <Card>
                <CardHeader>
                  <CardTitle>Articles</CardTitle>
                  <CardDescription>
                    Manage and track all your articles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredArticles.map((article) => (
                      <div key={article.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        {/* Thumbnail */}
                        {article.thumbnailUrl && (
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={article.thumbnailUrl}
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        {/* Article Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-1 truncate">
                                <Link 
                                  href={article.status === 'published' ? `/articles/${article.slug}` : `/dashboard/articles/${article.id}/edit`}
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
                                  <Link href={article.status === 'published' ? `/articles/${article.slug}` : `/dashboard/articles/${article.id}/edit`}>
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    {article.status === 'published' ? 'View' : 'Edit'}
                                  </Link>
                                </DropdownMenuItem>
                                {article.status === 'draft' && (
                                  <DropdownMenuItem>
                                    Publish
                                  </DropdownMenuItem>
                                )}
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

                  {/* Empty State */}
                  {filteredArticles.length === 0 && (
                    <div className="text-center py-12">
                      <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No articles found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchQuery || statusFilter !== "all" 
                          ? "Try adjusting your filters or search terms"
                          : "Start by creating your first article"
                        }
                      </p>
                      <Button asChild>
                        <Link href="/dashboard/articles/new">
                          <Plus className="w-4 h-4 mr-2" />
                          Create Article
                        </Link>
                      </Button>
                    </div>
                  )}
        </CardContent>
        </Card>
      </div>
    </div>
  );
}
