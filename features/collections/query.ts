import {
  useQuery,
  useQueryClient,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

import { apiClient, ApiError } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { Collection, Article } from "@/lib/types";

const COLLECTIONS_ENDPOINT = "/blogs/collections/";

export type CollectionListParams = {
  page?: number;
  limit?: number;
  search?: string;
};

type RawArticle = {
  id: string | number;
  title?: string;
  snippet?: string;
  excerpt?: string;
  status?: string;
  read_time_mins?: number;
  read_time?: number;
  views?: number;
  published_at?: string | null;
  updated_at?: string | null;
  [key: string]: unknown;
};

type RawCollection = {
  id: string | number;
  name?: string;
  title?: string;
  description?: string | null;
  article_count?: number | null;
  articles_count?: number | null;
  articles?: RawArticle[] | null;
  updated_at?: string | null;
  created_at?: string | null;
};

type PaginationMeta = {
  total_docs: number;
  total_pages: number;
  page: number;
  limit: number;
  has_next_page: boolean;
  has_prev_page: boolean;
  next_page: number | null;
  prev_page: number | null;
};

type CollectionListResponse = {
  data: RawCollection[];
  meta: PaginationMeta;
};

export type ArticleSummary = Pick<
  Article,
  "id" | "title" | "excerpt" | "status" | "readTimeMins" | "views" | "publishedAt" | "updatedAt"
>;

export type CollectionWithArticles = Collection & {
  articles: ArticleSummary[];
};

export type CollectionListResult = {
  data: CollectionWithArticles[];
  meta: PaginationMeta;
};

const normalizeArticle = (article: RawArticle): ArticleSummary => {
  const id = String(article.id ?? "");
  return {
    id,
    title: (article.title ?? "Untitled").toString(),
    excerpt: (article.excerpt ?? article.snippet ?? "").toString(),
    status: (article.status ?? "draft") as ArticleSummary["status"],
    readTimeMins: Number(article.read_time_mins ?? article.read_time ?? 0) || 0,
    views: Number(article.views ?? 0) || 0,
    publishedAt: article.published_at ?? undefined,
    updatedAt: article.updated_at ?? undefined,
  };
};

const normalizeCollection = (collection: RawCollection): CollectionWithArticles => {
  const id = String(collection.id);
  const name = collection.name ?? collection.title ?? "Unnamed Collection";
  const description = collection.description ?? undefined;
  const articleCount =
    typeof collection.article_count === "number"
      ? collection.article_count
      : typeof collection.articles_count === "number"
        ? collection.articles_count
        : collection.articles?.length ?? 0;

  return {
    id,
    name,
    description,
    articleCount,
    updatedAt: collection.updated_at ?? undefined,
    createdAt: collection.created_at ?? undefined,
    articles: Array.isArray(collection.articles)
      ? collection.articles.map(normalizeArticle)
      : [],
  };
};

const normalizeListParams = (params?: CollectionListParams) => ({
  page: params?.page ?? undefined,
  limit: params?.limit ?? undefined,
  search: params?.search ?? undefined,
});

export const buildCollectionsListKey = (
  params?: CollectionListParams
) => [...queryKeys.collections.lists(), normalizeListParams(params)] as const;

async function fetchCollections(
  params: CollectionListParams = {}
): Promise<CollectionListResult> {
  const response = await apiClient.get<CollectionListResponse>(
    COLLECTIONS_ENDPOINT,
    { params }
  );

  const { data, meta } = response.data;

  const fallbackMeta: PaginationMeta = meta ?? {
    total_docs: data?.length ?? 0,
    total_pages: 1,
    page: 1,
    limit: params.limit ?? data?.length ?? 0,
    has_next_page: false,
    has_prev_page: false,
    next_page: null,
    prev_page: null,
  };

  return {
    data: (data ?? []).map(normalizeCollection),
    meta: fallbackMeta,
  };
}

export const useCollectionsQuery = <TData = CollectionListResult>(
  params?: CollectionListParams,
  options?: Omit<UseQueryOptions<CollectionListResult, ApiError, TData>, "queryKey" | "queryFn">
): UseQueryResult<TData, ApiError> =>
  useQuery<CollectionListResult, ApiError, TData>({
    queryKey: buildCollectionsListKey(params),
    queryFn: () => fetchCollections(params),
    staleTime: 5 * 60 * 1000,
    ...options,
  });

export const invalidateCollections = (queryClient: ReturnType<typeof useQueryClient>) => {
  queryClient.invalidateQueries({ queryKey: queryKeys.collections.all, exact: false });
  queryClient.invalidateQueries({ queryKey: queryKeys.collections.lists(), exact: false });
};
