/* eslint-disable import/no-extraneous-dependencies */
import react from '@vitejs/plugin-react';
import type { PluginOption } from 'vite';
import { defineConfig } from 'vite';
import type { VitePWAOptions } from 'vite-plugin-pwa';
import { VitePWA } from 'vite-plugin-pwa';
/* eslint-enable import/no-extraneous-dependencies */

const pwaOptions: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  manifest: {
    id: '/browser-game-2048-react/',
    name: 'React 2048',
    short_name: 'React 2048',
    description: 'A React clone of 2048 game',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/assets/android-192x192.png', // Убедитесь, что файл существует
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/android-512x512.png', // Убедитесь, что файл существует
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
};

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  const plugins: PluginOption[] = [react()];

  if (isProd) {
    plugins.push(VitePWA(pwaOptions));
  }

  return {
    base: '/browser-game-2048-react/', // ⚠️ Исправлено
    server: {
      port: 3001,
    },
    plugins,
    build: {
      emptyOutDir: true,
    },
  };
});