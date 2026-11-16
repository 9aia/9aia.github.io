<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { VPLink } from 'vitepress/theme'
import AvatarStack from './AvatarStack.vue'

const { frontmatter } = useData()
const year = new Date().getFullYear()

// Rendered as a sibling after the theme Layout — skip raw-content
// pages (layout: false) and pages that opt out via `footer: false`,
// mirroring the default VPFooter's conditions.
const visible = computed(
    () => frontmatter.value.layout !== false && frontmatter.value.footer !== false,
)
</script>

<template>
    <footer v-if="visible" class="site-footer">
        <div class="site-footer-inner">
            <div class="footer-brand">
                <p class="footer-wordmark">Gaia</p>
                <p class="footer-tagline">
                    Open infrastructure for agent-driven development
                </p>
                <p class="footer-team">
                    <AvatarStack />
                    <VPLink href="/members">Meet the team →</VPLink>
                </p>
            </div>

            <nav class="footer-col" aria-label="Explore">
                <p class="footer-col-title">Explore</p>
                <VPLink href="/ecosystem">Ecosystem</VPLink>
                <VPLink href="/activity">Activity</VPLink>
                <VPLink href="/about">About</VPLink>
            </nav>

            <nav class="footer-col" aria-label="Community">
                <p class="footer-col-title">Community</p>
                <VPLink href="/members">Members</VPLink>
                <VPLink href="/contact">Contact</VPLink>
            </nav>

            <nav class="footer-col" aria-label="GitHub">
                <p class="footer-col-title">GitHub</p>
                <a href="https://github.com/9aia" target="_blank" rel="noopener">9aia org</a>
                <a href="https://github.com/orgs/9aia/repositories" target="_blank" rel="noopener">Repositories</a>
            </nav>
        </div>

        <p class="footer-copyright">© {{ year }} Gaia: one superorganism, many organisms.</p>
    </footer>
</template>

<style scoped>
.site-footer {
    border-top: 1px solid var(--vp-c-gutter);
    background: var(--vp-c-bg);
    padding: 48px 24px 32px;
}

@media (min-width: 768px) {
    .site-footer {
        padding: 56px 32px 36px;
    }
}

.site-footer-inner {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;
    max-width: var(--vp-layout-max-width);
    margin: 0 auto;
    padding: 32px;
    border-radius: var(--radius-blob-b);
    background: var(--vp-c-bg-soft);
}

@media (min-width: 768px) {
    .site-footer-inner {
        grid-template-columns: 1.6fr 1fr 1fr 1fr;
        gap: 40px;
        padding: 40px;
    }
}

.footer-brand {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
}

.footer-wordmark {
    margin: 0;
    font-size: 26px;
    font-weight: 700;
    letter-spacing: -0.5px;
    color: var(--vp-c-text-1);
}

.footer-tagline {
    margin: 0;
    max-width: 300px;
    font-size: 14px;
    line-height: 22px;
    color: var(--vp-c-text-2);
}

.footer-team {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px 14px;
    margin: 6px 0 0;
    font-size: 13px;
}

.footer-team a {
    color: var(--vp-c-brand-1);
    font-weight: 600;
    text-decoration: none;
}

.footer-team a:hover {
    text-decoration: underline;
}

.footer-col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
}

.footer-col-title {
    margin: 0 0 4px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: var(--vp-c-text-3);
}

.footer-col a {
    font-size: 14px;
    color: var(--vp-c-text-2);
    text-decoration: none;
    transition: color 0.15s ease;
}

.footer-col a:hover {
    color: var(--vp-c-brand-1);
}

.footer-copyright {
    max-width: var(--vp-layout-max-width);
    margin: 28px auto 0;
    padding-top: 20px;
    border-top: 1px solid var(--vp-c-gutter);
    font-size: 13px;
    color: var(--vp-c-text-3);
}
</style>
