import{V as i,a as o}from"./chunks/theme.CxxxJoKj.js";import{_ as c,o as p,c as r,E as s,w as a,k as n,a as t,j as l}from"./chunks/framework.Dcbl3eEm.js";/* empty css                                                                           */const P=JSON.parse('{"title":"","description":"","frontmatter":{"layout":"page"},"headers":[],"relativePath":"about.md","filePath":"about.md"}'),d={name:"about.md"},u=Object.assign(d,{setup(m){return(h,e)=>(p(),r("div",null,[s(n(o),null,{default:a(()=>[s(n(i),null,{title:a(()=>[...e[0]||(e[0]=[t("About GAIA",-1)])]),lead:a(()=>[...e[1]||(e[1]=[t(" Open infrastructure for agent-driven development — a small group of developers building minimal, open-source engines that people and agents can own. ",-1)])]),_:1}),e[2]||(e[2]=l("pre",null,[l("code",null,`<PageSection>
    <template #title>What we believe</template>
    <template #default>
        <p class="mb-6">
            Coding agents are here to stay — the question is who owns the
            infrastructure they run on. We think the answer should be you:
            open source, self-hosted, composable, yours. Not a SaaS control
            plane, not a DSL, not a server fleet you rent back.
        </p>
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
                <h3 class="value-title">One Binary, One Daemon — Not a Control Plane</h3>
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
    </template>
</PageSection>

<PageSection>
    <template #title>The Factory</template>
    <template #default>
        <p class="mb-4">
            We think of the stack as a factory, not a suite. Each tool is a machine: a small
            engine with one mechanism and a shipped preset. tamias is the packaging dock —
            everything installs and updates through its packs — myco the ledger on the
            floor, kuda the code memory, sturn the wiring, bupha the gate, sepia the
            shifts, peregrin the foreman, cuora the safe.
        </p>
        <p class="mb-4">
            None of them were designed as engines. They became them. Features kept pulling the
            same way until the mechanism stood alone and the domain was just configuration.
            That's the method: engines are grown from use, not planned upfront. Every new
            feature answers "engine or preset?" Machines stay small, replaceable, and owned.
        </p>
        <p>
            And the factory is run by the workers it serves: agents are the operators, not the
            audience. Self-hosted, composable, yours. The
            <VPLink href="/ecosystem">ecosystem map</VPLink> shows how the layers fit together.
        </p>
    </template>
</PageSection>

<PageSection>
    <template #title>Tech stack</template>
    <template #default>
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
    </template>
</PageSection>

<PageSection>
    <template #title>Members</template>
    <template #default>
        <VPTeamMembers size='small' :members='members.slice(0, 1)' />
        <div class="mb-6" />
        <VPTeamMembers size='small' :members='members.slice(1)' />
    </template>
</PageSection>

<PageSection>
    <template #title>Contact</template>
    <template #default>
        <p>
            Questions, contributions, or collaboration — see the
            <VPLink href="/contact">contact page</VPLink>.
        </p>
    </template>
</PageSection>
`)],-1))]),_:1})]))}}),k=c(u,[["__scopeId","data-v-f4039ff5"]]);export{P as __pageData,k as default};
