import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Gaia',
  description: 'An experimental contained technological environment.',
  outDir: 'dist/',
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
