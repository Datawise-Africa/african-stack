import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { Comment, Reaction } from '@/lib/types';

// Mock API functions for interactions
const mockApi = {
  // Comments
  getComments: async (articleId: string): Promise<Comment[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock comments data
    const mockComments: Comment[] = [
      {
        id: '1',
        articleId,
        user: {
          id: '2',
          first_name: 'Jane',
          last_name: 'Smith',
          handle: 'janes',
        },
        body: 'This is a great article! I learned a lot about AI and machine learning.',
        createdAt: '2024-01-20T10:30:00Z',
        updatedAt: '2024-01-20T10:30:00Z',
      },
      {
        id: '2',
        articleId,
        user: {
          id: '3',
          first_name: 'Mike',
          last_name: 'Johnson',
          handle: 'mikej',
        },
        body: 'Thanks for sharing this comprehensive guide. The examples were very helpful.',
        createdAt: '2024-01-20T11:15:00Z',
        updatedAt: '2024-01-20T11:15:00Z',
      },
      {
        id: '3',
        articleId,
        user: {
          id: '4',
          first_name: 'Sarah',
          last_name: 'Wilson',
          handle: 'sarahw',
        },
        body: 'I have a question about the implementation. Could you elaborate on the data preprocessing step?',
        createdAt: '2024-01-20T14:22:00Z',
        updatedAt: '2024-01-20T14:22:00Z',
      }
    ];
    
    return mockComments;
  },

  createComment: async (articleId: string, body: string, userId: string): Promise<Comment> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newComment: Comment = {
      id: Date.now().toString(),
      articleId,
      user: {
        id: userId,
        first_name: 'Current',
        last_name: 'User',
        handle: 'currentuser',
      },
      body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    return newComment;
  },

  updateComment: async (commentId: string, body: string): Promise<Comment> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Mock updated comment
    const updatedComment: Comment = {
      id: commentId,
      articleId: '1',
      user: {
        id: '1',
        first_name: 'Current',
        last_name: 'User',
        handle: 'currentuser',
      },
      body,
      createdAt: '2024-01-20T10:30:00Z',
      updatedAt: new Date().toISOString(),
    };
    
    return updatedComment;
  },

  deleteComment: async (commentId: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    // Mock deletion
  },

  // Reactions
  getReactions: async (articleId: string): Promise<{ count: number; userReaction?: Reaction }> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Mock reaction data
    const mockReactions: Reaction[] = [
      {
        id: '1',
        articleId,
        userId: '2',
        type: 'like',
        createdAt: '2024-01-20T10:30:00Z',
      },
      {
        id: '2',
        articleId,
        userId: '3',
        type: 'like',
        createdAt: '2024-01-20T11:15:00Z',
      },
      {
        id: '3',
        articleId,
        userId: '4',
        type: 'like',
        createdAt: '2024-01-20T14:22:00Z',
      }
    ];
    
    const currentUserId = '1'; // Mock current user
    const userReaction = mockReactions.find(r => r.userId === currentUserId);
    
    return {
      count: mockReactions.length,
      userReaction
    };
  },

  toggleReaction: async (articleId: string, userId: string, type: 'like' = 'like'): Promise<{ 
    isReacted: boolean; 
    reaction?: Reaction; 
    totalCount: number; 
  }> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock toggle logic
    const isReacted = Math.random() > 0.5; // Random for demo
    
    if (isReacted) {
      const reaction: Reaction = {
        id: Date.now().toString(),
        articleId,
        userId,
        type,
        createdAt: new Date().toISOString(),
      };
      
      return {
        isReacted: true,
        reaction,
        totalCount: Math.floor(Math.random() * 100) + 1
      };
    } else {
      return {
        isReacted: false,
        totalCount: Math.floor(Math.random() * 50)
      };
    }
  },
};

// Comment Hooks
export const useComments = (articleId: string) => {
  return useQuery({
    queryKey: queryKeys.comments.byArticle(articleId),
    queryFn: () => mockApi.getComments(articleId),
    enabled: !!articleId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ articleId, body, userId }: { 
      articleId: string; 
      body: string; 
      userId: string; 
    }) => mockApi.createComment(articleId, body, userId),
    onSuccess: (newComment, { articleId }) => {
      // Add the new comment to the cache
      queryClient.setQueryData(
        queryKeys.comments.byArticle(articleId),
        (oldComments: Comment[] = []) => [...oldComments, newComment]
      );
      
      // Invalidate article comments count
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.detail(articleId) });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ commentId, body }: { commentId: string; body: string }) => 
      mockApi.updateComment(commentId, body),
    onSuccess: (updatedComment) => {
      // Update the comment in cache
      queryClient.setQueryData(
        queryKeys.comments.byArticle(updatedComment.articleId),
        (oldComments: Comment[] = []) => 
          oldComments.map(comment => 
            comment.id === updatedComment.id ? updatedComment : comment
          )
      );
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (commentId: string) => mockApi.deleteComment(commentId),
    onSuccess: (_, commentId) => {
      // Remove the comment from all caches
      queryClient.setQueriesData(
        { queryKey: queryKeys.comments.all },
        (oldData: Comment[] | undefined) => 
          oldData?.filter(comment => comment.id !== commentId)
      );
    },
  });
};

// Reaction Hooks
export const useReactions = (articleId: string) => {
  return useQuery({
    queryKey: queryKeys.reactions.byArticle(articleId),
    queryFn: () => mockApi.getReactions(articleId),
    enabled: !!articleId,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useToggleReaction = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ articleId, userId, type }: { 
      articleId: string; 
      userId: string; 
      type?: 'like'; 
    }) => mockApi.toggleReaction(articleId, userId, type),
    onSuccess: (result, { articleId }) => {
      // Update the reactions cache
      queryClient.setQueryData(
        queryKeys.reactions.byArticle(articleId),
        {
          count: result.totalCount,
          userReaction: result.reaction
        }
      );
      
      // Invalidate article data to update reaction counts
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.detail(articleId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.lists() });
    },
  });
};

// Legacy hooks for backward compatibility
export const useArticleComments = (articleId: string) => {
  return useComments(articleId);
};
