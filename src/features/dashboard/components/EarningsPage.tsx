import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import SEO from '@/components/layout/SEO'

// Mock data for earnings
const earningsData = [
  { month: 'January', earnings: 1250, views: 12542, reactions: 1247 },
  { month: 'February', earnings: 1850, views: 18721, reactions: 1856 },
  { month: 'March', earnings: 2100, views: 21542, reactions: 2103 },
  { month: 'April', earnings: 1950, views: 19876, reactions: 1987 },
  { month: 'May', earnings: 2400, views: 24567, reactions: 2432 },
  { month: 'June', earnings: 2750, views: 27890, reactions: 2765 },
]

const EarningsPage = () => {
  const [timeRange, setTimeRange] = useState('6m')

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title="Earnings - African Stack"
        description="View your earnings and payment information on the African Stack platform"
        keywords="earnings, payments, monetization, African technology"
      />
      
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Earnings</h1>
            <p className="text-gray-600 mt-2">
              Track your earnings and payment information
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Time range:</span>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Last 1 month</SelectItem>
                <SelectItem value="3m">Last 3 months</SelectItem>
                <SelectItem value="6m">Last 6 months</SelectItem>
                <SelectItem value="1y">Last 1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,450.00</div>
            <p className="text-xs text-green-600">+15% from last period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,750.00</div>
            <p className="text-xs text-green-600">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,200.00</div>
            <p className="text-xs text-gray-500">Next payment: July 15</p>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Earnings Overview</CardTitle>
          <CardDescription>
            Your earnings over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-bold text-gray-300 mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Interactive Chart Coming Soon</h3>
              <p className="text-gray-500 mb-4">
                This section will display an interactive chart of your earnings over time.
              </p>
              <Button variant="outline">View Detailed Report</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Earnings Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Earnings</CardTitle>
            <CardDescription>
              Your earnings by month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {earningsData.map((data, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{data.month}</p>
                    <p className="text-sm text-gray-500">{data.views} views • {data.reactions} reactions</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${data.earnings.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">
                      ${(data.earnings / data.views).toFixed(4)}/view
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
            <CardDescription>
              Your payment details and history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Payment Method</h3>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">💳</span>
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 1234</p>
                      <p className="text-sm text-gray-500">Expires 12/2025</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Recent Payments</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">May 2023 Payment</p>
                      <p className="text-sm text-gray-500">Processed on June 15, 2023</p>
                    </div>
                    <p className="font-semibold">$2,400.00</p>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">April 2023 Payment</p>
                      <p className="text-sm text-gray-500">Processed on May 15, 2023</p>
                    </div>
                    <p className="font-semibold">$1,950.00</p>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">Update Payment Method</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Information */}
      <Card>
        <CardHeader>
          <CardTitle>How Earnings Work</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👁️</span>
              </div>
              <h3 className="font-semibold mb-2">Views</h3>
              <p className="text-gray-600 text-sm">
                You earn based on the number of views your content receives.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="font-semibold mb-2">Engagement</h3>
              <p className="text-gray-600 text-sm">
                Reactions and comments increase your earnings potential.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="font-semibold mb-2">Payments</h3>
              <p className="text-gray-600 text-sm">
                Payments are processed monthly and deposited to your account.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EarningsPage