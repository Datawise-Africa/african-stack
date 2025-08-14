import { defineCollection, z } from 'astro:content';

// Define the schema for the blog collection
export const collections = {
  'blog': defineCollection({
    schema: z.object({
      id: z.string(),
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
    }),
  }),
};
