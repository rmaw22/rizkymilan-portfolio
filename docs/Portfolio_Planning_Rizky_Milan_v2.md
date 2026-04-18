# Portfolio Website Planning Document: Rizky Milan Alpasya Wijaksono
**Version:** 2.0
**Last Updated:** April 2026

---

## 1. Project Overview & Objectives

- **Project Name:** Rizky Milan Personal Portfolio
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
| Framework | Next.js (App Router) | SSG output mode |
| Styling | Tailwind CSS | Utility-first, responsive |
| Theme Management | `next-themes` | Light / Dark / System |
| Animations | Framer Motion | Strict usage: subtle transitions only |
| Icons | Lucide React or Heroicons | Lightweight SVG |
| Typography | Inter (body) + JetBrains Mono / Fira Code | Code & tech stack highlights |
| CMS | Keystatic CMS | Local, file-based, UI-driven |
| Package Manager | pnpm | Faster installs, strict dep management |
| Version Control | Git & GitHub | — |
| Interactive UI (Playground) | React state + Framer Motion + `@dnd-kit/core` | Per game type |

---

## 3. Theme Strategy

- **Default Mode:** Light Mode
- **Options:** Light / Dark / System
- **Library:** `next-themes`
- **Implementation:** CSS custom properties (design tokens), NOT hardcoded Tailwind `dark:` classes
- **Scope:** Applied globally via `ThemeProvider` in root layout

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

> All Tailwind classes must reference these tokens, not hardcode color values.

---

## 4. Architecture & Deployment Strategy

- **Rendering Method:** Static Site Generation (SSG). `output: 'export'` in `next.config.js`.
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
├── app/
│   ├── layout.tsx                  ← Root layout with ThemeProvider
│   ├── page.tsx                    ← Home / Portfolio page
│   ├── not-found.tsx               ← Custom 404 page
│   └── playground/
│       ├── layout.tsx              ← Playground shared layout
│       ├── page.tsx                ← Playground gallery (grid of all mini-apps)
│       ├── quiz/
│       │   └── [slug]/
│       │       └── page.tsx        ← Dynamic quiz page per topic
│       ├── flip-card/
│       │   └── page.tsx
│       └── [slug]/
│           └── page.tsx            ← Future-proof: dynamic route for new games
│
├── components/
│   ├── ui/                         ← Shared base components (Button, Badge, etc.)
│   ├── layout/                     ← Navbar, Footer, ThemeToggle
│   ├── sections/                   ← Hero, About, Skills, Projects, Contact
│   └── playground/
│       ├── GameCard.tsx            ← Card shown in gallery
│       ├── QuizEngine.tsx          ← Reusable quiz logic component
│       ├── FlipCard.tsx            ← Flip card component
│       └── PlaygroundFilter.tsx    ← Filter by type/difficulty
│
├── content/
│   ├── projects/                   ← MDX per project (STAR method)
│   │   ├── orion.mdx
│   │   ├── usphere.mdx
│   │   └── ukirama.mdx
│   ├── skills.yaml                 ← Grouped skills data
│   ├── about.mdx                   ← About Me content
│   └── playground/
│       ├── quiz-js-basics.yaml
│       ├── quiz-soft-skills.yaml
│       └── quiz-general.yaml
│
├── public/
│   ├── CV_Rizky_Milan_2026.pdf     ← Downloadable resume
│   ├── diagrams/                   ← SVG architecture diagrams
│   │   ├── orion-flow.svg
│   │   └── usphere-flow.svg
│   └── og-image.png                ← Open Graph image for social sharing
│
├── lib/
│   ├── content.ts                  ← Helper to load MDX/YAML content
│   └── utils.ts
│
├── keystatic.config.ts             ← Keystatic CMS configuration
└── next.config.js                  ← output: 'export' + other config
```

---

## 6. Content Management Strategy

- **Tool:** Keystatic CMS (local, file-based, UI-driven)
- **Why:** Edit content via browser UI (`/keystatic` route), output stays as flat files (MDX/YAML) — fully compatible with SSG.
- **Edit Workflow:** The `/keystatic` route is active in development only; disabled in production build.
- **Content Types:**

| Content | Format | Managed Via |
|---|---|---|
| Projects (STAR) | MDX | Keystatic |
| Skills | YAML | Keystatic |
| About Me | MDX | Keystatic |
| Quiz Questions | YAML | Keystatic |
| Flip Card Data | YAML | Keystatic |

**Example Quiz YAML:**
```yaml
# content/playground/quiz-js-basics.yaml
title: "JavaScript Basics"
difficulty: "easy"
category: "tech"
tags: ["javascript", "frontend"]
questions:
  - question: "What does `typeof null` return?"
    options: ["null", "object", "undefined", "string"]
    answer: 1
    explanation: "Famous JS quirk — null is historically typed as object."
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
│  🧠 JS Quiz      │  │  🃏 Tech Terms   │  │  🎮 Coming Soon  │
│  Easy · 10 Soal  │  │  Flip Card      │  │                 │
│  [Play Now]     │  │  [Explore]      │  │                 │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

- Each card shows: title, type badge, difficulty tag, CTA button
- "Coming Soon" placeholder state for unreleased games
- Filter by: type (Quiz / Game / Card) and difficulty (Easy / Medium / Hard)

### 8.5 Content Management (Playground)

Quiz and card content is fully managed via Keystatic CMS — no code changes needed to add new questions or cards. Adding content = editing a YAML file via the CMS UI.

---

## 9. SEO & Discoverability

- **Meta tags:** Managed via Next.js `next/metadata` API per page
- **Open Graph:** `og:title`, `og:description`, `og:image` for LinkedIn/social sharing
- **Sitemap:** Auto-generated `sitemap.xml`
- **robots.txt:** Configured (allow all, disallow `/keystatic`)
- **Structured Data:** JSON-LD `Person` schema on homepage
- **Font Loading:** `next/font` with `display: swap` to prevent render blocking

---

## 10. Assets Strategy

| Asset | Tool | Notes |
|---|---|---|
| Architecture Diagrams | Excalidraw or Draw.io | Dark-themed SVG, export to `/public/diagrams/` |
| Profile Photo | Professional headshot or monochrome portrait | WebP format, compressed |
| Resume/CV | `CV_Rizky_Milan_2026.pdf` | Stored in `/public/`, linked from Hero CTA |
| OG Image | Figma or Canva | 1200×630px, stored as `/public/og-image.png` |
| Project Copywriting | Separate doc, STAR method | Based on 2025 Annual Work Summary & CV |

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

---

## 12. Development Phases & Priority

| Phase | Scope | Priority |
|---|---|---|
| **Phase 1** | Project scaffold, theme system, layout, Hero, About | High |
| **Phase 2** | Skills, Projects (STAR), Contact, SEO, sitemap | High |
| **Phase 3** | Keystatic CMS integration, content migration | Medium |
| **Phase 4** | Playground gallery page + Quiz v1 + Flip Card v1 | Medium |
| **Phase 5** | Drag & Drop game, additional quiz topics | Low |
| **Phase 6** | Analytics, Lighthouse audit, a11y audit, cross-browser QA | High (pre-launch) |

---

## 13. Nice-to-Have (Future Scope)

- **Leaderboard** on quiz games (via Cloudflare KV or D1 — serverless, aligns with SRE persona)
- **Blog / TIL (Today I Learned)** section — MDX posts, managed via Keystatic
- **RSS Feed** for blog posts
- **CLI Easter Egg** — hidden terminal-style command palette (`⌘K`) for fun
- **i18n** — Bahasa Indonesia / English toggle (low priority)
