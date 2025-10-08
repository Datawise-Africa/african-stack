"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

import {
  usePaginatedCategories,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/features/categories/hooks";
import type { Category } from "@/lib/types";

import { CategoryStatsCards } from "./_components/category-stats-cards";
import { CategoryTable } from "./_components/category-table";
import { CategoryFormDialog } from "./_components/category-form-dialog";
import { categoryFormResolver } from "./_utils/form-resolver";
import {
  buildCategoryPayload,
  getDefaultCategoryFormValues,
  mapCategoryToFormValues,
} from "./_utils/form-utils";
import type { CategoryFormValues } from "./_types";
import { PAGE_SIZE_OPTIONS } from "./_types";

const DEFAULT_PAGE_SIZE = PAGE_SIZE_OPTIONS[1]; // 20

export default function AdminCategoriesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [searchTerm, setSearchTerm] = useState("");

  const categoryQueryParams = useMemo(
    () => ({
      page,
      limit: pageSize,
      search: searchTerm.trim() || undefined,
    }),
    [page, pageSize, searchTerm]
  );

  const {
    data: categoriesResult,
    isPending,
    isRefetching,
    isError,
    error,
    refetch,
  } = usePaginatedCategories(categoryQueryParams);

  const createCategory = useCreateCategoryMutation({
    onSuccess: (created) => {
      toast.success(`Category “${created.name}” created successfully.`);
      closeDialog();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create category.");
    },
  });

  const updateCategory = useUpdateCategoryMutation({
    onSuccess: (updated) => {
      toast.success(`Category “${updated.name}” updated successfully.`);
      closeDialog();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update category.");
    },
  });

  const deleteCategory = useDeleteCategoryMutation({
    onSuccess: () => {
      toast.success("Category deleted successfully.");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete category.");
    },
  });

  const form = useForm<CategoryFormValues>({
    resolver: categoryFormResolver,
    defaultValues: getDefaultCategoryFormValues(),
  });

  useEffect(() => {
    if (!dialogOpen) {
      form.reset(getDefaultCategoryFormValues());
      setSelectedCategory(null);
    }
  }, [dialogOpen, form]);

  const categoriesData = useMemo(
    () => categoriesResult?.data ?? [],
    [categoriesResult]
  );
  const meta = categoriesResult?.meta;

  const totalArticles = useMemo(() => {
    return categoriesData.reduce((sum, category) => {
      return sum + (category.articleCount ?? 0);
    }, 0);
  }, [categoriesData]);

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message || "Failed to load categories.");
    }
  }, [isError, error]);

  const openForCreate = () => {
    setSelectedCategory(null);
    form.reset(getDefaultCategoryFormValues());
    setDialogOpen(true);
  };

  const openForEdit = (category: Category) => {
    setSelectedCategory(category);
    form.reset(mapCategoryToFormValues(category));
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleFormSubmit = (values: CategoryFormValues) => {
    const payload = buildCategoryPayload(values);

    if (selectedCategory) {
      updateCategory.mutate({
        id: selectedCategory.id,
        data: payload,
      });
    } else {
      createCategory.mutate(payload);
    }
  };

  const handleDelete = (category: Category) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the category “${category.name}”? This action cannot be undone.`
    );
    if (!confirmed) {
      toast("Deletion cancelled", { icon: "⚠️" });
      return;
    }
    deleteCategory.mutate(category.id);
  };

  const categoriesList = categoriesData;
  const isMutating =
    createCategory.isPending ||
    updateCategory.isPending ||
    deleteCategory.isPending;
  const isDeleting = deleteCategory.isPending;

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handlePageChange = (nextPage: number) => {
    if (meta) {
      if (nextPage < 1 || nextPage > meta.total_pages) return;
    } else if (nextPage < 1) {
      return;
    }
    setPage(nextPage);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Category Management</h1>
        <p className="text-muted-foreground">
          Create, edit, and organise blog categories used across the platform.
        </p>
      </div>

      <CategoryStatsCards
        totalCategories={meta?.total_docs ?? categoriesList.length}
        totalArticles={totalArticles}
        isPending={isPending}
        isRefetching={isRefetching}
      />

      <CategoryTable
        data={categoriesList}
        isLoading={isPending}
        isError={isError}
        errorMessage={error?.message}
        onRefresh={refetch}
        onCreate={openForCreate}
        onEdit={openForEdit}
        onDelete={handleDelete}
        isDeleting={isDeleting}
        meta={meta}
        search={searchTerm}
        onSearch={handleSearchChange}
        onPageChange={handlePageChange}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
      />

      <CategoryFormDialog
        open={dialogOpen}
        mode={selectedCategory ? "edit" : "create"}
        isMutating={isMutating}
        form={form}
        onOpenChange={(open) => {
          if (!open) {
            closeDialog();
          } else {
            setDialogOpen(true);
          }
        }}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
