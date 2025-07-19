import { sveltekit } from '@sveltejs/kit/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  plugins: [
    sveltekit(),
    viteStaticCopy({
        targets: [
            {
                src: 'node_modules/vim-wasm/vim.wasm',
                dest: 'vim-scripts',
            },
            {
                src: 'node_modules/vim-wasm/vim.js',
                dest: 'vim-scripts',
            },
            {
                src: 'node_modules/vim-wasm/vim.data',
                dest: 'vim-scripts',
            },
        ],
    }),
  ]
});
