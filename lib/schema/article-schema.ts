import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(4, "Add a descriptive title."),
  excerpt: z.string().min(20, "Write an excerpt with at least 20 characters."),
  tags: z
    .array(z.string().trim().min(1, "Tags cannot be empty."))
    .optional()
    .default([]),
  thumbnailUrl: z
    .string()
    .optional()
    .transform((value) => value?.trim() ?? "")
    .refine((value) => !value || /^https?:\/\//.test(value), {
      message: "Use a valid http or https URL.",
    }),
  category: z.coerce.number().min(1, "Select a category.").optional(),
  collection: z.coerce.number().optional(),
  status: z.enum(["draft", "published"]),
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
  contentHtml: z.string().min(1, "Write your article content."),
});

export const articleFormResolver = zodResolver(articleSchema);
export type ArticleSchemaValues = z.infer<typeof articleSchema>;
