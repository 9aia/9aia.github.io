import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export interface ActivityCommit {
  sha: string
  date: string
  message: string
  url: string
  tags: string[]
}

export interface ActivityRepo {
  name: string
  layer: string | null
  website: string | null
  repo: string
  commits: ActivityCommit[]
  tags: { name: string; sha: string; date: string }[]
}

export interface ActivityData {
  generated: string
  repos: ActivityRepo[]
}

declare const data: ActivityData
export { data }

export default {
  name: 'activity-json',
  async load() {
    const p = resolve(dirname(fileURLToPath(import.meta.url)), '../../activity.json')
    return JSON.parse(readFileSync(p, 'utf8')) as ActivityData
  },
}
