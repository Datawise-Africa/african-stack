"use client";

import { BookOpen, Clock, FileText, Pen } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export type ArticleStatsCardsProps = {
  totalArticles: number;
  publishedCount: number;
  draftCount: number;
  averageReadTime?: number;
  isPending?: boolean;
};

const formatValue = (value: number, fallback: number | string = "—") =>
  Number.isFinite(value) ? value : fallback;

export function ArticleStatsCards({
  totalArticles,
  publishedCount,
  draftCount,
  averageReadTime,
  isPending,
}: ArticleStatsCardsProps) {
  const cards = [
    {
      label: "Total articles",
      value: isPending ? "…" : formatValue(totalArticles, 0),
      icon: BookOpen,
    },
    {
      label: "Published",
      value: isPending ? "…" : formatValue(publishedCount, 0),
      icon: FileText,
    },
    {
      label: "Drafts",
      value: isPending ? "…" : formatValue(draftCount, 0),
      icon: Pen,
    },
    {
      label: "Avg. read time",
      value: isPending
        ? "…"
        : `${formatValue(Math.round(averageReadTime ?? 0), 0)} min`,
      icon: Clock,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardContent className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-muted-foreground">{card.label}</p>
              <p className="text-2xl font-semibold">{card.value}</p>
            </div>
            <card.icon className="h-8 w-8 text-primary" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
