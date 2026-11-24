import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { Projects } from '@/components/sections/Projects'
import { Contact } from '@/components/sections/Contact'
import { personal } from '@/data/personal'
import { skillCategories } from '@/data/skills'
import { projects } from '@/data/projects'
import { journey } from '@/data/journey'

export default function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Hero personal={personal} />
      <About personal={personal} journey={journey} />
      <Skills skillCategories={skillCategories} />
      <Projects projects={projects} />
      <Contact personal={personal} />
    </div>
  )
}
