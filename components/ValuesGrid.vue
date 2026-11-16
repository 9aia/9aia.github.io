<script setup>
const values = [
    {
        title: 'Ports Are the Architecture, Not a Plugin API',
        details: 'Every concern is a trait + impl; the boundaries are the codebase.',
        icon: '<path d="M12 22v-5"/><path d="M15 8V2"/><path d="M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z"/><path d="M9 8V2"/>',
    },
    {
        title: 'Machine-First Wire, Not UI-First',
        details: 'Manifest, schema, serve: surfaces for machines, humans second.',
        icon: '<rect width="16" height="12" x="4" y="8" rx="2"/><path d="M12 8V4H8"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
    },
    {
        title: 'Composition Over Integration',
        details: 'Tools talk over ndjson/stdio wires. They embed, not integrate.',
        icon: '<path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"/><rect width="8" height="8" x="14" y="2" rx="1"/>',
    },
    {
        title: 'VCS-Native State',
        details: 'Durable state lives in versioned history, not a private DB.',
        icon: '<path d="M15 6a9 9 0 0 0-9 9V3"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/>',
    },
    {
        title: 'No Bespoke DSL',
        details: 'Config is the program, not a YAML pipeline language.',
        icon: '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="m10 12.5-2 2.5 2 2.5"/><path d="m14 12.5 2 2.5-2 2.5"/>',
    },
    {
        title: 'One Binary, One Daemon, Not a Control Plane',
        details: 'A single process + a background service on any OS. The market answer is a server fleet + a dashboard.',
        icon: '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><path d="m7.5 4.27 9 5.15"/>',
    },
    {
        title: 'We Run on Ourselves',
        details: 'The suite manages its own development. Dogfooding is the test suite.',
        icon: '<path d="M11.25 16.25h1.5L12 17z"/><path d="M16 14v.5"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309"/><path d="M8 14v.5"/><path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"/>',
    },
    {
        title: 'Own Your Stack',
        details: 'Open source, self-hosted. Your AI works for you, not the other way around.',
        icon: '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    },
    {
        title: 'Grown, Not Built',
        details: 'The engine emerges from use; the domain is a preset, not the product.',
        icon: '<path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"/><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"/><path d="M5 21h14"/>',
    },
]
</script>

<template>
    <div class="values-grid">
        <div v-for="v in values" :key="v.title" class="value">
            <svg class="value-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="v.icon" />
            <h3 class="value-title">{{ v.title }}</h3>
            <p class="value-details">{{ v.details }}</p>
        </div>
    </div>
</template>

<style scoped>
.values-grid {
    display: grid;
    gap: 20px;
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
    border-radius: var(--radius-blob-a);
    padding: 20px 24px;
    background-color: var(--vp-c-bg-soft);
}
.values-grid .value:nth-child(3n + 2) {
    border-radius: var(--radius-blob-b);
}
.values-grid .value:nth-child(3n) {
    border-radius: var(--radius-blob-c);
}
.value-icon {
    display: inline-flex;
    width: 22px;
    height: 22px;
    color: var(--vp-c-brand-1);
}
.value-icon :deep(path),
.value-icon :deep(rect),
.value-icon :deep(circle) {
    vector-effect: non-scaling-stroke;
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
</style>
