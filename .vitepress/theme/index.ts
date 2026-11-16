import 'virtual:uno.css'
import { installSectionLinkGuard } from './section-links'
import { externalSections } from '../external-sections'

// Installed at module evaluation — before VitePress creates its router —
// so this capture-phase guard is registered ahead of the router's own
// capture-phase click interceptor (see section-links.ts for why the
// theme's built-in guard can't do this job on VitePress 1.6).
installSectionLinkGuard({
  base: () => '/',
  sections: () => externalSections,
})

export { default } from 'vitepress-theme-9aia'
