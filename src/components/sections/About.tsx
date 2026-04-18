'use client'

import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { personal } from '@/data/personal'
import { journey } from '@/data/journey'

export function About() {
  return (
    <section
      id="about"
      aria-label="About Rizky Milan"
      className="py-24 px-6"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: text + bio */}
          <AnimatedSection direction="left">
            <SectionHeading
              label="About Me"
              title="From PHP dev to SRE"
              subtitle={personal.bio}
            />

            {/* Evolution badge */}
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono border"
              style={{
                color: 'var(--accent)',
                borderColor: 'color-mix(in srgb, var(--accent) 25%, transparent)',
                background: 'var(--accent-subtle)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <span aria-hidden="true">~/</span>
              {personal.evolution}
            </div>

            {/* Key stats */}
            <div className="grid grid-cols-2 gap-4 mt-10">
              {[
                { value: `${personal.stats.projectsCompleted}`, label: 'Projects Delivered', suffix: '' },
                { value: `${personal.stats.completionRate}%`, label: 'Completion Rate', suffix: '' },
                { value: `${personal.stats.yearsExperience}+`, label: 'Years Experience', suffix: '' },
                { value: `${personal.stats.domainsOwned}`, label: 'Domain Areas', suffix: '' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl border"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border)',
                  }}
                >
                  <div
                    className="text-3xl font-bold mb-1"
                    style={{ color: 'var(--accent)', fontFamily: 'var(--font-sans)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Right: Timeline */}
          <AnimatedSection delay={0.15}>
            <h3
              className="text-sm font-mono font-medium tracking-widest uppercase mb-8"
              style={{ color: 'var(--accent)' }}
            >
              Career Journey
            </h3>
            <ol className="relative list-none" aria-label="Career timeline">
              {/* Vertical line */}
              <div
                aria-hidden="true"
                className="absolute left-3 top-2 bottom-2 w-px"
                style={{ background: 'var(--border)' }}
              />
              {journey.map((item, index) => (
                <li key={item.year} className="relative pl-10 pb-8 last:pb-0">
                  {/* Dot */}
                  <div
                    aria-hidden="true"
                    className="absolute left-0 top-1.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold border-2"
                    style={{
                      background: index === journey.length - 1 ? 'var(--accent)' : 'var(--bg-card)',
                      borderColor: index === journey.length - 1 ? 'var(--accent)' : 'var(--border)',
                      color: index === journey.length - 1 ? '#fff' : 'var(--text-muted)',
                    }}
                  >
                    {' '}
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span
                      className="text-xs font-mono"
                      style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
                    >
                      {item.period}
                    </span>
                    <h4
                      className="text-sm font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.role}
                    </h4>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      {item.company}
                    </span>
                    <p
                      className="text-sm mt-1 leading-relaxed"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
