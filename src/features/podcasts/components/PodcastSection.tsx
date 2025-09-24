import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import SEO from '@/components/layout/SEO'

// Mock podcast data
const mockPodcasts = [
  {
    id: '1',
    title: 'The Future of Web Development',
    description: 'Exploring the latest trends and technologies in web development.',
    author: {
      id: '1',
      name: 'Jane Smith',
      avatar: 'https://github.com/shadcn.png',
    },
    category: 'Technology',
    duration: 3600, // 1 hour in seconds
    publishDate: '2023-06-15T10:00:00Z',
    thumbnail: 'https://images.unsplash.com/photo-1472437774355-71ab6752b434?w=400&h=400&fit=crop',
    audioUrl: '/podcasts/future-of-web-dev.mp3',
  },
  {
    id: '2',
    title: 'Design Systems and Component Libraries',
    description: 'How to build and maintain scalable design systems.',
    author: {
      id: '2',
      name: 'John Doe',
      avatar: 'https://github.com/shadcn.png',
    },
    category: 'Design',
    duration: 2700, // 45 minutes in seconds
    publishDate: '2023-06-10T10:00:00Z',
    thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=400&fit=crop',
    audioUrl: '/podcasts/design-systems.mp3',
  },
  {
    id: '3',
    title: 'Building Scalable APIs',
    description: 'Best practices for designing and implementing RESTful APIs.',
    author: {
      id: '3',
      name: 'Alice Johnson',
      avatar: 'https://github.com/shadcn.png',
    },
    category: 'Technology',
    duration: 3120, // 52 minutes in seconds
    publishDate: '2023-06-05T10:00:00Z',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=400&fit=crop',
    audioUrl: '/podcasts/scalable-apis.mp3',
  },
]

// Mock categories
const categories = [
  'All',
  'Technology',
  'Design',
  'Business',
  'Science',
]

const PodcastSection = () => {
  const [podcasts] = useState(mockPodcasts)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPodcasts = podcasts.filter(podcast => {
    const matchesCategory = selectedCategory === 'All' || podcast.category === selectedCategory
    const matchesSearch = podcast.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          podcast.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    }
    return `${minutes}m`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title="Podcasts - Medium Clone"
        description="Discover and listen to the latest podcasts from our community."
        keywords="podcasts, audio, technology, design, business, science"
      />
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Podcasts</h1>
        <p className="text-gray-600">
          Discover and listen to the latest podcasts from our community.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            placeholder="Search podcasts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-48">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Podcast Grid */}
      {filteredPodcasts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPodcasts.map(podcast => (
            <Card key={podcast.id} className="flex flex-col">
              <CardHeader className="p-0">
                <img
                  src={podcast.thumbnail}
                  alt={podcast.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              </CardHeader>
              
              <CardContent className="flex-1 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={podcast.author.avatar} alt={podcast.author.name} />
                    <AvatarFallback>{podcast.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{podcast.author.name}</span>
                </div>
                
                <CardTitle className="text-lg mb-2 line-clamp-2">
                  {podcast.title}
                </CardTitle>
                
                <CardDescription className="line-clamp-3 mb-3">
                  {podcast.description}
                </CardDescription>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{podcast.category}</span>
                  <span>{formatDuration(podcast.duration)}</span>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" asChild>
                  <Link to={`/podcasts/${podcast.id}`}>
                    Listen Now
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            No podcasts found matching your criteria.
          </p>
          <Button onClick={() => {
            setSelectedCategory('All')
            setSearchQuery('')
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

export default PodcastSection