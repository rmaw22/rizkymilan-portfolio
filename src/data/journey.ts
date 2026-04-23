export interface JourneyItem {
  year: string
  period: string
  role: string
  company: string
  description: string
  highlight: string
}

export const journey: JourneyItem[] = [
  {
    year: '2017',
    period: 'Aug 2017 - Oct 2017',
    role: 'Web Developer & Network Technician (Intern)',
    company: 'PT. INTENS',
    description:
      'Built and maintained computer networks and developed web applications according to user needs. Developed a simple Android application as part of an internship program.',
    highlight: 'Web Development, Networking, Android',
  },
  {
    year: '2021',
    period: 'Jul 2021 - Jul 2022',
    role: 'Junior Software Engineer',
    company: "PT Kafilah Teknologi Indonesia x Reacteev's",
    description:
      'Collaborated to develop web-based applications using modern technologies. Contributed to both frontend and backend development, ensuring optimal application performance, and conducted debugging and automated testing.',
    highlight: 'Full-stack Development, Automated Testing',
  },
  {
    year: '2023',
    period: 'Oct 2023 - Present',
    role: 'Software Engineer',
    company: 'Ukirama',
    description:
      'Developed features for Ukirama ERP (Ruby on Rails, PostgreSQL, GCP). Built Go microservices for heavy processing, led Next.js frontend modernization, and acted as an SRE managing cloud servers and deployment automation.',
    highlight: 'Ruby on Rails, Go, Next.js, GCP, SRE',
  },
]
