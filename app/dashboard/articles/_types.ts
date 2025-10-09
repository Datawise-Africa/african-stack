"use client";

import {
  articleFormResolver,
  type ArticleSchemaValues,
  articleSchema,
} from "@/lib/schema/article-schema";

export const ARTICLE_STATUS_OPTIONS = [
  { label: "Draft", value: "draft" },
  { label: "Published", value: "published" },
] as const;

export const ARTICLE_PAGE_SIZE_OPTIONS = [10, 20, 30, 50] as const;

export const articlesFormResolver = articleFormResolver;
export type ArticleFormValues = ArticleSchemaValues;
export const articleFormSchema = articleSchema;
export const getDefaultArticleFormValues = (): ArticleFormValues => ({
  title: "",
  excerpt: "",
  contentHtml: "<p></p>",
  status: "draft",
  thumbnailUrl: "",
  category: "",
  collection: "",
  readTimeMins: undefined,
  tags: [],
});
