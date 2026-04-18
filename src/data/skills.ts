export type SkillLevel = 'expert' | 'proficient' | 'familiar'

export interface Skill {
  name: string
  level: SkillLevel
}

export interface SkillCategory {
  id: string
  label: string
  description: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    label: 'Backend Engineering',
    description: 'Server-side logic, APIs, data processing, and system architecture.',
    skills: [
      { name: 'Ruby on Rails', level: 'expert' },
      { name: 'Go (Golang)', level: 'proficient' },
      { name: 'Node.js', level: 'proficient' },
      { name: 'PostgreSQL', level: 'expert' },
      { name: 'REST API Design', level: 'expert' },
      { name: 'Java SpringBoot', level: 'familiar' },
      { name: 'Redis', level: 'proficient' },
      { name: 'Sidekiq', level: 'proficient' },
    ],
  },
  {
    id: 'sre-devops',
    label: 'SRE & DevOps',
    description: 'Observability, reliability, infrastructure automation, and platform engineering.',
    skills: [
      { name: 'Prometheus', level: 'expert' },
      { name: 'Grafana', level: 'expert' },
      { name: 'Loki', level: 'proficient' },
      { name: 'Docker', level: 'expert' },
      { name: 'Linux / Ubuntu', level: 'expert' },
      { name: 'Ansible', level: 'proficient' },
      { name: 'CI/CD', level: 'proficient' },
      { name: 'DigitalOcean', level: 'proficient' },
      { name: 'Cloudflare', level: 'proficient' },
      { name: 'Nginx / Passenger', level: 'expert' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend & Web',
    description: 'Modern web interfaces, design systems, and performant static sites.',
    skills: [
      { name: 'Next.js', level: 'proficient' },
      { name: 'React', level: 'proficient' },
      { name: 'TypeScript', level: 'proficient' },
      { name: 'Tailwind CSS', level: 'proficient' },
      { name: 'Astro', level: 'familiar' },
      { name: 'AngularJS', level: 'familiar' },
      { name: 'Vue', level: 'familiar' },
    ],
  },
]
