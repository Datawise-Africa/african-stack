import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import SEO from '@/components/layout/SEO'

// Mock data for personalized feed
const personalizedFeed = [
  {
    id: '1',
    title: 'The Future of Web Development',
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
    author: 'Jane Smith',
    readTime: 5,
    date: '2023-06-15',
    category: 'Technology',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop'
  },
  {
    id: '2',
    title: 'Building Sustainable Applications',
    excerpt: 'How to create software that stands the test of time with sustainable practices.',
    author: 'John Doe',
    readTime: 8,
    date: '2023-06-10',
    category: 'Software',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop'
  },
  {
    id: '3',
    title: 'The Art of User Experience',
    excerpt: 'Understanding the psychology behind great user experiences and how to implement them.',
    author: 'Alex Johnson',
    readTime: 6,
    date: '2023-06-05',
    category: 'Design',
    thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=200&fit=crop'
  }
]

// Mock data for saved articles
const savedArticles = [
  {
    id: '4',
    title: 'Getting Started with React Hooks',
    excerpt: 'A comprehensive guide to understanding and using React Hooks effectively.',
    author: 'Sarah Williams',
    readTime: 4,
    date: '2023-06-18',
    category: 'React',
    thumbnail: 'https://images.unsplash.com/photo-1633356122102-3fe601e01c78?w=400&h=200&fit=crop'
  },
  {
    id: '5',
    title: 'CSS Grid vs Flexbox',
    excerpt: 'When to use CSS Grid and when to use Flexbox for your layout needs.',
    author: 'Michael Brown',
    readTime: 7,
    date: '2023-06-17',
    category: 'CSS',
    thumbnail: 'https://images.unsplash.com/photo-1517470982083-053b3c331350?w=400&h=200&fit=crop'
  }
]

// Mock data for reading history
const readingHistory = [
  {
    id: '6',
    title: 'TypeScript Best Practices',
    excerpt: 'Essential TypeScript patterns and practices for better code quality.',
    author: 'Emily Davis',
    readTime: 9,
    date: '2023-06-16',
    category: 'TypeScript'
  },
  {
    id: '7',
    title: 'Advanced State Management',
    excerpt: 'Comparing different state management solutions in modern frontend applications.',
    author: 'David Wilson',
    readTime: 12,
    date: '2023-06-14',
    category: 'React'
  },
  {
    id: '8',
    title: 'Serverless Architecture Patterns',
    excerpt: 'How to design and implement serverless applications effectively.',
    author: 'Lisa Chen',
    readTime: 15,
    date: '2023-06-12',
    category: 'Cloud'
  }
]

const ReaderDashboard = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'saved' | 'history'>('feed')

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title="Reader Dashboard - African Stack"
        description="Your personalized reading dashboard with reading history and saved articles."
        keywords="reader, dashboard, reading history, saved articles"
      />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Reader Dashboard</h1>
        <p className="text-gray-600">
          Your personalized reading experience
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b mb-8">
        <Button
          variant={activeTab === 'feed' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('feed')}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
        >
          For You
        </Button>
        <Button
          variant={activeTab === 'saved' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('saved')}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
        >
          Saved Articles
        </Button>
        <Button
          variant={activeTab === 'history' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('history')}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
        >
          Reading History
        </Button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'feed' && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalizedFeed.map((article) => (
              <Card key={article.id} className="flex flex-col">
                <div className="relative">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    {article.category}
                  </span>
                </div>
                <CardHeader>
                  <h3 className="text-xl font-bold">
                    <Link
                      to={`/articles/${article.id}`}
                      className="hover:text-blue-600"
                    >
                      {article.title}
                    </Link>
                  </h3>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600">{article.excerpt}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-sm font-medium">{article.author}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{article.readTime} min read</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'saved' && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Saved Articles</h2>
          {savedArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedArticles.map((article) => (
                <Card key={article.id} className="flex flex-col">
                  <div className="relative">
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      {article.category}
                    </span>
                  </div>
                  <CardHeader>
                    <h3 className="text-xl font-bold">
                      <Link
                        to={`/articles/${article.id}`}
                        className="hover:text-blue-600"
                      >
                        {article.title}
                      </Link>
                    </h3>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600">{article.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-sm font-medium">{article.author}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">{article.readTime} min read</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No saved articles yet</h3>
              <p className="text-gray-600 mb-4">
                Save articles you want to read later by clicking the bookmark icon.
              </p>
              <Button asChild>
                <Link to="/articles">Browse Articles</Link>
              </Button>
            </div>
          )}
        </section>
      )}

      {activeTab === 'history' && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Reading History</h2>
          {readingHistory.length > 0 ? (
            <div className="space-y-4">
              {readingHistory.map((article) => (
                <Card key={article.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold">
                        <Link
                          to={`/articles/${article.id}`}
                          className="hover:text-blue-600"
                        >
                          {article.title}
                        </Link>
                      </h3>
                      <span className="text-sm text-gray-500 whitespace-nowrap">
                        {article.readTime} min read
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{article.author}</span>
                      <span className="text-sm text-gray-500">{article.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No reading history yet</h3>
              <p className="text-gray-600">
                Articles you read will appear here.
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  )
}

export default ReaderDashboard