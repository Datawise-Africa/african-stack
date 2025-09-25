"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  CheckCircle,
  XCircle,
  FileText,
  Calendar,
  User,
  MessageSquare,
  RefreshCw,
  ArrowLeft,
  ExternalLink,
  Copy,
  Info,
  Eye,
  Edit
} from "lucide-react";
import Link from "next/link";

// Mock data for user's creator requests
const mockUserRequests = [
  {
    id: "1",
    submittedAt: "2024-01-20T10:30:00Z",
    status: "pending",
    message: "I am passionate about technology and want to share my knowledge about AI and machine learning with the community. I have 5 years of experience in software development and have written technical articles on my personal blog.",
    portfolio: "https://myblog.com",
    socialMedia: "@techwriter",
    expectedContent: "AI tutorials, machine learning guides, and software development insights",
    adminNotes: null,
    reviewedAt: null,
    reviewedBy: null
  },
  {
    id: "2", 
    submittedAt: "2024-01-15T14:22:00Z",
    status: "approved",
    message: "I'm a healthcare professional with expertise in medical technology and want to create content about the intersection of healthcare and AI.",
    portfolio: "https://healthtechblog.com",
    socialMedia: "@healthtech",
    expectedContent: "Healthcare AI applications, medical technology reviews, and patient care innovations",
    adminNotes: "Approved - Strong background in healthcare and clear content focus.",
    reviewedAt: "2024-01-16T09:15:00Z",
    reviewedBy: "Admin User"
  },
  {
    id: "3",
    submittedAt: "2024-01-10T08:45:00Z", 
    status: "rejected",
    message: "I want to become a creator to share my thoughts on various topics.",
    portfolio: "",
    socialMedia: "",
    expectedContent: "General thoughts and opinions",
    adminNotes: "Rejected - Application lacks specific expertise or clear content focus. Please provide more details about your background and intended content.",
    reviewedAt: "2024-01-11T16:30:00Z",
    reviewedBy: "Admin User"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "pending":
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending Review</Badge>;
    case "approved":
      return <Badge variant="default" className="bg-green-100 text-green-800">Approved</Badge>;
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="h-5 w-5 text-yellow-600" />;
    case "approved":
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case "rejected":
      return <XCircle className="h-5 w-5 text-red-600" />;
    default:
      return <FileText className="h-5 w-5 text-gray-600" />;
  }
};

const getStatusMessage = (status: string) => {
  switch (status) {
    case "pending":
      return "Your request is currently under review. Our team will review your application and get back to you within 2-3 business days.";
    case "approved":
      return "Congratulations! Your creator request has been approved. You now have access to create and publish articles on the platform.";
    case "rejected":
      return "Unfortunately, your creator request was not approved at this time. Please review the feedback below and consider submitting a new application with additional information.";
    default:
      return "Your request status is unknown. Please contact support if you have any questions.";
  }
};

export default function CreatorRequestStatus() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null);

  const filteredRequests = mockUserRequests.filter(request => {
    if (selectedTab === "all") return true;
    return request.status === selectedTab;
  });

  const pendingRequests = mockUserRequests.filter(r => r.status === "pending").length;
  const approvedRequests = mockUserRequests.filter(r => r.status === "approved").length;
  const rejectedRequests = mockUserRequests.filter(r => r.status === "rejected").length;
  const totalRequests = mockUserRequests.length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "approved":
        return "text-green-600 bg-green-50 border-green-200";
      case "rejected":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusProgress = (status: string) => {
    switch (status) {
      case "pending":
        return { step: 2, total: 3, label: "Under Review" };
      case "approved":
        return { step: 3, total: 3, label: "Approved" };
      case "rejected":
        return { step: 3, total: 3, label: "Completed" };
      default:
        return { step: 1, total: 3, label: "Submitted" };
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Link href="/request-creator">
                <Button variant="outline" size="sm" className="shrink-0">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Application
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Creator Request Status</h1>
                <p className="text-muted-foreground mt-1">
                  Track and manage your creator role applications
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Link href="/request-creator">
                <Button>
                  <Edit className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalRequests}</div>
              <p className="text-xs text-muted-foreground">
                All time submissions
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingRequests}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting review
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{approvedRequests}</div>
              <p className="text-xs text-muted-foreground">
                Successfully approved
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{rejectedRequests}</div>
              <p className="text-xs text-muted-foreground">
                Not approved
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full sm:w-auto">
              <TabsList className="grid w-full grid-cols-4 sm:w-auto">
                <TabsTrigger value="all" className="text-xs sm:text-sm">All ({totalRequests})</TabsTrigger>
                <TabsTrigger value="pending" className="text-xs sm:text-sm">Pending ({pendingRequests})</TabsTrigger>
                <TabsTrigger value="approved" className="text-xs sm:text-sm">Approved ({approvedRequests})</TabsTrigger>
                <TabsTrigger value="rejected" className="text-xs sm:text-sm">Rejected ({rejectedRequests})</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Requests List */}
          <div className="space-y-4">
            {filteredRequests.map((request) => {
              const isExpanded = expandedRequest === request.id;
              const progress = getStatusProgress(request.status);
              
              return (
                <Card key={request.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`p-2 rounded-lg ${getStatusColor(request.status)}`}>
                          {getStatusIcon(request.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold">Creator Role Request #{request.id}</h3>
                            {getStatusBadge(request.status)}
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="font-medium">{progress.label}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                style={{ width: `${(progress.step / progress.total) * 100}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Submitted</span>
                              <span>Under Review</span>
                              <span>Completed</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedRequest(isExpanded ? null : request.id)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {isExpanded ? "Hide Details" : "View Details"}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {/* Quick Info */}
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Submitted:</span>
                        <span className="font-medium">{new Date(request.submittedAt).toLocaleDateString()}</span>
                      </div>
                      
                      {request.reviewedAt && (
                        <div className="flex items-center space-x-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Reviewed by:</span>
                          <span className="font-medium">{request.reviewedBy}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Status:</span>
                        <span className="font-medium capitalize">{request.status.replace('_', ' ')}</span>
                      </div>
                    </div>

                    {/* Status Message */}
                    <div className={`p-4 rounded-lg border ${getStatusColor(request.status)}`}>
                      <div className="flex items-start space-x-2">
                        <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{getStatusMessage(request.status)}</p>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="mt-6 space-y-6">
                        <Separator />
                        
                        {/* Application Details */}
                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold flex items-center space-x-2">
                            <FileText className="h-5 w-5" />
                            <span>Application Details</span>
                          </h4>
                          
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Your Message</label>
                                <p className="text-sm mt-2 p-3 bg-muted rounded-lg">{request.message}</p>
                              </div>
                              
                              <div>
                                <label className="text-sm font-medium text-muted-foreground">Expected Content</label>
                                <p className="text-sm mt-2 p-3 bg-muted rounded-lg">{request.expectedContent}</p>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              {request.portfolio && (
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Portfolio</label>
                                  <div className="mt-2">
                                    <a 
                                      href={request.portfolio} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                    >
                                      <span>{request.portfolio}</span>
                                      <ExternalLink className="h-3 w-3" />
                                    </a>
                                  </div>
                                </div>
                              )}
                              
                              {request.socialMedia && (
                                <div>
                                  <label className="text-sm font-medium text-muted-foreground">Social Media</label>
                                  <p className="text-sm mt-2 p-3 bg-muted rounded-lg">{request.socialMedia}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Admin Feedback */}
                        {request.adminNotes && (
                          <div className="space-y-3">
                            <Separator />
                            <h4 className="text-lg font-semibold flex items-center space-x-2">
                              <MessageSquare className="h-5 w-5" />
                              <span>Admin Feedback</span>
                            </h4>
                            <div className="p-4 bg-muted rounded-lg border-l-4 border-l-blue-500">
                              <p className="text-sm">{request.adminNotes}</p>
                              {request.reviewedAt && (
                                <div className="mt-3 pt-3 border-t border-border">
                                  <p className="text-xs text-muted-foreground">
                                    Reviewed on {new Date(request.reviewedAt).toLocaleDateString()} by {request.reviewedBy}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <Separator />
                        <div className="flex flex-wrap items-center gap-2">
                          {request.status === "pending" && (
                            <Button variant="outline" size="sm">
                              <RefreshCw className="h-4 w-4 mr-2" />
                              Check for Updates
                            </Button>
                          )}
                          
                          {request.status === "rejected" && (
                            <Link href="/request-creator">
                              <Button size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Submit New Request
                              </Button>
                            </Link>
                          )}
                          
                          {request.status === "approved" && (
                            <Link href="/dashboard">
                              <Button size="sm">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Go to Dashboard
                              </Button>
                            </Link>
                          )}
                          
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contact Support
                          </Button>
                          
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Request ID
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
            
            {filteredRequests.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No requests found</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    {selectedTab === "all" 
                      ? "You haven't submitted any creator role requests yet. Start your journey as a content creator today!"
                      : `No ${selectedTab} requests found. Try selecting a different filter.`
                    }
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/request-creator">
                      <Button>
                        <Edit className="h-4 w-4 mr-2" />
                        Submit Your First Request
                      </Button>
                    </Link>
                    <Button variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
