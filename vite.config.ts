import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import typescript2 from "rollup-plugin-typescript2";
import dts from "vite-plugin-dts";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import {exec} from "node:child_process";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default defineConfig({
  plugins: [
    peerDepsExternal(),
    vue(),
    VueI18nPlugin({}),
    dts({
      insertTypesEntry: true,
    }),
    typescript2({
      check: false,
      include: ["src/components/**/*.vue"],
      tsconfigOverride: {
        compilerOptions: {
          outDir: "dist",
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
      },
      exclude: ["vite.config.ts"],
    }),
    {
      name: "include-global-components-types",
      closeBundle: async () => {
        exec("cat src/global-components.d.ts >> dist/main.d.ts")
        console.log("Components type added")
      },
    },
  ],

  build: {
    cssCodeSplit: true,
    sourcemap: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: "src/main.ts",
      name: "vue3-schema-forms-builder",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `main.${format}.js`,
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/main.ts'),
      },
      external: ['vue'],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'main.css') return 'style.css';
          return assetInfo.name;
        },
        exports: 'named',
        globals: {
          vue: 'Vue'
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
