<script setup lang="ts">
import type { Project, ProjectStatus } from "../types";
import { computed, ref } from "vue"
import ProjectsItem from "./ProjectsItem.vue";

const props = defineProps<{
    projects: Project[],
}>();

const filters: { label: string; value: ProjectStatus | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Recent', value: 'recent' },
    { label: 'WIP', value: 'wip' },
    { label: 'Active', value: 'active' },
];

const filter = ref<ProjectStatus | 'all'>('all');
const filtered = computed(() =>
    filter.value === 'all'
        ? props.projects
        : props.projects.filter(p => p.status === filter.value)
);
</script>

<template>
    <div class="Projects">
        <div class="filters">
            <button
                v-for="f in filters"
                :key="f.value"
                class="filter"
                :class="{ active: filter === f.value }"
                @click="filter = f.value"
            >{{ f.label }}</button>
        </div>
        <div class="container">
            <div v-for="project in filtered" :key="project.name" class="item">
                <ProjectsItem :project="project" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-bottom: 32px;
}

.filter {
    padding: 6px 16px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 999px;
    background: transparent;
    color: var(--vp-c-text-2);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s, background-color 0.2s;

    &:hover {
        border-color: var(--vp-c-brand-2);
        color: var(--vp-c-text-1);
    }

    &.active {
        border-color: transparent;
        background-color: var(--vp-c-brand-3);
        color: var(--vp-c-white);
    }
}

.container {
    display: grid;
    gap: 24px;
    margin: 0 auto;
    max-width: 1152px;
    grid-template-columns: 1fr;
}

@media (min-width: 768px) {
    .container {
        grid-template-columns: repeat(2, 1fr);
        max-width: 640px;
    }
}
</style>
