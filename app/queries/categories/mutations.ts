import { useMutation } from "@tanstack/react-query";
import {
  articleCategoriesSchema,
  type ArticleCategoryType,
} from "~/schema/article-categories-schema";

async function createCategory(data: ArticleCategoryType) {
  const category = articleCategoriesSchema.parse(data);
  // Create the category in the database
  return category;
}
async function updateCategory(id: string, data: Partial<ArticleCategoryType>) {
  const category = articleCategoriesSchema.partial().parse(data);
  // Update the category in the database
  return { id, ...category };
}
async function deleteCategory(id: string) {
  // Delete the category from the database
  return { id };
}

export const createCategoryMutation = useMutation({
  mutationFn: createCategory,
});

export const updateCategoryMutation = useMutation({
  mutationFn: ({
    id,
    data,
  }: {
    id: string;
    data: Partial<ArticleCategoryType>;
  }) => updateCategory(id, data),
});

export const deleteCategoryMutation = useMutation({
  mutationFn: deleteCategory,
});
