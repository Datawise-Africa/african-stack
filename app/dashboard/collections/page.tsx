"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Layers,
  Plus,
  ArrowRight,
  LayoutList,
  FileText,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-hot-toast";

import { AuthGuard } from "@/components/auth-guard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  usePaginatedCollections,
  type CollectionWithArticles,
} from "@/features/collections/hooks";

const PAGE_SIZE = 6;

export default function CollectionsPage() {
  const [page, setPage] = useState(1);

  const {
    data,
    isPending,
    isError,
    error,
    refetch,
    isRefetching,
  } = usePaginatedCollections({ page, limit: PAGE_SIZE });

  const collections = useMemo(
    () => data?.data ?? ([] as CollectionWithArticles[]),
    [data]
  );
  const meta = data?.meta;

  const totalCollections = meta?.total_docs ?? collections.length;
  const totalArticlesWithCollections = useMemo(
    () => collections.reduce((acc, collection) => acc + (collection.articleCount ?? 0), 0),
    [collections]
  );

  const latestCollectionName = useMemo(() => {
    if (!collections.length) return "—";
    return collections
      .slice()
      .sort(
        (a, b) =>
          new Date(b.updatedAt ?? b.createdAt ?? 0).getTime() -
          new Date(a.updatedAt ?? a.createdAt ?? 0).getTime()
      )[0]?.name ?? "—";
  }, [collections]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message || "Failed to load collections.");
    }
  }, [isError, error]);

  return (
    <AuthGuard requireAuth allowedRoles={['author', 'admin']}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Collections</h1>
              <p className="text-muted-foreground">
                Group related articles into curated collections for your readers.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                disabled={isPending || isRefetching}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button disabled>
                <Plus className="mr-2 h-4 w-4" />
                New collection
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total collections</p>
                  <p className="text-2xl font-semibold">
                    {isPending ? "…" : totalCollections}
                  </p>
                </div>
                <Layers className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Articles in collections
                  </p>
                  <p className="text-2xl font-semibold">
                    {isPending ? "…" : totalArticlesWithCollections}
                  </p>
                </div>
                <LayoutList className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Most recent</p>
                  <p className="text-2xl font-semibold">
                    {isPending ? "…" : latestCollectionName}
                  </p>
                </div>
                <ArrowRight className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Draft collections</p>
                  <p className="text-2xl font-semibold">0</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>
          </div>

          {!isPending && collections.length === 0 ? (
            <Card>
              <CardContent className="py-16 text-center text-muted-foreground">
                <Layers className="mx-auto mb-4 h-10 w-10 opacity-40" />
                <p className="font-medium">You have no collections yet</p>
                <p className="text-sm">
                  Start organising your articles into themes once you have
                  published content.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {(isPending ? Array.from({ length: PAGE_SIZE }) : collections).map((collectionItem, index) => {
                if (!collectionItem) {
                  return (
                    <Card key={`collection-skeleton-${index}`} className="animate-pulse">
                      <CardHeader className="flex flex-col gap-2">
                        <div className="h-6 w-48 rounded bg-muted" />
                        <div className="h-4 w-72 rounded bg-muted" />
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="h-20 rounded bg-muted" />
                      </CardContent>
                    </Card>
                  );
                }

                const collection = collectionItem as CollectionWithArticles;

                return (
                  <Card key={collection.id}>
                    <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle>{collection.name}</CardTitle>
                        {collection.description && (
                          <CardDescription>{collection.description}</CardDescription>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>
                        Updated {new Date(collection.updatedAt ?? collection.createdAt ?? Date.now()).toLocaleDateString()}
                      </span>
                      <Separator orientation="vertical" />
                      <span>{collection.articleCount} articles</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {collection.articles.length === 0 ? (
                      <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
                        No articles have been added to this collection yet.
                      </div>
                    ) : (
                      <div className="grid gap-3">
                        {collection.articles.map((article) => (
                          <div
                            key={article.id}
                            className="flex items-start justify-between rounded-md border p-4"
                          >
                            <div className="mr-4 flex-1">
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Badge variant="secondary">{article.status}</Badge>
                                <span>
                                  {new Date(
                                    article.publishedAt || article.updatedAt || '1970-01-01'
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <Link
                                href={`/dashboard/articles/${article.id}/edit`}
                                className="mt-1 inline-flex items-center font-medium hover:text-primary"
                              >
                                {article.title}
                                <ArrowRight className="ml-2 h-3 w-3" />
                              </Link>
                              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                                {article.excerpt}
                              </p>
                            </div>
                            <div className="text-right text-xs text-muted-foreground">
                              <p>{article.readTimeMins} min read</p>
                              <p>{article.views?.toLocaleString() ?? 0} views</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm" disabled>
                        Manage collection
                      </Button>
                    </div>
                  </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Page {meta?.page ?? page} of {meta?.total_pages ?? 1}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={isPending || page === 1 || meta?.has_prev_page === false}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={isPending || meta?.has_next_page === false}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
