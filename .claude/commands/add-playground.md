Add new content to the Playground — either a Quiz or a Flash Card deck — in `src/data/playground/`.

## Steps

1. **Ask the user** which type they want to add:
   - `quiz` → adds to `src/data/playground/quiz.ts`
   - `flashcard` → adds to `src/data/playground/flashcards.ts`

### If Quiz:
Ask for:
- `id` — unique slug, e.g. `"go-basics"`
- `title` — display name
- `description` — one sentence
- `difficulty` — `easy` | `medium` | `hard`
- `durationSeconds` — total timer for the quiz (e.g. 60)
- `questions` — for each question:
  - `question` — the question text
  - `options` — 4 answer choices
  - `answer` — index (0–3) of the correct option
  - `explanation` — brief explanation shown after answering

Then append the new `Quiz` object to the `quizzes` array in `src/data/playground/quiz.ts`.

### If Flash Card:
Ask for:
- `id` — unique slug, e.g. `"docker-terms"`
- `title` — display name
- `description` — one sentence
- `cards` — for each card:
  - `term` — the front of the card
  - `definition` — the back of the card

Then append the new `FlashCardDeck` object to the `flashcardDecks` array in `src/data/playground/flashcards.ts`.

## After editing:
1. **Run** `npm run type-check` — fix any type errors before finishing.
2. Confirm the new item appears in the gallery at `/playground`.

## Rules
- Match the existing TypeScript interface exactly (`Quiz` or `FlashCardDeck`).
- `id` must be unique across all existing entries in the same file.
- Do not reformat or reorder existing entries.
