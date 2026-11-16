<script setup>
import { VPLink } from 'vitepress/theme'
import AvatarStack from './components/AvatarStack.vue'
</script>

# Contact

<div class="contact-hero">
    <div class="contact-hero-text">
        <p>Gaia is open source and self-hosted — every organism in the stack is yours to run, fork, and tend. Signals reach us where the work happens: pick a channel below.</p>
    </div>
    <div class="contact-hero-blobs">
        <BlobCluster class="hero-blob hero-blob--back" color="indigo" radius="c" :count="10" />
        <BlobCluster class="hero-blob hero-blob--front" color="powder" radius="a" :count="10" />
    </div>
</div>

## Channels

<div class="contact-grid">
    <div class="channel">
        <BlobCluster class="channel-blob" color="powder" radius="b" :count="10" />
        <h3 class="channel-title">General inquiries</h3>
        <p>Questions, collaboration, or just want to see the factory floor? Email Luis at <VPLink href="mailto:luisfuturist+9aia@gmail.com">luisfuturist+9aia@gmail.com</VPLink>.</p>
    </div>
    <div class="channel">
        <BlobCluster class="channel-blob" color="mint" radius="a" :count="10" />
        <h3 class="channel-title">Contributing</h3>
        <p>Every project lives on GitHub under the <VPLink href="https://github.com/9aia">9aia org</VPLink>. The org does not run public issue or pull request queues; reach out directly (see General inquiries) before sending changes.</p>
    </div>
    <div class="channel">
        <BlobCluster class="channel-blob" color="blush" radius="c" :count="10" />
        <h3 class="channel-title">Security</h3>
        <p>Found a vulnerability? Contact us privately first, before disclosing anywhere (see General inquiries). Do not publish details publicly.</p>
    </div>
</div>

## The team

<p class="team-lead">Four developers keep the factory running — the humans behind the organisms.</p>
<p class="team-row">
    <AvatarStack />
    <VPLink href="/members">Meet the team →</VPLink>
</p>

<style scoped>
.contact-hero {
    display: grid;
    gap: 32px;
    grid-template-columns: 1fr;
    align-items: center;
    margin: 24px 0 40px;
}
@media (min-width: 768px) {
    .contact-hero {
        grid-template-columns: 1.4fr 1fr;
    }
}
.contact-hero .contact-hero-text p {
    margin: 0;
    max-width: 560px;
    line-height: 28px;
    font-size: 17px;
    color: var(--vp-c-text-2);
}
.contact-hero-blobs {
    position: relative;
    max-width: 220px;
    margin: 0 auto;
}
.hero-blob {
    position: absolute;
    inset: 0;
}
.hero-blob--front {
    position: relative;
    transform: translate(14%, 12%);
    box-shadow: 0 12px 32px rgb(20 20 60 / 0.14);
}
.contact-grid {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
}
@media (min-width: 768px) {
    .contact-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
.channel {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-height: 250px;
    border-radius: var(--radius-blob-a);
    padding: 32px;
    background-color: var(--vp-c-bg-soft);
}
.contact-grid .channel:nth-child(2) {
    border-radius: var(--radius-blob-b);
}
.contact-grid .channel:nth-child(3) {
    border-radius: var(--radius-blob-c);
}
.contact-grid .channel .channel-blob {
    width: 104px;
    margin-bottom: 20px;
}
.contact-grid .channel .channel-title {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: 700;
}
.contact-grid .channel p {
    margin: 0;
    font-size: 14px;
    line-height: 22px;
    color: var(--vp-c-text-2);
}
.team-lead {
    margin: 0 0 16px;
    max-width: 560px;
    color: var(--vp-c-text-2);
}
.team-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 0;
}
</style>
