<script setup>
import { VPLink } from 'vitepress/theme'
import ValuesGrid from './components/ValuesGrid.vue'
import AvatarStack from './components/AvatarStack.vue'
import MembersGrid from './components/MembersGrid.vue'
import { members } from '.vitepress/theme/members.ts'

const emidio = members.find((m) => m.title === 'Founder')
</script>

# About

Open infrastructure for agent-driven development: a small group of developers building minimal, open-source engines that people and agents can own.

## What we believe

Coding agents are here to stay. The question is who owns the infrastructure they run on. We think the answer should be you: open source, self-hosted, composable, yours. Not a SaaS control plane, not a DSL, not a server fleet you rent back.

<ValuesGrid />

## The factory

We think of the stack as a factory, not a suite. Each tool is an organism: a small engine with one mechanism and a shipped preset. tamias is the packaging dock: everything installs and updates through its packs; myco the ledger on the floor, kuda the code memory, sturn the wiring, hypha the substrate holding it all, bupha the gate, sepia the shifts, peregrin the foreman working the floor, cuora the safe.

None of them were designed as engines. They became them. Features kept pulling the same way until the mechanism stood alone and the domain was just configuration. That's the method: engines are grown from use, not planned upfront. Every new feature answers "engine or preset?" Organisms stay small, replaceable, and owned.

And the factory is run by the workers it serves: agents are the operators, not the audience. Self-hosted, composable, yours. The <VPLink href="/ecosystem">ecosystem map</VPLink> shows how the layers fit together.

<div class="blob-strip">
    <BlobCluster color="indigo" radius="c">indigo</BlobCluster>
    <BlobCluster color="powder" radius="a">powder</BlobCluster>
    <BlobCluster color="mint" radius="b">mint</BlobCluster>
</div>

## Tech stack

<div class="stack-grid">
    <div class="stack-item">
        <h3 class="stack-title">Systems &amp; Infra</h3>
        <p class="stack-details"><span class="VPBadge info">Rust</span> <span class="VPBadge info">Git</span> <span class="VPBadge info">SQLite</span> <span class="VPBadge info">Tree-sitter</span> <span class="VPBadge info">Ratatui</span></p>
    </div>
    <div class="stack-item">
        <h3 class="stack-title">Web &amp; Apps</h3>
        <p class="stack-details"><span class="VPBadge info">TypeScript</span> <span class="VPBadge info">Vue</span> <span class="VPBadge info">Nuxt</span> <span class="VPBadge info">VitePress</span> <span class="VPBadge info">Bun</span></p>
    </div>
    <div class="stack-item">
        <h3 class="stack-title">AI &amp; Agents</h3>
        <p class="stack-details"><span class="VPBadge info">LLMs</span> <span class="VPBadge info">MCP</span> <span class="VPBadge info">ACP</span></p>
    </div>
    <div class="stack-item">
        <h3 class="stack-title">Platform</h3>
        <p class="stack-details"><span class="VPBadge info">GitHub</span> <span class="VPBadge info">Cloudflare</span> <span class="VPBadge info">Docker</span></p>
    </div>
</div>

## Leadership

<div class="leadership">
    <MembersGrid :items="emidio ? [emidio] : []" />
    <p class="members-teaser">
        <AvatarStack />
        <VPLink href="/members">Full profiles and live GitHub stats →</VPLink>
    </p>
</div>

## Contact

Questions, contributions, or collaboration? See the <VPLink href="/contact">contact page</VPLink>.

<style scoped>
.blob-strip {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(3, 1fr);
    max-width: 480px;
    margin: 32px 0 0;
}
@media (max-width: 640px) {
    .blob-strip {
        grid-template-columns: 1fr;
        max-width: 280px;
    }
}
.stack-grid {
    display: grid;
    gap: 20px;
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
.leadership {
    max-width: 720px;
}
.members-teaser {
    display: flex;
    align-items: center;
    gap: 16px;
    margin: 16px 0 0;
}
</style>
