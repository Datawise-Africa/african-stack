"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";

interface BookmarkButtonProps {
  articleId: string;
  isBookmarked: boolean;
  onBookmark?: (articleId: string, isBookmarked: boolean) => void;
}

export function BookmarkButton({ 
  articleId, 
  isBookmarked: initialIsBookmarked,
  onBookmark 
}: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookmark = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // Optimistic update
    const newIsBookmarked = !isBookmarked;
    setIsBookmarked(newIsBookmarked);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Call the onBookmark callback if provided
      if (onBookmark) {
        onBookmark(articleId, newIsBookmarked);
      }
    } catch (error) {
      // Revert on error
      setIsBookmarked(initialIsBookmarked);
      console.error('Failed to update bookmark:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBookmark}
      disabled={isLoading}
      className={`${
        isBookmarked 
          ? 'text-yellow-500 hover:text-yellow-600' 
          : 'text-muted-foreground hover:text-yellow-500'
      }`}
    >
      <Bookmark 
        className={`w-4 h-4 ${
          isBookmarked ? 'fill-current' : ''
        }`} 
      />
    </Button>
  );
}
