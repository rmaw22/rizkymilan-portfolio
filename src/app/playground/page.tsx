'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Layers, Search, SearchX } from 'lucide-react'
import { quizzes } from '@/data/playground/quiz'
import { flashcardDecks } from '@/data/playground/flashcards'
import { QuizGame } from '@/components/playground/QuizGame'
import { FlashCardGame } from '@/components/playground/FlashCardGame'

type FilterType = 'all' | 'quiz' | 'card'
type SortType = 'title-asc' | 'title-desc' | 'difficulty-asc' | 'difficulty-desc'
type ActiveGame =
  | { type: 'quiz'; id: string }
  | { type: 'card'; id: string }
  | null

const difficultyRank: Record<string, number> = { easy: 0, medium: 1, hard: 2 }

const sortOptions: { value: SortType; label: string }[] = [
  { value: 'title-asc',        label: 'Title A → Z' },
  { value: 'title-desc',       label: 'Title Z → A' },
  { value: 'difficulty-asc',   label: 'Difficulty: Easy first' },
  { value: 'difficulty-desc',  label: 'Difficulty: Hard first' },
]

const difficultyColor: Record<string, string> = {
  easy: 'var(--terminal)',
  medium: 'var(--text-muted)',
  hard: 'var(--danger)',
}

const difficultyLabel: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
}

// Per-kind accent, built from theme tokens so both themes stay in sync
const categoryStyle = {
  quiz: {
    color: 'var(--accent)',
    tint: 'var(--accent-subtle)',
    label: 'Quiz',
    icon: Brain,
  },
  card: {
    color: 'var(--terminal)',
    tint: 'color-mix(in srgb, var(--terminal) 12%, transparent)',
    label: 'Flash Cards',
    icon: Layers,
  },
} as const

export default function PlaygroundPage() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [sort, setSort]     = useState<SortType>('title-asc')
  const [active, setActive] = useState<ActiveGame>(null)
  const [search, setSearch] = useState('')

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'quiz', label: 'Quiz' },
    { value: 'card', label: 'Flash Cards' },
  ]

  const showQuizzes = filter === 'all' || filter === 'quiz'
  const showCards = filter === 'all' || filter === 'card'

  function close() { setActive(null) }

  const activeQuiz = active?.type === 'quiz' ? quizzes.find(q => q.id === active.id) : null
  const activeDeck = active?.type === 'card' ? flashcardDecks.find(d => d.id === active.id) : null

  const filteredQuizzes = quizzes.filter(q =>
    q.title.toLowerCase().includes(search.toLowerCase()) ||
    q.description.toLowerCase().includes(search.toLowerCase())
  )
  const filteredDecks = flashcardDecks.filter(d =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.description.toLowerCase().includes(search.toLowerCase())
  )

  // Build unified card list
  type CardItem =
    | { kind: 'quiz'; data: typeof quizzes[number] }
    | { kind: 'card'; data: typeof flashcardDecks[number] }

  const unsortedCards: CardItem[] = [
    ...(showQuizzes ? filteredQuizzes.map(q => ({ kind: 'quiz' as const, data: q })) : []),
    ...(showCards ? filteredDecks.map(d => ({ kind: 'card' as const, data: d })) : []),
  ]

  const cards = [...unsortedCards].sort((a, b) => {
    if (sort === 'title-asc')  return a.data.title.localeCompare(b.data.title)
    if (sort === 'title-desc') return b.data.title.localeCompare(a.data.title)
    const ra = difficultyRank[(a.kind === 'quiz' ? (a.data as typeof quizzes[number]).difficulty : 'easy')] ?? 0
    const rb = difficultyRank[(b.kind === 'quiz' ? (b.data as typeof quizzes[number]).difficulty : 'easy')] ?? 0
    return sort === 'difficulty-asc' ? ra - rb : rb - ra
  })

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 lg:px-8 max-w-6xl mx-auto">

      {/* ── Header + Search ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
        <div>
          <h1
            className="text-3xl font-bold mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            Playground
          </h1>
          <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
            Explore interactives, quizzes, and flash cards to boost your learning.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search
              size={16}
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]"
            />
            <input
              type="search"
              aria-label="Search activities"
              placeholder="Search activities"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-11 pl-9 pr-3 rounded-lg text-base border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
            />
          </div>

          <select
            aria-label="Sort activities"
            value={sort}
            onChange={e => setSort(e.target.value as SortType)}
            className="h-11 px-3 rounded-lg text-sm font-medium border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text-primary)]"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ── Filter Tabs ── */}
      <div
        role="group"
        aria-label="Filter by type"
        className="flex gap-1 overflow-x-auto mb-8 border-b border-[var(--border)]"
      >
        {filters.map(f => {
          const isActive = filter === f.value
          return (
            <button
              key={f.value}
              onClick={() => { setFilter(f.value); setActive(null) }}
              aria-pressed={isActive}
              className="px-4 py-3 text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors duration-150"
              style={{
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                marginBottom: '-1px',
              }}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      {/* ── Card Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {cards.map(({ kind, data }) => {
            const isActive =
              (kind === 'quiz' && active?.type === 'quiz' && active.id === data.id) ||
              (kind === 'card' && active?.type === 'card' && active.id === data.id)

            const style = categoryStyle[kind]
            const quiz = kind === 'quiz' ? (data as typeof quizzes[number]) : null
            const deck = kind === 'card' ? (data as typeof flashcardDecks[number]) : null

            const Icon = style.icon
            const metaRight =
              kind === 'quiz' && quiz
                ? `${quiz.questions.length} Questions`
                : deck
                ? `${deck.cards.length} Cards`
                : ''
            const panelId = `activity-panel-${kind}-${data.id}`

            return (
              <motion.div
                key={`${kind}-${data.id}`}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl overflow-hidden flex flex-col group self-start border bg-[var(--bg-card)]"
                style={{ borderColor: isActive ? style.color : 'var(--border)' }}
              >
                {/* Card body — clickable */}
                <button
                  className="w-full text-left flex flex-col gap-3 p-5 cursor-pointer"
                  aria-expanded={isActive}
                  aria-controls={panelId}
                  onClick={() => setActive(isActive ? null : { type: kind, id: data.id })}
                >
                  <div className="flex justify-between items-start">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: style.tint, color: style.color }}
                    >
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-md"
                      style={{ background: style.tint, color: style.color }}
                    >
                      {style.label}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-bold text-base mb-1 text-[var(--text-primary)] transition-colors duration-150 group-hover:text-[var(--accent)]">
                      {data.title}
                    </h2>
                    <p className="text-sm line-clamp-2 text-[var(--text-secondary)]">
                      {data.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-3 mt-auto border-t border-[var(--border)] text-[var(--text-muted)]">
                    {/* Only quizzes carry a difficulty */}
                    {quiz ? (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          aria-hidden="true"
                          style={{ background: difficultyColor[quiz.difficulty] }}
                        />
                        {difficultyLabel[quiz.difficulty]}
                      </span>
                    ) : (
                      <span>Self-paced</span>
                    )}
                    <span>{metaRight}</span>
                  </div>
                </button>

                {/* Inline expanded game */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 pt-4 border-t border-[var(--border)]">
                        {kind === 'quiz' && activeQuiz && (
                          <QuizGame quiz={activeQuiz} onClose={close} />
                        )}
                        {kind === 'card' && activeDeck && (
                          <FlashCardGame deck={activeDeck} onClose={close} />
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* Empty state */}
        {cards.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center text-center" role="status">
            <SearchX size={32} aria-hidden="true" className="mb-3 text-[var(--text-muted)]" />
            <p className="font-medium text-[var(--text-primary)]">
              {search ? `No activities match “${search}”` : 'No activities here yet'}
            </p>
            {(search || filter !== 'all') && (
              <button
                onClick={() => { setSearch(''); setFilter('all') }}
                className="mt-4 px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
              >
                Clear search and filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
