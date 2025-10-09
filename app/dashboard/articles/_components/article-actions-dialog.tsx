"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/lib/types";

import { RichTextRenderer } from "@/components/rich-text-renderer";

export type ArticleActionsDialogProps = {
  open: boolean;
  article: Article | null;
  isUpdating?: boolean;
  onOpenChange: (open: boolean) => void;
  onChangeStatus: (status: Article["status"]) => void;
};

const statusOptions: Article["status"][] = ["draft", "published"];

export function ArticleActionsDialog({
  open,
  article,
  isUpdating,
  onOpenChange,
  onChangeStatus,
}: ArticleActionsDialogProps) {
  const router = useRouter();
  const previewHref = useMemo(() => {
    if (!article) return "#";
    return article.status === "published"
      ? `/articles/${article.slug}`
      : `/dashboard/articles/${article.id}/edit`;
  }, [article]);

  if (!article) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl space-y-4">
        <DialogHeader>
          <DialogTitle>Manage “{article.title}”</DialogTitle>
          <DialogDescription>
            Update status, preview content, or jump to the full editor.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-wrap items-center gap-4">
          <Badge variant={article.status === "published" ? "default" : "secondary"}>
            {article.status}
          </Badge>
          {article.category && (
            <Badge variant="outline">{article.category.name}</Badge>
          )}
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Status</label>
          <select
            className="w-full rounded-md border border-input bg-background p-2"
            value={article.status}
            disabled={isUpdating}
            onChange={(event) =>
              onChangeStatus(event.target.value as Article["status"])
            }
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option === "published" ? "Published" : "Draft"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Excerpt</p>
          <p className="rounded-md border bg-muted/30 p-3 text-sm text-muted-foreground">
            {article.excerpt || "No excerpt provided."}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-medium">Estimated read time</p>
          <Badge variant="outline">{article.readTimeMins ?? 0} min</Badge>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Preview</p>
          <div className="rounded-md border bg-background p-3">
            <RichTextRenderer html={article.content} />
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <Button variant="outline" asChild>
            <Link href={previewHref} target="_blank" rel="noreferrer">
              {article.status === "published" ? "View article" : "Open draft"}
            </Link>
          </Button>
          <Button
            variant="default"
            onClick={() => {
              onOpenChange(false);
              router.push(`/dashboard/articles/${article.id}/edit`);
            }}
          >
            Edit on page
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
