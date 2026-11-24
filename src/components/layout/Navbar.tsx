'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './ThemeToggle'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
  { href: '/playground', label: 'Playground' },
]

const sectionIds = navLinks.filter((l) => l.href.startsWith('#')).map((l) => l.href.slice(1))

const ctaClass =
  'items-center justify-center text-sm font-medium rounded-lg bg-[var(--accent)] text-[var(--accent-fg)] transition-colors duration-200 hover:bg-[var(--accent-hover)]'

export function Navbar({ personal }: { personal: any }) {
  const pathname = usePathname()
  const isPlayground = pathname === '/playground'

  // Prefix anchor-only hrefs with '/' when not on the home page
  const resolveHref = (href: string) =>
    href.startsWith('#') && isPlayground ? `/${href}` : href

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Highlight the section currently crossing the middle of the viewport
  useEffect(() => {
    if (isPlayground || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          setActiveSection((current) =>
            entry.isIntersecting ? id : current === id ? null : current
          )
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [isPlayground])

  useEffect(() => {
    if (!isMobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isMobileOpen])

  const closeMobile = () => setIsMobileOpen(false)

  const currentFor = (href: string) => {
    if (href === '/playground') return isPlayground ? ('page' as const) : undefined
    return !isPlayground && activeSection === href.slice(1) ? ('location' as const) : undefined
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium focus:bg-[var(--accent)] focus:text-[var(--accent-fg)]"
      >
        Skip to content
      </a>

      <header id="navbar" className="fixed z-50 top-4 inset-x-4">
        <nav aria-label="Main navigation">
          <div
            className="flex items-center justify-between pl-5 pr-3 py-2 rounded-xl border border-[var(--border)] transition-shadow duration-300"
            style={{
              background: `color-mix(in srgb, var(--bg-card) ${isScrolled ? 92 : 80}%, transparent)`,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: isScrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
            }}
          >
            <a
              href={isPlayground ? '/' : '#'}
              aria-label={`${personal.shortName} — home`}
              className="font-mono text-sm font-semibold tracking-tight py-3 text-[var(--text-primary)] transition-opacity duration-200 hover:opacity-70"
            >
              <span className="text-[var(--accent)]">~/</span>
              {personal.shortName.toLowerCase().replace(' ', '.')}
            </a>

            {/* Desktop nav links */}
            <ul className="hidden md:flex items-center gap-1 list-none">
              {navLinks.map((link) => {
                const current = currentFor(link.href)
                return (
                  <li key={link.href}>
                    <a
                      href={resolveHref(link.href)}
                      aria-current={current}
                      className={cn(
                        'px-3 py-2 text-sm rounded-lg transition-colors duration-200 hover:bg-[var(--bg-secondary)]',
                        current
                          ? 'font-semibold text-[var(--accent)]'
                          : 'text-[var(--text-secondary)]'
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <a
                href={personal.resumeUrl}
                id="nav-resume-btn"
                className={cn('hidden sm:inline-flex h-11 px-4', ctaClass)}
              >
                Request CV
              </a>

              <button
                id="mobile-menu-toggle"
                className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg cursor-pointer border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileOpen}
                aria-controls="mobile-menu"
              >
                {isMobileOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="md:hidden mt-2 rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)]"
                style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
              >
                <ul className="flex flex-col py-2 list-none">
                  {navLinks.map((link) => {
                    const current = currentFor(link.href)
                    return (
                      <li key={link.href}>
                        <a
                          href={resolveHref(link.href)}
                          onClick={closeMobile}
                          aria-current={current}
                          className={cn(
                            'flex px-5 py-3 text-base transition-colors duration-200 hover:bg-[var(--bg-secondary)]',
                            current
                              ? 'font-semibold text-[var(--accent)]'
                              : 'text-[var(--text-primary)]'
                          )}
                        >
                          {link.label}
                        </a>
                      </li>
                    )
                  })}
                  <li className="px-5 py-3 sm:hidden">
                    <a
                      href={personal.resumeUrl}
                      onClick={closeMobile}
                      className={cn('flex w-full h-11', ctaClass)}
                    >
                      Request CV
                    </a>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </>
  )
}
