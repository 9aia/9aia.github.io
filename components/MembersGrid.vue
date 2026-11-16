<script setup>
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { members, githubUsername, linkLabel } from '../.vitepress/theme/members.ts'

const selected = ref(null)
const dialogEl = ref(null)
const profiles = reactive({})
// Module-level cache survives dialog close/reopen — keyed by GitHub
// username, value is the same reactive entry exposed via `profiles`.
const profileCache = new Map()

function ensureProfile(username) {
    if (!username || profileCache.has(username)) return
    const entry = reactive({ status: 'loading', data: null })
    profileCache.set(username, entry)
    profiles[username] = entry
    fetch(`https://api.github.com/users/${username}`, {
        headers: { Accept: 'application/vnd.github+json' },
    })
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
        .then((data) => {
            entry.status = 'ok'
            entry.data = data
        })
        .catch(() => {
            // Rate limit / offline / deleted account — the dialog just
            // shows the static roster info; no error UI.
            entry.status = 'error'
        })
}

const selectedUsername = computed(() =>
    selected.value ? githubUsername(selected.value) : null,
)
const selectedProfile = computed(() =>
    selectedUsername.value ? profiles[selectedUsername.value] : null,
)

function openMember(m) {
    selected.value = m
}

function closeDialog() {
    selected.value = null
}

watch(selected, async (v) => {
    if (v) {
        ensureProfile(githubUsername(v))
        await nextTick()
        dialogEl.value?.querySelector('.member-dialog-close')?.focus()
    }
})

function onDialogKeydown(e) {
    if (e.key === 'Escape' && selected.value) closeDialog()
}

onMounted(() => {
    document.addEventListener('keydown', onDialogKeydown)
})
onUnmounted(() => {
    document.removeEventListener('keydown', onDialogKeydown)
})

function fmtDate(iso) {
    if (!iso) return null
    const d = new Date(iso)
    return Number.isNaN(d.getTime())
        ? null
        : d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}
</script>

<template>
    <div class="members-grid">
        <button
            v-for="m in members"
            :key="m.name"
            type="button"
            class="member-card"
            :aria-label="`Open ${m.name} details`"
            @click="openMember(m)"
        >
            <img class="member-card-avatar" :src="m.avatar" :alt="m.name" loading="lazy" />
            <span class="member-card-name">{{ m.name }}</span>
            <span class="member-card-title">{{ m.title }}</span>
            <span class="member-card-hint">Details →</span>
        </button>
    </div>

    <!-- Dialog lives inline (no Teleport), same pattern as StackGraph's
         project dialog: fixed positioning covers the viewport, Escape
         and backdrop click close it, and below 640px it goes
         edge-to-edge fullscreen. -->
    <div v-if="selected" class="member-dialog-backdrop" @click.self="closeDialog">
        <div
            ref="dialogEl"
            class="member-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-dialog-title"
        >
            <button
                type="button"
                class="member-dialog-close"
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
            <div class="member-dialog-body">
                <div class="member-dialog-head">
                    <img
                        class="member-dialog-avatar"
                        :src="selected.avatar"
                        :alt="selected.name"
                    />
                    <div>
                        <h2 id="member-dialog-title" class="member-dialog-name">
                            {{ selected.name }}
                        </h2>
                        <p class="member-dialog-title">{{ selected.title }}</p>
                    </div>
                </div>

                <p class="member-dialog-links">
                    <a
                        v-for="l in selected.links"
                        :key="l.link"
                        :href="l.link"
                        target="_blank"
                        rel="noopener"
                    >{{ linkLabel(l.link) }}</a>
                </p>

                <section v-if="selectedProfile?.status === 'ok'" class="member-gh">
                    <h3>GitHub</h3>
                    <p v-if="selectedProfile.data.bio" class="member-gh-bio">
                        {{ selectedProfile.data.bio }}
                    </p>
                    <ul class="member-gh-meta">
                        <li v-if="selectedProfile.data.company">
                            {{ selectedProfile.data.company.replace(/^@/, '') }}
                        </li>
                        <li v-if="selectedProfile.data.location">{{ selectedProfile.data.location }}</li>
                        <li v-if="fmtDate(selectedProfile.data.created_at)">
                            Joined {{ fmtDate(selectedProfile.data.created_at) }}
                        </li>
                    </ul>
                    <p class="member-gh-stats">
                        <span>{{ selectedProfile.data.followers ?? 0 }} followers</span>
                        <span>{{ selectedProfile.data.following ?? 0 }} following</span>
                        <span>{{ selectedProfile.data.public_repos ?? 0 }} public repos</span>
                    </p>
                    <p v-if="selectedProfile.data.blog" class="member-gh-blog">
                        <a :href="selectedProfile.data.blog" target="_blank" rel="noopener">
                            {{ selectedProfile.data.blog }}
                        </a>
                    </p>
                </section>
                <p v-else-if="selectedProfile?.status === 'loading'" class="member-gh-loading">
                    Loading GitHub profile…
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.members-grid {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
    margin-top: 24px;
}
@media (min-width: 640px) {
    .members-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media (min-width: 1100px) {
    .members-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
.member-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    padding: 24px;
    border: 0;
    border-radius: var(--radius-blob-a);
    background-color: var(--vp-c-bg-soft);
    font: inherit;
    text-align: left;
    color: var(--vp-c-text-1);
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.members-grid .member-card:nth-child(2) {
    border-radius: var(--radius-blob-b);
}
.members-grid .member-card:nth-child(3) {
    border-radius: var(--radius-blob-c);
}
.members-grid .member-card:nth-child(4) {
    border-radius: var(--radius-blob-a);
}
.member-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgb(20 20 60 / 0.14);
}
.member-card:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 2px var(--vp-c-brand-1);
}
.member-card-avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
    background: var(--vp-c-bg-soft);
}
.member-card-name {
    font-size: 16px;
    font-weight: 700;
}
.member-card:hover .member-card-name {
    color: var(--vp-c-brand-1);
}
.member-card-title {
    font-size: 12px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--vp-c-text-3);
}
.member-card-hint {
    margin-top: auto;
    padding-top: 8px;
    font-size: 12px;
    font-weight: 600;
    color: var(--vp-c-brand-1);
}

/* Detail dialog — mirrors .stack-dialog from StackGraph.vue. */
.member-dialog-backdrop {
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
.member-dialog {
    position: relative;
    width: min(560px, 92vw);
    height: min(600px, 82vh);
    display: flex;
    flex-direction: column;
    border-radius: var(--radius-blob-a);
    background: var(--vp-c-bg-alt);
    color: var(--vp-c-text-1);
    box-shadow: 0 12px 40px rgb(10 10 40 / 0.35);
    overflow: hidden;
}
.member-dialog-close {
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
.member-dialog-close svg {
    width: 16px;
    height: 16px;
}
.member-dialog-close:hover {
    color: var(--vp-c-brand-1);
    background: var(--vp-c-bg);
}
.member-dialog-body {
    overflow-y: auto;
    padding: 28px 28px 24px;
}
.member-dialog-head {
    display: flex;
    align-items: center;
    gap: 18px;
}
.member-dialog-avatar {
    width: 88px;
    height: 88px;
    flex: none;
    border-radius: var(--radius-blob-b);
    object-fit: cover;
    background: var(--vp-c-bg-soft);
}
.member-dialog-name {
    margin: 0;
    font-size: 24px;
    line-height: 30px;
    font-weight: 700;
}
.member-dialog-title {
    margin: 6px 0 0;
    font-size: 14px;
    font-weight: 500;
    color: var(--vp-c-brand-1);
}
.member-dialog-links {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin: 18px 0 0;
    font-size: 13px;
}
.member-dialog-links a {
    color: var(--vp-c-brand-1);
    font-weight: 600;
    text-decoration: none;
}
.member-dialog-links a:hover {
    text-decoration: underline;
}
.member-gh {
    margin-top: 22px;
    padding-top: 18px;
    border-top: 1px solid var(--vp-c-divider);
}
.member-gh h3 {
    margin: 0 0 10px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--vp-c-text-3);
}
.member-gh-bio {
    margin: 0;
    font-size: 14px;
    line-height: 22px;
    color: var(--vp-c-text-2);
}
.member-gh-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 16px;
    margin: 10px 0 0;
    padding: 0;
    list-style: none;
    font-size: 13px;
    color: var(--vp-c-text-2);
}
.member-gh-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 16px;
    margin: 10px 0 0;
    font-size: 13px;
    color: var(--vp-c-text-2);
}
.member-gh-blog {
    margin: 10px 0 0;
    font-size: 13px;
    overflow-wrap: anywhere;
}
.member-gh-blog a {
    color: var(--vp-c-brand-1);
    text-decoration: none;
}
.member-gh-blog a:hover {
    text-decoration: underline;
}
.member-gh-loading {
    margin: 22px 0 0;
    padding-top: 18px;
    border-top: 1px solid var(--vp-c-divider);
    font-size: 13px;
    color: var(--vp-c-text-3);
}

/* Mobile: edge-to-edge fullscreen sheet, same as StackGraph. */
@media (max-width: 640px) {
    .member-dialog-backdrop {
        padding: 0;
    }
    .member-dialog {
        width: 100%;
        height: 100%;
        height: 100dvh;
        border-radius: 0;
    }
    .members-grid {
        grid-template-columns: 1fr;
    }
}
</style>
