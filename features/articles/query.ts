"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseMutationResult,
  type UseQueryOptions,
  type UseQueryResult,
} from "@tanstack/react-query";

import { apiClient, ApiError } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import type { Article, Category } from "@/lib/types";

export const ARTICLES_ENDPOINT = "/blogs/articles/";
export const PUBLISHED_ARTICLES_ENDPOINT = "/blogs/published-articles/";

export type ArticleListParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  category?: string;
  author?: string;
  tag?: string;
  ordering?: string;
};

type RawCategory = {
  id?: number;
  name?: string;
  slug?: string;
  description?: string | null;
  article_count?: number | null;
  thumbnail?: string | null;
};

type RawAuthor = {
  id?: string | number;
  first_name?: string;
  last_name?: string;
  handle?: string;
};

type RawArticle = {
  id?: string | number;
  slug?: string;
  title?: string;
  excerpt?: string | null;
  content?: string | null;
  thumbnail?: string | null;
  status?: string | null;
  read_time_mins?: number | null;
  views?: number | null;
  published_at?: string | null;
  updated_at?: string | null;
  created_at?: string | null;
  tags?: Array<string | { name?: string }> | null;
  reactions_count?: number | null;
  comments_count?: number | null;
  author?: RawAuthor | null;
  category?: RawCategory | string | null;
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

type ArticleListResponse = {
  data?: RawArticle[];
  meta?: PaginationMeta;
};

type ArticleDetailResponse = RawArticle | { data?: RawArticle };

export type ArticleListResult = {
  data: Article[];
  meta: PaginationMeta;
};

export type ArticlePayload = {
  title: string;
  excerpt?: string;
  content?: string;
  status?: string;
  thumbnail?: string;
  categoryId?: string | number | null;
  tags?: string[];
  readTimeMins?: number;
};

export type ArticleUpdatePayload = Partial<ArticlePayload>;

const fallbackCategory = (partial?: RawCategory | string | null): Category => {
  if (!partial) {
    return {
      id: 0,
      name: "Uncategorised",
      slug: "uncategorised",
      description: "",
      articleCount: 0,
      color: undefined,
      thumbnail: null,
    };
  }

  if (typeof partial === "string") {
    return {
      id: Number(partial),
      name: partial,
      slug: partial.toString().toLowerCase(),
      description: "",
      articleCount: 0,
      color: undefined,
      thumbnail: null,
    } as Category;
  }

  return {
    id: (partial.id ?? 0),
    name: partial.name ?? "Uncategorised",
    slug: partial.slug ?? String(partial.id ?? "uncategorised"),
    description: partial.description ?? "",
    articleCount: partial.article_count ?? 0,
    color: undefined,
    thumbnail: partial.thumbnail ?? null,
  };
};

const normalizeArticle = (raw: RawArticle): Article => {
  const normalizedCategory = fallbackCategory(raw.category);

  const firstName = raw.author?.first_name ?? "Author";
  const lastName = raw.author?.last_name ?? "";

  const tags =
    raw.tags
      ?.map((tag) => {
        if (typeof tag === "string") return tag;
        if (tag && typeof tag.name === "string") return tag.name;
        return null;
      })
      .filter(Boolean) ?? [];

  return {
    id: String(raw.id ?? ""),
    slug: raw.slug ?? "",
    title: raw.title ?? "Untitled article",
    excerpt: raw.excerpt ?? "",
    content: raw.content ?? "",
    author: {
      id: String(raw.author?.id ?? ""),
      first_name: firstName,
      last_name: lastName,
      handle: raw.author?.handle ?? `@${(firstName || "author").toLowerCase()}`,
    },
    category: normalizedCategory,
    tags: (tags ?? []).filter((tag): tag is string => typeof tag === "string"),
    thumbnailUrl: raw.thumbnail ?? undefined,
    readTimeMins: Number(raw.read_time_mins ?? 0),
    published_at: raw.published_at ?? undefined,
    updated_at: raw.updated_at ?? raw.created_at ?? undefined,
    status: (raw.status ?? "draft") as Article["status"],
    approvalStatus: undefined,
    reactionsCount: Number(raw.reactions_count ?? 0),
    commentsCount: Number(raw.comments_count ?? 0),
    views: Number(raw.views ?? 0),
    collectionId: undefined,
    collection: undefined,
  };
};

const normalizeMeta = (
  meta: PaginationMeta | undefined,
  fallbackLength: number,
  params: ArticleListParams
): PaginationMeta => {
  if (meta) return meta;
  return {
    total_docs: fallbackLength,
    total_pages: 1,
    page: params.page ?? 1,
    limit: params.limit ?? fallbackLength ?? 0,
    has_next_page: false,
    has_prev_page: false,
    next_page: null,
    prev_page: null,
  };
};

const extractArticle = (response: ArticleDetailResponse): RawArticle => {
  if (response && typeof response === "object" && "data" in response) {
    return response.data ?? {};
  }
  return response as RawArticle;
};

export const buildArticlesListKey = (params?: ArticleListParams) =>
  [...queryKeys.articles.lists(), params ?? {}] as const;

export const buildPublishedArticlesListKey = (
  params?: ArticleListParams
) => [...queryKeys.articles.lists(), "published", params ?? {}] as const;

export async function fetchArticles(
  params: ArticleListParams = {}
): Promise<ArticleListResult> {
  const response = await apiClient.get<ArticleListResponse>(ARTICLES_ENDPOINT, {
    params,
  });

  const list = response.data?.data ?? [];
  const meta = normalizeMeta(response.data?.meta, list.length, params);

  return {
    data: list.map(normalizeArticle),
    meta,
  };
}

export async function fetchPublishedArticles(
  params: ArticleListParams = {}
): Promise<ArticleListResult> {
  const response = await apiClient.get<ArticleListResponse>(
    PUBLISHED_ARTICLES_ENDPOINT,
    {
      params,
    }
  );

  const list = response.data?.data ?? [];
  const meta = normalizeMeta(response.data?.meta, list.length, params);

  return {
    data: list.map(normalizeArticle),
    meta,
  };
}

export async function fetchArticle(idOrSlug: string): Promise<Article> {
  const response = await apiClient.get<ArticleDetailResponse>(
    `${ARTICLES_ENDPOINT}${idOrSlug}/`
  );
  return normalizeArticle(
    extractArticle(response.data ?? (response as unknown as RawArticle))
  );
}

export async function fetchPublishedArticle(
  idOrSlug: string
): Promise<Article> {
  try {
    const response = await apiClient.get<ArticleDetailResponse>(
      `${PUBLISHED_ARTICLES_ENDPOINT}${idOrSlug}/`
    );
    return normalizeArticle(
      extractArticle(response.data ?? (response as unknown as RawArticle))
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      const fallback = await fetchPublishedArticles({
        search: idOrSlug,
        limit: 10,
      });
      const normalizedLookup = idOrSlug?.toLowerCase();
      const match = fallback.data.find((article) => {
        if (article.id === idOrSlug) return true;
        if (!normalizedLookup) return false;
        return article.slug?.toLowerCase() === normalizedLookup;
      });
      if (match) {
        return match;
      }
    }
    throw error;
  }
}

const mapPayload = (payload: ArticleUpdatePayload) => ({
  title: payload.title,
  excerpt: payload.excerpt,
  content: payload.content,
  status: payload.status,
  thumbnail: payload.thumbnail,
  category_id: payload.categoryId,
  read_time_mins: payload.readTimeMins,
  tags: payload.tags,
});

export async function createArticle(payload: ArticlePayload): Promise<Article> {
  const response = await apiClient.post<RawArticle>(
    ARTICLES_ENDPOINT,
    mapPayload(payload)
  );
  return normalizeArticle(response.data);
}

export async function updateArticle({
  id,
  data,
  method = "PATCH",
}: {
  id: string | number;
  data: ArticleUpdatePayload;
  method?: "PATCH" | "PUT";
}): Promise<Article> {
  const response = await apiClient.request<RawArticle>({
    url: `${ARTICLES_ENDPOINT}${id}/`,
    method,
    data: mapPayload(data),
  });
  return normalizeArticle(response.data);
}

export async function deleteArticle(id: string | number): Promise<void> {
  await apiClient.delete(`${ARTICLES_ENDPOINT}${id}/`);
}

export const useArticlesQuery = <TData = ArticleListResult>(
  params?: ArticleListParams,
  options?: Omit<
    UseQueryOptions<ArticleListResult, ApiError, TData>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TData, ApiError> =>
  useQuery<ArticleListResult, ApiError, TData>({
    queryKey: buildArticlesListKey(params),
    queryFn: () => fetchArticles(params),
    staleTime: 5 * 60 * 1000,
    ...options,
  });

export const useArticleQuery = <TData = Article>(
  idOrSlug: string | null | undefined,
  options?: UseQueryOptions<Article, ApiError, TData>
): UseQueryResult<TData, ApiError> =>
  useQuery<Article, ApiError, TData>({
    queryKey: idOrSlug
      ? queryKeys.articles.detail(String(idOrSlug))
      : [...queryKeys.articles.details(), "unknown"],
    queryFn: () => fetchArticle(idOrSlug as string),
    enabled: !!idOrSlug && (options?.enabled ?? true),
    staleTime: 5 * 60 * 1000,
    ...(options ?? {}),
  });

export const usePublishedArticlesQuery = <TData = ArticleListResult>(
  params?: ArticleListParams,
  options?: Omit<
    UseQueryOptions<ArticleListResult, ApiError, TData>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TData, ApiError> =>
  useQuery<ArticleListResult, ApiError, TData>({
    queryKey: buildPublishedArticlesListKey(params),
    queryFn: () => fetchPublishedArticles(params),
    staleTime: 5 * 60 * 1000,
    // initialData: ,
    ...options,
  });

export const usePublishedArticleQuery = <TData = Article>(
  idOrSlug: string | null | undefined,
  options?: Omit<UseQueryOptions<Article, ApiError, TData>, "queryKey" | "queryFn">
): UseQueryResult<TData, ApiError> =>
  useQuery<Article, ApiError, TData>({
    queryKey: idOrSlug
      ? [...queryKeys.articles.details(), "published", String(idOrSlug)]
      : [...queryKeys.articles.details(), "published", "unknown"],
    queryFn: () => fetchPublishedArticle(idOrSlug as string),
    enabled: !!idOrSlug && (options?.enabled ?? true),
    staleTime: 5 * 60 * 1000,
    ...(options ?? {}),
  });

export const useCreateArticleMutation = (
  options?: UseMutationOptions<Article, ApiError, ArticlePayload>
): UseMutationResult<Article, ApiError, ArticlePayload> => {
  const queryClient = useQueryClient();

  return useMutation<Article, ApiError, ArticlePayload>({
    mutationFn: createArticle,
    onSuccess: (article, variables, result, context) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.articles.all,
        exact: false,
      });
      queryClient.setQueryData(queryKeys.articles.detail(article.id), article);
      options?.onSuccess?.(article, variables, result, context);
    },
    ...options,
  });
};

export const useUpdateArticleMutation = (
  options?: UseMutationOptions<
    Article,
    ApiError,
    {
      id: string | number;
      data: ArticleUpdatePayload;
      method?: "PATCH" | "PUT";
    }
  >
): UseMutationResult<
  Article,
  ApiError,
  { id: string | number; data: ArticleUpdatePayload; method?: "PATCH" | "PUT" }
> => {
  const queryClient = useQueryClient();

  return useMutation<
    Article,
    ApiError,
    {
      id: string | number;
      data: ArticleUpdatePayload;
      method?: "PATCH" | "PUT";
    }
  >({
    mutationFn: ({ id, data, method }) => updateArticle({ id, data, method }),
    onSuccess: (article, variables, result, context) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.articles.all,
        exact: false,
      });
      queryClient.setQueryData(queryKeys.articles.detail(article.id), article);
      options?.onSuccess?.(article, variables, result, context);
    },
    ...options,
  });
};

export const useDeleteArticleMutation = (
  options?: UseMutationOptions<void, ApiError, string | number>
): UseMutationResult<void, ApiError, string | number> => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string | number>({
    mutationFn: (id) => deleteArticle(id),
    onSuccess: (data, variables, result, context) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.articles.all,
        exact: false,
      });
      options?.onSuccess?.(data, variables, result, context);
    },
    ...options,
  });
};

export const invalidateArticles = (
  queryClient: ReturnType<typeof useQueryClient>
) => {
  queryClient.invalidateQueries({
    queryKey: queryKeys.articles.all,
    exact: false,
  });
  queryClient.invalidateQueries({
    queryKey: queryKeys.articles.lists(),
    exact: false,
  });
};
