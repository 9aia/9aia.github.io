<script setup lang="ts">
import type { Project, ProjectStage, ProjectStatus } from "../types";
import { computed, ref } from "vue"
import VPButton from "vitepress/dist/client/theme-default/components/VPButton.vue";
import ProjectsItem from "./ProjectsItem.vue";

const props = defineProps<{
    projects: Project[],
}>();

type Filter = ProjectStatus | ProjectStage | 'active';

const ALL_FILTERS: { label: string; value: Filter }[] = [
    { label: 'Active', value: 'active' },
    { label: 'Beta', value: 'beta' },
    { label: 'Alpha', value: 'alpha' },
    { label: 'Recent', value: 'recent' },
    { label: 'WIP', value: 'wip' },
    { label: 'Deprecated', value: 'deprecated' },
];

const filters = computed(() =>
    ALL_FILTERS.filter(f =>
        f.value === 'active' ||
        (f.value === 'beta' || f.value === 'alpha'
            ? props.projects.some(p => p.stage === f.value)
            : props.projects.some(p => p.status === f.value))
    )
);

const filter = ref<Filter>('active');
const filtered = computed(() => {
    if (filter.value === 'beta' || filter.value === 'alpha') {
        return props.projects.filter(p => p.stage === filter.value);
    }
    return filter.value === 'active'
        ? props.projects.filter(p => p.status !== 'deprecated')
        : props.projects.filter(p => p.status === filter.value);
});
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

@media (min-width: 640px) {
    .container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .container {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (min-width: 2560px) {
    .container {
        grid-template-columns: repeat(4, 1fr);
    }
}
</style>
