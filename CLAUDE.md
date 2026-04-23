# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build (static export to out/)
npm run test         # Run all tests once (Vitest)
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run lint         # ESLint
npm run type-check   # TypeScript check (tsc --noEmit)
```

Run a single test file:
```bash
npx vitest run src/__tests__/Navbar.test.tsx
```

## Architecture

Personal portfolio site (Next.js 15, TypeScript, Tailwind CSS v4, static export).

### Data Layer — Dual System

There are two parallel data sources that must stay in sync:

1. **Static TypeScript** (`src/data/`) — primary runtime data used by components directly. The source of truth for tests.
2. **Keystatic CMS** (`src/content/`) — YAML files managed via the Keystatic admin UI at `/keystatic` (dev only). Read via `src/lib/content.ts` async reader functions.

Components currently import from `src/data/` directly. The Keystatic reader (`src/lib/content.ts`) provides async alternatives (`getProjects()`, `getPersonal()`, etc.) for future server-side use.

### Build Strategy

The production build script temporarily renames `src/app/api` and `src/app/keystatic` to exclude them from the static export, then restores them. This lets the site export as pure HTML while keeping Keystatic available in dev/start modes. Do not add new dynamic API routes without accounting for this.

### Key Patterns

- **Path alias**: `@/` → `./src/`
- **Theme**: `next-themes` with `ThemeProvider` wrapping the app; components use `dark:` Tailwind variants
- **Animations**: Framer Motion for component-level; GSAP for timeline/cinematic sequences. Tests must mock both (`vi.mock('framer-motion', ...)`)
- **className composition**: always use `cn()` from `@/lib/utils` (wraps `clsx` + `tailwind-merge`)
- **Section data shape**: Projects use STAR methodology (`situation`, `task`, `action[]`, `result[]`) — preserve this structure when editing

### Testing Conventions

Tests live in `src/__tests__/`. External dependencies that cause issues in jsdom (framer-motion, next-themes, next/navigation) are mocked at the test file level. Data integrity tests in `data.test.ts` validate required fields — update them when adding new required fields to data interfaces.
