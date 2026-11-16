import { createContentLoader } from 'vitepress'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'
import type { Project } from '../../types'

declare const data: Project[]
export { data }

// Canonical catalog: workspace/projects.yaml (org center). Falls back to
// projects/*.md frontmatter when the manifest is absent (standalone clone).
const manifestPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../../../../projects.yaml',
)

const fromManifest = {
  name: 'projects-yaml',
  async load() {
    const raw = parse(readFileSync(manifestPath, 'utf8')) as {
      projects: Project[]
    }
    return raw.projects
      .map((p) => ({ ...p, keywords: p.keywords ?? [], order: p.order ?? 0 }))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  },
}

const fromFrontmatter = createContentLoader('projects/*.md', {
  transform(raw): Project[] {
    return raw
      .map(({ frontmatter }) => ({
        name: frontmatter.name,
        description: frontmatter.description,
        website: frontmatter.website,
        keywords: frontmatter.keywords ?? [],
        status: frontmatter.status,
        stage: frontmatter.stage,
        order: frontmatter.order ?? 0,
      }))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  },
})

export default existsSync(manifestPath) ? fromManifest : fromFrontmatter
