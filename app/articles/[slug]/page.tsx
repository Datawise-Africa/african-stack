"use client";

import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MessageCircle, Share2, Clock, Calendar } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { CommentList } from "@/components/comment-list";
import { ReactionButton } from "@/components/reaction-button";
import { BookmarkButton } from "@/components/bookmark-button";
import { useArticle, useArticleComments } from "@/features/articles/hooks";
import { mockArticles } from "@/features/articles/mock-data";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

// Get related articles (excluding current article)
const getRelatedArticles = (currentSlug: string) => {
  return mockArticles
    .filter(article => article.slug !== currentSlug && article.status === 'published')
    .slice(0, 2);
};

export default function ArticlePage({ params }: ArticlePageProps) {
  const { data: article, isLoading, error } = useArticle(params.slug);
  useArticleComments(article?.id || '');
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-6 bg-muted rounded w-full mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article.slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Article Header */}
        <div className="mb-8">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
              {article.category.name}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-6">
            {article.excerpt}
          </p>

          {/* Author Info */}
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={article.author.avatarUrl}
              alt={article.author.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="font-semibold">{article.author.name}</div>
              <div className="text-sm text-muted-foreground">@{article.author.handle}</div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground ml-auto">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Draft'}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {article.readTimeMins} min read
              </div>
            </div>
          </div>

          {/* Article Actions */}
          <div className="flex items-center justify-between py-4 border-y">
            <div className="flex items-center space-x-4">
              <ReactionButton 
                articleId={article.id}
                initialCount={article.reactionsCount}
                isReacted={false}
              />
              <Button variant="ghost" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                {article.commentsCount} comments
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <BookmarkButton 
                articleId={article.id}
                isBookmarked={false}
              />
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {article.contentJson && typeof article.contentJson === 'object' && 'content' in article.contentJson && Array.isArray(article.contentJson.content) ? (
            <div className="space-y-6">
              {article.contentJson.content.map((node: Record<string, unknown>, index: number) => {
                if (node.type === 'heading') {
                  const level = (node.attrs as Record<string, unknown>)?.level || 2;
                  return (
                    <div key={index} className={`font-bold ${level === 1 ? 'text-3xl' : level === 2 ? 'text-2xl' : 'text-xl'}`}>
                      {String((node.content as Record<string, unknown>[])?.[0]?.text || '')}
                    </div>
                  );
                }
                if (node.type === 'paragraph') {
                  return (
                    <p key={index}>
                      {String((node.content as Record<string, unknown>[])?.[0]?.text || '')}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          ) : (
            <div className="space-y-6">
              <h2>Introduction</h2>
              <p>
                Africa is experiencing a digital transformation that's reshaping industries and creating new opportunities for innovation. In this article, we explore how AI is being leveraged across the continent to solve unique challenges and drive economic growth.
              </p>
              
              <h2>The Current Landscape</h2>
              <p>
                From fintech solutions in Nigeria to agricultural AI in Kenya, African developers are creating solutions that are both globally competitive and locally relevant. The key is understanding the unique challenges and opportunities that exist in African markets.
              </p>
              
              <h2>Key Success Factors</h2>
              <p>
                <strong>1. Local Context Understanding:</strong> Understanding the specific needs and challenges of African markets is crucial for building successful AI solutions.
              </p>
              <p>
                <strong>2. Scalable Technology Architecture:</strong> Building solutions that can scale across different African countries with varying infrastructure levels.
              </p>
              <p>
                <strong>3. Community Engagement:</strong> Involving local communities in the development process ensures solutions are culturally appropriate and widely adopted.
              </p>
              <p>
                <strong>4. Regulatory Compliance:</strong> Navigating the complex regulatory landscape across different African countries.
              </p>
              <p>
                <strong>5. Sustainable Business Models:</strong> Creating business models that are financially viable while providing value to local communities.
              </p>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Button
                key={tag}
                variant="outline"
                size="sm"
                className="text-sm"
              >
                #{tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">Comments ({article.commentsCount})</h3>
          <CommentList articleId={article.id} />
        </div>

        {/* Related Articles */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {relatedArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
