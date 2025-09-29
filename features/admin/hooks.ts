import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query-keys";
import { mockUsers } from "../user/mock-data";
import { mockArticles } from "../articles/mock-data";
import { User, Article, RoleRequest } from "@/lib/types";

// Mock API functions for admin
const mockApi = {
  // Admin Users
  getAdminUsers: async (
    filters: Record<string, unknown> = {}
  ): Promise<{
    users: User[];
    total: number;
    page: number;
    limit: number;
  }> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    let filteredUsers = [...mockUsers];
    const page = Number(filters.page) || 1;
    const limit = Number(filters.limit) || 10;
    const search = String(filters.search || "").toLowerCase();

    // Apply filters
    if (search) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search) ||
          user.handle.toLowerCase().includes(search)
      );
    }

    if (filters.role) {
      const roles = Array.isArray(filters.role) ? filters.role : [filters.role];
      filteredUsers = filteredUsers.filter((user: User) =>
        roles.includes(user.role)
      );
    }

    // Sort
    const sortBy = String(filters.sortBy || "joinedAt");
    const sortOrder = String(filters.sortOrder || "desc");
    filteredUsers.sort((a: User, b: User) => {
      const aValue = a[sortBy as keyof User];
      const bValue = b[sortBy as keyof User];

      if (aValue === undefined || bValue === undefined) return 0;

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      users: paginatedUsers,
      total: filteredUsers.length,
      page,
      limit,
    };
  },

  updateUserStatus: async (userId: string, status: string): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = mockUsers.find((u) => u.id === userId);
    if (!user) throw new Error("User not found");

    return user;
  },

  updateUserRole: async (userId: string, role: User["role"]): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const user = mockUsers.find((u) => u.id === userId);
    if (!user) throw new Error("User not found");

    user.role = role;
    return user;
  },

  // Admin Articles
  getAdminArticles: async (
    filters: Record<string, unknown> = {}
  ): Promise<{
    articles: Article[];
    total: number;
    page: number;
    limit: number;
  }> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    let filteredArticles = [...mockArticles];
    const page = Number(filters.page) || 1;
    const limit = Number(filters.limit) || 10;
    const search = String(filters.search || "").toLowerCase();

    // Apply filters
    if (search) {
      filteredArticles = filteredArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(search) ||
          article.excerpt.toLowerCase().includes(search) ||
          article.author.first_name.toLowerCase().includes(search)
      );
    }

    if (filters.status) {
      const statuses = Array.isArray(filters.status)
        ? filters.status
        : [filters.status];
      filteredArticles = filteredArticles.filter((article) =>
        statuses.includes(article.status)
      );
    }

    if (filters.approvalStatus) {
      const approvalStatuses = Array.isArray(filters.approvalStatus)
        ? filters.approvalStatus
        : [filters.approvalStatus];
      filteredArticles = filteredArticles.filter((article) =>
        approvalStatuses.includes(article.approvalStatus || "pending")
      );
    }

    // Sort
    const sortBy = String(filters.sortBy || "publishedAt");
    const sortOrder = String(filters.sortOrder || "desc");
    filteredArticles.sort((a: Article, b: Article) => {
      const aValue = a[sortBy as keyof Article];
      const bValue = b[sortBy as keyof Article];

      if (aValue === undefined || bValue === undefined) return 0;

      if (sortOrder === "asc") {
        return String(aValue) > String(bValue) ? 1 : -1;
      } else {
        return String(aValue) < String(bValue) ? 1 : -1;
      }
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

    return {
      articles: paginatedArticles,
      total: filteredArticles.length,
      page,
      limit,
    };
  },

  approveArticle: async (articleId: string): Promise<Article> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const article = mockArticles.find((a) => a.id === articleId);
    if (!article) throw new Error("Article not found");

    article.approvalStatus = "approved";
    article.status = "published";
    article.publishedAt = new Date().toISOString();

    return article;
  },

  rejectArticle: async (
    articleId: string,
    _reason: string
  ): Promise<Article> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const article = mockArticles.find((a) => a.id === articleId);
    if (!article) throw new Error("Article not found");

    article.approvalStatus = "rejected";
    article.status = "rejected";

    return article;
  },

  // Admin Stats
  getAdminStats: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const totalUsers = mockUsers.length;
    const activeUsers = mockUsers.length;
    const pendingUsers = 0;
    const creators = mockUsers.filter((u: User) => u.role === "creator").length;
    const admins = mockUsers.filter(
      (u: User) => u.role === "system_admin"
    ).length;

    const totalArticles = mockArticles.length;
    const publishedArticles = mockArticles.filter(
      (a: Article) => a.status === "published"
    ).length;
    const pendingArticles = mockArticles.filter(
      (a: Article) => a.status === "pending_approval"
    ).length;
    const draftArticles = mockArticles.filter(
      (a: Article) => a.status === "draft"
    ).length;

    return {
      users: {
        total: totalUsers,
        active: activeUsers,
        pending: pendingUsers,
        creators,
        admins,
      },
      articles: {
        total: totalArticles,
        published: publishedArticles,
        pending: pendingArticles,
        drafts: draftArticles,
      },
      recentActivity: [
        {
          id: "1",
          type: "user_registered",
          message: "New user registered",
          timestamp: new Date().toISOString(),
          user: mockUsers[0],
        },
        {
          id: "2",
          type: "article_submitted",
          message: "New article submitted for review",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          article: mockArticles[0],
        },
      ],
    };
  },

  // Role Requests
  getRoleRequests: async (
    filters: Record<string, unknown> = {}
  ): Promise<{
    requests: RoleRequest[];
    total: number;
    page: number;
    limit: number;
  }> => {
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Mock role requests
    const mockRequests: RoleRequest[] = [
      {
        id: "1",
        userId: "2",
        message:
          "I am passionate about technology and want to share my knowledge about AI and machine learning with the community.",
        portfolio: "https://myblog.com",
        socialMedia: "@techwriter",
        expectedContent:
          "AI tutorials, machine learning guides, and software development insights",
        status: "pending",
        submittedAt: "2024-01-20T10:30:00Z",
        reviewedAt: undefined,
        reviewedBy: undefined,
        adminNotes: undefined,
      },
      {
        id: "2",
        userId: "3",
        message:
          "I'm a healthcare professional with expertise in medical technology and want to create content about the intersection of healthcare and AI.",
        portfolio: "https://healthtechblog.com",
        socialMedia: "@healthtech",
        expectedContent:
          "Healthcare AI applications, medical technology reviews, and patient care innovations",
        status: "approved",
        submittedAt: "2024-01-15T14:22:00Z",
        reviewedAt: "2024-01-16T09:15:00Z",
        reviewedBy: "Admin User",
        adminNotes:
          "Approved - Strong background in healthcare and clear content focus.",
      },
    ];

    let filteredRequests = [...mockRequests];
    const page = Number(filters.page) || 1;
    const limit = Number(filters.limit) || 10;

    if (filters.status) {
      const statuses = Array.isArray(filters.status)
        ? filters.status
        : [filters.status];
      filteredRequests = filteredRequests.filter((request) =>
        statuses.includes(request.status)
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedRequests = filteredRequests.slice(startIndex, endIndex);

    return {
      requests: paginatedRequests,
      total: filteredRequests.length,
      page,
      limit,
    };
  },

  approveRoleRequest: async (requestId: string): Promise<RoleRequest> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // In a real app, this would update the user's role and the request status
    const request: RoleRequest = {
      id: requestId,
      userId: "2",
      message: "I am passionate about technology...",
      portfolio: "https://myblog.com",
      socialMedia: "@techwriter",
      expectedContent: "AI tutorials, machine learning guides...",
      status: "approved",
      submittedAt: "2024-01-20T10:30:00Z",
      reviewedAt: new Date().toISOString(),
      reviewedBy: "Admin User",
      adminNotes: "Approved - Good background and clear content focus.",
    };

    return request;
  },

  rejectRoleRequest: async (
    requestId: string,
    reason: string
  ): Promise<RoleRequest> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const request: RoleRequest = {
      id: requestId,
      userId: "2",
      message: "I am passionate about technology...",
      portfolio: "https://myblog.com",
      socialMedia: "@techwriter",
      expectedContent: "AI tutorials, machine learning guides...",
      status: "rejected",
      submittedAt: "2024-01-20T10:30:00Z",
      reviewedAt: new Date().toISOString(),
      reviewedBy: "Admin User",
      adminNotes: reason,
    };

    return request;
  },
};

// Admin User Hooks
export const useAdminUsers = (filters: Record<string, unknown> = {}) => {
  return useQuery({
    queryKey: queryKeys.admin.users(filters),
    queryFn: () => mockApi.getAdminUsers(filters),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId }: { userId: string }) =>
      mockApi.updateUserStatus(userId, ""),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(
        queryKeys.users.detail(updatedUser.id),
        updatedUser
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.users({}) });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
    },
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: User["role"] }) =>
      mockApi.updateUserRole(userId, role),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(
        queryKeys.users.detail(updatedUser.id),
        updatedUser
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.users({}) });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.lists() });
    },
  });
};

// Admin Article Hooks
export const useAdminArticles = (filters: Record<string, unknown> = {}) => {
  return useQuery({
    queryKey: queryKeys.admin.articles(filters),
    queryFn: () => mockApi.getAdminArticles(filters),
    staleTime: 2 * 60 * 1000,
  });
};

export const useApproveArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (articleId: string) => mockApi.approveArticle(articleId),
    onSuccess: (updatedArticle) => {
      queryClient.setQueryData(
        queryKeys.articles.detail(updatedArticle.id),
        updatedArticle
      );
      queryClient.setQueryData(
        queryKeys.articles.bySlug(updatedArticle.slug),
        updatedArticle
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.articles({}) });
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.lists() });
    },
  });
};

export const useRejectArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      articleId,
      reason,
    }: {
      articleId: string;
      reason: string;
    }) => mockApi.rejectArticle(articleId, reason),
    onSuccess: (updatedArticle) => {
      queryClient.setQueryData(
        queryKeys.articles.detail(updatedArticle.id),
        updatedArticle
      );
      queryClient.setQueryData(
        queryKeys.articles.bySlug(updatedArticle.slug),
        updatedArticle
      );
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.articles({}) });
      queryClient.invalidateQueries({ queryKey: queryKeys.articles.lists() });
    },
  });
};

// Admin Stats Hooks
export const useAdminStats = () => {
  return useQuery({
    queryKey: queryKeys.admin.stats(),
    queryFn: mockApi.getAdminStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Role Request Hooks
export const useAdminRoleRequests = (filters: Record<string, unknown> = {}) => {
  return useQuery({
    queryKey: queryKeys.admin.roleRequests(filters),
    queryFn: () => mockApi.getRoleRequests(filters),
    staleTime: 2 * 60 * 1000,
  });
};

export const useApproveRoleRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (requestId: string) => mockApi.approveRoleRequest(requestId),
    onSuccess: (updatedRequest) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.roleRequests({}),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.roleRequests.byUser(updatedRequest.userId),
      });
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.users({}) });
    },
  });
};

export const useRejectRoleRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      requestId,
      reason,
    }: {
      requestId: string;
      reason: string;
    }) => mockApi.rejectRoleRequest(requestId, reason),
    onSuccess: (updatedRequest) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.roleRequests({}),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.roleRequests.byUser(updatedRequest.userId),
      });
    },
  });
};
