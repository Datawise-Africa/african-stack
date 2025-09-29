// "use client";

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/contexts/auth-context';

// interface AuthGuardProps {
//   children: React.ReactNode;
//   requireAuth?: boolean;
//   allowedRoles?: string[];
//   redirectTo?: string;
//   fallback?: React.ReactNode;
// }

// export function AuthGuard({ 
//   children, 
//   requireAuth = true, 
//   allowedRoles = [], 
//   redirectTo = '/auth/login',
//   fallback = <div>Loading...</div>
// }: AuthGuardProps) {
//   const { user, isLoading, isAuthenticated } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     console.log('AuthGuard - isLoading:', isLoading, 'isAuthenticated:', isAuthenticated, 'user:', user);
    
//     if (isLoading) return;

//     // Check if authentication is required
//     if (requireAuth && !isAuthenticated) {
//       console.log('AuthGuard - Redirecting to login, requireAuth:', requireAuth, 'isAuthenticated:', isAuthenticated);
//       router.push(redirectTo);
//       return;
//     }

//     // Check if user has required role
//     if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
//       console.log('AuthGuard - Redirecting to unauthorized, user role:', user.role, 'allowed roles:', allowedRoles);
//       router.push('/unauthorized');
//       return;
//     }
//   }, [user, isLoading, isAuthenticated, requireAuth, allowedRoles, redirectTo, router]);

//   // Show loading state
//   if (isLoading) {
//     return <>{fallback}</>;
//   }

//   // Show unauthorized if user doesn't have required role
//   if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
//     return <div>Unauthorized</div>;
//   }

//   // Show login redirect if auth required but not authenticated
//   if (requireAuth && !isAuthenticated) {
//     // return <div>Redirecting to login...</div>;
//     router.push('/auth/login');
//   }

//   return <>{children}</>;
// }

// // Higher-order component for protecting pages
// export function withAuthGuard<P extends object>(
//   Component: React.ComponentType<P>,
//   options: Omit<AuthGuardProps, 'children'> = {}
// ) {
//   return function AuthGuardedComponent(props: P) {
//     return (
//       <AuthGuard {...options}>
//         <Component {...props} />
//       </AuthGuard>
//     );
//   };
// }

// // Role-based guard component
// interface RoleGuardProps {
//   children: React.ReactNode;
//   allowedRoles: string[];
//   fallback?: React.ReactNode;
// }

// export function RoleGuard({ children, allowedRoles, fallback }: RoleGuardProps) {
//   const { user, isLoading } = useAuth();

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!user || !allowedRoles.includes(user.role)) {
//     return <>{fallback || <div>Access denied</div>}</>;
//   }

//   return <>{children}</>;
// }
