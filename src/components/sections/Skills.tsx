'use client'

import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { skillCategories, type SkillLevel } from '@/data/skills'

const levelLabel: Record<SkillLevel, string> = {
  expert: 'Expert',
  proficient: 'Proficient',
  familiar: 'Familiar',
}

const levelStyle: Record<SkillLevel, { border: string; bg: string; dot: string }> = {
  expert: {
    border: 'var(--accent)',
    bg: 'var(--accent-subtle)',
    dot: 'var(--accent)',
  },
  proficient: {
    border: 'var(--border-strong)',
    bg: 'var(--bg-secondary)',
    dot: 'var(--text-secondary)',
  },
  familiar: {
    border: 'var(--border)',
    bg: 'var(--bg-card)',
    dot: 'var(--text-muted)',
  },
}

// Category icons (inline SVG paths — no emoji)
const CategoryIcons: Record<string, React.FC<{ size?: number }>> = {
  backend: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
      <circle cx="12" cy="12" r="1"/>
      <path d="M8 12h.01M16 12h.01"/>
    </svg>
  ),
  'sre-devops': ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  frontend: ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
}

export function Skills() {
  return (
    <section
      id="skills"
      aria-label="Skills and competencies"
      className="py-24 px-6"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <SectionHeading
            label="Core Competencies"
            title="What I work with"
            subtitle="Grouped by domain — from ERP backend engineering to cloud-native SRE tooling."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {skillCategories.map((category, catIndex) => {
            const Icon = CategoryIcons[category.id]
            return (
              <AnimatedSection key={category.id} delay={catIndex * 0.1}>
                <article
                  className="rounded-2xl border p-6 h-full flex flex-col gap-5 transition-all duration-300 hover:shadow-lg"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border)',
                  }}
                  aria-label={`${category.label} skills`}
                >
                  {/* Category header */}
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'var(--accent-subtle)',
                        color: 'var(--accent)',
                      }}
                    >
                      {Icon && <Icon size={20} />}
                    </div>
                    <div>
                      <h3
                        className="font-semibold text-base"
                        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}
                      >
                        {category.label}
                      </h3>
                      <p className="text-xs mt-0.5 leading-snug" style={{ color: 'var(--text-muted)' }}>
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills list */}
                  <ul className="flex flex-wrap gap-2 list-none" role="list" aria-label={`${category.label} technologies`}>
                    {category.skills.map((skill) => {
                      const style = levelStyle[skill.level]
                      return (
                        <li key={skill.name}>
                          <span
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium border cursor-default transition-all duration-200 hover:shadow-sm"
                            title={`${skill.name} — ${levelLabel[skill.level]}`}
                            style={{
                              borderColor: style.border,
                              background: style.bg,
                              color: 'var(--text-primary)',
                              fontFamily: 'var(--font-mono)',
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              aria-hidden="true"
                              style={{ background: style.dot }}
                            />
                            {skill.name}
                          </span>
                        </li>
                      )
                    })}
                  </ul>

                  {/* Legend */}
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                    {(['expert', 'proficient', 'familiar'] as SkillLevel[]).map((level) => (
                      <span key={level} className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                        <span
                          className="w-2 h-2 rounded-full"
                          aria-hidden="true"
                          style={{ background: levelStyle[level].dot }}
                        />
                        {levelLabel[level]}
                      </span>
                    ))}
                  </div>
                </article>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
