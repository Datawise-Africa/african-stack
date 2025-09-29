import { Article, Category, Comment, Reaction, Bookmark, ReadEvent, Collection } from '@/lib/types';

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    slug: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    description: 'Explore the latest developments in AI research, applications, and innovations from across Africa.',
    articleCount: 120,
    color: 'bg-blue-500',
  },
  {
    id: 'cat-2',
    slug: 'machine-learning',
    name: 'Machine Learning',
    description: 'Dive deep into machine learning algorithms, models, and real-world applications in African contexts.',
    articleCount: 85,
    color: 'bg-green-500',
  },
  {
    id: 'cat-3',
    slug: 'data-science',
    name: 'Data Science',
    description: 'Learn about data analysis, visualization, and insights that drive decision-making in African organizations.',
    articleCount: 95,
    color: 'bg-purple-500',
  },
  {
    id: 'cat-4',
    slug: 'startup-stories',
    name: 'Startup Stories',
    description: 'Inspiring stories of African entrepreneurs building innovative tech companies and solving local problems.',
    articleCount: 60,
    color: 'bg-orange-500',
  },
  {
    id: 'cat-5',
    slug: 'tech-policy',
    name: 'Tech Policy',
    description: 'Analysis of technology policies, regulations, and their impact on innovation across African countries.',
    articleCount: 40,
    color: 'bg-red-500',
  },
  {
    id: 'cat-6',
    slug: 'innovation',
    name: 'Innovation',
    description: 'Cutting-edge innovations, breakthrough technologies, and creative solutions emerging from Africa.',
    articleCount: 100,
    color: 'bg-yellow-500',
  },
];

// Mock Tags
export const mockTags = [
  'AI', 'Machine Learning', 'Data Science', 'Blockchain', 'NLP', 'Healthcare',
  'Startups', 'Innovation', 'Technology', 'Development', 'Africa', 'Transparency',
  'Languages', 'Supply Chain', 'Policy', 'Regulation', 'Research', 'Education'
].map((name, index) => ({
  id: `tag-${index + 1}`,
  name,
  slug: name.toLowerCase().replace(/\s+/g, '-'),
  color: `hsl(${index * 20}, 70%, 50%)`,
  articleCount: Math.floor(Math.random() * 50) + 1
}));

export const mockCollections: Collection[] = [
  {
    id: 'collection-1',
    name: 'AI Foundations',
    description: 'Core concepts and applications of artificial intelligence tailored for African innovators.',
    coverImageUrl: 'https://picsum.photos/seed/ai-foundations/800/400',
    articleCount: 3,
    updatedAt: '2024-01-18T09:00:00Z',
  },
  {
    id: 'collection-2',
    name: 'Healthcare Transformation',
    description: 'Machine learning and data science breakthroughs improving healthcare outcomes across the continent.',
    coverImageUrl: 'https://picsum.photos/seed/healthcare/800/400',
    articleCount: 2,
    updatedAt: '2024-01-14T11:30:00Z',
  },
  {
    id: 'collection-3',
    name: 'Blockchain & Transparency',
    description: 'Building trust and resilient supply chains with distributed technologies.',
    coverImageUrl: 'https://picsum.photos/seed/blockchain/800/400',
    articleCount: 1,
    updatedAt: '2024-01-12T16:45:00Z',
  },
];

// Mock Articles
export const mockArticles: Article[] = [
  {
    id: 'article-1',
    slug: 'building-ai-solutions-africa',
    title: 'Building AI Solutions in Africa: Challenges and Opportunities',
    excerpt: 'Learn how African developers are creating innovative AI solutions that address local challenges and drive economic growth across the continent.',
    contentJson: {
      type: 'doc',
      content: [
        {
          type: 'heading',
          attrs: { level: 2 },
          content: [{ type: 'text', text: 'Introduction' }]
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Africa is experiencing a digital transformation that\'s reshaping industries and creating new opportunities for innovation. In this article, we explore how AI is being leveraged across the continent to solve unique challenges and drive economic growth.'
            }
          ]
        }
      ]
    },
    author: {
      id: 'author-1',
      first_name: 'Dr. Sarah',
      last_name: 'Johnson',
      handle: 'sarahj',

    },
    category: mockCategories[0],
    tags: ['AI', 'Africa', 'Innovation', 'Technology', 'Development'],
    thumbnailUrl: 'https://picsum.photos/800/400?random=1',
    readTimeMins: 8,
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    status: 'published',
    reactionsCount: 42,
    commentsCount: 8,
    views: 1200,
    collectionId: 'collection-1',
    collection: { id: 'collection-1', name: 'AI Foundations' },
  },
  {
    id: 'article-2',
    slug: 'machine-learning-healthcare-africa',
    title: 'Machine Learning in Healthcare: African Perspectives',
    excerpt: 'Exploring how ML is transforming healthcare delivery across Africa, from diagnostic tools to treatment optimization.',
    contentJson: {},
    author: {
      id: 'author-2',
      first_name: 'Dr. Michael',
      last_name: 'Chen',
      handle: 'michaelc'
    },
    category: mockCategories[1],
    tags: ['ML', 'Healthcare', 'Africa'],
    thumbnailUrl: 'https://picsum.photos/800/400?random=2',
    readTimeMins: 6,
    publishedAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    status: 'published',
    reactionsCount: 28,
    commentsCount: 5,
    views: 890,
    collectionId: 'collection-2',
    collection: { id: 'collection-2', name: 'Healthcare Transformation' },
  },
  {
    id: 'article-3',
    slug: 'data-science-startups-africa',
    title: 'Data Science Startups: The African Advantage',
    excerpt: 'Why African data science startups are uniquely positioned for global success and what makes them different.',
    contentJson: {},
    author: {
      id: 'author-3',
      first_name: 'Aisha ',
      last_name: 'Okafor',
      handle: 'aishao'
    },
    category: mockCategories[2],
    tags: ['Data Science', 'Startups', 'Africa'],
    thumbnailUrl: 'https://picsum.photos/800/400?random=3',
    readTimeMins: 7,
    publishedAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-08T09:15:00Z',
    status: 'published',
    reactionsCount: 35,
    commentsCount: 12,
    views: 1100,
    collectionId: 'collection-1',
    collection: { id: 'collection-1', name: 'AI Foundations' },
  },
  {
    id: 'article-4',
    slug: 'blockchain-supply-chain-africa',
    title: 'Blockchain for Supply Chain Transparency in Africa',
    excerpt: 'How blockchain technology is revolutionizing supply chain management and reducing fraud in African markets.',
    contentJson: {},
    author: {
      id: 'author-4',
      first_name: 'Chinedu',
      last_name: 'Eze',
      handle: 'chinedue'
    },
    category: mockCategories[5],
    tags: ['Blockchain', 'Supply Chain', 'Transparency'],
    thumbnailUrl: 'https://picsum.photos/800/400?random=4',
    readTimeMins: 8,
    publishedAt: '2024-01-07T13:20:00Z',
    updatedAt: '2024-01-07T13:20:00Z',
    status: 'published',
    reactionsCount: 22,
    commentsCount: 7,
    views: 750,
    collectionId: 'collection-3',
    collection: { id: 'collection-3', name: 'Blockchain & Transparency' },
  },
  {
    id: 'article-5',
    slug: 'draft-article-nlp',
    title: 'Natural Language Processing for African Languages',
    excerpt: 'Exploring the challenges and opportunities in developing NLP solutions for the diverse languages spoken across Africa.',
    contentJson: {},
    author: {
      id: 'author-1',
      first_name: 'Dr. Sarah',
      last_name: 'Johnson',
      handle: 'sarahj'
    },
    category: mockCategories[0],
    tags: ['NLP', 'Languages', 'AI'],
    thumbnailUrl: 'https://picsum.photos/800/400?random=5',
    readTimeMins: 6,
    publishedAt: undefined,
    updatedAt: '2024-01-16T09:15:00Z',
    status: 'draft',
    reactionsCount: 0,
    collectionId: 'collection-1',
    collection: { id: 'collection-1', name: 'AI Foundations' },
    commentsCount: 0,
    views: 0,
  },
];

// Mock Comments
export const mockComments: Comment[] = [
  {
    id: 'comment-1',
    articleId: 'article-1',
    user: {
      id: 'user-2',
      first_name: 'Dr. Michael',
      last_name: 'Chen',
      handle: 'michaelc'
    },
    body: 'Great article! I particularly enjoyed the section on local context understanding. In my experience working with African startups, this is often the most overlooked aspect.',
    createdAt: '2024-01-15T14:30:00Z'
  },
  {
    id: 'comment-2',
    articleId: 'article-1',
    user: {
      id: 'user-3',
      first_name: 'Aisha',
      last_name: 'Okafor',
      handle: 'aishao'
    },
    body: 'The regulatory compliance section really resonates with our experience in Nigeria. The landscape is constantly changing, and it\'s crucial to stay updated.',
    createdAt: '2024-01-15T16:45:00Z'
  },
  {
    id: 'comment-3',
    articleId: 'article-1',
    user: {
      id: 'user-4',
      first_name: 'Prof. Kwame',
      last_name: 'Asante',
      handle: 'kwame'
    },
    body: 'Excellent insights! I\'d love to see more discussion on the role of universities in fostering AI innovation across Africa. We\'re seeing some promising initiatives at our institution.',
    createdAt: '2024-01-16T09:15:00Z'
  }
];

// Mock Reactions
export const mockReactions: Reaction[] = [
  {
    id: 'reaction-1',
    articleId: 'article-1',
    userId: 'user-2',
    type: 'like',
    createdAt: '2024-01-15T11:00:00Z'
  },
  {
    id: 'reaction-2',
    articleId: 'article-1',
    userId: 'user-3',
    type: 'like',
    createdAt: '2024-01-15T12:30:00Z'
  }
];

// Mock Bookmarks
export const mockBookmarks: Bookmark[] = [
  {
    id: 'bookmark-1',
    articleId: 'article-2',
    userId: 'user-1',
    article: mockArticles[1],
    bookmarkedAt: '2024-01-14T16:20:00Z',
    createdAt: '2024-01-14T16:20:00Z'
  },
  {
    id: 'bookmark-2',
    articleId: 'article-3',
    userId: 'user-1',
    article: mockArticles[2],
    bookmarkedAt: '2024-01-12T11:45:00Z',
    createdAt: '2024-01-12T11:45:00Z'
  }
];

// Mock Read History
export const mockReadHistory: ReadEvent[] = [
  {
    id: 'read-1',
    articleId: 'article-1',
    userId: 'user-1',
    article: mockArticles[0],
    scrolledPct: 85,
    readTimeSpent: 6,
    readAt: '2024-01-16T14:30:00Z'
  },
  {
    id: 'read-2',
    articleId: 'article-2',
    userId: 'user-1',
    article: mockArticles[1],
    scrolledPct: 100,
    readTimeSpent: 6,
    readAt: '2024-01-15T16:45:00Z'
  }
];
