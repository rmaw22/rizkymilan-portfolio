'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { personal } from '@/data/personal'

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobile = () => setIsMobileOpen(false)

  return (
    <>
      <header
        id="navbar"
        role="banner"
        className="fixed z-50 transition-all duration-300"
        style={{
          top: '1rem',
          left: '1rem',
          right: '1rem',
        }}
      >
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between px-5 py-3 rounded-xl transition-all duration-300"
          style={{
            background: isScrolled
              ? 'color-mix(in srgb, var(--bg-card) 90%, transparent)'
              : 'color-mix(in srgb, var(--bg-card) 70%, transparent)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: `1px solid var(--border)`,
            boxShadow: isScrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none',
          }}
        >
          {/* Logo / Name */}
          <a
            href="#"
            aria-label="Back to top"
            className="font-mono text-sm font-semibold tracking-tight cursor-pointer transition-colors duration-200 hover:opacity-70"
            style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
          >
            <span style={{ color: 'var(--accent)' }}>~</span>
            {personal.shortName.toLowerCase().replace(' ', '.')}
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1 list-none" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-3 py-1.5 text-sm rounded-lg cursor-pointer transition-colors duration-200 hover:bg-[var(--bg-secondary)]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side: Theme toggle + Resume CTA */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href={personal.resumeUrl}
              download
              id="nav-resume-btn"
              aria-label="Download resume PDF"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-lg cursor-pointer transition-all duration-200"
              style={{
                background: 'var(--accent)',
                color: '#ffffff',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'var(--accent)'
              }}
            >
              Resume
            </a>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg cursor-pointer transition-colors duration-200"
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
              }}
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
            >
              {isMobileOpen ? <X size={16} aria-hidden="true" /> : <Menu size={16} aria-hidden="true" />}
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-label="Mobile navigation menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 rounded-xl overflow-hidden"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              }}
            >
              <ul className="flex flex-col py-2 list-none" role="list">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={closeMobile}
                      className="flex px-5 py-3 text-sm cursor-pointer transition-colors duration-200 hover:bg-[var(--bg-secondary)]"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="px-5 py-3">
                  <a
                    href={personal.resumeUrl}
                    download
                    onClick={closeMobile}
                    className="flex items-center justify-center w-full py-2 text-sm font-medium rounded-lg cursor-pointer"
                    style={{ background: 'var(--accent)', color: '#ffffff' }}
                  >
                    Download Resume
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
