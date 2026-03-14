import path from 'node:path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'FarmFlow',
        short_name: 'FarmFlow',
        description: 'PWA for Farm Flow App with QR Attendance',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
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
