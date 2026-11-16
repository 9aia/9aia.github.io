<script setup>
import { defineAsyncComponent } from 'vue'
import { VPLink } from 'vitepress/theme'
import { layers } from '.vitepress/theme/layers.ts'

const StackGraph = defineAsyncComponent(() => import('./components/StackGraph.vue'))

const flow = [
  { who: 'tamias', what: 'installs and dispenses the packs that carry everything else' },
  { who: 'myco + kuda', what: 'track the work and remember the code' },
  { who: 'sturn', what: 'coordinates agents in milliseconds over the git object store' },
  { who: 'peregrin + sepia', what: 'run campaigns and manage agent sessions as entities on the hypha plane' },
  { who: 'pavo', what: 'renders every view the drivers emit' },
  { who: 'bupha', what: 'gates every push through CI' },
  { who: 'tarsi', what: 'cuts the release' },
]
</script>

# The ecosystem

Gaia is a suite of organisms, not a framework, not a control plane. Each
organism owns one mechanism, speaks a wire protocol, and composes with the
rest. The layers below are the architecture: **delivery → memory →
process → interface**, from how artifacts move to what renders.

## The map

<ClientOnly>
  <StackGraph :layers="layers" />
</ClientOnly>

<p class="eco-graph-cta">
  Click any organism to see what it does and what it connects to.
</p>

## The layers

<div class="eco-species">
  <BlobCluster color="cyan" radius="a">delivery</BlobCluster>
  <BlobCluster color="lavender" radius="b">memory</BlobCluster>
  <BlobCluster color="mint" radius="c">process</BlobCluster>
  <BlobCluster color="blush" radius="a">interface</BlobCluster>
</div>

<div v-for="l in layers" :key="l.key" class="eco-layer">
  <h2>{{ l.title }}</h2>
  <p class="eco-blurb">{{ l.blurb }}</p>
  <div class="eco-grid">
    <div v-for="p in l.projects" :key="p.name" class="eco-card">
      <a :href="p.docs ?? p.website ?? '#'" class="eco-name">{{ p.name }}</a>
      <span v-if="p.role" class="eco-role">{{ p.role }}</span>
      <p class="eco-tag">{{ p.tagline }}</p>
      <p class="eco-desc">{{ p.description }}</p>
    </div>
  </div>
</div>

## How a change ships

The suite manages its own development. This is the loop, end to end:

<ol class="eco-flow">
  <li v-for="(s, i) in flow" :key="s.who">
    <code>{{ s.who }}</code>: {{ s.what }}
  </li>
</ol>

<p>
  Every project has its own docs site (tutorial, how-tos, reference, and
  explanation) linked from each card above. Start with
  <VPLink href="https://9aia.com/tamias/">tamias</VPLink>, the entrypoint.
</p>

<style scoped>
.eco-graph-cta {
  color: var(--vp-c-text-2);
  font-size: 13px;
  text-align: center;
  margin-top: 12px;
}
.eco-species {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
  max-width: 560px;
  margin: 24px 0 8px;
}
@media (min-width: 768px) {
  .eco-species {
    grid-template-columns: repeat(4, 1fr);
  }
}
.eco-layer {
  margin-top: 48px;
}
.eco-layer h2 {
  border-top: none;
  padding-top: 0;
}
.eco-blurb {
  color: var(--vp-c-text-2);
  margin-top: -8px;
}
.eco-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
}
@media (min-width: 768px) {
  .eco-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1100px) {
  .eco-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
.eco-card {
  border-radius: var(--radius-blob-a);
  padding: 20px 24px;
  background-color: var(--vp-c-bg-soft);
}
.eco-grid .eco-card:nth-child(3n + 2) {
  border-radius: var(--radius-blob-b);
}
.eco-grid .eco-card:nth-child(3n) {
  border-radius: var(--radius-blob-c);
}
.eco-name {
  font-weight: 700;
  font-size: 16px;
  color: var(--vp-c-text-1);
  text-decoration: none;
}
.eco-name:hover {
  color: var(--vp-c-brand-1);
}
.eco-role {
  margin-left: 8px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--vp-c-text-3);
}
.eco-tag {
  margin: 6px 0 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
}
.eco-desc {
  margin: 6px 0 0;
  font-size: 13px;
  line-height: 20px;
  color: var(--vp-c-text-2);
}
.eco-flow {
  line-height: 32px;
}
.eco-flow code {
  font-weight: 600;
}
</style>
