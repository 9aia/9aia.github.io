---
layout: page
---

<script setup>
import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from 'vitepress/theme'

function member(name, title, username, avatar, items) {
    const links = (username, items) => {
        const data = [];
        const link = (icon, link) => ({ icon, link });

        if(items?.gh !== null) data.push(link("github", `https://github.com/${items?.gh || username}`));
        if(items?.tt !== null) data.push(link("twitter", `https://twitter.com/${items?.tt || username}`));

        return data;
    };

    return {
        name,
        title,
        avatar: avatar || `https://www.github.com/${username}.png`,
        links: links(username, items),
    };
}

const members = [
    member("Luis Float", "Founder | Software Developer", "luisfloat", undefined),
    member("Kruceo", "Software Developer", "kruceo", undefined, { tt: null }),
    member("Vini Center", "Software Developer", "vinicenter"),
]
</script>

<VPTeamPage>
    <VPTeamPageTitle>
        <template #title>Members</template>
        <template #lead>Feel free to contact us!</template>
    </VPTeamPageTitle>
    <VPTeamMembers size="small" :members="members" />
</VPTeamPage>