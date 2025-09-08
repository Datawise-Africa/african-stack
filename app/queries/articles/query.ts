import { useQuery } from "@tanstack/react-query";
import { articlesKeys } from "./keys";
import type { ArticleType } from "~/schema/article-schema";
import { generateArticles, generateArticle, generateFeaturedArticles, generateRecentArticles } from "~/utils/faker";

async function fetchArticles(): Promise<ArticleType[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateArticles(20);
}

async function fetchArticleById(id: string): Promise<ArticleType> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  
  // Check if we're requesting a specific ID that exists in our generated data
  // If not, just generate a new article with that ID
  const allArticles = generateArticles(20);
  const existingArticle = allArticles.find(article => article.id === id);
  
  if (existingArticle) {
    return existingArticle;
  }
  
  // Create a new article with the specified ID
  return {
    ...generateArticle(),
    id,
  };
}

async function fetchFeaturedArticles(): Promise<ArticleType[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 250));
  return generateFeaturedArticles(3);
}

async function fetchRecentArticles(): Promise<ArticleType[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 250));
  return generateRecentArticles(5);
}

export function useArticlesQuery() {
  const articlesQuery = useQuery({
    queryKey: articlesKeys.all,
    queryFn: () => fetchArticles(),
  });

  const featuredArticlesQuery = useQuery({
    queryKey: articlesKeys.featured(),
    queryFn: () => fetchFeaturedArticles(),
    initialData: [],
  });

  const recentArticlesQuery = useQuery({
    queryKey: articlesKeys.recent(),
    queryFn: () => fetchRecentArticles(),
    initialData: [],
  });
  
  // Function to fetch article by ID - using as getter function rather than a direct query
  const getArticleById = async (id: string) => {
    return fetchArticleById(id);
  };

  return {
    articlesQuery,
    getArticleById,
    featuredArticlesQuery,
    recentArticlesQuery,
  };
}
