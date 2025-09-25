"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Calendar,
  MoreHorizontal,
  Users,
  Search,
  Filter,
  Download,
  ArrowUp,
  UserPlus,
  Mail,
  Globe,
  Minus
} from "lucide-react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/features/user/hooks";

export default function DashboardAudiencePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState<"all" | "followers" | "following">("all");

  const { data: userProfile, isLoading } = useCurrentUser();

  // Mock data for followers and following
  const mockFollowers = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      handle: "@sarahj",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      bio: "AI researcher and tech entrepreneur",
      location: "Cape Town, South Africa",
      joinedAt: "2023-06-15T10:00:00Z",
      isFollowing: true,
      mutualConnections: 12
    },
    {
      id: "2",
      name: "Michael Chen",
      handle: "@michaelc",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      bio: "Software engineer passionate about open source",
      location: "Lagos, Nigeria",
      joinedAt: "2023-07-20T14:30:00Z",
      isFollowing: false,
      mutualConnections: 8
    },
    {
      id: "3",
      name: "Aisha Okafor",
      handle: "@aishao",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=aisha",
      bio: "Product designer and UX researcher",
      location: "Nairobi, Kenya",
      joinedAt: "2023-08-10T09:15:00Z",
      isFollowing: true,
      mutualConnections: 15
    }
  ];

  const mockFollowing = [
    {
      id: "4",
      name: "Prof. David Kimani",
      handle: "@davidk",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      bio: "Professor of Computer Science at University of Nairobi",
      location: "Nairobi, Kenya",
      joinedAt: "2023-05-01T08:00:00Z",
      isFollowing: true,
      mutualConnections: 25
    },
    {
      id: "5",
      name: "Fatima Al-Zahra",
      handle: "@fatimaz",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=fatima",
      bio: "Tech journalist and content creator",
      location: "Cairo, Egypt",
      joinedAt: "2023-04-15T11:20:00Z",
      isFollowing: true,
      mutualConnections: 18
    }
  ];

  const allUsers = [...mockFollowers, ...mockFollowing];
  
  const filteredUsers = allUsers.filter(user => {
    if (filterBy === "followers" && !mockFollowers.find(f => f.id === user.id)) return false;
    if (filterBy === "following" && !mockFollowing.find(f => f.id === user.id)) return false;
    if (searchQuery && !user.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !user.handle.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold">Audience</h1>
                  <p className="text-muted-foreground">
                    Manage your followers and build your community
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button asChild>
                    <Link href="/articles">
                      <Plus className="w-4 h-4 mr-2" />
                      Invite Followers
                    </Link>
                  </Button>
                </div>
              </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{userProfile?.stats.followers || 0}</div>
                    <div className="text-sm text-muted-foreground">Total Followers</div>
                    <div className="flex items-center justify-center text-xs text-green-500 mt-1">
                      <ArrowUp className="w-3 h-3 mr-1" />
                      +12 this week
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{userProfile?.stats.following || 0}</div>
                    <div className="text-sm text-muted-foreground">Following</div>
                    <div className="flex items-center justify-center text-xs text-muted-foreground mt-1">
                      <Minus className="w-3 h-3 mr-1" />
                      No change
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {userProfile?.stats.followers ? Math.round((userProfile.stats.followers / 1000) * 100) : 0}%
                    </div>
                    <div className="text-sm text-muted-foreground">Engagement Rate</div>
                    <div className="flex items-center justify-center text-xs text-green-500 mt-1">
                      <ArrowUp className="w-3 h-3 mr-1" />
                      +2.1% this month
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">4.2k</div>
                    <div className="text-sm text-muted-foreground">Avg. Monthly Reach</div>
                    <div className="flex items-center justify-center text-xs text-green-500 mt-1">
                      <ArrowUp className="w-3 h-3 mr-1" />
                      +8.5% this month
                    </div>
                  </CardContent>
                </Card>
              </div>

        {/* Filters and Search */}
        <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search followers..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          <Filter className="w-4 h-4 mr-2" />
                          Filter: {filterBy === "all" ? "All" : filterBy === "followers" ? "Followers" : "Following"}
                          <MoreHorizontal className="w-4 h-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setFilterBy("all")}>
                          All Users
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterBy("followers")}>
                          Followers Only
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilterBy("following")}>
                          Following Only
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>

        {/* Audience List */}
        <Card>
                <CardHeader>
                  <CardTitle>Your Audience</CardTitle>
                  <CardDescription>
                    Connect with your followers and discover new people to follow
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredUsers.map((user) => (
                      <div key={user.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <h3 className="font-semibold text-lg">{user.name}</h3>
                              <p className="text-sm text-muted-foreground">{user.handle}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {user.isFollowing && (
                                <Badge variant="secondary" className="text-xs">
                                  Following
                                </Badge>
                              )}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Follow
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Mail className="w-4 h-4 mr-2" />
                                    Send Message
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Globe className="w-4 h-4 mr-2" />
                                    View Profile
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {user.bio}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <div className="flex items-center">
                              <Globe className="w-3 h-3 mr-1" />
                              {user.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              Joined {new Date(user.joinedAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-3 h-3 mr-1" />
                              {user.mutualConnections} mutual connections
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Empty State */}
                  {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                      <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No users found</h3>
                      <p className="text-muted-foreground mb-4">
                        {searchQuery 
                          ? "No users match your search criteria"
                          : "Start building your audience by creating great content"
                        }
                      </p>
                      <Button asChild>
                        <Link href="/articles">
                          Browse Articles
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
