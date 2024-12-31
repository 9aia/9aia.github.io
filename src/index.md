---
# https://vitepress.dev/reference/default-theme-home-page
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
import { onBeforeMount } from "vue"; 
import { VPTeamPageTitle, VPTeamMembers, VPLink, VPHomeContent } from "vitepress/theme";
import { useGithubPinnedRepos } from "./composables/useGithubPinnedRepos";
import PageSection from "./components/PageSection.vue";
import Projects from "./components/Projects.vue";
import ProjectsItem from "./components/ProjectsItem.vue";

const { data: projects, isLoading, err, fetchData } = useGithubPinnedRepos();
onBeforeMount(() => {
    fetchData(["9aia"]);
});
</script>

<div>
    <VPTeamPageTitle>
        <template #title>Our Projects</template>
        <template #lead>
          Discover our diverse range of projects focused on developing minimal and viable solutions using cutting-edge technologies.
        </template>
    </VPTeamPageTitle>
    <div v-if="isLoading" class="feedback loading">Loading...</div>
    <div v-else>
        <div v-if="err" class="feedback error">
            There was an error loading projects from GitHub.
        </div>
        <Projects v-else :projects="projects" />
    </div>
</div>

<style scoped lang="scss">
.feedback {
    text-align: center;
}

.loading {
    color: var(--vp-c-gray-1);
}

.error {
    color: var(--vp-c-danger-1);
}
</style>

## Contact Us

We are always looking for passionate individuals to join us. If you're interested in collaborating or contributing to our projects, feel free to reach out!

For inquiries, please contact Luis at <VPLink href="mailto:luisfuturist@gmail.com">luisfuturist@gmail.com</VPLink>.

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);
}
</style>