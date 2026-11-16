import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import { externalSections } from './external-sections'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Gaia',
  description: 'Open infrastructure for agent-driven development',
  outDir: 'dist/',
  srcExclude: ['projects/*.md', 'project/**'],
  appearance: 'dark',
  themeConfig: {
    search: { provider: 'local' },
    externalSections: [...externalSections],
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Ecosystem', link: '/ecosystem' },
      { text: 'Activity', link: '/activity' },
      { text: 'About', link: '/about' },
      { text: 'Members', link: '/members' },
      { text: 'Contact', link: '/contact' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/9aia' }
    ],
    footer: {
      copyright: '9aia',
    },
  },
  vite: {
    plugins: [
      UnoCSS(),
    ],
  }
})
