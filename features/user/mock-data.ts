import { User, UserProfile, Bookmark, ReadEvent } from "@/lib/types";
import {
  mockArticles,
  mockBookmarks as articleBookmarks,
  mockReadHistory as articleReadHistory,
} from "../articles/mock-data";

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Dr. Sarah Johnson",
    email: "sarah@example.com",
    handle: "sarahj",
    first_name: "Sarah",
    last_name: "Johnson",
    user_role: "creator",
    role: "system_admin",
  },
  {
    id: "user-2",
    name: "John Doe",
    email: "john@example.com",
    handle: "johndoe",
    first_name: "John",
    last_name: "Doe",
    user_role: "user",
    role: "user",
  },
  {
    id: "user-3",
    name: "Jane Smith",
    email: "jane@example.com",
    handle: "janesmith",
    first_name: "Jane",
    last_name: "Smith",
    user_role: "creator",
    role: "creator",
  },
];

export const mockUser: User = {
  id: "user-1",
  name: "Dr. Sarah Johnson",
  email: "sarah@example.com",
  handle: "sarahj",
  first_name: "Sarah",
  last_name: "Johnson",
  user_role: "creator",
  role: "system_admin",
};

export const mockUserProfile: UserProfile = {
  ...mockUser,
  recentArticles: mockArticles.filter(
    (article) => article.author.id === "author-1"
  ),
  recentBookmarks: articleBookmarks,
};

export const mockBookmarks: Bookmark[] = articleBookmarks;
export const mockReadHistory: ReadEvent[] = articleReadHistory;
