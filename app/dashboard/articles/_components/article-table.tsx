"use client";

import { useMemo, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Columns3,
  Plus,
  RefreshCw,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import type { Article } from "@/lib/types";
import { ARTICLE_PAGE_SIZE_OPTIONS } from "../_types";

export type ArticleTableProps = {
  data: Article[];
  isLoading: boolean;
  isError?: boolean;
  errorMessage?: string;
  meta?: {
    total_docs: number;
    total_pages: number;
    page: number;
    limit: number;
    has_prev_page: boolean;
    has_next_page: boolean;
  };
  search: string;
  statusFilter: string;
  onSearch: (value: string) => void;
  onStatusChange: (status: string) => void;
  onRefresh: () => void;
  onCreate: () => void;
  onOpenArticle: (article: Article) => void;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
};

export function ArticleTable({
  data,
  isLoading,
  isError,
  errorMessage,
  meta,
  search,
  statusFilter,
  onSearch,
  onStatusChange,
  onRefresh,
  onCreate,
  onOpenArticle,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: ArticleTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageInput, setPageInput] = useState("");

  const columns = useMemo<ColumnDef<Article>[]>(() => {
    return [
      {
        accessorKey: "title",
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="pl-0 font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <div>
            <p className="font-medium text-foreground">{row.original.title}</p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {row.original.excerpt}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            variant={
              row.original.status === "published" ? "default" : "secondary"
            }
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.original.category?.name ?? "—"}
          </span>
        ),
      },
      {
        accessorKey: "updatedAt",
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Updated
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => {
          const date = row.original.updatedAt ?? row.original.publishedAt;
          return (
            <span className="text-muted-foreground">
              {date ? new Date(date).toLocaleDateString() : "—"}
            </span>
          );
        },
      },
      {
        accessorKey: "views",
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Views
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <span>{(row.original.views ?? 0).toLocaleString()}</span>
        ),
      },
      {
        accessorKey: "reactionsCount",
        header: "Reactions",
        cell: ({ row }) => (
          <span>{row.original.reactionsCount?.toLocaleString() ?? 0}</span>
        ),
      },
      {
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenArticle(row.original)}
          >
            Manage
          </Button>
        ),
      },
    ];
  }, [onOpenArticle]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const rows = table.getRowModel().rows;

  const currentPage = meta?.page ?? 1;
  const totalPages = meta?.total_pages ?? 1;
  const totalDocs = meta?.total_docs ?? data.length;
  const canGoNext = meta?.has_next_page ?? false;
  const canGoPrev = meta?.has_prev_page ?? false;

  const handlePageInput = () => {
    const parsed = Number(pageInput);
    if (Number.isNaN(parsed)) return;
    onPageChange(parsed);
    setPageInput("");
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <CardTitle>Articles</CardTitle>
          <CardDescription>Monitor and manage your drafted or published stories.</CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={onRefresh} disabled={isLoading}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button onClick={onCreate}>
            <Plus className="mr-2 h-4 w-4" />
            New article
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <Input
              value={search}
              placeholder="Search by title or excerpt"
              onChange={(event) => onSearch(event.target.value)}
            />
            <Button variant="outline" size="icon" onClick={onRefresh}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <select
              className="rounded-md border border-input bg-background p-2"
              value={statusFilter}
              onChange={(event) => onStatusChange(event.target.value)}
            >
              <option value="">All statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Columns3 className="mr-2 h-4 w-4" />
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table.getAllLeafColumns().map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Loading articles…
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-destructive">
                    {errorMessage || "Failed to load articles."}
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No articles found for the selected filters.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, totalDocs)} of {totalDocs} entries
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                disabled={!canGoPrev}
                onClick={() => onPageChange(1)}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={!canGoPrev}
                onClick={() => onPageChange(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <Input
                className="w-16"
                value={pageInput}
                onChange={(event) => setPageInput(event.target.value)}
                placeholder={`${currentPage}`}
              />
              <Button variant="outline" onClick={handlePageInput}>
                Go
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                disabled={!canGoNext}
                onClick={() => onPageChange(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={!canGoNext}
                onClick={() => onPageChange(totalPages)}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <select
                className="rounded-md border border-input bg-background p-2"
                value={pageSize}
                onChange={(event) => onPageSizeChange(Number(event.target.value))}
              >
                {ARTICLE_PAGE_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    Show {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
