import { addons } from "storybook/manager-api"
import { create } from "storybook/theming"

// Determine base path for GitHub Pages deployment
const isGitHubPages = window.location.hostname.includes('github.io');
const basePath = isGitHubPages ? '/vue3-schema-forms-builder' : '';

const customTheme = create({
  base: 'light',
  brandTitle: 'Vue3 Schema Forms Builder',
  brandUrl: 'https://maciejdybowski.github.io/vue3-schema-forms-builder/',
  brandImage: `${basePath}/st-logo2.png`,
  brandTarget: '_self',
})

addons.setConfig({
  theme: customTheme,
  sidebar: {
    showRoots: true,
  },
})
