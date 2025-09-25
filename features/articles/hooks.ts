"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Article, ArticleFilters, ArticleListResponse, Comment, Reaction } from '@/lib/types';
import { mockArticles, mockComments, mockReactions } from './mock-data';

// Query keys
export const articleKeys = {
  all: ['articles'] as const,
  lists: () => [...articleKeys.all, 'list'] as const,
  list: (filters: ArticleFilters) => [...articleKeys.lists(), filters] as const,
  details: () => [...articleKeys.all, 'detail'] as const,
  detail: (slug: string) => [...articleKeys.details(), slug] as const,
  comments: (articleId: string) => [...articleKeys.all, 'comments', articleId] as const,
  reactions: (articleId: string) => [...articleKeys.all, 'reactions', articleId] as const,
};

// Mock API functions
const mockApi = {
  getArticles: async (filters: ArticleFilters = {}): Promise<ArticleListResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredArticles = [...mockArticles];
    
    // Apply filters
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
        article.tags.some(tag => tag.toLowerCase() === filters.tag?.toLowerCase())
      );
    }
    
    // Apply sorting
    if (filters.sort === 'trending') {
      filteredArticles.sort((a, b) => b.reactionsCount - a.reactionsCount);
    } else if (filters.sort === 'popular') {
      filteredArticles.sort((a, b) => (b.views || 0) - (a.views || 0));
    } else {
      // Default to latest
      filteredArticles.sort((a, b) => 
        new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime()
      );
    }
    
    // Apply pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      articles: filteredArticles.slice(startIndex, endIndex),
      pagination: {
        page,
        limit,
        total: filteredArticles.length,
        totalPages: Math.ceil(filteredArticles.length / limit),
      },
    };
  },
  
  getArticle: async (slug: string): Promise<Article> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const article = mockArticles.find(a => a.slug === slug);
    if (!article) {
      throw new Error('Article not found');
    }
    
    return article;
  },
  
  getComments: async (articleId: string): Promise<Comment[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockComments.filter(comment => comment.articleId === articleId);
  },
  
  toggleReaction: async (articleId: string): Promise<{ isReacted: boolean; count: number }> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const article = mockArticles.find(a => a.id === articleId);
    if (!article) throw new Error('Article not found');
    
    // Simulate toggle logic
    const isReacted = Math.random() > 0.5;
    const newCount = isReacted ? article.reactionsCount + 1 : article.reactionsCount - 1;
    
    return { isReacted, count: Math.max(0, newCount) };
  },
  
  addComment: async (articleId: string, body: string): Promise<Comment> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      articleId,
      user: {
        id: 'current-user',
        name: 'Current User',
        avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=current'
      },
      body,
      createdAt: new Date().toISOString(),
    };
    
    return newComment;
  },
};

// Hooks
export function useArticles(filters: ArticleFilters = {}) {
  return useQuery({
    queryKey: articleKeys.list(filters),
    queryFn: () => mockApi.getArticles(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useArticle(slug: string) {
  return useQuery({
    queryKey: articleKeys.detail(slug),
    queryFn: () => mockApi.getArticle(slug),
    enabled: !!slug,
  });
}

export function useArticleComments(articleId: string) {
  return useQuery({
    queryKey: articleKeys.comments(articleId),
    queryFn: () => mockApi.getComments(articleId),
    enabled: !!articleId,
  });
}

export function useToggleReaction() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: mockApi.toggleReaction,
    onSuccess: (data, articleId) => {
      // Update the article's reaction count
      queryClient.setQueryData(
        articleKeys.detail(articleId),
        (oldData: Article | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            reactionsCount: data.count,
          };
        }
      );
      
      // Update articles list
      queryClient.invalidateQueries({ queryKey: articleKeys.lists() });
    },
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ articleId, body }: { articleId: string; body: string }) =>
      mockApi.addComment(articleId, body),
    onSuccess: (newComment, { articleId }) => {
      // Add comment to the list
      queryClient.setQueryData(
        articleKeys.comments(articleId),
        (oldData: Comment[] | undefined) => {
          if (!oldData) return [newComment];
          return [...oldData, newComment];
        }
      );
      
      // Update article comment count
      queryClient.setQueryData(
        articleKeys.detail(articleId),
        (oldData: Article | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            commentsCount: oldData.commentsCount + 1,
          };
        }
      );
    },
  });
}
