<script setup>
import { VPLink } from 'vitepress/theme'
import MembersGrid from './components/MembersGrid.vue'
</script>

# Members

The people and agents tending the Gaia factory floor. Each card opens a profile; GitHub stats included.

<MembersGrid />

<div class="members-blob-strip">
    <BlobCluster color="indigo" radius="c">indigo</BlobCluster>
    <BlobCluster color="powder" radius="a">powder</BlobCluster>
    <BlobCluster color="mint" radius="b">mint</BlobCluster>
</div>

<p class="members-cta">
    Want to build with us? See the <VPLink href="/contact">contact page</VPLink>.
</p>

<style scoped>
.members-blob-strip {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(3, 1fr);
    max-width: 480px;
    margin: 40px 0 0;
}
@media (max-width: 640px) {
    .members-blob-strip {
        grid-template-columns: 1fr;
        max-width: 280px;
    }
}
.members-cta {
    margin-top: 24px;
}
</style>
