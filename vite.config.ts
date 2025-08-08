import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  resolve: {
    alias: {
      // alias standard
      $lib: path.resolve('./src/lib'),
      // feature-based structure
      $features: path.resolve('./src/lib/features'),
      // servizi / orchestratori
      $services: path.resolve('./src/lib/services'),
      // componenti atomici UI (modificato)
      $ui: path.resolve('./src/lib/components/ui')
    }
  }
});
