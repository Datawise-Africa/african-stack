import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

// Mock podcast data
const mockPodcasts = [
  {
    id: '1',
    title: 'The Future of Web Development',
    description: 'Exploring the latest trends and technologies shaping the future of web development.',
    author: 'Jane Smith',
    duration: 3600, // 60 minutes in seconds
    date: '2023-06-15',
    category: 'Technology',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop',
    audioUrl: '/podcasts/future-of-web-dev.mp3'
  },
  {
    id: '2',
    title: 'Building Sustainable Applications',
    description: 'How to create software that stands the test of time with sustainable practices.',
    author: 'John Doe',
    duration: 2700, // 45 minutes in seconds
    date: '2023-06-10',
    category: 'Software',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop',
    audioUrl: '/podcasts/sustainable-applications.mp3'
  },
  {
    id: '3',
    title: 'The Art of User Experience',
    description: 'Understanding the psychology behind great user experiences and how to implement them.',
    author: 'Alex Johnson',
    duration: 3120, // 52 minutes in seconds
    date: '2023-06-05',
    category: 'Design',
    thumbnail: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=200&fit=crop',
    audioUrl: '/podcasts/user-experience.mp3'
  }
]

// Mock categories
const categories = [
  'All',
  'Technology',
  'Software',
  'Design'
]

const PodcastList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const podcastsPerPage = 6

  // Filter podcasts based on category
  const filteredPodcasts = mockPodcasts.filter(podcast => {
    return selectedCategory === 'All' || podcast.category === selectedCategory
  })

  // Pagination
  const totalPages = Math.ceil(filteredPodcasts.length / podcastsPerPage)
  const startIndex = (currentPage - 1) * podcastsPerPage
  const currentPodcasts = filteredPodcasts.slice(startIndex, startIndex + podcastsPerPage)

  // Format duration from seconds to MM:SS or HH:MM:SS
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Podcasts</h1>
        <p className="text-gray-600">
          Listen to our community of experts share their knowledge and insights.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => {
              setSelectedCategory(category)
              setCurrentPage(1)
            }}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Podcasts Grid */}
      {currentPodcasts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentPodcasts.map((podcast) => (
              <Card key={podcast.id} className="flex flex-col h-full">
                <div className="relative">
                  <img 
                    src={podcast.thumbnail} 
                    alt={podcast.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                    {podcast.category}
                  </span>
                </div>
                <CardHeader>
                  <h3 className="text-xl font-bold">
                    <Link 
                      to={`/podcasts/${podcast.id}`} 
                      className="hover:text-purple-600"
                    >
                      {podcast.title}
                    </Link>
                  </h3>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 mb-4">{podcast.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Duration: {formatDuration(podcast.duration)}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-sm font-medium">{podcast.author}</span>
                  <span className="text-sm text-gray-500">{podcast.date}</span>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className="w-10 h-10 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No podcasts found</h3>
          <p className="text-gray-600">
            Try adjusting your filter to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  )
}

export default PodcastList