export interface FlashCardDeck {
  id: string
  title: string
  description: string
  cards: { term: string; definition: string }[]
}

export const flashcardDecks: FlashCardDeck[] = [
  {
    id: 'sre-terms',
    title: 'SRE & DevOps Terms',
    description: 'Core concepts every SRE and backend engineer should know.',
    cards: [
      { term: 'SLO', definition: 'Service Level Objective — a target value for a service reliability metric, e.g. 99.9% uptime.' },
      { term: 'SLI', definition: 'Service Level Indicator — a quantitative measure of service behavior, e.g. request latency.' },
      { term: 'SLA', definition: 'Service Level Agreement — a contract with users defining the expected level of service and consequences for missing it.' },
      { term: 'Error Budget', definition: 'The allowed amount of downtime/errors before an SLO is violated. Balances reliability vs. shipping speed.' },
      { term: 'MTTR', definition: 'Mean Time To Recovery — average time to restore service after a failure.' },
      { term: 'MTBF', definition: 'Mean Time Between Failures — average time between recoverable failures.' },
    ],
  },
]
