import { User, UserProfile, Bookmark, ReadEvent } from '@/lib/types';
import { mockArticles, mockBookmarks as articleBookmarks, mockReadHistory as articleReadHistory } from '../articles/mock-data';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah@example.com',
    handle: 'sarahj',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    bio: 'AI researcher and tech entrepreneur passionate about building solutions for African challenges. PhD in Computer Science from University of Cape Town.',
    role: 'creator',
    status: 'active',
    joinedAt: '2023-06-15T10:30:00Z',
    stats: {
      articlesPublished: 12,
      totalViews: 15420,
      totalReactions: 892,
      totalComments: 156,
      followers: 2340,
      following: 180
    }
  },
  {
    id: 'user-2',
    name: 'John Doe',
    email: 'john@example.com',
    handle: 'johndoe',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    bio: 'Software developer and tech enthusiast.',
    role: 'user',
    status: 'active',
    joinedAt: '2024-01-15T10:30:00Z',
    stats: {
      articlesPublished: 0,
      totalViews: 0,
      totalReactions: 0,
      totalComments: 0,
      followers: 0,
      following: 0
    }
  },
  {
    id: 'user-3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    handle: 'janesmith',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
    bio: 'Content creator and writer.',
    role: 'creator',
    status: 'pending_approval',
    joinedAt: '2024-01-18T11:20:00Z',
    stats: {
      articlesPublished: 0,
      totalViews: 0,
      totalReactions: 0,
      totalComments: 0,
      followers: 0,
      following: 0
    }
  }
];

export const mockUser: User = {
  id: 'user-1',
  name: 'Dr. Sarah Johnson',
  email: 'sarah@example.com',
  handle: 'sarahj',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
  bio: 'AI researcher and tech entrepreneur passionate about building solutions for African challenges. PhD in Computer Science from University of Cape Town.',
  location: 'Cape Town, South Africa',
  website: 'https://sarahjohnson.dev',
  role: 'system_admin',
  status: 'active',
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
