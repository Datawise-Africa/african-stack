import { categoriesKeys } from "./keys";
import { useQuery } from "@tanstack/react-query";
import { getCategories as fetchCategories, getCategoryById as fetchCategoryById } from "~/utils/faker";
import type { ArticleCategoryType } from "~/schema/article-categories-schema";

async function getCategories(): Promise<ArticleCategoryType[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  return fetchCategories();
}

async function getCategoryById(id: string): Promise<ArticleCategoryType | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 150));
  return fetchCategoryById(id);
}

export function useCategoriesQuery() {
  const categoriesQuery = useQuery({
    queryKey: categoriesKeys.all,
    queryFn: () => getCategories(),
    initialData: [],
  });

  // Function to fetch category by ID - using as getter function
  const getCategoryByIdFn = async (id: string) => {
    return getCategoryById(id);
  };

  return {
    categoriesQuery,
    getCategoryById: getCategoryByIdFn,
  };
}
