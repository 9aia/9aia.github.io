import 'virtual:uno.css'
import Theme from 'vitepress-theme-9aia'
import './site.css'

// vitepress-theme-9aia installs its external-section link guard at
// module scope — ahead of VitePress's capture-phase router listener —
// so /<project>/ links do real server-side navigations.
export default Theme
