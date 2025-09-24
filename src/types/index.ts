// User system
export interface User {
  id: string
  email: string
  displayName: string
  avatarUrl?: string
  bio?: string
  role: 'admin' | 'editor' | 'author' | 'reader'
  isActive: boolean
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
}

export interface CreatorProfile {
  id: string
  userId: string
  bio: string
  website?: string
  socialLinks?: {
    twitter?: string
    linkedin?: string
    github?: string
  }
  profileImageUrl?: string
  coverImageUrl?: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
}

// Content system
export interface Category {
  id: string
  title: string
  slug: string
  description?: string
  thumbnailUrl?: string
  parentId?: string
  createdAt: string
  updatedAt: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface Article {
  id: string
  title: string
  excerpt?: string
  categoryId: string
  readTime: number
  publishDate?: string
  thumbnailUrl?: string
  authorId: string
  tags: string[]
  featured: boolean
  status: 'draft' | 'scheduled' | 'published' | 'archived'
  slug: string
  content: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
}

export interface Podcast {
  id: string
  title: string
  description: string
  audioUrl: string
  thumbnailUrl?: string
  authorId: string
  categoryId: string
  duration: number
  publishDate: string
  status: 'draft' | 'published' | 'archived'
  slug: string
  createdAt: string
  updatedAt: string
}

export interface Comment {
  id: string
  articleId: string
  userId: string
  parentId?: string
  content: string
  isApproved: boolean
  createdAt: string
  updatedAt: string
}

export interface Reaction {
  id: string
  articleId: string
  userId: string
  type: 'like' | 'clap' | 'love' | 'celebrate' | 'insightful' | 'curious'
  createdAt: string
}

// Supporting systems
export interface NewsletterSubscription {
  id: string
  email: string
  userId?: string
  isSubscribed: boolean
  subscriptionDate: string
  createdAt: string
  updatedAt: string
}

export interface Analytics {
  id: string
  articleId: string
  views: number
  reactionsCount: {
    like: number
    clap: number
    love: number
    celebrate: number
    insightful: number
    curious: number
  }
  commentsCount: number
  sharesCount: number
  createdAt: string
  updatedAt: string
}

// Authentication interfaces
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegistrationData {
  email: string
  password: string
  displayName: string
}

// Form data interfaces
export interface ArticleCreationData {
  title: string
  excerpt?: string
  categoryId: string
  content: string
  tags: string[]
  thumbnailUrl?: string
  featured: boolean
  status: 'draft' | 'published'
}

export interface CommentCreationData {
  articleId: string
  content: string
  parentId?: string
}