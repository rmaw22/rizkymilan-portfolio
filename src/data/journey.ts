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
    year: '2019',
    period: '2019',
    role: 'Freelance Full-Stack Developer',
    company: 'JASAMITRA & CV. MAS',
    description:
      'Started coding professionally with native PHP and MySQL. Built a service marketplace (JASAMITRA) and a barcode-based parking management system.',
    highlight: 'PHP, MySQL, Web Development',
  },
  {
    year: '2020',
    period: '2020',
    role: 'Full-Stack Developer',
    company: 'Educational Institutions',
    description:
      'Delivered web-based exam and information systems for schools using CodeIgniter 3 and Joomla CMS. First experience with multi-user production systems under real institutional constraints.',
    highlight: 'CodeIgniter, Joomla, Institutional Software',
  },
  {
    year: '2021',
    period: '2021',
    role: 'Full-Stack Developer',
    company: 'CV. SONA JAYA & PT. Kafilah Teknologi',
    description:
      'Worked on diverse products: an educational robotics IDE (NodeJS + React + Python), an exclusive Muslim fashion marketplace, and a courier app with mobile (Flutter + Vue + Laravel).',
    highlight: 'React, Node.js, Laravel, Flutter, Vue',
  },
  {
    year: '2022',
    period: '2022',
    role: 'Backend Developer',
    company: "Reacteev's",
    description:
      "Built multimedia studio marketplace systems with Laravel and WordPress. Won Jabar Coding Camp building a sports venue REST API with Node.js (Adonis.js).",
    highlight: 'Laravel, WordPress, Adonis.js',
  },
  {
    year: '2023',
    period: '2023',
    role: 'Full-Stack Developer (S1 Final Project)',
    company: 'PT. MAS 57',
    description:
      'Final year thesis: Security Monitoring and Field Control Application. Multi-platform system using Golang web service, React JS frontend, and Jetpack Compose mobile app.',
    highlight: 'Go, React, Jetpack Compose',
  },
  {
    year: '2024',
    period: '2024 – Present',
    role: 'Backend Engineer & SRE',
    company: 'Ukirama (PT. Ukirama Inteknologi)',
    description:
      'Joined as backend engineer on Ukirama ERP (Ruby on Rails + Go). Evolved into hybrid SRE role: building ORION monitoring platform, USphere trial manager, and maintaining all client production infrastructure.',
    highlight: 'Ruby on Rails, Go, Prometheus, Grafana, Docker',
  },
]
