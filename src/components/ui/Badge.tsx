import { type ReactNode } from 'react'

type BadgeVariant = 'default' | 'accent' | 'muted' | 'terminal'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
  mono?: boolean
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border)]',
  accent: 'bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent)]/30',
  muted: 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border)]',
  terminal: 'bg-[var(--terminal)]/10 text-[var(--terminal)] border border-[var(--terminal)]/30',
}

export function Badge({ children, variant = 'default', className = '', mono = false }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium
        ${mono ? 'font-mono' : ''}
        ${variantStyles[variant]}
        ${className}
      `.trim()}
    >
      {children}
    </span>
  )
}
