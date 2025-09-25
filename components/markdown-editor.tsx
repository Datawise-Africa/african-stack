"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Edit3 } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the markdown editor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => (
    <div className="h-96 flex items-center justify-center border rounded-lg">
      <div className="text-muted-foreground">Loading editor...</div>
    </div>
  ),
});

// Import the Markdown component separately
const Markdown = dynamic(() => import("@uiw/react-md-editor").then((mod) => ({ default: mod.default.Markdown })), {
  ssr: false,
});

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
  className?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Start writing your article here...",
  height = 400,
  className = "",
}: MarkdownEditorProps) {
  const [previewMode, setPreviewMode] = useState<"edit" | "preview" | "split">("edit");

  const handleEditorChange = (val?: string) => {
    onChange(val || "");
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant={previewMode === "edit" ? "default" : "outline"}
            size="sm"
            onClick={() => setPreviewMode("edit")}
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button
            variant={previewMode === "preview" ? "default" : "outline"}
            size="sm"
            onClick={() => setPreviewMode("preview")}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button
            variant={previewMode === "split" ? "default" : "outline"}
            size="sm"
            onClick={() => setPreviewMode("split")}
          >
            <Eye className="w-4 h-4 mr-2" />
            Split
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {value.length} characters
        </div>
      </div>

      {/* Editor */}
      <Card>
        <CardContent className="p-0">
          {previewMode === "edit" && (
            <div className="min-h-[400px]">
              <MDEditor
                value={value}
                onChange={handleEditorChange}
                height={height}
                data-color-mode="light"
                visibleDragbar={false}
                hideToolbar={false}
                preview="edit"
                textareaProps={{
                  placeholder: placeholder,
                  style: {
                    fontSize: 14,
                    lineHeight: 1.6,
                  },
                }}
              />
            </div>
          )}

          {previewMode === "preview" && (
            <div className="min-h-[400px] p-6">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <Markdown
                  source={value}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              </div>
            </div>
          )}

          {previewMode === "split" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
              <div className="border-r">
                <MDEditor
                  value={value}
                  onChange={handleEditorChange}
                  height={height}
                  data-color-mode="light"
                  visibleDragbar={false}
                  hideToolbar={false}
                  preview="edit"
                  textareaProps={{
                    placeholder: placeholder,
                    style: {
                      fontSize: 14,
                      lineHeight: 1.6,
                    },
                  }}
                />
              </div>
              <div className="p-6 overflow-auto">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <Markdown
                    source={value}
                    style={{ whiteSpace: "pre-wrap" }}
                  />
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
