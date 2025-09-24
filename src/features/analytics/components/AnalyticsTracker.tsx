import { useAnalytics } from '../hooks/useAnalytics'

// Analytics tracking component
const AnalyticsTracker = () => {
  useAnalytics()
  return null // This component doesn't render anything
}

export default AnalyticsTracker