Here’s a single, copy-paste **master prompt** you can give to an AI/codegen agent to scaffold and implement the app end-to-end. It’s structured, explicit, and leaves no ambiguities.

---

# Build Request: “African Stack” – Medium-style Blogging Frontend

## High-Level Goal

Create a production-ready **Next.js** frontend for a Medium-like blog focused on **AI articles**, with **rich text authoring (draft → publish)**, **reactions**, **comments**, **bookmarks**, **read history**, **categories**, and a **marketing landing page** for **African Stack**. Must be **SEO-friendly**, **responsive**, and support **dark mode**.

## Tech & Standards

* Framework: **Next.js 14+ (App Router)** with TypeScript.
* UI: **shadcn/ui** + **Tailwind CSS** (dark/light via `next-themes`).
* Data fetching: **Axios** + **@tanstack/react-query** (Query/Mutation, caching, optimistic updates).
* Tables/lists: **@tanstack/react-table**.
* Auth: Email/password or OAuth via **NextAuth.js** (or pluggable auth adapter) with protected routes & role gates.
* Editor: **Tiptap** (or similar) rich text editor with images, code blocks, AI-topic presets; **autosave drafts**.
* Testing: **Vitest** (unit), **Testing Library** (components), **Playwright** (e2e).
* Mocking: **MSW** + **faker** (dev-only fallback when external API unreachable or empty).
* Forms & validation: **react-hook-form** + **zod**.
* SEO: Next.js **Metadata API** (+ structured data via JSON-LD), **OpenGraph**/Twitter tags, canonical URLs, sitemap & robots.
* Accessibility: WCAG AA, keyboard navigation, focus states, ARIA where needed.
* Performance: Image optimization, route-level code-splitting, `react-query` caching, prefetch critical routes, Lighthouse ≥ 90.

## Core Features (User Stories & Acceptance)

1. **Browse & Read**

   * As a visitor, I can see a **Landing page** for African Stack with hero, “How it works”, features, testimonials, newsletter CTA, and footer.
   * As a reader, I can browse **Latest**, **Trending**, and **Categories** pages; filter and search.
   * As a reader, I can open an **Article page** with title, author, read time, publish date, content, tags, reactions count, comments.
   * **Acceptance:** Pagination/infinite scroll, skeletons, SEO tags per page, JSON-LD articles.

2. **Auth & Profiles**

   * Sign up/in/out, password reset, OAuth optional.
   * View **Profile** with my posts, **Bookmarks**, and **Read History** (chronological, deduped).
   * **Acceptance:** Protected routes; redirect unauthenticated users to login; optimistic UI for bookmark toggle.

3. **Authoring**

   * Create **Drafts** with Tiptap editor (headings, bold/italic, lists, images, code block, blockquote, links).
   * **Autosave** every N seconds; manual save; **Publish** with category, tags, excerpt, thumbnail.
   * **Acceptance:** Draft state persisted; validating required fields on publish; preview mode.

4. **Engagement**

   * **Reactions** (like/clap) and **Comments** (CRUD for owner; delete by author/mod).
   * **Acceptance:** Debounced reactions; optimistic update; toasts on success/error.

5. **Personalization**

   * **Bookmarks** (toggle anywhere article card appears).
   * **Read History** auto-tracks when article scrolled >70%.
   * **Acceptance:** Works offline-tolerant (queue & retry); conflict-safe.

6. **Categories & Tags**

   * Category index page + article feeds; tag chips on article page linking to tag feeds.
   * **Acceptance:** SEO per category/tag page; canonicals; no-index empty feeds.

## Data Models (TypeScript interfaces)

```ts
type ID = string;
export interface User {
  id: ID; name: string; avatarUrl?: string; bio?: string; handle: string; roles: ('user'|'author'|'admin')[];
}
export interface Category { id: ID; slug: string; name: string; description?: string; }
export interface Article {
  id: ID; slug: string; title: string; excerpt: string;
  contentJson: unknown; // tiptap JSON
  author: Pick<User,'id'|'name'|'avatarUrl'|'handle'>;
  category: Category; tags: string[]; thumbnailUrl?: string;
  readTimeMins: number; publishedAt?: string; status: 'draft'|'published';
  reactionsCount: number; commentsCount: number;
}
export interface Reaction { id: ID; articleId: ID; userId: ID; type: 'like'; createdAt: string; }
export interface Comment { id: ID; articleId: ID; user: Pick<User,'id'|'name'|'avatarUrl'>; body: string; createdAt: string; updatedAt?: string; }
export interface Bookmark { id: ID; articleId: ID; userId: ID; createdAt: string; }
export interface ReadEvent { id: ID; articleId: ID; userId: ID; scrolledPct: number; createdAt: string; }
```

## External API Contract (assume REST; replace base URL via env)

* `GET /articles?query=&category=&tag=&sort=&page=&limit=`
* `GET /articles/:slug`
* `POST /articles` (draft) → `{id, ...}`
* `PATCH /articles/:id` (update draft)
* `POST /articles/:id/publish`
* `POST /articles/:id/reactions` (toggle like)
* `GET /articles/:id/comments`, `POST /articles/:id/comments`, `PATCH /comments/:id`, `DELETE /comments/:id`
* `POST /bookmarks/:articleId/toggle`, `GET /me/bookmarks`
* `POST /reads` (record read event), `GET /me/read-history`
* `GET /categories`, `GET /tags`
* `GET /me`, `GET /me/articles` (my drafts & published)

**Error Shape (zod-validated):**

```ts
{ error: { code: string; message: string; details?: Record<string,unknown> } }
```

## Mocking & Dev Mode

* Use **MSW** to intercept the above endpoints in `development` if:

  * `process.env.NEXT_PUBLIC_USE_MOCKS === 'true'` **OR**
  * Any request times out → fallback to **faker** generated collections persisted in `localStorage`/IndexedDB during session.
* Provide seeders for users, categories, 20+ AI articles, comments, and reactions.

## Pages & Routes (App Router)

```
/                     -> Landing (African Stack)
/articles             -> Feed (Latest/Trending tabs, filters, search)
/articles/[slug]      -> Article detail + reactions + comments
/categories           -> Categories index
/categories/[slug]    -> Category feed
/tags/[tag]           -> Tag feed
/auth/(login|register|reset)
/me                   -> Profile home
/me/articles          -> My drafts & published (table via tanstack)
/me/articles/new      -> Editor (draft)
/me/articles/[id]/edit-> Editor
/me/bookmarks         -> Bookmarks list (table)
/me/read-history      -> Read history (table)
```

## UI & Components (shadcn/ui + Tailwind)

* **Navbar** (logo, search, theme toggle, auth menu), **Footer**, **ArticleCard**, **ArticleList** (virtualized), **CategoryChip**, **TagChip**, **Editor** (Tiptap toolbar & slash menu), **CommentList**, **ReactionButton**, **BookmarkButton**, **ShareMenu**, **Skeletons**.
* **Tables** (Bookmarks, Read History, My Articles): pagination, sorting, column visibility, CSV export.

## State & Data Layer

* **react-query**: keys like `['articles', params]`, `['article', slug]`, `['me']`.
* Axios instance with:

  * Base URL from `NEXT_PUBLIC_API_BASE_URL`.
  * Auth token injection, 401 refresh, retry/backoff.
* **Optimistic updates** for reactions, bookmarks, comments.
* **Infinite queries** for feeds.

## Rich Text Editor (Tiptap)

* Extensions: StarterKit, Image, Link (validate), CodeBlock, Table (optional), Heading (h1–h3), HorizontalRule, Blockquote.
* **Autosave** (debounced 1–2s) to `PATCH /articles/:id`.
* **Markdown import/export** optional; sanitize HTML for preview.
* **Image uploads**: adapter to external API or mock to base64 in dev.

## SEO & Analytics

* Use Next.js **Metadata** per route: title, description, canonical, OG/Twitter.
* **JSON-LD** Article schema on article pages.
* **Sitemap** & **robots.txt** via `next-sitemap`.
* Preload key fonts; ensure CLS minimal.

## Theming & Responsiveness

* `next-themes` with `class` strategy; default to system but only **two themes** (light/dark).
* Tailwind: fluid typography, container queries where helpful; test at sm/md/lg/xl/2xl.

## Testing Requirements

* **Unit (Vitest):** utilities, hooks, components (Editor toolbar actions, ReactionButton optimistic flow, BookmarkButton).
* **Integration (Testing Library):** Article page renders content, comments CRUD happy path (mocked).
* **e2e (Playwright):** Auth flow, write draft → publish, bookmark article, leave comment, verify SEO meta tags and JSON-LD presence, mobile/desktop viewports.
* CI: run `typecheck`, `lint`, `test`, `build`, `playwright`.

## Folder Structure (example)

```
/app
  /(marketing)/page.tsx
  /articles/page.tsx
  /articles/[slug]/page.tsx
  /categories/[slug]/page.tsx
  /me/... (profile, drafts, bookmarks, history)
/components (ui, cards, editor, tables)
/lib (axios.ts, queryClient.ts, auth.ts, seo.ts, validators)
/mocks (msw/handlers.ts, seeds.ts)
/styles (globals.css, tailwind.css)
/tests (unit, e2e)
/public (og images)
```

## Env & Config

```
NEXT_PUBLIC_API_BASE_URL=
NEXT_PUBLIC_USE_MOCKS=true
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```

## Accessibility & Quality Gates

* Keyboard reachable for all interactive elements; visible focus rings.
* Color contrast AA; prefers-reduced-motion respects.
* Lighthouse targets: **Perf ≥ 90**, **SEO ≥ 95**, **A11y ≥ 95**.

## Deliverables

* Bootstrapped Next.js repo with configured stack above.
* Implemented pages/routes, components, editor, data hooks, mocks.
* Tests (unit + e2e) passing; CI config; README with scripts.
* Demo data for dev.

## Non-Functional

* Type-safe APIs via zod schemas.
* Error boundaries & toasts; empty, loading, and error UI states.
* Analytics hook (pluggable) and event naming for key actions.

---

**Action:** Generate the full codebase meeting all specs above, including MSW/faker mocks, shadcn components, Tiptap editor with autosave, SEO metadata, dark mode, responsive layout, and Playwright e2e covering auth → write draft → publish → react → comment → bookmark → verify read history.
