import React, { useState, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router";
import MainLayout from "~/components/_layouts/main";
import { useArticlesQuery } from "~/queries/articles/query";
import { useCategoriesQuery } from "~/queries/categories/query";

export default function Blog() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || null;
  const page = parseInt(searchParams.get("page") || "1", 10) || 1;

  // Get articles and categories data
  const { articlesQuery } = useArticlesQuery();
  const { categoriesQuery } = useCategoriesQuery();
  
  const articles = articlesQuery.data || [];
  const categories = useMemo(() => 
    categoriesQuery.data?.map(cat => cat.name) || [], 
    [categoriesQuery.data]
  );
  
  // Filter articles by category if needed
  const filteredArticles = useMemo(() => {
    if (!categoryParam) return articles;
    return articles.filter(article => 
      article.category.toLowerCase() === categoryParam.toLowerCase()
    );
  }, [articles, categoryParam]);
  
  const [pagination, setPagination] = useState({
    currentPage: page,
    postsPerPage: 10,
  });
  const { currentPage, postsPerPage } = pagination;
  
  // Check loading states
  const isLoading = articlesQuery.isLoading || categoriesQuery.isLoading;
  
  // Calculate pagination values
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const paginatedPosts = filteredArticles.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredArticles.length / postsPerPage);
  
  // Create pagination URLs
  const createPageURL = (pageNum: number) => {
    const url = new URL(location.pathname, window.location.origin);
    url.searchParams.set("page", pageNum.toString());
    if (categoryParam) {
      url.searchParams.set("category", categoryParam);
    }
    return url.pathname + url.search;
  };
  
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="font-serif font-bold text-4xl md:text-5xl">
            Blog Articles
          </h1>

          {!isLoading && (
            <div className="flex flex-wrap gap-2">
              <a
                href="/blog"
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !categoryParam
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                All
              </a>
              {categories.map((cat) => (
                <a
                  key={cat}
                  href={`/blog?category=${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    categoryParam === cat.toLowerCase().replace(/\s+/g, "-")
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {cat}
                </a>
              ))}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
              <p className="mt-4 text-lg">Loading articles...</p>
            </div>
          </div>
        ) : paginatedPosts.length === 0 ? (
          <div className="flex justify-center items-center min-h-[400px] text-center">
            <div>
              <h3 className="text-2xl font-semibold mb-2">No articles found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {categoryParam 
                  ? `No articles found in the "${categoryParam}" category.` 
                  : "No articles found. Check back later for new content."}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((article) => (
            <div key={article.id} className="group hover:shadow-lg transition-all duration-300 border border-border hover:border-blue-200 dark:hover:border-blue-800 hover:-translate-y-0.5 rounded-lg overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                    {article.category}
                  </span>
                  {article.featured && (
                    <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 px-2 py-1 rounded-full text-xs font-medium">
                      Featured
                    </span>
                  )}
                </div>
                <h3 className="font-serif font-semibold text-xl leading-tight group-hover:text-blue-600 transition-colors mb-3">
                  <a href={`/blog/${article.id}`}>{article.title}</a>
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img
                        src={article.author.avatar}
                        alt={article.author.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">
                      {article.author.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    {new Date(article.publishDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {currentPage > 1 && (
              <a
                href={createPageURL(currentPage - 1)}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Previous
              </a>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <a
                  key={pageNum}
                  href={createPageURL(pageNum)}
                  className={`px-3 py-1.5 rounded-md transition-colors ${
                    currentPage === pageNum
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100"
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                  }`}
                >
                  {pageNum}
                </a>
              )
            )}

            {currentPage < totalPages && (
              <a
                href={createPageURL(currentPage + 1)}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Next
              </a>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
