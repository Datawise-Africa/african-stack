"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Bookmark, Clock } from "lucide-react";
import { Article } from "@/lib/types";

interface ArticleCardProps {
  article: Article;
  showAuthor?: boolean;
  showCategory?: boolean;
  showActions?: boolean;
}

export function ArticleCard({ 
  article, 
  showAuthor = true, 
  showCategory = true,
  showActions = true 
}: ArticleCardProps) {
  return (
    <article className="group bg-background border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Thumbnail */}
      {article.thumbnailUrl && (
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={article.thumbnailUrl}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {showCategory && (
            <div className="absolute top-4 left-4">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full">
                {article.category.name}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        {/* Author */}
        {showAuthor && (
          <div className="flex items-center space-x-2 mb-3">
            {article.author.avatarUrl && (
              <img
                src={article.author.avatarUrl}
                alt={article.author.name}
                className="w-6 h-6 rounded-full"
              />
            )}
            <span className="text-sm text-muted-foreground">
              {article.author.name}
            </span>
            {article.publishedAt && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          <Link href={`/articles/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        {/* Tags */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
              >
                #{tag}
              </span>
            ))}
            {article.tags.length > 3 && (
              <span className="inline-block px-2 py-1 text-xs bg-muted text-muted-foreground rounded">
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {article.readTimeMins} min read
            </div>
            {showActions && (
              <>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  {article.reactionsCount}
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {article.commentsCount}
                </div>
              </>
            )}
          </div>
          
          {showActions && (
            <Button variant="ghost" size="sm">
              <Bookmark className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
