Add a new project entry to `src/data/projects.ts` using the STAR methodology.

## Steps

1. **Ask the user** for the following fields (one message, all at once):
   - `title` — project name
   - `subtitle` — one-line tagline
   - `description` — 1–2 sentence summary
   - `period` — e.g. "Jan 2024 – Present"
   - `situation` — context / problem that existed
   - `task` — what you were responsible for
   - `action` — list of concrete steps taken (ask for bullet points)
   - `result` — list of measurable outcomes (ask for bullet points)
   - `techStack` — comma-separated list of technologies
   - `impact` — list of metric pairs: label + value (e.g. "Uptime → 99.9%")
   - `featured` — true or false

2. **Generate a slug** `id` from the title (lowercase, hyphen-separated).

3. **Read** `src/data/projects.ts` to understand the current array.

4. **Append** the new project object to the `projects` array, following the exact same TypeScript shape as existing entries.

5. **Run** `npm run type-check` to validate. If it fails, fix the type error before finishing.

6. **Run** `npx vitest run src/__tests__/data.test.ts` to confirm data integrity.

## Rules
- Preserve the existing file structure — do not reformat or reorder existing entries.
- `action` and `result` must be `string[]`.
- `impact` must be `{ label: string; value: string }[]`.
- `techStack` must be `string[]`.
