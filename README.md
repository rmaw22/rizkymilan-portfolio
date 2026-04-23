# Rizky Milan — Portfolio

> Personal portfolio of **Rizky Milan Alpasya Wijaksono** — Software Engineer & Site Reliability Engineer.
> Built with Next.js 15, TypeScript, Framer Motion, and deployed on Cloudflare Pages.

---

## ✨ Features

- **Cinematic Hero** — Dashboard-style mock-up with animated metrics and a progress ring
- **About** — Background, experience timeline, and career stats
- **Skills** — Tech stack organized by category with visual indicators
- **Projects** — STAR-format breakdowns (Situation → Task → Action → Result) with a blur-lock gimmick on T/A/R to encourage contact
- **Contact** — Direct contact form / links
- **Playground** — Interactive learning tools: quizzes and flashcard decks with filter, search, and sort
- **Dark / Light theme** — CSS variable-driven design system, persisted via `next-themes`
- **Fully static** — Exported as static HTML/CSS/JS, zero server required

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router, Static Export) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + Vanilla CSS variables |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Fonts | Inter, Space Grotesk, JetBrains Mono (via `next/font`) |
| Deployment | [Cloudflare Pages](https://pages.cloudflare.com/) |
| Testing | Vitest + Testing Library |

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
│   └── layout.tsx            # Root layout (fonts + globals)
├── components/
│   ├── layout/               # Navbar, Footer, ThemeToggle
│   ├── sections/             # Hero, About, Skills, Projects, Contact
│   ├── playground/           # QuizGame, FlashCardGame
│   ├── providers/            # ThemeProvider
│   └── ui/                   # Badge, AnimatedSection, GlowCard, SectionHeading
├── data/
│   ├── personal.ts           # Name, role, links, resume URL
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

- Node.js `>= 20`
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
| Node.js version | `20` |

### Environment Variables

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `NODE_VERSION` | `20` |

Every push to `main` triggers an automatic deployment. ✅

---

## 🎨 Design System

All design tokens are defined as CSS custom properties in `src/app/globals.css`:

```css
:root {
  --bg-primary:    #fafafa;
  --bg-card:       #ffffff;
  --text-primary:  #09090b;
  --text-secondary:#3f3f46;
  --accent:        #2563eb;   /* electric blue */
  --terminal:      #16a34a;   /* SRE green */
  --border:        #e4e4e7;
}
```

Dark mode tokens override the same variables under `[data-theme="dark"]`.

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
| `npm run lint` | ESLint check |
| `npm run type-check` | TypeScript check without emit |
| `npm test` | Run Vitest tests |

---

## 📄 License

Private — all rights reserved. © Rizky Milan Alpasya Wijaksono
