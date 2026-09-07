import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: { maximumFileSizeToCacheInBytes: 6 * 1024 * 1024 },
      manifest: {
        name: 'LGR — 12 Passos',
        short_name: 'LGR',
        description: 'Calculadora de Lugar Geométrico das Raízes — 12 passos (DCA-3701 UFRN)',
        theme_color: '#0f172a',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '.',
        icons: [{ src: 'vite.svg', sizes: 'any', type: 'image/svg+xml' }],
      },
    }),
  ],
  server: { host: true, port: 5173 },
  test: { environment: 'node' },
})
