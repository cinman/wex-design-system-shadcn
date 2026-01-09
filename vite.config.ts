import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { tokensCSSPlugin } from './vite-plugins/tokens-css'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [
    react(),
    tokensCSSPlugin(), // Generate CSS from JSON at build time
  ],
  server: {
    port: 5174,
    strictPort: true, // Fail if port is already in use
    watch: {
      // Explicitly watch packages directory for HMR
      ignored: ['!**/packages/**'],
    },
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      { find: "@wex/design-tokens/tailwind-preset", replacement: path.resolve(__dirname, "./packages/design-tokens/tailwind-preset.js") },
      { find: /^@wex\/components$/, replacement: path.resolve(__dirname, "./packages/wex-components/src/index.ts") },
      { find: /^@wex\/components\/(.*)$/, replacement: path.resolve(__dirname, "./packages/wex-components/src/$1") },
    ],
  },
})
