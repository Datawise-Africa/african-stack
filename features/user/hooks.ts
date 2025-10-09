import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { mockUsers, mockBookmarks, mockReadHistory } from './mock-data';
import { mockArticles } from '@/features/articles/mock-data';
import { User, Bookmark, ReadEvent, RoleRequest } from '@/lib/types';

// Mock API functions
const mockApi = {
  // Users
  getUsers: async (filters: Record<string, unknown> = {}): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let filteredUsers = [...mockUsers];
    
    if (filters.role) {
      const roles = Array.isArray(filters.role) ? filters.role : [filters.role];
      filteredUsers = filteredUsers.filter(user => roles.includes(user.user_role));
    }
    
    if (filters.status) {
      const statuses = Array.isArray(filters.status) ? filters.status : [filters.status];
      filteredUsers = filteredUsers.filter(user => statuses.includes(user));
    }
    
    if (filters.search) {
      const search = String(filters.search).toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.handle.toLowerCase().includes(search)
      );
    }
    
    return filteredUsers;
  },

  getUser: async (id: string): Promise<User | null> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockUsers.find(user => user.id === id) || null;
  },

  getCurrentUser: async (): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    // Return the first user as current user for demo
    return mockUsers[0];
  },

  updateUser: async (id: string, updates: Partial<User>): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = mockUsers.findIndex(user => user.id === id);
    if (index === -1) throw new Error('User not found');
    
    const updatedUser = { ...mockUsers[index], ...updates };
    mockUsers[index] = updatedUser;
    return updatedUser;
  },

  // Bookmarks
  getBookmarks: async (userId: string): Promise<Bookmark[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockBookmarks.filter(bookmark => bookmark.userId === userId);
  },

  addBookmark: async (articleId: string, userId: string): Promise<Bookmark> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const bookmark: Bookmark = {
      id: Date.now().toString(),
      articleId,
      userId,
      article: mockArticles.find(a => a.id === articleId) || mockArticles[0],
      bookmarkedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    mockBookmarks.push(bookmark);
    return bookmark;
  },

  removeBookmark: async (articleId: string, userId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockBookmarks.findIndex(
      bookmark => bookmark.articleId === articleId && bookmark.userId === userId
    );
    if (index !== -1) {
      mockBookmarks.splice(index, 1);
    }
  },

  toggleBookmark: async (articleId: string, userId: string): Promise<{ isBookmarked: boolean; bookmark?: Bookmark }> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const existingBookmark = mockBookmarks.find(
      bookmark => bookmark.articleId === articleId && bookmark.userId === userId
    );
    
    if (existingBookmark) {
      const index = mockBookmarks.indexOf(existingBookmark);
      mockBookmarks.splice(index, 1);
      return { isBookmarked: false };
    } else {
      const bookmark: Bookmark = {
        id: Date.now().toString(),
        articleId,
        userId,
        article: mockArticles.find(a => a.id === articleId) || mockArticles[0],
        bookmarkedAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      mockBookmarks.push(bookmark);
      return { isBookmarked: true, bookmark };
    }
  },

  // Read History
  getReadHistory: async (userId: string): Promise<ReadEvent[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockReadHistory
      .filter(event => event.userId === userId)
      .sort((a, b) => new Date(b.readAt).getTime() - new Date(a.readAt).getTime());
  },

  addReadEvent: async (articleId: string, userId: string, scrolledPct: number): Promise<ReadEvent> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const readEvent: ReadEvent = {
      id: Date.now().toString(),
      articleId,
      userId,
      scrolledPct,
      readAt: new Date().toISOString(),
      article: mockArticles.find(a => a.id === articleId) || mockArticles[0],
      readTimeSpent: Math.floor(Math.random() * 300) + 60 // Random time between 1-5 minutes
    };
    
    // Remove existing event for same article and add new one
    const existingIndex = mockReadHistory.findIndex(
      event => event.articleId === articleId && event.userId === userId
    );
    if (existingIndex !== -1) {
      mockReadHistory.splice(existingIndex, 1);
    }
    
    mockReadHistory.unshift(readEvent);
    return readEvent;
  },

  // Role Requests
  getRoleRequests: async (userId: string): Promise<RoleRequest[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    // Mock role requests for the user
    return [
      {
        id: '1',
        userId,
        message: 'I am passionate about technology and want to share my knowledge about AI and machine learning with the community.',
        portfolio: 'https://myblog.com',
        socialMedia: '@techwriter',
        expectedContent: 'AI tutorials, machine learning guides, and software development insights',
        status: 'pending',
        submittedAt: '2024-01-20T10:30:00Z',
        reviewedAt: undefined,
        reviewedBy: undefined,
        adminNotes: undefined
      }
    ];
  },

  createRoleRequest: async (request: Omit<RoleRequest, 'id' | 'submittedAt' | 'status'>): Promise<RoleRequest> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newRequest: RoleRequest = {
      ...request,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };
    // In a real app, this would be stored on the server
    return newRequest;
  },
};

// User Hooks
export const useUsers = (filters: Record<string, unknown> = {}) => {
  return useQuery({
    queryKey: queryKeys.users.list(filters),
    queryFn: () => mockApi.getUsers(filters),
    staleTime: 5 * 60 * 1000,
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => mockApi.getUser(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: queryKeys.users.profile(),
    queryFn: mockApi.getCurrentUser,
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<User> }) => 
      mockApi.updateUser(id, updates),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(queryKeys.users.detail(updatedUser.id), updatedUser);
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
    },
  });
};

// Bookmark Hooks
export const useBookmarks = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.users.bookmarks(userId),
    queryFn: () => mockApi.getBookmarks(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ articleId, userId }: { articleId: string; userId: string }) => 
      mockApi.toggleBookmark(articleId, userId),
    onSuccess: (result, { userId }) => {
      // Invalidate bookmarks for the user
      queryClient.invalidateQueries({ queryKey: queryKeys.users.bookmarks(userId) });
      
      // Optimistically update article reaction counts
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.lists() });
    },
  });
};

export const useAddBookmark = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ articleId, userId }: { articleId: string; userId: string }) => 
      mockApi.addBookmark(articleId, userId),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.bookmarks(userId) });
    },
  });
};

export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ articleId, userId }: { articleId: string; userId: string }) => 
      mockApi.removeBookmark(articleId, userId),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.bookmarks(userId) });
    },
  });
};

// Read History Hooks
export const useReadHistory = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.users.readHistory(userId),
    queryFn: () => mockApi.getReadHistory(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAddReadEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ articleId, userId, scrolledPct }: { 
      articleId: string; 
      userId: string; 
      scrolledPct: number; 
    }) => mockApi.addReadEvent(articleId, userId, scrolledPct),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.readHistory(userId) });
    },
  });
};

// Role Request Hooks
export const useRoleRequests = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.roleRequests.byUser(userId),
    queryFn: () => mockApi.getRoleRequests(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateRoleRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (request: Omit<RoleRequest, 'id' | 'submittedAt' | 'status'>) => 
      mockApi.createRoleRequest(request),
    onSuccess: (newRequest) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.roleRequests.byUser(newRequest.userId) });
    },
  });
};

// User Articles Hook
export const useUserArticles = (userId: string, _filters: Record<string, unknown> = {}) => {
  return useQuery({
    queryKey: queryKeys.users.articles(userId),
    queryFn: async () => {
      // This would typically call a different API endpoint
      // For now, we'll filter articles by author
      const { mockArticles } = await import('../articles/mock-data');
      console.log(_filters);
      
      return mockArticles.filter(article => article.author.id === userId);
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};