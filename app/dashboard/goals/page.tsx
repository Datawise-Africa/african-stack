"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Edit, 
  Calendar,
  MoreHorizontal,
  Trash2,
  Download,
  Target,
  CheckCircle,
  Circle,
  AlertCircle
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// Removed unused useCurrentUser import

export default function DashboardGoalsPage() {
  const [newGoal, setNewGoal] = useState("");
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  // Removed unused userProfile
  // Removed unused articlesData

  // Removed unused publishedArticles

  // Mock goals data
  const [goals, setGoals] = useState([
    {
      id: "1",
      title: "Publish 2 articles per month",
      description: "Maintain consistent content creation schedule",
      type: "content",
      target: 24,
      current: 12,
      unit: "articles",
      deadline: "2024-12-31",
      status: "on-track",
      priority: "high"
    },
    {
      id: "2",
      title: "Reach 1000 followers",
      description: "Grow audience engagement and community",
      type: "audience",
      target: 1000,
      current: 750,
      unit: "followers",
      deadline: "2024-06-30",
      status: "on-track",
      priority: "high"
    },
    {
      id: "3",
      title: "Get 10k total views",
      description: "Increase content visibility and reach",
      type: "engagement",
      target: 10000,
      current: 6500,
      unit: "views",
      deadline: "2024-08-31",
      status: "on-track",
      priority: "medium"
    },
    {
      id: "4",
      title: "Write 1 technical tutorial",
      description: "Create in-depth technical content",
      type: "content",
      target: 1,
      current: 0,
      unit: "tutorials",
      deadline: "2024-04-30",
      status: "behind",
      priority: "low"
    }
  ]);

  const addGoal = () => {
    if (newGoal.trim()) {
      const goal = {
        id: Date.now().toString(),
        title: newGoal,
        description: "",
        type: "content",
        target: 1,
        current: 0,
        unit: "items",
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: "on-track",
        priority: "medium"
      };
      setGoals([...goals, goal]);
      setNewGoal("");
    }
  };

  const updateGoalProgress = (goalId: string, newCurrent: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, current: Math.min(newCurrent, goal.target) }
        : goal
    ));
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track": return "text-green-500";
      case "behind": return "text-red-500";
      case "completed": return "text-blue-500";
      default: return "text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "behind": return <AlertCircle className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Goals & Objectives</h1>
                  <p className="text-muted-foreground">
                    Set and track your content creation goals
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button onClick={() => setSelectedGoal("new")}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Goal
                  </Button>
                </div>
              </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{goals.length}</div>
                    <div className="text-sm text-muted-foreground">Total Goals</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {goals.filter(g => g.status === "completed").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {goals.filter(g => g.status === "on-track").length}
                    </div>
                    <div className="text-sm text-muted-foreground">On Track</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {goals.filter(g => g.status === "behind").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Behind</div>
                  </CardContent>
                </Card>
              </div>

        {/* Add New Goal */}
        {selectedGoal === "new" && (
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Add New Goal</CardTitle>
                    <CardDescription>
                      Create a new content or engagement goal
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Goal Title</label>
                        <Input
                          placeholder="e.g., Publish 2 articles per month"
                          value={newGoal}
                          onChange={(e) => setNewGoal(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button onClick={addGoal} disabled={!newGoal.trim()}>
                          Add Goal
                        </Button>
                        <Button variant="outline" onClick={() => setSelectedGoal(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

        {/* Goals List */}
        <div className="space-y-6">
                {goals.map((goal) => (
                  <Card key={goal.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold">{goal.title}</h3>
                            <Badge className={getPriorityColor(goal.priority)}>
                              {goal.priority}
                            </Badge>
                            <div className={`flex items-center ${getStatusColor(goal.status)}`}>
                              {getStatusIcon(goal.status)}
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-3">{goal.description}</p>
                          
                          {/* Progress Bar */}
                          <div className="mb-4">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">
                                {goal.current} / {goal.target} {goal.unit}
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${getProgressPercentage(goal.current, goal.target)}%` }}
                              />
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {getProgressPercentage(goal.current, goal.target).toFixed(1)}% complete
                            </div>
                          </div>

                          {/* Goal Details */}
                          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Due {new Date(goal.deadline).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Target className="w-4 h-4 mr-1" />
                              {goal.type}
                            </div>
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => updateGoalProgress(goal.id, goal.current + 1)}>
                              <Plus className="w-4 h-4 mr-2" />
                              Update Progress
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Goal
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Goal
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

        {/* Empty State */}
        {goals.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No goals set yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start by creating your first content goal to track your progress
                    </p>
                    <Button onClick={() => setSelectedGoal("new")}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create First Goal
                    </Button>
                  </CardContent>
                </Card>
        )}
      </div>
    </div>
  );
}
