"use client";

import React, { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { JSONContent } from "@tiptap/core";
import { createLowlight } from "lowlight";

import { cn } from "@/lib/utils";

export interface RichTextRendererProps {
  html?: string | null;
  json?: JSONContent | null;
  className?: string;
  emptyFallback?: React.ReactNode;
}

const extensions = [
  StarterKit,
  Link.configure({ openOnClick: true }),
  Image,
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TextStyle,
  Color,
  Highlight,
  CodeBlockLowlight.configure({
    lowlight: createLowlight(),
    defaultLanguage: "plaintext",
  }),
];

export function RichTextRenderer({
  html,
  json,
  className,
  emptyFallback = (
    <p className="text-sm text-muted-foreground">
      Content will appear here once you start writing.
    </p>
  ),
}: RichTextRendererProps) {
  const renderedHtml = useMemo(() => {
    if (html && html.trim().length > 0) {
      return html;
    }

    if (json && typeof json === "object") {
      return generateHTML(json, extensions);
    }

    return "";
  }, [html, json]);

  if (!renderedHtml) {
    return (
      <div
        className={cn(
          "tiptap prose prose-neutral dark:prose-invert max-w-none",
          className
        )}
      >
        {emptyFallback}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "tiptap prose prose-neutral dark:prose-invert max-w-none",
        className
      )}
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}
