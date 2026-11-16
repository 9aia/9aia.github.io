<script setup>
import { VPLink } from 'vitepress/theme'
import { data as projects } from '.vitepress/theme/projects.data.ts'

const layerMeta = [
  {
    key: 'delivery',
    title: 'Delivery',
    blurb: 'How artifacts and state move: tamias installs and dispenses packs, scarab loads config and templates, tarsi cuts releases, bupha gates every push, hypha syncs entities across nodes.',
  },
  {
    key: 'memory',
    title: 'Memory',
    blurb: 'What persists as knowledge: myco keeps the work ledger, kuda the verified code maps.',
  },
  {
    key: 'process',
    title: 'Process',
    blurb: 'How work is governed and run: sturn coordinates, cuora brokers secrets, mimus verifies claims, cicada schedules, lasius manages the workspace, sepia runs sessions, peregrin drives campaigns on the hypha plane.',
  },
  {
    key: 'interface',
    title: 'Interface',
    blurb: 'What renders for humans and agents: pavo draws every ViewNode IR the drivers emit, across CLI, TUI, and web.',
  },
]

const layers = layerMeta.map((l) => ({
  ...l,
  projects: projects.filter((p) => p.layer === l.key),
}))

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

GAIA is a suite of organisms, not a framework, not a control plane. Each
organism owns one mechanism, speaks a wire protocol, and composes with the
rest. The layers below are the architecture: **delivery → memory →
process → interface**, from how artifacts move to what renders.

## The layers

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
  gap: 16px;
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
  border-radius: 12px;
  padding: 20px 24px;
  background-color: var(--vp-c-bg-soft);
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
