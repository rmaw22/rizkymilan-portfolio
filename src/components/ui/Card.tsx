import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article'
}

/** Token-based surface. The only card style on the site. */
export function Card({ as: Tag = 'div', className, ...props }: CardProps) {
  return (
    <Tag
      className={cn('rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]', className)}
      {...props}
    />
  )
}
