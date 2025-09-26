"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Eye, 
  Heart, 
  MessageCircle, 
  MoreHorizontal,
  Trash2,
  ExternalLink,
  TrendingUp,
  Clock,
  Search,
  Download,
  History
} from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useReadHistory, useCurrentUser } from "@/features/user/hooks";

export default function DashboardHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "progress" | "title">("recent");

  const { data: currentUser } = useCurrentUser();
  const { data: readHistory } = useReadHistory(currentUser?.id || '');

  // Filter and sort read history
  const filteredHistory = (readHistory || [])
    .filter(item => {
      if (searchQuery && !item.article.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !item.article.author.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "progress":
          return b.scrolledPct - a.scrolledPct;
        case "title":
          return a.article.title.localeCompare(b.article.title);
        default:
          return new Date(b.readAt).getTime() - new Date(a.readAt).getTime();
      }
    });

  const totalReadTime = readHistory?.reduce((sum, item) => sum + item.readTimeSpent, 0) || 0;
  const completedReads = readHistory?.filter(item => item.scrolledPct >= 70).length || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Read History</h1>
                  <p className="text-muted-foreground">
                    Track your reading progress and discover articles you&apos;ve enjoyed
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button asChild>
                    <Link href="/articles">
                      <Plus className="w-4 h-4 mr-2" />
                      Browse Articles
                    </Link>
                  </Button>
                </div>
              </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{readHistory?.length || 0}</div>
                    <div className="text-sm text-muted-foreground">Articles Read</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{completedReads}</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{totalReadTime}h</div>
                    <div className="text-sm text-muted-foreground">Total Read Time</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {readHistory?.length ? Math.round((completedReads / readHistory.length) * 100) : 0}%
                    </div>
                    <div className="text-sm text-muted-foreground">Completion Rate</div>
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
                        placeholder="Search read history..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Sort: {sortBy === "recent" ? "Recent" : sortBy === "progress" ? "Progress" : "Title"}
                          <MoreHorizontal className="w-4 h-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSortBy("recent")}>
                          Most Recent
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy("progress")}>
                          Reading Progress
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy("title")}>
                          Title A-Z
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>

        {/* Read History List */}
        <Card>
                <CardHeader>
                  <CardTitle>Read History</CardTitle>
                  <CardDescription>
                    Articles you&apos;ve read and your progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {filteredHistory.map((item) => (
                      <div key={item.id} className="flex">
                        {/* Thumbnail */}
                        {item.article.thumbnailUrl && (
                          <div className="w-48 h-32 relative flex-shrink-0">
                            <Image
                              src={item.article.thumbnailUrl}
                              alt={item.article.title}
                              width={192}
                              height={128}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <div className="absolute top-2 left-2">
                              <Badge variant="outline" className="bg-background/90">
                                {item.article.category.name}
                              </Badge>
                            </div>
                            {/* Progress indicator */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted rounded-b-lg">
                              <div 
                                className="h-full bg-primary transition-all duration-300"
                                style={{ width: `${item.scrolledPct}%` }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold mb-2">
                                <Link 
                                  href={`/articles/${item.article.slug}`}
                                  className="hover:text-primary transition-colors"
                                >
                                  {item.article.title}
                                </Link>
                              </h3>
                              <p className="text-muted-foreground mb-3 line-clamp-2">
                                {item.article.excerpt}
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
                                  <Link href={`/articles/${item.article.slug}`}>
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Read Again
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Remove from History
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          {/* Author Info */}
                          <div className="flex items-center space-x-3 mb-3">
                            <Image
                              src={item.article.author.avatarUrl!}
                              alt={item.article.author.name}
                              width={24}
                              height={24}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="text-sm text-muted-foreground">
                              {item.article.author.name}
                            </span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">
                              {new Date(item.article.publishedAt!).toLocaleDateString()}
                            </span>
                          </div>

                          {/* Reading Progress */}
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Reading Progress</span>
                              <span className="font-medium">{item.scrolledPct}%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${item.scrolledPct}%` }}
                              />
                            </div>
                          </div>

                          {/* Meta Info */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {item.article.readTimeMins} min read
                              </div>
                              <div className="flex items-center">
                                <Eye className="w-4 h-4 mr-1" />
                                {item.readTimeSpent} min spent
                              </div>
                              <div className="flex items-center">
                                <Heart className="w-4 h-4 mr-1" />
                                {item.article.reactionsCount}
                              </div>
                              <div className="flex items-center">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                {item.article.commentsCount}
                              </div>
                            </div>
                            
                            <div className="flex items-center text-sm text-muted-foreground">
                              <History className="w-4 h-4 mr-1" />
                              Read {new Date(item.readAt).toLocaleDateString()}
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mt-3">
                            {item.article.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-block px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Empty State */}
                  {filteredHistory.length === 0 && (
                    <div className="text-center py-12">
                      <History className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No reading history yet</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchQuery 
                          ? "No articles match your search"
                          : "Start reading articles to build your reading history"
                        }
                      </p>
                      <Button asChild>
                        <Link href="/articles">
                          Browse Articles
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
