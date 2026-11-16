---
layout: page
---

<script setup>
import { VPTeamPage, VPTeamPageTitle, VPLink } from 'vitepress/theme'
import PageSection from './components/PageSection.vue'
</script>

<VPTeamPage>
    <VPTeamPageTitle>
        <template #title>Contact</template>
        <template #lead>
            GAIA is open source and self-hosted. Reach us where the work happens.
        </template>
    </VPTeamPageTitle>

<PageSection>
        <template #title>General inquiries</template>
        <template #default>
            <p class="mb-4">
                Questions, collaboration, or just want to see the factory floor?
                Email Luis at
                <VPLink href="mailto:luisfuturist+9aia@gmail.com">luisfuturist+9aia@gmail.com</VPLink>.
            </p>
        </template>
</PageSection>

<PageSection>
        <template #title>Contributing</template>
        <template #default>
            <p class="mb-4">
                Every project lives on GitHub under the
                <VPLink href="https://github.com/9aia">9aia org</VPLink>.
                Issues and pull requests are the front door. Each repo's
                <code>CONTRIBUTING.md</code> covers the local workflow.
            </p>
        </template>
</PageSection>

<PageSection>
        <template #title>Security</template>
        <template #default>
            <p>
                Found a vulnerability? Please report it privately per each
                repo's <code>SECURITY.md</code>. Do not open a public issue.
            </p>
        </template>
</PageSection>
</VPTeamPage>
