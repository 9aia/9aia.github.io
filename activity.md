<script setup>
import { ref, computed } from 'vue'
import { VPLink } from 'vitepress/theme'
import { data as activity } from '.vitepress/theme/activity.data.ts'

const filter = ref('all')
const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'tags', label: 'Tags' },
  { key: 'commits', label: 'Commits' },
]

// One row anatomy for every item: repo | summary | tag badges | date.
// summary links to the commit or the release/tag page; badges link to releases.
const items = []

for (const r of activity.repos) {
  const tagUrl = new Map(r.tags.map((t) => [t.name, `${r.repo}/releases/tag/${t.name}`]))
  const commitShas = new Set(r.commits.map((c) => c.sha))

  for (const c of r.commits) {
    items.push({
      kind: 'commit',
      repo: r.name,
      repoUrl: r.repo,
      date: c.date,
      summary: c.message,
      summaryUrl: c.url,
      badges: c.tags.map((t) => ({ name: t, url: tagUrl.get(t) })),
    })
  }

  for (const t of r.tags) {
    if (commitShas.has(t.sha)) continue // already badged inline on its commit
    items.push({
      kind: 'tag',
      repo: r.name,
      repoUrl: r.repo,
      date: t.date,
      summary: t.name,
      summaryUrl: `${r.repo}/releases/tag/${t.name}`,
      badges: [],
    })
  }
}

// Release-tagged commits always show; fill the rest with latest activity.
const taggedCommits = items
  .filter((i) => i.kind === 'commit' && i.badges.length > 0)
  .sort((a, b) => b.date.localeCompare(a.date))
const untagged = items
  .filter((i) => i.kind === 'commit' && i.badges.length === 0)
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, Math.max(0, 150 - taggedCommits.length))
const commitItems = [...taggedCommits, ...untagged].sort((a, b) =>
  b.date.localeCompare(a.date),
)
const tagItems = items.filter((i) => i.kind === 'tag')

const visible = computed(() => {
  if (filter.value === 'tags')
    return [...taggedCommits, ...tagItems].sort((a, b) => b.date.localeCompare(a.date))
  if (filter.value === 'commits') return commitItems
  return [...commitItems, ...tagItems].sort((a, b) => b.date.localeCompare(a.date))
})

function shortDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

# Activity

Tags are releases. One chronological feed of commits and tags across the
org; release-tagged commits carry their tag inline.

<div class="filters">
  <button
    v-for="f in FILTERS"
    :key="f.key"
    class="filter"
    :class="{ active: filter === f.key }"
    @click="filter = f.key"
  >{{ f.label }}</button>
</div>

<ul class="feed">
  <li v-for="i in visible" :key="i.kind + i.repo + i.summary + i.date" class="feed-item">
    <VPLink :href="i.repoUrl" class="feed-repo">{{ i.repo }}</VPLink>
    <VPLink
      :href="i.summaryUrl"
      class="feed-msg"
      :class="{ 'feed-tag-name': i.kind === 'tag' }"
    >{{ i.summary }}</VPLink>
    <a
      v-for="t in i.badges"
      :key="t.name"
      :href="t.url"
      class="feed-badge"
      target="_blank"
      rel="noopener"
    >{{ t.name }}</a>
    <span class="feed-date">{{ shortDate(i.date) }}</span>
  </li>
  <li v-if="visible.length === 0" class="feed-empty">Nothing here yet.</li>
</ul>

<p class="feed-generated">Generated {{ shortDate(activity.generated) }}. Refreshes on each site build.</p>

<style scoped>
.filters {
  display: flex;
  gap: 8px;
  margin: 16px 0 8px;
}
.filter {
  padding: 4px 14px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 13px;
  cursor: pointer;
}
.filter.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.feed {
  list-style: none;
  margin: 0;
  padding: 0;
}
.feed-item {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 14px;
}
.feed-repo {
  font-weight: 600;
  white-space: nowrap;
  flex-shrink: 0;
}
.feed-msg {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--vp-c-text-2);
}
.feed-msg:hover {
  color: var(--vp-c-brand-1);
}
.feed-tag-name {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand-1);
}
.feed-badge {
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  padding: 1px 7px;
  border-radius: 10px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  white-space: nowrap;
  text-decoration: none;
}
.feed-badge:hover {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
}
.feed-date {
  color: var(--vp-c-text-3);
  font-size: 12px;
  white-space: nowrap;
  flex-shrink: 0;
}
.feed-empty,
.feed-generated {
  color: var(--vp-c-text-2);
  font-size: 13px;
}
.feed-generated {
  margin-top: 24px;
}
</style>
