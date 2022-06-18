import fs from "fs";
import copy from "rollup-plugin-copy";
import typescript from "@rollup/plugin-typescript";
import svelte from "rollup-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import css from "rollup-plugin-css-only";

import { defineConfig } from "rollup";

const production = !process.env.ROLLUP_WATCH;

const pages = fs.readdirSync("./pages").map((page) => ({
  path: `pages/${page}`,
  page: `page_${page}`,
  renderer: `pages/${page}/renderer.ts`,
  rendererOutput: `dist/pages/${page}/renderer.js`,
  copyFiles: [
    {
      src: `pages/${page}/index.html`,
      dest: `dist/pages/${page}`
    },
    {
      src: `pages/${page}/static`,
      dest: `dist/pages/${page}/static`
    }
  ]
}));

export default defineConfig([
  ...pages.map(
    /**
     *
     * @returns {import("rollup").RollupOptions}
     */
    (page) => {
      return {
        input: page.renderer,
        output: {
          file: page.rendererOutput,
          format: "iife",
          name: page.page
        },
        plugins: [
          typescript(),
          svelte({
            preprocess: sveltePreprocess({
              postcss: true
            }),
            compilerOptions: {
              dev: !production
            }
          }),
          css({
            output: `style.css`
          }),
          resolve({ browser: true }),
          copy({
            targets: page.copyFiles
          }),
          production && terser()
        ]
      };
    }
  ),
  {
    input: "preload/preload.ts",
    output: {
      file: "dist/preload.js",
      format: "cjs"
    },
    plugins: [typescript()],
    watch: {}
  },
  {
    input: "process/process.ts",
    output: {
      file: "dist/process.js",
      format: "cjs"
    },
    plugins: [typescript()],
    watch: {}
  }
]);
