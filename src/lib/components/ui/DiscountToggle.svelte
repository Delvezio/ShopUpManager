<!-- src/lib/components/ui/DiscountToggle.svelte -->
<script lang="ts">
    /** 
     * Toggle checkbox per sconti, ora via callback props 
     */
    export let checked: boolean = false;
    export let className: string = '';
    /** Callback che il genitore passa per ricevere il nuovo valore */
    export let onToggle: (checked: boolean) => void = () => {};
  
    function handleChange(event: Event) {
      const target = event.target as HTMLInputElement;
      onToggle(target.checked);
    }
  </script>
  
  <input
    type="checkbox"
    {checked}
    class={`size-4 accent-primary-600 ${className}`}
    on:change={handleChange}
  />
  