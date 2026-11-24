import { AtSign, Github, Linkedin, Mail } from 'lucide-react'
import type { ComponentType } from 'react'

type IconProps = { size?: number; className?: string; 'aria-hidden'?: boolean | 'true' }

function XLogo({ size = 16, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export interface SocialLink {
  id: string
  href: string
  /** Short name, used for icon-only links */
  label: string
  /** Action phrasing, used where there is room for text */
  cta: string
  /** Human-readable address, derived from the URL so it can't drift */
  handle: string
  icon: ComponentType<IconProps>
  external: boolean
}

interface SocialSource {
  email: string
  github: string
  linkedin: string
  x: string
  thread: string
}

const stripProtocol = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

/** Single source for the contact section and the footer. */
export function getSocialLinks(personal: SocialSource): SocialLink[] {
  const web = (id: string, href: string, label: string, cta: string, icon: SocialLink['icon']): SocialLink => ({
    id,
    href,
    label,
    cta,
    handle: stripProtocol(href),
    icon,
    external: true,
  })

  return [
    {
      id: 'email',
      href: `mailto:${personal.email}`,
      label: 'Email',
      cta: 'Send an email',
      handle: personal.email,
      icon: Mail,
      external: false,
    },
    web('linkedin', personal.linkedin, 'LinkedIn', 'Connect on LinkedIn', Linkedin),
    web('github', personal.github, 'GitHub', 'Follow on GitHub', Github),
    web('x', personal.x, 'X', 'Follow on X', XLogo),
    web('threads', personal.thread, 'Threads', 'Follow on Threads', AtSign),
  ]
}
