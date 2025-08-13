<script lang="ts">
  export let checked = false;
  export let indeterminate = false;
  export let disabled = false;
  export let onToggle: (() => void) | undefined;

  function handleClick() {
    if (!disabled) onToggle?.();
  }
</script>

<button
  type="button"
  class="flex h-6 w-6 cursor-pointer items-center justify-center rounded border select-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 focus:outline-none"
  class:border-green-600={checked}
  class:border-red-600={!checked && !indeterminate}
  class:border-gray-500={indeterminate}
  on:click={handleClick}
  aria-pressed={checked}
  aria-label="Toggle sconto"
>
  {#if indeterminate}
    <span class="h-0.5 w-3 rounded bg-green-600"></span>
  {:else if checked}
    <span class="font-bold text-green-600">✓</span>
  {:else}
    <span class="font-bold text-red-600">✕</span>
  {/if}
</button>
