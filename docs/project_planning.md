# Planning Document
**Version:** 3.0
**Last Updated:** April 2026

---

## 1. Project Overview & Objectives

- **Project Name:** Personal Portfolio
- **Primary Goal:** Create a high-performance, minimalist static website to showcase technical skills, career progression (from Full-Stack/Backend to SRE/Infrastructure), and business impact.
- **Target Audience:**
  - **HR / Recruiters:** Looking for clear business impact, keyword matches (Go, Ruby, Next.js, Docker, Prometheus), and professional presentation.
  - **Engineering Managers:** Looking for system architecture understanding, clean UI, performance metrics (Lighthouse scores), and deep technical problem-solving skills.
  - **General Visitors:** Accessing the Playground section for interactive games and quizzes.
- **Design Vibe:** "SRE Aesthetic" — Minimalist, terminal-like monospace fonts for technical terms, highly responsive.
- **Default Theme:** Light Mode (with Dark Mode and System toggle support).

---

## 2. Technical Stack & Tools

| Category | Tool / Library | Notes |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSG `output: 'export'` |
| Styling | Tailwind CSS v4 | Utility-first, responsive |
| Theme Management | `next-themes` | Light / Dark / System |
| Animations | Framer Motion + GSAP | Subtle transitions; GSAP for cinematic sequences |
| Icons | Lucide React | Lightweight SVG |
| Typography | Inter + Space Grotesk + JetBrains Mono | Loaded via `next/font` |
| Content | TypeScript data files (`src/data/`) | Typed, edited directly in code |
| Package Manager | npm | — |
| Version Control | Git & GitHub | — |
| Interactive UI (Playground) | React state + Framer Motion + `@dnd-kit/core` | Per game type |

---

## 3. Theme Strategy

- **Default Mode:** Light Mode
- **Options:** Light / Dark / System
- **Library:** `next-themes`
- **Implementation:** CSS custom properties (design tokens) + Tailwind `dark:` variants
- **Scope:** Applied globally via `ThemeProvider` in `(portfolio)` layout

```css
/* Design Token Approach */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --accent: #3b82f6;
  --border: #e2e8f0;
}

[data-theme="dark"] {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --accent: #60a5fa;
  --border: #334155;
}
```

---

## 4. Architecture & Deployment Strategy

- **Rendering Method:** Static Site Generation (SSG). `output: 'export'` in `next.config.ts`.
- **Hosting Provider:** Cloudflare Pages
  - Fast edge network, aligns with SRE/Infrastructure persona
  - Zero-config static deployments, free SSL
- **CI/CD:** Cloudflare Pages native integration (auto-deploy on push to `main`)
- **Domain:** Custom domain routed through Cloudflare DNS
- **Analytics:** Cloudflare Web Analytics (privacy-first, no cookie banner required)

---

## 5. Folder Structure

```
/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  ← Minimal root layout (html/body + fonts)
│   │   ├── not-found.tsx               ← Custom 404 page
│   │   ├── robots.ts
│   │   ├── sitemap.ts
│   │   ├── globals.css
│   │   ├── (portfolio)/
│   │   │   ├── layout.tsx              ← Portfolio layout (ThemeProvider, Navbar, Footer, metadata)
│   │   │   └── page.tsx                ← Home / Portfolio page
│   │   └── playground/                 ← (Phase 4)
│   │       ├── layout.tsx
│   │       ├── page.tsx                ← Gallery grid
│   │       ├── quiz/[slug]/page.tsx
│   │       └── flip-card/page.tsx
│   │
│   ├── components/
│   │   ├── ui/                         ← Shared base components (Button, Badge, etc.)
│   │   ├── layout/                     ← Navbar, Footer, ThemeToggle
│   │   ├── sections/                   ← Hero, About, Skills, Projects, Contact
│   │   └── playground/                 ← (Phase 4) GameCard, QuizEngine, FlipCard
│   │
│   ├── data/                           ← Source of truth for all content
│   │   ├── personal.ts                 ← Name, role, bio, social links, stats
│   │   ├── skills.ts                   ← Skill categories with levels
│   │   ├── projects.ts                 ← Projects using STAR methodology
│   │   ├── journey.ts                  ← Career timeline
│   │   └── playground/                 ← (Phase 4) quiz questions, flip card data
│   │       ├── quiz-js-basics.ts
│   │       └── quiz-soft-skills.ts
│   │
│   ├── lib/
│   │   └── utils.ts                    ← cn() and shared helpers
│   │
│   └── __tests__/                      ← Vitest + React Testing Library
│
├── public/
│   ├── CV_Rizky_Milan_2026.pdf
│   ├── diagrams/
│   └── og-image.png
│
├── next.config.ts
└── package.json
```

---

## 6. Content Management Strategy

Content is managed directly as **typed TypeScript files** in `src/data/`. No external CMS or UI tool — edit in code, type-safe, zero runtime overhead.

| Content | File | How to Edit |
|---|---|---|
| Personal info (name, bio, links) | `src/data/personal.ts` | Edit directly |
| Skills & levels | `src/data/skills.ts` | Edit directly |
| Projects (STAR method) | `src/data/projects.ts` | Edit directly |
| Career timeline | `src/data/journey.ts` | Edit directly |
| Quiz questions (Phase 4) | `src/data/playground/quiz-*.ts` | Edit directly |
| Flip card data (Phase 4) | `src/data/playground/flip-cards.ts` | Edit directly |

**Project data shape** — preserves STAR methodology:
```ts
interface Project {
  id: string
  title: string
  subtitle: string
  situation: string
  task: string
  action: string[]
  result: string[]
  techStack: string[]
  impact: { label: string; value: string }[]
  featured: boolean
}
```

---

## 7. Content & Information Architecture (Main Portfolio)

### 7.1 Pages & Sections

1. **Hero Section**
   - Name & Current Role (e.g., Software Engineer & SRE)
   - Short impactful summary: *"Building resilient backend systems and scalable observability platforms."*
   - CTA: Link to Resume (PDF download) and GitHub

2. **About Me**
   - Evolution story: Web Dev → Backend → SRE
   - Highlighting adaptiveness and focus on operational excellence

3. **Skills / Core Competencies**
   - Grouped by category:
     - Backend: Ruby, Go, JavaScript
     - SRE & DevOps: Prometheus, Docker, Linux, CI/CD
     - Frontend: Next.js, Tailwind CSS

4. **Featured Projects (STAR Method)**
   - **ORION (SRE Monitoring Platform):** Centralized logging/alerting
   - **USphere (Server Trial Manager):** Go + DigitalOcean API automation
   - **Ukirama ERP Frontend Modernization:** Legacy Rails to Next.js migration

5. **Contact Section**
   - LinkedIn, Email, GitHub links

6. **Playground** *(separate page — see Section 8)*

---

## 8. Playground Section

### 8.1 Overview

A dedicated public-facing page (`/playground`) containing interactive mini-apps: quizzes, flip cards, and games. Designed to showcase frontend interactivity skills and engage visitors including recruiters.

- **Route:** `/playground`
- **Target Audience:** Public (recruiters, visitors, engineers)
- **Content Topics:** Tech/programming, soft skills, general knowledge

### 8.2 Architecture

**Plugin-based approach** — each game/quiz is an isolated, independently loadable module.

- Light/medium games: standard React dynamic import with `ssr: false`
- Future complex games: fully isolated via `next/dynamic` to prevent bundle bloat on other pages

```ts
// Code splitting — only loaded when user visits the game page
const HeavyGame = dynamic(() => import('@/components/playground/HeavyGame'), {
  ssr: false,
  loading: () => <LoadingSpinner />
})
```

### 8.3 Game Types & Tech

| Type | Complexity | Library / Approach |
|---|---|---|
| Quiz (MCQ + timer + score) | Light–Medium | Pure React state |
| Flip Card (term/definition) | Light | Framer Motion |
| Drag & Drop (e.g., code ordering) | Medium | `@dnd-kit/core` |
| Future complex games | Complex | `next/dynamic`, isolated module |

### 8.4 Gallery Page UX (`/playground`)

```
[Filter: All | Quiz | Game | Card]

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  JS Quiz         │  │  Tech Terms      │  │  Coming Soon    │
│  Easy · 10 Soal  │  │  Flip Card       │  │                 │
│  [Play Now]      │  │  [Explore]       │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

- Each card shows: title, type badge, difficulty tag, CTA button
- "Coming Soon" placeholder state for unreleased games
- Filter by: type (Quiz / Game / Card) and difficulty (Easy / Medium / Hard)

### 8.5 Content Management (Playground)

Quiz and card content lives in `src/data/playground/` as typed TypeScript files. Adding new questions = adding an entry to the array.

---

## 9. SEO & Discoverability

- **Meta tags:** Managed via Next.js `next/metadata` API in `(portfolio)/layout.tsx`
- **Open Graph:** `og:title`, `og:description`, `og:image` for LinkedIn/social sharing
- **Sitemap:** Auto-generated `sitemap.xml`
- **robots.txt:** Configured (allow all)
- **Structured Data:** JSON-LD `Person` schema injected in portfolio layout
- **Font Loading:** `next/font` with `display: swap` to prevent render blocking

---

## 10. Assets Strategy

| Asset | Tool | Notes |
|---|---|---|
| Architecture Diagrams | Excalidraw or Draw.io | Dark-themed SVG, export to `/public/diagrams/` |
| Profile Photo | Professional headshot or monochrome portrait | WebP format, compressed |
| Resume/CV | `CV_Rizky_Milan_2026.pdf` | Stored in `/public/`, linked from Hero CTA |
| OG Image | Figma or Canva | 1200×630px, stored as `/public/og-image.png` |
| Project Copywriting | `src/data/projects.ts` | STAR method, based on 2025 Annual Work Summary & CV |

---

## 11. Testing & Quality Assurance

As an SRE, the site must be production-grade.

| Area | Target / Requirement |
|---|---|
| Lighthouse Score | 95+ on Desktop & Mobile |
| Image Formats | WebP for photos, SVG for diagrams |
| Accessibility (a11y) | High contrast ratio, `aria-label` on all interactive elements |
| Browser Support | Chrome, Firefox, Safari |
| Responsive Breakpoints | Mobile, Tablet, Desktop, Ultra-wide (Tailwind `sm:` `md:` `lg:` `xl:`) |
| Bundle Size | Framer Motion lazy-loaded; Playground games use `next/dynamic` |
| 404 Handling | Custom `not-found.tsx` page |
| Theme Consistency | All color usage via CSS design tokens — verified in both Light and Dark mode |
| Type Safety | `npm run type-check` must pass; data interfaces enforced via TypeScript |

---

## 12. Development Phases & Priority

| Phase | Scope | Status |
|---|---|---|
| **Phase 1** | Project scaffold, theme system, layout, Hero, About | ✅ Done |
| **Phase 2** | Skills, Projects (STAR), Contact, SEO, sitemap | ✅ Done |
| **Phase 3** | Content data cleanup, route group restructure, remove Keystatic | ✅ Done |
| **Phase 4** | Playground page — single page, all client-side | ✅ Done  |
| **Phase 5** | Analytics, Lighthouse audit, a11y audit, cross-browser QA | 🔲 Pre-launch |

### Phase 4 Detail — Playground (`/playground`)

**Approach:** Single page, all client-side React. No SSR, no dynamic imports needed — all games are lightweight.

**Games to build:**

| Game | Type | Data Source |
|---|---|---|
| Quiz (MCQ + timer + score) | Quiz | `src/data/playground/quiz.ts` |
| Tech Term Flash Cards | Flip Card | `src/data/playground/flashcards.ts` |

**Page structure:**
- Filter bar: All / Quiz / Card
- Game gallery grid — each card opens the game inline (no separate route needed)
- Active game renders below or as an overlay/modal

**No `next/dynamic` needed** — all components are light enough to bundle together.

---

## 13. Nice-to-Have (Future Scope)

- **Leaderboard** on quiz games (via Cloudflare KV or D1 — serverless, aligns with SRE persona)
- **Blog / TIL (Today I Learned)** section — MDX posts in `src/data/posts/`
- **RSS Feed** for blog posts
- **CLI Easter Egg** — hidden terminal-style command palette (`⌘K`) for fun
- **i18n** — Bahasa Indonesia / English toggle (low priority)
