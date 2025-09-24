import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import SEO from '@/components/layout/SEO'

const HelpPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title="Help Center - African Stack"
        description="Get help and support for using the African Stack platform"
        keywords="help, support, FAQ, African technology"
      />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
        <p className="text-gray-600 mt-2">
          Find answers to common questions and get support
        </p>
      </div>

      {/* Search Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How can we help you?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search help articles..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Help Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-2xl mr-2">📝</span>
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Creating your account
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Setting up your profile
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Understanding the dashboard
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-2xl mr-2">✍️</span>
              Writing Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Creating your first article
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Using the rich text editor
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Adding images and media
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-2xl mr-2">🎙️</span>
              Podcasts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Creating a podcast episode
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Uploading audio files
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Managing your podcast series
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-2xl mr-2">📊</span>
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Understanding your analytics
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Tracking engagement
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Earnings and payments
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-2xl mr-2">👥</span>
              Community
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Interacting with readers
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Building your following
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Reporting issues
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <span className="text-2xl mr-2">⚙️</span>
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Updating your profile
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Changing your password
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  Managing notifications
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Support</CardTitle>
          <CardDescription>
            Can't find what you're looking for? Our support team is here to help.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="font-medium mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">
                Send us an email and we'll get back to you within 24 hours.
              </p>
              <Button variant="outline">support@africanstack.com</Button>
            </div>
            <div className="flex-1">
              <h3 className="font-medium mb-2">Community Forum</h3>
              <p className="text-gray-600 mb-4">
                Connect with other creators and get help from the community.
              </p>
              <Button variant="outline">Visit Community Forum</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default HelpPage