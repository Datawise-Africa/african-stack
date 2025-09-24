import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import SEO from '@/components/layout/SEO'

// Mock podcast data
const mockPodcast = {
  id: '1',
  title: 'The Future of Web Development',
  description: 'In this episode, we explore the latest trends and technologies shaping the future of web development. Our guest experts discuss everything from AI-powered development tools to the rise of edge computing and how these innovations are changing the way we build web applications.',
  author: {
    id: '1',
    name: 'Jane Smith',
    avatar: 'https://github.com/shadcn.png',
    bio: 'Senior Frontend Developer at TechCorp with 10 years of experience in web technologies.',
  },
  category: 'Technology',
  duration: 3600, // 1 hour in seconds
  publishDate: '2023-06-15T10:00:00Z',
  thumbnail: 'https://images.unsplash.com/photo-1472437774355-71ab6752b434?w=800&h=400&fit=crop',
  audioUrl: '/podcasts/future-of-web-dev.mp3',
}

const PodcastDetail = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // In a real app, you would fetch the podcast data based on the ID
  const podcast = mockPodcast

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
    }

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime)
    }

    audio.addEventListener('loadeddata', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)

    return () => {
      audio.removeEventListener('loadeddata', setAudioData)
      audio.removeEventListener('timeupdate', setAudioTime)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title={`${podcast.title} - Medium Clone Podcast`}
        description={podcast.description}
        keywords={`podcast, ${podcast.category}, ${podcast.author.name}`}
      />
      
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-4">
          ← Back to Podcasts
        </Button>
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {podcast.title}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-12 h-12">
              <AvatarImage src={podcast.author.avatar} alt={podcast.author.name} />
              <AvatarFallback>{podcast.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div>
              <p className="font-medium">{podcast.author.name}</p>
              <p className="text-sm text-gray-500">
                {new Date(podcast.publishDate).toLocaleDateString()} • {podcast.category}
              </p>
            </div>
          </div>
          
          <img
            src={podcast.thumbnail}
            alt={podcast.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
          />
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700">
                {podcast.description}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        
        {/* Audio Player */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Button
                size="icon"
                className="rounded-full w-12 h-12"
                onClick={togglePlay}
              >
                {isPlaying ? '⏸' : '▶'}
              </Button>
              
              <div>
                <p className="font-medium">{podcast.title}</p>
                <p className="text-sm text-gray-500">{podcast.author.name}</p>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={1}
            onValueChange={handleSeek}
            className="mb-2"
          />
        </div>
        
        {/* Author Bio */}
        <Card>
          <CardHeader>
            <CardTitle>About the Author</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={podcast.author.avatar} alt={podcast.author.name} />
                <AvatarFallback>{podcast.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div>
                <h3 className="font-medium text-lg mb-1">{podcast.author.name}</h3>
                <CardDescription className="mb-3">
                  {podcast.author.bio}
                </CardDescription>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={podcast.audioUrl}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  )
}

export default PodcastDetail