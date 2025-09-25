import { User, UserProfile, Bookmark, ReadEvent } from '@/lib/types';
import { mockArticles, mockBookmarks as articleBookmarks, mockReadHistory as articleReadHistory } from '../articles/mock-data';

export const mockUser: User = {
  id: 'user-1',
  name: 'Dr. Sarah Johnson',
  email: 'sarah@example.com',
  handle: 'sarahj',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
  bio: 'AI researcher and tech entrepreneur passionate about building solutions for African challenges. PhD in Computer Science from University of Cape Town.',
  location: 'Cape Town, South Africa',
  website: 'https://sarahjohnson.dev',
  roles: ['user', 'author', 'admin'],
  joinedAt: '2023-06-15T10:00:00Z',
  stats: {
    articlesPublished: 12,
    totalViews: 15420,
    totalReactions: 342,
    totalComments: 89,
    followers: 1250,
    following: 180,
  },
};

export const mockUserProfile: UserProfile = {
  ...mockUser,
  recentArticles: mockArticles.filter(article => article.author.id === 'author-1'),
  recentBookmarks: articleBookmarks,
};

export const mockBookmarks: Bookmark[] = articleBookmarks;
export const mockReadHistory: ReadEvent[] = articleReadHistory;
