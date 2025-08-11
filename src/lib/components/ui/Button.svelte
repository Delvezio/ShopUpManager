<!-- src/lib/components/ui/Button.svelte -->

<script lang="ts">
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let variant: 'primary' | 'outline' = 'primary';
  export let disabled: boolean = false;
  export let onClick: (event: MouseEvent) => void = () => {};
  export let className: string = '';
</script>

<button
  {type}
  {disabled}
  on:click={onClick}
  class={`inline-flex items-center justify-center rounded px-3 py-1 text-sm transition
    ${
      variant === 'primary'
        ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-600)]'
        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
    } ${className}`}
  {...$$restProps}
>
  <slot />
</button>
