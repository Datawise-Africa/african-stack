import {z} from "zod";

export const articleCategoriesSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
});

export type ArticleCategoryType = z.infer<typeof articleCategoriesSchema>;