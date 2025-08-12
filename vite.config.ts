import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Charge uniquement les variables VITE_*
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react()],
    define: {
      // N'expose que les variables VITE_ au client
      'import.meta.env': JSON.stringify(env),
    },
    server: {
      watch: {
        ignored: ['**/.wine/**', '**/node_modules/**']
      }
    }
  };
});