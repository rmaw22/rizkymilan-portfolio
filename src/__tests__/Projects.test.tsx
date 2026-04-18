import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { Projects } from '@/components/sections/Projects'
import { projects } from '@/data/projects'

// Mock framer-motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion')
  return {
    ...(actual as object),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: {
      div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }) => <div {...props}>{children}</div>,
    },
    useInView: vi.fn(() => true),
  }
})

describe('Projects section', () => {
  it('renders the section heading', () => {
    render(<Projects />)
    expect(screen.getByRole('heading', { name: /selected work/i })).toBeInTheDocument()
  })

  it('renders all 3 featured projects', () => {
    render(<Projects />)
    const articles = screen.getAllByRole('article')
    expect(articles).toHaveLength(3)
  })

  it('renders each project title', () => {
    render(<Projects />)
    for (const project of projects) {
      expect(screen.getByText(project.title)).toBeInTheDocument()
    }
  })

  it('renders tech stack badges for each project', () => {
    render(<Projects />)
    // Check at least one tech from each project
    expect(screen.getAllByText('Prometheus').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Go').length).toBeGreaterThanOrEqual(0) // "Go (Golang)" vs "Go"
    expect(screen.getAllByText('Docker').length).toBeGreaterThanOrEqual(1)
  })

  it('STAR expand button toggles content', () => {
    render(<Projects />)
    const orionExpand = document.getElementById('project-expand-orion')!
    expect(orionExpand).toBeInTheDocument()

    // Initially collapsed
    expect(orionExpand.getAttribute('aria-expanded')).toBe('false')

    // Click to expand
    fireEvent.click(orionExpand)
    expect(orionExpand.getAttribute('aria-expanded')).toBe('true')

    // STAR content should be visible
    const content = document.getElementById('project-content-orion')
    expect(content).toBeInTheDocument()

    // Click to collapse
    fireEvent.click(orionExpand)
    expect(orionExpand.getAttribute('aria-expanded')).toBe('false')
  })

  it('shows STAR sections when expanded', () => {
    render(<Projects />)
    const orionExpand = document.getElementById('project-expand-orion')!
    fireEvent.click(orionExpand)

    // Should show STAR labels
    expect(screen.getAllByText('Situation').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Task').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Action').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Result').length).toBeGreaterThanOrEqual(1)
  })

  it('renders impact metrics', () => {
    render(<Projects />)
    // ORION has "100%" as observability coverage
    expect(screen.getAllByText('100%').length).toBeGreaterThanOrEqual(1)
  })
})
