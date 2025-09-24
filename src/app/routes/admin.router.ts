import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import type { LoaderFunctionArgs } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { redirect } from 'react-router-dom'
import { createElement } from 'react'

// Lazy loaded components
const AdminDashboard = lazy(() => import('@/features/dashboard/admin/AdminDashboard'))
const ProfilePage = lazy(() => import('@/features/dashboard/components/ProfilePage'))
const SettingsPage = lazy(() => import('@/features/dashboard/components/SettingsPage'))
const NotificationsPage = lazy(() => import('@/features/dashboard/components/NotificationsPage'))
const HelpPage = lazy(() => import('@/features/dashboard/components/HelpPage'))
const AnalyticsPage = lazy(() => import('@/features/dashboard/components/AnalyticsPage'))

// Protected route loader for admin
const adminLoader = ({ request }: LoaderFunctionArgs) => {
  const { isAuthenticated, user } = useAuthStore.getState()
  
  if (!isAuthenticated) {
    const params = new URLSearchParams()
    params.set('from', new URL(request.url).pathname)
    return redirect(`/login?${params.toString()}`)
  }
  
  // Only admins can access admin dashboard
  if (user?.role !== 'admin') {
    return redirect('/dashboard')
  }
  
  return null
}

export const adminRoutes: RouteObject = {
  path: '/dashboard/admin',
  loader: adminLoader,
  children: [
    {
      index: true,
      element: createElement(AdminDashboard),
    },
    {
      path: 'users',
      element: createElement(AdminDashboard), // Will show users tab
    },
    {
      path: 'users/new',
      element: createElement(AdminDashboard), // Will show user creation form
    },
    {
      path: 'applications',
      element: createElement(AdminDashboard), // Will show applications tab
    },
    {
      path: 'articles',
      element: createElement(AdminDashboard), // Will show articles tab
    },
    {
      path: 'categories',
      element: createElement(AdminDashboard), // Will show categories tab
    },
    {
      path: 'categories/new',
      element: createElement(AdminDashboard), // Will show category creation form
    },
    {
      path: 'analytics',
      element: createElement(AnalyticsPage),
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