import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { personal } from '@/data/personal'

const baseUrl = 'https://rizkymilan.dev'

export function generateMetadata(): Metadata {
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `${personal.name} — Software Engineer & SRE`,
      template: `%s | ${personal.shortName}`,
    },
    description: `${personal.tagline} Based in ${personal.location}. Specialized in Ruby on Rails, Go, Prometheus, Docker, and production infrastructure.`,
    keywords: [
      'Rizky Milan',
      'Software Engineer',
      'Site Reliability Engineering',
      'SRE',
      'Backend Engineer',
      'Ruby on Rails',
      'Go',
      'Golang',
      'Prometheus',
      'Grafana',
      'Docker',
      'Next.js',
      'Bandung',
      'Jakarta',
      'Indonesia',
    ],
    authors: [{ name: personal.name }],
    creator: personal.name,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: baseUrl,
      siteName: `${personal.shortName} Portfolio`,
      title: `${personal.name} — Software Engineer & SRE`,
      description: personal.tagline,
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${personal.name} — Software Engineer & SRE`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${personal.name} — Software Engineer & SRE`,
      description: personal.tagline,
      images: [`${baseUrl}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: personal.name,
    jobTitle: personal.role,
    description: personal.tagline,
    url: baseUrl,
    sameAs: [personal.github, personal.linkedin],
    address: {
      '@type': 'PostalAddress',
      addressLocality: personal.location,
      addressCountry: 'ID',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ThemeProvider>
        <Navbar personal={personal} />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer personal={personal} />
      </ThemeProvider>
    </>
  )
}
