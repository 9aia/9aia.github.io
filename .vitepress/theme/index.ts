// https://vitepress.dev/guide/custom-theme
import { defineComponent, h, onMounted, ref, Teleport } from 'vue'
import type { Theme } from 'vitepress'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import MetaBlobs from './MetaBlobs.vue'
import './style.css'
import 'virtual:uno.css'

// Mounts the metaball canvas inside `.VPHero` on `layout: home` pages.
// Teleport is gated on `mounted` so the `.VPHero` target exists in the
// DOM (children mount before this component's mounted hook) and nothing
// is emitted during SSR.
const Layout = defineComponent({
  name: 'GaiaLayout',
  setup() {
    const { frontmatter } = useData()
    const mounted = ref(false)
    onMounted(() => {
      mounted.value = true
    })
    return () =>
      h(DefaultTheme.Layout, null, {
        'home-hero-before': () =>
          mounted.value &&
          frontmatter.value.layout === 'home' &&
          frontmatter.value.hero
            ? h(Teleport, { to: '.VPHero' }, () => h(MetaBlobs))
            : null,
      })
  }
})

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
} satisfies Theme
