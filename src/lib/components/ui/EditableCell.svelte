<!-- src/lib/components/ui/EditableCell.svelte -->

<script lang="ts">
    /** Controllo input generico via callback prop */
    export let value: string | number = '';
    export let type: string = 'text';
    export let placeholder: string = '';
    export let className: string = '';
    /** Callback che il genitore passa per ricevere il nuovo valore */
    export let onChange: (value: string | number) => void = () => {};
  
    // stato interno per il binding
    let inputValue: string = String(value);
  
    // tiene in sync il locale se 'value' cambia dall'esterno
    $: if (String(value) !== inputValue) {
      inputValue = String(value);
    }
  
    // larghezza in 'ch' (numero caratteri + 1)
    $: width = `${inputValue.length + 1}ch`;
  
    function handleInput(event: Event) {
      const val = (event.target as HTMLInputElement).value;
      inputValue = val;
      // manda al genitore il tipo corretto
      onChange(type === 'number' ? Number(val) : val);
    }
  </script>
  
  <input
    bind:value={inputValue}
    {type}
    {placeholder}
    class={`bg-transparent border-none focus:outline-none whitespace-nowrap w-auto ${className}`}
    style="width: {width};"
    on:input={handleInput}
  />
  
  