'use client'

import { motion } from 'framer-motion'
import { ArrowDownToLine, GitBranch, MapPin, Terminal } from 'lucide-react'
import { personal } from '@/data/personal'
import { LinkButton } from '@/components/ui/Button'

// Animated dot grid background — purely decorative
function DotGrid() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity: 0.35 }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dot-pattern" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="var(--border-strong)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Hero — Introduction"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-16 overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      <DotGrid />

      {/* Subtle radial glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, color-mix(in srgb, var(--accent) 8%, transparent) 0%, transparent 70%)',
        }}
      />

      <motion.div
        className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Terminal prompt badge */}
        <motion.div variants={itemVariants}>
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border"
            style={{
              color: 'var(--terminal)',
              borderColor: 'color-mix(in srgb, var(--terminal) 30%, transparent)',
              background: 'color-mix(in srgb, var(--terminal) 8%, transparent)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <Terminal size={12} aria-hidden="true" />
            <span>Software Engineer &amp; Site Reliability Engineer</span>
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-none"
          style={{
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {personal.name.split(' ').slice(0, 2).join(' ')}
          <br />
          <span style={{ color: 'var(--accent)' }}>
            {personal.name.split(' ').slice(2).join(' ')}
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl max-w-2xl leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {personal.tagline}
        </motion.p>

        {/* Location */}
        <motion.p
          variants={itemVariants}
          className="flex items-center gap-1.5 text-sm"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          <MapPin size={13} aria-hidden="true" />
          {personal.location}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <LinkButton
            href={personal.resumeUrl}
            download
            id="hero-resume-btn"
            variant="primary"
            size="lg"
            aria-label="Download Rizky Milan's resume as PDF"
          >
            <ArrowDownToLine size={18} aria-hidden="true" />
            Download Resume
          </LinkButton>
          <LinkButton
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            id="hero-github-btn"
            variant="secondary"
            size="lg"
            aria-label="Visit Rizky Milan's GitHub profile"
          >
            <GitBranch size={18} aria-hidden="true" />
            View GitHub
          </LinkButton>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-6 pt-8 mt-4 w-full max-w-sm border-t"
          style={{ borderColor: 'var(--border)' }}
        >
          {[
            { value: `${personal.stats.yearsExperience}+`, label: 'Years' },
            { value: `${personal.stats.projectsCompleted}`, label: 'Projects' },
            { value: `${personal.stats.completionRate}%`, label: 'Completion' },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span
                className="text-2xl font-bold"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}
              >
                {stat.value}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <motion.div
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, var(--border-strong), transparent)' }}
          animate={{ scaleY: [1, 0.6, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
