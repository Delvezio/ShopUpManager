<!-- src/lib/components/dashboard/CSVUploadForm.svelte -->
<script lang="ts">
  import Papa from 'papaparse';
  import Button from '$lib/components/ui/Button.svelte';
  import { rawUploads, type CsvRow } from '$lib/stores/rawUploads';
  import { products } from '$lib/stores/products';
  import type { Product } from '$lib/types/products';
  import { get } from 'svelte/store';
  import { userPreferences } from '$lib/stores/userPreferences';
  import { v4 as uuidv4 } from 'uuid';

  let fileInput: HTMLInputElement | null = null;

  function openFileDialog(): void {
    if (!fileInput) return;
    fileInput.click();
  }

  function handleFilesChange(): void {
    if (!fileInput || !fileInput.files) return;
    const file = fileInput.files[0];
    if (!file) return;
    parseCsv(file);
    fileInput.value = '';
  }

  function parseCsv(file: File): void {
    const prefs = get(userPreferences);
    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: ({ data: rows }) => {
        (rows as CsvRow[]).forEach((row) => {
          if ('Prezzo Pieno_1' in row) {
            row['Giacenza'] = row['Prezzo Pieno_1'];
            delete row['Prezzo Pieno_1'];
          }
        });

        const parsed: Product[] = (rows as CsvRow[]).map((row) => {
          const cost = parseFloat(
            String(row['Prezzo di Costo'] ?? '0')
              .replace(/[^0-9.,-]/g, '')
              .replace(',', '.')
          );
          const iva = parseFloat(String(row['IVA'] ?? '0').replace(',', '.'));
          const basePrice = parseFloat(
            String(row['Prezzo Pieno'] ?? '0')
              .replace(/[^0-9.,-]/g, '')
              .replace(',', '.')
          );
          const stock = parseInt(String(row['Giacenza'] ?? '0'), 10);

          const costWithVat = cost * (1 + iva / 100);
          const shipImpact = prefs.shippingCost / prefs.freeShippingThreshold;
          const marginDecimal = prefs.targetMarginPercent / 100;
          const minSale = (costWithVat + shipImpact) / (1 - marginDecimal);
          const maxDiscountPct = Math.max(0, ((basePrice - minSale) / basePrice) * 100);
          const salePrice = Math.round(basePrice * (1 - maxDiscountPct / 100) * 100) / 100;

          return {
            handle: String(row['Handle'] ?? ''),
            sku: String(row['SKU'] ?? ''),
            name: String(row['Nome Prodotto'] ?? ''),
            barcode: String(row['Barcode'] ?? ''),
            cost,
            iva,
            basePrice,
            salePrice,
            stock,
            syncState: 'pending',
            updatedAt: new Date(),
            // Toggle iniziale Sconto Massimo (SM)
            maxDiscountActive: true,
            maxDiscountPct,
            customDiscountPct: undefined,
            fixedPrice: undefined,
            activeToggle: 'SM'
          };
        });

        products.set(parsed);
        rawUploads.update((arr) => [
          ...arr,
          { id: uuidv4(), filename: file.name, data: rows as CsvRow[] }
        ]);
      },
      error: (err) => console.error('Parsing error:', err)
    });
  }
</script>

<input
  type="file"
  accept=".csv"
  bind:this={fileInput}
  class="hidden"
  on:change={handleFilesChange}
/>

<Button onClick={openFileDialog} variant="primary">Carica CSV</Button>
