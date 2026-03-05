import path from 'node:path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: 'localhost',
  },
  base: process.env.BASE_URL,
  define: {
    NPM_PACKAGE_NAME: JSON.stringify(process.env.npm_package_name),
    NPM_PACKAGE_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  resolve: {
    alias: [
      {
        find: '@app',
        replacement: path.resolve(__dirname, 'src'),
      },
      {
        find: '@app/config',
        replacement: path.resolve(__dirname, 'src/config'),
      },
      {
        find: '@app/shared',
        replacement: path.resolve(__dirname, 'src/shared'),
      },
      {
        find: '@app/feature',
        replacement: path.resolve(__dirname, 'src/feature'),
      },
      {
        find: '@app/page',
        replacement: path.resolve(__dirname, 'src/page'),
      },
    ],
  },
});
