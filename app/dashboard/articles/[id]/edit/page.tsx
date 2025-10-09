"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

import { useCategories } from "@/features/categories/hooks";
import { useCollections } from "@/features/collections/hooks";
import { useArticleQuery, useUpdateArticleMutation } from "@/features/articles/query";

import { ArticleForm } from "../../_components/article-form";
import type { ArticleFormValues } from "../../_types";
import { mapArticleToFormValues, buildArticlePayload } from "../../_utils/form-utils";

export default function EditArticlePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const articleId = params?.id;

  const { data: categoriesData = [] } = useCategories();
  const { data: collectionsData = [] } = useCollections();
  const {
    data: article,
    isPending,
    isError,
    error,
  } = useArticleQuery(articleId ?? null);

  const updateArticle = useUpdateArticleMutation({
    onSuccess: (updated) => {
      toast.success(`Article "${updated.title}" updated.`);
      router.push("/dashboard/articles");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update article.");
    },
  });

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message || "Failed to load article.");
    }
  }, [isError, error]);

  const handleSubmit = async (values: ArticleFormValues) => {
    if (!articleId) return;
    const payload = buildArticlePayload(values);
    await updateArticle.mutateAsync({ id: articleId, data: payload });
  };

  if (!article || isPending) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading article…</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ArticleForm
        categories={categoriesData}
        collections={collectionsData}
        initialValues={mapArticleToFormValues(article)}
        onSubmit={handleSubmit}
        isSubmitting={updateArticle.isPending}
        submitLabel="Save changes"
      />
    </div>
  );
}
