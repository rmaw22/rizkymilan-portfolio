'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Lock } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import type { Project } from '@/data/projects'

function ImpactMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)]">
      <dt className="text-xs text-[var(--text-muted)]">{label}</dt>
      <dd className="text-sm font-semibold font-mono break-words text-[var(--text-primary)]">{value}</dd>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false)
  const expandId = `project-expand-${project.id}`
  const contentId = `project-content-${project.id}`

  return (
    <Card
      as="article"
      className="overflow-hidden flex flex-col w-full"
      aria-label={`Project: ${project.title} — ${project.subtitle}`}
    >
      {/* Card header */}
      <div className="p-6 pb-5">
        <div className="mb-3">
          <Badge variant="accent" mono>{project.period}</Badge>
          <h3 className="text-xl font-bold leading-tight mt-2 text-[var(--text-primary)]">
            {project.title}
          </h3>
          <p className="text-sm mt-0.5 text-[var(--accent)]">{project.subtitle}</p>
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
        <dl className="grid grid-cols-2 gap-2 mt-5">
          {project.impact.map((m) => (
            <ImpactMetric key={m.label} label={m.label} value={m.value} />
          ))}
        </dl>
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
        <span>{expanded ? 'Hide details' : 'View STAR breakdown'}</span>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        />
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
            <div className="px-6 pt-5 pb-6 space-y-5 border-t border-[var(--border)]">

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
                <div className="space-y-5" aria-hidden="true">

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
                    background: 'color-mix(in srgb, var(--bg-card) 85%, transparent)',
                    backdropFilter: 'blur(2px)',
                    WebkitBackdropFilter: 'blur(2px)',
                  }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
                    <Lock size={18} aria-hidden="true" />
                  </div>
                  <div className="text-center px-4">
                    <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>
                      Task, Action &amp; Result are shared on request.
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Get in touch and I&apos;ll walk you through it.
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className="inline-flex items-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-[var(--accent)] text-[var(--accent-fg)] transition-colors duration-200 hover:bg-[var(--accent-hover)]"
                  >
                    Ask me for the full story
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}

export function Projects({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured)

  return (
    <Section id="projects" label="Featured projects" tone="muted">
      <AnimatedSection>
        <SectionHeading
          label="Featured Projects"
          title="Selected work"
          subtitle="Systems I designed, built, and shipped end-to-end. Each one opens with the situation it started from."
        />
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12 items-start">
        {featured.map((project, index) => (
          <AnimatedSection key={project.id} delay={index * 0.15} className="w-full">
            <ProjectCard project={project} />
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.2} className="mt-16 pt-12 border-t border-[var(--border)]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
              Want to know more about my other work?
            </h3>
            <p className="text-base mt-2 text-[var(--text-secondary)]">
              I have built and contributed to other projects too, from internal tools to experimental prototypes. Happy to walk you through them.
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center justify-center shrink-0 self-start md:self-auto px-6 py-3 rounded-lg text-sm font-semibold bg-[var(--accent)] text-[var(--accent-fg)] transition-colors duration-200 hover:bg-[var(--accent-hover)]"
          >
            Contact me
          </a>
        </div>
      </AnimatedSection>
    </Section>
  )
}
