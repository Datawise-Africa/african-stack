"use client";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Filter, TrendingUp, Clock, ChevronDown } from "lucide-react";
import { ArticleCard } from "@/components/article-card";
import { ArticleListSkeleton } from "@/components/article-list-skeleton";
import { useArticles } from "@/features/articles/hooks";
import { useCategories } from "@/features/categories/hooks";
import { ArticleFilters } from "@/lib/types";

function ArticlesContent() {
  const [filters, setFilters] = useState<ArticleFilters>({
    sort: 'latest',
    page: 1,
    limit: 9,
  });
  
  const { data: articlesData, isLoading, error } = useArticles(filters);
  const { data: categories } = useCategories();

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, query, page: 1 }));
  };

  const handleSort = (sort: ArticleFilters['sort']) => {
    setFilters(prev => ({ ...prev, sort, page: 1 }));
  };

  const handleCategory = (category: string) => {
    setFilters(prev => ({ 
      ...prev, 
      category: category === 'all' ? undefined : category,
      page: 1 
    }));
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Failed to load articles. Please try again.</p>
      </div>
    );
  }

  return (
    <>
      {/* Filters and Search */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles, authors, or topics..."
              className="pl-10"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <TrendingUp className="mr-2 h-4 w-4" />
                Sort by {filters.sort === 'latest' ? 'Latest' : filters.sort === 'trending' ? 'Trending' : 'Popular'}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSort('trending')}>
                <TrendingUp className="mr-2 h-4 w-4" />
                Trending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('latest')}>
                <Clock className="mr-2 h-4 w-4" />
                Latest
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSort('popular')}>
                Most Popular
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Filter Button */}
          <Button variant="outline" className="w-full md:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Category Tags */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={!filters.category ? "default" : "outline"}
            size="sm"
            className="text-sm"
            onClick={() => handleCategory('all')}
          >
            All
          </Button>
          {categories?.map((category) => (
            <Button
              key={category.id}
              variant={filters.category === category.slug ? "default" : "outline"}
              size="sm"
              className="text-sm"
              onClick={() => handleCategory(category.slug)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {isLoading ? (
        <ArticleListSkeleton />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articlesData?.articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}

      {/* Load More */}
      {articlesData && articlesData.pagination.totalPages > articlesData.pagination.page && (
        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => setFilters(prev => ({ ...prev, page: prev.page! + 1 }))}
          >
            Load More Articles
          </Button>
        </div>
      )}
    </>
  );
}

export default function ArticlesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h1>
        <p className="text-xl text-muted-foreground">
          Discover insights, tutorials, and stories from Africa's tech community
        </p>
      </div>

      <Suspense fallback={<ArticleListSkeleton />}>
        <ArticlesContent />
      </Suspense>
    </div>
  );
}
