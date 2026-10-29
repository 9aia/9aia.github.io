<script setup lang="ts">
import type { Project } from "../types";
import VPSocialLink from "vitepress/dist/client/theme-default/components/VPSocialLink.vue";
import VPLink from "vitepress/dist/client/theme-default/components/VPLink.vue";

defineProps<{
    project: Project,
}>();
</script>

<template>
    <article class="ProjectsItem">
        <div class="profile">
            <div class="data flex justify-between flex-col h-full gap-2">
                <div>
                    <h1 class="name">{{ project.name }}
                        <span v-if="project.status && project.status !== 'recent'" class="status">{{ project.status === 'wip' ? 'WIP' : project.status }}</span>
                    </h1>
                    <p v-if="project.description" class="description">{{ project.description }}</p>
                </div>

                <div class="website">
                    <VPLink :href="project.website" v-if="project.website">Website</VPLink>
                    <VPSocialLink icon="github" :link="`https://github.com/9aia/${project.name}`" class="ml--2">Website
                    </VPSocialLink>
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
        margin: 0;
        font-weight: 600;

        line-height: 24px;
        font-size: 16px;
    }

    & .status {
        display: inline-block;
        vertical-align: middle;
        margin-left: 6px;
        padding: 2px 8px;
        border-radius: 10px;
        background-color: var(--vp-c-default-soft);
        color: var(--vp-c-text-2);
        font-size: 11px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    & .description {
        margin: 0 auto;

        padding-top: 12px;
        line-height: 20px;
        font-size: 14px;
    }

    & .links {
        display: flex;
        height: 56px;
    }

    .website {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row-reverse;
    }
}
</style>