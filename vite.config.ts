import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Esto asegura que process.env.API_KEY funcione en el frontend sin crashear
    'process.env': process.env
  },
  build: {
    outDir: 'dist',
  }
});