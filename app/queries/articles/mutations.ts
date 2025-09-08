import { useMutation } from "@tanstack/react-query";
import { articleSchema, type ArticleType } from "~/schema/article-schema";

async function createArticle(data: ArticleType) {
  const article = articleSchema.parse(data);
  // Create the article in the database
  return article;
}
async function updateArticle(id: string, data: Partial<ArticleType>) {
  const article = articleSchema.partial().parse(data);
  // Update the article in the database
  return { id, ...article };
}
async function deleteArticle(id: string) {
  // Delete the article from the database
  return { id };
}

const createArticleMutation = useMutation({
  mutationFn: createArticle,
});

const updateArticleMutation = useMutation({
  mutationFn: ({ id, data }: { id: string; data: Partial<ArticleType> }) =>
    updateArticle(id, data),
});

const deleteArticleMutation = useMutation({
  mutationFn: deleteArticle,
});

export function useArticleMutations() {
  return {
    createArticleMutation,
    updateArticleMutation,
    deleteArticleMutation,
  };
}
