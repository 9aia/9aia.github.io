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
        <span class="value-icon">🔌</span>
        <h3 class="value-title">Ports Are the Architecture, Not a Plugin API</h3>
        <p class="value-details">Every concern is a trait + impl; the boundaries are the codebase.</p>
    </div>
    <div class="value">
        <span class="value-icon">🤖</span>
        <h3 class="value-title">Machine-First Wire, Not UI-First</h3>
        <p class="value-details">Manifest, schema, serve: surfaces for machines, humans second.</p>
    </div>
    <div class="value">
        <span class="value-icon">🔗</span>
        <h3 class="value-title">Composition Over Integration</h3>
        <p class="value-details">Tools talk over ndjson/stdio wires. They embed, not integrate.</p>
    </div>
    <div class="value">
        <span class="value-icon">🌿</span>
        <h3 class="value-title">VCS-Native State</h3>
        <p class="value-details">Durable state lives in versioned history, not a private DB.</p>
    </div>
    <div class="value">
        <span class="value-icon">📋</span>
        <h3 class="value-title">No Bespoke DSL</h3>
        <p class="value-details">Config is the program, not a YAML pipeline language.</p>
    </div>
    <div class="value">
        <span class="value-icon">📦</span>
        <h3 class="value-title">One Binary, One Daemon, Not a Control Plane</h3>
        <p class="value-details">A single process + a background service on any OS. The market answer is a server fleet + a dashboard.</p>
    </div>
    <div class="value">
        <span class="value-icon">🍽️</span>
        <h3 class="value-title">We Run on Ourselves</h3>
        <p class="value-details">The suite manages its own development. Dogfooding is the test suite.</p>
    </div>
    <div class="value">
        <span class="value-icon">🏠</span>
        <h3 class="value-title">Own Your Stack</h3>
        <p class="value-details">Open source, self-hosted. Your AI works for you, not the other way around.</p>
    </div>
    <div class="value">
        <span class="value-icon">🌱</span>
        <h3 class="value-title">Grown, Not Built</h3>
        <p class="value-details">The engine emerges from use; the domain is a preset, not the product.</p>
    </div>
</div>

## The factory

We think of the stack as a factory, not a suite. Each tool is a machine: a small engine with one mechanism and a shipped preset. tamias is the packaging dock: everything installs and updates through its packs; myco the ledger on the floor, kuda the code memory, sturn the wiring, bupha the gate, sepia the shifts, peregrin the foreman, cuora the safe.

None of them were designed as engines. They became them. Features kept pulling the same way until the mechanism stood alone and the domain was just configuration. That's the method: engines are grown from use, not planned upfront. Every new feature answers "engine or preset?" Machines stay small, replaceable, and owned.

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
    font-size: 22px;
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
