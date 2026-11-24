import { getSocialLinks } from '@/components/ui/social'

export function Footer({ personal }: { personal: any }) {
  const socialLinks = getSocialLinks(personal)
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-10 border-t border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="font-mono text-sm font-semibold text-[var(--text-primary)]">
            <span className="text-[var(--accent)]">~/</span>
            {personal.shortName.toLowerCase().replace(' ', '.')}
          </p>
          <p className="text-xs mt-0.5 text-[var(--text-muted)]">
            © {currentYear} {personal.name}. Built with Next.js.
          </p>
        </div>

        <ul className="flex items-center gap-2 list-none">
          {socialLinks.map(({ id, href, label, icon: Icon, external }) => (
            <li key={id}>
              <a
                id={`footer-${id}`}
                href={href}
                aria-label={label}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="w-11 h-11 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)]"
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
