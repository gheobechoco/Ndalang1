import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Charge toutes les variables d'environnement commençant par VITE_
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Expose les variables d'environnement au code client
      'import.meta.env': JSON.stringify(env),
    },
    server: {
      watch: {
        ignored: [
          '**/.wine/**',
          '**/node_modules/**'
        ]
      }
    }
  };
});