import {
  createBrowserRouter,
  redirect,
  type LoaderFunctionArgs,
  Outlet,
  type RouteObject,
} from 'react-router-dom'
import { lazy } from 'react'
import { useAuthStore } from '@/stores/authStore'
import type { User } from '@/types'
import type { ArticleLoaderData } from './types'
import { readerRoutes } from './reader.router'
import { creatorRoutes } from './creator.router'
import { adminRoutes } from './admin.router'

// Lazy loaded components
const PublicLayout = lazy(() => import('@/components/layout/PublicLayout'))
const AuthLayout = lazy(() => import('@/components/layout/AuthLayout'))
const DashboardLayout = lazy(() => import('@/components/layout/DashboardLayout'))
const LandingPage = lazy(() => import('@/features/articles/components/LandingPage'))
const BlogArchive = lazy(() => import('@/features/articles/components/BlogArchive'))
const ArticleDetail = lazy(() => import('@/features/articles/components/ArticleDetail'))
const PodcastSection = lazy(() => import('@/features/podcasts/components/PodcastSection'))
const Login = lazy(() => import('@/features/auth/components/Login'))
const Register = lazy(() => import('@/features/auth/components/Register'))
const ResetPassword = lazy(() => import('@/features/auth/components/ResetPassword'))
const NotFoundPage = lazy(() => import('@/features/articles/components/NotFoundPage'))
const ErrorPage = lazy(() => import('@/components/layout/ErrorPage'))

// Shared dashboard components
const ProfilePage = lazy(() => import('@/features/dashboard/components/ProfilePage'))
const SettingsPage = lazy(() => import('@/features/dashboard/components/SettingsPage'))
const NotificationsPage = lazy(() => import('@/features/dashboard/components/NotificationsPage'))
const HelpPage = lazy(() => import('@/features/dashboard/components/HelpPage'))

// Role hierarchy
const roleHierarchy: Record<User['role'], number> = {
  reader: 1,
  author: 2,
  admin: 3,
  editor: 2
}

// Protected route loader
const protectedLoader = (requiredRole?: User['role']) => {
  return ({ request }: LoaderFunctionArgs) => {
    const { isAuthenticated, user } = useAuthStore.getState()
    
    if (!isAuthenticated) {
      const params = new URLSearchParams()
      params.set('from', new URL(request.url).pathname)
      return redirect(`/login?${params.toString()}`)
    }
    
    if (requiredRole && user) {
      if (roleHierarchy[user.role] < roleHierarchy[requiredRole]) {
        return redirect('/')
      }
    }
    
    return null
  }
}

// Article loader
const articleLoader = async ({ params }: LoaderFunctionArgs): Promise<ArticleLoaderData> => {
  // In a real app, you would fetch the article data from an API
  // For now, we'll just return mock data
  const article = {
    id: params.id || '1',
    title: 'Sample Article',
    excerpt: 'This is a sample article excerpt.',
    content: '<p>This is the content of the sample article.</p>',
    author: 'Jane Smith',
    publishDate: new Date().toISOString(),
    readTime: 5,
    tags: ['React', 'JavaScript'],
    category: 'Technology'
  }
  
  return { article }
}

// Wrap routes with DashboardLayout
const wrapWithDashboardLayout = (routes: RouteObject): RouteObject => {
  return {
    ...routes,
    element: <DashboardLayout title="Dashboard" description="Manage your content and account"><Outlet /></DashboardLayout>
  }
}

// Create wrapped routes
const wrappedReaderRoutes = wrapWithDashboardLayout(readerRoutes)
const wrappedCreatorRoutes = wrapWithDashboardLayout(creatorRoutes)
const wrappedAdminRoutes = wrapWithDashboardLayout(adminRoutes)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'articles',
        element: <BlogArchive />,
      },
      {
        path: 'articles/:id',
        element: <ArticleDetail />,
        loader: articleLoader,
      },
      {
        path: 'podcasts',
        element: <PodcastSection />,
      },
    ],
  },
  {
    path: '/login',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: '/register',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Register />,
      },
    ],
  },
  {
    path: '/reset-password',
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ResetPassword />,
      },
    ],
  },
  // Dashboard routes with shared layout
  {
    path: '/dashboard',
    element: <DashboardLayout title="Dashboard" description="Manage your content and account"><Outlet /></DashboardLayout>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: ({ request }) => {
          const { isAuthenticated, user } = useAuthStore.getState()
          
          if (!isAuthenticated) {
            const params = new URLSearchParams()
            params.set('from', new URL(request.url).pathname)
            return redirect(`/login?${params.toString()}`)
          }
          
          // Redirect to role-specific dashboard
          switch (user?.role) {
            case 'admin':
              return redirect('/dashboard/admin')
            case 'author':
            case 'editor':
              return redirect('/dashboard/creator')
            case 'reader':
            default:
              return redirect('/dashboard/reader')
          }
        },
      },
      // Shared dashboard routes
      {
        path: 'profile',
        element: <ProfilePage />,
        loader: protectedLoader(),
      },
      {
        path: 'settings',
        element: <SettingsPage />,
        loader: protectedLoader(),
      },
      {
        path: 'notifications',
        element: <NotificationsPage />,
        loader: protectedLoader(),
      },
      {
        path: 'help',
        element: <HelpPage />,
        loader: protectedLoader(),
      },
    ],
  },
  // Role-specific dashboard routes with shared layout
  wrappedReaderRoutes,
  wrappedCreatorRoutes,
  wrappedAdminRoutes,
  {
    path: '*',
    element: <NotFoundPage />,
  },
])