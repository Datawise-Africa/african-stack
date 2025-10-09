import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { mockArticles, mockCategories, mockTags } from './mock-data';
import { Article, ArticleFilters, Category, Tag } from '@/lib/types';
import {
  type ArticleListParams,
  usePublishedArticlesQuery,
  usePublishedArticleQuery,
} from './query';

// Mock API functions (will be replaced with real API calls)
const mockApi = {
  // Articles
  getArticles: async (filters: ArticleFilters = {}): Promise<Article[]> => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    
    let filteredArticles = [...mockArticles];
    
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filteredArticles = filteredArticles.filter(article => 
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    if (filters.category) {
      filteredArticles = filteredArticles.filter(article => 
        article.category.slug === filters.category
      );
    }
    
    if (filters.tag) {
      filteredArticles = filteredArticles.filter(article => 
        article.tags.includes(filters.tag!)
      );
    }
    
    if (filters.author) {
      filteredArticles = filteredArticles.filter(article => 
        article.author.id === filters.author
      );
    }
    
    if (filters.status) {
      filteredArticles = filteredArticles.filter(article => 
        article.status === filters.status
      );
    }
    
    // Sort
    if (filters.sort === 'trending') {
      filteredArticles.sort((a, b) => b.reactionsCount - a.reactionsCount);
    } else if (filters.sort === 'latest') {
      filteredArticles.sort((a, b) => 
        new Date(b.published_at || b.updated_at || '').getTime() - 
        new Date(a.published_at || a.updated_at || '').getTime()
      );
    }
    
    return filteredArticles;
  },

  getArticle: async (slug: string): Promise<Article | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockArticles.find(article => article.slug === slug) || null;
  },

  getArticleById: async (id: string): Promise<Article | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockArticles.find(article => article.id === id) || null;
  },

  createArticle: async (article: Partial<Article>): Promise<Article> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newArticle: Article = {
      id: Date.now().toString(),
      slug: article.slug || `article-${Date.now()}`,
      title: article.title || 'Untitled',
      excerpt: article.excerpt || '',
      content: article.content || '',
      author: article.author || {
        id: '1',
        first_name: 'John Doe',
        handle: '@johndoe',
        last_name: 'Smith',
      },
      category: article.category || mockCategories[0],
      tags: article.tags || [],
      thumbnailUrl: article.thumbnailUrl,
      readTimeMins: article.readTimeMins || 5,
      published_at: article.status === 'published' ? new Date().toISOString() : undefined,
      updated_at: new Date().toISOString(),
      status: article.status || 'draft',
      approvalStatus: article.approvalStatus,
      reactionsCount: 0,
      commentsCount: 0,
      views: 0
    };
    
    // In a real app, this would update the server
    mockArticles.unshift(newArticle);
    return newArticle;
  },

  updateArticle: async (id: string, updates: Partial<Article>): Promise<Article> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = mockArticles.findIndex(article => article.id === id);
    if (index === -1) throw new Error('Article not found');
    
    const updatedArticle = { ...mockArticles[index], ...updates, updatedAt: new Date().toISOString() };
    mockArticles[index] = updatedArticle;
    return updatedArticle;
  },

  deleteArticle: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockArticles.findIndex(article => article.id === id);
    if (index === -1) throw new Error('Article not found');
    mockArticles.splice(index, 1);
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockCategories;
  },

  getCategory: async (slug: string): Promise<Category | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockCategories.find(category => category.slug === slug) || null;
  },

  // Tags
  getTags: async (): Promise<Tag[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockTags;
  },

  getPopularTags: async (): Promise<Tag[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    // Count tag usage and return most popular
    const tagCounts = mockArticles.reduce((acc, article) => {
      article.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(tagCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([name, count], index) => ({ 
        id: `popular-tag-${index + 1}`,
        name, 
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        color: `hsl(${index * 36}, 70%, 50%)`,
        articleCount: count
      }));
  },
};

const sortToOrdering: Record<string, string> = {
  latest: '-published_at',
  trending: '-views',
  popular: '-reactions_count',
};

const mapFiltersToParams = (filters: ArticleFilters = {}): ArticleListParams => {
  const params: ArticleListParams = {
    page: filters.page,
    limit: filters.limit,
    search: filters.query,
    category: filters.category,
    status: filters.status,
    author: filters.author,
    tag: filters.tag,
  };

  if (filters.sort && sortToOrdering[filters.sort]) {
    params.ordering = sortToOrdering[filters.sort];
  }

  return params;
};

// Article Hooks
export const useArticles = (filters: ArticleFilters = {}) => {
  const params = useMemo(() => mapFiltersToParams(filters), [filters]);

  return usePublishedArticlesQuery(params);
};

export const useArticle = (articleId: string) => {
  return usePublishedArticleQuery(articleId, {
    enabled: !!articleId,
  });
};

export const useArticleById = (id: string) => {
  return usePublishedArticleQuery(id, {
    enabled: !!id,
  });
};

export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (article: Partial<Article>) => mockApi.createArticle(article),
    onSuccess: (newArticle) => {
      // Invalidate and refetch articles lists
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.articles(newArticle.author.id) });
      
      // Add the new article to the cache
      queryClient.setQueryData(queryKeys.articles.detail(newArticle.id), newArticle);
      queryClient.setQueryData(queryKeys.articles.bySlug(newArticle.slug), newArticle);
    },
  });
};

export const useUpdateArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Article> }) => 
      mockApi.updateArticle(id, updates),
    onSuccess: (updatedArticle) => {
      // Update the specific article in cache
      queryClient.setQueryData(queryKeys.articles.detail(updatedArticle.id), updatedArticle);
      queryClient.setQueryData(queryKeys.articles.bySlug(updatedArticle.slug), updatedArticle);
      
      // Invalidate lists to ensure they're up to date
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.lists() });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.articles(updatedArticle.author.id) });
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => mockApi.deleteArticle(id),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: queryKeys.articles.detail(deletedId) });
      
      // Invalidate lists
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.lists() });
    },
  });
};

// Category Hooks
export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.categories.lists(),
    queryFn: mockApi.getCategories,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.categories.bySlug(slug),
    queryFn: () => mockApi.getCategory(slug),
    enabled: !!slug,
    staleTime: 30 * 60 * 1000,
  });
};

// Tag Hooks
export const useTags = () => {
  return useQuery({
    queryKey: queryKeys.tags.lists(),
    queryFn: mockApi.getTags,
    staleTime: 30 * 60 * 1000,
  });
};

export const usePopularTags = () => {
  return useQuery({
    queryKey: queryKeys.tags.popular(),
    queryFn: mockApi.getPopularTags,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

// Search Hooks
export const useSearchArticles = (query: string) => {
  const params = useMemo<ArticleListParams>(
    () => ({
      search: query || undefined,
      page: 1,
      limit: 10,
    }),
    [query]
  );

  return usePublishedArticlesQuery(params, {
    enabled: !!query && query.length > 2,
  });
};

// Legacy hooks for backward compatibility
export const useArticleComments = (articleId: string) => {
  // This will be implemented when we add comments
  return useQuery({
    queryKey: queryKeys.comments.byArticle(articleId),
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 200));
      return []; // Mock empty comments for now
    },
    enabled: !!articleId,
  });
};
