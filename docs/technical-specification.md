# Technical Specification for African Stack Application

## Overview
This document provides technical specifications for implementing the Medium-like application using React, Vite, and the specified technology stack.

## Technology Stack

### Core Technologies
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Form Handling**: React Hook Form + Zod
- **UI Components**: ShadCN UI
- **Rich Text Editor**: TipTap
- **Data Tables**: TanStack Tables
- **Testing**: Vitest (unit), Cypress (E2E)

### Development Tools
- **Package Manager**: npm or yarn
- **Code Formatting**: Prettier
- **Linting**: ESLint with TypeScript and React plugins
- **Version Control**: Git
- **Deployment**: Vercel/Netlify or similar static hosting

## Project Structure

```
src/
├── app/
│   ├── routes/              # Route definitions
│   ├── providers/           # Context providers
│   └── App.tsx             # Main application component
├── components/
│   ├── ui/                 # ShadCN UI components
│   ├── layout/             # Layout components (Header, Footer, etc.)
│   └── common/             # Common reusable components
├── features/
│   ├── auth/               # Authentication system
│   │   ├── components/     # Auth-specific components
│   │   ├── hooks/          # Auth-specific hooks
│   │   ├── services/       # Auth API services
│   │   └── types/          # Auth-specific types
│   ├── articles/           # Article management
│   ├── comments/           # Comment system
│   ├── reactions/          # Reaction system
│   ├── podcasts/           # Podcast section
│   ├── dashboard/          # User dashboards
│   ├── newsletter/          # Newsletter subscription
│   └── analytics/          # Analytics tracking
├── lib/
│   ├── utils/              # Utility functions
│   └── constants/          # Application constants
├── hooks/                  # Custom React hooks
├── stores/                 # Zustand stores
├── types/                  # Global TypeScript types
├── services/               # API service definitions
├── styles/                 # Global styles and Tailwind config
└── assets/                 # Static assets (images, icons, etc.)
```

## State Management

### Zustand Store Structure

#### Auth Store
```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  register: (data: RegistrationData) => Promise<void>;
}
```

#### Article Store
```typescript
interface ArticleState {
  articles: Article[];
  currentArticle: Article | null;
  loading: boolean;
  fetchArticles: () => Promise<void>;
  fetchArticle: (id: string) => Promise<void>;
  createArticle: (data: ArticleCreationData) => Promise<Article>;
}
```

#### UI Store
```typescript
interface UIState {
  sidebarOpen: boolean;
  modalOpen: boolean;
  notifications: Notification[];
  setSidebarOpen: (open: boolean) => void;
  setModalOpen: (open: boolean) => void;
  addNotification: (notification: Notification) => void;
}
```

## Data Fetching

### TanStack Query Configuration

#### Query Client Setup
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```

#### Query Hooks
```typescript
// Example article query hook
const useArticles = (filters?: ArticleFilters) => {
  return useQuery({
    queryKey: ['articles', filters],
    queryFn: () => fetchArticles(filters),
  });
};

// Example article mutation hook
const useCreateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
};
```

## Routing

### Route Structure
```tsx
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="articles" element={<BlogArchive />} />
        <Route path="articles/:id" element={<ArticleDetail />} />
        <Route path="podcasts" element={<PodcastSection />} />
      </Route>

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        {/* Reader Dashboard */}
        <Route path="reader" element={<ReaderDashboard />} />
        
        {/* Creator Dashboard */}
        <Route path="creator" element={<CreatorLayout />}>
          <Route index element={<CreatorDashboard />} />
          <Route path="articles" element={<ArticleManagement />} />
          <Route path="profile" element={<ProfileManagement />} />
        </Route>
        
        {/* Admin Dashboard */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="articles" element={<ArticleReview />} />
          <Route path="categories" element={<CategoryManagement />} />
        </Route>
      </Route>
    </Routes>
  );
};
```

## Component Architecture

### Component Hierarchy
- **Layout Components**: Header, Footer, Sidebar
- **Page Components**: LandingPage, BlogArchive, ArticleDetail, etc.
- **Feature Components**: ArticleCard, CommentSection, ReactionButtons
- **UI Components**: Buttons, Forms, Modals from ShadCN UI
- **Form Components**: Custom form components with validation

### Component Patterns

#### Container-Presentational Pattern
```tsx
// Container Component
const ArticleDetailContainer = ({ articleId }: { articleId: string }) => {
  const { data: article, isLoading, error } = useArticle(articleId);
  
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;
  if (!article) return <NotFound />;
  
  return <ArticleDetailView article={article} />;
};

// Presentational Component
const ArticleDetailView = ({ article }: { article: Article }) => {
  return (
    <div className="article-detail">
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
      <ReactionSection articleId={article.id} />
      <CommentSection articleId={article.id} />
    </div>
  );
};
```

## Form Handling

### Zod Validation Schemas
```typescript
const articleSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().max(200, "Excerpt is too long").optional(),
  categoryId: z.string().uuid("Invalid category ID"),
  tags: z.array(z.string()).max(10, "Maximum 10 tags allowed"),
  featured: z.boolean(),
  status: z.enum(['draft', 'published']),
});

type ArticleFormData = z.infer<typeof articleSchema>;
```

### React Hook Form Integration
```tsx
const ArticleForm = () => {
  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: '',
      content: '',
      excerpt: '',
      categoryId: '',
      tags: [],
      featured: false,
      status: 'draft',
    },
  });
  
  const { mutate: createArticle } = useCreateArticle();
  
  const onSubmit = (data: ArticleFormData) => {
    createArticle(data);
  };
  
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Other form fields */}
      <Button type="submit">Submit</Button>
    </form>
  );
};
```

## Rich Text Editor (TipTap)

### Editor Configuration
```tsx
const ArticleEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      // Handle content updates
    },
  });
  
  return (
    <div className="editor">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
```

## Responsive Design

### Breakpoints
```css
/* Tailwind breakpoints */
screens: {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
}
```

### Masonry Layout Implementation
```tsx
const ArticleGrid = ({ articles }: { articles: Article[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};
```

## Testing Strategy

### Unit Testing with Vitest
```typescript
// Example component test
describe('ArticleCard', () => {
  it('renders article title correctly', () => {
    const article = {
      id: '1',
      title: 'Test Article',
      excerpt: 'Test excerpt',
    } as Article;
    
    render(<ArticleCard article={article} />);
    
    expect(screen.getByText('Test Article')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    const article = {
      id: '1',
      title: 'Test Article',
      excerpt: 'Test excerpt',
    } as Article;
    
    render(<ArticleCard article={article} onClick={handleClick} />);
    
    fireEvent.click(screen.getByText('Test Article'));
    
    expect(handleClick).toHaveBeenCalledWith('1');
  });
});
```

### E2E Testing with Cypress
```typescript
// Example E2E test
describe('Article Creation', () => {
  beforeEach(() => {
    cy.login('author@test.com', 'password');
    cy.visit('/creator/articles/new');
  });
  
  it('allows author to create an article', () => {
    cy.get('[data-testid="article-title"]').type('My New Article');
    cy.get('[data-testid="article-content"]').type('This is the content');
    cy.get('[data-testid="submit-button"]').click();
    
    cy.contains('Article created successfully').should('be.visible');
    cy.url().should('include', '/creator/articles');
  });
});
```

## Performance Considerations

### Code Splitting
```tsx
const LazyArticleDetail = lazy(() => import('./ArticleDetail'));
const LazyDashboard = lazy(() => import('./Dashboard'));

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/articles/:id" element={<LazyArticleDetail />} />
        <Route path="/dashboard/*" element={<LazyDashboard />} />
      </Routes>
    </Suspense>
  );
};
```

### Image Optimization
```tsx
const OptimizedImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="object-cover w-full h-full"
    />
  );
};
```

## Security Considerations

### Content Security Policy
- Restrict inline scripts
- Limit external resource loading
- Implement proper CORS policies

### Input Sanitization
- Sanitize user inputs on both client and server
- Use DOMPurify for HTML content
- Validate all form inputs

### Authentication Security
- Use HTTPS in production
- Implement proper session management
- Secure storage of authentication tokens

## Accessibility

### ARIA Labels
```tsx
const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <article 
      aria-labelledby={`article-title-${article.id}`}
      className="border rounded-lg p-4"
    >
      <h2 
        id={`article-title-${article.id}`} 
        className="text-xl font-bold"
      >
        {article.title}
      </h2>
      <p className="text-gray-600">{article.excerpt}</p>
      <button 
        aria-label={`Read more about ${article.title}`}
        className="text-blue-500"
      >
        Read More
      </button>
    </article>
  );
};
```

### Keyboard Navigation
- Ensure all interactive elements are focusable
- Implement proper focus management
- Use semantic HTML elements

## Deployment

### Build Process
```bash
# Development
npm run dev

# Production Build
npm run build

# Preview Production Build
npm run preview
```

### Environment Variables
```env
VITE_API_URL=https://api.example.com
VITE_MAILCHIMP_API_KEY=your-mailchimp-api-key
VITE_TINYMCE_API_KEY=your-tinymce-api-key
```

### CI/CD Pipeline
- Automated testing on pull requests
- Build verification
- Automated deployment to staging/production