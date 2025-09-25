import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes and their required roles
const protectedRoutes = {
  '/dashboard': ['user', 'creator', 'system_admin'],
  '/dashboard/user': ['user'],
  '/dashboard/creator': ['creator', 'system_admin'],
  '/dashboard/profile': ['user', 'creator', 'system_admin'],
  '/dashboard/articles': ['creator', 'system_admin'],
  '/dashboard/articles/new': ['creator', 'system_admin'],
  '/dashboard/articles/[id]/edit': ['creator', 'system_admin'],
  '/dashboard/bookmarks': ['user', 'creator', 'system_admin'],
  '/dashboard/history': ['user', 'creator', 'system_admin'],
  '/dashboard/analytics': ['creator', 'system_admin'],
  '/dashboard/calendar': ['creator', 'system_admin'],
  '/dashboard/audience': ['creator', 'system_admin'],
  '/dashboard/goals': ['creator', 'system_admin'],
  '/dashboard/settings': ['user', 'creator', 'system_admin'],
  '/admin': ['system_admin'],
  '/admin/users': ['system_admin'],
  '/admin/articles': ['system_admin'],
  '/admin/requests': ['system_admin'],
  '/request-creator': ['user'],
  '/request-creator/status': ['user', 'creator', 'system_admin'],
};

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/about',
  '/newsletter',
  '/newsletter/subscribe',
  '/newsletter/[id]',
  '/articles',
  '/articles/[slug]',
  '/contribute',
  '/auth/login',
  '/auth/register',
  '/unauthorized',
];

// Define routes that should redirect authenticated users
const authRoutes = ['/auth/login', '/auth/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the route is public
  const isPublicRoute = publicRoutes.some(route => {
    if (route.includes('[') && route.includes(']')) {
      // Handle dynamic routes
      const routePattern = route.replace(/\[.*?\]/g, '[^/]+');
      const regex = new RegExp(`^${routePattern}$`);
      return regex.test(pathname);
    }
    return pathname === route;
  });

  // Check if the route requires authentication
  const isProtectedRoute = Object.keys(protectedRoutes).some(route => {
    if (route.includes('[') && route.includes(']')) {
      // Handle dynamic routes
      const routePattern = route.replace(/\[.*?\]/g, '[^/]+');
      const regex = new RegExp(`^${routePattern}`);
      return regex.test(pathname);
    }
    return pathname.startsWith(route);
  });

  // Get auth token from cookies or headers
  const token = request.cookies.get('auth_token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');

  const isAuthenticated = !!token;

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users to login for protected routes
  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // For protected routes, we'll let the client-side AuthGuard handle role-based access
  // since we can't easily decode JWT tokens in middleware without additional setup

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
