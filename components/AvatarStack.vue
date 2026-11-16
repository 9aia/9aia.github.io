<script setup>
import { members } from '../.vitepress/theme/members.ts'
</script>

<template>
    <a href="/members" class="avatar-stack" aria-label="Meet the team">
        <img
            v-for="m in members"
            :key="m.name"
            class="avatar-stack-img"
            :src="m.avatar"
            :alt="m.name"
            width="36"
            height="36"
            loading="lazy"
        />
    </a>
</template>

<style scoped>
.avatar-stack {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
}
.avatar-stack-img {
    width: 36px;
    height: 36px;
    margin-left: -10px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--vp-c-bg);
    transition: transform 0.15s ease;
}
.avatar-stack-img:first-child {
    margin-left: 0;
}
.avatar-stack:hover .avatar-stack-img,
.avatar-stack:focus-visible .avatar-stack-img {
    transform: translateY(-3px);
}
.avatar-stack-img:hover {
    transform: translateY(-3px) scale(1.08);
    position: relative;
    z-index: 1;
}
.avatar-stack:focus-visible {
    outline: none;
    border-radius: 999px;
}
.avatar-stack:focus-visible .avatar-stack-img:first-child {
    box-shadow: 0 0 0 2px var(--vp-c-brand-1);
}
</style>
