<!-- src/lib/components/ui/Button.svelte -->
<script lang="ts">
  /** Tipo di bottone: button, submit o reset */
  export let type: 'button' | 'submit' | 'reset' = 'button';
  /** Varianti di stile: primary o outline */
  export let variant: 'primary' | 'outline' = 'primary';
  /** Disabilita il bottone */
  export let disabled: boolean = false;
  /** Callback da eseguire al click */
  export let onClick: (event: MouseEvent) => void = () => {};
</script>

<button
  {type}
  {disabled}
  on:click={onClick}
  class={`flex w-full items-center justify-center rounded px-4 py-2 text-sm transition
    ${
      variant === 'primary'
        ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-600)]'
        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
    }
  `}
>
  <slot />
</button>
