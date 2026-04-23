import { CinematicHero } from '@/components/ui/cinematic-landing-hero'

export function Hero({ personal }: { personal: any }) {
  return (
    <section id="hero" aria-label="Hero — Introduction">
      <CinematicHero
        brandName={personal.shortName}
        tagline1={personal.name}
        tagline2={personal.role}
        cardHeading="Scale, redefined."
        cardDescription={
          <span className="text-blue-100/70 text-sm md:text-base lg:text-lg font-normal leading-relaxed">
            <strong className="text-white font-semibold">Ukirama</strong> SRE infrastructure tracking via Prometheus and Grafana, keeping monolithic and microservice instances highly available.
          </span>
        }
        metricValue={100}
        metricLabel="Observability Coverage"
        ctaHeading="Building Reliable & Scalable Systems."
        ctaDescription={`Download my resume or view my GitHub to see my engineering journey.`}
        appDownloadLink={personal.resumeUrl}
        githubLink={personal.github}
      />
    </section>
  )
}
