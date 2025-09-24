import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useAuthStore } from '@/stores/authStore'
import SEO from '@/components/layout/SEO'

// Mock article data
const mockArticle = {
  id: '1',
  title: 'The Future of Web Development',
  content: `
    <p>Web development has evolved dramatically over the past decade. With new frameworks, tools, and methodologies emerging constantly, it's important to stay ahead of the curve.</p>
    
    <h2>Modern Frameworks</h2>
    <p>Today's developers have access to powerful frameworks like React, Vue, and Angular that make building complex applications more manageable. These frameworks provide component-based architecture, state management solutions, and efficient rendering mechanisms.</p>
    
    <h2>Server-Side Rendering</h2>
    <p>Server-side rendering (SSR) has become increasingly popular as it provides better SEO and initial loading performance. Frameworks like Next.js and Nuxt.js have made implementing SSR more accessible than ever.</p>
    
    <h2>The Rise of Jamstack</h2>
    <p>Jamstack (JavaScript, APIs, and Markup) architecture has gained significant traction. By pre-building pages and serving them from a CDN, developers can achieve faster performance and better security.</p>
    
    <h2>Conclusion</h2>
    <p>The future of web development looks bright with continued innovation in frameworks, tools, and deployment strategies. As developers, we must stay curious and keep learning to build better experiences for our users.</p>
  `,
  author: {
    id: 'author1',
    name: 'Jane Smith',
    bio: 'Senior Frontend Developer with 10 years of experience',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  readTime: 5,
  date: '2023-06-15',
  category: 'Technology',
  tags: ['web development', 'frameworks', 'javascript'],
  thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop'
}

// Mock comments
const mockComments = [
  {
    id: '1',
    author: 'John Doe',
    content: 'Great article! I especially enjoyed the section on Jamstack.',
    date: '2023-06-16',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop'
  },
  {
    id: '2',
    author: 'Sarah Williams',
    content: 'Thanks for sharing. Do you have any recommendations for learning resources?',
    date: '2023-06-16',
    avatar: 'https://images.unsplash.com/photo-1438761681033-513721e64c07?w=50&h=50&fit=crop'
  }
]

const ArticleDetail = () => {
  // We're using mock data so we don't need the id parameter right now
  useParams(); 
  const { isAuthenticated } = useAuthStore()
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState('')
  const [reactions, setReactions] = useState({
    like: 24,
    clap: 12,
    love: 8
  })

  const handleAddComment = () => {
    if (newComment.trim() === '') return
    
    const comment = {
      id: (comments.length + 1).toString(),
      author: 'Current User',
      content: newComment,
      date: new Date().toISOString().split('T')[0],
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop'
    }
    
    setComments([comment, ...comments])
    setNewComment('')
  }

  const handleReaction = (type: 'like' | 'clap' | 'love') => {
    setReactions(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title={mockArticle.title}
        description={mockArticle.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...'}
        keywords={`${mockArticle.category}, ${mockArticle.tags.join(', ')}`}
        ogTitle={mockArticle.title}
        ogDescription={mockArticle.content.replace(/<[^>]*>/g, '').substring(0, 160) + '...'}
        ogImage={mockArticle.thumbnail}
        author={mockArticle.author.name}
      />
      
      <article className="max-w-3xl mx-auto">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
              {mockArticle.category}
            </span>
            <span className="text-gray-500 text-sm">{mockArticle.readTime} min read</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">{mockArticle.title}</h1>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img
                src={mockArticle.author.avatar}
                alt={mockArticle.author.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium">{mockArticle.author.name}</p>
                <p className="text-gray-600 text-sm">{mockArticle.date}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Article Image */}
        <div className="mb-8">
          <img
            src={mockArticle.thumbnail}
            alt={mockArticle.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Article Content */}
        <div
          className="prose max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: mockArticle.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {mockArticle.tags.map(tag => (
            <span
              key={tag}
              className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Reactions */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b">
          <Button
            variant="outline"
            onClick={() => handleReaction('like')}
            className="flex items-center gap-2"
          >
            👍 {reactions.like}
          </Button>
          <Button
            variant="outline"
            onClick={() => handleReaction('clap')}
            className="flex items-center gap-2"
          >
            👏 {reactions.clap}
          </Button>
          <Button
            variant="outline"
            onClick={() => handleReaction('love')}
            className="flex items-center gap-2"
          >
            ❤️ {reactions.love}
          </Button>
        </div>

        {/* Comments Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
          
          {/* Add Comment Form */}
          {isAuthenticated ? (
            <Card className="mb-8">
              <CardHeader>
                <h3 className="text-lg font-medium">Add a comment</h3>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop"
                    alt="Your avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-grow">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write your comment here..."
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                    <div className="flex justify-end mt-2">
                      <Button onClick={handleAddComment}>Post Comment</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg mb-8 text-center">
              <p className="mb-4">You need to be logged in to comment on this article.</p>
              <Button asChild>
                <a href="/login">Log in to comment</a>
              </Button>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment.id} className="flex gap-4">
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-grow">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-gray-500 text-sm">{comment.date}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  )
}

export default ArticleDetail