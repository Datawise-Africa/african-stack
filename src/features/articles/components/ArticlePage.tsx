import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
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
import SEO from '@/components/layout/SEO'

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

const ArticlePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPreview, setIsPreview] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate: () => {
      // Handle content updates if needed
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
      editor?.commands.setContent('<p>This is the content of the sample article.</p>')
    }
  }, [id, editor])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // In a real app, you would send the data to an API
      // For now, we'll just simulate a successful save
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirect to the creator dashboard
      navigate('/creator')
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

  const handlePublish = async () => {
    setStatus('published')
    // In a real app, you would send the data to an API to publish the article
    await new Promise(resolve => setTimeout(resolve, 1000))
    navigate('/creator')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO
        title={id ? 'Edit Article - African Stack' : 'Create New Article - African Stack'}
        description={id ? 'Edit your existing article' : 'Write and publish your new article'}
      />
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">
              {id ? 'Edit Article' : 'Create New Article'}
            </h1>
            <p className="text-gray-600">
              {id
                ? 'Edit your existing article'
                : 'Write and publish your new article'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsPreview(!isPreview)}
            >
              {isPreview ? 'Edit' : 'Preview'}
            </Button>
          </div>
        </div>
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
                Published
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Content</Label>
          {isPreview ? (
            <div className="border rounded-md p-4 min-h-[300px]">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: editor?.getHTML() || '' }}
              />
            </div>
          ) : (
            <div className="border rounded-md">
              <EditorContent
                editor={editor}
                className="min-h-[300px] p-4 focus:outline-none"
              />
            </div>
          )}
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
            onClick={() => navigate('/creator')}
          >
            Cancel
          </Button>
          <Button type="button" variant="secondary" onClick={handlePublish}>
            Publish
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Article'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ArticlePage