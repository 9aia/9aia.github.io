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
        <template #title>Our Projects</template>
        <template #lead>
          Discover our diverse range of projects focused on developing minimal and viable solutions using cutting-edge technologies.
        </template>
    </VPTeamPageTitle>
    <div class="projects-section">
      <Projects :projects="projects" />
    </div>
</div>

<style scoped>
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