"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Edit, 
  Eye, 
  Heart, 
  MessageCircle, 
  Calendar,
  MoreHorizontal,
  Trash2,
  ExternalLink,
  TrendingUp,
  BarChart3,
  Users,
  Clock,
  Search,
  Filter,
  Download,
  Upload,
  Settings,
  BookOpen,
  Target,
  Zap,
  Bookmark,
  History,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUserArticles } from "@/features/user/hooks";

export default function DashboardCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");

  const { data: articlesData } = useUserArticles();
  const publishedArticles = articlesData?.published || [];

  // Generate calendar days
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Get articles for a specific date
  const getArticlesForDate = (day: number) => {
    const date = new Date(year, month, day);
    return publishedArticles.filter(article => {
      const articleDate = new Date(article.publishedAt!);
      return articleDate.toDateString() === date.toDateString();
    });
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Content Calendar</h1>
                  <p className="text-muted-foreground">
                    Plan and track your content publishing schedule
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        {view === "month" ? "Month" : view === "week" ? "Week" : "Day"}
                        <MoreHorizontal className="w-4 h-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setView("month")}>
                        Month View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setView("week")}>
                        Week View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setView("day")}>
                        Day View
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button asChild>
                    <Link href="/me/articles/new">
                      <Plus className="w-4 h-4 mr-2" />
                      Schedule Article
                    </Link>
                  </Button>
                </div>
              </div>

        {/* Calendar Navigation */}
        <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateMonth("prev")}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <h2 className="text-xl font-semibold">
                        {monthNames[month]} {year}
                      </h2>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigateMonth("next")}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentDate(new Date())}
                    >
                      Today
                    </Button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {/* Day headers */}
                    {dayNames.map(day => (
                      <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                        {day}
                      </div>
                    ))}
                    
                    {/* Calendar days */}
                    {calendarDays.map((day, index) => {
                      if (day === null) {
                        return <div key={index} className="p-2" />;
                      }
                      
                      const articlesForDay = getArticlesForDate(day);
                      const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
                      
                      return (
                        <div
                          key={day}
                          className={`p-2 min-h-[100px] border rounded-lg ${
                            isToday ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className={`text-sm font-medium ${isToday ? 'text-primary' : ''}`}>
                              {day}
                            </span>
                            {articlesForDay.length > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                {articlesForDay.length}
                              </Badge>
                            )}
                          </div>
                          
                          <div className="space-y-1">
                            {articlesForDay.slice(0, 2).map(article => (
                              <div
                                key={article.id}
                                className="text-xs p-1 bg-primary/10 text-primary rounded truncate"
                                title={article.title}
                              >
                                {article.title}
                              </div>
                            ))}
                            {articlesForDay.length > 2 && (
                              <div className="text-xs text-muted-foreground">
                                +{articlesForDay.length - 2} more
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

        {/* Upcoming Articles */}
        <Card>
                <CardHeader>
                  <CardTitle>Recent & Upcoming Articles</CardTitle>
                  <CardDescription>
                    Your latest published articles and scheduled content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {publishedArticles
                      .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime())
                      .slice(0, 5)
                      .map(article => (
                        <div key={article.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-1">
                              <Link 
                                href={`/articles/${article.slug}`}
                                className="hover:text-primary transition-colors"
                              >
                                {article.title}
                              </Link>
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Published on {new Date(article.publishedAt!).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {article.views || 0}
                            </div>
                            <div className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              {article.reactionsCount}
                            </div>
                            <Badge variant="outline">{article.category.name}</Badge>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Empty State */}
                  {publishedArticles.length === 0 && (
                    <div className="text-center py-12">
                      <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No published articles yet</h3>
                      <p className="text-muted-foreground mb-4">
                        Start creating content to see it in your calendar
                      </p>
                      <Button asChild>
                        <Link href="/me/articles/new">
                          <Plus className="w-4 h-4 mr-2" />
                          Create Article
                        </Link>
                      </Button>
                    </div>
                  )}
        </CardContent>
        </Card>
      </div>
    </div>
  );
}
