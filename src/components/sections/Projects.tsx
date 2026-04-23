'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { GlowCard } from '@/components/ui/spotlight-card'
import { Badge } from '@/components/ui/Badge'
import type { Project } from '@/data/projects'

function ImpactMetric({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center p-2 rounded-xl border text-center min-w-0 h-full overflow-hidden"
      style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
    >
      <span
        className="text-[11px] sm:text-xs xl:text-[13px] font-bold font-mono leading-tight break-words w-full"
        style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
      >
        {value}
      </span>
      <span className="text-[9px] sm:text-[10px] mt-1 leading-tight text-balance break-words opacity-80" style={{ color: 'var(--text-muted)' }}>
        {label}
      </span>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false)
  const expandId = `project-expand-${project.id}`
  const contentId = `project-content-${project.id}`

  return (
    <GlowCard
      customSize
      glowColor="purple"
      className="overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl z-10 w-full"
      aria-label={`Project: ${project.title} — ${project.subtitle}`}
    >
      {/* Card header */}
      <div className="p-6 pb-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="accent" mono>{project.period}</Badge>
            </div>
            <h3
              className="text-xl font-bold leading-tight"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}
            >
              {project.title}
            </h3>
            <p className="text-sm mt-0.5" style={{ color: 'var(--accent)' }}>
              {project.subtitle}
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="muted" mono>{tech}</Badge>
          ))}
        </div>

        {/* Impact metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
          {project.impact.map((m) => (
            <ImpactMetric key={m.label} label={m.label} value={m.value} />
          ))}
        </div>
      </div>

      {/* STAR Expand button */}
      <button
        id={expandId}
        aria-expanded={expanded}
        aria-controls={contentId}
        onClick={() => setExpanded(!expanded)}
        className="w-full mt-auto flex items-center justify-between px-6 py-4 border-t cursor-pointer transition-colors duration-200 hover:bg-[var(--bg-secondary)] text-sm font-medium"
        style={{
          borderColor: 'var(--border)',
          color: 'var(--text-secondary)',
        }}
      >
        <span>{expanded ? 'Hide Details' : 'View STAR Breakdown'}</span>
        {expanded ? <ChevronUp size={16} aria-hidden="true" /> : <ChevronDown size={16} aria-hidden="true" />}
      </button>

      {/* STAR Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            id={contentId}
            role="region"
            aria-label={`STAR breakdown for ${project.title}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5">

              {/* Situation — fully visible */}
              <div>
                <h4 className="text-xs font-mono font-semibold tracking-widest uppercase mb-2"
                  style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                  Situation
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {project.situation}
                </p>
              </div>

              {/* Task + Action + Result — blurred with unlock overlay */}
              <div className="relative rounded-xl overflow-hidden">

                {/* Skeleton placeholder — no real data rendered here */}
                <div className="space-y-5 animate-pulse" aria-hidden="true">

                  {/* Task skeleton */}
                  <div>
                    <div className="h-3 w-12 rounded mb-3" style={{ background: 'var(--accent)', opacity: 0.4 }} />
                    <div className="space-y-2">
                      <div className="h-3 rounded-full" style={{ background: 'var(--border-strong)', width: '92%' }} />
                      <div className="h-3 rounded-full" style={{ background: 'var(--border-strong)', width: '78%' }} />
                      <div className="h-3 rounded-full" style={{ background: 'var(--border-strong)', width: '55%' }} />
                    </div>
                  </div>

                  {/* Action skeleton */}
                  <div>
                    <div className="h-3 w-14 rounded mb-3" style={{ background: 'var(--accent)', opacity: 0.4 }} />
                    <div className="space-y-2.5">
                      {[88, 72, 95, 65].map((w, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: 'var(--border-strong)' }} />
                          <div className="h-3 rounded-full flex-grow" style={{ background: 'var(--border-strong)', maxWidth: `${w}%` }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Result skeleton */}
                  <div>
                    <div className="h-3 w-12 rounded mb-3" style={{ background: 'var(--terminal)', opacity: 0.4 }} />
                    <div className="space-y-2.5">
                      {[80, 68, 91].map((w, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: 'color-mix(in srgb, var(--terminal) 25%, transparent)' }} />
                          <div className="h-3 rounded-full flex-grow" style={{ background: 'var(--border-strong)', maxWidth: `${w}%` }} />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Frosted glass overlay + CTA */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl"
                  style={{
                    background: 'color-mix(in srgb, var(--bg-card) 60%, transparent)',
                    backdropFilter: 'blur(2px)',
                    WebkitBackdropFilter: 'blur(2px)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
                    aria-hidden="true"
                  >
                    🔒
                  </div>
                  <div className="text-center px-4">
                    <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                      The full story is reserved.
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      Reach out to unlock Task, Action &amp; Result.
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                    style={{ background: 'var(--accent)', color: '#ffffff' }}
                  >
                    Contact me to unlock →
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlowCard>
  )
}

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section
      id="projects"
      aria-label="Featured projects"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div
        className="w-full py-16 md:py-24 px-6 md:px-12 rounded-[2.5rem] overflow-hidden"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="w-full max-w-6xl mx-auto">
          <AnimatedSection>
            <SectionHeading
              label="Featured Projects"
              title="Selected work"
              subtitle="Three systems I designed, built, and shipped end-to-end. Each story told in the STAR format — Situation, Task, Action, Result."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-20 pb-16 items-start">
            {projects.filter((p) => p.featured).map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.15} className="w-full">
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4} className="w-full mt-4 flex justify-center pb-8 border-t pt-16 relative" style={{ borderColor: 'var(--border)' }}>
            <div className="text-center px-4 w-full flex flex-col items-center max-w-3xl mx-auto space-y-5">
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-balance" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}>
                Want to know more about my other work?
              </h3>
              <p className="text-base md:text-lg text-balance" style={{ color: 'var(--text-secondary)' }}>
                I have built and contributed to various other projects and initiatives, from internal tools to experimental prototypes. Let's get in touch to discuss them!
              </p>
              <div className="pt-6">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{ background: 'var(--text-primary)', color: 'var(--bg-primary)' }}
                >
                  <span className="relative">Contact Me</span>
                </a>
              </div>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </section>
  )
}
