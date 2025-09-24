import { useRouteError } from 'react-router-dom'
import SEO from '@/components/layout/SEO'

const ErrorPage = () => {
  const error = useRouteError() as { statusText?: string; message?: string }
  console.error(error)

  return (
    <div className="container mx-auto px-4 py-8" id="main-content">
      <SEO
        title="Error - African Stack"
        description="An unexpected error has occurred."
      />
      <div className="text-center" role="alert" aria-live="assertive">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-xl mb-4">Sorry, an unexpected error has occurred.</p>
        <p className="text-gray-600">
          {error.statusText || error.message}
        </p>
      </div>
    </div>
  )
}

export default ErrorPage