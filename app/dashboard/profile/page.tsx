import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  BookOpen, 
  Bookmark, 
  History, 
  Edit, 
  Settings, 
  Calendar,
  TrendingUp,
  MessageCircle,
  Heart
} from "lucide-react";
import Link from "next/link";

// Mock user data
const user = {
  id: "user-1",
  name: "Dr. Sarah Johnson",
  handle: "sarahj",
  email: "sarah@example.com",
  bio: "AI researcher and tech entrepreneur passionate about building solutions for African challenges. PhD in Computer Science from University of Cape Town.",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  location: "Cape Town, South Africa",
  website: "https://sarahjohnson.dev",
  joinedAt: "2023-06-15",
  stats: {
    articlesPublished: 12,
    totalViews: 15420,
    totalReactions: 342,
    totalComments: 89,
    followers: 1250,
    following: 180
  },
  recentArticles: [
    {
      id: "article-1",
      title: "Building AI Solutions in Africa: Challenges and Opportunities",
      slug: "building-ai-solutions-africa",
      publishedAt: "2024-01-15",
      readTime: 8,
      reactionsCount: 42,
      commentsCount: 8,
      views: 1200
    },
    {
      id: "article-2",
      title: "Natural Language Processing for African Languages",
      slug: "nlp-african-languages",
      publishedAt: "2024-01-10",
      readTime: 6,
      reactionsCount: 28,
      commentsCount: 5,
      views: 890
    }
  ],
  recentBookmarks: [
    {
      id: "bookmark-1",
      article: {
        title: "Machine Learning in Healthcare: African Perspectives",
        slug: "ml-healthcare-africa",
        author: "Dr. Michael Chen"
      },
      bookmarkedAt: "2024-01-14"
    },
    {
      id: "bookmark-2",
      article: {
        title: "Data Science Startups: The African Advantage",
        slug: "data-science-startups-africa",
        author: "Aisha Okafor"
      },
      bookmarkedAt: "2024-01-12"
    }
  ]
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-background shadow-lg"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="text-lg text-muted-foreground">@{user.handle}</p>
              <p className="text-muted-foreground mt-2 max-w-2xl">{user.bio}</p>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Joined {new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
                {user.location && (
                  <div className="flex items-center">
                    <span>{user.location}</span>
                  </div>
                )}
                {user.website && (
                  <a 
                    href={user.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {user.website}
                  </a>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/settings">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
              </Button>
              <Button size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{user.stats.articlesPublished}</div>
              <div className="text-sm text-muted-foreground">Articles</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{user.stats.totalViews.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Views</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{user.stats.totalReactions}</div>
              <div className="text-sm text-muted-foreground">Reactions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{user.stats.followers}</div>
              <div className="text-sm text-muted-foreground">Followers</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Articles */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Recent Articles
                  </CardTitle>
                  <CardDescription>
                    Your latest published articles
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/articles">
                    View All
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.recentArticles.map((article) => (
                    <div key={article.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <Link 
                          href={`/articles/${article.slug}`}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {article.title}
                        </Link>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
                          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                          <span>{article.readTime} min read</span>
                          <div className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {article.reactionsCount}
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {article.commentsCount}
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {article.views} views
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild className="w-full justify-start">
                  <Link href="/dashboard/articles/new">
                    <Edit className="w-4 h-4 mr-2" />
                    Write New Article
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/dashboard/bookmarks">
                    <Bookmark className="w-4 h-4 mr-2" />
                    View Bookmarks
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href="/dashboard/history">
                    <History className="w-4 h-4 mr-2" />
                    Read History
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Bookmarks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bookmark className="w-5 h-5 mr-2" />
                  Recent Bookmarks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {user.recentBookmarks.map((bookmark) => (
                    <div key={bookmark.id} className="text-sm">
                      <Link 
                        href={`/articles/${bookmark.article.slug}`}
                        className="font-medium hover:text-primary transition-colors line-clamp-2"
                      >
                        {bookmark.article.title}
                      </Link>
                      <div className="text-muted-foreground mt-1">
                        by {bookmark.article.author}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
