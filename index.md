---
layout: home

hero:
  name: "Gaia"
  text: "Put AI agents to work, on your terms"
  tagline: Open infrastructure for agent-driven development
  actions:
    - theme: brand
      text: Tamias
      link: https://9aia.com/tamias/
    - theme: alt
      text: About Us
      link: /about
---

<script setup>
import { VPTeamPageTitle, VPLink } from "vitepress/theme";

import { data as projects } from '.vitepress/theme/projects.data.ts'
import { data as activity } from '.vitepress/theme/activity.data.ts'

const layerMeta = [
  { key: 'packaging', title: 'Packaging', blurb: 'How everything installs, updates, and ships.' },
  { key: 'plane', title: 'Planes', blurb: 'Cross-cutting services: releases and the CI gate.' },
  { key: 'engine', title: 'Engines', blurb: 'The machines, each a small engine owning one mechanism.' },
  { key: 'orchestration', title: 'Orchestration', blurb: 'Campaigns that drive work across machines.' },
  { key: 'surface', title: 'Surfaces', blurb: 'What humans and agents actually see.' },
]

const layers = layerMeta.map((l) => ({
  ...l,
  projects: projects.filter((p) => p.layer === l.key),
}))

const active = projects.filter((p) => p.status !== 'deprecated')

const recentReleases = activity.repos
  .flatMap((r) => r.tags.map((t) => ({ ...t, repo: r.name, repoUrl: r.repo })))
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 5)

function shortDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>

<div>
    <VPTeamPageTitle>
        <template #title>The Stack</template>
        <template #lead>
          One machine, five layers: packaging down to surfaces, planes underneath.
        </template>
    </VPTeamPageTitle>
    <div class="ecosystem">
        <div v-for="l in layers" :key="l.key" class="layer-card">
            <div class="layer-head">
                <span class="layer-name">{{ l.title }}</span>
            </div>
            <p class="layer-blurb">{{ l.blurb }}</p>
            <ul class="layer-list">
                <li v-for="p in l.projects" :key="p.name">
                    <a :href="p.docs ?? p.website ?? '#'" class="layer-link">{{ p.name }}</a>
                    <span class="layer-tag">{{ p.tagline }}</span>
                </li>
            </ul>
        </div>
    </div>
    <p class="ecosystem-cta">
        <VPLink href="/ecosystem">How it all fits together →</VPLink>
    </p>
</div>

<div>
    <VPTeamPageTitle>
        <template #title>The Machines</template>
        <template #lead>
          Small engines, each owning one mechanism. Swipe through; every card links to its docs.
        </template>
    </VPTeamPageTitle>
    <div class="carousel">
        <a v-for="p in active" :key="p.name" :href="p.docs ?? p.website ?? '#'" class="machine">
            <span class="machine-name">{{ p.name }}</span>
            <span class="machine-layer">{{ p.layer }}</span>
            <span class="machine-tag">{{ p.tagline }}</span>
        </a>
    </div>
</div>

<div>
    <VPTeamPageTitle>
        <template #title>Why GAIA</template>
        <template #lead>
          The missing layers between coding agents and the repositories they work on.
        </template>
    </VPTeamPageTitle>
    <p class="mission">
      We're building the missing layers between coding agents and the repositories
      they work on: packages (tamias), a ledger (myco, kuda), a WAL (sturn),
      an orchestrator (peregrin, sepia), and a queue (bupha, mimus, cicada).
      Open, minimal, composable. A stack agents can actually run on.
    </p>
    <p class="mission-cta">
        <VPLink href="/about">Our story and principles →</VPLink>
    </p>
</div>

<div v-if="recentReleases.length">
    <VPTeamPageTitle>
        <template #title>Recently shipped</template>
        <template #lead>
          Tags are releases: the latest across the org.
        </template>
    </VPTeamPageTitle>
    <ul class="releases-teaser">
        <li v-for="t in recentReleases" :key="t.repo + t.name">
            <VPLink :href="`${t.repoUrl}/releases/tag/${t.name}`">{{ t.name }}</VPLink>
            <span class="release-repo">{{ t.repo }}</span>
            <span class="release-date">{{ shortDate(t.date) }}</span>
        </li>
    </ul>
    <p class="mission-cta">
        <VPLink href="/activity">All activity →</VPLink>
    </p>
</div>

<div>
    <VPTeamPageTitle>
        <template #title>Get in touch</template>
        <template #lead>
          Open source, self-hosted. Come build with us.
        </template>
    </VPTeamPageTitle>
    <p class="mission">
        Questions, contributions, or just want to see the factory floor?
        <VPLink href="/contact">Contact us →</VPLink>
    </p>
</div>

<style scoped>
:deep(.vp-doc h2), :deep(.VPTeamPageTitle .title) {
    border-top: none !important;
    padding-top: 0 !important;
}
:deep(.VPFeature .title), :deep(.VPFeature .details) {
    border-top: none !important;
    padding-top: 0;
}
.mission {
    max-width: 640px;
    margin: 24px auto 0;
    padding: 0 32px;
    text-align: center;
    line-height: 26px;
    color: var(--vp-c-text-2);
}
.mission-cta {
    text-align: center;
    margin-top: 16px;
}

.ecosystem {
    display: grid;
    gap: 20px;
    padding: 32px;
    grid-template-columns: 1fr;
}

@media (min-width: 768px) {
    .ecosystem {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1280px) {
    .ecosystem {
        grid-template-columns: repeat(5, 1fr);
    }
}

.layer-card {
    border-radius: 12px;
    padding: 24px;
    background-color: var(--vp-c-bg-soft);
}

.layer-name {
    font-weight: 700;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--vp-c-brand-1);
}

.layer-blurb {
    margin: 8px 0 16px;
    font-size: 13px;
    line-height: 20px;
    color: var(--vp-c-text-2);
}

.layer-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.layer-list li {
    display: flex;
    flex-direction: column;
}

.layer-link {
    font-weight: 600;
    font-size: 14px;
    color: var(--vp-c-text-1);
    text-decoration: none;
}

.layer-link:hover {
    color: var(--vp-c-brand-1);
}

.layer-tag {
    font-size: 12px;
    line-height: 18px;
    color: var(--vp-c-text-3);
}

.ecosystem-cta {
    text-align: center;
    margin-top: 24px;
}

.carousel {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    padding: 8px 32px 24px;
    scroll-snap-type: x mandatory;
    scrollbar-width: thin;
}

.machine {
    flex: 0 0 240px;
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 20px 24px;
    border-radius: 12px;
    background-color: var(--vp-c-bg-soft);
    text-decoration: none;
    transition: transform 0.15s ease;
}

.machine:hover {
    transform: translateY(-2px);
}

.machine-name {
    font-weight: 700;
    font-size: 16px;
    color: var(--vp-c-text-1);
}

.machine:hover .machine-name {
    color: var(--vp-c-brand-1);
}

.machine-layer {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: var(--vp-c-text-3);
}

.machine-tag {
    font-size: 13px;
    line-height: 19px;
    color: var(--vp-c-text-2);
}

.releases-teaser {
    list-style: none;
    margin: 24px auto 0;
    padding: 0 32px;
    max-width: 640px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 14px;
}

.releases-teaser li {
    display: flex;
    align-items: baseline;
    gap: 10px;
}

.release-repo {
    font-weight: 600;
    color: var(--vp-c-text-2);
    font-size: 13px;
}

.release-date {
    margin-left: auto;
    color: var(--vp-c-text-3);
    font-size: 12px;
}

@media (min-width: 768px) {
    .carousel {
        padding: 8px 48px 24px;
    }
    .releases-teaser {
        padding: 0 48px;
    }
}

@media (min-width: 960px) {
    .carousel {
        padding: 8px 64px 24px;
    }
    .releases-teaser {
        padding: 0 64px;
    }
}
</style>

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
}
</style>
