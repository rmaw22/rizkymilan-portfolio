'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
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
  easy: '#22c55e',
  medium: '#f59e0b',
  hard: '#f87171',
}

const difficultyLabel: Record<string, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
}

// Category accent colors (top border + icon bg + badge)
const categoryStyle: Record<string, { border: string; iconBg: string; iconColor: string; badgeBg: string; badgeText: string }> = {
  quiz: {
    border: 'var(--accent)',
    iconBg: 'var(--accent-subtle)',
    iconColor: 'var(--accent)',
    badgeBg: 'var(--accent-subtle)',
    badgeText: 'var(--accent)',
  },
  card: {
    border: '#a855f7',
    iconBg: '#f5f3ff',
    iconColor: '#7c3aed',
    badgeBg: '#f5f3ff',
    badgeText: '#7c3aed',
  },
}

export default function PlaygroundPage() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [sort, setSort]     = useState<SortType>('title-asc')
  const [sortOpen, setSortOpen] = useState(false)
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
    <div className="min-h-screen pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto">

      {/* ── Header + Search ── */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
        <div>
          <h1
            className="text-3xl font-bold mb-1"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}
          >
            Playground
          </h1>
          <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
            Explore interactives, quizzes, and flash cards to boost your learning.
          </p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          {/* Search input */}
          <div className="relative flex-grow md:w-64">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: 'var(--text-muted)' }}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              placeholder="Find an activity…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg text-sm outline-none transition-all duration-150"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>

          {/* Sort button + dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(o => !o)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150"
              style={{
                background: sortOpen ? 'var(--bg-secondary)' : 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h6M15 16h2" />
              </svg>
              <span className="hidden sm:inline">Sort</span>
            </button>

            <AnimatePresence>
              {sortOpen && (
                <>
                  {/* backdrop to close */}
                  <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1 w-52 rounded-xl overflow-hidden z-20"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                    }}
                  >
                    {sortOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => { setSort(opt.value); setSortOpen(false) }}
                        className="w-full text-left px-4 py-2.5 text-sm transition-colors duration-100"
                        style={{
                          background: sort === opt.value ? 'var(--accent-subtle)' : 'transparent',
                          color: sort === opt.value ? 'var(--accent)' : 'var(--text-primary)',
                          fontWeight: sort === opt.value ? 600 : 400,
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Filter Tabs ── */}
      <section
        className="flex gap-1 overflow-x-auto pb-0 mb-8"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        {filters.map(f => {
          const isActive = filter === f.value
          return (
            <button
              key={f.value}
              onClick={() => { setFilter(f.value); setActive(null) }}
              className="px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-150"
              style={{
                color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                borderBottom: isActive ? '2px solid var(--text-primary)' : '2px solid transparent',
                marginBottom: '-1px',
                background: 'transparent',
              }}
            >
              {f.label}
            </button>
          )
        })}
      </section>

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

            const badgeLabel = kind === 'quiz' ? 'Quiz' : 'Flash Cards'
            const icon = kind === 'quiz' ? '🧠' : '🃏'
            const metaRight =
              kind === 'quiz' && quiz
                ? `${quiz.questions.length} Questions`
                : deck
                ? `${deck.cards.length} Cards`
                : ''
            const difficultyKey = quiz?.difficulty ?? 'easy'

            return (
              <motion.div
                key={`${kind}-${data.id}`}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.2 }}
                className="rounded-xl overflow-hidden flex flex-col cursor-pointer group self-start"
                style={{
                  background: 'var(--bg-card)',
                  borderTop: `4px solid ${style.border}`,
                  borderRight: `1px solid ${isActive ? style.border : 'var(--border)'}`,
                  borderBottom: `1px solid ${isActive ? style.border : 'var(--border)'}`,
                  borderLeft: `1px solid ${isActive ? style.border : 'var(--border)'}`,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 0.15s ease, transform 0.15s ease',
                }}
                onMouseEnter={e => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                }}
              >
                {/* Card body — clickable */}
                <button
                  className="w-full text-left flex flex-col gap-3 p-5"
                  onClick={() => {
                    if (kind === 'quiz') {
                      setActive(isActive ? null : { type: 'quiz', id: data.id })
                    } else {
                      setActive(isActive ? null : { type: 'card', id: data.id })
                    }
                  }}
                >
                  {/* Icon row + badge */}
                  <div className="flex justify-between items-start">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-xl transition-transform duration-150 group-hover:scale-110"
                      style={{ background: style.iconBg }}
                    >
                      {icon}
                    </div>
                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: style.badgeBg, color: style.badgeText }}
                    >
                      {badgeLabel}
                    </span>
                  </div>

                  {/* Title + description */}
                  <div>
                    <h3
                      className="font-bold text-base mb-1 transition-colors duration-150 group-hover:text-[var(--accent)]"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {data.title}
                    </h3>
                    <p
                      className="text-sm line-clamp-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {data.description}
                    </p>
                  </div>

                  {/* Footer meta */}
                  <div
                    className="flex justify-between items-center text-xs pt-3 mt-auto"
                    style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}
                  >
                    {/* Difficulty dot */}
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full inline-block"
                        style={{ background: difficultyColor[difficultyKey] }}
                      />
                      {difficultyLabel[difficultyKey]}
                    </span>

                    {/* Right meta */}
                    <span className="flex items-center gap-1">
                      {metaRight}
                    </span>
                  </div>
                </button>

                {/* Inline expanded game */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-5 pb-6 pt-3"
                        style={{ borderTop: '1px solid var(--border)' }}
                      >
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
          <div className="col-span-full py-16 text-center" style={{ color: 'var(--text-muted)' }}>
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-medium">No activities found</p>
            <p className="text-sm mt-1">Try a different search or filter</p>
          </div>
        )}
      </div>
    </div>
  )
}
