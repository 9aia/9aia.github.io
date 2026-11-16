<script setup>
import { computed, ref } from 'vue'
import dagre from '@dagrejs/dagre'
import { VueFlow, MarkerType } from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'
import '@vue-flow/controls/dist/style.css'

const props = defineProps({
    layers: { type: Array, required: true },
})

const LAYER_COLORS = {
    delivery: '#4f9ecb',
    memory: '#8f6fd0',
    process: '#c99b45',
    interface: '#d4709a',
}

const LAYER_ICONS = {
    delivery:
        '<rect width="16" height="12" x="4" y="8" rx="2"/><path d="M12 8V4H8"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
    memory:
        '<path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>',
    process:
        '<rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/>',
    interface:
        '<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>',
}

const hovered = ref(null)

const relatedIds = computed(() => {
    if (!hovered.value) return null
    const set = new Set([hovered.value])
    for (const e of rawEdges.value) {
        // Only hard dependencies define the lit neighborhood — `integrates`
        // is a soft relation and would keep hub nodes (e.g. tamias) lit
        // against the whole graph.
        if (e.kind !== 'dep') continue
        if (e.source === hovered.value) set.add(e.target)
        if (e.target === hovered.value) set.add(e.source)
    }
    return set
})

function onNodeEnter({ node }) {
    hovered.value = node.id
}

function onNodeLeave() {
    hovered.value = null
}

const NODE_W = 230
const NODE_H = 76

const allProjects = computed(() =>
    props.layers.flatMap((l) => l.projects.map((p) => ({ ...p, layer: l }))),
)

const byName = computed(() => {
    const map = new Map()
    for (const lp of allProjects.value) map.set(lp.name, lp)
    return map
})

const rawEdges = computed(() => {
    const edges = []
    const seen = new Set()
    for (const lp of allProjects.value) {
        const add = (target, kind) => {
            if (!byName.value.has(target)) return
            const id = `${kind}:${lp.name}->${target}`
            if (seen.has(id)) return
            seen.add(id)
            edges.push({ source: `p-${lp.name}`, target: `p-${target}`, kind })
        }
        for (const d of lp.depends_on ?? []) add(d, 'dep')
        for (const i of lp.integrates_with ?? []) add(i, 'integrates')
    }
    return edges
})

const layout = computed(() => {
    const g = new dagre.graphlib.Graph()
    g.setGraph({ rankdir: 'LR', nodesep: 24, ranksep: 110, marginx: 16, marginy: 16 })
    g.setDefaultEdgeLabel(() => ({}))

    for (const lp of allProjects.value) {
        g.setNode(`p-${lp.name}`, { width: NODE_W, height: NODE_H })
    }
    for (const e of rawEdges.value) {
        g.setEdge(e.source, e.target)
    }
    dagre.layout(g)

    const nodes = allProjects.value.map((lp) => {
        const n = g.node(`p-${lp.name}`)
        return {
            id: `p-${lp.name}`,
            type: 'project',
            position: { x: n.x - NODE_W / 2, y: n.y - NODE_H / 2 },
            data: {
                p: lp,
                layer: lp.layer,
                color: LAYER_COLORS[lp.layer.key] ?? '#8b9bb4',
            },
            connectable: false,
            draggable: false,
        }
    })

    const edges = rawEdges.value.map((e) => {
        const src = byName.value.get(e.source.slice(2))
        const color = LAYER_COLORS[src.layer.key] ?? '#8b9bb4'
        return {
            id: `${e.kind}:${e.source}->${e.target}`,
            source: e.source,
            target: e.target,
            type: 'default',
            class: `dep-edge dep-edge--${e.kind}`,
            style: { stroke: color, strokeOpacity: e.kind === 'dep' ? 0.6 : 0.4 },
            markerEnd: {
                type: MarkerType.ArrowClosed,
                color,
                width: 18,
                height: 18,
            },
            _source: e.source,
            _target: e.target,
        }
    })

    return { nodes, edges }
})

const flowNodes = computed(() => layout.value.nodes)

const flowEdges = computed(() =>
    layout.value.edges.map((e) => {
        const dim =
            relatedIds.value !== null &&
            e._source !== hovered.value &&
            e._target !== hovered.value
        return {
            ...e,
            class: `${e.class} ${dim ? 'dep-edge-dim' : ''}`,
            markerEnd: dim
                ? { ...e.markerEnd, color: 'transparent' }
                : e.markerEnd,
        }
    }),
)
</script>

<template>
    <div class="stack-graph-wrap">
        <VueFlow
            class="stack-flow"
            :nodes="flowNodes"
            :edges="flowEdges"
            :nodes-connectable="false"
            :nodes-draggable="false"
            fit-view-on-init
            :fit-view-options="{ padding: 0.08 }"
            @node-mouse-enter="onNodeEnter"
            @node-mouse-leave="onNodeLeave"
            @pane-mouse-leave="onNodeLeave"
        >
            <template #node-project="nodeProps">
                <div
                    class="vf-node"
                    :class="{ 'vf-node-dim': relatedIds && !relatedIds.has(nodeProps.id) }"
                    :style="{ '--accent': nodeProps.data.color }"
                >
                    <a :href="nodeProps.data.p.docs ?? nodeProps.data.p.website ?? '#'" class="vf-node-link">
                        <span class="vf-node-kicker">
                            <svg
                                class="vf-node-icon"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                aria-hidden="true"
                                v-html="LAYER_ICONS[nodeProps.data.layer.key]"
                            />
                            {{ nodeProps.data.layer.title }}
                        </span>
                        <span class="vf-node-name">{{ nodeProps.data.p.name }}</span>
                        <span class="vf-node-tag">{{ nodeProps.data.p.tagline }}</span>
                    </a>
                </div>
            </template>
            <Controls :show-interactive="false" />
        </VueFlow>
        <div class="stack-legend">
            <span class="stack-legend-item"><i class="stack-legend-line stack-legend-line--dep" />depends on</span>
            <span class="stack-legend-item"><i class="stack-legend-line stack-legend-line--int" />integrates</span>
        </div>
    </div>
</template>

<style>
.stack-graph-wrap {
    position: relative;
}

.stack-flow {
    height: 640px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
    background: var(--vp-c-bg);
}

.stack-flow .vue-flow__edge-path {
    stroke-linecap: round;
}

.stack-flow .vue-flow__edge.dep-edge--dep .vue-flow__edge-path {
    stroke-width: 1.6;
}

.stack-flow .vue-flow__edge.dep-edge--integrates .vue-flow__edge-path {
    stroke-dasharray: 5 4;
}

.stack-flow .vue-flow__edge .vue-flow__edge-path {
    transition: opacity 0.18s ease;
}

.stack-flow .vue-flow__edge.dep-edge-dim .vue-flow__edge-path {
    opacity: 0.12;
}

.vf-node {
    width: 230px;
    border-radius: 10px;
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    color: var(--vp-c-text-1);
    transition: opacity 0.18s ease;
}

.vf-node.vf-node-dim {
    opacity: 0.18;
}

.vf-node-link {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 10px 14px;
    color: var(--vp-c-text-1);
    text-decoration: none;
}

.vf-node-kicker {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--accent);
}

.vf-node-icon {
    width: 12px;
    height: 12px;
    flex: none;
}

.vf-node-name {
    font-size: 14px;
    font-weight: 700;
}

.vf-node-tag {
    font-size: 11px;
    line-height: 16px;
    color: var(--vp-c-text-2);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.stack-legend {
    position: absolute;
    right: 14px;
    bottom: 14px;
    display: flex;
    gap: 14px;
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid var(--vp-c-divider);
    background: color-mix(in srgb, var(--vp-c-bg) 85%, transparent);
    backdrop-filter: blur(4px);
    font-size: 11px;
    color: var(--vp-c-text-2);
}

.stack-legend-line {
    display: inline-block;
    width: 22px;
    height: 0;
    margin-right: 5px;
    vertical-align: middle;
    border-top: 2px solid var(--vp-c-text-2);
}

.stack-legend-line--dep {
    border-top-style: solid;
}

.stack-legend-line--int {
    border-top-style: dashed;
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
