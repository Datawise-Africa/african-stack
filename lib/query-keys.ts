/**
 * Query key factory for consistent caching across the application
 * This ensures all components use the same query keys for the same data
 */

export const queryKeys = {
  // Articles
  articles: {
    all: ['articles'] as const,
    lists: () => [...queryKeys.articles.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.articles.lists(), filters] as const,
    details: () => [...queryKeys.articles.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.articles.details(), id] as const,
    bySlug: (slug: string) => [...queryKeys.articles.details(), 'slug', slug] as const,
    byCategory: (categorySlug: string) => [...queryKeys.articles.lists(), 'category', categorySlug] as const,
    byTag: (tag: string) => [...queryKeys.articles.lists(), 'tag', tag] as const,
    byAuthor: (authorId: string) => [...queryKeys.articles.lists(), 'author', authorId] as const,
    search: (query: string) => [...queryKeys.articles.lists(), 'search', query] as const,
  },

  // Users
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.users.lists(), filters] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
    profile: () => [...queryKeys.users.all, 'profile'] as const,
    bookmarks: (userId: string) => [...queryKeys.users.detail(userId), 'bookmarks'] as const,
    readHistory: (userId: string) => [...queryKeys.users.detail(userId), 'readHistory'] as const,
    articles: (userId: string) => [...queryKeys.users.detail(userId), 'articles'] as const,
  },

  // Categories
  categories: {
    all: ['categories'] as const,
    lists: () => [...queryKeys.categories.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.categories.lists(), filters] as const,
    details: () => [...queryKeys.categories.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.categories.details(), id] as const,
    bySlug: (slug: string) => [...queryKeys.categories.details(), 'slug', slug] as const,
  },

  // Tags
  tags: {
    all: ['tags'] as const,
    lists: () => [...queryKeys.tags.all, 'list'] as const,
    list: (filters: Record<string, unknown>) => [...queryKeys.tags.lists(), filters] as const,
    popular: () => [...queryKeys.tags.lists(), 'popular'] as const,
  },

  // Comments
  comments: {
    all: ['comments'] as const,
    byArticle: (articleId: string) => [...queryKeys.comments.all, 'article', articleId] as const,
    byUser: (userId: string) => [...queryKeys.comments.all, 'user', userId] as const,
  },

  // Reactions
  reactions: {
    all: ['reactions'] as const,
    byArticle: (articleId: string) => [...queryKeys.reactions.all, 'article', articleId] as const,
    byUser: (userId: string) => [...queryKeys.reactions.all, 'user', userId] as const,
    userReaction: (articleId: string, userId: string) => [...queryKeys.reactions.all, 'user', userId, 'article', articleId] as const,
  },

  // Role Requests
  roleRequests: {
    all: ['roleRequests'] as const,
    byUser: (userId: string) => [...queryKeys.roleRequests.all, 'user', userId] as const,
    pending: () => [...queryKeys.roleRequests.all, 'pending'] as const,
  },

  // Analytics
  analytics: {
    all: ['analytics'] as const,
    overview: () => [...queryKeys.analytics.all, 'overview'] as const,
    articles: () => [...queryKeys.analytics.all, 'articles'] as const,
    users: () => [...queryKeys.analytics.all, 'users'] as const,
    byUser: (userId: string) => [...queryKeys.analytics.all, 'user', userId] as const,
  },

  // Admin
  admin: {
    all: ['admin'] as const,
    users: (filters: Record<string, unknown>) => [...queryKeys.admin.all, 'users', filters] as const,
    articles: (filters: Record<string, unknown>) => [...queryKeys.admin.all, 'articles', filters] as const,
    roleRequests: (filters: Record<string, unknown>) => [...queryKeys.admin.all, 'roleRequests', filters] as const,
    stats: () => [...queryKeys.admin.all, 'stats'] as const,
  },
} as const;

// Helper function to create query keys with default filters
export const createQueryKey = <T extends Record<string, unknown>>(
  baseKey: readonly string[],
  filters: T = {} as T
) => [...baseKey, filters] as const;
