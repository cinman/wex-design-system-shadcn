import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { tokensCSSPlugin } from './vite-plugins/tokens-css'

// https://vite.dev/config/
export default defineConfig({
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
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@wex/design-tokens/tailwind-preset": path.resolve(__dirname, "./packages/design-tokens/tailwind-preset.js"),
      "@wex/components": path.resolve(__dirname, "./packages/wex-components/src/index.ts"),
      "@wex/components/*": path.resolve(__dirname, "./packages/wex-components/src/*"),
    },
  },
})
