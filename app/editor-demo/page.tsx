"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RichTextRenderer } from "@/components/rich-text-renderer";
import { TiptapEditor, type TiptapContentValue } from "@/components/tiptap-editor";

export default function EditorDemoPage() {
  const [content, setContent] = useState<TiptapContentValue>({
    html: "<h2>Welcome to the Tiptap playground</h2><p>Use the toolbar to apply formatting, insert media, and explore collaborative writing patterns.</p>",
    text: "",
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-2">
        <Badge variant="secondary" className="w-fit uppercase">
          Demo experience
        </Badge>
        <h1 className="text-3xl font-bold">Tiptap rich text demo</h1>
        <p className="text-muted-foreground max-w-2xl">
          This page demonstrates the collaborative-ready editor used throughout
          the dashboard. Switch between the editor and live preview tabs to see
          how your formatted content renders.
        </p>
      </div>

      <Tabs defaultValue="editor" className="mt-8">
        <TabsList>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="editor">
          <Card>
            <CardHeader>
              <CardTitle>Rich text editor</CardTitle>
            </CardHeader>
            <CardContent>
              <TiptapEditor
                value={content}
                onChange={(nextValue) => setContent(nextValue)}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Rendered preview</CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextRenderer html={content.html} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
