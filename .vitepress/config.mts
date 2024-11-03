import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'NeoGaia Lab',
  description: 'An experimental contained technological environment.',
  srcDir: 'src/',
  outDir: 'dist/',
  appearance: 'dark',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/neogaialab' }
    ],
    footer: {
      copyright: 'NeoGaia Lab',
    },
  },
  vite: {
    plugins: [
      UnoCSS(),
    ],
  }
})
