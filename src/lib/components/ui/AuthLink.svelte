<!-- src/lib/components/ui/AuthLink.svelte -->

<script lang="ts">
    export let href: string;
    export let label: string | undefined = undefined;
    export let variant: 'link' | 'button' = 'link';
  </script>
  
  {#if variant === 'button'}
    <a href={href}
       class="inline-block rounded bg-(--color-primary) px-5 py-2 text-white font-medium hover:opacity-90">
      {#if label}{label}{:else}<slot />{/if}
    </a>
  {:else}
    <a href={href}
       class="text-sm font-semibold text-(--color-primary) hover:underline">
      {#if label}{label}{:else}<slot />{/if}
    </a>
  {/if}