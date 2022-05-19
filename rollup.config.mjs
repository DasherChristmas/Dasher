import fs from "fs";
import copy from "rollup-plugin-copy";
import typescript from "@rollup/plugin-typescript";
import svelte from "rollup-plugin-svelte";
import autoPreprocess from "svelte-preprocess";
import resolve from "@rollup/plugin-node-resolve";

import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

import { defineConfig } from "rollup";

const pages = fs.readdirSync("./pages").map((page) => ({
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
            preprocess: autoPreprocess({
              postcss: {
                plugins: [tailwind, autoprefixer]
              }
            }),
            include: ["pages/**/*.svelte"]
          }),
          resolve({ browser: true }),
          copy({
            targets: page.copyFiles
          })
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
    plugins: [typescript()]
  },
  {
    input: "process/process.ts",
    output: {
      file: "dist/process.js",
      format: "cjs"
    },
    plugins: [typescript()]
  }
]);
