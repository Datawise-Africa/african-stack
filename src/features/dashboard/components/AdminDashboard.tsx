import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import SEO from '@/components/layout/SEO'

// Mock data for pending author applications
const pendingApplications = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    bio: 'Frontend developer with 5 years experience',
    website: 'https://alicejohnson.dev',
    appliedDate: '2023-06-18'
  },
  {
    id: '2',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    bio: 'Technical writer and UX designer',
    website: 'https://bobwilson.design',
    appliedDate: '2023-06-17'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    bio: 'Full-stack developer specializing in React',
    website: 'https://caroldavis.dev',
    appliedDate: '2023-06-16'
  }
]

// Mock data for pending articles
const pendingArticles = [
  {
    id: '1',
    title: 'Understanding React Concurrent Mode',
    author: 'Alice Johnson',
    category: 'React',
    submittedDate: '2023-06-18',
    readTime: 8
  },
  {
    id: '2',
    title: 'Building Accessible Web Applications',
    author: 'Bob Wilson',
    category: 'Accessibility',
    submittedDate: '2023-06-17',
    readTime: 12
  },
  {
    id: '3',
    title: 'State Management in Modern Applications',
    author: 'Carol Davis',
    category: 'React',
    submittedDate: '2023-06-16',
    readTime: 10
  }
]

// Mock data for users
const users = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    status: 'active',
    joinDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'author',
    status: 'active',
    joinDate: '2023-02-20'
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'reader',
    status: 'pending',
    joinDate: '2023-06-18'
  },
  {
    id: '4',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    role: 'reader',
    status: 'active',
    joinDate: '2023-03-10'
  }
]

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'applications' | 'articles' | 'users'>('applications')

  const handleApproveApplication = (id: string) => {
    console.log(`Approved application ${id}`)
    // In a real app, this would make an API call to update the user's role
  }

  const handleRejectApplication = (id: string) => {
    console.log(`Rejected application ${id}`)
    // In a real app, this would make an API call to reject the application
  }

  const handleApproveArticle = (id: string) => {
    console.log(`Approved article ${id}`)
    // In a real app, this would make an API call to publish the article
  }

  const handleRejectArticle = (id: string) => {
    console.log(`Rejected article ${id}`)
    // In a real app, this would make an API call to reject the article
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title="Admin Dashboard - African Stack"
        description="Admin dashboard for managing users, content, and platform settings."
        keywords="admin, dashboard, content management, user management"
      />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">
          Manage users, content, and platform settings
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b mb-8">
        <Button
          variant={activeTab === 'applications' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('applications')}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
        >
          Author Applications
        </Button>
        <Button
          variant={activeTab === 'articles' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('articles')}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
        >
          Article Review
        </Button>
        <Button
          variant={activeTab === 'users' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('users')}
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent"
        >
          User Management
        </Button>
      </div>

      {/* Author Applications Tab */}
      {activeTab === 'applications' && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Pending Author Applications</h2>
          
          {pendingApplications.length > 0 ? (
            <div className="space-y-4">
              {pendingApplications.map((application) => (
                <Card key={application.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold">{application.name}</h3>
                        <p className="text-gray-600">{application.email}</p>
                      </div>
                      <span className="text-sm text-gray-500">{application.appliedDate}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-2">{application.bio}</p>
                    <p className="text-gray-600">
                      Website: <a href={application.website} className="text-blue-600 hover:underline">
                        {application.website}
                      </a>
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleRejectApplication(application.id)}
                    >
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleApproveApplication(application.id)}
                    >
                      Approve
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No pending applications</h3>
              <p className="text-gray-600">
                All author applications have been processed.
              </p>
            </div>
          )}
        </section>
      )}

      {/* Article Review Tab */}
      {activeTab === 'articles' && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Pending Article Review</h2>
          
          {pendingArticles.length > 0 ? (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead>Read Time</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingArticles.map((article) => (
                    <TableRow key={article.id}>
                      <TableCell className="font-medium">{article.title}</TableCell>
                      <TableCell>{article.author}</TableCell>
                      <TableCell>{article.category}</TableCell>
                      <TableCell>{article.submittedDate}</TableCell>
                      <TableCell>{article.readTime} min</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="mr-2"
                          onClick={() => handleRejectArticle(article.id)}
                        >
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleApproveArticle(article.id)}
                        >
                          Approve
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No pending articles</h3>
              <p className="text-gray-600">
                All submitted articles have been reviewed.
              </p>
            </div>
          )}
        </section>
      )}

      {/* User Management Tab */}
      {activeTab === 'users' && (
        <section>
          <h2 className="text-2xl font-bold mb-6">User Management</h2>
          
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>
      )}
    </div>
  )
}

export default AdminDashboard