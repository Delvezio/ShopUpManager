// src/global.d.ts
// Include ambient Svelte types and shims for .svelte modules
// <reference types="svelte" />

import type { SvelteComponentTyped } from 'svelte';

declare module 'papaparse';
declare module 'uuid';

declare module '*.svelte' {
  // Props, events, slots as unknown maps
  export default SvelteComponentTyped<
    Record<string, unknown>,
    Record<string, unknown>,
    Record<string, unknown>
  >;
}
