---
layout: home

hero:
  name: "Gaia"
  text: "An experimental contained technological environment"
  tagline: Where Technological Beings Evolve
  actions:
    - theme: brand
      text: About Us
      link: /about
    - theme: alt
      text: View on GitHub
      link: https://github.com/9aia

features:
  - icon: 🛠️
    title: Open-Source
    details: "Committed to open-source principles, utilizing a wide range of open-source technologies in our projects and striving to make our work open-source whenever possible, fostering collaboration and innovation."
  - icon: 💻
    title: Developer-First
    details: "Our approach prioritizes developers, providing a robust coding experience that allows for deep customization and scalability without relying on low-code solutions."
  - icon: 🚀
    title: Tech-Forward
    details: "Dedicated to exploring and integrating cutting-edge technologies, especially in generative AI, we keep our projects at the forefront of technological advancement."
  - icon: 🌐
    title: Online-Only
    details: "We operate entirely online, leveraging digital tools to connect, collaborate, and experiment, ensuring accessibility and inclusivity in our projects."
  - icon: 🌱
    title: Minimal and Viable
    details: "We focus on developing minimal yet functional products that facilitate rapid prototyping and iterative development, allowing us to respond swiftly to feedback and user needs."
  - icon: 🌈
    title: Interdisciplinary
    details: "We believe in the power of interdisciplinary collaboration, integrating insights from various fields to enrich our projects and address complex challenges."
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
          We explore what software development becomes when AI agents are first-class participants — and we build the open infrastructure to get there.
        </template>
    </VPTeamPageTitle>
    <p class="mission">
      Our current work is a stack of agent-facing infrastructure for real repositories:
      repo memory (kuda), evented coordination (sturn), claim verification (mimus),
      headless CI (bupha), agent sessions (sepia), orchestration (peregrin), and
      project management (myco). Around that core we ship experimental GenAI apps and
      tools — always minimal, viable, and open source.
    </p>
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