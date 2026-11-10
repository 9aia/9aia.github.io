import { createContentLoader } from 'vitepress'
import type { Project, ProjectStage } from '../../types'

declare const data: Project[]
export { data }

export default createContentLoader('projects/*.md', {
    transform(raw): Project[] {
        return raw
            .map(({ frontmatter }) => ({
                name: frontmatter.name,
                description: frontmatter.description,
                website: frontmatter.website,
                keywords: frontmatter.keywords ?? [],
                status: frontmatter.status,
                stage: frontmatter.stage as ProjectStage | undefined,
                order: frontmatter.order ?? 0,
            }))
            .sort((a, b) => a.order - b.order)
    }
})
