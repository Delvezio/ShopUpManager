<script lang="ts">
  export let checked: boolean = false;
  export let indeterminate: boolean = false;
  export let className: string = '';
  export let ariaLabel: string = '';
  export let onToggle: ((checked: boolean) => void) | null = null;

  function toggle() {
    if (onToggle) onToggle(!checked);
  }
</script>

<button
  type="button"
  aria-pressed={checked}
  aria-label={ariaLabel}
  class={`inline-flex h-8 w-8 items-center justify-center rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${className}`}
  on:click={toggle}
>
  {#if indeterminate}
    <!-- Icona stato misto (trattino) -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  {:else if checked}
    <!-- Icona check -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 text-green-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  {:else}
    <!-- Icona cross -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 text-red-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M6 18L18 6M6 6l12 12" />
    </svg>
  {/if}
</button>

<style>
  button {
    user-select: none;
  }
</style>
