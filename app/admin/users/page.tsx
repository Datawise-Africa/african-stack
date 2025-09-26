"use client";

import { useState, useMemo } from "react";
import { useAdminUsers } from "@/features/admin/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Search,
  Filter,
  MoreHorizontal,
  UserCheck,
  UserX,
  Shield,
  Mail,
  ChevronDown,
  ArrowUpDown,
  Eye,
  X
} from "lucide-react";
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
import { User } from "@/lib/types";

// Mock data
// const mockUsers = [
//   {
//     id: "1",
//     name: "John Doe",
//     email: "john@example.com",
//     role: "creator",
//     status: "active",
//     joinedAt: "2024-01-15T10:30:00Z",
//     articlesCount: 12,
//     lastActive: "2024-01-20T14:22:00Z",
//     views: 1250,
//     reactions: 89
//   },
//   {
//     id: "2",
//     name: "Jane Smith",
//     email: "jane@example.com",
//     role: "user",
//     status: "active",
//     joinedAt: "2024-01-10T09:15:00Z",
//     articlesCount: 0,
//     lastActive: "2024-01-20T16:45:00Z",
//     views: 0,
//     reactions: 0
//   },
//   {
//     id: "3",
//     name: "Mike Johnson",
//     email: "mike@example.com",
//     role: "creator",
//     status: "pending_approval",
//     joinedAt: "2024-01-18T11:20:00Z",
//     articlesCount: 3,
//     lastActive: "2024-01-19T13:10:00Z",
//     views: 450,
//     reactions: 23
//   },
//   {
//     id: "4",
//     name: "Sarah Wilson",
//     email: "sarah@example.com",
//     role: "user",
//     status: "suspended",
//     joinedAt: "2024-01-05T14:45:00Z",
//     articlesCount: 0,
//     lastActive: "2024-01-15T10:30:00Z",
//     views: 0,
//     reactions: 0
//   },
//   {
//     id: "5",
//     name: "Alex Rodriguez",
//     email: "alex@example.com",
//     role: "creator",
//     status: "active",
//     joinedAt: "2024-01-12T08:45:00Z",
//     articlesCount: 8,
//     lastActive: "2024-01-20T11:30:00Z",
//     views: 2100,
//     reactions: 156
//   },
//   {
//     id: "6",
//     name: "Emily Chen",
//     email: "emily@example.com",
//     role: "user",
//     status: "active",
//     joinedAt: "2024-01-08T16:20:00Z",
//     articlesCount: 0,
//     lastActive: "2024-01-20T09:15:00Z",
//     views: 0,
//     reactions: 0
//   },
//   {
//     id: "7",
//     name: "David Kim",
//     email: "david@example.com",
//     role: "creator",
//     status: "pending_approval",
//     joinedAt: "2024-01-19T13:30:00Z",
//     articlesCount: 2,
//     lastActive: "2024-01-19T17:45:00Z",
//     views: 180,
//     reactions: 12
//   },
//   {
//     id: "8",
//     name: "Lisa Brown",
//     email: "lisa@example.com",
//     role: "user",
//     status: "active",
//     joinedAt: "2024-01-14T12:10:00Z",
//     articlesCount: 0,
//     lastActive: "2024-01-20T14:30:00Z",
//     views: 0,
//     reactions: 0
//   },
//   {
//     id: "9",
//     name: "Michael Davis",
//     email: "michael@example.com",
//     role: "creator",
//     status: "active",
//     joinedAt: "2024-01-06T15:45:00Z",
//     articlesCount: 15,
//     lastActive: "2024-01-20T10:20:00Z",
//     views: 3200,
//     reactions: 234
//   },
//   {
//     id: "10",
//     name: "Anna Taylor",
//     email: "anna@example.com",
//     role: "user",
//     status: "suspended",
//     joinedAt: "2024-01-03T11:25:00Z",
//     articlesCount: 0,
//     lastActive: "2024-01-12T08:40:00Z",
//     views: 0,
//     reactions: 0
//   }
// ];

// Removed unused roleRequestStats

export default function UserManagement() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  // React Query hooks
  const { data: usersData, isLoading, error } = useAdminUsers({
    search: globalFilter,
    role: columnFilters.find(f => f.id === 'role')?.value,
    status: columnFilters.find(f => f.id === 'status')?.value,
    sortBy: sorting[0]?.id || 'joinedAt',
    sortOrder: sorting[0]?.desc ? 'desc' : 'asc',
    page: 1,
    limit: 100
  });

  // Removed unused updateUserStatus and updateUserRole

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case "pending_approval":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "system_admin":
        return <Badge variant="default" className="bg-purple-100 text-purple-800">Admin</Badge>;
      case "creator":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Creator</Badge>;
      case "user":
        return <Badge variant="outline">User</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-8 px-2 lg:px-3"
            >
              Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <span className="text-sm font-medium">
                  {user.name.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-muted-foreground">{user.email}</div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "role",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-8 px-2 lg:px-3"
            >
              Role
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return getRoleBadge(row.getValue("role"));
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
        accessorKey: "articlesCount",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-8 px-2 lg:px-3"
            >
              Articles
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="text-center">
              <div className="font-medium">{row.getValue("articlesCount")}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "views",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-8 px-2 lg:px-3"
            >
              Views
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="text-center">
              <div className="font-medium">{(row.getValue("views") as number).toLocaleString()}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "reactions",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-8 px-2 lg:px-3"
            >
              Reactions
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="text-center">
              <div className="font-medium">{row.getValue("reactions")}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "joinedAt",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-8 px-2 lg:px-3"
            >
              Joined
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="text-sm">
              {new Date(row.getValue("joinedAt")).toLocaleDateString()}
            </div>
          );
        },
      },
      {
        accessorKey: "lastActive",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
              className="h-8 px-2 lg:px-3"
            >
              Last Active
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="text-sm">
              {new Date(row.getValue("lastActive")).toLocaleDateString()}
            </div>
          );
        },
      },
      {
        id: "actions",
        enableHiding: false,
        cell: () => {
          return (
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
                <DropdownMenuItem>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Approve Creator
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Shield className="mr-2 h-4 w-4" />
                  Change Role
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserX className="mr-2 h-4 w-4" />
                  Suspend User
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Delete User
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: usersData?.users || [],
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

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading users...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-destructive mb-4">Failed to load users</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">
          Manage users, roles, and permissions across the platform
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersData?.total || 0}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Creators</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersData?.users.filter(u => u.role === "creator" && u.status === "active").length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              +5 new this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersData?.users.filter(u => u.status === "pending_approval").length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            <UserX className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usersData?.users.filter(u => u.status === "suspended").length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              -1 from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage user accounts and permissions
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              {/* Global Filter */}
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search all users..."
                  value={globalFilter ?? ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              
              {/* Role Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
                    <Shield className="h-4 w-4 mr-2" />
                    Role
                    {table.getColumn("role")?.getFilterValue() ? (
                      <Badge variant="secondary" className="ml-2 h-5 px-1 text-xs">
                        {(table.getColumn("role")?.getFilterValue() as string[])?.length || 0}
                      </Badge>
                    ) : null}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by role</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {["user", "creator", "system_admin"].map((role) => (
                    <DropdownMenuCheckboxItem
                      key={role}
                      className="capitalize"
                        checked={(table.getColumn("role")?.getFilterValue() as string[])?.includes(role) || false}
                      onCheckedChange={(value) => {
                        const currentFilter = table.getColumn("role")?.getFilterValue() as string[] || [];
                        const newFilter = value
                          ? [...currentFilter, role]
                          : currentFilter.filter((r) => r !== role);
                        table.getColumn("role")?.setFilterValue(newFilter.length ? newFilter : undefined);
                      }}
                    >
                      {role.replace('_', ' ')}
                    </DropdownMenuCheckboxItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => table.getColumn("role")?.setFilterValue(undefined)}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear filter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Status Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="relative">
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
                  {["active", "pending_approval", "suspended"].map((status) => (
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
                  <Button variant="outline" size="sm">
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
              {(table.getColumn("role")?.getFilterValue() || 
                table.getColumn("status")?.getFilterValue() || 
                globalFilter) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    table.getColumn("role")?.setFilterValue(undefined);
                    table.getColumn("status")?.setFilterValue(undefined);
                    setGlobalFilter("");
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              )}
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
