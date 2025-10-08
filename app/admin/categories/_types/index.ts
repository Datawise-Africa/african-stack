import type { CategoryListResult } from "@/features/categories/query";
import type { Category } from "@/lib/types";
import type {
  CategoryFormValues as BaseCategoryFormValues,
} from "@/lib/schema/category-schema";

export type StatusMessage = {
  type: "success" | "error";
  message: string;
};

export type CategoryFormValues = BaseCategoryFormValues;

export type PageItem =
  | { type: "number"; value: number }
  | { type: "ellipsis"; id: string };

export interface CategoryTableProps {
  data: Category[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  onRefresh: () => void;
  onCreate: () => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  isDeleting: boolean;
  meta?: CategoryListResult["meta"];
  search: string;
  onSearch: (value: string) => void;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
}

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100] as const;
