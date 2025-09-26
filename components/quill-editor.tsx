"use client";

import { useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bold, 
  Italic, 
  Underline, 
  List,
  ListOrdered,
  Quote,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Eye,
  EyeOff,
  Save,
  Type
} from "lucide-react";

// Simple rich text editor using contentEditable
const SimpleRichEditor = ({ 
  value, 
  onChange, 
  placeholder, 
  readOnly = false 
}: { 
  value: string; 
  onChange: (value: string) => void; 
  placeholder?: string; 
  readOnly?: boolean; 
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  return (
    <div className="border rounded-lg">
      {/* Toolbar */}
      {!readOnly && (
        <div className="border-b p-2 flex flex-wrap gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('bold')}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('italic')}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('underline')}
            title="Underline"
          >
            <Underline className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('insertUnorderedList')}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('insertOrderedList')}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('formatBlock', 'h1')}
            title="Heading 1"
          >
            H1
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('formatBlock', 'h2')}
            title="Heading 2"
          >
            H2
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('formatBlock', 'h3')}
            title="Heading 3"
          >
            H3
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('formatBlock', 'blockquote')}
            title="Quote"
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('formatBlock', 'pre')}
            title="Code Block"
          >
            <Code className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-border mx-1" />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('justifyLeft')}
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('justifyCenter')}
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => execCommand('justifyRight')}
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable={!readOnly}
        onInput={handleInput}
        className="min-h-[400px] p-4 focus:outline-none prose prose-sm max-w-none"
        style={{ minHeight: '400px' }}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />
      
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
  showPreview?: boolean;
  onPreviewToggle?: (show: boolean) => void;
  onSave?: () => void;
  isSaving?: boolean;
}

export function QuillEditor({
  value,
  onChange,
  placeholder = "Start writing your article...",
  className = "",
  readOnly = false,
  showPreview = false,
  onPreviewToggle,
  onSave,
  isSaving = false
}: QuillEditorProps) {
  // Removed quillRef, modules, and formats since we're using SimpleRichEditor

  // Auto-save functionality
  useEffect(() => {
    if (!readOnly && value) {
      const autoSaveTimer = setTimeout(() => {
        if (onSave) {
          onSave();
        }
      }, 2000); // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(autoSaveTimer);
    }
  }, [value, readOnly, onSave]);

  const handleChange = (content: string) => {
    onChange(content);
  };

  const getWordCount = () => {
    if (!value) return 0;
    // Remove HTML tags and count words
    const text = value.replace(/<[^>]*>/g, '');
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getCharacterCount = () => {
    if (!value) return 0;
    const text = value.replace(/<[^>]*>/g, '');
    return text.length;
  };

  const getReadingTime = () => {
    const words = getWordCount();
    const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words per minute
    return readingTime;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Editor Toolbar */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center space-x-2">
              <Type className="h-5 w-5" />
              <span>Rich Text Editor</span>
            </CardTitle>
            
            <div className="flex items-center space-x-2">
              {/* Word Count */}
              <Badge variant="outline" className="text-xs">
                {getWordCount()} words
              </Badge>
              
              {/* Character Count */}
              <Badge variant="outline" className="text-xs">
                {getCharacterCount()} chars
              </Badge>
              
              {/* Reading Time */}
              <Badge variant="outline" className="text-xs">
                ~{getReadingTime()} min read
              </Badge>
              
              {/* Preview Toggle */}
              {onPreviewToggle && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onPreviewToggle(!showPreview)}
                >
                  {showPreview ? (
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
              )}
              
              {/* Save Button */}
              {onSave && (
                <Button
                  size="sm"
                  onClick={onSave}
                  disabled={isSaving}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Save"}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="border-t">
            <SimpleRichEditor
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              readOnly={readOnly}
            />
          </div>
        </CardContent>
      </Card>

      {/* Preview Mode */}
      {showPreview && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Eye className="h-5 w-5" />
              <span>Preview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              className="prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: value || '<p class="text-muted-foreground">No content to preview</p>' }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Export a read-only version for displaying content
export function QuillViewer({ 
  content, 
  className = "" 
}: { 
  content: string; 
  className?: string; 
}) {
  return (
    <div 
      className={`prose prose-sm max-w-none dark:prose-invert ${className}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
