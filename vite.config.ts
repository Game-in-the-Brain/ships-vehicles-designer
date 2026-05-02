import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      workbox: { globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'] },
      manifest: {
        name: 'Mneme Vehicle Designer',
        short_name: 'MnemeVeh',
        description: 'Mass-based vehicle design system for Mneme RPG',
        theme_color: '#121212',
        background_color: '#121212',
        display: 'standalone',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
  ],
})
