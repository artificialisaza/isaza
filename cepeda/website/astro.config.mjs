// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://isaza.xyz',
  base: '/cepeda/',
  vite: {
    plugins: [tailwindcss()]
  }
});