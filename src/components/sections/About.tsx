'use client'

import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function About({ personal, journey }: { personal: any, journey: any[] }) {
  return (
    <section
      id="about"
      aria-label="About Rizky Milan"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div
        className="w-full py-16 md:py-24 px-6 md:px-12 rounded-[2.5rem] overflow-hidden"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            {/* Left: text + bio */}
            <AnimatedSection direction="left">
              <SectionHeading
                label="About Me"
                title="Versatile Software Engineer Crafting Resilient Systems"
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
                  { value: `${personal.stats.yearsExperience}+`, label: 'Professional Years', suffix: '' },
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
                  className="absolute left-3 top-2 bottom-2 w-px z-0"
                  style={{ background: 'var(--border)' }}
                />
                {journey.map((item, index) => (
                  <li key={item.year} className="relative flex gap-6 z-10 pb-12 last:pb-0">
                    {/* Dot */}
                    <div
                      aria-hidden="true"
                      className="relative w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs font-mono font-bold border-2"
                      style={{
                        background: index === journey.length - 1 ? 'var(--accent)' : 'var(--bg-card)',
                        borderColor: index === journey.length - 1 ? 'var(--accent)' : 'var(--border)',
                        color: index === journey.length - 1 ? '#fff' : 'var(--text-muted)',
                        marginTop: '0.125rem'
                      }}
                    />

                    <div className="flex flex-col gap-2">
                      <span
                        className="text-xs font-mono font-bold"
                        style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
                      >
                        {item.period}
                      </span>
                      <div>
                        <h4
                          className="text-lg font-bold"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {item.role}
                        </h4>
                        <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                          {item.company}
                        </span>
                      </div>
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
      </div>
    </section>
  )
}
