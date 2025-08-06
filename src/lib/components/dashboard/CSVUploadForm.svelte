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

  function openFileDialog() {
    fileInput?.click();
  }

  function handleFilesChange() {
    const file = fileInput?.files?.[0];
    if (!file) return;
    parseCsv(file);
    if (fileInput) fileInput.value = '';
  }

  function parseCsv(file: File) {
    // Estrai preferenze utente
    const prefs = get(userPreferences);

    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data;

        // Correggi intestazione duplicata di Giacenza
        rows.forEach((row) => {
          if ('Prezzo Pieno_1' in row) {
            row['Giacenza'] = row['Prezzo Pieno_1'];
            delete row['Prezzo Pieno_1'];
          }
        });

        const parsed: Product[] = rows.map((row) => {
          // Normalizza i numeri da stringa
          const costPrice = parseFloat(
            String(row['Prezzo di Costo'] ?? '0')
              .replace(/[^0-9.,-]/g, '')
              .replace(',', '.')
          );
          const iva = parseFloat(String(row['IVA'] ?? '0'));
          const listPrice = parseFloat(
            String(row['Prezzo Pieno'] ?? '0')
              .replace(/[^0-9.,-]/g, '')
              .replace(',', '.')
          );
          const stock = parseInt(String(row['Giacenza'] ?? '0'), 10);

          // Calcolo Sconto Max
          const costWithVat = costPrice * (1 + iva / 100);
          const shipImpact = prefs.shippingCost / prefs.freeShippingThreshold;
          const marginDecimal = prefs.marginTarget / 100;
          const minSale = (costWithVat + shipImpact) / (1 - marginDecimal);
          const maxDiscountPct = Math.max(0, ((listPrice - minSale) / listPrice) * 100);

          // Prezzo finale calcolato su Sconto Max
          const salePrice = Math.round(listPrice * (1 - maxDiscountPct / 100) * 100) / 100;

          return {
            handle: String(row['Handle'] ?? ''),
            sku: String(row['SKU'] ?? ''),
            name: String(row['Nome Prodotto'] ?? ''),
            barcode: String(row['Barcode'] ?? ''),
            costPrice,
            iva,
            listPrice,
            salePrice,
            stock,
            syncState: 'pending',
            updatedAt: new Date(),
            maxDiscountActive: true, // selezionato di default
            customDiscountActive: false,
            customDiscountPct: undefined,
            customPriceActive: false,
            maxDiscountPct
          };
        });

        // Popola lo store prodotti
        products.set(parsed);

        // Registra raw upload (senza redirect)
        const id = uuidv4();
        rawUploads.update((arr) => [...arr, { id, filename: file.name, data: rows }]);
      },
      error: (err) => {
        console.error('Parsing error:', err);
      }
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
