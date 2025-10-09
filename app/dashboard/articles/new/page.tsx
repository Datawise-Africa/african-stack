"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { useCategories } from "@/features/categories/hooks";
import { useCollections } from "@/features/collections/hooks";
import { useCreateArticleMutation } from "@/features/articles/query";

import { ArticleForm } from "../_components/article-form";
import type { ArticleFormValues } from "../_types";
import { buildArticlePayload } from "../_utils/form-utils";

export default function NewArticlePage() {
  const router = useRouter();
  const { data: categoriesData = [] } = useCategories();
  const { data: collectionsData = [] } = useCollections();

  const createArticle = useCreateArticleMutation({
    onSuccess: (article) => {
      toast.success(`Article "${article.title}" created.`);
      router.push("/dashboard/articles");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create article.");
    },
  });

  const handleSubmit = async (values: ArticleFormValues) => {
    const payload = buildArticlePayload(values);
    await createArticle.mutateAsync(payload);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ArticleForm
        categories={categoriesData}
        collections={collectionsData}
        onSubmit={handleSubmit}
        isSubmitting={createArticle.isPending}
        submitLabel="Create article"
      />
    </div>
  );
}
