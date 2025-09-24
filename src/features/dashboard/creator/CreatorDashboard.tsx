import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import SEO from '@/components/layout/SEO'
import { FileText, Eye, Heart, MessageCircle, TrendingUp, Edit, Camera } from 'lucide-react'

// Mock data for articles
const articles = [
  {
    id: '1',
    title: 'The Future of Web Development',
    status: 'published',
    views: 1250,
    reactions: 42,
    comments: 8,
    publishedDate: '2023-06-15',
  },
  {
    id: '2',
    title: 'Building Sustainable Applications',
    status: 'draft',
    views: 0,
    reactions: 0,
    comments: 0,
    publishedDate: null,
  },
  {
    id: '3',
    title: 'The Art of User Experience',
    status: 'published',
    views: 890,
    reactions: 31,
    comments: 5,
    publishedDate: '2023-06-10',
  },
]

// Mock data for analytics
const analyticsData = [
  { date: 'Jun 1', views: 45, reactions: 2 },
  { date: 'Jun 2', views: 52, reactions: 3 },
  { date: 'Jun 3', views: 48, reactions: 2 },
  { date: 'Jun 4', views: 67, reactions: 5 },
  { date: 'Jun 5', views: 78, reactions: 6 },
  { date: 'Jun 6', views: 85, reactions: 8 },
  { date: 'Jun 7', views: 92, reactions: 9 },
]

const CreatorDashboard = () => {
  const { user } = useAuthStore()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('articles')

  // Set active tab based on current route
  useEffect(() => {
    if (location.pathname.includes('/articles')) {
      setActiveTab('articles')
    } else if (location.pathname.includes('/profile')) {
      setActiveTab('profile')
    } else if (location.pathname.includes('/podcasts')) {
      setActiveTab('podcasts')
    }
  }, [location.pathname])

  return (
    <>
      <SEO
        title="Creator Dashboard - African Stack"
        description="Your creator dashboard for managing articles, analytics, and profile."
        keywords="creator dashboard, article management, analytics, profile"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Total Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-green-600">+2 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              Total Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,432</div>
            <p className="text-xs text-green-600">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Total Reactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-green-600">+8% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <MessageCircle className="h-4 w-4 mr-2" />
              Total Comments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-green-600">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Chart */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Performance Overview
          </CardTitle>
          <CardDescription>
            Views and reactions over the past 7 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="views" fill="#3b82f6" name="Views" />
                <Bar dataKey="reactions" fill="#10b981" name="Reactions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Articles and Profile Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="articles">My Articles</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="articles">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <CardTitle>My Articles</CardTitle>
                  <CardDescription>
                    Manage your published and draft articles
                  </CardDescription>
                </div>
                <Button asChild>
                  <Link to="/dashboard/creator/articles/new">Create New Article</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {articles.length > 0 ? (
                <div className="space-y-4">
                  {articles.map((article) => (
                    <div key={article.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                        <h3 className="text-lg font-semibold">{article.title}</h3>
                        <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                          {article.status}
                        </Badge>
                      </div>
                      
                      {article.status === 'published' ? (
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-2 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Views</p>
                              <p className="font-semibold">{article.views}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-2 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Reactions</p>
                              <p className="font-semibold">{article.reactions}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="h-4 w-4 mr-2 text-gray-500" />
                            <div>
                              <p className="text-sm text-gray-500">Comments</p>
                              <p className="font-semibold">{article.comments}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Published</p>
                            <p className="font-semibold">{article.publishedDate}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <p className="text-sm text-gray-500">Draft - Not yet published</p>
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        {article.status === 'published' ? (
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        ) : (
                          <Button size="sm">
                            Publish
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          Analytics
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    You haven't created any articles yet.
                  </p>
                  <Button asChild>
                    <Link to="/dashboard/creator/articles/new">Create Your First Article</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Creator Profile</CardTitle>
              <CardDescription>
                Manage your public profile information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                    {user?.displayName?.charAt(0) || 'U'}
                  </div>
                  <div className="flex-1">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Profile Image
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">
                      JPG, GIF or PNG. Max size of 2MB.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Display Name
                    </label>
                    <Input
                      type="text"
                      defaultValue={user?.displayName || ''}
                      placeholder="Your display name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Website
                    </label>
                    <Input
                      type="url"
                      placeholder="https://your-website.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Bio
                  </label>
                  <Textarea
                    rows={4}
                    placeholder="Tell your readers about yourself..."
                    className="resize-none"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Brief description for your profile. Max 160 characters.
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Social Links
                  </label>
                  <div className="space-y-3">
                    <Input
                      type="url"
                      placeholder="Twitter URL"
                    />
                    <Input
                      type="url"
                      placeholder="LinkedIn URL"
                    />
                    <Input
                      type="url"
                      placeholder="GitHub URL"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button>Save Profile</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default CreatorDashboard