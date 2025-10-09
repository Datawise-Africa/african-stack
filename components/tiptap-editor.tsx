"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import { cn } from "@/lib/utils";
import {
  ALLOWED_IMAGE_TYPES,
  createTiptapExtensions,
} from "@/components/tiptap/extensions";
import { TiptapToolbar } from "@/components/tiptap/toolbar";

export type TiptapContentValue = {
  html: string;
  text: string;
};

export interface TiptapEditorProps {
  value?: Partial<TiptapContentValue>;
  defaultValue?: Partial<TiptapContentValue>;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  characterLimit?: number;
  onChange?: (value: TiptapContentValue) => void;
  onImageUpload?: (file: File) => Promise<string>;
}

const DEFAULT_HTML = "<p></p>";

export function TiptapEditor({
  value,
  defaultValue,
  placeholder,
  disabled = false,
  className,
  characterLimit = 10000,
  onChange,
  onImageUpload,
}: TiptapEditorProps) {
  const initialHtml = value?.html ?? defaultValue?.html ?? DEFAULT_HTML;
  const [previewMode, setPreviewMode] = useState(false);
  const latestHtmlRef = useRef(initialHtml);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: createTiptapExtensions(placeholder),
    editable: !disabled,
    content: initialHtml,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const text = editor.getText();
      latestHtmlRef.current = html;
      onChange?.({ html, text });
    },
  });

  const characterCount = editor?.storage.characterCount?.characters() ?? 0;

  useEffect(() => {
    if (!editor) return;
    if (
      typeof value?.html === "string" &&
      value.html !== latestHtmlRef.current
    ) {
      editor.commands.setContent(value.html, {
        parseOptions: { preserveWhitespace: "full" },
      });
      latestHtmlRef.current = value.html;
    }
  }, [editor, value?.html]);

  const handleImageSelection = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file || !editor) return;

      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        alert("Please upload a valid image file (png, jpg, jpeg, webp).");
        return;
      }

      let imageUrl: string | undefined;

      if (onImageUpload) {
        imageUrl = await onImageUpload(file);
      } else {
        imageUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject(new Error("Failed to read image file"));
          reader.readAsDataURL(file);
        });
      }

      if (imageUrl) {
        editor.chain().focus().setImage({ src: imageUrl }).run();
      }

      event.target.value = "";
    },
    [editor, onImageUpload]
  );

  const requestImageUpload = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const currentHtml = useMemo(
    () => (previewMode ? latestHtmlRef.current : ""),
    [previewMode]
  );

  if (!editor) {
    return (
      <div className="flex min-h-[300px] items-center justify-center rounded-md border bg-muted/20 text-muted-foreground">
        Initializing editor…
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <TiptapToolbar
        editor={editor}
        disabled={disabled}
        previewMode={previewMode}
        onTogglePreview={() => setPreviewMode((prev) => !prev)}
        onRequestImageUpload={requestImageUpload}
      />

      <div
        className={cn(
          "rounded-md border bg-background",
          disabled && "pointer-events-none opacity-60"
        )}
      >
        {!previewMode && <EditorContent editor={editor} className="tiptap" />}
        {previewMode && (
          <div className="tiptap p-4">
            <div dangerouslySetInnerHTML={{ __html: currentHtml }} />
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="font-medium">
            {previewMode ? "Preview" : "Editing"}
          </span>
        </div>
        <div>
          {characterCount.toLocaleString()} / {characterLimit.toLocaleString()}{" "}
          characters
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_IMAGE_TYPES.join(",")}
        className="hidden"
        onChange={handleImageSelection}
        aria-hidden
      />
    </div>
  );
}
