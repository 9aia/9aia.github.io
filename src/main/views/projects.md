---
layout: page
---

<script setup>
import { onBeforeMount } from "vue"; 
import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from "vitepress/theme";
import { useGithubPinnedRepos } from "../theme/composables/useGithubPinnedRepos";

const projectBuilder = (uid, o, i) => i = {
    done: () => o,
    prop: (k, v) => (o = { ...o, [k]: v }) && i,
    propArray: (k, v) => i.prop(k, [ ...(o[k] || []), v]),

    link: (icon, link) => i.propArray("links", { icon, link }),
    social: (social, url, id = uid) => i.link(social, id && `${url}${id}`),
    
    name: (name) => i.prop("name", name),
    title: (title) => i.prop("title", title),
    desc: (desc) => i.prop("desc", desc),
    twitter: (id) => i.social("twitter", `https://twitter.com/`, id),
    github: (id) => i.social("github", `https://github.com/inforgdev/`, id),
    website: (id = uid) => i.prop("website", `https://inforg.dev/${id}`),
};
const links = {
    twitter: (id) => i.social("twitter", `https://twitter.com/`, id),
    github: (id) => i.social("github", `https://github.com/inforgdev/`, id),
    website: (id = uid) => i.prop("website", `https://inforg.dev/${id}`),
};

const p = (uid, name, title) => projectBuilder(uid).name(name).desc(title).website().github();

/* const projects = [
    p("spongia-css", "SpongiaCSS", "CSS resetter for modern web browsers.").title("CSS | SCSS").done(),
    p("vesic-js", "VesicJS", "Simple task runner written in JS.").title("JS").done(),
    p("octopo-js", "OctopoJS", "CSS preprocessor language agnostic AST stringifier.").title("JS | SCSS | LESS | Stylus").done(),
] */
const { data: projects, isLoading, err, fetchData } = useGithubPinnedRepos();
onBeforeMount(() => {
    fetchData(["inforgdev"]);
});
</script>

<ProjectPage>
    <ProjectPageTitle>
        <template #title>Projects</template>
    </ProjectPageTitle>
    <div v-if="isLoading" class="feedback loading">Loading...</div>
    <div v-else>
        <div v-if="err" class="feedback error">
            There was an error loading projects from GitHub.
        </div>
        <Projects v-else :projects="projects" />
    </div>
</ProjectPage>

<style scoped lang="scss">
.feedback {
    text-align: center;
}

.loading {
    color: var(--vp-c-text-2);
}

.error {
    color: var(--vp-c-red-light);
}
</style>