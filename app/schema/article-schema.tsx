import { z } from "zod";

export const articleSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  category: z.string(),
  readTime: z.string(),
  publishDate: z.string(),
  image: z.string(),
  author: z.object({
    name: z.string(),
    avatar: z.string(),
    bio: z.string(),
  }),
  tags: z.array(z.string()),
  featured: z.boolean().optional(),
});
export type ArticleType = z.infer<typeof articleSchema>;
