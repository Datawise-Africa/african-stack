import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useAuthStore } from '@/stores/authStore'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Mock comment data
const mockComments = [
  {
    id: '1',
    content: 'This is a great article! I learned a lot from reading it.',
    author: {
      id: '2',
      name: 'Jane Smith',
      avatar: 'https://github.com/shadcn.png',
    },
    createdAt: '2023-06-15T10:30:00Z',
    replies: [
      {
        id: '3',
        content: 'I agree! The examples were really helpful.',
        author: {
          id: '4',
          name: 'John Doe',
          avatar: 'https://github.com/shadcn.png',
        },
        createdAt: '2023-06-15T11:45:00Z',
        replies: [],
      },
    ],
  },
  {
    id: '2',
    content: 'Thanks for sharing this. I have a question about the implementation details.',
    author: {
      id: '5',
      name: 'Alice Johnson',
      avatar: 'https://github.com/shadcn.png',
    },
    createdAt: '2023-06-15T12:15:00Z',
    replies: [],
  },
]

const CommentItem = ({ 
  comment,
  onReply
}: { 
  comment: any;
  onReply: (commentId: string, content: string) => void;
}) => {
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const { user } = useAuthStore()

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent)
      setReplyContent('')
      setIsReplying(false)
    }
  }

  return (
    <div className="border-b pb-4 last:border-b-0">
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{comment.author.name}</span>
            <span className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          
          <p className="text-gray-700 mb-2">{comment.content}</p>
          
          {user && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 h-auto text-gray-500 hover:text-gray-700"
              onClick={() => setIsReplying(!isReplying)}
            >
              Reply
            </Button>
          )}
          
          {isReplying && (
            <div className="mt-3 pl-4 border-l-2 border-gray-200">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="mb-2"
                rows={3}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleReply}>
                  Post Reply
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setIsReplying(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 pl-4 space-y-4">
              {comment.replies.map((reply: any) => (
                <CommentItem 
                  key={reply.id} 
                  comment={reply} 
                  onReply={onReply} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const CommentSection = () => {
  const [comments, setComments] = useState(mockComments)
  const [newComment, setNewComment] = useState('')
  const { user } = useAuthStore()

  const handleAddComment = () => {
    if (newComment.trim() && user) {
      const comment = {
        id: `${comments.length + 1}`,
        content: newComment,
        author: {
          id: user.id,
          name: user.displayName,
          avatar: user.avatarUrl || 'https://github.com/shadcn.png',
        },
        createdAt: new Date().toISOString(),
        replies: [],
      }
      
      setComments([comment, ...comments])
      setNewComment('')
    }
  }

  const handleReplyToComment = (commentId: string, content: string) => {
    if (!user) return
    
    const reply = {
      id: `${comments.length + 1}`,
      content,
      author: {
        id: user.id,
        name: user.displayName,
        avatar: user.avatarUrl || 'https://github.com/shadcn.png',
      },
      createdAt: new Date().toISOString(),
      replies: [],
    }
    
    const addReply = (comments: any[]): any[] => {
      return comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, reply],
          }
        }
        
        if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: addReply(comment.replies),
          }
        }
        
        return comment
      })
    }
    
    setComments(addReply(comments))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
      
      {user ? (
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage src={user.avatarUrl || 'https://github.com/shadcn.png'} alt={user.displayName} />
            <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="mb-2"
              rows={3}
            />
            <Button 
              onClick={handleAddComment} 
              disabled={!newComment.trim()}
            >
              Post Comment
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Please log in to leave a comment.
          </p>
          <Button>Login</Button>
        </div>
      )}
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem 
            key={comment.id} 
            comment={comment} 
            onReply={handleReplyToComment} 
          />
        ))}
      </div>
    </div>
  )
}

export default CommentSection