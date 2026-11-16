<script setup>
import { ref } from 'vue'
import { VPLink } from 'vitepress/theme'
import { data as activity } from '.vitepress/theme/activity.data.ts'

const filter = ref('all')
const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'tags', label: 'Tags' },
  { key: 'commits', label: 'Commits' },
]

const allCommits = activity.repos
  .flatMap((r) => r.commits.map((c) => ({ ...c, repo: r.name, repoUrl: r.repo })))
  .sort((a, b) => b.date.localeCompare(a.date))

// Release-tagged commits always show; fill the rest with latest activity.
const tagged = allCommits.filter((c) => c.tags.length > 0)
const commits = [
  ...tagged,
  ...allCommits.filter((c) => c.tags.length === 0).slice(0, 150 - tagged.length),
].sort((a, b) => b.date.localeCompare(a.date))

const tags = activity.repos
  .flatMap((r) => r.tags.map((t) => ({ ...t, repo: r.name, repoUrl: r.repo })))
  .sort((a, b) => b.date.localeCompare(a.date))

function shortDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

# Activity

Tags are releases. This feed is the org's commit activity, with release
tags marked inline.

<div class="filters">
  <button
    v-for="f in FILTERS"
    :key="f.key"
    class="filter"
    :class="{ active: filter === f.key }"
    @click="filter = f.key"
  >{{ f.label }}</button>
</div>

<template v-if="filter === 'all' || filter === 'tags'">
  <h2>Tags</h2>
  <p class="feed-note">Every tag across the org, newest first. Tags mark releases.</p>
  <ul class="feed">
    <li v-for="t in tags.slice(0, 50)" :key="t.repo + t.name" class="feed-item">
      <span class="feed-tag">{{ t.name }}</span>
      <VPLink :href="`${t.repoUrl}/releases/tag/${t.name}`" class="feed-repo">{{ t.repo }}</VPLink>
      <span class="feed-date">{{ shortDate(t.date) }}</span>
    </li>
    <li v-if="tags.length === 0" class="feed-empty">No tags yet. Tags mark releases.</li>
  </ul>
</template>

<template v-if="filter === 'all' || filter === 'commits'">
  <h2>Commits</h2>
  <p class="feed-note">Latest commits across all active repos, newest first.</p>
  <ul class="feed">
    <li v-for="c in commits" :key="c.repo + c.sha" class="feed-item feed-commit">
      <VPLink :href="c.url" class="feed-repo">{{ c.repo }}</VPLink>
      <span class="feed-msg">{{ c.message }}</span>
      <span v-for="t in c.tags" :key="t" class="feed-badge">{{ t }}</span>
      <span class="feed-date">{{ shortDate(c.date) }}</span>
    </li>
  </ul>
</template>

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
.feed-note,
.feed-generated {
  color: var(--vp-c-text-2);
  font-size: 13px;
}
.feed-generated {
  margin-top: 24px;
}
</style>
