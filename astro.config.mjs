// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'http://profile.milix-m.com',
  base: '/new_portfolio',
  vite: {
    ssr: {
      noExternal: ['react-icons']
    },
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});