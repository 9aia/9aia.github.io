<script setup>
// Reusable pager: nav with prev/next + compact numbered window.
// Usage: <Pagination :page="page" :total-pages="totalPages" :pages="pageList" @select="page = $event" />
const props = defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  pages: { type: Array, required: true }, // visible page numbers, ascending
})
const emit = defineEmits(['select'])
</script>

<template>
  <nav v-if="totalPages > 1" class="pager" aria-label="Pagination">
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
  border: 1px solid var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 13px;
  cursor: pointer;
}
.page-btn:hover:not(:disabled) {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}
.page-btn.active {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-weight: 600;
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
