"use client";

import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import type { Article } from "@/lib/types";
import {
  useArticlesQuery,
  useUpdateArticleMutation,
  type ArticleListParams,
} from "@/features/articles/query";
import { ArticleStatsCards } from "@/app/dashboard/articles/_components/article-stats-cards";
import { ArticleTable } from "@/app/dashboard/articles/_components/article-table";
import { ArticlePreviewDialog } from "@/app/dashboard/articles/_components/article-preview-dialog";
import { ARTICLE_PAGE_SIZE_OPTIONS } from "@/app/dashboard/articles/_types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ADMIN_STATUS_OPTIONS = [
  { label: "All statuses", value: "" },
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
  { label: "Pending approval", value: "pending_approval" },
  { label: "Rejected", value: "rejected" },
];

const getNextStatus = (status: Article["status"]): Article["status"] => {
  switch (status) {
    case "published":
      return "draft";
    case "draft":
      return "published";
    case "pending_approval":
      return "published";
    case "rejected":
      return "draft";
    default:
      return "pending_approval";
  }
};

export default function AdminArticlesPage() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewArticle, setPreviewArticle] = useState<Article | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(ARTICLE_PAGE_SIZE_OPTIONS[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const noop = () => undefined;

  const articleQueryParams = useMemo<ArticleListParams>(
    () => ({
      page,
      limit: pageSize,
      search: searchTerm.trim() || undefined,
      status: statusFilter || undefined,
    }),
    [page, pageSize, searchTerm, statusFilter]
  );

  const {
    data: articlesResult,
    isPending,
    isError,
    error,
    refetch,
  } = useArticlesQuery(articleQueryParams);

  const updateArticleStatus = useUpdateArticleMutation({
    onSuccess: (article) => {
      toast.success(`Updated status for \u201c${article.title}\u201d.`);
      if (previewArticle && previewArticle.id === article.id) {
        setPreviewArticle(article);
      }
    },
    onError: (err) => toast.error(err.message || "Failed to update article."),
  });

  const articles = articlesResult?.data ?? [];
  const meta = articlesResult?.meta;

  const publishedCount = useMemo(
    () => articles.filter((article) => article.status === "published").length,
    [articles]
  );
  const draftCount = useMemo(
    () => articles.filter((article) => article.status === "draft").length,
    [articles]
  );
  const pendingCount = useMemo(
    () =>
      articles.filter((article) => article.status === "pending_approval").length,
    [articles]
  );
  const rejectedCount = useMemo(
    () => articles.filter((article) => article.status === "rejected").length,
    [articles]
  );
  const averageReadTime = useMemo(() => {
    if (!articles.length) {
      return 0;
    }
    const total = articles.reduce(
      (sum, article) => sum + (article.readTimeMins ?? 0),
      0
    );
    return total / articles.length;
  }, [articles]);

  const mutateStatus = useCallback(
    (article: Article, nextStatus: Article["status"]) => {
      updateArticleStatus.mutate({
        id: article.id,
        data: { status: nextStatus },
      });
    },
    [updateArticleStatus]
  );

  const handleToggleStatus = useCallback(
    (article: Article) => {
      mutateStatus(article, getNextStatus(article.status));
    },
    [mutateStatus]
  );

  const handleApprove = useCallback(
    (article: Article) => mutateStatus(article, "published"),
    [mutateStatus]
  );

  const handleReject = useCallback(
    (article: Article) => mutateStatus(article, "rejected"),
    [mutateStatus]
  );

  const handlePreview = (article: Article) => {
    setPreviewArticle(article);
    setPreviewOpen(true);
  };

  const handlePreviewOpenChange = (open: boolean) => {
    setPreviewOpen(open);
    if (!open) {
      setPreviewArticle(null);
    }
  };

  const handlePageChange = (nextPage: number) => {
    if (meta) {
      if (nextPage < 1 || nextPage > meta.total_pages) return;
    } else if (nextPage < 1) {
      return;
    }
    setPage(nextPage);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Admin Articles</h1>
        <p className="text-muted-foreground">
          Preview submissions and update their statuses without editing content.
        </p>
      </div>

      <ArticleStatsCards
        totalArticles={meta?.total_docs ?? articles.length}
        publishedCount={publishedCount}
        draftCount={draftCount}
        averageReadTime={averageReadTime}
        isPending={isPending}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending approval</CardTitle>
            <CardDescription>Awaiting review</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-semibold">{pendingCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <CardDescription>Need updates</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-semibold">{rejectedCount}</p>
          </CardContent>
        </Card>
      </div>

      <ArticleTable
        data={articles}
        isLoading={isPending}
        isError={isError}
        errorMessage={error?.message}
        meta={meta}
        search={searchTerm}
        statusFilter={statusFilter}
        statusOptions={ADMIN_STATUS_OPTIONS}
        actionPermissions={{
          preview: true,
          changeStatus: true,
          edit: false,
          delete: false,
          create: false,
        }}
        onSearch={(value) => {
          setSearchTerm(value);
          setPage(1);
        }}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setPage(1);
        }}
        onRefresh={refetch}
        onCreate={noop}
        onPreview={handlePreview}
        onEdit={noop}
        onChangeStatus={handleToggleStatus}
        onDelete={noop}
        onPageChange={handlePageChange}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
      />

      <ArticlePreviewDialog
        open={previewOpen}
        article={previewArticle}
        onOpenChange={handlePreviewOpenChange}
      />

      {previewArticle && previewOpen && (
        <Card className="max-w-3xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Moderate “{previewArticle.title}”
            </CardTitle>
            <CardDescription>Adjust the status shown in listings.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button
              size="sm"
              onClick={() => handleApprove(previewArticle)}
              disabled={updateArticleStatus.isPending}
            >
              Publish / Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => mutateStatus(previewArticle, "draft")}
              disabled={updateArticleStatus.isPending}
            >
              Move to draft
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleReject(previewArticle)}
              disabled={updateArticleStatus.isPending}
            >
              Reject article
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
