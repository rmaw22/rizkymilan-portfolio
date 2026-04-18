'use client'

import { GitBranch, Link2, Mail } from 'lucide-react'
import { personal } from '@/data/personal'

const socialLinks = [
  {
    href: personal.github,
    label: 'GitHub',
    icon: GitBranch,
    id: 'footer-github',
  },
  {
    href: personal.linkedin,
    label: 'LinkedIn',
    icon: Link2,
    id: 'footer-linkedin',
  },
  {
    href: `mailto:${personal.email}`,
    label: 'Email',
    icon: Mail,
    id: 'footer-email',
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      className="mt-0 px-6 py-10"
      style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: name + tagline */}
        <div className="text-center sm:text-left">
          <p
            className="font-mono text-sm font-semibold"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
          >
            <span style={{ color: 'var(--accent)' }}>~</span>
            {personal.shortName.toLowerCase().replace(' ', '.')}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            © {currentYear} {personal.name}. Built with Next.js.
          </p>
        </div>

        {/* Right: social links */}
        <div className="flex items-center gap-3">
          {socialLinks.map(({ href, label, icon: Icon, id }) => (
            <a
              key={id}
              id={id}
              href={href}
              aria-label={label}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              className="w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200"
              style={{
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.color = 'var(--accent)'
                el.style.borderColor = 'var(--accent)'
                el.style.background = 'var(--accent-subtle)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.color = 'var(--text-muted)'
                el.style.borderColor = 'var(--border)'
                el.style.background = 'transparent'
              }}
            >
              <Icon size={16} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
