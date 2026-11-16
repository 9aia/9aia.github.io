<script setup>
import { VPLink } from 'vitepress/theme'
import { data as activity } from '.vitepress/theme/activity.data.ts'

const all = activity.repos
  .flatMap((r) => r.commits.map((c) => ({ ...c, repo: r.name, repoUrl: r.repo, website: r.website })))
  .sort((a, b) => b.date.localeCompare(a.date))

// Release-tagged commits always show; fill the rest with latest activity.
const tagged = all.filter((c) => c.tags.length > 0)
const commits = [
  ...tagged,
  ...all.filter((c) => c.tags.length === 0).slice(0, 150 - tagged.length),
].sort((a, b) => b.date.localeCompare(a.date))

const releases = activity.repos
  .flatMap((r) => r.tags.map((t) => ({ ...t, repo: r.name, repoUrl: r.repo, website: r.website })))
  .sort((a, b) => b.date.localeCompare(a.date))

function shortDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

# Releases & activity

Tags are releases. The feed below is the org's commit activity — entries
badged with a tag mark a release point.

## Recent releases

<ul class="feed">
  <li v-for="t in releases.slice(0, 50)" :key="t.repo + t.name" class="feed-item">
    <span class="feed-tag">{{ t.name }}</span>
    <VPLink :href="`${t.repoUrl}/releases/tag/${t.name}`" class="feed-repo">{{ t.repo }}</VPLink>
    <span class="feed-date">{{ shortDate(t.date) }}</span>
  </li>
  <li v-if="releases.length === 0" class="feed-empty">No tags yet — tags mark releases.</li>
</ul>

## Commit activity

<p class="feed-note">Latest commits across all active repos, newest first.</p>

<ul class="feed">
  <li v-for="c in commits" :key="c.repo + c.sha" class="feed-item feed-commit">
    <VPLink :href="c.url" class="feed-repo">{{ c.repo }}</VPLink>
    <span class="feed-msg">{{ c.message }}</span>
    <span v-for="t in c.tags" :key="t" class="feed-badge">{{ t }}</span>
    <span class="feed-date">{{ shortDate(c.date) }}</span>
  </li>
</ul>

<p class="feed-generated">Generated {{ shortDate(activity.generated) }} — refreshes on each site build.</p>

<style scoped>
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
