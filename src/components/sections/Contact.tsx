import { MapPin, ArrowRight, ArrowUpRight } from 'lucide-react'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Section } from '@/components/ui/Section'
import { getSocialLinks } from '@/components/ui/social'

export function Contact({ personal }: { personal: any }) {
  const contactLinks = getSocialLinks(personal)

  return (
    <Section id="contact" label="Contact information">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: heading + copy */}
        <AnimatedSection direction="left">
          <SectionHeading
            label="Contact"
            title="Let's Connect"
            subtitle="I'm always open to interesting discussions — whether it's a new opportunity, a technical challenge, or just a good conversation about systems reliability."
          />

          <p className="flex items-center gap-2 mt-6 text-sm font-mono text-[var(--text-muted)]">
            <MapPin size={14} aria-hidden="true" />
            <span>Based in {personal.location}</span>
          </p>

          <p
            className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full text-xs border text-[var(--terminal)]"
            style={{
              borderColor: 'color-mix(in srgb, var(--terminal) 30%, transparent)',
              background: 'color-mix(in srgb, var(--terminal) 8%, transparent)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[var(--terminal)]" aria-hidden="true" />
            Open to new opportunities
          </p>
        </AnimatedSection>

        {/* Right: contact links */}
        <AnimatedSection delay={0.15}>
          <ul className="flex flex-col gap-3 list-none">
            {contactLinks.map(({ id, href, cta, handle, icon: Icon, external }) => {
              const Arrow = external ? ArrowUpRight : ArrowRight
              return (
                <li key={id}>
                  <a
                    id={`contact-${id}`}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-4 p-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] no-underline transition-colors duration-200 hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)]"
                  >
                    <span className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-[var(--accent-subtle)] text-[var(--accent)]">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-semibold">{cta}</span>
                      <span className="block text-xs mt-0.5 truncate font-mono text-[var(--text-muted)]">
                        {handle}
                      </span>
                    </span>
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                    <Arrow
                      size={16}
                      aria-hidden="true"
                      className="shrink-0 text-[var(--text-muted)] transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </AnimatedSection>
      </div>
    </Section>
  )
}
