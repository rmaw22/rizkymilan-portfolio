import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import type { SkillLevel } from '@/data/skills'

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
    dot: 'var(--border-strong)',
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

const levels: SkillLevel[] = ['expert', 'proficient', 'familiar']

export function Skills({ skillCategories }: { skillCategories: any[] }) {
  return (
    <Section id="skills" label="Skills and competencies">
      <AnimatedSection>
        <SectionHeading
          label="Core Competencies"
          title="What I work with"
          subtitle="Grouped by domain — from ERP backend engineering to cloud-native SRE tooling."
        />

        {/* One legend for all three cards */}
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 list-none" aria-label="Skill level legend">
          {levels.map((level) => (
            <li key={level} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <span
                className="w-2.5 h-2.5 rounded-full"
                aria-hidden="true"
                style={{ background: levelStyle[level].dot }}
              />
              {levelLabel[level]}
            </li>
          ))}
        </ul>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
        {skillCategories.map((category, catIndex) => {
          const Icon = CategoryIcons[category.id]
          return (
            <AnimatedSection key={category.id} delay={catIndex * 0.15} className="h-full">
              <Card className="p-6 h-full flex flex-col gap-5" aria-label={`${category.label} skills`}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[var(--accent-subtle)] text-[var(--accent)]">
                    {Icon && <Icon size={20} />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base text-[var(--text-primary)]">
                      {category.label}
                    </h3>
                    <p className="text-sm mt-0.5 leading-snug text-[var(--text-muted)]">
                      {category.description}
                    </p>
                  </div>
                </div>

                <ul className="flex flex-wrap gap-2 list-none" aria-label={`${category.label} technologies`}>
                  {category.skills.map((skill: any) => {
                    const style = levelStyle[skill.level as SkillLevel]
                    return (
                      <li
                        key={skill.name}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium border text-[var(--text-primary)]"
                        style={{ borderColor: style.border, background: style.bg }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          aria-hidden="true"
                          style={{ background: style.dot }}
                        />
                        {skill.name}
                        <span className="sr-only"> — {levelLabel[skill.level as SkillLevel]}</span>
                      </li>
                    )
                  })}
                </ul>
              </Card>
            </AnimatedSection>
          )
        })}
      </div>
    </Section>
  )
}
