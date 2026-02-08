import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import dts from "vite-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { readFile } from "fs/promises";

export default defineConfig({
  plugins: [
    // ✅ automatycznie oznacza peerDependencies jako external
    peerDepsExternal(),
    // ✅ obsługa plików .vue
    vue(),
    // ✅ generowanie typów
    dts({
      entryRoot: "src",
      outputDir: "dist",
      insertTypesEntry: true,
      include: ["src/**/*.ts", "src/**/*.vue", "src/**/*.d.ts"],
      beforeWriteFile: async (filePath, content) => {
        // automatycznie dokleja typy globalnych komponentów
        if (filePath.endsWith("main.d.ts")) {
          try {
            const global = await readFile("src/global-components.d.ts", "utf-8");
            return { filePath, content: content + "\n" + global };
          } catch {
            return { filePath, content };
          }
        }
        return { filePath, content };
      },
    }),
  ],

  define: {
    "process.env": {},
  },

  build: {
    cssCodeSplit: true,
    sourcemap: true,

    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "Vue3SchemaFormsBuilder",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `main.${format}.js`,
    },

    rollupOptions: {
      external: ["vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
        assetFileNames: (assetInfo) =>
          assetInfo.name === "main.css" ? "style.css" : assetInfo.name,
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
