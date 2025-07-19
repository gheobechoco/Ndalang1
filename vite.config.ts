import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      ignored: [
        '**/.wine/**', // Ignore le dossier .wine et tout son contenu
        '**/node_modules/**' // Optionnel : ignore aussi node_modules
      ]
    }
  }
})