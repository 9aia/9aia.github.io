<script setup>
import { ref, computed, watch } from 'vue'
import { VPLink } from 'vitepress/theme'
import Pagination from './Pagination.vue'
import { data as activity } from '../.vitepress/theme/activity.data.ts'

// `page` selects which slice of the canonical "All" feed this route renders.
// /activity uses page 1; generated /activity/N stubs pass N for static SEO pages.
const props = defineProps({
  page: { type: Number, default: 1 },
})

// Keep in sync with PER_PAGE in scripts/fetch-activity.mjs (page-stub count).
const PER_PAGE = 50

const filter = ref('all')
const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'tags', label: 'Tags' },
  { key: 'commits', label: 'Commits' },
]

// One row anatomy for every item: repo | summary | tag badges | time.
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

// Canonical feed: everything, newest first. Static routes slice it by `page`.
const allItems = [...commitItems, ...tagItems].sort((a, b) => b.date.localeCompare(a.date))
const allTotalPages = computed(() => Math.max(1, Math.ceil(allItems.length / PER_PAGE)))
const allPage = computed(() => Math.min(Math.max(1, props.page), allTotalPages.value))
const allPageItems = computed(() =>
  allItems.slice((allPage.value - 1) * PER_PAGE, allPage.value * PER_PAGE),
)

// Filtered views are client-side exploration: full matching set, paged locally.
const filteredItems = computed(() => {
  if (filter.value === 'tags')
    return [...taggedCommits, ...tagItems].sort((a, b) => b.date.localeCompare(a.date))
  if (filter.value === 'commits') return commitItems
  return null
})

const clientPage = ref(1)
watch(filter, () => { clientPage.value = 1 })

const filteredTotalPages = computed(() =>
  Math.max(1, Math.ceil((filteredItems.value?.length ?? 0) / PER_PAGE)),
)
watch(filteredTotalPages, (n) => { if (clientPage.value > n) clientPage.value = n })

const filteredPageItems = computed(() => {
  const list = filteredItems.value
  if (!list) return null
  return list.slice((clientPage.value - 1) * PER_PAGE, clientPage.value * PER_PAGE)
})

const visibleCount = computed(() => filteredItems.value?.length ?? allItems.length)
const pageItems = computed(() => filteredPageItems.value ?? allPageItems.value)
const totalPages = computed(() => filteredItems.value ? filteredTotalPages.value : allTotalPages.value)
const currentPage = computed(() => filteredItems.value ? clientPage.value : allPage.value)

// Compact page list: first, last, and a window around the current page.
const pageList = computed(() => {
  const n = totalPages.value
  const p = currentPage.value
  const set = new Set([1, n, p - 1, p, p + 1])
  return [...set].filter((x) => x >= 1 && x <= n).sort((a, b) => a - b)
})

function timeStr(iso) {
  return new Date(iso).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

function dayKey(iso) {
  const d = new Date(iso)
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`
}

function dayLabel(iso) {
  const d = new Date(iso)
  const now = new Date()
  const start = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime()
  const diff = Math.round((start(now) - start(d)) / 86400000)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  if (diff < 7)
    return d.toLocaleDateString('en-US', { weekday: 'long' })
  if (d.getFullYear() === now.getFullYear())
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

// Group the visible feed into per-day sections, newest day first.
const groups = computed(() => {
  const out = []
  for (const i of pageItems.value) {
    const k = dayKey(i.date)
    let last = out[out.length - 1]
    if (!last || last.key !== k) {
      last = { key: k, label: dayLabel(i.date), items: [] }
      out.push(last)
    }
    last.items.push(i)
  }
  return out
})
</script>

<template>
  <div class="filters" role="group" aria-label="Filter activity">
    <button
      v-for="f in FILTERS"
      :key="f.key"
      class="filter"
      :class="{ active: filter === f.key }"
      :aria-pressed="filter === f.key"
      @click="filter = f.key"
    >{{ f.label }}</button>
  </div>

  <ul class="feed">
    <template v-for="g in groups" :key="g.key">
      <li class="feed-day">{{ g.label }}</li>
      <li v-for="i in g.items" :key="i.kind + i.repo + i.summary + i.date" class="feed-item">
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
        <span class="feed-time">{{ timeStr(i.date) }}</span>
      </li>
    </template>
    <li v-if="visibleCount === 0" class="feed-empty">Nothing here yet.</li>
  </ul>

  <!-- Canonical feed paginates via real routes (SEO); filtered views paginate client-side. -->
  <Pagination
    v-if="!filteredItems"
    :page="currentPage"
    :total-pages="totalPages"
    :pages="pageList"
    base-path="/activity"
  />
  <Pagination
    v-else
    :page="currentPage"
    :total-pages="totalPages"
    :pages="pageList"
    @select="clientPage = $event"
  />
</template>

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
.feed-day {
  padding: 18px 0 6px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--vp-c-text-3);
  border-bottom: 1px solid var(--vp-c-divider);
}
.feed-item {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 8px 0;
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
.feed-time {
  color: var(--vp-c-text-3);
  font-size: 12px;
  white-space: nowrap;
  flex-shrink: 0;
}
.feed-empty {
  color: var(--vp-c-text-2);
  font-size: 13px;
}
</style>
