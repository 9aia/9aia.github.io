---
layout: home

hero:
  name: "Gaia"
  text: "Put AI agents to work — on your terms"
  tagline: Open infrastructure for agent-driven development
  actions:
    - theme: brand
      text: About Us
      link: /about
    - theme: alt
      text: View on GitHub
      link: https://github.com/9aia

features:
  - icon: 🧠
    title: Ledger
    details: "Durable work memory: items, views, code cards, secrets (myco, kuda, arca)"
  - icon: 🤝
    title: WAL
    details: "Ephemeral coordination: live claims, ops, topics over VCS state (sturn)"
  - icon: 🎭
    title: Orchestrator
    details: "Campaigns driving agent sessions across machines (peregrin, sepia)"
  - icon: ✅
    title: Queue
    details: "Event-driven jobs, shipped as CI: verify, gate, schedule (bupha, mimus, cicada)"
---

<script setup>
import { VPTeamPageTitle, VPLink, VPHomeFeatures } from "vitepress/theme";
import Projects from "./components/Projects.vue";

import { data as projects } from '.vitepress/theme/projects.data.ts'

const values = [
  { icon: "🔌", title: "Ports Are the Architecture, Not a Plugin API", details: "Every concern is a trait + impl; the boundaries are the codebase." },
  { icon: "🤖", title: "Machine-First Wire, Not UI-First", details: "Manifest, schema, serve: surfaces for machines, humans second." },
  { icon: "🔗", title: "Composition Over Integration", details: "Tools talk over ndjson/stdio wires. They embed, not integrate." },
  { icon: "🌿", title: "VCS-Native State", details: "Durable state lives in versioned history, not a private DB." },
  { icon: "📋", title: "No Bespoke DSL", details: "Config is the program, not a YAML pipeline language." },
  { icon: "📦", title: "One Binary, One Daemon — Not a Control Plane", details: "A single process + a background service on any OS. The market answer is a server fleet + a dashboard." },
  { icon: "🍽️", title: "We Run on Ourselves", details: "The suite manages its own development. Dogfooding is the test suite." },
  { icon: "🏠", title: "Own Your Stack", details: "Open source, self-hosted. Your AI works for you, not the other way around." },
  { icon: "🌱", title: "Grown, Not Built", details: "The engine emerges from use; the domain is a preset, not the product." },
]

const stack = [
  { icon: "⚙️", title: "Systems & Infra", details: '<span class="VPBadge info">Rust</span> <span class="VPBadge info">Git</span> <span class="VPBadge info">Tree-sitter</span>' },
  { icon: "🌐", title: "Web & Apps", details: '<span class="VPBadge info">TypeScript</span> <span class="VPBadge info">Vue</span> <span class="VPBadge info">VitePress</span> <span class="VPBadge info">Leptos</span>' },
  { icon: "🤖", title: "AI & Agents", details: '<span class="VPBadge info">LLMs</span> <span class="VPBadge info">Gemini</span> <span class="VPBadge info">MCP</span> <span class="VPBadge info">ACP</span>' },
  { icon: "☁️", title: "Platform", details: '<span class="VPBadge info">Cloudflare</span> <span class="VPBadge info">Docker</span> <span class="VPBadge info">GitHub</span>' },
]
</script>

<div>
    <VPTeamPageTitle>
        <template #title>Our Mission</template>
        <template #lead>
          We build open infrastructure so people and agents can own the AI that works for them.
        </template>
    </VPTeamPageTitle>
    <p class="mission">
      We're building the missing layers between coding agents and the repositories
      they work on — a ledger (myco, kuda), a WAL (sturn), an orchestrator
      (peregrin, sepia), and a queue (bupha, mimus, cicada). Open, minimal,
      composable. A stack agents can actually run on.
    </p>
</div>

<div>
    <VPTeamPageTitle>
        <template #title>How We Build</template>
        <template #lead>
          The principles behind how we build.
        </template>
    </VPTeamPageTitle>
    <VPHomeFeatures :features="values" />
</div>

<div>
    <VPTeamPageTitle>
        <template #title>Our Products</template>
        <template #lead>
          The machines. Each a small engine, each owning one mechanism.
        </template>
    </VPTeamPageTitle>
    <div class="projects-section">
      <Projects :projects="projects" />
    </div>
</div>

<div>
    <VPTeamPageTitle>
        <template #title>Tech Stack</template>
        <template #lead>
          The technologies we reach for, by layer.
        </template>
    </VPTeamPageTitle>
    <VPHomeFeatures :features="stack" />
</div>

<style scoped>
:deep(.VPFeature .details .VPBadge) {
    margin: 0 4px 6px 0;
}
:deep(.vp-doc h2), :deep(.VPTeamPageTitle .title) {
    border-top: none !important;
    padding-top: 0 !important;
}
:deep(.VPFeature .title) {
    border-top: none !important;
    padding-top: 0 !important;
    margin-top: 8px;
}
:deep(.VPFeature .details) {
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

@media (min-width: 768px) {
    .values {
        padding: 0 48px;
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (min-width: 960px) {
    .values {
        padding: 0 64px;
    }
}

.projects-section {
    padding: 40px 32px 0;
}

@media (min-width: 768px) {
    .projects-section {
        padding: 40px 48px 0;
    }
}

@media (min-width: 960px) {
    .projects-section {
        padding: 40px 64px 0;
    }
}
</style>

## Contact Us

We are always looking for passionate individuals to join us. If you're interested in collaborating or contributing to our projects, feel free to reach out!

For inquiries, please contact Luis at <VPLink href="mailto:luisfuturist+9aia@gmail.com">luisfuturist+9aia@gmail.com</VPLink>.

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
}
</style>