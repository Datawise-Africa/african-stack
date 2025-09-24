import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Heading } from '@tiptap/extension-heading'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { Link } from '@tiptap/extension-link'
import { Image } from '@tiptap/extension-image'
import { Underline } from '@tiptap/extension-underline'
import { BulletList } from '@tiptap/extension-bullet-list'
import { OrderedList } from '@tiptap/extension-ordered-list'
import { ListItem } from '@tiptap/extension-list-item'
import { Bold } from '@tiptap/extension-bold'
import { Italic } from '@tiptap/extension-italic'
import { Strike } from '@tiptap/extension-strike'
import { Code } from '@tiptap/extension-code'
import { CodeBlock } from '@tiptap/extension-code-block'
import { Blockquote } from '@tiptap/extension-blockquote'
import { HorizontalRule } from '@tiptap/extension-horizontal-rule'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useAuthStore } from '@/stores/authStore'
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  Strikethrough as StrikethroughIcon,
  Link as LinkIcon,
  List as ListIcon,
  ListOrdered as ListOrderedIcon,
  Heading1,
  Heading2,
  Heading3,
  Quote as QuoteIcon,
  Code as CodeIcon,
  Table as TableIcon,
  Image as ImageIcon,
  Minus as MinusIcon,
  Eye as EyeIcon,
  Pencil as PencilIcon,
} from 'lucide-react'

// Mock categories data
const categories = [
  { id: '1', name: 'Technology' },
  { id: '2', name: 'Design' },
  { id: '3', name: 'Business' },
  { id: '4', name: 'Science' },
]

// Mock tags data
const tags = [
  'React', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'Python', 
  'UI/UX', 'Design', 'Startup', 'Marketing', 'AI', 'Machine Learning'
]

const ArticleEditor = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [editorContent, setEditorContent] = useState('')
  const [previewMode, setPreviewMode] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [linkPopoverOpen, setLinkPopoverOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [imagePopoverOpen, setImagePopoverOpen] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // disable to use our custom heading
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Bold,
      Italic,
      Underline,
      Strike,
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
      }),
      BulletList,
      OrderedList,
      ListItem,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
      Code,
      CodeBlock,
      Blockquote,
      HorizontalRule,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML())
    },
  })

  // Load existing article if editing
  useEffect(() => {
    if (id) {
      // In a real app, you would fetch the article data from an API
      // For now, we'll just set some mock data
      setTitle('Sample Article Title')
      setExcerpt('This is a sample excerpt for the article.')
      setCategoryId('1')
      setSelectedTags(['React', 'JavaScript'])
      const content = '<p>This is the content of the sample article.</p>'
      editor?.commands.setContent(content)
      setEditorContent(content)
    }
  }, [id, editor])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // In a real app, you would send the data to an API
      // For now, we'll just simulate a successful save
      const articleData = {
        title,
        excerpt,
        content: editorContent,
        categoryId,
        tags: selectedTags,
        status,
        authorId: user?.id,
      }
      
      console.log('Saving article:', articleData)
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to the dashboard
      navigate('/dashboard')
    } catch (error) {
      console.error('Error saving article:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {id ? 'Edit Article' : 'Create New Article'}
        </h1>
        <p className="text-gray-600">
          {id 
            ? 'Edit your existing article' 
            : 'Write and publish your new article'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter article title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            placeholder="Brief summary of your article"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={status === 'draft' ? 'default' : 'outline'}
                onClick={() => setStatus('draft')}
              >
                Draft
              </Button>
              <Button
                type="button"
                variant={status === 'published' ? 'default' : 'outline'}
                onClick={() => setStatus('published')}
              >
                Publish
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Content</Label>
          <Tabs defaultValue="edit" className="w-full">
            <div className="flex justify-between items-center mb-2">
              <TabsList>
                <TabsTrigger value="edit" onClick={() => setPreviewMode(false)} className="flex items-center">
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Edit
                </TabsTrigger>
                <TabsTrigger value="preview" onClick={() => setPreviewMode(true)} className="flex items-center">
                  <EyeIcon className="h-4 w-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="edit" className="mt-0">
              {/* Editor Toolbar */}
              {editor && (
                <div className="border-b border-t rounded-t-md bg-gray-50 p-1 flex flex-wrap gap-1">
                  {/* Text Formatting */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'bg-gray-200' : ''}
                  >
                    <BoldIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'bg-gray-200' : ''}
                  >
                    <ItalicIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'bg-gray-200' : ''}
                  >
                    <UnderlineIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'bg-gray-200' : ''}
                  >
                    <StrikethroughIcon className="h-4 w-4" />
                  </Button>
                  
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  
                  {/* Headings */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}
                  >
                    <Heading1 className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}
                  >
                    <Heading2 className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}
                  >
                    <Heading3 className="h-4 w-4" />
                  </Button>
                  
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  
                  {/* Lists */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
                  >
                    <ListIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
                  >
                    <ListOrderedIcon className="h-4 w-4" />
                  </Button>
                  
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  
                  {/* Link */}
                  <Popover open={linkPopoverOpen} onOpenChange={setLinkPopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={editor.isActive('link') ? 'bg-gray-200' : ''}
                      >
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="link-url">URL</Label>
                        <div className="flex gap-2">
                          <Input
                            id="link-url"
                            value={linkUrl}
                            onChange={(e) => setLinkUrl(e.target.value)}
                            placeholder="https://example.com"
                          />
                          <Button
                            onClick={() => {
                              if (linkUrl) {
                                editor.chain().focus().setLink({ href: linkUrl }).run()
                              } else {
                                editor.chain().focus().unsetLink().run()
                              }
                              setLinkPopoverOpen(false)
                            }}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  
                  {/* Quote, Code, HR */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? 'bg-gray-200' : ''}
                  >
                    <QuoteIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'bg-gray-200' : ''}
                  >
                    <CodeIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  
                  <div className="w-px h-6 bg-gray-300 mx-1"></div>
                  
                  {/* Table */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                  >
                    <TableIcon className="h-4 w-4" />
                  </Button>
                  
                  {/* Image */}
                  <Popover open={imagePopoverOpen} onOpenChange={setImagePopoverOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                      >
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="image-url">Image URL</Label>
                        <div className="flex gap-2">
                          <Input
                            id="image-url"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                          />
                          <Button
                            onClick={() => {
                              if (imageUrl) {
                                editor.chain().focus().setImage({ src: imageUrl }).run()
                              }
                              setImagePopoverOpen(false)
                            }}
                          >
                            Insert
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )}
              
              {/* Editor Content */}
              <div className="border border-t-0 rounded-b-md">
                <EditorContent
                  editor={editor}
                  className="min-h-[300px] p-4 focus:outline-none prose max-w-none"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="mt-0">
              <div className="border rounded-md p-4 min-h-[300px] prose max-w-none">
                {previewMode && (
                  <div dangerouslySetInnerHTML={{ __html: editorContent }} />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Article'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ArticleEditor