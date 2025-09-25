"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { User, UserProfile, Bookmark, ReadEvent } from '@/lib/types';
import { mockUser, mockUserProfile, mockBookmarks, mockReadHistory } from './mock-data';

// Query keys
export const userKeys = {
  all: ['user'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
  bookmarks: () => [...userKeys.all, 'bookmarks'] as const,
  readHistory: () => [...userKeys.all, 'readHistory'] as const,
  articles: () => [...userKeys.all, 'articles'] as const,
};

// Mock API functions
const mockApi = {
  getCurrentUser: async (): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUser;
  },
  
  getUserProfile: async (): Promise<UserProfile> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockUserProfile;
  },
  
  getBookmarks: async (): Promise<Bookmark[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockBookmarks;
  },
  
  getReadHistory: async (): Promise<ReadEvent[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockReadHistory;
  },
  
  getUserArticles: async (): Promise<{ published: any[]; drafts: any[] }> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const userArticles = mockUserProfile.recentArticles;
    const published = userArticles.filter(article => article.status === 'published');
    const drafts = userArticles.filter(article => article.status === 'draft');
    
    return { published, drafts };
  },
  
  toggleBookmark: async (articleId: string): Promise<{ isBookmarked: boolean }> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simulate toggle logic
    const isBookmarked = Math.random() > 0.5;
    return { isBookmarked };
  },
  
  recordReadEvent: async (data: { articleId: string; scrolledPct: number }): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    // Simulate recording read event
    console.log('Read event recorded:', data);
  },
};

// Hooks
export function useCurrentUser() {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: mockApi.getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUserProfile() {
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: mockApi.getUserProfile,
    staleTime: 5 * 60 * 1000,
  });
}

export function useBookmarks() {
  return useQuery({
    queryKey: userKeys.bookmarks(),
    queryFn: mockApi.getBookmarks,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useReadHistory() {
  return useQuery({
    queryKey: userKeys.readHistory(),
    queryFn: mockApi.getReadHistory,
    staleTime: 2 * 60 * 1000,
  });
}

export function useUserArticles() {
  return useQuery({
    queryKey: userKeys.articles(),
    queryFn: mockApi.getUserArticles,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
}

export function useToggleBookmark() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: mockApi.toggleBookmark,
    onSuccess: (data, articleId) => {
      // Update bookmarks list
      queryClient.invalidateQueries({ queryKey: userKeys.bookmarks() });
      
      // Update article bookmark status in articles list
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
}

export function useRecordReadEvent() {
  return useMutation({
    mutationFn: mockApi.recordReadEvent,
    onSuccess: () => {
      // Update read history
      // In a real app, you might want to invalidate read history queries
    },
  });
}
