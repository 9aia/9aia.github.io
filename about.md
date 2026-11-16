<script setup>
import { VPTeamMembers, VPLink } from 'vitepress/theme'

const siteSvg = '<svg role="img" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539a7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539a7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/></svg>'

const members = [
    {
        name: 'Luis Emidio',
        title: 'Founder | Software Developer',
        avatar: 'https://www.github.com/luisfuturist.png',
        links: [
            { icon: 'github', link: 'https://github.com/luisfuturist' },
            { icon: 'x', link: 'https://x.com/luisfuturist' },
            { icon: { svg: siteSvg }, link: 'https://luisfuturist.com' },
        ]
    },
    {
        name: 'Vinicius Emidio Bosi',
        title: 'Software Developer',
        avatar: 'https://github.com/vinicenter.png',
        links: [
            { icon: 'github', link: 'https://github.com/vinicenter' },
            { icon: 'twitter', link: 'https://x.com/vinicenter' },
            { icon: { svg: siteSvg }, link: 'https://vini.center' },
        ]
    },
    {
        name: 'Emanuel Corrêa Carneiro',
        title: 'Software Developer',
        avatar: 'https://github.com/eccarneiro.png',
        links: [
            { icon: 'github', link: 'https://github.com/eccarneiro' },
        ]
    },
    {
        name: 'Kruceo',
        title: 'Software Developer',
        avatar: 'https://github.com/kruceo.png',
        links: [
            { icon: 'github', link: 'https://github.com/kruceo' },
            { icon: { svg: siteSvg }, link: 'https://kruceo.com' },
        ]
    }
];
</script>

# About

Open infrastructure for agent-driven development: a small group of developers building minimal, open-source engines that people and agents can own.

## What we believe

Coding agents are here to stay. The question is who owns the infrastructure they run on. We think the answer should be you: open source, self-hosted, composable, yours. Not a SaaS control plane, not a DSL, not a server fleet you rent back.

<div class="values-grid">
    <div class="value">
        <svg class="value-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22v-5"/><path d="M15 8V2"/><path d="M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z"/><path d="M9 8V2"/></svg>
        <h3 class="value-title">Ports Are the Architecture, Not a Plugin API</h3>
        <p class="value-details">Every concern is a trait + impl; the boundaries are the codebase.</p>
    </div>
    <div class="value">
        <svg class="value-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M12 8V4H8"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
        <h3 class="value-title">Machine-First Wire, Not UI-First</h3>
        <p class="value-details">Manifest, schema, serve: surfaces for machines, humans second.</p>
    </div>
    <div class="value">
        <svg class="value-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"/><rect width="8" height="8" x="14" y="2" rx="1"/></svg>
        <h3 class="value-title">Composition Over Integration</h3>
        <p class="value-details">Tools talk over ndjson/stdio wires. They embed, not integrate.</p>
    </div>
    <div class="value">
        <svg class="value-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6a9 9 0 0 0-9 9V3"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/></svg>
        <h3 class="value-title">VCS-Native State</h3>
        <p class="value-details">Durable state lives in versioned history, not a private DB.</p>
    </div>
    <div class="value">
        <svg class="value-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="m10 12.5-2 2.5 2 2.5"/><path d="m14 12.5 2 2.5-2 2.5"/></svg>
        <h3 class="value-title">No Bespoke DSL</h3>
        <p class="value-details">Config is the program, not a YAML pipeline language.</p>
    </div>
    <div class="value">
        <svg class="value-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><path d="m7.5 4.27 9 5.15"/></svg>
        <h3 class="value-title">One Binary, One Daemon, Not a Control Plane</h3>
        <p class="value-details">A single process + a background service on any OS. The market answer is a server fleet + a dashboard.</p>
    </div>
    <div class="value">
        <svg class="value-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11.25 16.25h1.5L12 17z"/><path d="M16 14v.5"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/><path d="M8 14v.5"/><path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/></svg>
        <h3 class="value-title">We Run on Ourselves</h3>
        <p class="value-details">The suite manages its own development. Dogfooding is the test suite.</p>
    </div>
    <div class="value">
        <svg class="value-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
        <h3 class="value-title">Own Your Stack</h3>
        <p class="value-details">Open source, self-hosted. Your AI works for you, not the other way around.</p>
    </div>
    <div class="value">
        <svg class="value-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"/><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"/><path d="M5 21h14"/></svg>
        <h3 class="value-title">Grown, Not Built</h3>
        <p class="value-details">The engine emerges from use; the domain is a preset, not the product.</p>
    </div>
</div>

## The factory

We think of the stack as a factory, not a suite. Each tool is an organism: a small engine with one mechanism and a shipped preset. tamias is the packaging dock: everything installs and updates through its packs; myco the ledger on the floor, kuda the code memory, sturn the wiring, hypha the substrate holding it all, bupha the gate, sepia the shifts, peregrin the foreman working the floor, cuora the safe.

None of them were designed as engines. They became them. Features kept pulling the same way until the mechanism stood alone and the domain was just configuration. That's the method: engines are grown from use, not planned upfront. Every new feature answers "engine or preset?" Organisms stay small, replaceable, and owned.

And the factory is run by the workers it serves: agents are the operators, not the audience. Self-hosted, composable, yours. The <VPLink href="/ecosystem">ecosystem map</VPLink> shows how the layers fit together.

## Tech stack

<div class="stack-grid">
    <div class="stack-item">
        <h3 class="stack-title">Systems &amp; Infra</h3>
        <p class="stack-details"><span class="VPBadge info">Rust</span> <span class="VPBadge info">Git</span> <span class="VPBadge info">Tree-sitter</span></p>
    </div>
    <div class="stack-item">
        <h3 class="stack-title">Web &amp; Apps</h3>
        <p class="stack-details"><span class="VPBadge info">TypeScript</span> <span class="VPBadge info">Vue</span> <span class="VPBadge info">VitePress</span> <span class="VPBadge info">Leptos</span></p>
    </div>
    <div class="stack-item">
        <h3 class="stack-title">AI &amp; Agents</h3>
        <p class="stack-details"><span class="VPBadge info">LLMs</span> <span class="VPBadge info">Gemini</span> <span class="VPBadge info">MCP</span> <span class="VPBadge info">ACP</span></p>
    </div>
    <div class="stack-item">
        <h3 class="stack-title">Platform</h3>
        <p class="stack-details"><span class="VPBadge info">Cloudflare</span> <span class="VPBadge info">Docker</span> <span class="VPBadge info">GitHub</span></p>
    </div>
</div>

## Members

<VPTeamMembers size="small" :members="members.slice(0, 1)" />

<VPTeamMembers size="small" :members="members.slice(1)" />

## Contact

Questions, contributions, or collaboration? See the <VPLink href="/contact">contact page</VPLink>.

<style scoped>
.values-grid {
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr;
}
@media (min-width: 768px) {
    .values-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media (min-width: 1100px) {
    .values-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
.value {
    border-radius: 12px;
    padding: 20px 24px;
    background-color: var(--vp-c-bg-soft);
}
.value-icon {
    display: inline-flex;
    width: 22px;
    height: 22px;
    color: var(--vp-c-brand-1);
}
.value-title {
    margin: 8px 0 0;
    font-size: 15px;
    font-weight: 600;
    line-height: 22px;
}
.value-details {
    margin: 6px 0 0;
    font-size: 13px;
    line-height: 20px;
    color: var(--vp-c-text-2);
}
.stack-grid {
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr;
}
@media (min-width: 768px) {
    .stack-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
.stack-title {
    margin: 0 0 8px;
    font-size: 15px;
    font-weight: 600;
}
.stack-details {
    margin: 0;
    font-size: 13px;
    color: var(--vp-c-text-2);
}
</style>
