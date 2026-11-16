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

// Unified chronological feed: commits (with inline tag badges) plus
// standalone tag entries whose commits fall outside the fetched window.
const commitSha = new Set()
const items = []

for (const r of activity.repos) {
  for (const c of r.commits) {
    commitSha.add(`${r.name}:${c.sha}`)
    items.push({
      kind: 'commit',
      repo: r.name,
      repoUrl: r.repo,
      date: c.date,
      sha: c.sha,
      message: c.message,
      url: c.url,
      tags: c.tags,
    })
  }
}

// Release-tagged commits always show; fill the rest with latest activity.
const taggedCommits = items.filter((i) => i.kind === 'commit' && i.tags.length > 0)
const untagged = items
  .filter((i) => i.kind === 'commit' && i.tags.length === 0)
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, Math.max(0, 150 - taggedCommits.length))
const commitItems = [...taggedCommits, ...untagged].sort((a, b) =>
  b.date.localeCompare(a.date),
)

for (const r of activity.repos) {
  for (const t of r.tags) {
    if (commitSha.has(`${r.name}:${t.sha}`)) continue // already badged inline
    items.push({
      kind: 'tag',
      repo: r.name,
      repoUrl: r.repo,
      date: t.date,
      name: t.name,
      url: `${r.repo}/releases/tag/${t.name}`,
    })
  }
}

const tagItems = items.filter((i) => i.kind === 'tag')
const tagCommits = commitItems.filter((c) => c.tags.length > 0)

const visible = computed(() => {
  if (filter.value === 'tags')
    return [...tagCommits, ...tagItems].sort((a, b) => b.date.localeCompare(a.date))
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
  <li v-for="i in visible" :key="i.kind + i.repo + (i.sha ?? i.name)" class="feed-item">
    <template v-if="i.kind === 'tag'">
      <span class="feed-tag">{{ i.name }}</span>
      <VPLink :href="i.url" class="feed-repo">{{ i.repo }}</VPLink>
    </template>
    <template v-else>
      <VPLink :href="i.url" class="feed-repo">{{ i.repo }}</VPLink>
      <span class="feed-msg">{{ i.message }}</span>
      <span v-for="t in i.tags" :key="t" class="feed-badge">{{ t }}</span>
    </template>
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
.feed-tag {
  font-family: var(--vp-font-family-mono);
  font-weight: 600;
  color: var(--vp-c-brand-1);
}
.feed-repo {
  font-weight: 600;
  white-space: nowrap;
}
.feed-msg {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--vp-c-text-2);
}
.feed-badge {
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  padding: 1px 7px;
  border-radius: 10px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  white-space: nowrap;
}
.feed-date {
  color: var(--vp-c-text-3);
  font-size: 12px;
  white-space: nowrap;
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
