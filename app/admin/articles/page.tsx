"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  User,
  Calendar,
  ChevronDown,
  ArrowUpDown,
  X,
  MessageSquare} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { MarkdownRenderer } from "@/components/markdown-renderer";

// Mock data
const mockArticles = [
  {
    id: "1",
    title: "The Future of AI in Healthcare: A Comprehensive Guide",
    author: "Dr. Sarah Johnson",
    authorEmail: "sarah@example.com",
    status: "pending_approval",
    submittedAt: "2024-01-20T10:30:00Z",
    category: "Technology",
    readTime: 8,
    excerpt: "Exploring how artificial intelligence is revolutionizing healthcare delivery and patient outcomes. This comprehensive guide covers the latest developments, challenges, and opportunities in AI-driven healthcare solutions.",
    content: `# The Future of AI in Healthcare: A Comprehensive Guide

Artificial Intelligence is transforming healthcare in unprecedented ways. From diagnostic imaging to drug discovery, AI is revolutionizing how we approach medical care.

## Key Areas of Impact

### 1. Diagnostic Imaging
AI-powered image analysis is improving accuracy in radiology, pathology, and dermatology. Machine learning algorithms can detect patterns that might be missed by human eyes.

### 2. Drug Discovery
AI is accelerating the drug development process, reducing costs and time to market for new treatments.

### 3. Personalized Medicine
By analyzing patient data, AI can help create personalized treatment plans tailored to individual genetic profiles.

## Challenges and Considerations

While the potential is immense, there are important challenges to address:

- **Data Privacy**: Ensuring patient data is protected
- **Regulatory Compliance**: Meeting healthcare regulations
- **Ethical Considerations**: Maintaining human oversight in medical decisions

## Conclusion

The future of healthcare lies in the successful integration of AI technologies while maintaining the human touch that is essential to medical care.`,
    tags: ["AI", "Healthcare", "Technology", "Machine Learning"],
    views: 0,
    reactions: 0,
    comments: 0,
    bookmarks: 0
  },
  {
    id: "2",
    title: "Building Scalable Web Applications with Modern Architecture",
    author: "Mike Chen",
    authorEmail: "mike@example.com",
    status: "pending_approval",
    submittedAt: "2024-01-19T14:22:00Z",
    category: "Development",
    readTime: 12,
    excerpt: "Best practices for creating web applications that can handle millions of users. Learn about microservices, containerization, and cloud-native development patterns.",
    content: `# Building Scalable Web Applications with Modern Architecture

In today's digital landscape, building applications that can scale to millions of users is crucial for success.

## Architecture Patterns

### Microservices
Breaking down monolithic applications into smaller, independent services.

### Containerization
Using Docker and Kubernetes for consistent deployment and scaling.

### Cloud-Native Development
Leveraging cloud services for scalability and reliability.

## Best Practices

1. **Database Optimization**
2. **Caching Strategies**
3. **Load Balancing**
4. **Monitoring and Observability**

## Conclusion

Scalable architecture is the foundation of modern web applications.`,
    tags: ["Web Development", "Scalability", "Architecture", "Cloud"],
    views: 0,
    reactions: 0,
    comments: 0,
    bookmarks: 0
  },
  {
    id: "3",
    title: "Understanding Machine Learning Basics for Beginners",
    author: "Alex Rodriguez",
    authorEmail: "alex@example.com",
    status: "approved",
    submittedAt: "2024-01-18T09:15:00Z",
    approvedAt: "2024-01-19T11:30:00Z",
    category: "AI/ML",
    readTime: 15,
    excerpt: "A comprehensive guide to machine learning concepts for beginners. Learn about algorithms, data preprocessing, and model evaluation.",
    content: `# Understanding Machine Learning Basics for Beginners

Machine Learning is a subset of artificial intelligence that enables computers to learn and make decisions from data.

## What is Machine Learning?

Machine Learning algorithms build mathematical models based on training data to make predictions or decisions.

## Types of Machine Learning

### Supervised Learning
Learning with labeled training data.

### Unsupervised Learning
Finding patterns in data without labels.

### Reinforcement Learning
Learning through interaction with an environment.

## Key Concepts

- **Features**: Input variables
- **Labels**: Output variables
- **Training**: Process of learning
- **Testing**: Evaluating performance

## Conclusion

Machine Learning opens up endless possibilities for solving complex problems.`,
    tags: ["Machine Learning", "Tutorial", "AI", "Data Science"],
    views: 1250,
    reactions: 89,
    comments: 23,
    bookmarks: 45
  },
  {
    id: "4",
    title: "The Ethics of AI Development: A Critical Analysis",
    author: "Dr. Emily Watson",
    authorEmail: "emily@example.com",
    status: "rejected",
    submittedAt: "2024-01-17T16:45:00Z",
    rejectedAt: "2024-01-18T10:20:00Z",
    category: "Ethics",
    readTime: 10,
    excerpt: "Examining the moral implications of artificial intelligence development and deployment in society.",
    content: `# The Ethics of AI Development: A Critical Analysis

As AI becomes more prevalent, we must consider the ethical implications of its development and deployment.

## Key Ethical Concerns

### Bias and Fairness
AI systems can perpetuate existing biases in society.

### Privacy and Surveillance
The collection and use of personal data raises privacy concerns.

### Accountability
Who is responsible when AI systems make mistakes?

## Conclusion

Ethical considerations must be at the forefront of AI development.`,
    tags: ["AI Ethics", "Philosophy", "Technology", "Society"],
    views: 0,
    reactions: 0,
    comments: 0,
    bookmarks: 0
  }
];

const moderationStats = {
  pending: 2,
  approved: 1,
  rejected: 1,
  total: 4
};

export default function ArticleModeration() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending_approval":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending Review</Badge>;
      case "approved":
        return <Badge variant="default" className="bg-green-100 text-green-800">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    const colors = {
      "Technology": "bg-blue-100 text-blue-800",
      "Development": "bg-purple-100 text-purple-800",
      "AI/ML": "bg-green-100 text-green-800",
      "Ethics": "bg-orange-100 text-orange-800"
    };
    
    return (
      <Badge variant="outline" className={colors[category as keyof typeof colors] || ""}>
        {category}
      </Badge>
    );
  };

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        accessorKey: "title",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-8 px-2 lg:px-3"
            >
              Title
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const article = row.original;
          return (
            <div className="max-w-[300px]">
              <div className="font-medium truncate">{article.title}</div>
              <div className="text-sm text-muted-foreground truncate">{article.excerpt}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "author",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-8 px-2 lg:px-3"
            >
              Author
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const article = row.original;
          return (
            <div>
              <div className="font-medium">{article.author}</div>
              <div className="text-sm text-muted-foreground">{article.authorEmail}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => {
          return getCategoryBadge(row.getValue("category"));
        },
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id));
        },
      },
      {
        accessorKey: "status",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-8 px-2 lg:px-3"
            >
              Status
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return getStatusBadge(row.getValue("status"));
        },
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id));
        },
      },
      {
        accessorKey: "readTime",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-8 px-2 lg:px-3"
            >
              Read Time
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="text-center">
              <div className="font-medium">{row.getValue("readTime")} min</div>
            </div>
          );
        },
      },
      {
        accessorKey: "submittedAt",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-8 px-2 lg:px-3"
            >
              Submitted
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="text-sm">
              {new Date(row.getValue("submittedAt")).toLocaleDateString()}
            </div>
          );
        },
      },
      {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
          const article = row.original;
          return (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedArticle(article);
                  setPreviewMode(true);
                }}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {article.status === "pending_approval" && (
                    <>
                      <DropdownMenuItem className="text-green-600">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve Article
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject Article
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuItem>
                    <FileText className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Author
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: mockArticles,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  if (previewMode && selectedArticle) {
    return (
      <div className="p-6">
        {/* Preview Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setPreviewMode(false)}
              >
                ← Back to Articles
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Article Preview</h1>
                <p className="text-muted-foreground">Review article before approval</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {selectedArticle.status === "pending_approval" && (
                <>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button variant="destructive">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Article Preview */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="space-y-4">
                <div>
                  <h1 className="text-3xl font-bold">{selectedArticle.title}</h1>
                  <p className="text-lg text-muted-foreground mt-2">{selectedArticle.excerpt}</p>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{selectedArticle.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Submitted {new Date(selectedArticle.submittedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{selectedArticle.readTime} min read</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getCategoryBadge(selectedArticle.category)}
                  {getStatusBadge(selectedArticle.status)}
                  {selectedArticle.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <MarkdownRenderer content={selectedArticle.content} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Article Moderation</h1>
        <p className="text-muted-foreground">
          Review and approve articles submitted by creators
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moderationStats.pending}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moderationStats.approved}</div>
            <p className="text-xs text-muted-foreground">
              +12 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moderationStats.rejected}</div>
            <p className="text-xs text-muted-foreground">
              -2 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moderationStats.total}</div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div>
              <CardTitle>Articles</CardTitle>
              <CardDescription>
                Review and moderate article submissions
              </CardDescription>
            </div>
            
            {/* Mobile and Desktop Controls */}
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
              {/* Global Filter */}
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-8 w-full"
                />
              </div>
              
              {/* Filter Controls - Mobile Stacked, Desktop Inline */}
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                {/* Status Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="relative w-full sm:w-auto">
                      <Filter className="h-4 w-4 mr-2" />
                      Status
                      {table.getColumn("status")?.getFilterValue() ? (
                        <Badge variant="secondary" className="ml-2 h-5 px-1 text-xs">
                          {(table.getColumn("status")?.getFilterValue() as string[])?.length || 0}
                        </Badge>
                      ) : null}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {["pending_approval", "approved", "rejected"].map((status) => (
                      <DropdownMenuCheckboxItem
                        key={status}
                        className="capitalize"
                        checked={(table.getColumn("status")?.getFilterValue() as string[])?.includes(status) || false}
                        onCheckedChange={(value) => {
                          const currentFilter = table.getColumn("status")?.getFilterValue() as string[] || [];
                          const newFilter = value
                            ? [...currentFilter, status]
                            : currentFilter.filter((s) => s !== status);
                          table.getColumn("status")?.setFilterValue(newFilter.length ? newFilter : undefined);
                        }}
                      >
                        {status.replace('_', ' ')}
                      </DropdownMenuCheckboxItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => table.getColumn("status")?.setFilterValue(undefined)}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Clear filter
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Column Visibility */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        );
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Clear All Filters */}
                {(table.getColumn("status")?.getFilterValue() || globalFilter) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      table.getColumn("status")?.setFilterValue(undefined);
                      setGlobalFilter("");
                    }}
                    className="w-full sm:w-auto"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-between space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
