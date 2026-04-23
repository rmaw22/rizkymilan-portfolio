import { describe, it, expect } from 'vitest'
import { personal } from '@/data/personal'
import { skillCategories } from '@/data/skills'
import { projects } from '@/data/projects'
import { journey } from '@/data/journey'

// ─── personal.ts ───────────────────────────────────────────────────────────

describe('personal data', () => {
  it('has required string fields', () => {
    expect(personal.name).toBeTruthy()
    expect(personal.shortName).toBeTruthy()
    expect(personal.role).toBeTruthy()
    expect(personal.tagline).toBeTruthy()
    expect(personal.email).toBeTruthy()
    expect(personal.github).toMatch(/^https:\/\//)
    expect(personal.linkedin).toMatch(/^https:\/\//)
    expect(personal.location).toBeTruthy()
    expect(personal.resumeUrl).toMatch(/^\//)
  })

  it('has valid stats', () => {
    expect(personal.stats.projectsCompleted).toBeGreaterThan(0)
    expect(personal.stats.completionRate).toBeGreaterThan(0)
    expect(personal.stats.completionRate).toBeLessThanOrEqual(100)
    expect(personal.stats.yearsExperience).toBeGreaterThan(0)
    expect(personal.stats.domainsOwned).toBeGreaterThan(0)
  })

  it('shortName is contained in full name', () => {
    expect(personal.name).toContain(personal.shortName.split(' ')[0])
  })
})

// ─── skills.ts ─────────────────────────────────────────────────────────────

describe('skills data', () => {
  it('has exactly 3 categories', () => {
    expect(skillCategories).toHaveLength(3)
  })

  it('each category has required fields', () => {
    for (const cat of skillCategories) {
      expect(cat.id).toBeTruthy()
      expect(cat.label).toBeTruthy()
      expect(cat.description).toBeTruthy()
      expect(cat.skills.length).toBeGreaterThan(0)
    }
  })

  it('each skill has name and valid level', () => {
    const validLevels = ['expert', 'proficient', 'familiar']
    for (const cat of skillCategories) {
      for (const skill of cat.skills) {
        expect(skill.name).toBeTruthy()
        expect(validLevels).toContain(skill.level)
      }
    }
  })

  it('backend category exists with expected skills', () => {
    const backend = skillCategories.find((c) => c.id === 'backend')
    expect(backend).toBeDefined()
    const names = backend!.skills.map((s) => s.name)
    expect(names).toContain('Ruby on Rails')
    expect(names).toContain('Go (Golang)')
    expect(names).toContain('PostgreSQL')
  })

  it('sre-devops category has Prometheus and Grafana', () => {
    const sre = skillCategories.find((c) => c.id === 'sre-devops')
    expect(sre).toBeDefined()
    const names = sre!.skills.map((s) => s.name)
    expect(names).toContain('Prometheus')
    expect(names).toContain('Grafana')
    expect(names).toContain('Docker')
  })
})

// ─── projects.ts ───────────────────────────────────────────────────────────

describe('projects data', () => {
  it('has at least 1 project', () => {
    expect(projects.length).toBeGreaterThanOrEqual(1)
  })

  it('all projects are featured', () => {
    expect(projects.every((p) => p.featured)).toBe(true)
  })

  it('each project has required STAR fields', () => {
    for (const project of projects) {
      expect(project.id).toBeTruthy()
      expect(project.title).toBeTruthy()
      expect(project.subtitle).toBeTruthy()
      expect(project.description).toBeTruthy()
      expect(project.situation).toBeTruthy()
      expect(project.task).toBeTruthy()
      expect(Array.isArray(project.action)).toBe(true)
      expect(project.action.length).toBeGreaterThan(0)
      expect(Array.isArray(project.result)).toBe(true)
      expect(project.result.length).toBeGreaterThan(0)
    }
  })

  it('each project has tech stack and impact', () => {
    for (const project of projects) {
      expect(Array.isArray(project.techStack)).toBe(true)
      expect(project.techStack.length).toBeGreaterThan(0)
      expect(Array.isArray(project.impact)).toBe(true)
      expect(project.impact.length).toBeGreaterThan(0)
      for (const m of project.impact) {
        expect(m.label).toBeTruthy()
        expect(m.value).toBeTruthy()
      }
    }
  })

  it('has ORION and USphere projects', () => {
    const ids = projects.map((p) => p.id)
    expect(ids).toContain('orion')
    expect(ids).toContain('usphere')
  })

  it('project IDs are unique', () => {
    const ids = projects.map((p) => p.id)
    const uniqueIds = [...new Set(ids)]
    expect(ids).toHaveLength(uniqueIds.length)
  })
})

// ─── journey.ts ────────────────────────────────────────────────────────────

describe('journey data', () => {
  it('has at least 1 entry', () => {
    expect(journey.length).toBeGreaterThanOrEqual(1)
  })

  it('each entry has required fields', () => {
    for (const item of journey) {
      expect(item.year).toBeTruthy()
      expect(item.period).toBeTruthy()
      expect(item.role).toBeTruthy()
      expect(item.company).toBeTruthy()
      expect(item.description).toBeTruthy()
      expect(item.highlight).toBeTruthy()
    }
  })

  it('journey years are valid 4-digit strings', () => {
    for (const item of journey) {
      expect(item.year).toMatch(/^\d{4}$/)
    }
  })

  it('journey ends at 2021 or later', () => {
    const last = journey[journey.length - 1]
    expect(parseInt(last.year)).toBeGreaterThanOrEqual(2021)
  })

  it('Ukirama is the most recent entry', () => {
    const last = journey[journey.length - 1]
    expect(last.company).toContain('Ukirama')
  })
})
