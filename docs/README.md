# Medium-like Web Application

A comprehensive React/Vite application that replicates core Medium functionality with a modern tech stack.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Data Models](#data-models)
- [Getting Started](#getting-started)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

### User System
- User registration and authentication
- Role-based access control (reader, author, admin)
- Profile management
- Creator applications and approvals

### Content Management
- Rich text editor with TipTap
- Article creation, editing, and publishing workflow
- Category and tag organization
- Draft management
- Featured content highlighting

### Engagement Features
- Comment system with nested replies
- Multiple reaction types (like, clap, love, etc.)
- Newsletter subscription with Mailchimp integration

### Content Discovery
- Landing page with featured articles
- Blog archive with category filtering
- Search functionality
- Responsive masonry layout

### Specialized Content
- Podcast section with audio player
- Creator profiles with social links

### Dashboards
- Reader dashboard with reading history
- Creator dashboard with analytics
- Admin dashboard for content/user management

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

### Development Tools
- **Package Manager**: npm/yarn
- **Code Formatting**: Prettier
- **Linting**: ESLint
- **Version Control**: Git

## Architecture

The application follows a feature-based architecture with clear separation of concerns:

```
src/
├── app/                 # Main application setup
├── components/          # Reusable UI components
├── features/            # Feature-specific modules
├── lib/                 # Utility functions and helpers
├── hooks/               # Custom React hooks
├── stores/              # Zustand stores
├── types/               # TypeScript types and interfaces
├── services/            # API service definitions
└── constants/           # Application constants
```

### State Management
- **Zustand** for global state management
- **TanStack Query** for server state and caching
- Component-level state for ephemeral UI state

### Data Flow
1. User interactions trigger actions in Zustand stores
2. API calls are managed through TanStack Query
3. Data is transformed and validated with Zod
4. UI updates through React's declarative rendering

## Project Structure

Detailed project structure can be found in:
- [Architecture Plan](./architecture-plan.md)
- [Component Hierarchy](./component-hierarchy.md)

## Data Models

The application uses the following core data models:

### User System
- User (authentication and profile)
- CreatorProfile (extended author information)

### Content System
- Article (blog posts)
- Category (content organization)
- Tag (content metadata)
- Comment (user discussions)
- Reaction (user engagement)
- Podcast (audio content)

### Supporting Systems
- NewsletterSubscription (email subscriptions)
- Analytics (content metrics)

Detailed data models are defined in:
- [Data Models](./data-models.md)

## Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd medium-like-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:3001
VITE_MAILCHIMP_API_KEY=your-key-here
```

## Development

### Available Scripts
```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Code formatting
npm run format

# Linting
npm run lint
```

### Development Roadmap
The implementation follows a phased approach:
1. Foundation and Setup
2. Authentication System
3. Data Models and State Management
4. Public Pages
5. Content Creation Features
6. User Dashboards
7. Specialized Features
8. Testing and Quality Assurance
9. Documentation and Deployment

Detailed roadmap in: [Development Roadmap](./development-roadmap.md)

## Testing

### Unit Testing
```bash
# Run unit tests
npm run test:unit

# Run unit tests with coverage
npm run test:unit:coverage

# Run unit tests in watch mode
npm run test:unit:watch
```

### E2E Testing
```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests in headed mode
npm run test:e2e:headed

# Run E2E tests with recording
npm run test:e2e:record
```

### Testing Strategy
- Unit tests for components, hooks, and utilities using Vitest
- E2E tests for critical user flows using Cypress
- Comprehensive test coverage targets (80%+ for unit tests)
- CI/CD integration for automated testing

Detailed testing strategy in: [Testing Strategy](./testing-strategy.md)

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel/Netlify
1. Connect your Git repository
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add environment variables
4. Deploy

### Docker Deployment
```dockerfile
FROM node:16 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

## Documentation

### Architecture Documentation
- [Architecture Plan](./architecture-plan.md)
- [Component Hierarchy](./component-hierarchy.md)
- [Technical Specification](./technical-specification.md)

### Development Documentation
- [Development Roadmap](./development-roadmap.md)
- [Feature Specification](./feature-specification.md)
- [Data Models](./data-models.md)

### Testing Documentation
- [Testing Strategy](./testing-strategy.md)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

### Code Style
- Follow the existing code style
- Use TypeScript for all new code
- Write unit tests for new features
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Link: [https://github.com/your-username/medium-like-app](https://github.com/your-username/medium-like-app)