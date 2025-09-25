"use client";

import { useQuery } from '@tanstack/react-query';
import { Category } from '@/lib/types';
import { mockCategories } from './mock-data';

// Query keys
export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (slug: string) => [...categoryKeys.details(), slug] as const,
};

// Mock API functions
const mockApi = {
  getCategories: async (): Promise<Category[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCategories;
  },
  
  getCategory: async (slug: string): Promise<Category> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const category = mockCategories.find(c => c.slug === slug);
    if (!category) {
      throw new Error('Category not found');
    }
    
    return category;
  },
};

// Hooks
export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: mockApi.getCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useCategory(slug: string) {
  return useQuery({
    queryKey: categoryKeys.detail(slug),
    queryFn: () => mockApi.getCategory(slug),
    enabled: !!slug,
  });
}
