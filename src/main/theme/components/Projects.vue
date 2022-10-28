<script setup lang="ts">
import type { CustomTheme } from "../types/custom-theme";
import { computed } from "vue"
import ProjectsItem from "./ProjectsItem.vue";
const props = defineProps<{
    projects: CustomTheme.Project[],
}>();
const classes = computed(() => [
    `count-${props.projects.length}`
]);
</script>

<template>
<div class="Projects" :class="classes">
    <div class="container">
        <div v-for="project in projects" :key="project.name" class="item">
            <ProjectsItem :project="project" />
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.Projects {
    & .container {
        grid-template-columns: repeat(auto-fit, minmax(224px, 1fr));
    }
    &.count-1 .container { max-width: 276px; }
    &.count-2 .container { max-width: calc(276px * 2 + 24px); }
    &.count-3 .container { max-width: calc(276px * 3 + 24px * 2); }
}

.container {
    display: grid;
    gap: 24px;
    margin: 0 auto;
    max-width: 1152px;
}
</style>