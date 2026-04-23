export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  period: string
  // STAR Method
  situation: string
  task: string
  action: string[]
  result: string[]
  // Presentation
  techStack: string[]
  impact: {
    label: string
    value: string
  }[]
  diagramUrl?: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: 'ukirama-erp',
    title: 'Ukirama ERP',
    subtitle: 'Core Platform & Architecture',
    description:
      'Enterprise resource planning system designed to streamline business processes. Led multiple high-impact technical initiatives across infrastructure, backend, and frontend.',
    period: '2024 – Present',
    situation:
      'The legacy ERP required modernization to handle scale, including rewriting critical bottlenecks and decoupling tightly coupled monoliths.',
    task:
      'Enhance system performance, build Go microservices to replace heavy operations, and lead frontend migration while maintaining reliable deployments.',
    action: [
      'Transformed a critical ERP library into a high-performance Golang microservice, significantly improving scalability',
      'Led the frontend migration from legacy ERB and AngularJS to Next.js',
      'Prototyped new experimental features using modern stacks to evaluate production feasibility',
      'Identified and resolved complex bugs in existing ERP modules',
      'Supported deployment and operations in DigitalOcean environments'
    ],
    result: [
      'Improved response time and system capability with high-performance Go microservices',
      'Established reusable Next.js migration architecture for internal teams',
      'Ensured stable ongoing client production environments via targeted bug fixes and deployment support'
    ],
    techStack: ['Ruby on Rails', 'Go', 'Next.js', 'PostgreSQL', 'DigitalOcean', 'Redis'],
    impact: [
      { label: 'Role', value: 'Full Stack' },
      { label: 'Architecture', value: 'Monolith' },
      { label: 'Platform', value: 'DigitalOcean' },
      { label: 'Status', value: 'Ongoing' },
    ],
    featured: true,
  },
  {
    id: 'ukirama-website',
    title: 'Ukirama Website',
    subtitle: 'Corporate Profile Rewrite',
    description:
      'Migration of the official corporate website from a legacy monolithic stack to a modern, serverless SSG architecture.',
    period: '2024 – Present',
    situation:
      'The company\'s main digital presence was running on older rails infrastructure that was becoming harder to maintain and overkill for a content-focused landing site.',
    task:
      'Rebuilt the entire website from the ground up using Astro, implement robust design systems, and set up modern serverless deployment.',
    action: [
      'Migrated the Ukirama website from Ruby on Rails 6 to Astro.js',
      'Implemented complete design system and responsive UI architecture',
      'Configured serverless deployment pipeline using Cloudflare infrastructure',
      'Managed ongoing maintenance, optimizing performance and web security protocols'
    ],
    result: [
      'Modern, lightning-fast statically generated website',
      'Reduced deployment complexity and hosting costs via serverless platform',
      'Simplified future content addition with isolated asset management'
    ],
    techStack: ['Astro.js', 'Cloudflare', 'TypeScript', 'Tailwind', 'HTML/CSS'],
    impact: [
      { label: 'Framework', value: 'Astro.js' },
      { label: 'Hosting', value: 'Cloudflare' },
      { label: 'Perf', value: 'Optimal' },
      { label: 'Status', value: 'Live' },
    ],
    featured: true,
  },
  {
    id: 'orion',
    title: 'Monitoring Platform',
    subtitle: 'SRE Monitoring Platform with alerting and dashboard',
    description:
      'Centralized observability platform giving the engineering team real-time visibility into server health, application performance, and business operations across all client environments.',
    period: 'Sep 2025 – Dec 2025',
    situation:
      'Ukirama operated multiple client production servers with zero centralized monitoring. Incidents were detected reactively — either by customers reporting issues or engineers manually SSH-ing into servers. MTTR (Mean Time to Resolution) was high, and the team had no SLO visibility.',
    task:
      'Design and implement a production-grade observability stack from scratch, covering metrics, logs, traces, and alerting — all without disrupting existing services.',
    action: [
      'Designed system architecture for centralized monitoring using Prometheus + Grafana for metrics and dashboards',
      'Implemented Loki + Promtail for log aggregation across all production droplets',
      'Built custom exporters: Sidekiq Agent, Passenger Agent, and Discover Apps exporter in Bash',
      'Created domain-specific dashboards for CS, PM, and Sales teams — non-technical business visibility',
      'Added distributed tracing and profiling in ORION v3.0.0',
      'Implemented backup and restore procedures for the monitoring stack itself',
    ],
    result: [
      'Reduced MTTR through proactive alerting — incidents caught before customer reports',
      'Three business teams (CS, PM, Sales) gained real-time operational visibility without engineering intervention',
      'Server health visibility across all client environments in a single Grafana instance',
      '100% internal adoption by engineering team within 2 weeks of launch',
    ],
    techStack: ['Prometheus', 'Grafana', 'Loki', 'Promtail', 'AlertManager', 'Docker', 'Bash', 'Linux'],
    impact: [
      { label: 'Observability Coverage', value: '100%' },
      { label: 'Teams Enabled', value: '4' },
      { label: 'Custom Exporters', value: '3' },
      { label: 'Version', value: 'v3.0.0' },
    ],
    featured: true,
  },
  {
    id: 'usphere',
    title: 'Trial Server Manager',
    subtitle: 'Internal Platform for Trial Server Management',
    description:
      'Automated trial server provisioning and management system that accelerated the sales cycle for Ukirama ERP by allowing prospects to get a live trial environment on demand.',
    period: 'Nov 2025 – Dec 2025',
    situation:
      'The sales team managed ERP trial environments manually — creating DigitalOcean droplets by hand, configuring them, and cleaning up after trials expired. This was slow (hours per setup), error-prone, and a bottleneck during peak sales periods.',
    task:
      'Build a proof-of-concept and then production v1.0 of an automated server trial manager that integrates with the DigitalOcean API to provision, configure, and de-provision trial environments programmatically.',
    action: [
      'Researched observability tools and trial management patterns (Nov 2025)',
      'Built POC in Go integrating with DigitalOcean API for droplet lifecycle management',
      'Implemented automated provisioning: create, configure, monitor, and destroy trial servers',
      'Added monitoring hooks to ORION for trial server visibility',
      'Delivered v1.0 in December 2025 with full lifecycle automation',
    ],
    result: [
      'Trial server setup time reduced from hours to minutes',
      'Sales team can self-serve trial environments without engineering intervention',
      'Zero manual cleanup required — expired trials automatically de-provisioned',
      'Directly contributed to faster sales cycle and reduced operational overhead',
    ],
    techStack: ['Go', 'DigitalOcean API', 'REST API', 'Docker', 'Prometheus', 'Linux'],
    impact: [
      { label: 'Setup Time', value: 'Hours → Minutes' },
      { label: 'Manual Steps', value: '0' },
      { label: 'Language', value: 'Go' },
      { label: 'Integration', value: 'DO API' },
    ],
    featured: true,
  },
]
