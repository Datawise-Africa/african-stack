import { faker } from '@faker-js/faker';
import type { ArticleType } from '~/schema/article-schema';
import type { ArticleCategoryType } from '~/schema/article-categories-schema';

// Predefined categories for consistency
const CATEGORIES = [
  {
    id: '1',
    name: 'Technology',
    slug: 'technology',
    description: 'Articles about the latest technology trends and innovations in Africa.'
  },
  {
    id: '2',
    name: 'Business',
    slug: 'business',
    description: 'Business news, startups, and entrepreneurship in Africa.'
  },
  {
    id: '3',
    name: 'Culture',
    slug: 'culture',
    description: 'Cultural events, arts, and heritage from across Africa.'
  },
  {
    id: '4',
    name: 'Politics',
    slug: 'politics',
    description: 'Political analysis and news from African countries.'
  },
  {
    id: '5',
    name: 'Health',
    slug: 'health',
    description: 'Health-related articles and medical advances in Africa.'
  },
] as ArticleCategoryType[];

// Generate a random article
export function generateArticle(isFeatured = false): ArticleType {
  const id = faker.string.uuid();
  const title = faker.lorem.sentence({ min: 4, max: 8 });
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const randomCategory = faker.helpers.arrayElement(CATEGORIES);
  
  return {
    id,
    slug,
    title,
    excerpt: faker.lorem.paragraph({ min: 2, max: 4 }),
    category: randomCategory.name,
    readTime: `${faker.number.int({ min: 2, max: 15 })} min read`,
    publishDate: faker.date.recent({ days: 30 }).toISOString(),
    image: faker.image.url({ width: 800, height: 600 }),
    author: {
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
      bio: faker.lorem.sentence(),
    },
    tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.lorem.word()),
    featured: isFeatured || faker.datatype.boolean({ probability: 0.2 }), // 20% chance of being featured if not explicitly set
  };
}

// Generate multiple articles
export function generateArticles(count: number = 10): ArticleType[] {
  return Array.from({ length: count }, () => generateArticle());
}

// Generate featured articles
export function generateFeaturedArticles(count: number = 3): ArticleType[] {
  return Array.from({ length: count }, () => generateArticle(true));
}

// Generate recent articles
export function generateRecentArticles(count: number = 5): ArticleType[] {
  return Array.from({ length: count }, () => {
    const article = generateArticle();
    article.publishDate = faker.date.recent({ days: 7 }).toISOString(); // Last week
    return article;
  });
}

// Get all predefined categories
export function getCategories(): ArticleCategoryType[] {
  return [...CATEGORIES];
}

// Get category by ID
export function getCategoryById(id: string): ArticleCategoryType | undefined {
  return CATEGORIES.find(category => category.id === id);
}
