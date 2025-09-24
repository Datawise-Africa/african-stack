import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/authStore'

// Mock reaction data
const mockReactions = {
  like: 24,
  clap: 18,
  love: 12,
  celebrate: 5,
  insightful: 8,
  curious: 3,
}

// Reaction types with emojis
const reactionTypes = [
  { type: 'like', emoji: '👍', label: 'Like' },
  { type: 'clap', emoji: '👏', label: 'Clap' },
  { type: 'love', emoji: '❤️', label: 'Love' },
  { type: 'celebrate', emoji: '🎉', label: 'Celebrate' },
  { type: 'insightful', emoji: '💡', label: 'Insightful' },
  { type: 'curious', emoji: '🤔', label: 'Curious' },
]

const ReactionSection = () => {
  const [reactions, setReactions] = useState(mockReactions)
  const [userReaction, setUserReaction] = useState<string | null>(null)
  const { user } = useAuthStore()

  const handleReaction = (reactionType: string) => {
    if (!user) {
      // In a real app, you would redirect to login
      alert('Please log in to react to this article')
      return
    }

    // If user is removing their reaction
    if (userReaction === reactionType) {
      setReactions(prev => ({
        ...prev,
        [reactionType]: Math.max(0, prev[reactionType as keyof typeof prev] - 1)
      }))
      setUserReaction(null)
      return
    }

    // If user is changing their reaction
    if (userReaction) {
      setReactions(prev => ({
        ...prev,
        [userReaction]: Math.max(0, prev[userReaction as keyof typeof prev] - 1),
        [reactionType]: prev[reactionType as keyof typeof prev] + 1
      }))
      setUserReaction(reactionType)
      return
    }

    // If user is adding a new reaction
    setReactions(prev => ({
      ...prev,
      [reactionType]: prev[reactionType as keyof typeof prev] + 1
    }))
    setUserReaction(reactionType)
  }

  return (
    <div className="py-6 border-t border-b">
      <div className="flex flex-wrap gap-2">
        {reactionTypes.map(({ type, emoji }) => (
          <Button
            key={type}
            variant={userReaction === type ? 'default' : 'outline'}
            size="sm"
            className="flex items-center gap-1"
            onClick={() => handleReaction(type)}
          >
            <span>{emoji}</span>
            <span>{reactions[type as keyof typeof reactions]}</span>
          </Button>
        ))}
      </div>
      
      {!user && (
        <p className="text-sm text-gray-500 mt-2">
          Log in to react to this article
        </p>
      )}
    </div>
  )
}

export default ReactionSection