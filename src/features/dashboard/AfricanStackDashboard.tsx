import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import SEO from '@/components/layout/SEO'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'

// Mock data for articles
const articles = [
  {
    id: '1',
    title: 'AI in African Agriculture: Transforming Farming Practices',
    excerpt: 'How machine learning is revolutionizing agriculture across the continent',
    category: 'AI',
    thumbnail: 'https://images.unsplash.com/photo-1597038122399-9b5c70d7d1d8?w=400&h=200&fit=crop',
    status: 'published',
    views: 1250,
    reactions: 42,
    comments: 8,
    publishedDate: '2023-06-15',
    author: 'Dr. Ada Eze'
  },
  {
    id: '2',
    title: 'Data Science for Financial Inclusion in Emerging Markets',
    excerpt: 'Leveraging analytics to expand access to financial services',
    category: 'Data Science',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=200&fit=crop',
    status: 'draft',
    views: 0,
    reactions: 0,
    comments: 0,
    publishedDate: null,
    author: 'Kwame Asante'
  },
  {
    id: '3',
    title: 'Building AI-Powered Healthcare Solutions for Rural Communities',
    excerpt: 'Innovative approaches to telemedicine and diagnostic tools',
    category: 'AI',
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=200&fit=crop',
    status: 'published',
    views: 890,
    reactions: 31,
    comments: 5,
    publishedDate: '2023-06-10',
    author: 'Dr. Amara Okello'
  },
  {
    id: '4',
    title: 'Ethical Considerations in AI Development for African Markets',
    excerpt: 'Addressing bias and ensuring fair representation in algorithms',
    category: 'AI Ethics',
    thumbnail: 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=400&h=200&fit=crop',
    status: 'published',
    views: 1542,
    reactions: 67,
    comments: 12,
    publishedDate: '2023-06-05',
    author: 'Ngozi Adichie'
  },
]

// Mock data for podcasts
const podcasts = [
  {
    id: '1',
    title: 'The Future of AI in Africa',
    description: 'Exploring opportunities and challenges in AI development',
    author: 'Dr. Ada Eze',
    category: 'AI',
    duration: 3600,
    publishDate: '2023-06-15',
    thumbnail: 'https://images.unsplash.com/photo-1472437774355-71ab6752b434?w=200&h=200&fit=crop',
  },
  {
    id: '2',
    title: 'Data Privacy in the Digital Age',
    description: 'Protecting user data in emerging markets',
    author: 'Kwame Asante',
    category: 'Data Science',
    duration: 2700,
    publishDate: '2023-06-10',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=200&h=200&fit=crop',
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

// Mock data for category distribution
const categoryData = [
  { name: 'AI', value: 45 },
  { name: 'Data Science', value: 30 },
  { name: 'AI Ethics', value: 15 },
  { name: 'Machine Learning', value: 10 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const AfricanStackDashboard = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Filter articles based on search and filters
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="African Stack Dashboard - AI & Data Science Content Platform"
        description="Comprehensive dashboard for managing AI and data science content, podcasts, and analytics for the African Stack platform."
        keywords="AI, data science, dashboard, content management, analytics, African technology"
      />
      
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                African Stack
              </Link>
              <nav className="hidden md:flex ml-10 space-x-8">
                <Link to="/" className="text-gray-900 hover:text-blue-600">
                  Dashboard
                </Link>
                <Link to="/articles" className="text-gray-500 hover:text-blue-600">
                  Articles
                </Link>
                <Link to="/podcasts" className="text-gray-500 hover:text-blue-600">
                  Podcasts
                </Link>
                <Link to="/dashboard/analytics" className="text-gray-500 hover:text-blue-600">
                  Analytics
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.displayName || 'User'}!
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                      {user?.displayName?.charAt(0) || 'U'}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.displayName || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/earnings">Earnings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/notifications">Notifications</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage your AI and data science content
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-green-600">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,842</div>
              <p className="text-xs text-green-600">+18% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Podcasts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-green-600">+2 from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Engagement Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.7%</div>
              <p className="text-xs text-green-600">+3.2% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
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
          
          <Card>
            <CardHeader>
              <CardTitle>Content Distribution</CardTitle>
              <CardDescription>
                Articles by category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      // label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="articles">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <CardTitle>Content Management</CardTitle>
                    <CardDescription>
                      Manage your articles and publications
                    </CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <Input
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full md:w-64"
                    />
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-full md:w-32">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="AI">AI</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                        <SelectItem value="AI Ethics">AI Ethics</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full md:w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button asChild>
                      <Link to="/dashboard/articles/new">Create New</Link>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {filteredArticles.length > 0 ? (
                  <div className="space-y-4">
                    {filteredArticles.map((article) => (
                      <div key={article.id} className="border rounded-lg overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/4">
                            <img
                              src={article.thumbnail}
                              alt={article.title}
                              className="w-full h-48 md:h-full object-cover"
                            />
                          </div>
                          <div className="p-4 md:w-3/4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <Badge variant="secondary" className="mb-2">
                                  {article.category}
                                </Badge>
                                <h3 className="text-lg font-semibold">{article.title}</h3>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                article.status === 'published' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {article.status}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 mb-3">
                              {article.excerpt}
                            </p>
                            
                            {article.status === 'published' ? (
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                <div>
                                  <p className="text-sm text-gray-500">Views</p>
                                  <p className="font-semibold">{article.views}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Reactions</p>
                                  <p className="font-semibold">{article.reactions}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Comments</p>
                                  <p className="font-semibold">{article.comments}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Published</p>
                                  <p className="font-semibold">{article.publishedDate}</p>
                                </div>
                              </div>
                            ) : (
                              <div className="mb-3">
                                <p className="text-sm text-gray-500">Not yet published</p>
                              </div>
                            )}
                            
                            <div className="flex flex-wrap gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              {article.status === 'published' ? (
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                              ) : (
                                <Button variant="outline" size="sm">
                                  Publish
                                </Button>
                              )}
                              <Button variant="outline" size="sm">
                                Analytics
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">
                      No articles found matching your criteria.
                    </p>
                    <Button asChild>
                      <Link to="/dashboard/articles/new">Create Your First Article</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="podcasts">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Podcast Management</CardTitle>
                    <CardDescription>
                      Manage your audio content
                    </CardDescription>
                  </div>
                  <Button asChild>
                    <Link to="/dashboard/podcasts/new">Create New Podcast</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {podcasts.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Thumbnail</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {podcasts.map((podcast) => (
                        <TableRow key={podcast.id}>
                          <TableCell>
                            <img
                              src={podcast.thumbnail}
                              alt={podcast.title}
                              className="w-12 h-12 rounded object-cover"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{podcast.title}</TableCell>
                          <TableCell>{podcast.author}</TableCell>
                          <TableCell>{podcast.category}</TableCell>
                          <TableCell>
                            {Math.floor(podcast.duration / 60)}m {podcast.duration % 60}s
                          </TableCell>
                          <TableCell>{podcast.publishDate}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">
                      You haven't created any podcasts yet.
                    </p>
                    <Button asChild>
                      <Link to="/dashboard/podcasts/new">Create Your First Podcast</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Content Analytics</CardTitle>
                <CardDescription>
                  Detailed insights into your content performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Top Performing Article</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-semibold">Ethical Considerations in AI Development</p>
                        <p className="text-sm text-gray-500">1,542 views</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Most Engaged Category</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-semibold">AI</p>
                        <p className="text-sm text-gray-500">45% of total content</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Top Contributor</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-semibold">Dr. Ada Eze</p>
                        <p className="text-sm text-gray-500">8 articles published</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">New article published</p>
                          <p className="text-sm text-gray-500">"Building AI-Powered Healthcare Solutions" by Dr. Amara Okello</p>
                        </div>
                        <span className="text-sm text-gray-500">2 hours ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">Podcast uploaded</p>
                          <p className="text-sm text-gray-500">"Data Privacy in the Digital Age" by Kwame Asante</p>
                        </div>
                        <span className="text-sm text-gray-500">1 day ago</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">New comment received</p>
                          <p className="text-sm text-gray-500">On "AI in African Agriculture" by User123</p>
                        </div>
                        <span className="text-sm text-gray-500">2 days ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default AfricanStackDashboard