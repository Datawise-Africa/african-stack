import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SEO from '@/components/layout/SEO'

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Authentication - African Stack"
        description="Sign in or create an account to access your African Stack dashboard."
      />
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600" aria-label="African Stack Home">
            African Stack
          </Link>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-4" id="main-content">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AuthLayout