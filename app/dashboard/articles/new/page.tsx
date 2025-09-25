"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarkdownEditor } from "@/components/markdown-editor";
import { 
  Save, 
  Eye, 
  Send, 
  ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default function NewArticlePage() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: "",
    status: "draft" as "draft" | "published"
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving draft:', formData);
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Publishing article:', formData);
    } catch (error) {
      console.error('Failed to publish:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const categories = [
    "Artificial Intelligence",
    "Machine Learning", 
    "Data Science",
    "Startup Stories",
    "Tech Policy",
    "Innovation"
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          {/* Mobile: Stack vertically */}
          <div className="flex flex-col space-y-4 lg:hidden">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/articles">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
              <div className="flex items-center space-x-1">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  <Save className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  disabled={!formData.title || !formData.content}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm"
                  onClick={handlePublish}
                  disabled={!formData.title || !formData.content || isPublishing}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Write New Article</h1>
              <p className="text-sm text-muted-foreground">
                Share your insights with the African tech community
              </p>
            </div>
          </div>

          {/* Desktop: Horizontal layout */}
          <div className="hidden lg:flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/articles">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Articles
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Write New Article</h1>
                <p className="text-muted-foreground">
                  Share your insights with the African tech community
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                onClick={handleSave}
                disabled={isSaving}
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>
              <Button 
                variant="outline"
                disabled={!formData.title || !formData.content}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button 
                onClick={handlePublish}
                disabled={!formData.title || !formData.content || isPublishing}
              >
                <Send className="w-4 h-4 mr-2" />
                {isPublishing ? "Publishing..." : "Publish"}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Article Title */}
            <Card>
              <CardHeader>
                <CardTitle>Article Title</CardTitle>
                <CardDescription>
                  Choose a compelling title that captures your readers' attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  name="title"
                  placeholder="Enter your article title..."
                  value={formData.title}
                  onChange={handleChange}
                  className="text-xl"
                />
              </CardContent>
            </Card>

            {/* Article Excerpt */}
            <Card>
              <CardHeader>
                <CardTitle>Excerpt</CardTitle>
                <CardDescription>
                  Write a brief summary of your article (2-3 sentences)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  name="excerpt"
                  placeholder="Write a compelling excerpt that summarizes your article..."
                  value={formData.excerpt}
                  onChange={handleChange}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>

            {/* Article Content */}
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
                <CardDescription>
                  Write your article content using Markdown. You can preview your content in real-time.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MarkdownEditor
                  value={formData.content}
                  onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                  placeholder="Start writing your article here... Use Markdown syntax to format your text."
                  height={500}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publishing Options */}
            <Card>
              <CardHeader>
                <CardTitle>Publishing</CardTitle>
                <CardDescription>
                  Control when and how your article is published
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as "draft" | "published" }))}
                    className="w-full mt-1 p-2 border border-input rounded-md bg-background"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p><strong>Draft:</strong> Save for later editing</p>
                  <p><strong>Published:</strong> Make visible to readers</p>
                </div>
              </CardContent>
            </Card>

            {/* Category */}
            <Card>
              <CardHeader>
                <CardTitle>Category</CardTitle>
                <CardDescription>
                  Choose the most relevant category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <select
                  name="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2 border border-input rounded-md bg-background"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  Add relevant tags (comma-separated)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Input
                  name="tags"
                  placeholder="AI, Africa, Innovation"
                  value={formData.tags}
                  onChange={handleChange}
                />
                <div className="mt-2">
                  {formData.tags.split(',').filter(tag => tag.trim()).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="mr-1 mb-1">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Auto-save Status */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Auto-save enabled</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Your changes are automatically saved every 30 seconds
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
