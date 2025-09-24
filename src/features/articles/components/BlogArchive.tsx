import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import SEO from '@/components/layout/SEO'

// Mock data for articles
const mockArticles = [
  {
    id: '1',
    title: 'The Future of Web Development',
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
    category: 'Technology',
    readTime: 5,
    author: 'Jane Smith',
    date: '2023-06-15',
    featured: true,
  },
  {
    id: '2',
    title: 'Building Sustainable Applications',
    excerpt: 'How to create applications that are both environmentally and economically sustainable.',
    category: 'Software',
    readTime: 8,
    author: 'John Doe',
    date: '2023-06-10',
    featured: false,
  },
  {
    id: '3',
    title: 'The Art of User Experience',
    excerpt: 'Understanding the principles that make digital products truly delightful to use.',
    category: 'Design',
    readTime: 6,
    author: 'Alice Johnson',
    date: '2023-06-05',
    featured: true,
  },
  {
    id: '4',
    title: 'Machine Learning in Everyday Applications',
    excerpt: 'How machine learning is being integrated into the apps we use daily.',
    category: 'AI',
    readTime: 10,
    author: 'Bob Wilson',
    date: '2023-05-28',
    featured: false,
  },
  {
    id: '5',
    title: 'Cybersecurity Best Practices for 2023',
    excerpt: 'Essential security measures every developer should implement in their applications.',
    category: 'Security',
    readTime: 7,
    author: 'Carol Davis',
    date: '2023-05-20',
    featured: false,
  },
  {
    id: '6',
    title: 'The Rise of Low-Code Platforms',
    excerpt: 'How low-code development is changing the landscape of software creation.',
    category: 'Technology',
    readTime: 4,
    author: 'David Brown',
    date: '2023-05-15',
    featured: false,
  },
]

// Mock categories
const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'technology', name: 'Technology' },
  { id: 'software', name: 'Software' },
  { id: 'design', name: 'Design' },
  { id: 'ai', name: 'AI' },
  { id: 'security', name: 'Security' },
]

const BlogArchive = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  // Filter and sort articles based on search term, category, and sort option
  const filteredArticles = useMemo(() => {
    let result = [...mockArticles]
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(term) ||
          article.excerpt.toLowerCase().includes(term) ||
          article.author.toLowerCase().includes(term)
      )
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(
        (article) => article.category.toLowerCase() === selectedCategory
      )
    }
    
    // Sort articles
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        break
      case 'oldest':
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case 'popular':
        // In a real app, this would be based on views or reactions
        result.sort((a, b) => b.readTime - a.readTime)
        break
      default:
        break
    }
    
    return result
  }, [searchTerm, selectedCategory, sortBy])

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title="Blog Archive - African Stack"
        description="Discover the latest articles from our community of writers."
        keywords="blog, articles, technology, software, design"
      />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Stories</h1>
        <p className="text-gray-600">
          Discover the latest articles from our community of writers
        </p>
      </div>
      
      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Articles Grid with Masonry Layout */}
      {filteredArticles.length > 0 ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {filteredArticles.map((article) => (
            <div key={article.id} className="mb-6 break-inside-avoid">
              <Card className="flex flex-col">
                <CardHeader className="flex flex-col space-y-1.5 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-blue-600">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {article.readTime} min read
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">
                    <Link
                      to={`/articles/${article.id}`}
                      className="hover:text-blue-600"
                    >
                      {article.title}
                    </Link>
                  </h3>
                </CardHeader>
                <CardContent className="p-6 pt-0 flex-grow">
                  <p className="text-gray-600">
                    {article.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between items-center">
                  <span className="text-sm font-medium">
                    {article.author}
                  </span>
                  <span className="text-sm text-gray-500">
                    {article.date}
                  </span>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No articles found</h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  )
}

export default BlogArchive