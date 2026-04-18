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
    id: 'orion',
    title: 'ORION',
    subtitle: 'SRE Monitoring Platform',
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
    title: 'USphere',
    subtitle: 'Server Trial Manager',
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
  {
    id: 'ukirama-erp-nextjs',
    title: 'Ukirama ERP Frontend',
    subtitle: 'Rails Monolith → Next.js Migration',
    description:
      'Modernization of a legacy Rails monolith ERP frontend to a Next.js-powered architecture, improving developer experience, page performance, and enabling a modern component-based workflow.',
    period: 'Jun 2025 – Sep 2025',
    situation:
      'Ukirama ERP\'s frontend was tightly coupled to a Ruby on Rails monolith using AngularJS — difficult to maintain, slow to iterate, and challenging to test. New feature development required navigating a complex legacy codebase.',
    task:
      'Lead the technical planning, architecture design, and implementation of extracting the frontend from the Rails monolith into a Next.js application, starting with the Recurring Journal Entry module.',
    action: [
      'Designed system architecture for Ukirama Middleware to decouple frontend from Rails backend',
      'Implemented Next.js on ERP v1.0.0 (Jun–Jul 2025) and v2.0.0 with Recurring Journal Entry',
      'Integrated OpenReplay for session replay and UX monitoring on DigitalOcean',
      'Built and documented REST API backend for the Next.js frontend to consume',
      'Conducted handover and knowledge transfer to the frontend team (Sep 2025)',
      'Deployed and validated in production with zero downtime',
    ],
    result: [
      'Modern component-based frontend architecture replacing AngularJS legacy code',
      'Developer onboarding time reduced with clear API documentation',
      'Session replay enabled for UX debugging and customer support investigation',
      'Established migration pattern for future ERP modules',
    ],
    techStack: ['Next.js', 'TypeScript', 'Ruby on Rails', 'PostgreSQL', 'OpenReplay', 'REST API', 'DigitalOcean'],
    impact: [
      { label: 'Architecture', value: 'Decoupled' },
      { label: 'Pattern', value: 'Reusable' },
      { label: 'Monitoring', value: 'Session Replay' },
      { label: 'Downtime', value: '0' },
    ],
    featured: true,
  },
]
