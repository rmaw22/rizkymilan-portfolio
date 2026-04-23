'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { FlashCardDeck } from '@/data/playground/flashcards'

interface Props {
  deck: FlashCardDeck
  onClose: () => void
}

export function FlashCardGame({ deck, onClose }: Props) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  function prev() { setIndex(i => Math.max(0, i - 1)); setFlipped(false) }
  function next() { setIndex(i => Math.min(deck.cards.length - 1, i + 1)); setFlipped(false) }

  const card = deck.cards[index]

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
        {index + 1} / {deck.cards.length} — click card to flip
      </p>

      {/* Flip card */}
      <div
        className="w-full max-w-sm cursor-pointer"
        style={{ perspective: '1000px', height: '160px' }}
        onClick={() => setFlipped(f => !f)}
      >
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-xl p-6 text-center"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
            }}
          >
            <span className="text-xl font-mono font-semibold" style={{ color: 'var(--accent)' }}>
              {card.term}
            </span>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-xl p-6 text-center"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--accent)',
            }}
          >
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{card.definition}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <button
          onClick={prev}
          disabled={index === 0}
          className="px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
        >
          ← Prev
        </button>
        <button
          onClick={next}
          disabled={index === deck.cards.length - 1}
          className="px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
        >
          Next →
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
        >
          Close
        </button>
      </div>
    </div>
  )
}
