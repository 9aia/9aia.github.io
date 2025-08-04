import { createContentLoader } from 'vitepress'

interface Project {
    title: string
    url: string
    description: string
    date: {
        time: number
        string: string
    }
    excerpt: string | undefined
}

declare const data: Project[]
export { data }

export default createContentLoader('projects/*.md', {
    excerpt: true,
    transform(raw): Project[] {
        return raw
            .map(({ url, frontmatter, excerpt }) => ({
                title: frontmatter.title,
                description: frontmatter.description,
                url,
                excerpt,
                date: formatDate(frontmatter.date)
            }))
            .sort((a, b) => b.date.time - a.date.time)
    }
})

function formatDate(raw: string): Project['date'] {
    const date = new Date(raw)
    date.setUTCHours(12)
    return {
        time: +date,
        string: date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }
}