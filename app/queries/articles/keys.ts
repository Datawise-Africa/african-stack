export const articlesKeys = {
  all: ["articles"] as const,
  lists: () => [...articlesKeys.all, "list"] as const,
  list: (filters: string) => [...articlesKeys.lists(), { filters }] as const,
  featured: () => [...articlesKeys.all, "featured"] as const,
    recent: () => [...articlesKeys.all, "recent"] as const,
  details: () => [...articlesKeys.all, "detail"] as const,
  detail: (id: string) => [...articlesKeys.details(), id] as const,
};