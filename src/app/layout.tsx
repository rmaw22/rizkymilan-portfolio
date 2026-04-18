import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { personal } from '@/data/personal'
import './globals.css'

// Fonts — loaded via next/font for zero FOUT
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const baseUrl = 'https://rizkymilan.dev'

export const metadata: Metadata = {
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

// JSON-LD Person schema
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
    addressLocality: 'Bandung',
    addressCountry: 'ID',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-space-grotesk, var(--font-body))' }}>
        <ThemeProvider>
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
