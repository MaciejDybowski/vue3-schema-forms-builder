import type {StorybookConfig} from "@storybook/vue3-vite"
import {mergeConfig} from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    'storybook-addon-mock',
    "@storybook/addon-mdx-gfm",
    "@chromatic-com/storybook"
  ],
  core: {},
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {},
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      define: {
        "process.env": {},
      },
      // Add dependencies to pre-optimization
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
      server: {
        proxy: {
          '/auth': {
            target: "https://dev-bm.int.tecna.pl/",
            changeOrigin: true,
            secure: false,
          },
          '/api': {
            target: "https://dev-bm.int.tecna.pl/",
            changeOrigin: true,
            secure: false,
          },
        },
      },
    });

  }
}

export default config
