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
  Image as ImageIcon,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
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
import type { Category } from "@/lib/types";
import type { CategoryTableProps, PageItem } from "../_types";
import { PAGE_SIZE_OPTIONS } from "../_types";

export function CategoryTable({
  data,
  isLoading,
  isError,
  errorMessage,
  onRefresh,
  onCreate,
  onEdit,
  onDelete,
  isDeleting,
  meta,
  search,
  onSearch,
  onPageChange,
  pageSize,
  onPageSizeChange,
}: CategoryTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pageInput, setPageInput] = useState("");

  const columns = useMemo<ColumnDef<Category>[]>(() => {
    return [
      {
        accessorKey: "thumbnail",
        header: "Thumbnail",
        cell: ({ row }) => {
          const thumbnail = row.original.thumbnail;
          return thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={thumbnail}
              alt={row.original.name}
              className="h-12 w-20 rounded object-cover"
            />
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ImageIcon className="h-4 w-4" />
              <span>None</span>
            </div>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "name",
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
        cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {row.original.description || "—"}
          </span>
        ),
      },
      {
        accessorKey: "articleCount",
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="mx-auto flex items-center font-semibold"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Articles
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        ),
        cell: ({ row }) => (
          <span className="flex justify-center">{row.original.articleCount ?? 0}</span>
        ),
      },
      {
        accessorKey: "slug",
        header: "Slug",
        cell: ({ row }) => (
          <span className="text-muted-foreground">{row.original.slug}</span>
        ),
      },
      {
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => (
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(row.original)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(row.original)}
              disabled={isDeleting}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        ),
      },
    ];
  }, [isDeleting, onDelete, onEdit]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const rows = table.getRowModel().rows;

  const canGoPrev = meta?.has_prev_page ?? false;
  const canGoNext = meta?.has_next_page ?? false;
  const currentPage = meta?.page ?? 1;
  const totalPages = meta?.total_pages ?? 1;
  const totalDocs = meta?.total_docs ?? data.length;

  const pageNumbers = useMemo<PageItem[]>(() => {
    const maxPagesToShow = 5;
    const items: PageItem[] = [];

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i += 1) {
        items.push({ type: "number", value: i });
      }
      return items;
    }

    const leftSibling = Math.max(currentPage - 1, 2);
    const rightSibling = Math.min(currentPage + 1, totalPages - 1);

    items.push({ type: "number", value: 1 });
    if (leftSibling > 2) {
      items.push({ type: "ellipsis", id: `left-${currentPage}` });
    }

    for (let page = leftSibling; page <= rightSibling; page += 1) {
      items.push({ type: "number", value: page });
    }

    if (rightSibling < totalPages - 1) {
      items.push({ type: "ellipsis", id: `right-${currentPage}` });
    }

    items.push({ type: "number", value: totalPages });
    return items;
  }, [currentPage, totalPages]);

  const handleGoToPage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!pageInput) return;
    const value = Number(pageInput);
    if (Number.isNaN(value)) return;
    onPageChange(value);
    setPageInput("");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <CardTitle>Categories</CardTitle>
          <CardDescription>Manage the categories that help readers discover content.</CardDescription>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
          <Input
            placeholder="Search categories..."
            value={search}
            onChange={(event) => onSearch(event.target.value)}
            className="w-full sm:w-64"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh</span>
          </Button>
          <Button onClick={onCreate} className="w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            <span className="sr-only">New Category</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex"
              >
                <Columns3 className="h-4 w-4" />
                <span className="sr-only">Columns</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllLeafColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(Boolean(value))}
                    className="capitalize"
                  >
                    {column.id.replace(/([A-Z])/g, " $1").trim()}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {isError && (
          <div className="mb-4 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            Failed to load categories: {errorMessage ?? "Unknown error"}.
          </div>
        )}

        {isLoading && data.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">Loading categories…</div>
        ) : rows.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            No categories found. Create your first category to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="whitespace-nowrap">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() ? "selected" : undefined}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>
              {meta
                ? `Page ${currentPage} of ${totalPages} (${totalDocs} total)`
                : `Showing ${data.length} categories`}
            </span>
            <form onSubmit={handleGoToPage} className="flex items-center gap-2">
              <span className="text-xs font-medium uppercase text-muted-foreground">Go to page</span>
              <Input
                type="number"
                min={1}
                max={totalPages}
                value={pageInput}
                onChange={(event) => setPageInput(event.target.value)}
                className="h-9 w-16"
                disabled={isLoading || totalPages <= 1}
              />
              <Button type="submit" size="sm" variant="outline" disabled={isLoading || totalPages <= 1}>
                Go
              </Button>
            </form>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium uppercase text-muted-foreground">Rows per page</span>
              <select
                value={pageSize}
                onChange={(event) => onPageSizeChange(Number(event.target.value))}
                disabled={isLoading}
                className="h-9 rounded-md border border-input bg-background px-2 text-sm"
              >
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1 || isLoading}
            >
              <ChevronsLeft className="h-4 w-4" />
              <span className="sr-only">First page</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={!canGoPrev || isLoading}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            {pageNumbers.map((item) => {
              if (item.type === "ellipsis") {
                return (
                  <span key={item.id} className="px-2 text-sm text-muted-foreground">
                    …
                  </span>
                );
              }

              const isActive = item.value === currentPage;
              return (
                <Button
                  key={item.value}
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(item.value)}
                  disabled={isLoading}
                  className={isActive ? "cursor-default" : undefined}
                >
                  {item.value}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={!canGoNext || isLoading}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages || isLoading}
            >
              <ChevronsRight className="h-4 w-4" />
              <span className="sr-only">Last page</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
