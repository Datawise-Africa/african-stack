import type { Category } from "@/lib/types";
import type { CategoryFormValues } from "../_types";

export const getDefaultCategoryFormValues = (): CategoryFormValues => ({
  title: "",
  description: "",
  thumbnail: "",
});

export const mapCategoryToFormValues = (
  category: Category
): CategoryFormValues => ({
  title: category.name,
  description: category.description ?? "",
  thumbnail: category.thumbnail ?? "",
});

export const buildCategoryPayload = (values: CategoryFormValues) => ({
  title: values.title.trim(),
  description: values.description?.trim()
    ? values.description.trim()
    : undefined,
  thumbnail: values.thumbnail?.trim() ? values.thumbnail.trim() : undefined,
});
