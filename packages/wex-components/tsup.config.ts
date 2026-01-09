import { defineConfig } from 'tsup';
import path from 'path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom', 'tailwindcss'],
  treeshake: true,
  minify: false,
  esbuildOptions(options) {
    options.jsx = 'automatic';
    // Resolve @wex/components to source files during build to avoid circular dependency
    options.alias = {
      '@wex/components': path.resolve(__dirname, './src/index.ts'),
    };
  },
});

