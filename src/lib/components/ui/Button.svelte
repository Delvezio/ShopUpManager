<!-- src/lib/components/ui/Button.svelte -->

<script lang="ts">
  /** Props personalizzate */
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let variant: 'primary' | 'outline' = 'primary';
  export let disabled: boolean = false;

  // $$restProps contiene tutte le altre props/eventi passati al componente
</script>

<button
  type={type}
  disabled={disabled}
  {...$$restProps}
  class={`flex items-center justify-center w-full py-2 px-4 rounded text-sm transition
    ${variant === 'primary'
      ? 'bg-(--color-primary) text-white hover:bg-(--color-primary-600)'
      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}
  `}
>
  <slot />
</button>

  