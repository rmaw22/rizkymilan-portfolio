'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch — only render icon after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const label =
    theme === 'light'
      ? 'Switch to dark mode'
      : theme === 'dark'
        ? 'Switch to system theme'
        : 'Switch to light mode'

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg" style={{ background: 'var(--bg-secondary)' }} />
    )
  }

  return (
    <button
      id="theme-toggle"
      onClick={cycleTheme}
      aria-label={label}
      title={label}
      className="w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition-colors duration-200 hover:opacity-80"
      style={{
        background: 'var(--bg-secondary)',
        color: 'var(--text-secondary)',
        border: '1px solid var(--border)',
      }}
    >
      {theme === 'light' && <Sun size={16} aria-hidden="true" />}
      {theme === 'dark' && <Moon size={16} aria-hidden="true" />}
      {theme === 'system' && <Monitor size={16} aria-hidden="true" />}
    </button>
  )
}
