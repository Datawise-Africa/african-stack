import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import SEO from '@/components/layout/SEO'
import OptimizedImage from '@/components/common/OptimizedImage'
import NewsletterSignup from '@/features/newsletter/components/NewsletterSignup'

// Mock data for featured articles with AI and Data Science theme
const featuredArticles = [
  {
    id: '1',
    title: 'The Future of AI in Africa',
    excerpt: 'Exploring how artificial intelligence is transforming industries across the African continent.',
    author: 'Amara Okafor',
    readTime: 7,
    date: '2025-09-10',
    category: 'Artificial Intelligence',
    image: 'https://plus.unsplash.com/premium_photo-1668183474308-0d009a15c64c?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Visualization of AI technology connecting across Africa'
  },
  {
    id: '2',
    title: 'Data Science Solutions for Healthcare',
    excerpt: 'How data science is revolutionizing healthcare delivery and outcomes in developing regions.',
    author: 'Daniel Mensah',
    readTime: 8,
    date: '2025-09-05',
    category: 'Data Science',
    image: 'https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Medical data visualization with healthcare elements'
  },
  {
    id: '3',
    title: 'Machine Learning for Climate Prediction',
    excerpt: 'Using advanced ML models to improve climate forecasting and agricultural planning in Africa.',
    author: 'Nala Wanjiru',
    readTime: 6,
    date: '2025-09-01',
    category: 'Machine Learning',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Climate data visualization with machine learning models'
  }
]

// Mock data for latest articles with AI and Data Science theme
const latestArticles = [
  {
    id: '4',
    title: 'Getting Started with Python for Data Analysis',
    excerpt: 'A comprehensive guide to setting up your data science environment with Python and essential libraries.',
    author: 'Kwame Adjei',
    readTime: 10,
    date: '2025-09-15',
    image: 'https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Python code and data visualization graphics'
  },
  {
    id: '5',
    title: 'Natural Language Processing for African Languages',
    excerpt: 'Advances in NLP techniques for processing and analyzing diverse African language texts.',
    author: 'Zainab Ibrahim',
    readTime: 8,
    date: '2025-09-13',
    image: 'https://plus.unsplash.com/premium_photo-1664297939846-330cfd170bae?q=80&w=1155&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Text analysis visualization with African language text'
  },
  {
    id: '6',
    title: 'Building Neural Networks for Computer Vision',
    excerpt: 'Step-by-step tutorial on implementing neural networks for image recognition applications.',
    author: 'Thabo Molefe',
    readTime: 12,
    date: '2025-09-11',
    image: 'https://plus.unsplash.com/premium_photo-1701114506458-8edf26149857?q=80&w=1246&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Neural network structure with image processing visualization'
  }
]

const LandingPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title="African Stack - AI & Data Science Hub"
        description="Discover the latest insights in AI, Machine Learning, and Data Science from across Africa. Learn, share, and build together."
        keywords="AI, artificial intelligence, data science, machine learning, Africa, technology, innovation, programming"
        ogTitle="African Stack - AI & Data Science Hub"
        ogDescription="Discover the latest insights in AI, Machine Learning, and Data Science from across Africa. Learn, share, and build together."
      />
      
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 rounded-xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Africa's AI & Data Science Hub
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Discover cutting-edge insights in artificial intelligence and data science
          from Africa's brightest minds and innovators.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Link to="/articles">Explore Articles</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-purple-500 text-purple-600 hover:bg-purple-50">
            <Link to="/register">Share Your Knowledge</Link>
          </Button>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Featured AI Insights</h2>
          <Link to="/articles" className="text-purple-600 hover:text-purple-800 hover:underline">
            See all articles
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article) => (
            <Card key={article.id} className="flex flex-col overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 overflow-hidden">
                <OptimizedImage 
                  src={article.image} 
                  alt={article.imageAlt}
                  className="w-full h-full"
                  imageClassName="transition-transform duration-300 hover:scale-105"
                  objectFit="cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {article.readTime} min read
                  </span>
                </div>
                <h3 className="text-xl font-bold mt-2">
                  <Link
                    to={`/articles/${article.id}`}
                    className="hover:text-purple-600 transition-colors"
                  >
                    {article.title}
                  </Link>
                </h3>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600">{article.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t border-gray-100 pt-4">
                <span className="text-sm font-medium">{article.author}</span>
                <span className="text-sm text-gray-500">{article.date}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Latest Data Science Insights</h2>
        
        <div className="space-y-8">
          {latestArticles.map((article) => (
            <Card key={article.id} className="flex flex-col md:flex-row overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-full md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                <OptimizedImage 
                  src={article.image} 
                  alt={article.imageAlt}
                  className="w-full h-full"
                  imageClassName="transition-transform duration-300 hover:scale-105"
                  objectFit="cover"
                />
              </div>
              <CardContent className="flex-grow p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold">
                    <Link
                      to={`/articles/${article.id}`}
                      className="hover:text-purple-600 transition-colors"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 whitespace-nowrap ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {article.readTime} min read
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{article.author}</span>
                  <span className="text-sm text-gray-500">{article.date}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-12">
        <NewsletterSignup />
      </section>
    </div>
  )
}

export default LandingPage