import type { Metadata } from 'next'
import { LinkButton } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="text-center max-w-md">
        <p
          className="text-sm font-mono mb-4"
          style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
        >
          Error 404
        </p>
        <h1
          className="text-5xl font-bold mb-4"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}
        >
          Page not found
        </h1>
        <p className="text-base mb-8" style={{ color: 'var(--text-secondary)' }}>
          This route doesn&apos;t exist. It might have been moved or removed.
        </p>
        <LinkButton href="/" id="not-found-home-btn" variant="primary" size="lg">
          Go Home
        </LinkButton>
      </div>
    </div>
  )
}
