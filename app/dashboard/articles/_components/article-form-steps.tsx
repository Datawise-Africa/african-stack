"use client";

import Image from "next/image";
import type { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { BookOpenCheck, Eye, Palette, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { TiptapEditor } from "@/components/tiptap-editor";
import { createFormStep } from "@/hooks/use-multistep-form";
import type { Category, Collection } from "@/lib/types";
import { estimateReadTime } from "../_utils/form-utils";
import { TagInput } from "@/components/ui/tag-input";
import { useEffect } from "react";

export const DEFAULT_CONTENT_HTML = "<p></p>";

export const articleFormSchema = z.object({
  title: z.string().min(4, "Add a descriptive title."),
  excerpt: z.string().min(20, "Write an excerpt with at least 20 characters."),
  tags: z
    .array(z.string().trim().min(1, "Tags cannot be empty."))
    .optional()
    .default([]),
  thumbnailUrl: z
    .string()
    .optional()
    .transform((value) => value?.trim() ?? "")
    .refine((value) => !value || /^https?:\/\//.test(value), {
      message: "Use a valid http or https URL.",
    }),
  categoryId: z.string().min(1, "Select a category."),
  collectionId: z.string().optional().default(""),
  status: z.enum(["draft", "published"]),
  readTimeMins: z
    .union([z.number(), z.string()])
    .optional()
    .transform((value) => {
      if (typeof value === "number") return value;
      if (typeof value === "string" && value.trim() !== "") {
        const parsed = Number(value);
        return Number.isNaN(parsed) ? undefined : parsed;
      }
      return undefined;
    }),
  contentHtml: z.string().min(1, "Write your article content."),
});

export type ArticleFormValues = z.infer<typeof articleFormSchema>;

export const articleDefaultValues: ArticleFormValues = {
  title: "",
  excerpt: "",
  tags: [],
  thumbnailUrl: "",
  categoryId: "",
  collectionId: "",
  status: "draft",
  readTimeMins: undefined,
  contentHtml: DEFAULT_CONTENT_HTML,
};

type StepComponentProps = {
  form: UseFormReturn<ArticleFormValues>;
};

type MetadataStepProps = StepComponentProps & {
  categories: Category[];
  collections: Collection[];
};

type ContentStepProps = StepComponentProps & {
  defaultContentHtml?: string;
};

function StoryBasicsStep({ form }: StepComponentProps) {
  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Article title</FormLabel>
            <Input placeholder="Write a compelling headline" {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="excerpt"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Excerpt</FormLabel>
            <Textarea
              className="min-h-[120px]"
              placeholder="Summarize your article in 2–3 sentences."
              {...field}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <TagInput
              value={field.value ?? []}
              onChange={(next) => field.onChange(next)}
              placeholder="Add tag and press Enter"
            />
            <p className="text-xs text-muted-foreground">
              Press Enter to add each tag. Tags help with discovery.
            </p>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function MetadataStep({ form, categories, collections }: MetadataStepProps) {
  const readTime = form.watch("readTimeMins") ?? 0;
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="thumbnailUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail URL</FormLabel>
              <Input placeholder="https://example.com/cover.jpg" {...field} />
              {field.value && (
                <div className="mt-3 overflow-hidden rounded-md border">
                  <Image
                    src={field.value}
                    alt="Article thumbnail preview"
                    width={800}
                    height={400}
                    className="h-36 w-full object-cover"
                    unoptimized
                  />
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <select
                className="w-full rounded-md border border-input bg-background p-2"
                value={field.value}
                onChange={field.onChange}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="collectionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection (optional)</FormLabel>
              <select
                className="w-full rounded-md border border-input bg-background p-2"
                value={field.value}
                onChange={field.onChange}
              >
                <option value="">No collection</option>
                {collections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name}
                  </option>
                ))}
              </select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <select
                className="w-full rounded-md border border-input bg-background p-2"
                value={field.value}
                onChange={field.onChange}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="rounded-md border bg-muted/40 p-3 text-sm">
          <p className="text-xs uppercase text-muted-foreground">Estimated read time</p>
          <p className="font-medium">{readTime || 0} min</p>
        </div>
      </div>
    </div>
  );
}

function ContentStep({
  form,
  defaultContentHtml = DEFAULT_CONTENT_HTML,
}: ContentStepProps) {
  const htmlValue = form.watch("contentHtml");
  const title = form.watch("title");
  const excerpt = form.watch("excerpt");
  const readTime = estimateReadTime(htmlValue ?? defaultContentHtml);

  useEffect(() => {
    const current = form.getValues("readTimeMins");
    if (current !== readTime) {
      form.setValue("readTimeMins", readTime, {
        shouldDirty: false,
        shouldTouch: false,
      });
    }
  }, [form, readTime]);

  useEffect(() => {
    const current = form.getValues("readTimeMins");
    if (current !== readTime) {
      form.setValue("readTimeMins", readTime, {
        shouldDirty: false,
        shouldTouch: false,
      });
    }
  }, [form, readTime]);

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="contentHtml"
        render={() => (
          <FormItem>
            <FormLabel>Article content</FormLabel>
            <TiptapEditor
              value={{
                html: htmlValue ?? defaultContentHtml,
                text: "",
              }}
              onChange={(value) => {
                form.setValue("contentHtml", value.html, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              placeholder="Start writing your article..."
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Preview</CardTitle>
            <CardDescription>
              Rendered exactly how it will appear on the article page.
            </CardDescription>
          </div>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            Live
          </Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          <h3 className="text-xl font-semibold">
            {title || "Untitled article"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {excerpt || "Add an excerpt to summarize your story."}
          </p>
          <RichTextRenderer html={form.watch("contentHtml")} />
        </CardContent>
      </Card>
    </div>
  );
}

type BuildStepsArgs = {
  categories: Category[];
  collections: Collection[];
};

export function buildArticleSteps({ categories, collections }: BuildStepsArgs) {
  return [
    createFormStep({
      title: "Story basics",
      description: "Craft a headline, summary, and discovery tags.",
      Icon: Sparkles,
      fields: ["title", "excerpt", "tags"],
      render: (form) => <StoryBasicsStep form={form} />, 
      schema: articleFormSchema,
    }),
    createFormStep({
      title: "Metadata",
      description: "Attach visuals, category, collections, and status.",
      Icon: Palette,
      fields: ["thumbnailUrl", "categoryId", "collectionId", "status"],
      render: (form) => (
        <MetadataStep
          form={form}
          categories={categories}
          collections={collections}
        />
      ),
      schema: articleFormSchema,
    }),
    createFormStep({
      title: "Write & preview",
      description: "Compose your story with Tiptap and review instantly.",
      Icon: BookOpenCheck,
      fields: ["contentHtml"],
      render: (form) => <ContentStep form={form} />,
      schema: articleFormSchema,
    }),
  ];
}
