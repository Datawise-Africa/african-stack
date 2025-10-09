"use client";

import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MessageCircle, Share2, Clock, Calendar } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { CommentList } from "@/components/comment-list";
import { ReactionButton } from "@/components/reaction-button";
import { BookmarkButton } from "@/components/bookmark-button";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { useArticle } from "@/features/articles/hooks";
import { useArticleComments } from "@/features/interactions/hooks";
import { mockArticles } from "@/features/articles/mock-data";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Get related articles (excluding current article)
const getRelatedArticles = (currentSlug: string) => {
  return mockArticles
    .filter(
      (article) =>
        article.slug !== currentSlug && article.status === "published"
    )
    .slice(0, 2);
};

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default function ArticlePage({ params }: PageProps) {
  const resolvedParams = React.use(params);
  const { data: article, isLoading, error } = useArticle(resolvedParams.slug);
  useArticleComments(article?.id || "");

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
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>
                {article.author.first_name.charAt(0).toUpperCase() ||
                  "A" + article.author.last_name.charAt(0).toUpperCase() ||
                  "S"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{article.author.first_name}</div>
              <div className="text-sm text-muted-foreground">
                @{article.author.handle}
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground ml-auto">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {article.publishedAt
                  ? new Date(article.publishedAt).toLocaleDateString()
                  : "Draft"}
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
              <BookmarkButton articleId={article.id} isBookmarked={false} />
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <RichTextRenderer
            html={article.content}
            emptyFallback={
              <p className="text-muted-foreground">
                This article does not have any content to display yet.
              </p>
            }
          />
        </div>

        {/* Tags */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Button key={tag} variant="outline" size="sm" className="text-sm">
                #{tag}
              </Button>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">
            Comments ({article.commentsCount})
          </h3>
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
