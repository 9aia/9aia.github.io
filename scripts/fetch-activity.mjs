#!/usr/bin/env bun
// Fetch org-wide recent commits + tags → activity.json for the releases feed.
// Tags mark releases; commits are the activity. Graceful: on failure keeps
// the previously committed activity.json so builds never break.
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const manifestPath = resolve(root, '../../projects.yaml')
const outPath = resolve(root, 'activity.json')

const COMMITS_PER_REPO = 50
const TAGS_PER_REPO = 20

function gh(path) {
  return JSON.parse(
    execFileSync('gh', ['api', path], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }),
  )
}

function ghSafe(path) {
  try {
    return gh(path)
  } catch {
    return null
  }
}

function main() {
  if (!existsSync(manifestPath)) {
    console.warn('fetch-activity: projects.yaml not found, skipping')
    return
  }
  const { projects } = parse(readFileSync(manifestPath, 'utf8'))
  const repos = projects.filter((p) => p.status !== 'deprecated' && p.repo)

  const results = repos.map((p) => {
    const name = p.name
    const commits = ghSafe(`repos/9aia/${name}/commits?per_page=${COMMITS_PER_REPO}`)
    if (!commits) {
      console.warn(`fetch-activity: ${name} failed`)
      return null
    }
    const tags = ghSafe(`repos/9aia/${name}/tags?per_page=${TAGS_PER_REPO}`) ?? []

    // Resolve each tag to its commit sha (dereferences annotated tags)
    const tagEntries = tags
      .slice(0, TAGS_PER_REPO)
      .map((t) => {
        const c = ghSafe(`repos/9aia/${name}/commits/${t.name}`)
        return c ? { name: t.name, sha: c.sha, date: c.commit.committer.date } : null
      })
      .filter(Boolean)
    const tagBySha = new Map(tagEntries.map((t) => [t.sha, t.name]))

    return {
      name,
      layer: p.layer ?? null,
      website: p.website ?? null,
      repo: p.repo,
      commits: commits.map((c) => ({
        sha: c.sha,
        date: c.commit.committer.date,
        message: c.commit.message.split('\n')[0],
        url: c.html_url,
        tags: tagBySha.has(c.sha) ? [tagBySha.get(c.sha)] : [],
      })),
      tags: tagEntries,
    }
  })

  const data = {
    generated: new Date().toISOString(),
    repos: results.filter(Boolean),
  }
  writeFileSync(outPath, JSON.stringify(data, null, 2) + '\n')
  const n = data.repos.reduce((a, r) => a + r.commits.length, 0)
  const t = data.repos.reduce((a, r) => a + r.tags.length, 0)
  console.log(`fetch-activity: ${data.repos.length} repos, ${n} commits, ${t} tags → activity.json`)
}

try {
  main()
} catch (e) {
  console.warn(`fetch-activity: ${e.message} — keeping existing activity.json`)
}
