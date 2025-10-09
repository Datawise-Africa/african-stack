// Core types for the African Stack platform

// Temporary type for areas that need proper typing
// TODO: Replace with proper types when implementing full functionality
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TsFixme = any;

export type ID = string;

// User types
export type UserRole = "user" | "author" | "admin";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_role: UserRole;
  name: string;
  handle: string;
}

export interface UserProfile extends User {
  recentArticles: Article[];
  recentBookmarks: Bookmark[];
}

// Role Request types
export interface RoleRequest {
  id: ID;
  userId: ID;
  message: string;
  portfolio?: string;
  socialMedia?: string;
  expectedContent: string;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  adminNotes?: string;
}

// Article Approval types
export interface ArticleApproval {
  id: ID;
  articleId: ID;
  article: Article;
  status: "pending" | "approved" | "rejected";
  reviewedBy?: ID;
  reviewedAt?: string;
  reviewNotes?: string;
  createdAt: string;
  updatedAt: string;
}

// Category types
export interface Category {
  id: ID;
  slug: string;
  name: string;
  description?: string;
  articleCount: number;
  color?: string;
  recentArticles?: Article[];
  thumbnail?: string | null;
}

export interface Tag {
  id: ID;
  name: string;
  slug: string;
  color?: string;
  articleCount: number;
}

export interface Collection {
  id: ID;
  name: string;
  description?: string;
  coverImageUrl?: string;
  articleCount: number;
  updatedAt?: string;
  createdAt?: string;
}

// Article types
export interface Article {
  id: ID;
  slug: string;
  title: string;
  excerpt: string;
  content?: string; // HTML content rendered from Tiptap editor
  author: Pick<User, "id" | "first_name" | "last_name" | "handle">;
  category: Category;
  tags: string[];
  thumbnailUrl?: string;
  readTimeMins: number;
  published_at?: string;
  updated_at?: string;
  created_at?: string;
  status: "draft" | "pending_approval" | "published" | "rejected";
  approvalStatus?: "pending" | "approved" | "rejected";
  reactionsCount: number;
  commentsCount: number;
  views?: number;
  collectionId?: ID;
  collection?: Pick<Collection, "id" | "name">;
}

export interface ArticleFilters {
  query?: string;
  category?: string;
  tag?: string;
  author?: string;
  status?: "draft" | "published" | "archived";
  sort?: "latest" | "trending" | "popular";
  page?: number;
  limit?: number;
  [key: string]: unknown;
}

export interface ArticleListResponse {
  articles: Article[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Reaction types
export interface Reaction {
  id: ID;
  articleId: ID;
  userId: ID;
  type: "like";
  createdAt: string;
}

// Comment types
export interface Comment {
  id: ID;
  articleId: ID;
  user: Pick<User, "id" | "first_name" | "last_name" | "handle">;
  body: string;
  createdAt: string;
  updatedAt?: string;
}

// Bookmark types
export interface Bookmark {
  id: ID;
  articleId: ID;
  userId: ID;
  article: Article;
  bookmarkedAt: string;
  createdAt: string;
}

// Read History types
export interface ReadEvent {
  id: ID;
  articleId: ID;
  userId: ID;
  article: Article;
  scrolledPct: number;
  readTimeSpent: number; // in minutes
  readAt: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  handle: string;
  agreeToTerms: boolean;
}

export interface ArticleForm {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  status: "draft" | "published";
}

// Search types
export interface SearchResult {
  articles: Article[];
  categories: Category[];
  users: Pick<User, "id" | "first_name" | "last_name" | "handle">[];
}

// Analytics types
export interface ArticleAnalytics {
  articleId: ID;
  views: number;
  reactions: number;
  comments: number;
  readTime: number;
  completionRate: number;
}

// Notification types
export interface Notification {
  id: ID;
  userId: ID;
  type: "reaction" | "comment" | "follow" | "article_published";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  data?: Record<string, unknown>;
}
