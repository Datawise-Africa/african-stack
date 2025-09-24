import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
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
import SEO from '@/components/layout/SEO'
import { BookOpen, Clock, Heart } from 'lucide-react'

// Mock data for reading history
const readingHistory = [
  {
    id: '1',
    title: 'The Future of Web Development',
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
    category: 'Technology',
    readTime: 5,
    author: 'Jane Smith',
    date: '2023-06-15',
  },
  {
    id: '2',
    title: 'Building Sustainable Applications',
    excerpt: 'How to create applications that are both environmentally and economically sustainable.',
    category: 'Software',
    readTime: 8,
    author: 'John Doe',
    date: '2023-06-10',
  },
  {
    id: '3',
    title: 'The Art of User Experience',
    excerpt: 'Understanding the principles that make digital products truly delightful to use.',
    category: 'Design',
    readTime: 6,
    author: 'Alice Johnson',
    date: '2023-06-05',
  },
]

// Mock data for saved articles
const savedArticles = [
  {
    id: '4',
    title: 'Machine Learning in Everyday Applications',
    excerpt: 'How machine learning is being integrated into the apps we use daily.',
    category: 'AI',
    readTime: 10,
    author: 'Bob Wilson',
    date: '2023-05-28',
  },
  {
    id: '5',
    title: 'Cybersecurity Best Practices for 2023',
    excerpt: 'Essential security measures every developer should implement in their applications.',
    category: 'Security',
    readTime: 7,
    author: 'Carol Davis',
    date: '2023-05-20',
  },
]

const ReaderDashboard = () => {
  // const { user } = useAuthStore()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('reading-history')

  // Set active tab based on current route
  useEffect(() => {
    if (location.pathname.includes('/history')) {
      setActiveTab('reading-history')
    } else if (location.pathname.includes('/saved')) {
      setActiveTab('saved-articles')
    }
  }, [location.pathname])

  return (
    <>
      <SEO
        title="Reader Dashboard - African Stack"
        description="Your personalized reading dashboard with reading history and saved articles."
        keywords="reader dashboard, reading history, saved articles, personalization"
      />

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Articles Read
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{readingHistory.length}</div>
            <p className="text-xs text-green-600">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <Heart className="h-4 w-4 mr-2" />
              Saved Articles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savedArticles.length}</div>
            <p className="text-xs text-blue-600">Ready to read</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Reading Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {readingHistory.reduce((total, article) => total + article.readTime, 0)} min
            </div>
            <p className="text-xs text-purple-600">Total this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reading-history">Reading History</TabsTrigger>
          <TabsTrigger value="saved-articles">Saved Articles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reading-history">
          <Card>
            <CardHeader>
              <CardTitle>Reading History</CardTitle>
              <CardDescription>
                Articles you've recently read
              </CardDescription>
            </CardHeader>
            <CardContent>
              {readingHistory.length > 0 ? (
                <div className="space-y-4">
                  {readingHistory.map((article) => (
                    <div key={article.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <Badge variant="secondary" className="mb-2 sm:mb-0 w-fit">
                          {article.category}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {article.readTime} min read
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-2">
                        <Link
                          to={`/articles/${article.id}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <span className="text-sm font-medium">
                          by {article.author}
                        </span>
                        <span className="text-sm text-gray-500">
                          Read on {article.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    You haven't read any articles yet.
                  </p>
                  <Button asChild>
                    <Link to="/articles">Explore Articles</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="saved-articles">
          <Card>
            <CardHeader>
              <CardTitle>Saved Articles</CardTitle>
              <CardDescription>
                Articles you've bookmarked for later
              </CardDescription>
            </CardHeader>
            <CardContent>
              {savedArticles.length > 0 ? (
                <div className="space-y-4">
                  {savedArticles.map((article) => (
                    <div key={article.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                        <Badge variant="secondary" className="mb-2 sm:mb-0 w-fit">
                          {article.category}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {article.readTime} min read
                        </div>
                      </div>
                      <h3 className="text-lg font-bold mb-2">
                        <Link
                          to={`/articles/${article.id}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <span className="text-sm font-medium">
                          by {article.author}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            Saved from {article.date}
                          </span>
                          <Button variant="outline" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    You haven't saved any articles yet.
                  </p>
                  <Button asChild>
                    <Link to="/articles">Explore Articles</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}

export default ReaderDashboard