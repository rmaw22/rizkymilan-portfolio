import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Navbar } from '@/components/layout/Navbar'

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: vi.fn(() => ({ theme: 'light', setTheme: vi.fn() })),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion')
  return {
    ...(actual as object),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => <div {...props}>{children}</div>,
    },
  }
})

describe('Navbar', () => {
  it('renders the navigation element', () => {
    render(<Navbar personal={{ shortName: 'RM', name: 'R', role: 'SE' }} />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Navbar personal={{ shortName: 'RM', name: 'R', role: 'SE' }} />)
    // Desktop links (may have duplicates in mobile — get all)
    const aboutLinks = screen.getAllByRole('link', { name: /about/i })
    expect(aboutLinks.length).toBeGreaterThanOrEqual(1)

    const skillsLinks = screen.getAllByRole('link', { name: /skills/i })
    expect(skillsLinks.length).toBeGreaterThanOrEqual(1)

    const projectsLinks = screen.getAllByRole('link', { name: /projects/i })
    expect(projectsLinks.length).toBeGreaterThanOrEqual(1)

    const contactLinks = screen.getAllByRole('link', { name: /contact/i })
    expect(contactLinks.length).toBeGreaterThanOrEqual(1)
  })

  it('renders the resume button', () => {
    render(<Navbar personal={{ shortName: 'RM', name: 'R', role: 'SE' }} />)
    const resumeBtn = screen.getByRole('link', { name: /download resume/i })
    expect(resumeBtn).toHaveAttribute('href', '/CV_Rizky_Milan_2026.pdf')
  })

  it('renders mobile menu toggle button', () => {
    render(<Navbar personal={{ shortName: 'RM', name: 'R', role: 'SE' }} />)
    const toggleBtn = document.getElementById('mobile-menu-toggle')
    expect(toggleBtn).toBeInTheDocument()
  })

  it('toggles mobile menu on click', () => {
    render(<Navbar personal={{ shortName: 'RM', name: 'R', role: 'SE' }} />)
    const toggleBtn = document.getElementById('mobile-menu-toggle')!
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false')
    fireEvent.click(toggleBtn)
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('true')
    fireEvent.click(toggleBtn)
    expect(toggleBtn.getAttribute('aria-expanded')).toBe('false')
  })

  it('has correct nav link hrefs', () => {
    render(<Navbar personal={{ shortName: 'RM', name: 'R', role: 'SE' }} />)
    const links = screen.getAllByRole('link').filter(
      (el) => el.getAttribute('href')?.startsWith('#')
    )
    const hrefs = links.map((l) => l.getAttribute('href'))
    expect(hrefs).toContain('#about')
    expect(hrefs).toContain('#skills')
    expect(hrefs).toContain('#projects')
    expect(hrefs).toContain('#contact')
  })
})
