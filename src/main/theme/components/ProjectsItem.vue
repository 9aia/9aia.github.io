<script setup lang="ts">
import type { CustomTheme } from "../types/custom-theme";
import VPSocialLinks from "vitepress/dist/client/theme-default/components/VPSocialLinks.vue";
import VPLink from "vitepress/dist/client/theme-default/components/VPLink.vue";
defineProps<{
    project: CustomTheme.Project,
}>();
</script>

<template>
<article class="ProjectsItem">
    <div class="profile">
        <div class="data">
            <h1 class="name">{{ project.name }}</h1>
            <p v-if="project.title" class="description">
                <span v-if="project.title" class="title">{{ project.title }}</span>
            </p>
            <p v-if="project.desc" class="desc">{{ project.desc }}</p>
            
            <div class="website">
                <VPLink :href="project.website">Website</VPLink>
                <div v-if="project.links" class="links">
                    <VPSocialLinks :links="project.links" />
                </div>
            </div>
        </div>
    </div>
</article>
</template>

<style lang="scss" scoped>
.ProjectsItem {
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-radius: 12px;
    width: 100%;
    height: 100%;
    overflow: hidden;

    & .profile {
        flex-grow: 1;
        background-color: var(--vp-c-bg-soft);

        padding: 32px;
    }

    & .name {
        margin:  0;
        font-weight: 600;

        line-height: 24px;
        font-size: 16px;
    }
    & .description {
        margin: 0;
        font-weight: 500;
        color: var(--vp-c-text-2);

        padding-top: 4px;
        line-height: 20px;
        font-size: 14px;
    }
    & .desc {
        margin: 0 auto;

        padding-top: 12px;
        line-height: 20px;
        font-size: 14px;
    }
    & .links {
        display: flex;
        height: 56px;

        margin: 0 -6px 0px;
        padding: 10px 0 0;
    }

    .website {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row-reverse;
        margin-top: 6px;
        margin-bottom: -20px;
    }
}
</style>