import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import SEO from '@/components/layout/SEO'

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center" id="main-content">
      <SEO
        title="Page Not Found - African Stack"
        description="Sorry, the page you're looking for doesn't exist or has been moved."
      />
      <div className="max-w-2xl mx-auto" role="alert" aria-live="assertive">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8 text-lg">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild>
            <Link to="/" aria-label="Go to home page">Go Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/articles" aria-label="Browse articles">Browse Articles</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage