"use client";

import { useState } from "react";
import { useBookmarks, useCurrentUser } from "@/features/user/hooks";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Trash2,
  ExternalLink,
  TrendingUp,
  Clock,
  Search,
  Download,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardBookmarksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "title">(
    "recent"
  );

  const { data: currentUser } = useCurrentUser();
  const { data: bookmarks } = useBookmarks(currentUser?.id || "");

  // Filter and sort bookmarks
  const filteredBookmarks = (bookmarks || [])
    .filter((bookmark) => {
      if (
        searchQuery &&
        !bookmark.article.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) &&
        !bookmark.article.author.first_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.article.reactionsCount - a.article.reactionsCount;
        case "title":
          return a.article.title.localeCompare(b.article.title);
        default:
          return (
            new Date(b.bookmarkedAt).getTime() -
            new Date(a.bookmarkedAt).getTime()
          );
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Bookmarks</h1>
            <p className="text-muted-foreground">
              Articles you&apos;ve saved for later reading
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {bookmarks?.length || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Bookmarks
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {bookmarks?.reduce(
                  (sum, bookmark) => sum + bookmark.article.reactionsCount,
                  0
                ) || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Reactions
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {bookmarks?.reduce(
                  (sum, bookmark) => sum + bookmark.article.commentsCount,
                  0
                ) || 0}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Comments
              </div>
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
                  placeholder="Search bookmarks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Sort:{" "}
                    {sortBy === "recent"
                      ? "Recent"
                      : sortBy === "popular"
                      ? "Popular"
                      : "Title"}
                    <MoreHorizontal className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("recent")}>
                    Most Recent
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("popular")}>
                    Most Popular
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("title")}>
                    Title A-Z
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Bookmarks List */}
        <Card>
          <CardHeader>
            <CardTitle>Bookmarks</CardTitle>
            <CardDescription>
              Your saved articles for later reading
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredBookmarks.map((bookmark) => (
                <div key={bookmark.id} className="flex">
                  {/* Thumbnail */}
                  {bookmark.article.thumbnailUrl && (
                    <div className="w-48 h-32 relative flex-shrink-0">
                      <Avatar>
                        <AvatarImage src={bookmark.article.author.handle} />
                        <AvatarFallback>
                          {bookmark.article.author.first_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute top-2 left-2">
                        <Badge variant="outline" className="bg-background/90">
                          {bookmark.article.category.name}
                        </Badge>
                      </div>
                    </div>
                  )}

                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">
                          <Link
                            href={`/articles/${bookmark.article.id}`}
                            className="hover:text-primary transition-colors"
                          >
                            {bookmark.article.title}
                          </Link>
                        </h3>
                        <p className="text-muted-foreground mb-3 line-clamp-2">
                          {bookmark.article.excerpt}
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
                            <Link href={`/articles/${bookmark.article.id}`}>
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Read Article
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove Bookmark
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center space-x-3 mb-3">
                      <Avatar>
                        <AvatarImage src={bookmark.article.author.handle} />
                        <AvatarFallback>
                          {bookmark.article.author.first_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {bookmark.article.author.first_name}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(
                          bookmark.article.published_at!
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {bookmark.article.readTimeMins} min read
                        </div>
                        <div className="flex items-center">
                          <Heart className="w-4 h-4 mr-1" />
                          {bookmark.article.reactionsCount}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {bookmark.article.commentsCount}
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground">
                        <Bookmark className="w-4 h-4 mr-1" />
                        Bookmarked{" "}
                        {new Date(bookmark.bookmarkedAt).toLocaleDateString()}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {bookmark.article.tags.map((tag) => (
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
            {filteredBookmarks.length === 0 && (
              <div className="text-center py-12">
                <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No bookmarks yet</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "No bookmarks match your search"
                    : "Start bookmarking articles you want to read later"}
                </p>
                <Button asChild>
                  <Link href="/articles">Browse Articles</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
