import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Gaia',
  description: 'Open infrastructure for agent-driven development — and experimental apps that help people learn, understand, and manage.',
  outDir: 'dist/',
  srcExclude: ['projects/*.md'],
  appearance: 'dark',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
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
