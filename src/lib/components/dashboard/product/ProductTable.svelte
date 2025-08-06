<!-- src/lib/components/dashboard/product/ProductTable.svelte -->
<script lang="ts">
  import { products } from '$lib/stores/products';
  import type { Product } from '$lib/types/products';
  import DiscountToggle from '$lib/components/ui/DiscountToggle.svelte';
  import ProductRow from './ProductRow.svelte';
  import { get } from 'svelte/store';

  let maxAll = false;
  let customAll = false;
  let priceAll = false;

  function toggleAllMax(v: boolean) {
    maxAll = v;
    products.set(get(products).map((p) => ({ ...p, maxDiscountActive: v })));
  }
  function toggleAllCustom(v: boolean) {
    customAll = v;
    products.set(get(products).map((p) => ({ ...p, customDiscountActive: v })));
  }
  function toggleAllPrice(v: boolean) {
    priceAll = v;
    products.set(get(products).map((p) => ({ ...p, customPriceActive: v })));
  }

  function handleUpdate(updated: Product) {
    products.set(get(products).map((p) => (p.handle === updated.handle ? updated : p)));
  }
</script>

<div class="overflow-x-auto bg-white shadow-sm">
  <table class="min-w-max table-auto divide-y divide-gray-200 whitespace-nowrap">
    <thead class="bg-gray-50 text-xs text-gray-600">
      <tr>
        <th class="px-4 py-2 text-left">Handle</th>
        <th class="px-4 py-2 text-left">SKU</th>
        <th class="px-4 py-2 text-left">Nome</th>
        <th class="px-4 py-2 text-left">Barcode</th>
        <th class="px-4 py-2 text-left">Costo €</th>
        <th class="px-4 py-2 text-left">IVA %</th>
        <th class="px-4 py-2 text-left">Prezzo Pieno €</th>

        <!-- Colonna Sconto Max -->
        <th class="px-4 py-2 text-left">
          <div class="flex items-center gap-2">
            <DiscountToggle checked={maxAll} on:toggle={(e) => toggleAllMax(e.detail)} />
            <span>Sconto Max</span>
          </div>
        </th>

        <!-- Colonna Sconto Custom -->
        <th class="px-4 py-2 text-left">
          <div class="flex items-center gap-2">
            <DiscountToggle checked={customAll} on:toggle={(e) => toggleAllCustom(e.detail)} />
            <span>Sconto Custom</span>
          </div>
        </th>

        <!-- Colonna Prezzo Finale -->
        <th class="px-4 py-2 text-left">
          <div class="flex items-center gap-2">
            <DiscountToggle checked={priceAll} on:toggle={(e) => toggleAllPrice(e.detail)} />
            <span>Prezzo Finale</span>
          </div>
        </th>

        <th class="px-4 py-2 text-left">Giacenza</th>
        <th class="px-4 py-2 text-left">Sync</th>
        <th class="px-4 py-2 text-left">Ult. Agg.</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100 text-sm text-gray-800">
      {#each $products as product (product.handle)}
        <ProductRow {product} onUpdate={handleUpdate} />
      {/each}
    </tbody>
  </table>
</div>
