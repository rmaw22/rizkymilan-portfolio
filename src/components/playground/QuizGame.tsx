'use client'

import { useState, useEffect, useCallback } from 'react'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Quiz } from '@/data/playground/quiz'

type Phase = 'idle' | 'playing' | 'result'

interface Props {
  quiz: Quiz
  onClose: () => void
}

export function QuizGame({ quiz, onClose }: Props) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(quiz.durationSeconds)
  const [answers, setAnswers] = useState<(number | null)[]>([])

  const endQuiz = useCallback((finalAnswers: (number | null)[]) => {
    const correct = finalAnswers.filter((a, i) => a === quiz.questions[i].answer).length
    setScore(correct)
    setPhase('result')
  }, [quiz])

  useEffect(() => {
    if (phase !== 'playing') return
    if (timeLeft <= 0) {
      endQuiz([...answers, selected])
      return
    }
    const t = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(t)
  }, [phase, timeLeft, answers, selected, endQuiz])

  function start() {
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setTimeLeft(quiz.durationSeconds)
    setAnswers([])
    setPhase('playing')
  }

  function handleSelect(idx: number) {
    if (selected !== null) return
    setSelected(idx)
  }

  function handleNext() {
    const newAnswers = [...answers, selected]
    if (current + 1 >= quiz.questions.length) {
      endQuiz(newAnswers)
    } else {
      setAnswers(newAnswers)
      setCurrent(c => c + 1)
      setSelected(null)
    }
  }

  const q = quiz.questions[current]
  const pct = Math.round((score / quiz.questions.length) * 100)
  const primaryBtn = 'px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer bg-[var(--accent)] text-[var(--accent-fg)] transition-colors duration-200 hover:bg-[var(--accent-hover)]'

  if (phase === 'idle') {
    return (
      <div className="flex flex-col items-center gap-6 py-8 text-center">
        <p className="text-sm max-w-xs" style={{ color: 'var(--text-secondary)' }}>
          {quiz.questions.length} questions · {quiz.durationSeconds}s timer
        </p>
        <button
          onClick={start}
          className={primaryBtn}
        >
          Start quiz
        </button>
      </div>
    )
  }

  if (phase === 'result') {
    return (
      <div className="flex flex-col items-center gap-5 py-8 text-center">
        <div className="text-5xl font-bold font-mono" style={{ color: pct >= 70 ? 'var(--accent)' : 'var(--text-secondary)' }}>
          {score}/{quiz.questions.length}
        </div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {pct >= 70 ? 'Nice work!' : 'Keep practicing!'}
        </p>
        <div className="w-full max-w-sm flex flex-col gap-3 text-left mt-2">
          {quiz.questions.map((question, i) => {
            const userAnswer = answers[i] ?? null
            const correct = userAnswer === question.answer
            return (
              <div key={i} className="rounded-lg p-3 text-sm" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                <p className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>{question.question}</p>
                <p className="flex items-center gap-1 text-xs font-medium" style={{ color: correct ? 'var(--terminal)' : 'var(--danger)' }}>
                  {correct ? <Check size={14} aria-hidden="true" /> : <X size={14} aria-hidden="true" />}
                  {correct ? 'Correct' : `You chose: ${userAnswer !== null ? question.options[userAnswer] : 'no answer'}`}
                </p>
                {!correct && (
                  <p className="text-xs mt-1" style={{ color: 'var(--text-primary)' }}>
                    Answer: {question.options[question.answer]}
                  </p>
                )}
                {!correct && <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>{question.explanation}</p>}
              </div>
            )
          })}
        </div>
        <div className="flex gap-3 mt-2">
          <button onClick={start} className={primaryBtn}>
            Retry
          </button>
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
          {current + 1} / {quiz.questions.length}
        </span>
        <span className="text-xs font-mono font-semibold tabular-nums" style={{ color: timeLeft <= 10 ? 'var(--danger)' : 'var(--accent)' }}>
          <span className="sr-only">Time left: </span>
          {timeLeft}s
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${(timeLeft / quiz.durationSeconds) * 100}%`, background: timeLeft <= 10 ? 'var(--danger)' : 'var(--accent)' }}
        />
      </div>

      {/* Question */}
      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{q.question}</p>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {q.options.map((opt, i) => {
          const isSelected = selected === i
          const isCorrect = selected !== null && i === q.answer
          const isWrong = isSelected && i !== q.answer
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={cn(
                'flex items-center justify-between gap-3 text-left px-4 py-3 rounded-lg text-sm border transition-colors duration-150',
                selected === null ? 'cursor-pointer hover:border-[var(--accent)]' : ''
              )}
              style={{
                background: isCorrect
                  ? 'color-mix(in srgb, var(--terminal) 10%, transparent)'
                  : isWrong
                    ? 'color-mix(in srgb, var(--danger) 10%, transparent)'
                    : 'var(--bg-secondary)',
                borderColor: isCorrect ? 'var(--terminal)' : isWrong ? 'var(--danger)' : 'var(--border)',
                color: 'var(--text-primary)',
              }}
            >
              <span>{opt}</span>
              {/* Icon + text so the result never depends on colour alone */}
              {isCorrect && (
                <span className="flex items-center gap-1 shrink-0 text-xs font-medium" style={{ color: 'var(--terminal)' }}>
                  <Check size={14} aria-hidden="true" /> Correct
                </span>
              )}
              {isWrong && (
                <span className="flex items-center gap-1 shrink-0 text-xs font-medium" style={{ color: 'var(--danger)' }}>
                  <X size={14} aria-hidden="true" /> Your answer
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Explanation + Next */}
      {selected !== null && (
        <div className="flex flex-col gap-3">
          <p className="text-sm" role="status" style={{ color: 'var(--text-secondary)' }}>{q.explanation}</p>
          <button
            onClick={handleNext}
            className={cn('self-end', primaryBtn)}
          >
            {current + 1 >= quiz.questions.length ? 'See results' : 'Next question'}
          </button>
        </div>
      )}
    </div>
  )
}
