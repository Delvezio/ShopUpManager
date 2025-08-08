<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  export let href: string = '#';
  export let label: string;

  const dispatch = createEventDispatcher();

  function handleClick(event: MouseEvent) {
    event.preventDefault();
    dispatch('select');
  }
</script>

<a
  {href}
  class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
  on:click={handleClick}
>
  {label}
</a>
