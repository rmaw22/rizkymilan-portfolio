# Rizky Milan — Portfolio

> Personal portfolio of **Rizky Milan Alpasya Wijaksono** — Software Engineer & Site Reliability Engineer.
> Built with Next.js 16, TypeScript, GSAP, Framer Motion, and deployed on Cloudflare Pages.

---

## ✨ Features

- **Cinematic Hero** — Scroll-driven GSAP sequence (pinned for ~2500px): headline → dashboard mock-up with animated metric ring → resume/GitHub CTA. Falls back to a static headline under `prefers-reduced-motion`
- **About** — Background, experience timeline, and career stats
- **Skills** — Tech stack grouped by domain, with one shared level legend (Expert / Proficient / Familiar)
- **Projects** — STAR-format breakdowns (Situation → Task → Action → Result). Situation is public; T/A/R sit behind a deliberate "shared on request" lock to encourage contact
- **Contact** — Link cards (email, LinkedIn, GitHub, X, Threads) generated from `src/data/personal.ts`
- **Playground** — Quizzes and flashcard decks with filter, search, and sort
- **Dark / Light / System theme** — CSS variable-driven design tokens, persisted via `next-themes`
- **Accessible by default** — WCAG 2.2 AA contrast in both themes, skip link, keyboard-operable controls, 44px touch targets, current-section highlight in the nav
- **Fully static** — Exported as static HTML/CSS/JS, zero server required

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Turbopack, Static Export) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Vanilla CSS variables |
| Animation | [GSAP](https://gsap.com/) + ScrollTrigger (hero), [Framer Motion](https://www.framer.com/motion/) (sections, playground) |
| Icons | [Lucide React](https://lucide.dev/) |
| Fonts | Plus Jakarta Sans, JetBrains Mono (via `next/font`) |
| Deployment | [Cloudflare Pages](https://pages.cloudflare.com/) |
| Testing | Vitest 5 + Testing Library |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (portfolio)/          # Portfolio route group
│   │   ├── layout.tsx        # Shared layout (Navbar + Footer)
│   │   └── page.tsx          # Home page
│   ├── playground/
│   │   ├── layout.tsx        # Playground layout (Navbar + Footer)
│   │   └── page.tsx          # Playground page
│   ├── not-found.tsx         # 404 page
│   └── layout.tsx            # Root layout (fonts + globals)
├── components/
│   ├── layout/               # Navbar, Footer, ThemeToggle
│   ├── sections/             # Hero, About, Skills, Projects, Contact
│   ├── playground/           # QuizGame, FlashCardGame
│   ├── providers/            # ThemeProvider
│   └── ui/                   # Section, Card, SectionHeading, Badge, Button, AnimatedSection,
│                             # social (shared contact links), cinematic-landing-hero
├── data/
│   ├── personal.ts           # Name, role, links, resume URL
│   ├── journey.ts            # Career timeline
│   ├── projects.ts           # Project STAR data
│   ├── skills.ts             # Tech stack list
│   └── playground/
│       ├── quiz.ts           # Quiz questions
│       └── flashcards.ts     # Flashcard decks
└── app/globals.css           # Design tokens (CSS variables)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 22.12` (Next.js 16 needs `>= 20.9`; Vitest 5 needs `>= 22.12`)
- npm

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server (runs on port 3001)
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

### Build (Static Export)

```bash
npm run build
```

Output is in the `out/` directory — ready to deploy anywhere static files are served.

---

## ☁️ Deployment (Cloudflare Pages)

### Cloudflare Pages Build Settings

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Build output directory | `out` |
| Node.js version | `22` |

### Environment Variables

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `NODE_VERSION` | `22` |

Every push to `main` triggers an automatic deployment. ✅

---

## 🎨 Design System

All design tokens are CSS custom properties in `src/app/globals.css`. Dark mode overrides the same
variables under `[data-theme="dark"]`.

```css
:root {
  --bg-primary:    #fafafa;
  --bg-secondary:  #f4f4f5;   /* muted section band */
  --bg-card:       #ffffff;
  --text-primary:  #09090b;
  --text-secondary:#3f3f46;
  --text-muted:    #63636e;
  --accent:        #2563eb;
  --accent-fg:     #ffffff;   /* text on an accent fill */
  --terminal:      #15803d;   /* success / SRE green */
  --danger:        #b91c1c;
  --border:        #e4e4e7;
}
```

Conventions:

- **One font family.** Plus Jakarta Sans for headings and body (`--font-sans`); JetBrains Mono (`--font-mono`) for labels, handles, and code-like text.
- **Use tokens, not hex.** Text on an accent background uses `--accent-fg` (it flips to dark in dark mode), never `#fff`.
- **`Section`** owns page width, gutters, and vertical rhythm; `tone="muted"` paints a full-width band.
- **`Card`** is the only card surface. No nested cards, no glow effects.
- **Icons** come from Lucide. No emoji as icons.
- **Hero copy** (headline, card text, badges) lives in `src/components/sections/Hero.tsx`.

---

## 🧪 Testing

```bash
# Run tests once
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

---

## 📝 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server on port 3001 |
| `npm run build` | Static export to `out/` |
| `npm run lint` | ESLint check (`eslint .`; existing `no-explicit-any` and `set-state-in-effect` errors are known) |
| `npm run type-check` | TypeScript check without emit |
| `npm test` | Run Vitest tests |

---

## 📄 License

Private — all rights reserved. © Rizky Milan Alpasya Wijaksono
