// API configuration and base functions
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";
import { extractCorrectErrorMessage } from "./error-utils";
import { TsFixme } from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (
        token &&
        !config.url?.includes("login") &&
        !config.url?.includes("register")
      ) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Server responded with error status
      const errorData = error.response.data as TsFixme;
      throw new ApiError(
        error.response.status,
        errorData?.code || "UNKNOWN_ERROR",
        extractCorrectErrorMessage(error, "An error occurred"),
        errorData?.details
      );
    } else if (error.request) {
      // Network error
      throw new ApiError(
        0,
        "NETWORK_ERROR",
        "Network error occurred. Please check your connection."
      );
    } else {
      // Other error
      throw new ApiError(0, "UNKNOWN_ERROR", "An unexpected error occurred");
    }
  }
);

export async function apiRequest<T>(
  endpoint: string,
  options: AxiosRequestConfig = {}
): Promise<T> {
  try {
    const response = await apiClient.request<T>({
      url: endpoint,
      ...options,
    });
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      0,
      "UNKNOWN_ERROR",
      extractCorrectErrorMessage(error, "An unexpected error occurred")
    );
  }
}

// API endpoints
export const api = {
  // Articles
  articles: {
    list: (params?: Record<string, unknown>) =>
      apiRequest("/articles", { params }),
    get: (slug: string) => apiRequest(`/articles/${slug}`),
    create: (data: unknown) =>
      apiRequest("/articles", { method: "POST", data }),
    update: (id: string, data: unknown) =>
      apiRequest(`/articles/${id}`, { method: "PATCH", data }),
    delete: (id: string) => apiRequest(`/articles/${id}`, { method: "DELETE" }),
    publish: (id: string) =>
      apiRequest(`/articles/${id}/publish`, { method: "POST" }),
  },

  // Categories
  categories: {
    list: (params?: Record<string, unknown>) =>
      apiRequest("/blogs/categories/", { params }),
    get: (id: string | number) =>
      apiRequest(`/blogs/categories/${id}/`),
    create: (data: unknown) =>
      apiRequest("/blogs/categories/", { method: "POST", data }),
    update: (id: string | number, data: unknown) =>
      apiRequest(`/blogs/categories/${id}/`, { method: "PUT", data }),
    partialUpdate: (id: string | number, data: unknown) =>
      apiRequest(`/blogs/categories/${id}/`, { method: "PATCH", data }),
    delete: (id: string | number) =>
      apiRequest(`/blogs/categories/${id}/`, { method: "DELETE" }),
  },

  // Reactions
  reactions: {
    toggle: (articleId: string) =>
      apiRequest(`/articles/${articleId}/reactions`, { method: "POST" }),
  },

  // Comments
  comments: {
    list: (articleId: string) => apiRequest(`/articles/${articleId}/comments`),
    create: (articleId: string, data: { body: string }) =>
      apiRequest(`/articles/${articleId}/comments`, { method: "POST", data }),
    update: (id: string, data: { body: string }) =>
      apiRequest(`/comments/${id}`, { method: "PATCH", data }),
    delete: (id: string) => apiRequest(`/comments/${id}`, { method: "DELETE" }),
  },

  // Bookmarks
  bookmarks: {
    toggle: (articleId: string) =>
      apiRequest(`/bookmarks/${articleId}/toggle`, { method: "POST" }),
    list: () => apiRequest("/dashboard/bookmarks"),
  },

  // Read History
  readHistory: {
    record: (data: { articleId: string; scrolledPct: number }) =>
      apiRequest("/reads", { method: "POST", data }),
    list: () => apiRequest("/dashboard/history"),
  },

  // User
  user: {
    me: () => apiRequest("/dashboard/profile"),
    articles: () => apiRequest("/dashboard/articles"),
  },

  // Search
  search: {
    query: (q: string) => apiRequest("/search", { params: { q } }),
  },

  // Newsletter
  newsletter: {
    subscribe: (data: { email: string; name?: string; interests?: string[] }) =>
      apiRequest("/newsletter/subscribe", { method: "POST", data }),
    unsubscribe: (email: string) =>
      apiRequest("/newsletter/unsubscribe", {
        method: "POST",
        data: { email },
      }),
    issues: () => apiRequest("/newsletter/issues"),
    issue: (id: string) => apiRequest(`/newsletter/issues/${id}`),
  },

  // Admin
  admin: {
    users: (params?: Record<string, unknown>) =>
      apiRequest("/admin/users", { params }),
    updateUser: (id: string, data: unknown) =>
      apiRequest(`/admin/users/${id}`, { method: "PATCH", data }),
    articles: (params?: Record<string, unknown>) =>
      apiRequest("/admin/articles", { params }),
    approveArticle: (id: string) =>
      apiRequest(`/admin/articles/${id}/approve`, { method: "POST" }),
    rejectArticle: (id: string, reason: string) =>
      apiRequest(`/admin/articles/${id}/reject`, {
        method: "POST",
        data: { reason },
      }),
  },
};

// Export the axios instance for direct use if needed
export { apiClient };
