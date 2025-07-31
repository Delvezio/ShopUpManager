<!-- src/lib/components/dashboard/CSVUploadForm.svelte -->

<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import * as Papa from 'papaparse';
  import { products } from '$lib/stores/products';
  import type { Product } from '$lib/types/products';
  import { v4 as uuidv4 } from 'uuid';

  let fileInput: HTMLInputElement | null = null;

  // per vedere se il click arriva
  function openFileDialog() {
    console.log('⚡ openFileDialog() called, fileInput=', fileInput);
    fileInput?.click();
  }

  function handleFilesChange() {
    console.log('📄 handleFilesChange() fired, selected:', fileInput?.files);
    const file = fileInput?.files?.[0];
    if (file) parseCsv(file);
    // resettiamo così da poter ricaricare lo stesso file più volte
    if (fileInput) fileInput.value = '';
  }

  function parseCsv(file: File) {
    console.log('🔍 parseCsv', file.name);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: { data: Record<string, string>[] }) => {
        console.log('✅ CSV parsed, rows:', results.data.length);
        const parsed: Product[] = results.data.map(row => ({
          handle:            row['Handle']          ?? '',
          sku:               row['SKU']             ?? '',
          name:              row['Nome Prodotto']   ?? '',
          barcode:           row['Barcode']         ?? '',
          costPrice:         parseFloat(row['Prezzo di Costo'] ?? '0'),
          listPrice:         parseFloat(row['Prezzo Pieno']    ?? '0'),
          salePrice:         parseFloat(row['Prezzo Scontato'] ?? row['Prezzo Pieno'] ?? '0'),
          stock:             parseInt(row['Giacenza']           ?? '0', 10),
          syncState:         'pending',
          updatedAt:         new Date(),
          maxDiscountActive: false,
          customDiscountActive: false,
          customDiscountPct: undefined
        }));
        products.set(parsed);
      },
      error: (err: any) => {
        console.error('Parsing error:', err);
      }
    });
  }
</script>

<!-- INPUT nascosto, ma legato a fileInput -->
<input
  type="file"
  accept=".csv"
  bind:this={fileInput}
  class="hidden"
  on:change={handleFilesChange}
/>

<!-- Pulsante di debugging “grezzo” -->
<button on:click={openFileDialog} class="mb-2 px-4 py-2 bg-gray-200 rounded">
  Test Apri Dialog
</button>

<!-- Il tuo Button “Carica CSV” -->
<Button on:click={openFileDialog} variant="primary">
  Carica CSV
</Button>