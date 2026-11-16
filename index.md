---
layout: home

hero:
  name: "Gaia"
  blobs: true
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
import { defineAsyncComponent } from 'vue'
import { VPTeamPageTitle, VPLink } from "vitepress/theme";
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

import { data as projects } from '.vitepress/theme/projects.data.ts'
import { data as activity } from '.vitepress/theme/activity.data.ts'
import { layerTitle, layers } from '.vitepress/theme/layers.ts'

const StackGraph = defineAsyncComponent(() => import('./components/StackGraph.vue'))

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
          One organism, four layers: delivery down to interface.
        </template>
    </VPTeamPageTitle>
    <ClientOnly>
        <StackGraph :layers="layers" />
    </ClientOnly>
    <p class="ecosystem-cta">
        <VPLink href="/ecosystem">How it all fits together →</VPLink>
    </p>
</div>

<div>
    <VPTeamPageTitle>
        <template #title>The Organisms</template>
        <template #lead>
          Each an organism owning one mechanism. Swipe through; every card links to its docs.
        </template>
    </VPTeamPageTitle>
    <Carousel
        class="organism-carousel"
        :items-to-show="1.15"
        :items-to-scroll="1"
        :wrap-around="true"
        :mouse-drag="true"
        breakpoint-mode="carousel"
        :breakpoints="{ 640: { itemsToShow: 2.2 }, 1024: { itemsToShow: 3.2 }, 1280: { itemsToShow: 4.2 } }"
    >
        <Slide v-for="p in active" :key="p.name">
            <a :href="p.docs ?? p.website ?? '#'" class="organism">
                <span class="organism-name">{{ p.name }}</span>
                <span class="organism-layer">{{ layerTitle[p.layer] ?? p.layer }}</span>
                <span class="organism-tag">{{ p.tagline }}</span>
            </a>
        </Slide>
        <template #addons>
            <Navigation />
        </template>
    </Carousel>
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
      they work on: delivery (tamias, scarab, tarsi, bupha, hypha), memory
      (myco, kuda), process (sturn, cuora, tardigrada, mimus, cicada,
      lasius, sepia, peregrin), and interface (pavo). Open, minimal, composable. A stack
      agents can actually run on.
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

.organism-carousel {
    --vc-nav-background: var(--vp-c-bg);
    --vc-nav-color: var(--vp-c-text-1);
    --vc-nav-color-hover: var(--vp-c-brand-1);
    --vc-nav-border-radius: 50%;
    --vc-nav-height: 30px;
    --vc-nav-width: 30px;
    padding: 4px 6px 20px;
}

.organism-carousel .carousel__prev,
.organism-carousel .carousel__next {
    box-shadow: 0 1px 4px rgb(20 20 60 / 0.18);
    transition: color 0.15s ease, background 0.15s ease;
}

.ecosystem-cta {
    text-align: center;
    margin-top: 24px;
}

.organism-carousel .carousel__slide {
    padding: 0 6px;
}

.organism {
    display: flex;
    flex-direction: column;
    gap: 6px;
    height: 100%;
    padding: 16px;
    border-radius: var(--radius-blob-a);
    background-color: var(--vp-c-bg-soft);
    text-decoration: none;
    transition: transform 0.15s ease;
}

.organism:hover {
    transform: translateY(-2px);
}

.organism-name {
    font-weight: 700;
    font-size: 16px;
    color: var(--vp-c-text-1);
    overflow-wrap: anywhere;
}

.organism:hover .organism-name {
    color: var(--vp-c-brand-1);
}

.organism-layer {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: var(--vp-c-text-3);
}

.organism-tag {
    font-size: 13px;
    line-height: 19px;
    color: var(--vp-c-text-2);
    overflow-wrap: anywhere;
}

/* Full content-column width, same spread as the /activity feed. */
.releases-teaser {
    list-style: none;
    margin: 24px 0 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 14px;
}

.releases-teaser li {
    display: flex;
    align-items: baseline;
    gap: 10px;
    padding: 8px 0;
}

.release-repo {
    font-weight: 600;
    color: var(--vp-c-text-2);
    font-size: 13px;
    white-space: nowrap;
    flex-shrink: 0;
}

.release-date {
    margin-left: auto;
    color: var(--vp-c-text-3);
    font-size: 12px;
    white-space: nowrap;
    flex-shrink: 0;
}

.releases-teaser a {
    min-width: 0;
    overflow-wrap: anywhere;
}

/* One external-link arrow per row, pinned to the last column. */
.releases-teaser li .vp-external-link-icon::after,
.releases-teaser li a[href*='://']::after {
    display: none;
}
.releases-teaser li::after {
    content: '';
    flex-shrink: 0;
    width: 11px;
    height: 11px;
    align-self: center;
    background: var(--vp-c-text-3);
    --icon: url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' %3E%3Cpath d='M0 0h24v24H0V0z' fill='none' /%3E%3Cpath d='M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5H9z' /%3E%3C/svg%3E");
    -webkit-mask-image: var(--icon);
    mask-image: var(--icon);
}

@media (min-width: 640px) {
    .organism-carousel {
        padding: 8px 16px 24px;
    }
    .organism {
        padding: 20px 24px;
    }
}

@media (min-width: 768px) {
    .organism-carousel {
        --vc-nav-height: 36px;
        --vc-nav-width: 36px;
        padding: 8px 48px 24px;
    }
}

@media (min-width: 960px) {
    .organism-carousel {
        padding: 8px 64px 24px;
    }
}
</style>

