import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },

  // En desarrollo el navegador habla solo con Vite y Vite le pasa /api y /uploads al backend.
  // Así un celular en la misma red entra con http://IP-DE-TU-PC:5173 sin tocar CORS ni URLs.
  server: {
    host: true, // escucha también en la red local, no solo en localhost
    allowedHosts: ['.trycloudflare.com'], // túnel para probar desde fuera de tu Wi-Fi (ver README)
    proxy: {
      '/api': 'http://localhost:8080',
      '/uploads': 'http://localhost:8080',
    },
  },
})
