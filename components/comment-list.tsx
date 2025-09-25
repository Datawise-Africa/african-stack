"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Comment {
  id: string;
  articleId: string;
  user: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  body: string;
  createdAt: string;
  updatedAt?: string;
}

interface CommentListProps {
  articleId: string;
  comments?: Comment[];
}

// Mock comments data
const mockComments: Comment[] = [
  {
    id: "comment-1",
    articleId: "article-1",
    user: {
      id: "user-2",
      name: "Dr. Michael Chen",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael"
    },
    body: "Great article! I particularly enjoyed the section on local context understanding. In my experience working with African startups, this is often the most overlooked aspect.",
    createdAt: "2024-01-15T14:30:00Z"
  },
  {
    id: "comment-2",
    articleId: "article-1",
    user: {
      id: "user-3",
      name: "Aisha Okafor",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=aisha"
    },
    body: "The regulatory compliance section really resonates with our experience in Nigeria. The landscape is constantly changing, and it's crucial to stay updated.",
    createdAt: "2024-01-15T16:45:00Z"
  },
  {
    id: "comment-3",
    articleId: "article-1",
    user: {
      id: "user-4",
      name: "Prof. Kwame Asante",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=kwame"
    },
    body: "Excellent insights! I'd love to see more discussion on the role of universities in fostering AI innovation across Africa. We're seeing some promising initiatives at our institution.",
    createdAt: "2024-01-16T09:15:00Z"
  }
];

export function CommentList({ articleId, comments = mockComments }: CommentListProps) {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you'd add the comment to the list
      console.log('New comment:', newComment);
      setNewComment("");
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <form onSubmit={handleSubmitComment} className="space-y-4">
        <div>
          <Textarea
            placeholder="Share your thoughts on this article..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
            disabled={isSubmitting}
          />
        </div>
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={!newComment.trim() || isSubmitting}
            className="flex items-center"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={comment.user.avatarUrl} alt={comment.user.name} />
              <AvatarFallback>
                {comment.user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{comment.user.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap">{comment.body}</p>
              </div>
              
              <div className="flex items-center space-x-4 text-sm">
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Reply
                </Button>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  Like
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Comments */}
      {comments.length >= 3 && (
        <div className="text-center">
          <Button variant="outline">
            Load More Comments
          </Button>
        </div>
      )}
    </div>
  );
}
