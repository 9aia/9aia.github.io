<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import ELK from 'elkjs/lib/elk.bundled.js'
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

const wrapEl = ref(null)
const vfInstance = ref(null)
const isFullscreen = ref(false)

function onVfInit(instance) {
    vfInstance.value = instance
    // Nodes may already be laid out if ELK resolved before init.
    if (flowNodes.value.length) instance.fitView({ padding: 0.08 })
}

async function toggleFullscreen() {
    if (document.fullscreenElement) {
        await document.exitFullscreen()
    } else {
        await wrapEl.value?.requestFullscreen()
    }
}

function onFullscreenChange() {
    isFullscreen.value = Boolean(document.fullscreenElement)
    setTimeout(() => vfInstance.value?.fitView({ padding: 0.08 }), 60)
}

// Project detail dialog — node clicks open this instead of navigating.
const selected = ref(null)
const selectedColor = ref('#9aa5c4')
const dialogEl = ref(null)

function openProject(p, color) {
    selected.value = p
    selectedColor.value = color ?? '#9aa5c4'
}

function closeDialog() {
    selected.value = null
}

// Resolve a dependency name (depends_on / integrates_with) to its catalog
// entry; unknown names render as plain text.
function depLink(name) {
    const p = byName.value.get(name)
    if (!p) return null
    return { name, href: p.docs ?? p.website ?? p.repo ?? '#' }
}

watch(selected, async (v) => {
    if (v) {
        await nextTick()
        dialogEl.value?.querySelector('.stack-dialog-close')?.focus()
    }
})

function onDialogKeydown(e) {
    if (e.key === 'Escape' && selected.value) closeDialog()
}

onMounted(() => {
    document.addEventListener('fullscreenchange', onFullscreenChange)
    document.addEventListener('keydown', onDialogKeydown)
})
onUnmounted(() => {
    document.removeEventListener('fullscreenchange', onFullscreenChange)
    document.removeEventListener('keydown', onDialogKeydown)
})

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

const elk = new ELK()

// ELK layered layout — positions resolve asynchronously, so nodes/edges
// populate once elk.layout() resolves (Vue Flow mounts empty until then).
const flowNodes = ref([])
const flowEdges = ref([])

let layoutSeq = 0

async function runLayout() {
    const seq = ++layoutSeq
    const graph = {
        id: 'stack',
        layoutOptions: {
            'elk.algorithm': 'layered',
            'elk.direction': 'RIGHT',
            'elk.edgeRouting': 'SPLINES',
            'elk.spacing.nodeNode': '40',
            'elk.layered.spacing.nodeNodeBetweenLayers': '90',
            'elk.spacing.edgeNode': '24',
            'elk.padding': '[top=16,left=16,bottom=16,right=16]',
        },
        children: allProjects.value.map((lp) => ({
            id: `p-${lp.name}`,
            width: NODE_W,
            height: NODE_H,
        })),
        edges: rawEdges.value.map((e) => ({
            id: `${e.kind}:${e.source}->${e.target}`,
            sources: [e.source],
            targets: [e.target],
        })),
    }

    const res = await elk.layout(graph)
    if (seq !== layoutSeq) return // a newer layout superseded this one

    const pos = new Map(res.children.map((c) => [c.id, c]))
    flowNodes.value = allProjects.value.map((lp) => {
        const n = pos.get(`p-${lp.name}`)
        return {
            id: `p-${lp.name}`,
            type: 'project',
            position: { x: n.x, y: n.y },
            data: {
                p: lp,
                layer: lp.layer,
                color: LAYER_COLORS[lp.layer.key] ?? '#9aa5c4',
            },
            connectable: false,
            draggable: false,
        }
    })

    flowEdges.value = rawEdges.value.map((e) => {
        const src = byName.value.get(e.source.slice(2))
        const color = LAYER_COLORS[src.layer.key] ?? '#9aa5c4'
        return {
            id: `${e.kind}:${e.source}->${e.target}`,
            source: e.source,
            target: e.target,
            type: 'default',
            class: `dep-edge dep-edge--${e.kind}`,
            // No edge interaction: the default 20px invisible stroke (plus
            // the `nopan` class Vue Flow puts on every edge) would swallow
            // pointer events and block camera drags. Edges are visual only.
            interactionWidth: 0,
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
}

// Edges with dimming applied — computed so hover state stays reactive.
const dimmedEdges = computed(() =>
    flowEdges.value.map((e) => {
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

watch(flowNodes, async (nodes) => {
    if (nodes.length) {
        await nextTick()
        vfInstance.value?.fitView({ padding: 0.08 })
    }
})

onMounted(runLayout)
watch(() => props.layers, runLayout)
</script>

<template>
    <div ref="wrapEl" class="stack-graph-wrap">
        <VueFlow
            class="stack-flow"
            :nodes="flowNodes"
            :edges="dimmedEdges"
            :nodes-connectable="false"
            :nodes-draggable="false"
            :min-zoom="0.05"
            :pan-on-drag="true"
            :pan-on-scroll="false"
            :zoom-on-scroll="true"
            :zoom-on-pinch="true"
            :selection-on-drag="false"
            :nodes-focusable="false"
            :edges-focusable="false"
            :elements-selectable="false"
            fit-view-on-init
            :fit-view-options="{ padding: 0.08 }"
            @init="onVfInit"
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
                    <button
                        type="button"
                        class="vf-node-link"
                        :aria-label="`Open ${nodeProps.data.p.name} details`"
                        @click="openProject(nodeProps.data.p, nodeProps.data.color)"
                    >
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
                    </button>
                </div>
            </template>
            <Controls :show-interactive="false" />
        </VueFlow>
        <div class="stack-legend">
            <span class="stack-legend-item"><i class="stack-legend-line stack-legend-line--dep" />depends on</span>
            <span class="stack-legend-item"><i class="stack-legend-line stack-legend-line--int" />integrates</span>
        </div>
        <button
            type="button"
            class="stack-fs-btn"
            :aria-label="isFullscreen ? 'Exit fullscreen' : 'Fullscreen graph'"
            :title="isFullscreen ? 'Exit fullscreen' : 'Fullscreen'"
            @click="toggleFullscreen"
        >
            <svg
                v-if="!isFullscreen"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <path d="M8 3H5a2 2 0 0 0-2 2v3" /><path d="M21 8V5a2 2 0 0 0-2-2h-3" /><path d="M3 16v3a2 2 0 0 0 2 2h3" /><path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
            <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <path d="M8 3v3a2 2 0 0 1-2 2H3" /><path d="M21 8h-3a2 2 0 0 1-2-2V3" /><path d="M3 16h3a2 2 0 0 1 2 2v3" /><path d="M16 21v-3a2 2 0 0 1 2-2h3" />
            </svg>
        </button>
        <!-- Dialog lives inside .stack-graph-wrap (no Teleport): when the
             wrap goes fullscreen it enters the top layer, and a body-level
             dialog would render underneath it. position:fixed still
             covers the viewport since no ancestor is transformed. -->
        <div v-if="selected" class="stack-dialog-backdrop" @click.self="closeDialog">
            <div
                ref="dialogEl"
                class="stack-dialog"
                :style="{ '--accent': selectedColor }"
                role="dialog"
                aria-modal="true"
                aria-labelledby="stack-dialog-title"
            >
                <button
                    type="button"
                    class="stack-dialog-close"
                    aria-label="Close dialog"
                    @click="closeDialog"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                    </svg>
                </button>
                <div class="stack-dialog-body">
                    <p class="stack-dialog-layer">{{ selected.layer?.title }}</p>
                    <h2 id="stack-dialog-title" class="stack-dialog-name">{{ selected.name }}</h2>
                    <p v-if="selected.tagline" class="stack-dialog-tag">{{ selected.tagline }}</p>
                    <p v-if="selected.description" class="stack-dialog-desc">{{ selected.description }}</p>
                    <p v-if="selected.role || selected.stage || selected.status" class="stack-dialog-meta">
                        <span v-if="selected.role" class="stack-dialog-chip">{{ selected.role }}</span>
                        <span v-if="selected.stage" class="stack-dialog-chip">{{ selected.stage }}</span>
                        <span v-if="selected.status" class="stack-dialog-chip">{{ selected.status }}</span>
                    </p>
                    <p class="stack-dialog-links">
                        <a v-if="selected.website" :href="selected.website" target="_blank" rel="noopener">Website</a>
                        <a v-if="selected.repo" :href="selected.repo" target="_blank" rel="noopener">GitHub</a>
                        <a v-if="selected.docs" :href="selected.docs">Docs</a>
                    </p>
                    <section v-if="(selected.depends_on ?? []).length" class="stack-dialog-deps">
                        <h3>Depends on</h3>
                        <ul>
                            <li v-for="d in selected.depends_on" :key="`dep-${d}`">
                                <a v-if="depLink(d)" :href="depLink(d).href">{{ d }}</a>
                                <span v-else>{{ d }}</span>
                            </li>
                        </ul>
                    </section>
                    <section v-if="(selected.integrates_with ?? []).length" class="stack-dialog-deps">
                        <h3>Integrates with</h3>
                        <ul>
                            <li v-for="d in selected.integrates_with" :key="`int-${d}`">
                                <a v-if="depLink(d)" :href="depLink(d).href">{{ d }}</a>
                                <span v-else>{{ d }}</span>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.stack-graph-wrap {
    position: relative;
}

.stack-flow {
    height: clamp(360px, 68vh, 640px);
    border-radius: 12px;
    background: var(--vp-c-bg);
}

@media (max-width: 640px) {
    .stack-flow {
        height: clamp(320px, 60vh, 480px);
    }
}

.stack-flow .vue-flow,
.stack-flow .vue-flow__pane,
.stack-flow .vue-flow__viewport {
    background: transparent;
}

.stack-flow .vue-flow__edges {
    pointer-events: none;
}

/* Belt-and-suspenders on top of `interactionWidth: 0` and
   `elements-selectable=false` (which adds Vue Flow's `inactive` class):
   edges must never intercept pointer events, or their wide invisible
   interaction path plus the `nopan` class would block pane drags —
   especially on touch, where one-finger drag should always pan. */
.stack-flow .vue-flow__edge {
    pointer-events: none;
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
    width: min(230px, 80vw);
    border-radius: var(--radius-blob-a);
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
    box-shadow: 0 1px 3px rgb(20 20 60 / 0.12);
    transition: opacity 0.18s ease;
}

.vf-node.vf-node-dim {
    opacity: 0.18;
}

.vf-node-link {
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
    padding: 10px 14px;
    border: 0;
    background: transparent;
    font: inherit;
    text-align: left;
    color: var(--vp-c-text-1);
    cursor: pointer;
}

.vf-node-link:hover,
.vf-node-link:focus-visible {
    outline: none;
}

.vf-node-link:focus-visible {
    box-shadow: inset 0 0 0 2px var(--vp-c-brand-1);
    border-radius: var(--radius-blob-a);
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
    right: 8px;
    bottom: 8px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 6px 14px;
    max-width: calc(100% - 16px);
    padding: 6px 12px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--vp-c-bg-alt) 90%, transparent);
    backdrop-filter: blur(4px);
    font-size: 11px;
    color: var(--vp-c-text-2);
}

@media (max-width: 640px) {
    .stack-legend {
        font-size: 10px;
        gap: 4px 10px;
        padding: 5px 10px;
    }
    .stack-fs-btn {
        width: 30px;
        height: 30px;
        top: 10px;
        right: 10px;
    }
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
    background: var(--vp-c-bg-alt);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgb(20 20 60 / 0.12);
}

.stack-flow .vue-flow__controls-button {
    background: transparent;
    border-bottom: none;
    color: var(--vp-c-text-1);
    fill: currentColor;
}

.stack-flow .vue-flow__controls-button:hover {
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-brand-1);
}

.stack-fs-btn {
    position: absolute;
    top: 14px;
    right: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    padding: 0;
    border-radius: 8px;
    background: color-mix(in srgb, var(--vp-c-bg-alt) 90%, transparent);
    box-shadow: 0 1px 3px rgb(20 20 60 / 0.12);
    backdrop-filter: blur(4px);
    color: var(--vp-c-text-1);
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
}

.stack-fs-btn svg {
    width: 16px;
    height: 16px;
}

.stack-fs-btn:hover {
    background: var(--vp-c-bg-alt);
    color: var(--vp-c-brand-1);
}

/* True fullscreen: the canvas fills the viewport edge-to-edge; legend and
   the exit button stay as floating overlays and take no layout space. */
.stack-graph-wrap:fullscreen {
    height: 100%;
    background: var(--vp-c-bg);
}

.stack-graph-wrap:fullscreen .stack-flow {
    height: 100%;
    border: none;
    border-radius: 0;
}

/* Project detail dialog */
.stack-dialog-backdrop {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    background: rgb(10 10 30 / 0.45);
    backdrop-filter: blur(2px);
}

.stack-dialog {
    position: relative;
    width: min(560px, 92vw);
    height: min(640px, 80vh);
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-blob-a);
    background: var(--vp-c-bg-alt);
    color: var(--vp-c-text-1);
    box-shadow: 0 12px 40px rgb(10 10 40 / 0.35);
    overflow: hidden;
}

.stack-dialog-close {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-2);
    cursor: pointer;
    transition: color 0.15s ease, background 0.15s ease;
}

.stack-dialog-close svg {
    width: 16px;
    height: 16px;
}

.stack-dialog-close:hover {
    color: var(--vp-c-brand-1);
    background: var(--vp-c-bg);
}

.stack-dialog-body {
    overflow-y: auto;
    padding: 28px 28px 24px;
}

.stack-dialog-layer {
    margin: 0;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    color: var(--accent, var(--vp-c-brand-1));
}

.stack-dialog-name {
    margin: 6px 0 0;
    font-size: 24px;
    line-height: 30px;
    font-weight: 700;
}

.stack-dialog-tag {
    margin: 8px 0 0;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-brand-1);
}

.stack-dialog-desc {
    margin: 10px 0 0;
    font-size: 14px;
    line-height: 22px;
    color: var(--vp-c-text-2);
}

.stack-dialog-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin: 14px 0 0;
}

.stack-dialog-chip {
    padding: 2px 10px;
    border-radius: 999px;
    background: var(--vp-c-bg-soft);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--vp-c-text-2);
}

.stack-dialog-links {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin: 16px 0 0;
    font-size: 13px;
}

.stack-dialog-links a {
    color: var(--vp-c-brand-1);
    font-weight: 600;
    text-decoration: none;
}

.stack-dialog-links a:hover {
    text-decoration: underline;
}

.stack-dialog-deps {
    margin-top: 20px;
}

.stack-dialog-deps h3 {
    margin: 0 0 8px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--vp-c-text-3);
}

.stack-dialog-deps ul {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 14px;
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: 13px;
}

.stack-dialog-deps a {
    color: var(--vp-c-brand-1);
    text-decoration: none;
}

.stack-dialog-deps a:hover {
    text-decoration: underline;
}

.stack-dialog-deps span {
    color: var(--vp-c-text-2);
}

/* Mobile: the dialog becomes a true fullscreen sheet — no margins,
   no radius, edge to edge. */
@media (max-width: 640px) {
    .stack-dialog-backdrop {
        padding: 0;
    }

    .stack-dialog {
        width: 100%;
        height: 100%;
        height: 100dvh;
        border-radius: 0;
    }
}
</style>
