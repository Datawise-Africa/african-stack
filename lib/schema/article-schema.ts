import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(4, "Title must be at least 4 characters."),
  excerpt: z.string().min(20, "Excerpt should contain at least 20 characters."),
  contentHtml: z.string().min(1, "Content cannot be empty."),
  status: z.enum(["draft", "published"]),
  thumbnailUrl: z
    .string()
    .optional()
    .transform((value) => value?.trim() ?? "")
    .refine(
      (value) => !value || /^https?:\/\//.test(value),
      "Please enter a valid URL."
    ),
  categoryId: z.string().optional(),
  readTimeMins: z
    .union([z.number(), z.string()])
    .optional()
    .transform((value) => {
      if (typeof value === "number") return value;
      if (typeof value === "string" && value.trim() !== "") {
        const parsed = Number(value);
        return Number.isNaN(parsed) ? undefined : parsed;
      }
      return undefined;
    }),
  tags: z
    .array(z.string().trim().min(1, "Tags cannot be empty string."))
    .optional()
    .default([]),
});

export const articleFormResolver = zodResolver(articleSchema);
export type ArticleSchemaValues = z.infer<typeof articleSchema>;
