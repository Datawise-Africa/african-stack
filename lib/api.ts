// API configuration and base functions

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add auth token if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        response.status,
        errorData.code || 'UNKNOWN_ERROR',
        errorData.message || 'An error occurred',
        errorData.details
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or other errors
    throw new ApiError(
      0,
      'NETWORK_ERROR',
      'Network error occurred. Please check your connection.'
    );
  }
}

// API endpoints
export const api = {
  // Articles
  articles: {
    list: (params?: Record<string, unknown>) => 
      apiRequest(`/articles?${new URLSearchParams(params as Record<string, string>)}`),
    get: (slug: string) => apiRequest(`/articles/${slug}`),
    create: (data: unknown) => apiRequest('/articles', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: unknown) => 
      apiRequest(`/articles/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) => apiRequest(`/articles/${id}`, { method: 'DELETE' }),
    publish: (id: string) => apiRequest(`/articles/${id}/publish`, { method: 'POST' }),
  },
  
  // Categories
  categories: {
    list: () => apiRequest('/categories'),
    get: (slug: string) => apiRequest(`/categories/${slug}`),
  },
  
  // Reactions
  reactions: {
    toggle: (articleId: string) => 
      apiRequest(`/articles/${articleId}/reactions`, { method: 'POST' }),
  },
  
  // Comments
  comments: {
    list: (articleId: string) => apiRequest(`/articles/${articleId}/comments`),
    create: (articleId: string, data: { body: string }) => 
      apiRequest(`/articles/${articleId}/comments`, { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: { body: string }) => 
      apiRequest(`/comments/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (id: string) => apiRequest(`/comments/${id}`, { method: 'DELETE' }),
  },
  
  // Bookmarks
  bookmarks: {
    toggle: (articleId: string) => 
      apiRequest(`/bookmarks/${articleId}/toggle`, { method: 'POST' }),
    list: () => apiRequest('/dashboard/bookmarks'),
  },
  
  // Read History
  readHistory: {
    record: (data: { articleId: string; scrolledPct: number }) => 
      apiRequest('/reads', { method: 'POST', body: JSON.stringify(data) }),
    list: () => apiRequest('/dashboard/history'),
  },
  
  // User
  user: {
    me: () => apiRequest('/dashboard/profile'),
    articles: () => apiRequest('/dashboard/articles'),
  },
  
  // Search
  search: {
    query: (q: string) => apiRequest(`/search?q=${encodeURIComponent(q)}`),
  },
};
