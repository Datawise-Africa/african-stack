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
import type { Category } from "@/lib/types";

const CATEGORIES_ENDPOINT = "/blogs/categories/";

export type CategoryListParams = {
  page?: number;
  limit?: number;
  search?: string;
};

type RawCategory = {
  id: number ;
  title: string;
  description?: string | null;
  slug?: string | null;
  article_count?: number | null;
  articles_count?: number | null;
  thumbnail?: string | null;
  created_at?: string;
  updated_at?: string;
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

type CategoryListResponse = {
  data: RawCategory[];
  meta: PaginationMeta;
};

export type CategoryListResult = {
  data: Category[];
  meta: PaginationMeta;
};

export type CategoryPayload = {
  title: string;
  description?: string;
  thumbnail?: string | null;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const normalizeCategory = (category: RawCategory): Category => {
  const id = (category.id);
  const title = category.title ?? "";
  const description = category.description ?? undefined;
  const slug =
    (typeof category.slug === "string" && category.slug.length > 0
      ? category.slug
      : slugify(title)) || ''+id;

  const count =
    typeof category.article_count === "number"
      ? category.article_count
      : typeof category.articles_count === "number"
        ? category.articles_count
        : 0;

  return {
    id,
    name: title,
    description,
    slug,
    articleCount: count,
    color: undefined,
    thumbnail: category.thumbnail ?? null,
  };
};

async function fetchCategories(
  params: CategoryListParams = {}
): Promise<CategoryListResult> {
  const response = await apiClient.get<CategoryListResponse>(
    CATEGORIES_ENDPOINT,
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
    data: (data ?? []).map(normalizeCategory),
    meta: fallbackMeta,
  };
}

async function fetchCategory(id: string | number): Promise<Category> {
  const response = await apiClient.get<RawCategory>(
    `${CATEGORIES_ENDPOINT}${id}/`
  );
  return normalizeCategory(response.data);
}

async function createCategory(payload: CategoryPayload): Promise<Category> {
  const response = await apiClient.post<RawCategory>(
    CATEGORIES_ENDPOINT,
    payload
  );
  return normalizeCategory(response.data);
}

async function updateCategory({
  id,
  data,
  method = "PATCH",
}: {
  id: string | number;
  data: CategoryPayload;
  method?: "PATCH" | "PUT";
}): Promise<Category> {
  const response = await apiClient.request<RawCategory>({
    url: `${CATEGORIES_ENDPOINT}${id}/`,
    method,
    data,
  });
  return normalizeCategory(response.data);
}

async function deleteCategory(id: string | number): Promise<void> {
  await apiClient.delete(`${CATEGORIES_ENDPOINT}${id}/`);
}

const normalizeListParams = (params?: CategoryListParams) => ({
  page: params?.page ?? undefined,
  limit: params?.limit ?? undefined,
  search: params?.search ?? undefined,
});

export const buildCategoriesListKey = (
  params?: CategoryListParams
) => [...queryKeys.categories.lists(), normalizeListParams(params)] as const;

export const useCategoriesQuery = <TData = CategoryListResult>(
  params?: CategoryListParams,
  options?: Omit<UseQueryOptions<CategoryListResult, ApiError, TData>, "queryKey" | "queryFn">
): UseQueryResult<TData, ApiError> =>
  useQuery<CategoryListResult, ApiError, TData>({
    queryKey: buildCategoriesListKey(params),
    queryFn: () => fetchCategories(params),
    staleTime: 5 * 60 * 1000,
    ...options,
  });

export const useCategoryQuery = <TData = Category>(
  id: string | number | null | undefined,
  options?: UseQueryOptions<Category, ApiError, TData>
): UseQueryResult<TData, ApiError> => {
  const queryKey = id
    ? queryKeys.categories.detail(String(id))
    : [...queryKeys.categories.details(), "unknown"];

  return useQuery<Category, ApiError, TData>({
    queryKey,
    queryFn: () => fetchCategory(id as string | number),
    enabled: !!id && (options?.enabled ?? true),
    staleTime: 5 * 60 * 1000,
    ...(options ?? {}),
  });
};

export const useCreateCategoryMutation = (
  options?: UseMutationOptions<Category, ApiError, CategoryPayload>
): UseMutationResult<Category, ApiError, CategoryPayload> => {
  const queryClient = useQueryClient();

  const invalidateLists = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.categories.all,
      exact: false,
    });
    queryClient.invalidateQueries({
      queryKey: queryKeys.categories.lists(),
      exact: false,
    });
  };

  return useMutation<Category, ApiError, CategoryPayload>({
    mutationFn: createCategory,
    onSuccess: (category, variables, result, context) => {
      invalidateLists();
      queryClient.setQueryData(
        queryKeys.categories.detail(''+category.id),
        category
      );
      options?.onSuccess?.(category, variables, result, context);
    },
    ...options,
  });
};

export const useUpdateCategoryMutation = (
  options?: UseMutationOptions<
    Category,
    ApiError,
    { id: string | number; data: CategoryPayload; method?: "PATCH" | "PUT" }
  >
): UseMutationResult<
  Category,
  ApiError,
  { id: string | number; data: CategoryPayload; method?: "PATCH" | "PUT" }
> => {
  const queryClient = useQueryClient();

  const invalidateLists = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.categories.all,
      exact: false,
    });
    queryClient.invalidateQueries({
      queryKey: queryKeys.categories.lists(),
      exact: false,
    });
  };

  return useMutation<
    Category,
    ApiError,
    { id: string | number; data: CategoryPayload; method?: "PATCH" | "PUT" }
  >({
    mutationFn: updateCategory,
    onSuccess: (category, variables, result, context) => {
      invalidateLists();
      queryClient.setQueryData(
        queryKeys.categories.detail(''+category.id),
        category
      );
      options?.onSuccess?.(category, variables, result, context);
    },
    ...options,
  });
};

export const useDeleteCategoryMutation = (
  options?: UseMutationOptions<void, ApiError, string | number>
): UseMutationResult<void, ApiError, string | number> => {
  const queryClient = useQueryClient();

  const invalidateLists = () => {
    queryClient.invalidateQueries({
      queryKey: queryKeys.categories.all,
      exact: false,
    });
    queryClient.invalidateQueries({
      queryKey: queryKeys.categories.lists(),
      exact: false,
    });
  };

  return useMutation<void, ApiError, string | number>({
    mutationFn: deleteCategory,
    onSuccess: (data, id, result, context) => {
      invalidateLists();
      queryClient.removeQueries({
        queryKey: queryKeys.categories.detail(String(id)),
      });
      options?.onSuccess?.(data, id, result, context);
    },
    ...options,
  });
};
