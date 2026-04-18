interface SectionHeadingProps {
  label?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  id?: string
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
  id,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-3 ${alignClass}`} id={id}>
      {label && (
        <span
          className="text-xs font-mono font-medium tracking-widest uppercase"
          style={{ color: 'var(--accent)' }}
        >
          {label}
        </span>
      )}
      <h2
        className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight"
        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-base max-w-2xl leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
