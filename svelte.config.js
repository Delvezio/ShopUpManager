// svelte.config.js
import adapter from '@sveltejs/adapter-auto';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sveltePreprocess({
    typescript: true,
    // qui puoi aggiungere altri preprocessors (postcss, scss, ecc.)
  }),
  kit: {
    adapter: adapter()
  }
};

export default config;
