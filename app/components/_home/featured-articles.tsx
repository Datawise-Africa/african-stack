import React from 'react'
import { useArticlesQuery } from '~/queries/articles/query'

export default function FeaturedArticles() {
    const { featuredArticlesQuery ,recentArticlesQuery} = useArticlesQuery();
  return (
   <section className="py-16 lg:py-24">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Featured Articles */}
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground">Featured Articles</h2>
        <a
          href="/blog"
          className="text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
        >
          View all
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </a>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {featuredArticlesQuery.data!.map((article) => (
          <div className="group hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50 hover:-translate-y-1 rounded-lg overflow-hidden bg-card">
            <div className="aspect-video overflow-hidden">
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium border border-primary/30">
                  {article.category}
                </span>
              </div>
              <h3 className="font-serif font-semibold text-xl leading-tight group-hover:text-primary transition-colors mb-3">
                <a href={`/blog/${article.slug}`}>{article.title}</a>
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{article.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {article.publishDate}
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {article.readTime}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Recent Articles */}
    <div>
      <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-8">Recent Articles</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentArticlesQuery.data!.map((article) => (
          <div className="group hover:shadow-lg transition-all duration-300 border border-border hover:border-primary/50 hover:-translate-y-0.5 rounded-lg overflow-hidden bg-card">
            <div className="aspect-video overflow-hidden">
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs font-medium border border-primary/30 w-fit mb-2 inline-block">
                {article.category}
              </span>
              <h3 className="font-serif font-semibold text-lg leading-tight group-hover:text-primary transition-colors mb-2">
                <a href={`/blog/${article.slug}`}>{article.title}</a>
              </h3>
              <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{article.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  {article.publishDate}
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {article.readTime}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
  )
}
