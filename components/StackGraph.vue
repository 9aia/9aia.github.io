<script setup>
import { computed } from 'vue'
import { VueFlow, Handle, Position } from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'

const props = defineProps({
    layers: { type: Array, required: true },
})

const LAYER_COLORS = {
    delivery: '#22d3ee',
    memory: '#a78bfa',
    process: '#fbbf24',
    interface: '#fb7185',
}

const COL_W = 360
const REGION_W = 320
const CHILD_X = 24
const CHILD_Y = 118
const CHILD_STEP = 64

const flowNodes = computed(() => {
    const nodes = []
    props.layers.forEach((l, i) => {
        const regionId = `region-${l.key}`
        nodes.push({
            id: regionId,
            type: 'region',
            position: { x: i * COL_W, y: 0 },
            width: REGION_W,
            data: { ...l, color: LAYER_COLORS[l.key] ?? '#8b9bb4' },
            draggable: false,
            connectable: false,
            selectable: false,
        })
        l.projects.forEach((p, j) => {
            nodes.push({
                id: `p-${p.name}`,
                type: 'project',
                parentNode: regionId,
                extent: 'parent',
                expandParent: true,
                position: { x: CHILD_X, y: CHILD_Y + j * CHILD_STEP },
                data: { p, color: LAYER_COLORS[l.key] ?? '#8b9bb4' },
                draggable: false,
                connectable: false,
            })
        })
    })
    return nodes
})

const flowEdges = computed(() => {
    const edges = []
    props.layers.forEach((l, i) => {
        const next = props.layers[i + 1]
        if (next) {
            edges.push({
                id: `e-chain-${l.key}`,
                source: `region-${l.key}`,
                sourceHandle: 'next',
                target: `region-${next.key}`,
                targetHandle: 'prev',
                type: 'smoothstep',
                class: 'stack-edge-chain',
                animated: true,
            })
        }
    })
    return edges
})
</script>

<template>
    <VueFlow
        class="stack-flow"
        :nodes="flowNodes"
        :edges="flowEdges"
        :nodes-draggable="false"
        :nodes-connectable="false"
        fit-view-on-init
        :fit-view-options="{ padding: 0.06 }"
    >
        <template #node-region="nodeProps">
            <div class="vf-region" :style="{ '--accent': nodeProps.data.color }">
                <Handle type="target" :position="Position.Left" id="prev" class="vf-handle" style="top: 56px" />
                <Handle type="source" :position="Position.Right" id="next" class="vf-handle" style="top: 56px" />
                <div class="vf-region-head">
                    <div class="vf-region-kicker">{{ nodeProps.data.projects.length }} organisms</div>
                    <div class="vf-region-title">{{ nodeProps.data.title }}</div>
                    <p class="vf-region-blurb">{{ nodeProps.data.blurb }}</p>
                </div>
            </div>
        </template>
        <template #node-project="nodeProps">
            <div class="vf-project" :style="{ '--accent': nodeProps.data.color }">
                <a :href="nodeProps.data.p.docs ?? nodeProps.data.p.website ?? '#'" class="vf-project-link">
                    <span class="vf-project-name">{{ nodeProps.data.p.name }}</span>
                    <span class="vf-project-tag">{{ nodeProps.data.p.tagline }}</span>
                </a>
            </div>
        </template>
        <Controls :show-interactive="false" />
    </VueFlow>
</template>

<style>
.stack-flow {
    height: 640px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
    background: var(--vp-c-bg);
}

.stack-flow .vue-flow__edge-path {
    stroke-linecap: round;
}

.stack-flow .vue-flow__edge.stack-edge-chain .vue-flow__edge-path {
    stroke: var(--vp-c-brand-1);
    stroke-width: 2;
}

.vf-handle {
    opacity: 0;
    pointer-events: none;
}

.vf-region {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
    background: color-mix(in srgb, var(--accent) 6%, var(--vp-c-bg-soft));
}

.vf-region-head {
    padding: 18px 20px 14px;
}

.vf-region-kicker {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--accent);
}

.vf-region-title {
    font-size: 18px;
    font-weight: 700;
    color: var(--vp-c-text-1);
    margin-top: 2px;
}

.vf-region-blurb {
    margin: 6px 0 0;
    font-size: 12px;
    line-height: 18px;
    color: var(--vp-c-text-2);
}

.vf-project {
    width: 272px;
    border-radius: 10px;
    background: var(--vp-c-bg-soft);
    border: 1px solid color-mix(in srgb, var(--accent) 40%, var(--vp-c-divider));
    box-shadow: 0 1px 3px rgb(0 0 0 / 0.12);
    color: var(--vp-c-text-1);
    transition: transform 0.15s ease, border-color 0.15s ease;
}

.vf-project:hover {
    transform: translateY(-2px);
    border-color: var(--accent);
}

.vf-project-link {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 10px 14px;
    color: var(--vp-c-text-1);
    text-decoration: none;
}

.vf-project-name {
    font-size: 13px;
    font-weight: 600;
    color: var(--vp-c-text-1);
}

.vf-project-link:hover .vf-project-name {
    color: var(--vp-c-brand-1);
}

.vf-project-tag {
    font-size: 11px;
    line-height: 16px;
    color: var(--vp-c-text-2);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.stack-flow .vue-flow__controls {
    box-shadow: none;
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    overflow: hidden;
}

.stack-flow .vue-flow__controls-button {
    background: var(--vp-c-bg-soft);
    border-bottom: 1px solid var(--vp-c-divider);
    color: var(--vp-c-text-1);
    fill: currentColor;
}

.stack-flow .vue-flow__controls-button:hover {
    background: var(--vp-c-bg-alt);
}
</style>
