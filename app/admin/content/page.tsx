"use client";

import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  User,
  Calendar,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  useArticlesQuery,
  useUpdateArticleMutation,
  type ArticleListParams,
} from "@/features/articles/query";
import type { Article } from "@/lib/types";
import { ArticlePreviewDialog } from "@/app/dashboard/articles/_components/article-preview-dialog";

const TAB_OPTIONS = [
  {
    value: "pending",
    label: "Pending Review",
    status: "pending_approval" as Article["status"],
  },
  {
    value: "approved",
    label: "Approved",
    status: "published" as Article["status"],
  },
  {
    value: "rejected",
    label: "Rejected",
    status: "rejected" as Article["status"],
  },
  {
    value: "all",
    label: "All Articles",
    status: undefined,
  },
] as const;

const getStatusBadge = (status: Article["status"]) => {
  switch (status) {
    case "pending_approval":
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Pending review
        </Badge>
      );
    case "published":
      return (
        <Badge variant="default" className="bg-green-100 text-green-800">
          Published
        </Badge>
      );
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    case "draft":
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getCategoryBadge = (category?: Article["category"]) => {
  if (!category) {
    return (
      <Badge variant="outline" className="text-muted-foreground">
        Uncategorised
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-xs">
      {category.name}
    </Badge>
  );
};

export default function ContentModeration() {
  const [selectedTab, setSelectedTab] = useState<(typeof TAB_OPTIONS)[number]["value"]>("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewArticle, setPreviewArticle] = useState<Article | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const selectedStatus =
    TAB_OPTIONS.find((tab) => tab.value === selectedTab)?.status;

  const moderationParams = useMemo<ArticleListParams>(
    () => ({
      page: 1,
      limit: 20,
      search: searchQuery.trim() || undefined,
      status: selectedStatus || undefined,
    }),
    [searchQuery, selectedStatus]
  );

  const {
    data: articlesResult,
    isPending,
    isError,
    error,
    refetch,
  } = useArticlesQuery(moderationParams);

  const {
    data: statsResult,
    isPending: isStatsPending,
  } = useArticlesQuery({
    page: 1,
    limit: 100,
    search: undefined,
    status: undefined,
  });

  const articles = articlesResult?.data ?? [];
  const meta = articlesResult?.meta;
  const statsArticles = statsResult?.data ?? [];
  const statsMeta = statsResult?.meta;

  const computedStats = useMemo(() => {
    const dataSource = statsArticles;
    const counts = dataSource.reduce(
      (acc, item) => {
        acc.total += 1;
        if (item.status === "pending_approval") acc.pending += 1;
        if (item.status === "published") acc.approved += 1;
        if (item.status === "rejected") acc.rejected += 1;
        return acc;
      },
      { pending: 0, approved: 0, rejected: 0, total: 0 }
    );
    if (statsMeta) {
      counts.total = statsMeta.total_docs ?? counts.total;
    }
    return counts;
  }, [statsArticles, statsMeta]);

  const updateArticleStatus = useUpdateArticleMutation({
    onSuccess: (article) => {
      toast.success(`Updated status for “${article.title}”.`);
      if (previewArticle?.id === article.id) {
        setPreviewArticle(article);
      }
      refetch();
    },
    onError: (err) => toast.error(err.message || "Failed to update article."),
  });

  const handlePreview = (article: Article) => {
    setPreviewArticle(article);
    setPreviewOpen(true);
  };

  const handleApprove = (article: Article) => {
    updateArticleStatus.mutate({ id: article.id, data: { status: "published" } });
  };

  const handleReject = (article: Article) => {
    updateArticleStatus.mutate({ id: article.id, data: { status: "rejected" } });
  };

  const handleTabChange = (value: string) => {
    setSelectedTab(value as (typeof TAB_OPTIONS)[number]["value"]);
  };

  const handlePreviewOpenChange = (open: boolean) => {
    setPreviewOpen(open);
    if (!open) {
      setPreviewArticle(null);
    }
  };

  const refreshAll = () => {
    refetch();
  };

  const isEmpty = !isPending && articles.length === 0;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold">Content Moderation</h1>
          <p className="text-muted-foreground">
            Review and update article statuses fetched from the backend.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={refreshAll}
          disabled={isPending}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isStatsPending ? "…" : computedStats.pending}
            </div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isStatsPending ? "…" : computedStats.approved}
            </div>
            <p className="text-xs text-muted-foreground">Live on site</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isStatsPending ? "…" : computedStats.rejected}
            </div>
            <p className="text-xs text-muted-foreground">Needs fixes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isStatsPending
                ? "…"
                : computedStats.total || statsMeta?.total_docs || 0}
            </div>
            <p className="text-xs text-muted-foreground">Indexed records</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <CardTitle>Articles</CardTitle>
              <CardDescription>
                Review and moderate article submissions from contributors.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles…"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Button variant="outline" size="sm" onClick={refreshAll}>
                <Filter className="mr-2 h-4 w-4" />
                Apply
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-4">
              {TAB_OPTIONS.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={selectedTab} className="mt-6">
              {isError && (
                <div className="mb-4 rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
                  {error?.message || "Failed to load articles from the backend."}
                </div>
              )}
              {isPending ? (
                <div className="py-8 text-center text-muted-foreground">
                  Loading articles…
                </div>
              ) : isEmpty ? (
                <div className="py-8 text-center text-muted-foreground">
                  <FileText className="mx-auto mb-4 h-12 w-12" />
                  <h3 className="mb-1 text-lg font-semibold">No articles found</h3>
                  <p>
                    {searchQuery
                      ? "Try updating your search to find different results."
                      : "No articles match this filter yet."}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {articles.map((article) => {
                    const authorName = `${article.author?.first_name ?? ""} ${
                      article.author?.last_name ?? ""
                    }`.trim() || article.author?.handle || "Unknown author";
                    const submittedDate = article.updated_at ?? article.created_at;
                    const minuteRead = article.readTimeMins ?? 0;
                    return (
                      <Card key={article.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div className="space-y-3">
                              <div>
                                <h3 className="mb-2 text-lg font-semibold">
                                  {article.title}
                                </h3>
                                <p className="text-muted-foreground">
                                  {article.excerpt || "No excerpt available."}
                                </p>
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  {authorName}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {submittedDate
                                    ? new Date(submittedDate).toLocaleDateString()
                                    : "Date unknown"}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {minuteRead} min read
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-2">
                                {getStatusBadge(article.status)}
                                {getCategoryBadge(article.category)}
                                {(article.tags ?? []).map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 self-start">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePreview(article)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Preview
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  {article.status !== "published" && (
                                    <DropdownMenuItem
                                      className="text-green-600"
                                      onSelect={(event) => {
                                        event.preventDefault();
                                        handleApprove(article);
                                      }}
                                    >
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Publish / Approve
                                    </DropdownMenuItem>
                                  )}
                                  {article.status !== "rejected" && (
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onSelect={(event) => {
                                        event.preventDefault();
                                        handleReject(article);
                                      }}
                                    >
                                      <XCircle className="mr-2 h-4 w-4" />
                                      Reject Article
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem
                                    onSelect={(event) => {
                                      event.preventDefault();
                                      handlePreview(article);
                                    }}
                                  >
                                    <FileText className="mr-2 h-4 w-4" />
                                    View details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem disabled>
                                    <AlertTriangle className="mr-2 h-4 w-4" />
                                    Flag for review
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                  {meta && meta.total_pages > 1 && (
                    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
                      <span>
                        Showing {articles.length} of{" "}
                        {meta.total_docs ?? articles.length} results
                      </span>
                      <span>
                        Page {meta.page} of {meta.total_pages}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <ArticlePreviewDialog
        open={previewOpen}
        article={previewArticle}
        onOpenChange={handlePreviewOpenChange}
      />
    </div>
  );
}
