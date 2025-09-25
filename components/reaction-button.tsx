"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface ReactionButtonProps {
  articleId: string;
  initialCount: number;
  isReacted: boolean;
  onReaction?: (articleId: string, isReacted: boolean) => void;
}

export function ReactionButton({ 
  articleId, 
  initialCount, 
  isReacted: initialIsReacted,
  onReaction 
}: ReactionButtonProps) {
  const [isReacted, setIsReacted] = useState(initialIsReacted);
  const [count, setCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);

  const handleReaction = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // Optimistic update
    const newIsReacted = !isReacted;
    const newCount = newIsReacted ? count + 1 : count - 1;
    
    setIsReacted(newIsReacted);
    setCount(newCount);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Call the onReaction callback if provided
      if (onReaction) {
        onReaction(articleId, newIsReacted);
      }
    } catch (error) {
      // Revert on error
      setIsReacted(initialIsReacted);
      setCount(initialCount);
      console.error('Failed to update reaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleReaction}
      disabled={isLoading}
      className={`flex items-center space-x-1 ${
        isReacted 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-muted-foreground hover:text-red-500'
      }`}
    >
      <Heart 
        className={`w-4 h-4 ${
          isReacted ? 'fill-current' : ''
        }`} 
      />
      <span>{count}</span>
    </Button>
  );
}
