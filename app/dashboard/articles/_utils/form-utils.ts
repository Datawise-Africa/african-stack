"use client";

import type { Article } from "@/lib/types";
import type { ArticlePayload } from "@/features/articles/query";
import {
  ARTICLE_STATUS_OPTIONS,
  getDefaultArticleFormValues,
  type ArticleFormValues,
} from "../_types";

export const estimateReadTime = (html: string | undefined): number => {
  if (!html) return 1;
  const text = html
    .replace(/<\/?[^>]+(>|$)/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return 1;
  const words = text.split(" ").length;
  const wordsPerMinute = 200;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

export const mapArticleToFormValues = (
  article: Article | null | undefined
): ArticleFormValues => {
  if (!article) return getDefaultArticleFormValues();

  return {
    title: article.title ?? "",
    excerpt: article.excerpt ?? "",
    contentHtml: article.content ?? "<p></p>",
    status:
      ARTICLE_STATUS_OPTIONS.find((opt) => opt.value === article.status)?.value ??
      "draft",
    thumbnailUrl: article.thumbnailUrl ?? "",
    categoryId: article.category?.id ?? "",
    readTimeMins: article.readTimeMins,
    tags: article.tags ?? [],
  };
};

export const buildArticlePayload = (
  values: ArticleFormValues
): ArticlePayload => {
  const readTime = values.readTimeMins ?? estimateReadTime(values.contentHtml);

  return {
    title: values.title.trim(),
    excerpt: values.excerpt.trim(),
    content: values.contentHtml,
    status: values.status,
    thumbnail: values.thumbnailUrl?.trim() || undefined,
    categoryId: values.categoryId || undefined,
    readTimeMins: readTime,
    tags: (values.tags ?? []).map((tag) => tag.trim()).filter(Boolean),
  };
};
