<script setup lang="ts">
import type { Project, ProjectStatus } from "../types";
import { computed, ref } from "vue"
import VPButton from "vitepress/dist/client/theme-default/components/VPButton.vue";
import ProjectsItem from "./ProjectsItem.vue";

const props = defineProps<{
    projects: Project[],
}>();

const filters: { label: string; value: ProjectStatus | 'all' }[] = [
    { label: 'All', value: 'all' },
    { label: 'Recent', value: 'recent' },
    { label: 'WIP', value: 'wip' },
    { label: 'Deprecated', value: 'deprecated' },
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
            <VPButton
                v-for="f in filters"
                :key="f.value"
                :text="f.label"
                :theme="filter === f.value ? 'brand' : 'alt'"
                @click="filter = f.value"
            />
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
    gap: 12px;
    margin-bottom: 40px;
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
        max-width: 896px;
    }
}
</style>
