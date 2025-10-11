// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // stille updates, geen UI nodig
      registerType: 'autoUpdate',
      injectRegister: 'auto', // laat de plugin zelf registreren

      workbox: {
        // claim meteen alle tabs en vervang oude SW direct
        clientsClaim: true,
        skipWaiting: true,
        // welke bestanden gecachet mogen worden
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
      },

      includeAssets: [
        'favicon.svg',
        'apple-touch-icon.png',
        'icons/icon-192.png',
        'icons/icon-512.png',
      ],

      manifest: {
        name: 'Feng Shui Nederland — Nine Star Ki',
        short_name: 'Nine Star Ki',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ff6342',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },

      devOptions: { enabled: false }
    })
  ]
})
