import type { UseQueryResult, UseQueryOptions } from "@tanstack/react-query";
import type { Category } from "@/lib/types";
import type { ApiError } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

import {
  useCategoriesQuery as useCategoriesQueryBase,
  useCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  buildCategoriesListKey,
  type CategoryListParams,
  type CategoryListResult,
} from "./query";

type CategoriesQueryOptions<TData> = Omit<
  UseQueryOptions<CategoryListResult, ApiError, TData>,
  "queryKey" | "queryFn"
>;

export const useCategories = (
  params?: CategoryListParams,
  options?: CategoriesQueryOptions<Category[]>
): UseQueryResult<Category[], ApiError> =>
  useCategoriesQueryBase<Category[]>(params, {
    select: (result) => result.data,
    ...(options ?? {}),
  });

export const usePaginatedCategories = (
  params?: CategoryListParams,
  options?: CategoriesQueryOptions<CategoryListResult>
): UseQueryResult<CategoryListResult, ApiError> =>
  useCategoriesQueryBase(params, {
    ...(options ?? {}),
  });

export { useCategoryQuery as useCategory };
export {
  useCategoriesQueryBase as useCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
};

export type { CategoryListParams, CategoryListResult };

export const categoriesQueryKeys = {
  ...queryKeys.categories,
  listWithParams: (params?: CategoryListParams) => buildCategoriesListKey(params),
};
