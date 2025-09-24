import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Article } from '@/types'

// Mock data for articles
const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of Web Development',
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
    categoryId: 'tech',
    readTime: 5,
    authorId: 'author1',
    tags: ['web', 'development', 'future'],
    featured: true,
    status: 'published',
    slug: 'the-future-of-web-development',
    content: 'Content of the article...',
    createdAt: '2023-06-15T00:00:00Z',
    updatedAt: '2023-06-15T00:00:00Z',
    publishDate: '2023-06-15T00:00:00Z',
    publishedAt: '2023-06-15T00:00:00Z',
  },
  {
    id: '2',
    title: 'Building Sustainable Applications',
    excerpt: 'How to create applications that are both environmentally and economically sustainable.',
    categoryId: 'software',
    readTime: 8,
    authorId: 'author2',
    tags: ['sustainability', 'applications'],
    featured: false,
    status: 'published',
    slug: 'building-sustainable-applications',
    content: 'Content of the article...',
    createdAt: '2023-06-10T00:00:00Z',
    updatedAt: '2023-06-10T00:00:00Z',
    publishDate: '2023-06-10T00:00:00Z',
    publishedAt: '2023-06-10T00:00:00Z',
  },
  {
    id: '3',
    title: 'The Art of User Experience',
    excerpt: 'Understanding the principles that make digital products truly delightful to use.',
    categoryId: 'design',
    readTime: 6,
    authorId: 'author3',
    tags: ['ux', 'design', 'user-experience'],
    featured: true,
    status: 'published',
    slug: 'the-art-of-user-experience',
    content: 'Content of the article...',
    createdAt: '2023-06-05T00:00:00Z',
    updatedAt: '2023-06-05T00:00:00Z',
    publishDate: '2023-06-05T00:00:00Z',
    publishedAt: '2023-06-05T00:00:00Z',
  },
  {
    id: '4',
    title: 'Machine Learning in Everyday Applications',
    excerpt: 'How machine learning is being integrated into the apps we use daily.',
    categoryId: 'ai',
    readTime: 10,
    authorId: 'author4',
    tags: ['ml', 'ai', 'applications'],
    featured: false,
    status: 'published',
    slug: 'machine-learning-in-everyday-applications',
    content: 'Content of the article...',
    createdAt: '2023-05-28T00:00:00Z',
    updatedAt: '2023-05-28T00:00:00Z',
    publishDate: '2023-05-28T00:00:00Z',
    publishedAt: '2023-05-28T00:00:00Z',
  },
  {
    id: '5',
    title: 'Cybersecurity Best Practices for 2023',
    excerpt: 'Essential security measures every developer should implement in their applications.',
    categoryId: 'security',
    readTime: 7,
    authorId: 'author5',
    tags: ['security', 'cybersecurity', 'best-practices'],
    featured: false,
    status: 'published',
    slug: 'cybersecurity-best-practices-for-2023',
    content: 'Content of the article...',
    createdAt: '2023-05-20T00:00:00Z',
    updatedAt: '2023-05-20T00:00:00Z',
    publishDate: '2023-05-20T00:00:00Z',
    publishedAt: '2023-05-20T00:00:00Z',
  },
  {
    id: '6',
    title: 'The Rise of Low-Code Platforms',
    excerpt: 'How low-code development is changing the landscape of software creation.',
    categoryId: 'technology',
    readTime: 4,
    authorId: 'author6',
    tags: ['low-code', 'platforms', 'development'],
    featured: false,
    status: 'published',
    slug: 'the-rise-of-low-code-platforms',
    content: 'Content of the article...',
    createdAt: '2023-05-15T00:00:00Z',
    updatedAt: '2023-05-15T00:00:00Z',
    publishDate: '2023-05-15T00:00:00Z',
    publishedAt: '2023-05-15T00:00:00Z',
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Fetch all articles
export const useArticles = () => {
  return useQuery<Article[], Error>({
    queryKey: ['articles'],
    queryFn: async () => {
      // Simulate API call delay
      await delay(500)
      return mockArticles
    },
  })
}

// Fetch a single article by ID
export const useArticle = (id: string) => {
  return useQuery<Article, Error>({
    queryKey: ['article', id],
    queryFn: async () => {
      // Simulate API call delay
      await delay(300)
      const article = mockArticles.find(article => article.id === id)
      if (!article) {
        throw new Error('Article not found')
      }
      return article
    },
  })
}

// Create a new article
export const useCreateArticle = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (newArticle: Omit<Article, 'id' | 'createdAt' | 'updatedAt'>) => {
      // Simulate API call delay
      await delay(500)
      // In a real app, this would be an API call
      const article: Article = {
        ...newArticle,
        id: Math.random().toString(36).substring(7),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      return article
    },
    onSuccess: () => {
      // Invalidate and refetch articles
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
  })
}

// Update an existing article
export const useUpdateArticle = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, ...updateData }: { id: string } & Partial<Article>) => {
      // Simulate API call delay
      await delay(500)
      // In a real app, this would be an API call
      return {
        ...mockArticles.find(a => a.id === id),
        ...updateData,
        updatedAt: new Date().toISOString()
      }
    },
    onSuccess: (updatedArticle) => {
      // Update the article in the cache
      queryClient.setQueryData<Article[]>(['articles'], (oldArticles = []) =>
        oldArticles.map(article =>
          article.id === updatedArticle.id ? updatedArticle as Article : article
        )
      )
      
      // Update the single article cache
      queryClient.setQueryData(['article', updatedArticle.id], updatedArticle)
    },
  })
}