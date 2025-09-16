import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'external-resources',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
        ],
      },
      manifest: {
        name: '贪吃蛇游戏',
        short_name: '贪吃蛇',
        description: '经典贪吃蛇游戏在线玩 - 免费HTML5游戏，支持方向键和WASD控制，具有实时分数系统、游戏难度调整功能和排行榜。',
        start_url: '/',
        display: 'standalone',
        background_color: '#1a1a1a',
        theme_color: '#3b82f6',
        icons: [
          {
            src: '/favicon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any'
          },
          {
            src: '/favicon.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'maskable'
          }
        ],
        lang: 'zh-CN',
        categories: ['game', 'entertainment']
      },
    }),
  ],
})
