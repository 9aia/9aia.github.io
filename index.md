---
layout: home

hero:
  name: "Gaia"
  text: "Put AI agents to work — on your terms"
  tagline: Open infra for agent-driven development, plus experimental apps for learning, understanding, and managing
  actions:
    - theme: brand
      text: About Us
      link: /about
    - theme: alt
      text: View on GitHub
      link: https://github.com/9aia

features:
  - icon: 🤖
    title: Agent Infrastructure
    details: "Memory, coordination, verification, CI, sessions, and orchestration — the layers that let AI agents do real work on real repositories."
  - icon: 🧭
    title: Products for People
    details: "Experimental GenAI apps that help people learn, understand, and manage — built on our own infrastructure."
  - icon: ⚡
    title: Fast and Optimized
    details: "Single binaries over the git object store — lean, portable, and built to be driven by humans and agents alike."
  - icon: 🚀
    title: Tech-Forward
    details: "We explore emerging technologies — generative AI, agent protocols, new tooling — and turn them into working software early."
  - icon: 🌱
    title: Minimal and Viable
    details: "Small, functional tools shipped early and iterated quickly — working software over big promises."
  - icon: 🔓
    title: Open Source
    details: "We build in the open — inspect, self-host, and extend everything we ship. No lock-in, no black boxes."
---

<script setup>
import { VPTeamPageTitle, VPLink } from "vitepress/theme";
import Projects from "./components/Projects.vue";

import { data as projects } from '.vitepress/theme/projects.data.ts'
</script>

<div>
    <VPTeamPageTitle>
        <template #title>Our Mission</template>
        <template #lead>
          We build open infrastructure so people — and their agents — can own the AI that works for them.
        </template>
    </VPTeamPageTitle>
    <p class="mission">
      Our work comes in two layers: agent-facing infrastructure for real repositories —
      memory (kuda), coordination (sturn), verification (mimus), CI (bupha),
      sessions (sepia), orchestration (peregrin), and project management (myco) —
      and experimental apps on top that help people learn, understand, and manage.
      Always minimal, viable, and open source.
    </p>
</div>

<div>
    <VPTeamPageTitle>
        <template #title>Our Values</template>
        <template #lead>
          The principles behind how we build.
        </template>
    </VPTeamPageTitle>
    <div class="values">
      <div class="value">
        <h3>Everything as Code</h3>
        <p>When possible, an executable, reproducible, version-controlled path from idea to deployment.</p>
      </div>
      <div class="value">
        <h3>Agent-First</h3>
        <p>Agents are first-class users of our tools — CLIs, protocols, and data designed to be driven, not just clicked.</p>
      </div>
      <div class="value">
        <h3>Autonomy over Micromanagement</h3>
        <p>We build agents that own outcomes — not workflows that need babysitting step by step.</p>
      </div>
      <div class="value">
        <h3>Own Your Stack</h3>
        <p>Open, self-hostable tools — the AI works for you, not the other way around.</p>
      </div>
    </div>
</div>

<div>
    <VPTeamPageTitle>
        <template #title>Our Projects</template>
        <template #lead>
          Discover our diverse range of projects focused on developing minimal and viable solutions using cutting-edge technologies.
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
    <div class="stack">
      <div class="group">
        <h3>Systems &amp; Infra</h3>
        <div class="chips">
          <span class="chip">Rust</span>
          <span class="chip">Git</span>
          <span class="chip">Tree-sitter</span>
        </div>
      </div>
      <div class="group">
        <h3>Web &amp; Apps</h3>
        <div class="chips">
          <span class="chip">TypeScript</span>
          <span class="chip">Vue</span>
          <span class="chip">Nuxt</span>
          <span class="chip">VitePress</span>
          <span class="chip">Flutter</span>
        </div>
      </div>
      <div class="group">
        <h3>AI &amp; Agents</h3>
        <div class="chips">
          <span class="chip">LLMs</span>
          <span class="chip">Gemini</span>
          <span class="chip">MCP</span>
          <span class="chip">ACP</span>
        </div>
      </div>
      <div class="group">
        <h3>Platform</h3>
        <div class="chips">
          <span class="chip">Cloudflare</span>
          <span class="chip">Docker</span>
          <span class="chip">GitHub</span>
        </div>
      </div>
    </div>
</div>

<style scoped>
.mission {
    max-width: 640px;
    margin: 24px auto 0;
    padding: 0 32px;
    text-align: center;
    line-height: 26px;
    color: var(--vp-c-text-2);
}

.stack {
    display: grid;
    gap: 24px;
    margin: 40px auto 0;
    padding: 0 32px;
    max-width: 1152px;
    grid-template-columns: 1fr;
}

.stack .group {
    border-radius: 12px;
    background-color: var(--vp-c-bg-soft);
    padding: 24px;
    text-align: center;
}

.stack h3 {
    margin: 0 0 12px;
    font-size: 15px;
    font-weight: 600;
    color: var(--vp-c-text-1);
}

.stack .chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
}

.values {
    display: grid;
    gap: 24px;
    margin: 40px auto 0;
    padding: 0 32px;
    max-width: 896px;
    grid-template-columns: 1fr;
}

.values .value {
    border-radius: 12px;
    background-color: var(--vp-c-bg-soft);
    padding: 24px;
    text-align: center;
}

.values h3 {
    margin: 0 0 8px;
    font-size: 15px;
    font-weight: 600;
    color: var(--vp-c-text-1);
}

.values p {
    margin: 0;
    font-size: 14px;
    line-height: 22px;
    color: var(--vp-c-text-2);
}

@media (min-width: 768px) {
    .values {
        padding: 0 48px;
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 960px) {
    .values {
        padding: 0 64px;
    }
}

.stack .chip {
    padding: 4px 12px;
    border-radius: 999px;
    border: 1px solid var(--vp-c-divider);
    color: var(--vp-c-text-2);
    font-size: 13px;
}

@media (min-width: 768px) {
    .stack {
        padding: 0 48px;
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 960px) {
    .stack {
        padding: 0 64px;
        grid-template-columns: repeat(4, 1fr);
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