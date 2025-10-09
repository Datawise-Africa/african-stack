"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import type { Article } from "@/lib/types";
import { RichTextRenderer } from "@/components/rich-text-renderer";

export type ArticlePreviewDialogProps = {
  open: boolean;
  article: Article | null;
  onOpenChange: (open: boolean) => void;
};

export function ArticlePreviewDialog({
  open,
  article,
  onOpenChange,
}: ArticlePreviewDialogProps) {
  if (!article) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {article.title}
          </DialogTitle>
          <DialogDescription>
            {article.excerpt || "Previewing article content."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap gap-2 pb-2">
          <Badge variant={article.status === "published" ? "default" : "secondary"}>
            {article.status}
          </Badge>
          {article.category && <Badge variant="outline">{article.category.name}</Badge>}
          <Badge variant="outline">{article.readTimeMins ?? 0} min</Badge>
        </div>
        <div className="max-h-[50vh] overflow-auto rounded-md border bg-background p-4">
          <RichTextRenderer html={article.content} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
