import type { User } from '@/types'

// Route parameters
export interface RouteParams {
  id?: string
}

// Loader data types
export interface ArticleLoaderData {
  article: {
    id: string
    title: string
    excerpt: string
    content: string
    author: string
    publishDate: string
    readTime: number
    tags: string[]
    category: string
  }
}

export interface CreatorDashboardLoaderData {
  creatorProfile: {
    name: string
    bio: string
    website: string
    socialLinks: {
      twitter: string
      linkedin: string
      github: string
    }
    profileImage: string
    coverImage: string
  }
}

// Action data types
export interface ArticleActionData {
  success: boolean
  message: string
}

// Protected route props
export interface ProtectedRouteProps {
  requiredRole?: User['role']
}

// Role hierarchy
export const roleHierarchy: Record<User['role'], number> = {
  reader: 1,
  author: 2,
  admin: 3,
  editor: 2
}