import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import type { LoaderFunctionArgs } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { redirect } from 'react-router-dom'
import { createElement } from 'react'

// Lazy loaded components
const CreatorDashboard = lazy(() => import('@/features/dashboard/creator/CreatorDashboard'))
const ArticleCreatePage = lazy(() => import('@/features/articles/components/ArticleCreatePage'))
const PodcastCreatePage = lazy(() => import('@/features/podcasts/components/PodcastCreatePage'))
const AnalyticsPage = lazy(() => import('@/features/dashboard/components/AnalyticsPage'))
const EarningsPage = lazy(() => import('@/features/dashboard/components/EarningsPage'))
const ProfilePage = lazy(() => import('@/features/dashboard/components/ProfilePage'))
const SettingsPage = lazy(() => import('@/features/dashboard/components/SettingsPage'))
const NotificationsPage = lazy(() => import('@/features/dashboard/components/NotificationsPage'))
const HelpPage = lazy(() => import('@/features/dashboard/components/HelpPage'))

// Protected route loader for creator
const creatorLoader = ({ request }: LoaderFunctionArgs) => {
  const { isAuthenticated, user } = useAuthStore.getState()
  
  if (!isAuthenticated) {
    const params = new URLSearchParams()
    params.set('from', new URL(request.url).pathname)
    return redirect(`/login?${params.toString()}`)
  }
  
  // Allow authors, editors, and admins to access creator dashboard
  if (user && !['author', 'editor', 'admin'].includes(user.role)) {
    return redirect('/dashboard/reader')
  }
  
  return null
}

export const creatorRoutes: RouteObject = {
  path: '/dashboard/creator',
  loader: creatorLoader,
  children: [
    {
      index: true,
      element: createElement(CreatorDashboard),
    },
    {
      path: 'articles',
      element: createElement(CreatorDashboard), // Will show articles tab
    },
    {
      path: 'articles/new',
      element: createElement(ArticleCreatePage),
    },
    {
      path: 'podcasts',
      element: createElement(CreatorDashboard), // Will show podcasts section
    },
    {
      path: 'podcasts/new',
      element: createElement(PodcastCreatePage),
    },
    {
      path: 'analytics',
      element: createElement(AnalyticsPage),
    },
    {
      path: 'earnings',
      element: createElement(EarningsPage),
    },
    {
      path: 'profile',
      element: createElement(ProfilePage),
    },
    {
      path: 'settings',
      element: createElement(SettingsPage),
    },
    {
      path: 'notifications',
      element: createElement(NotificationsPage),
    },
    {
      path: 'help',
      element: createElement(HelpPage),
    },
  ],
}