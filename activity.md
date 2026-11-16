<script setup>
import ActivityFeed from './components/ActivityFeed.vue'
import { data as activity } from '.vitepress/theme/activity.data.ts'
</script>

# Activity

Tags are releases. One chronological feed of commits and tags across the
org; release-tagged commits carry their tag inline.

<ActivityFeed />

<p class="feed-generated">Generated {{ new Date(activity.generated).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}. Refreshes on each site build.</p>

<style scoped>
.feed-generated {
  color: var(--vp-c-text-2);
  font-size: 13px;
  margin-top: 24px;
}
</style>
