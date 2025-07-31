<!-- src/lib/components/ui/dropdown/DropdownMenu.svelte -->

<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import { browser } from '$app/environment'; // ✅ IMPORTANTE
  
    export let isOpen: boolean;
    export let setIsOpen: (value: boolean) => void;
  
    let menuRef: HTMLElement | null = null;
  
    function handleClickOutside(event: MouseEvent) {
      if (menuRef && !menuRef.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
  
    onMount(() => {
      if (browser) {
        document.addEventListener('mousedown', handleClickOutside);
      }
    });
  
    onDestroy(() => {
      if (browser) {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    });
  </script>
  
  {#if isOpen}
    <div
      bind:this={menuRef}
      class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
    >
      <slot />
    </div>
  {/if}
  