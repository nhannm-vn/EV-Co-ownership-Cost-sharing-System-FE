import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [tailwindcss(), autoprefixer()]
    }
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  }
})
