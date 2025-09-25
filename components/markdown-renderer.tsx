"use client";

import dynamic from "next/dynamic";

// Dynamically import the markdown renderer to avoid SSR issues
const Markdown = dynamic(() => import("@uiw/react-md-editor").then((mod) => ({ default: mod.default.Markdown })), {
  ssr: false,
  loading: () => (
    <div className="h-32 flex items-center justify-center">
      <div className="text-muted-foreground">Loading content...</div>
    </div>
  ),
});

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-lg max-w-none dark:prose-invert ${className}`}>
      <Markdown
        source={content}
        style={{ whiteSpace: "pre-wrap" }}
      />
    </div>
  );
}
