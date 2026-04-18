'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { projects, type Project } from '@/data/projects'

function ImpactMetric({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex flex-col items-center p-3 rounded-xl border text-center"
      style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
    >
      <span
        className="text-lg font-bold font-mono"
        style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
      >
        {value}
      </span>
      <span className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
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
    <article
      className="rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-xl"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border)',
      }}
      aria-label={`Project: ${project.title} — ${project.subtitle}`}
    >
      {/* Card header */}
      <div className="p-6 pb-0">
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
        className="w-full flex items-center justify-between px-6 py-4 mt-4 border-t cursor-pointer transition-colors duration-200 hover:bg-[var(--bg-secondary)] text-sm font-medium"
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
              {/* Situation */}
              <div>
                <h4 className="text-xs font-mono font-semibold tracking-widest uppercase mb-2"
                  style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                  Situation
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {project.situation}
                </p>
              </div>

              {/* Task */}
              <div>
                <h4 className="text-xs font-mono font-semibold tracking-widest uppercase mb-2"
                  style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                  Task
                </h4>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {project.task}
                </p>
              </div>

              {/* Action */}
              <div>
                <h4 className="text-xs font-mono font-semibold tracking-widest uppercase mb-2"
                  style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                  Action
                </h4>
                <ul className="space-y-1.5 list-none">
                  {project.action.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }}>
                        <ExternalLink size={12} aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Result */}
              <div>
                <h4 className="text-xs font-mono font-semibold tracking-widest uppercase mb-2"
                  style={{ color: 'var(--terminal)', fontFamily: 'var(--font-mono)' }}>
                  Result
                </h4>
                <ul className="space-y-1.5 list-none">
                  {project.result.map((item, i) => (
                    <li key={i} className="flex gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span
                        className="mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                        style={{ background: 'color-mix(in srgb, var(--terminal) 12%, transparent)', color: 'var(--terminal)' }}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  )
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-label="Featured projects"
      className="py-24 px-6"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <SectionHeading
            label="Featured Projects"
            title="Selected work (STAR)"
            subtitle="Three systems I designed, built, and shipped end-to-end. Each story told in the STAR format — Situation, Task, Action, Result."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          {projects.filter((p) => p.featured).map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 0.1}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
