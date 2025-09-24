# Data Models for Medium-like Application

## Overview
This document defines the TypeScript interfaces for all data models in the Medium-like application. These interfaces will be used throughout the application for type safety and consistency.

## User System

### User Interface
```typescript
interface User {
  id: string; // UUID
  email: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  role: 'admin' | 'editor' | 'author' | 'reader';
  isActive: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  lastLoginAt?: string; // ISO timestamp
}
```

### CreatorProfile Interface
```typescript
interface CreatorProfile {
  id: string; // UUID
  userId: string; // FK to User.id
  bio: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  profileImageUrl?: string;
  coverImageUrl?: string;
  isVerified: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}
```

## Content System

### Category Interface
```typescript
interface Category {
  id: string; // UUID
  title: string;
  slug: string;
  description?: string;
  thumbnailUrl?: string;
  parentId?: string; // FK to Category.id (self-referencing)
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}
```

### Tag Interface
```typescript
interface Tag {
  id: string; // UUID
  name: string;
  slug: string;
  description?: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}
```

### Article Interface
```typescript
interface Article {
  id: string; // UUID
  title: string;
  excerpt?: string;
  categoryId: string; // FK to Category.id
  readTime: number; // seconds
  publishDate?: string; // ISO timestamp
  thumbnailUrl?: string;
  authorId: string; // FK to User.id
  tags: string[]; // Array of tag names/slugs
  featured: boolean;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  slug: string;
  content: string; // Plain text for search
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  publishedAt?: string; // ISO timestamp
}
```

### Podcast Interface
```typescript
interface Podcast {
  id: string; // UUID
  title: string;
  description: string;
  audioUrl: string;
  thumbnailUrl?: string;
  authorId: string; // FK to User.id
  categoryId: string; // FK to Category.id
  duration: number; // seconds
  publishDate: string; // ISO timestamp
  status: 'draft' | 'published' | 'archived';
  slug: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}
```

### Comment Interface
```typescript
interface Comment {
  id: string; // UUID
  articleId: string; // FK to Article.id
  userId: string; // FK to User.id
  parentId?: string; // FK to Comment.id (for nested replies)
  content: string;
  isApproved: boolean;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}
```

### Reaction Interface
```typescript
interface Reaction {
  id: string; // UUID
  articleId: string; // FK to Article.id
  userId: string; // FK to User.id
  type: 'like' | 'clap' | 'love' | 'celebrate' | 'insightful' | 'curious';
  createdAt: string; // ISO timestamp
}
```

## Supporting Systems

### NewsletterSubscription Interface
```typescript
interface NewsletterSubscription {
  id: string; // UUID
  email: string;
  userId?: string; // FK to User.id (optional)
  isSubscribed: boolean;
  subscriptionDate: string; // ISO timestamp
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}
```

### Analytics Interface
```typescript
interface Analytics {
  id: string; // UUID
  articleId: string; // FK to Article.id
  views: number;
  reactionsCount: {
    like: number;
    clap: number;
    love: number;
    celebrate: number;
    insightful: number;
    curious: number;
  };
  commentsCount: number;
  sharesCount: number;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}
```

## Authentication Interfaces

### Login Credentials
```typescript
interface LoginCredentials {
  email: string;
  password: string;
}
```

### Registration Data
```typescript
interface RegistrationData {
  email: string;
  password: string;
  displayName: string;
}
```

## Form Data Interfaces

### Article Creation Data
```typescript
interface ArticleCreationData {
  title: string;
  excerpt?: string;
  categoryId: string;
  content: string;
  tags: string[];
  thumbnailUrl?: string;
  featured: boolean;
  status: 'draft' | 'published';
}
```

### Comment Creation Data
```typescript
interface CommentCreationData {
  articleId: string;
  content: string;
  parentId?: string;
}
```

### Profile Update Data
```typescript
interface ProfileUpdateData {
  displayName: string;
  bio?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}