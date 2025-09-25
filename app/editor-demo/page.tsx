"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MarkdownEditor } from "@/components/markdown-editor";
import { QuillEditor } from "@/components/quill-editor";
import { 
  Type,
  FileText,
  Eye,
  EyeOff,
  Download
} from "lucide-react";

export default function EditorDemoPage() {
  const [markdownContent, setMarkdownContent] = useState(`# Welcome to the Editor Demo

This is a **Markdown editor** with live preview capabilities.

## Features

- **Bold text** and *italic text*
- \`inline code\` and code blocks
- [Links](https://example.com)
- Lists and more!

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

> This is a blockquote

---

## Try it out!

Edit this content to see the live preview update.`);

  const [quillContent, setQuillContent] = useState(`<h1>Welcome to the Rich Text Editor</h1>
<p>This is a <strong>Quill editor</strong> with a full toolbar and rich formatting options.</p>
<h2>Features</h2>
<ul>
  <li><strong>Bold text</strong> and <em>italic text</em></li>
  <li><code>Inline code</code> and code blocks</li>
  <li><a href="https://example.com">Links</a></li>
  <li>Lists, quotes, and more!</li>
</ul>
<blockquote>
  <p>This is a blockquote</p>
</blockquote>
<hr>
<h2>Try it out!</h2>
<p>Use the toolbar above to format your text. You can also toggle the preview mode.</p>`);

  const [showMarkdownPreview, setShowMarkdownPreview] = useState(false);
  const [showQuillPreview, setShowQuillPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate save
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const downloadContent = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Editor Comparison Demo</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Compare our Markdown editor and Rich Text (Quill) editor side by side. 
            Both editors are designed for different use cases and user preferences.
          </p>
        </div>

        {/* Editor Comparison */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Markdown Editor */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-6 w-6 text-blue-600" />
                    <span>Markdown Editor</span>
                  </CardTitle>
                  <CardDescription>
                    Perfect for structured writing with syntax highlighting and live preview
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowMarkdownPreview(!showMarkdownPreview)}
                  >
                    {showMarkdownPreview ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-2" />
                        Hide Preview
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Show Preview
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadContent(markdownContent, 'markdown-content.md')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <MarkdownEditor
                value={markdownContent}
                onChange={setMarkdownContent}
                placeholder="Start writing in Markdown..."
                height={400}
              />
            </CardContent>
          </Card>

          {/* Quill Editor */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Type className="h-6 w-6 text-green-600" />
                    <span>Rich Text Editor</span>
                  </CardTitle>
                  <CardDescription>
                    Visual editing with toolbar, perfect for non-technical users
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadContent(quillContent, 'quill-content.html')}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <QuillEditor
                value={quillContent}
                onChange={setQuillContent}
                placeholder="Start writing with rich text..."
                showPreview={showQuillPreview}
                onPreviewToggle={setShowQuillPreview}
                onSave={handleSave}
                isSaving={isSaving}
              />
            </CardContent>
          </Card>
        </div>

        {/* Feature Comparison */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Feature Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Markdown Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Markdown Editor</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">✓</Badge>
                    <span>Syntax highlighting</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">✓</Badge>
                    <span>Live preview</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">✓</Badge>
                    <span>Keyboard shortcuts</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">✓</Badge>
                    <span>Version control friendly</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">✓</Badge>
                    <span>Lightweight</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">✓</Badge>
                    <span>Developer-friendly</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Best for:</h4>
                  <p className="text-sm text-blue-800">
                    Technical writers, developers, and users who prefer structured writing with syntax highlighting.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quill Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Type className="h-5 w-5 text-green-600" />
                  <span>Rich Text Editor</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">✓</Badge>
                    <span>Visual toolbar</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">✓</Badge>
                    <span>WYSIWYG editing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">✓</Badge>
                    <span>Image upload</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">✓</Badge>
                    <span>Auto-save</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">✓</Badge>
                    <span>Word count</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">✓</Badge>
                    <span>User-friendly</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Best for:</h4>
                  <p className="text-sm text-green-800">
                    Content creators, bloggers, and users who prefer visual editing with a rich toolbar.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Usage Guidelines</CardTitle>
              <CardDescription>
                When to use each editor based on your content needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-blue-600">Use Markdown Editor for:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Technical documentation</li>
                    <li>• Code tutorials and guides</li>
                    <li>• Structured content with headings</li>
                    <li>• Content that needs version control</li>
                    <li>• When you prefer keyboard shortcuts</li>
                    <li>• Lightweight, fast editing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">Use Rich Text Editor for:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Blog posts and articles</li>
                    <li>• Content with images and media</li>
                    <li>• Non-technical users</li>
                    <li>• Visual formatting requirements</li>
                    <li>• Collaborative editing</li>
                    <li>• Quick, visual content creation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
