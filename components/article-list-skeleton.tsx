import { Card, CardContent } from "@/components/ui/card";

export function ArticleListSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="aspect-video bg-muted animate-pulse" />
          <CardContent className="p-6">
            <div className="space-y-3">
              {/* Author */}
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-muted rounded-full animate-pulse" />
                <div className="h-4 bg-muted rounded animate-pulse w-24" />
                <div className="h-4 bg-muted rounded animate-pulse w-16" />
              </div>
              
              {/* Title */}
              <div className="space-y-2">
                <div className="h-6 bg-muted rounded animate-pulse w-full" />
                <div className="h-6 bg-muted rounded animate-pulse w-3/4" />
              </div>
              
              {/* Excerpt */}
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded animate-pulse w-full" />
                <div className="h-4 bg-muted rounded animate-pulse w-full" />
                <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
              </div>
              
              {/* Tags */}
              <div className="flex space-x-2">
                <div className="h-6 bg-muted rounded animate-pulse w-16" />
                <div className="h-6 bg-muted rounded animate-pulse w-20" />
                <div className="h-6 bg-muted rounded animate-pulse w-14" />
              </div>
              
              {/* Meta */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <div className="h-4 bg-muted rounded animate-pulse w-16" />
                  <div className="h-4 bg-muted rounded animate-pulse w-12" />
                  <div className="h-4 bg-muted rounded animate-pulse w-8" />
                </div>
                <div className="h-8 w-8 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
