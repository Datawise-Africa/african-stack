import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '@/stores/authStore'
import { useCreateArticle } from '@/features/articles/hooks/useArticles'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import RichTextEditor from './RichTextEditor'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

// Mock categories data (same as in ArticleEditor)
const categories = [
  { id: '1', name: 'Technology' },
  { id: '2', name: 'Design' },
  { id: '3', name: 'Business' },
  { id: '4', name: 'Science' },
]

// Mock tags data (same as in ArticleEditor)
const tags = [
  'React', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'Python', 
  'UI/UX', 'Design', 'Startup', 'Marketing', 'AI', 'Machine Learning'
]

// Define the Zod schema for article validation
const articleSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters' }).max(100, { message: 'Title must be less than 100 characters' }),
  excerpt: z.string().min(10, { message: 'Excerpt must be at least 10 characters' }).max(300, { message: 'Excerpt must be less than 300 characters' }),
  categoryId: z.string().min(1, { message: 'Please select a category' }),
  content: z.string().min(50, { message: 'Content must be at least 50 characters' }),
  tags: z.array(z.string()).min(1, { message: 'Please select at least one tag' }),
  status: z.enum(['draft', 'published']),
})

// Infer the type from the schema
type ArticleFormValues = z.infer<typeof articleSchema>

const ArticleCreatePage = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { mutateAsync: createArticle, isPending } = useCreateArticle()
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Initialize the form with React Hook Form and Zod validation
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      excerpt: '',
      categoryId: '',
      content: '',
      tags: [],
      status: 'draft',
    },
  })

  // Handle tag selection
  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => {
      const newTags = prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
      
      // Update the form value
      form.setValue('tags', newTags, { shouldValidate: true })
      return newTags
    })
  }

  // Handle form submission
  const onSubmit = async (data: ArticleFormValues) => {
    try {
      // Create the article
      await createArticle({
        ...data,
        authorId: user?.id || '',
        featured: false,
        slug: data.title.toLowerCase().replace(/\s+/g, '-'),
        readTime: Math.ceil(data.content.split(' ').length / 200), // Rough estimate of read time
        publishDate: data.status === 'published' ? new Date().toISOString() : undefined,
        publishedAt: data.status === 'published' ? new Date().toISOString() : undefined,
      })

      // Show success message
      toast.success('Article created successfully')
      
      // Navigate to the dashboard
      navigate('/dashboard/creator')
    } catch (error) {
      console.error('Error creating article:', error)
      toast.error('Failed to create article')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Article</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter article title" {...field} />
                    </FormControl>
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
                    <FormControl>
                      <Textarea 
                        placeholder="Brief summary of your article" 
                        rows={3} 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                      <div className="flex gap-4">
                        <Button
                          type="button"
                          variant={field.value === 'draft' ? 'default' : 'outline'}
                          onClick={() => field.onChange('draft')}
                        >
                          Draft
                        </Button>
                        <Button
                          type="button"
                          variant={field.value === 'published' ? 'default' : 'outline'}
                          onClick={() => field.onChange('published')}
                        >
                          Publish
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder="Write your article content here..."
                        label=""
                        error={form.formState.errors.content?.message}
                        showPreviewTab={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard/creator')}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? 'Creating...' : 'Create Article'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ArticleCreatePage