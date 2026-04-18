'use client'

import { GitBranch, Link2, Mail, MapPin, ArrowRight } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { personal } from '@/data/personal'

const contactLinks = [
  {
    id: 'contact-email',
    href: `mailto:${personal.email}`,
    label: 'Send an Email',
    description: personal.email,
    icon: Mail,
    external: false,
  },
  {
    id: 'contact-linkedin',
    href: personal.linkedin,
    label: 'Connect on LinkedIn',
    description: 'linkedin.com/in/rizkymilan',
    icon: Link2,
    external: true,
  },
  {
    id: 'contact-github',
    href: personal.github,
    label: 'Follow on GitHub',
    description: 'github.com/rizkymilan',
    icon: GitBranch,
    external: true,
  },
]

export function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact information"
      className="py-24 px-6"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: heading + copy */}
          <AnimatedSection direction="left">
            <SectionHeading
              label="Contact"
              title="Let's Connect"
              subtitle="I'm always open to interesting discussions — whether it's a new opportunity, a technical challenge, or just a good conversation about systems reliability."
            />

            <div
              className="flex items-center gap-2 mt-6 text-sm"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
            >
              <MapPin size={14} aria-hidden="true" />
              <span>Based in {personal.location}</span>
            </div>

            {/* Availability status */}
            <div
              className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full text-xs border"
              style={{
                borderColor: 'color-mix(in srgb, var(--terminal) 30%, transparent)',
                background: 'color-mix(in srgb, var(--terminal) 8%, transparent)',
                color: 'var(--terminal)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: 'var(--terminal)' }}
                aria-hidden="true"
              />
              Open to new opportunities
            </div>
          </AnimatedSection>

          {/* Right: contact cards */}
          <AnimatedSection delay={0.15}>
            <div className="flex flex-col gap-4">
              {contactLinks.map(({ id, href, label, description, icon: Icon, external }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  aria-label={label}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="group flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all duration-200 hover:shadow-md no-underline"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: 'var(--border)',
                    color: 'var(--text-primary)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--accent)'
                    el.style.background = 'var(--accent-subtle)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--border)'
                    el.style.background = 'var(--bg-card)'
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                    style={{
                      background: 'var(--accent-subtle)',
                      color: 'var(--accent)',
                    }}
                  >
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-sm font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {label}
                    </div>
                    <div
                      className="text-xs mt-0.5 truncate font-mono"
                      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
                    >
                      {description}
                    </div>
                  </div>
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                    style={{ color: 'var(--text-muted)' }}
                  />
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
