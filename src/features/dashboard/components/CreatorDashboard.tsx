import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import SEO from '@/components/layout/SEO'

// Mock data for creator profile
const creatorProfile = {
  name: 'Jane Smith',
  bio: 'Senior Frontend Developer with 10 years of experience',
  website: 'https://janesmith.dev',
  socialLinks: {
    twitter: 'https://twitter.com/janesmith',
    linkedin: 'https://linkedin.com/in/janesmith',
    github: 'https://github.com/janesmith'
  },
  profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop'
}

// Mock data for drafts
const drafts = [
  {
    id: 'draft1',
    title: 'Understanding React Concurrent Mode',
    excerpt: 'A deep dive into the new features of React Concurrent Mode and how they improve performance.',
    updatedAt: '2023-06-18'
  },
  {
    id: 'draft2',
    title: 'Building Accessible Web Applications',
    excerpt: 'Best practices for creating web applications that are accessible to all users.',
    updatedAt: '2023-06-15'
  }
]

// Mock data for published articles
const publishedArticles = [
  {
    id: '1',
    title: 'The Future of Web Development',
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
    author: 'Jane Smith',
    readTime: 5,
    date: '2023-06-15',
    category: 'Technology',
    views: 12400,
    reactions: 342,
    comments: 24
  },
  {
    id: '2',
    title: 'Building Sustainable Applications',
    excerpt: 'How to create software that stands the test of time with sustainable practices.',
    author: 'Jane Smith',
    readTime: 8,
    date: '2023-06-10',
    category: 'Software',
    views: 8900,
    reactions: 210,
    comments: 18
  }
]

// Mock analytics data
const analyticsData = {
  totalViews: 21300,
  totalReactions: 552,
  totalComments: 42,
  earnings: 0 // Placeholder for earnings
}

const CreatorDashboard = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'drafts' | 'published' | 'analytics'>('analytics')

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title="Creator Dashboard - African Stack"
        description="Manage your articles, track performance, and create new content."
        keywords="creator, dashboard, articles, content management"
      />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Creator Dashboard</h1>
        <p className="text-gray-600">
          Manage your content and track your performance
        </p>
      </div>

      {/* Creator Profile Header */}
      <div className="bg-gray-100 rounded-lg p-6 mb-8">
        <div className="flex items-center gap-4">
          <img
            src={creatorProfile.profileImage}
            alt={creatorProfile.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">{creatorProfile.name}</h2>
            <p className="text-gray-600">{creatorProfile.bio}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b mb-8">
        <Button
          variant={activeTab === 'analytics' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('analytics')}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
        >
          Analytics
        </Button>
        <Button
          variant={activeTab === 'drafts' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('drafts')}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
        >
          Drafts
        </Button>
        <Button
          variant={activeTab === 'published' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('published')}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
        >
          Published
        </Button>
        <Button
          variant={activeTab === 'profile' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('profile')}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
        >
          Profile
        </Button>
      </div>

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Your Analytics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Total Views</h3>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{analyticsData.totalViews.toLocaleString()}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Total Reactions</h3>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{analyticsData.totalReactions.toLocaleString()}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Total Comments</h3>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{analyticsData.totalComments.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <h3 className="text-lg font-medium">Earnings</h3>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-gray-400">Coming Soon</p>
              <p className="text-gray-600 mt-2">
                We're working on implementing earnings tracking for creators. This feature will be available soon.
              </p>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button asChild>
              <Link to="/creator/articles/new">Write a new article</Link>
            </Button>
          </div>
        </section>
      )}

      {/* Drafts Tab */}
      {activeTab === 'drafts' && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Drafts</h2>
            <Button asChild>
              <Link to="/creator/articles/new">Write a new article</Link>
            </Button>
          </div>
          
          {drafts.length > 0 ? (
            <div className="space-y-4">
              {drafts.map((draft) => (
                <Card key={draft.id}>
                  <CardHeader>
                    <h3 className="text-xl font-bold">
                      <Link
                        to={`/creator/articles/${draft.id}/edit`}
                        className="hover:text-blue-600"
                      >
                        {draft.title}
                      </Link>
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{draft.excerpt}</p>
                    <p className="text-sm text-gray-500">Last updated: {draft.updatedAt}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" asChild>
                      <Link to={`/creator/articles/${draft.id}/edit`}>Edit</Link>
                    </Button>
                    <Button asChild>
                      <Link to={`/creator/articles/${draft.id}/publish`}>Publish</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No drafts yet</h3>
              <p className="text-gray-600 mb-4">
                Start writing your first article.
              </p>
              <Button asChild>
                <Link to="/creator/articles/new">Write a new article</Link>
              </Button>
            </div>
          )}
        </section>
      )}

      {/* Published Articles Tab */}
      {activeTab === 'published' && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Published Articles</h2>
            <Button asChild>
              <Link to="/creator/articles/new">Write a new article</Link>
            </Button>
          </div>
          
          {publishedArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedArticles.map((article) => (
                <Card key={article.id} className="flex flex-col">
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
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="font-bold">{article.views.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Views</p>
                      </div>
                      <div>
                        <p className="font-bold">{article.reactions.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Reactions</p>
                      </div>
                      <div>
                        <p className="font-bold">{article.comments.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">Comments</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <span className="text-sm font-medium">{article.author}</span>
                    <span className="text-sm text-gray-500">{article.date}</span>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No published articles yet</h3>
              <p className="text-gray-600 mb-4">
                Publish your first article to start building your audience.
              </p>
              <Button asChild>
                <Link to="/creator/articles/new">Write a new article</Link>
              </Button>
            </div>
          )}
        </section>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
          
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Profile Information</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Display Name</label>
                  <input
                    type="text"
                    defaultValue={creatorProfile.name}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Bio</label>
                  <textarea
                    defaultValue={creatorProfile.bio}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Website</label>
                  <input
                    type="url"
                    defaultValue={creatorProfile.website}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Twitter</label>
                  <input
                    type="url"
                    defaultValue={creatorProfile.socialLinks.twitter}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">LinkedIn</label>
                  <input
                    type="url"
                    defaultValue={creatorProfile.socialLinks.linkedin}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">GitHub</label>
                  <input
                    type="url"
                    defaultValue={creatorProfile.socialLinks.github}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </section>
      )}
    </div>
  )
}

export default CreatorDashboard