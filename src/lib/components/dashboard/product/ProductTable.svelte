<!-- src/lib/components/dashboard/product/ProductTable.svelte -->
<script lang="ts">
    import DiscountToggle from '$lib/components/ui/DiscountToggle.svelte';
    import ProductRow from './ProductRow.svelte';
    import initialProducts from '$lib/constants/products';
  
    // Copio la lista per renderla reactive
    let products = initialProducts.map(p => ({ ...p }));
  
    // Stato dei toggle globali
    let maxAll = false;
    let customAll = false;
  
    function toggleAllMax(v: boolean) {
      maxAll = v;
      products = products.map(p => ({ ...p, max_discount_active: v }));
    }
  
    function toggleAllCustom(v: boolean) {
      customAll = v;
      products = products.map(p => ({ ...p, custom_discount_active: v }));
    }
  
    function handleUpdate(updated: any) {
      // Sostituisco il prodotto modificato (identificato da handle)
      products = products.map(p =>
        p.handle === updated.handle ? { ...updated } : p
      );
    }
  </script>
  
  <div class="overflow-x-auto bg-white shadow-sm">
    <table class="w-full table-auto divide-y divide-gray-200 whitespace-nowrap">
      <thead class="bg-gray-50 text-xs font-light text-gray-600">
        <tr class="text-left whitespace-nowrap">
          <th class="px-4 sm:px-6 py-3 whitespace-nowrap">Handle</th>
          <th class="px-4 sm:px-6 py-3 whitespace-nowrap">SKU</th>
          <th class="px-4 sm:px-6 py-3 whitespace-nowrap">Nome Prodotto</th>
          <th class="px-4 sm:px-6 py-3 whitespace-nowrap">Barcode</th>
          <th class="px-4 sm:px-6 py-3 whitespace-nowrap">Costo</th>
          <th class="px-4 sm:px-6 py-3 whitespace-nowrap">Prezzo Pieno</th>
          
  
          <!-- Header Sconto Max con toggle globale -->
          <th class="px-4 sm:px-6 py-3 whitespace-nowrap">
            <div class="flex items-center gap-1">
                <DiscountToggle checked={maxAll} onToggle={toggleAllMax} />
                <span>Sconto Max</span>
            </div>
          </th>
  
          <!-- Header Sconto Custom con toggle globale -->
          <th class="px-4 sm:px-6 py-3 whitespace-nowrap">
            <div class="flex items-center gap-1">
                <DiscountToggle checked={customAll} onToggle={toggleAllCustom} />
                <span>Sconto Custom</span>
            </div>
          </th>

          <th class="px-4 sm:px-6 py-3 whitespace-nowrap">Prezzo Scontato</th>
          <th class="px-4 sm:px-6 py-3 whitespace-nowrap">Giacenza</th>
          <th class="px-4 sm:px-6 py-3 whitespace-nowrap">Sync</th>
          <th class="px-4 sm:px-6 py-3 whitespace-nowrap">Ultimo Agg.</th>

        </tr>
      </thead>

      
  
      <tbody class="divide-y divide-gray-100 text-sm text-gray-800">
        {#each products as product (product.handle)}
          <ProductRow {product} onUpdate={handleUpdate} />
        {/each}
      </tbody>
    </table>
  </div>
  