import SEO from '@/components/layout/SEO'

// A test version of ErrorPage that doesn't use React Router hooks
const ErrorPageTest = ({
  statusText = 'Not Found', 
  message = 'Test error message'
}: {
  statusText?: string;
  message?: string;
}) => {
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
          {statusText || message}
        </p>
      </div>
    </div>
  )
}

export default ErrorPageTest
