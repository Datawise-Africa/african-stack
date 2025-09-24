# African Stack - AI & Data Science Hub

A comprehensive React/Vite application focused on sharing AI and Data Science knowledge across Africa using a modern tech stack.

## Features

- User authentication (login, registration, password reset)
- Role-based access control (reader, author, admin)
- AI and Data Science focused article creation with rich text editor
- Interactive code snippets and data visualization support
- Machine learning model demonstration capabilities
- Comment and reaction system for collaborative learning
- Podcast section with AI and Data Science topics
- Newsletter subscription for latest industry updates
- Responsive design with Tailwind CSS
- Creator dashboard with analytics
- Admin dashboard for content management

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Form Handling**: React Hook Form + Zod
- **UI Components**: ShadCN UI
- **Rich Text Editor**: TipTap
- **Data Tables**: TanStack Tables

### Testing
- **Unit Testing**: Vitest + React Testing Library
- **E2E Testing**: Cypress

## Getting Started

### Prerequisites
- Node.js 16+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd afstack

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Available Scripts

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Preview production build
pnpm preview

# Run unit tests
pnpm test

# Run unit tests in watch mode
pnpm test:watch

# Run E2E tests
pnpm test:e2e

# Run E2E tests in headless mode
pnpm test:e2e:headless
```

## Project Structure

```
src/
├── app/                 # Main application setup
├── components/          # Reusable UI components
├── features/            # Feature-specific modules
├── lib/                 # Utility functions and helpers
├── hooks/               # Custom React hooks
├── stores/              # Zustand stores
├── types/               # TypeScript types and interfaces
└── assets/              # Static assets
```

## Architecture

The application follows a feature-based architecture with clear separation of concerns:

1. **State Management**: Zustand for global state, TanStack Query for server state
2. **Data Fetching**: Custom hooks with TanStack Query
3. **Form Handling**: React Hook Form with Zod validation
4. **Routing**: React Router with protected routes
5. **UI Components**: ShadCN UI components with Tailwind CSS

## Testing

The application includes comprehensive test coverage:

- Unit tests for components, hooks, and utilities using Vitest
- E2E tests for critical user flows using Cypress
- Test coverage reports

## Responsive Design

The application is fully responsive and works on:
- Mobile devices
- Tablets
- Desktop browsers

### Image Optimization

The application includes a sophisticated image optimization system that:

- **Adaptive Loading**: Detects network conditions and device capabilities to deliver appropriately sized images
- **Lazy Loading**: Only loads images when they're about to enter the viewport
- **Loading States**: Shows elegant placeholders while images are loading
- **Error Handling**: Gracefully handles failed image loads with fallbacks and provides retry functionality
- **Quality Selection**: Automatically adjusts quality based on network conditions
- **External Image Support**: Works with any image source including Unsplash, CDNs, etc.
- **Low Data Mode Detection**: Respects user preferences for data saving
- **Progressive Enhancement**: Delivers appropriate experiences based on device capabilities

The `OptimizedImage` component is designed to be provider-agnostic, allowing you to use images from any source while maintaining optimal loading performance.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests for new features
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Playwright E2E (converted)

There are Playwright tests under `tests/e2e` converted from the original Cypress suites.

Install Playwright browsers and run tests:

1. Install dependencies (if using pnpm):

2. Install Playwright browsers and system dependencies:

3. Run Playwright tests (headless):

4. Run Playwright tests (headed):

The `package.json` includes helper scripts `playwright:install`, `test:playwright` and `test:playwright:headed`.

