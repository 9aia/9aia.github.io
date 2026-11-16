<script setup>
// Reusable pager: nav with prev/next + compact numbered window.
// Button mode (default): emits 'select' — client-side pagination.
// Link mode (basePath set): renders real <a href> routes — crawlable/SEO.
//   <Pagination :page="1" :total-pages="4" :pages="[1,2,3,4]" base-path="/activity" />
//   page 1 → /activity, page N → /activity/N
const props = defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  pages: { type: Array, required: true }, // visible page numbers, ascending
  basePath: { type: String, default: '' },
})
const emit = defineEmits(['select'])

function href(p) {
  return p === 1 ? props.basePath : `${props.basePath}/${p}`
}
</script>

<template>
  <nav v-if="totalPages > 1" class="pager" aria-label="Pagination">
    <template v-if="basePath">
      <a
        v-if="page > 1"
        class="page-btn"
        :href="href(page - 1)"
        aria-label="Previous page"
      >‹ Prev</a>
      <span v-else class="page-btn disabled" aria-disabled="true">‹ Prev</span>
      <template v-for="(p, idx) in pages" :key="p">
        <span v-if="idx > 0 && p - pages[idx - 1] > 1" class="page-gap" aria-hidden="true">…</span>
        <a
          class="page-btn"
          :class="{ active: p === page }"
          :href="href(p)"
          :aria-label="`Page ${p}`"
          :aria-current="p === page ? 'page' : undefined"
        >{{ p }}</a>
      </template>
      <a
        v-if="page < totalPages"
        class="page-btn"
        :href="href(page + 1)"
        aria-label="Next page"
      >Next ›</a>
      <span v-else class="page-btn disabled" aria-disabled="true">Next ›</span>
    </template>
    <template v-else>
      <button
        class="page-btn"
        :disabled="page === 1"
        aria-label="Previous page"
        @click="emit('select', page - 1)"
      >‹ Prev</button>
      <template v-for="(p, idx) in pages" :key="p">
        <span v-if="idx > 0 && p - pages[idx - 1] > 1" class="page-gap" aria-hidden="true">…</span>
        <button
          class="page-btn"
          :class="{ active: p === page }"
          :aria-label="`Page ${p}`"
          :aria-current="p === page ? 'page' : undefined"
          @click="emit('select', p)"
        >{{ p }}</button>
      </template>
      <button
        class="page-btn"
        :disabled="page === totalPages"
        aria-label="Next page"
        @click="emit('select', page + 1)"
      >Next ›</button>
    </template>
  </nav>
</template>

<style scoped>
.pager {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 20px;
}
.page-btn {
  min-width: 32px;
  padding: 4px 10px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 13px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}
.page-btn:hover:not(.disabled) {
  color: var(--vp-c-brand-1);
}
.page-btn.active {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.page-btn.disabled {
  opacity: 0.4;
  cursor: default;
}
.page-btn:disabled {
  opacity: 0.4;
  cursor: default;
}
.page-gap {
  color: var(--vp-c-text-3);
  padding: 0 2px;
}
</style>
