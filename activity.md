<script setup>
import ActivityFeed from './components/ActivityFeed.vue'
import { data as activity } from '.vitepress/theme/activity.data.ts'
</script>

# Activity

Tags are releases. One chronological feed of commits and tags across the org; release-tagged commits carry their tag inline.

<div class="feed-species">
    <BlobCluster color="cyan" radius="a">commits</BlobCluster>
    <BlobCluster color="lavender" radius="b">tags</BlobCluster>
    <BlobCluster color="mint" radius="c">releases</BlobCluster>
</div>

<ActivityFeed />

<p class="feed-generated">Generated {{ new Date(activity.generated).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) }}. Refreshes on each site build.</p>

<style scoped>
.feed-species {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);
  max-width: 480px;
  margin: 32px 0 24px;
}
@media (max-width: 640px) {
  .feed-species {
    grid-template-columns: 1fr;
    max-width: 280px;
  }
}
.feed-generated {
  color: var(--vp-c-text-2);
  font-size: 13px;
  margin-top: 24px;
}
</style>
