Add a new career timeline entry to `src/data/journey.ts`.

## Steps

1. **Ask the user** for the following fields (one message, all at once):
   - `year` — e.g. "2025"
   - `period` — e.g. "Jan 2025 – Present"
   - `role` — job title
   - `company` — company name
   - `description` — 1–2 sentence summary of responsibilities
   - `highlight` — one standout achievement or metric from this role

2. **Read** `src/data/journey.ts` to understand the current array and ordering (newest first or oldest first — match existing order).

3. **Insert** the new entry at the correct chronological position.

4. **Run** `npm run type-check` to validate. Fix any type errors before finishing.

5. **Run** `npx vitest run src/__tests__/data.test.ts` to confirm data integrity.

## Rules
- Match the `JourneyItem` interface exactly — do not add extra fields.
- All fields are required strings — no empty strings.
- Preserve existing entry order and formatting.
