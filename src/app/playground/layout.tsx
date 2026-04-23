import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { personal } from '@/data/personal'

export const metadata = {
  title: 'Playground',
  description: 'Interactive quizzes and flash cards to boost your learning.',
}

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <Navbar personal={personal} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer personal={personal} />
    </ThemeProvider>
  )
}
