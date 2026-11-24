import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  id: string
  label: string
  /** `muted` paints a full-width band so adjacent sections read as separate */
  tone?: 'default' | 'muted'
  children: ReactNode
}

/** Page section: one place for width, gutters, and vertical rhythm. */
export function Section({ id, label, tone = 'default', children }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn('w-full py-16 md:py-24', tone === 'muted' && 'bg-[var(--bg-secondary)]')}
    >
      <div className="w-full max-w-6xl mx-auto px-6 lg:px-8">{children}</div>
    </section>
  )
}
