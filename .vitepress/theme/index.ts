import { defineComponent, h } from 'vue'
import 'virtual:uno.css'
import Theme from 'vitepress-theme-9aia'
import SiteFooter from '../../components/SiteFooter.vue'
import './site.css'

// vitepress-theme-9aia installs its external-section link guard at
// module scope — ahead of VitePress's capture-phase router listener —
// so /<project>/ links do real server-side navigations.
//
// The theme's Layout only forwards the `home-hero-before` slot, so the
// rich site footer can't ride a Layout slot. Render it as a sibling
// after the whole Layout instead — normal flow, full-width band below
// the content column.
const BaseLayout = Theme.Layout
const Layout = defineComponent({
    name: 'GaiaLayout',
    setup() {
        return () => [h(BaseLayout), h(SiteFooter)]
    },
})

export default { ...Theme, Layout }
