"use client";

import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import {TextStyle} from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import StarterKit from "@tiptap/starter-kit";
import { createLowlight } from "lowlight";

export const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

const lowlight = createLowlight();

export const createTiptapExtensions = (placeholder?: string) => [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4],
    },
  }),
  Placeholder.configure({
    placeholder: placeholder ?? "Start writing your article...",
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    linkOnPaste: true,
    HTMLAttributes: {
      rel: "noopener noreferrer",
      target: "_blank",
      class: "text-primary underline underline-offset-2",
    },
  }),
  Underline,
  Image.configure({
    allowBase64: true,
    HTMLAttributes: {
      class: "rounded-lg border bg-muted/30 object-cover",
    },
  }),
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  CharacterCount,
  CodeBlockLowlight.configure({
    lowlight,
    defaultLanguage: "plaintext",
  }),
];

export { lowlight };
