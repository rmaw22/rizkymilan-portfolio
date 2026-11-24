'use client'

import { useState } from 'react'
import type { FlashCardDeck } from '@/data/playground/flashcards'

interface Props {
  deck: FlashCardDeck
  onClose: () => void
}

const faceClass =
  'absolute inset-0 flex items-center justify-center rounded-xl p-6 text-center border bg-[var(--bg-secondary)]'

const controlClass =
  'px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] disabled:opacity-40 disabled:cursor-not-allowed'

export function FlashCardGame({ deck, onClose }: Props) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  function prev() { setIndex(i => Math.max(0, i - 1)); setFlipped(false) }
  function next() { setIndex(i => Math.min(deck.cards.length - 1, i + 1)); setFlipped(false) }

  const card = deck.cards[index]

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-xs font-mono text-[var(--text-secondary)]">
        Card {index + 1} of {deck.cards.length} · select the card to flip it
      </p>

      {/* Flip card — a real button so it works from the keyboard */}
      <button
        type="button"
        onClick={() => setFlipped(f => !f)}
        className="block w-full max-w-sm h-44 cursor-pointer rounded-xl"
        style={{ perspective: '1000px' }}
      >
        <span
          className="relative block w-full h-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <span
            aria-hidden={flipped}
            className={`${faceClass} border-[var(--border)]`}
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <span className="text-xl font-mono font-semibold text-[var(--accent)]">{card.term}</span>
          </span>

          <span
            aria-hidden={!flipped}
            className={`${faceClass} border-[var(--accent)]`}
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <span className="text-sm text-[var(--text-primary)]">{card.definition}</span>
          </span>
        </span>
        <span className="sr-only">{flipped ? ' — show term' : ' — show definition'}</span>
      </button>

      <div className="flex items-center gap-3">
        <button onClick={prev} disabled={index === 0} className={controlClass}>
          Previous
        </button>
        <button onClick={next} disabled={index === deck.cards.length - 1} className={controlClass}>
          Next
        </button>
        <button onClick={onClose} className={controlClass}>
          Close
        </button>
      </div>
    </div>
  )
}
