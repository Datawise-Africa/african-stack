"use client";

import type { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code2,
  Eye,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Palette,
  Quote,
  Redo2,
  Sparkles,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";
import { memo } from "react";

import { cn } from "@/lib/utils";

type ToolbarButtonProps = {
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive?: boolean;
  disabled?: boolean;
};

const ToolbarButton = ({
  onClick,
  icon: Icon,
  label,
  isActive,
  disabled,
}: ToolbarButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "flex items-center justify-center rounded-md border px-2 py-1 text-sm transition-colors",
      isActive
        ? "border-primary bg-primary text-primary-foreground shadow"
        : "border-transparent bg-background text-muted-foreground hover:bg-muted",
      disabled && "cursor-not-allowed opacity-50"
    )}
    title={label}
    aria-label={label}
  >
    <Icon className="h-4 w-4" />
  </button>
);

export type TiptapToolbarProps = {
  editor: Editor | null;
  disabled?: boolean;
  previewMode: boolean;
  onTogglePreview: () => void;
  onRequestImageUpload: () => void;
};

export const TiptapToolbar = memo(
  ({
    editor,
    disabled = false,
    previewMode,
    onTogglePreview,
    onRequestImageUpload,
  }: TiptapToolbarProps) => {
    if (!editor) {
      return null;
    }

    return (
      <div className="flex flex-wrap items-center gap-2 rounded-md border bg-background p-3">
        <div className="flex flex-wrap items-center gap-1">
          <ToolbarButton
            icon={Bold}
            label="Bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            disabled={disabled}
          />
          <ToolbarButton
            icon={Italic}
            label="Italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            disabled={disabled}
          />
          <ToolbarButton
            icon={UnderlineIcon}
            label="Underline"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive("underline")}
            disabled={disabled}
          />
          <ToolbarButton
            icon={Strikethrough}
            label="Strike"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
            disabled={disabled}
          />
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex flex-wrap items-center gap-1">
          <ToolbarButton
            icon={Heading1}
            label="Heading 1"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive("heading", { level: 1 })}
            disabled={disabled}
          />
          <ToolbarButton
            icon={Heading2}
            label="Heading 2"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive("heading", { level: 2 })}
            disabled={disabled}
          />
          <ToolbarButton
            icon={Heading3}
            label="Heading 3"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive("heading", { level: 3 })}
            disabled={disabled}
          />
          <ToolbarButton
            icon={Quote}
            label="Blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive("blockquote")}
            disabled={disabled}
          />
          <ToolbarButton
            icon={Code2}
            label="Code block"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive("codeBlock")}
            disabled={disabled}
          />
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex flex-wrap items-center gap-1">
          <ToolbarButton
            icon={List}
            label="Bullet list"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive("bulletList")}
            disabled={disabled}
          />
          <ToolbarButton
            icon={ListOrdered}
            label="Ordered list"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive("orderedList")}
            disabled={disabled}
          />
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex flex-wrap items-center gap-1">
          <ToolbarButton
            icon={AlignLeft}
            label="Align left"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            isActive={editor.isActive({ textAlign: "left" })}
            disabled={disabled}
          />
          <ToolbarButton
            icon={AlignCenter}
            label="Align center"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            isActive={editor.isActive({ textAlign: "center" })}
            disabled={disabled}
          />
          <ToolbarButton
            icon={AlignRight}
            label="Align right"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            isActive={editor.isActive({ textAlign: "right" })}
            disabled={disabled}
          />
          <ToolbarButton
            icon={AlignJustify}
            label="Justify"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            isActive={editor.isActive({ textAlign: "justify" })}
            disabled={disabled}
          />
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex flex-wrap items-center gap-1">
          <ToolbarButton
            icon={Link2}
            label="Link"
            onClick={() => {
              if (!editor) return;
              const previousUrl = editor.getAttributes("link").href;
              const url = window.prompt("Enter a URL", previousUrl);
              if (url === null) return;
              if (url === "") {
                editor.chain().focus().extendMarkRange("link").unsetLink().run();
                return;
              }
              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url, target: "_blank" })
                .run();
            }}
            isActive={editor.isActive("link")}
            disabled={disabled}
          />
          <ToolbarButton
            icon={ImageIcon}
            label="Insert image"
            onClick={onRequestImageUpload}
            disabled={disabled}
          />
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex flex-wrap items-center gap-1">
          <ToolbarButton
            icon={Undo2}
            label="Undo"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={disabled || !editor.can().undo()}
          />
          <ToolbarButton
            icon={Redo2}
            label="Redo"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={disabled || !editor.can().redo()}
          />
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex flex-wrap items-center gap-2">
          <ToolbarButton
            icon={Sparkles}
            label="Clear formatting"
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            disabled={disabled}
          />
          <ToolbarButton
            icon={Eye}
            label={previewMode ? "Hide preview" : "Show preview"}
            onClick={onTogglePreview}
            isActive={previewMode}
            disabled={disabled}
          />
          <div className="ml-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Palette className="h-4 w-4" />
            <input
              type="color"
              aria-label="Text color"
              className="h-6 w-10 cursor-pointer rounded border border-input bg-background"
              onChange={(event) =>
                editor.chain().focus().setColor(event.target.value).run()
              }
              disabled={disabled}
            />
            <Highlighter className="h-4 w-4" />
            <input
              type="color"
              aria-label="Highlight color"
              className="h-6 w-10 cursor-pointer rounded border border-input bg-background"
              onChange={(event) =>
                editor.chain().focus().setHighlight({ color: event.target.value }).run()
              }
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    );
  }
);

TiptapToolbar.displayName = "TiptapToolbar";
