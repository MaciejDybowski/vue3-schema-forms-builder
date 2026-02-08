import type {StorybookConfig} from "@storybook/vue3-vite"
import {mergeConfig} from "vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: ['./static'],
  addons: [
    'storybook-addon-mock',
    "@storybook/addon-docs"
  ],
  core: {},
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  managerHead: (head: string) => `
    ${head}
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <style>
      /* Target brand image in the sidebar header. Broaden selector to match different markup variants. */
      .sidebar-header a[title] img,
      .sidebar-header a img,
      .sidebar-header img {
        /* Make the image fill the available width and a fixed header height */
        display: block !important;
        width: 100% !important;
        height: 80px !important; /* adjust if you want a different header height */
        max-width: none !important;
        max-height: none !important;
        object-fit: cover !important; /* or 'contain' if you want aspect ratio without cropping */
      }

      /* Center settings button relative to logo */
      .sidebar-header {
        display: flex !important;
        align-items: center !important;
      }

      /*.sidebar-header > button {
        margin-top: 5px !important;
      }*/
    </style>
  `,
  previewHead: (head: string) => `
    ${head}
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  `,
  async viteFinal(config) {
    const isProduction = process.env.STORYBOOK === 'true';
    if (isProduction) {
      config.base = '/vue3-schema-forms-builder/';
    }

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
            target: "https://aureadev.tecna.pl/",
            changeOrigin: true,
            secure: false,
          },
          '/api/assist/form': {
            target: "https://aureadev.tecna.pl/",
            changeOrigin: true,
            secure: false,
          },
        },
      },
    });

  }
}

export default config
