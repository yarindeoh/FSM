/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import mockDevServerPlugin from 'vite-plugin-mock-dev-server'

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/pipeline',
  plugins: [react(), nxViteTsPaths(), mockDevServerPlugin()],
  server: {
    port: 4200,
    host: 'localhost',
    proxy: {
      '^/api': { target: '' }
    }
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  base: '/FSM/',
  build: {
    outDir: '../../dist/apps/pipeline',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
