---
layout: page
---

<script setup>
import { VPTeamPage, VPTeamPageTitle, VPTeamMembers } from 'vitepress/theme'

const ghPhoto = (id) => id && `https://www.github.com/${id}.png`;

const memberBuilder = (uid, o, i) => i = {
    done: () => o,
    prop: (k, v) => (o = { ...o, [k]: v }) && i,
    propArray: (k, v) => i.prop(k, [ ...(o[k] || []), v]),

    link: (icon, link) => i.propArray("links", { icon, link }),
    social: (social, url, id = uid) => i.link(social, id && `${url}${id}`),
    
    name: (name) => i.prop("name", name),
    title: (title) => i.prop("title", title),
    avatar: (data) => i.prop("avatar", data || ghPhoto(uid)),
    ghAvatar: (id) => i.avatar(ghPhoto(id)),
    twitter: (id) => i.social("twitter", `https://twitter.com/`, id),
    github: (id) => i.social("github", `https://github.com/`, id),
};
const m = (uid, name, title) => memberBuilder(uid).name(name).title(title).avatar();

const members = [
    m("luisfloat", "Luis Float", "Founder | Software Developer").github().twitter().done(),
    m("kruceo", "Kruceo", "Software Developer").github().done(),
    m("vinicenter", "Vini Center", "Software Developer").github().twitter().done(),
];
</script>

<VPTeamPage>
    <VPTeamPageTitle>
        <template #title>Members</template>
        <template #lead>Feel free to contact us!</template>
    </VPTeamPageTitle>
    <VPTeamMembers size="small" :members="members" />
</VPTeamPage>