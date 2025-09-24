import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Menu, 
  X, 
  Home, 
  FileText, 
  Users, 
  Settings, 
  BarChart3, 
  BookOpen,
  Headphones,
  Bell,
  DollarSign,
  User,
  UserCheck,
  FolderOpen
} from 'lucide-react'
import SEO from '@/components/layout/SEO'

interface SidebarItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles?: string[]
}

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

const DashboardLayout = ({ children, title, description }: DashboardLayoutProps) => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Define sidebar items based on user role
  const getSidebarItems = (): SidebarItem[] => {
    const baseItems: SidebarItem[] = [
      { label: 'Dashboard', href: '/dashboard', icon: Home },
      { label: 'Profile', href: '/dashboard/profile', icon: User },
      { label: 'Settings', href: '/dashboard/settings', icon: Settings },
      { label: 'Notifications', href: '/dashboard/notifications', icon: Bell },
    ]

    if (user?.role === 'reader') {
      return [
        { label: 'Dashboard', href: '/dashboard/reader', icon: Home },
        { label: 'Reading History', href: '/dashboard/reader/history', icon: BookOpen },
        { label: 'Saved Articles', href: '/dashboard/reader/saved', icon: FileText },
        { label: 'Profile', href: '/dashboard/profile', icon: User },
        { label: 'Settings', href: '/dashboard/settings', icon: Settings },
        { label: 'Notifications', href: '/dashboard/notifications', icon: Bell },
      ]
    }

    if (user?.role === 'author' || user?.role === 'editor') {
      return [
        { label: 'Dashboard', href: '/dashboard/creator', icon: Home },
        { label: 'My Articles', href: '/dashboard/creator/articles', icon: FileText },
        { label: 'Analytics', href: '/dashboard/creator/analytics', icon: BarChart3 },
        { label: 'Podcasts', href: '/dashboard/creator/podcasts', icon: Headphones },
        { label: 'Earnings', href: '/dashboard/creator/earnings', icon: DollarSign },
        { label: 'Profile', href: '/dashboard/profile', icon: User },
        { label: 'Settings', href: '/dashboard/settings', icon: Settings },
        { label: 'Notifications', href: '/dashboard/notifications', icon: Bell },
      ]
    }

    if (user?.role === 'admin') {
      return [
        { label: 'Dashboard', href: '/dashboard/admin', icon: Home },
        { label: 'Users', href: '/dashboard/admin/users', icon: Users },
        { label: 'Applications', href: '/dashboard/admin/applications', icon: UserCheck },
        { label: 'Articles', href: '/dashboard/admin/articles', icon: FileText },
        { label: 'Categories', href: '/dashboard/admin/categories', icon: FolderOpen },
        { label: 'Analytics', href: '/dashboard/admin/analytics', icon: BarChart3 },
        { label: 'Settings', href: '/dashboard/settings', icon: Settings },
      ]
    }

    return baseItems
  }

  const sidebarItems = getSidebarItems()

  const isActiveLink = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/')
  }

  // Determine the current page title and description based on the route
  const getPageTitle = () => {
    // Use the provided title prop if available
    if (title) return title

    // Otherwise, determine title based on route
    if (location.pathname.includes('/dashboard/reader')) {
      return 'Reader Dashboard'
    } else if (location.pathname.includes('/dashboard/creator')) {
      return 'Creator Dashboard'
    } else if (location.pathname.includes('/dashboard/admin')) {
      return 'Admin Dashboard'
    } else if (location.pathname.includes('/dashboard/profile')) {
      return 'Profile'
    } else if (location.pathname.includes('/dashboard/settings')) {
      return 'Settings'
    } else if (location.pathname.includes('/dashboard/notifications')) {
      return 'Notifications'
    } else if (location.pathname.includes('/dashboard/help')) {
      return 'Help'
    }
    
    return 'Dashboard'
  }

  const getPageDescription = () => {
    // Use the provided description prop if available
    if (description) return description

    // Otherwise, determine description based on route
    if (location.pathname.includes('/dashboard/reader')) {
      return `Welcome back, ${user?.displayName || 'Reader'}!`
    } else if (location.pathname.includes('/dashboard/creator')) {
      return `Welcome back, ${user?.displayName || 'Creator'}!`
    } else if (location.pathname.includes('/dashboard/admin')) {
      return `Welcome back, ${user?.displayName || 'Admin'}!`
    }
    
    return 'Manage your content and account'
  }

  const pageTitle = getPageTitle()
  const pageDescription = getPageDescription()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* SEO */}
      <SEO
        title={`${pageTitle} - African Stack`}
        description={pageDescription}
        keywords="dashboard, african stack, content management"
      />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <Link to="/" className="text-xl font-bold text-blue-600">
              African Stack
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={`
                        flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                        ${isActiveLink(item.href)
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }
                      `}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* User info at bottom of sidebar */}
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                {user?.displayName?.charAt(0) || 'U'}
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.displayName || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.role || 'reader'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b z-10">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-2"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{pageTitle}</h1>
                {pageDescription && (
                  <p className="text-sm text-gray-500 hidden sm:block">{pageDescription}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Quick actions for different roles */}
              {(user?.role === 'author' || user?.role === 'editor') && (
                <Button asChild size="sm">
                  <Link to="/dashboard/creator/articles/new">New Article</Link>
                </Button>
              )}

              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                      {user?.displayName?.charAt(0) || 'U'}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.displayName || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/help">Help</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout