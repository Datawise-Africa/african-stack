import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import type { LoaderFunctionArgs } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { redirect } from 'react-router-dom'
import { createElement } from 'react'

// Lazy loaded components
const ReaderDashboard = lazy(() => import('@/features/dashboard/reader/ReaderDashboard'))
const ProfilePage = lazy(() => import('@/features/dashboard/components/ProfilePage'))
const SettingsPage = lazy(() => import('@/features/dashboard/components/SettingsPage'))
const NotificationsPage = lazy(() => import('@/features/dashboard/components/NotificationsPage'))
const HelpPage = lazy(() => import('@/features/dashboard/components/HelpPage'))

// Protected route loader for reader
const readerLoader = ({ request }: LoaderFunctionArgs) => {
  const { isAuthenticated, user } = useAuthStore.getState()
  
  if (!isAuthenticated) {
    const params = new URLSearchParams()
    params.set('from', new URL(request.url).pathname)
    return redirect(`/login?${params.toString()}`)
  }
  
  // Allow readers and higher roles to access reader dashboard
  if (user && !['reader', 'author', 'editor', 'admin'].includes(user.role)) {
    return redirect('/')
  }
  
  return null
}

export const readerRoutes: RouteObject = {
  path: '/dashboard/reader',
  loader: readerLoader,
  children: [
    {
      index: true,
      element: createElement(ReaderDashboard),
    },
    {
      path: 'history',
      element: createElement(ReaderDashboard),
    },
    {
      path: 'saved',
      element: createElement(ReaderDashboard),
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