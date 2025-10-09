import type { UseQueryResult, UseQueryOptions } from "@tanstack/react-query";
import type { ApiError } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";

import {
  useCollectionsQuery as useCollectionsQueryBase,
  buildCollectionsListKey,
  type CollectionListParams,
  type CollectionListResult,
  type CollectionWithArticles,
  useCreateCollectionMutation,
} from "./query";

type CollectionsQueryOptions<TData> = Omit<
  UseQueryOptions<CollectionListResult, ApiError, TData>,
  "queryKey" | "queryFn"
>;

export const useCollections = (
  params?: CollectionListParams,
  options?: CollectionsQueryOptions<CollectionWithArticles[]>
): UseQueryResult<CollectionWithArticles[], ApiError> =>
  useCollectionsQueryBase<CollectionWithArticles[]>(params, {
    select: (result) => result.data,
    ...(options ?? {}),
  });

export const usePaginatedCollections = (
  params?: CollectionListParams,
  options?: CollectionsQueryOptions<CollectionListResult>
): UseQueryResult<CollectionListResult, ApiError> =>
  useCollectionsQueryBase(params, {
    ...(options ?? {}),
  });

export { useCollectionsQueryBase as useCollectionsQuery };
export { useCreateCollectionMutation };

export type {
  CollectionListParams,
  CollectionListResult,
  CollectionWithArticles,
} from "./query";

export const collectionsQueryKeys = {
  ...queryKeys.collections,
  listWithParams: (params?: CollectionListParams) => buildCollectionsListKey(params),
};
