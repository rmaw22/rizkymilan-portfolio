import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button, LinkButton } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { SectionHeading } from '@/components/ui/SectionHeading'

// Mock next-themes for ThemeToggle tests
vi.mock('next-themes', () => ({
  useTheme: vi.fn(() => ({ theme: 'light', setTheme: vi.fn() })),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}))

// ─── Button ────────────────────────────────────────────────────────────────

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies primary variant by default', () => {
    render(<Button>Primary</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('bg-[var(--accent)]')
  })

  it('applies secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('bg-transparent')
  })

  it('applies ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>)
    const btn = screen.getByRole('button')
    expect(btn.className).toContain('bg-transparent')
  })

  it('calls onClick handler', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('is disabled when disabled prop set', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies size classes', () => {
    const { rerender } = render(<Button size="sm">S</Button>)
    expect(screen.getByRole('button').className).toContain('px-3')

    rerender(<Button size="lg">L</Button>)
    expect(screen.getByRole('button').className).toContain('px-6')
  })
})

describe('LinkButton', () => {
  it('renders as anchor element', () => {
    render(<LinkButton href="/test">Link</LinkButton>)
    const link = screen.getByRole('link', { name: 'Link' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })

  it('applies correct variant classes', () => {
    render(<LinkButton href="#" variant="secondary">Secondary Link</LinkButton>)
    const link = screen.getByRole('link')
    expect(link.className).toContain('bg-transparent')
  })
})

// ─── Badge ─────────────────────────────────────────────────────────────────

describe('Badge', () => {
  it('renders children text', () => {
    render(<Badge>TypeScript</Badge>)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('applies default variant', () => {
    render(<Badge>Default</Badge>)
    expect(screen.getByText('Default').className).toContain('bg-[var(--bg-secondary)]')
  })

  it('applies accent variant', () => {
    render(<Badge variant="accent">Accent</Badge>)
    expect(screen.getByText('Accent').className).toContain('bg-[var(--accent-subtle)]')
  })

  it('applies terminal variant', () => {
    render(<Badge variant="terminal">Terminal</Badge>)
    expect(screen.getByText('Terminal').className).toContain('bg-[var(--terminal)]')
  })

  it('applies mono font when mono prop set', () => {
    render(<Badge mono>Mono</Badge>)
    expect(screen.getByText('Mono').className).toContain('font-mono')
  })
})

// ─── SectionHeading ────────────────────────────────────────────────────────

describe('SectionHeading', () => {
  it('renders title as h2', () => {
    render(<SectionHeading title="My Title" />)
    expect(screen.getByRole('heading', { level: 2, name: 'My Title' })).toBeInTheDocument()
  })

  it('renders label when provided', () => {
    render(<SectionHeading label="LABEL" title="Title" />)
    expect(screen.getByText('LABEL')).toBeInTheDocument()
  })

  it('does not render label when not provided', () => {
    render(<SectionHeading title="Title" />)
    expect(screen.queryByText('LABEL')).not.toBeInTheDocument()
  })

  it('renders subtitle when provided', () => {
    render(<SectionHeading title="Title" subtitle="A subtitle" />)
    expect(screen.getByText('A subtitle')).toBeInTheDocument()
  })

  it('does not render subtitle when not provided', () => {
    render(<SectionHeading title="Title" />)
    expect(screen.queryByText('A subtitle')).not.toBeInTheDocument()
  })

  it('applies center alignment class', () => {
    const { container } = render(<SectionHeading title="Title" align="center" />)
    expect(container.firstChild).toHaveClass('items-center')
  })
})
