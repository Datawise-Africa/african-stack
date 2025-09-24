# Component Hierarchy for Medium-like Application

## Overview
This document outlines the component hierarchy for the Medium-like application, showing the relationship between different components and their responsibilities.

## Root Structure
```mermaid
graph TD
    A[App] --> B[Router]
    B --> C[Public Routes]
    B --> D[Protected Routes]
    B --> E[Auth Routes]
```

## Public Routes
```mermaid
graph TD
    A[LandingPage] --> B[Header]
    A --> C[HeroSection]
    A --> D[FeaturedArticles]
    A --> E[LatestArticles]
    A --> F[PodcastHighlights]
    A --> G[NewsletterSignup]
    A --> H[Footer]
    
    D --> D1[ArticleCard]
    E --> E1[ArticleCard]
```

## Blog Archive
```mermaid
graph TD
    A[BlogArchive] --> B[Header]
    A --> C[SearchBar]
    A --> D[CategoryFilter]
    A --> E[ArticleGrid]
    A --> F[Pagination]
    A --> G[Footer]
    
    E --> E1[ArticleCard]
    E --> E2[ArticleCard]
    E --> E3[ArticleCard]
```

## Article Detail
```mermaid
graph TD
    A[ArticleDetail] --> B[Header]
    A --> C[ArticleHeader]
    A --> D[ArticleContent]
    A --> E[ReactionSection]
    A --> F[CommentSection]
    A --> G[RelatedArticles]
    A --> H[Footer]
    
    E --> E1[ReactionButton]
    F --> F1[CommentForm]
    F --> F2[CommentList]
    F2 --> F3[CommentItem]
    F3 --> F4[CommentReplies]
```

## Authentication Routes
```mermaid
graph TD
    A[AuthLayout] --> B[AuthHeader]
    A --> C[AuthFormContainer]
    A --> D[AuthFooter]
    
    C --> E[LoginForm]
    C --> F[RegistrationForm]
    C --> G[PasswordResetForm]
```

## User Dashboards

### Reader Dashboard
```mermaid
graph TD
    A[ReaderDashboard] --> B[DashboardHeader]
    A --> C[PersonalizedFeed]
    A --> D[SavedArticles]
    A --> E[ActivityHistory]
    A --> F[ProfileSettings]
    
    C --> C1[ArticleCard]
    D --> D1[ArticleCard]
    E --> E1[CommentHistory]
    E --> E2[ReactionHistory]
```

### Creator Dashboard
```mermaid
graph TD
    A[CreatorDashboard] --> B[DashboardHeader]
    A --> C[ArticleEditor]
    A --> D[DraftsList]
    A --> E[PublishedArticles]
    A --> F[AnalyticsSection]
    A --> G[ProfileManagement]
    
    D --> D1[ArticleCard]
    E --> E1[ArticleCard]
    F --> F1[AnalyticsChart]
    F --> F2[MetricsSummary]
```

### Admin Dashboard
```mermaid
graph TD
    A[AdminDashboard] --> B[DashboardHeader]
    A --> C[UserManagement]
    A --> D[AuthorApplications]
    A --> E[ArticleReview]
    A --> F[ContentManagement]
    A --> G[SystemAnalytics]
    
    C --> C1[UserTable]
    D --> D1[ApplicationList]
    E --> E1[ArticleReviewList]
    F --> F1[CategoryManagement]
    F --> F2[TagManagement]
```

## Reusable Components
```mermaid
graph TD
    A[UI Components] --> B[Buttons]
    A --> C[Forms]
    A --> D[Cards]
    A --> E[Navigation]
    A --> F[Modals]
    A --> G[Loaders]
    
    B --> B1[PrimaryButton]
    B --> B2[SecondaryButton]
    B --> B3[IconButton]
    
    C --> C1[TextInput]
    C --> C2[TextArea]
    C --> C3[SelectInput]
    C --> C4[Checkbox]
    
    D --> D1[ArticleCard]
    D --> D2[UserCard]
    D --> D3[PodcastCard]
    
    E --> E1[Header]
    E --> E2[Footer]
    E --> E3[Sidebar]
    E --> E4[Pagination]
    
    F --> F1[ConfirmationModal]
    F --> F2[FormModal]
```

## State Management Components
```mermaid
graph TD
    A[Zustand Stores] --> B[AuthStore]
    A --> C[ArticleStore]
    A --> D[UIStore]
    A --> E[AnalyticsStore]
```

## Data Fetching Components
```mermaid
graph TD
    A[TanStack Query] --> B[QueryClient]
    A --> C[QueryProvider]
    A --> D[CustomHooks]
    
    D --> D1[useArticles]
    D --> D2[useUsers]
    D --> D3[useComments]
    D --> D4[useReactions]