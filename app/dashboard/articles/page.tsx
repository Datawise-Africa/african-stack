"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import {
  useArticlesQuery,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
  type ArticleListParams,
} from "@/features/articles/query";
import type { Article } from "@/lib/types";

import { ArticleStatsCards } from "./_components/article-stats-cards";
import { ArticleTable } from "./_components/article-table";
import { ArticlePreviewDialog } from "./_components/article-preview-dialog";
import { ARTICLE_PAGE_SIZE_OPTIONS } from "./_types";

export default function DashboardArticlesPage() {
  const router = useRouter();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewArticle, setPreviewArticle] = useState<Article | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(ARTICLE_PAGE_SIZE_OPTIONS[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

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
      toast.success(`Article "${article.title}" updated.`);
    },
    onError: (err) => toast.error(err.message || "Failed to update article."),
  });

  const deleteArticle = useDeleteArticleMutation({
    onSuccess: () => {
      toast.success("Article deleted.");
      setPreviewOpen(false);
    },
    onError: (err) => toast.error(err.message || "Failed to delete article."),
  });

  const articles = articlesResult?.data ?? [];
  const meta = articlesResult?.meta;

  const publishedCount = articles.filter((article) => article.status === "published").length;
  const draftCount = articles.filter((article) => article.status === "draft").length;
  const averageReadTime = articles.length
    ? articles.reduce((sum, article) => sum + (article.readTimeMins ?? 0), 0) /
      articles.length
    : 0;

  const handlePreview = (article: Article) => {
    setPreviewArticle(article);
    setPreviewOpen(true);
  };

  const handleEdit = (article: Article) => {
    router.push(`/dashboard/articles/${article.id}/edit`);
  };

  const handleToggleStatus = (article: Article) => {
    const nextStatus = article.status === "published" ? "draft" : "published";
    updateArticleStatus.mutate({
      id: article.id,
      data: { status: nextStatus },
    });
  };

  const handleDelete = (article: Article) => {
    const confirmed = window.confirm(
      `Delete article "${article.title}"? This cannot be undone.`
    );
    if (!confirmed) return;
    deleteArticle.mutate(article.id);
    setPreviewOpen(false);
    setPreviewArticle(null);
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
        <h1 className="text-3xl font-bold">Articles</h1>
        <p className="text-muted-foreground">
          Browse, publish, and manage articles across the newsroom.
        </p>
      </div>

      <ArticleStatsCards
        totalArticles={meta?.total_docs ?? articles.length}
        publishedCount={publishedCount}
        draftCount={draftCount}
        averageReadTime={averageReadTime}
        isPending={isPending}
      />

      <ArticleTable
        data={articles}
        isLoading={isPending}
        isError={isError}
        errorMessage={error?.message}
        meta={meta}
        search={searchTerm}
        statusFilter={statusFilter}
        onSearch={(value) => {
          setSearchTerm(value);
          setPage(1);
        }}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setPage(1);
        }}
        onRefresh={refetch}
        onCreate={() => router.push("/dashboard/articles/new")}
        onPreview={handlePreview}
        onEdit={handleEdit}
        onChangeStatus={handleToggleStatus}
        onDelete={handleDelete}
        onPageChange={handlePageChange}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
      />

      <ArticlePreviewDialog
        open={previewOpen}
        article={previewArticle}
        onOpenChange={setPreviewOpen}
      />
    </div>
  );
}
