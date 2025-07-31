<!-- src/lib/components/ui/dropdown/DropdownMenuItem.svelte -->

<script lang="ts">
    export let href: string;
    export let label: string;
    export let icon: typeof import('lucide-svelte').User | null = null;
  </script>
  
  <a
    href={href}
    class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
  >
    {#if icon}
      <svelte:component this={icon} class="size-4 text-gray-500" />
    {/if}
    <span>{label}</span>
  </a>
  
  