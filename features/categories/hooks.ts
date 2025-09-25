import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { mockCategories } from '../articles/mock-data';
import { Category } from '@/lib/types';

// Mock API functions
const mockApi = {
  getCategories: async (): Promise<Category[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockCategories;
  },

  getCategory: async (slug: string): Promise<Category | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockCategories.find(category => category.slug === slug) || null;
  },
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