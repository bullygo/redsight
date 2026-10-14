import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const isProd = process.env.NODE_ENV === 'production';

// GitHub Pages serves this project from /redsight/.
// Local development still uses relative asset URLs so `npm run dev` works.
export default defineConfig({
  base: isProd ? '/redsight/' : './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
