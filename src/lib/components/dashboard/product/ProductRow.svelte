<!-- src/lib/components/dashboard/product/ProductRow.svelte -->
<script lang="ts">
  import { get } from 'svelte/store';
  import { userPreferences } from '$lib/stores/userPreferences';
  import type { Product } from '$lib/types/products';
  import DiscountToggle from '$lib/components/ui/DiscountToggle.svelte';

  export let product: Product;
  export let onUpdate: (updated: Product) => void;

  // Estrai preferenze utente
  const { marginTarget, shippingCost, freeShippingThreshold } = get(userPreferences);

  // Calcolo Sconto Max percentuale
  $: costWithVat = product.costPrice * (1 + product.iva / 100);
  $: shipImpact = shippingCost / freeShippingThreshold;
  $: marginDecimal = marginTarget / 100;
  $: minSale = (costWithVat + shipImpact) / (1 - marginDecimal);
  $: maxDiscountPct = Math.max(0, ((product.listPrice - minSale) / product.listPrice) * 100);

  // Toggle Sconto Max (radio)
  function handleMaxToggle(active: boolean) {
    const salePrice = active
      ? Math.round(product.listPrice * (1 - maxDiscountPct / 100) * 100) / 100
      : product.listPrice;
    onUpdate({
      ...product,
      maxDiscountActive: active,
      customDiscountActive: false,
      customPriceActive: false,
      salePrice
    });
  }

  // Toggle Sconto Custom (radio)
  function handleCustomToggle(active: boolean) {
    const pct = product.customDiscountPct ?? 0;
    const salePrice = active
      ? Math.round(product.listPrice * (1 - pct / 100) * 100) / 100
      : product.listPrice;
    onUpdate({
      ...product,
      maxDiscountActive: false,
      customDiscountActive: active,
      customPriceActive: false,
      salePrice
    });
  }

  // Input percentuale Custom
  function handleCustomInput(e: Event) {
    const raw = (e.target as HTMLInputElement).value;
    const pct = raw === '' ? 0 : parseFloat(raw) || 0;
    const salePrice = Math.round(product.listPrice * (1 - pct / 100) * 100) / 100;
    onUpdate({
      ...product,
      maxDiscountActive: false,
      customDiscountActive: true,
      customDiscountPct: pct,
      customPriceActive: false,
      salePrice
    });
  }

  // Toggle Prezzo Finale (radio)
  function handlePriceToggle(active: boolean) {
    const salePrice = active ? product.salePrice : product.listPrice;
    onUpdate({
      ...product,
      maxDiscountActive: false,
      customDiscountActive: false,
      customPriceActive: active,
      salePrice
    });
  }

  // Input prezzo manuale Finale
  function handlePriceInput(e: Event) {
    const raw = (e.target as HTMLInputElement).value;
    const price = raw === '' ? product.listPrice : parseFloat(raw) || product.listPrice;
    onUpdate({
      ...product,
      maxDiscountActive: false,
      customDiscountActive: false,
      customPriceActive: true,
      salePrice: price
    });
  }
</script>

<tr>
  <td class="px-4 py-2">{product.handle}</td>
  <td class="px-4 py-2">{product.sku}</td>
  <td class="px-4 py-2">{product.name}</td>
  <td class="px-4 py-2">{product.barcode}</td>
  <td class="px-4 py-2">{costWithVat.toFixed(2)}</td>
  <td class="px-4 py-2">{product.iva}%</td>
  <td class="px-4 py-2">{product.listPrice.toFixed(2)}</td>

  <!-- Sconto Max -->
  <td class="px-4 py-2">
    <div class="flex items-center gap-2">
      <DiscountToggle
        checked={product.maxDiscountActive}
        on:toggle={(e) => handleMaxToggle(e.detail)}
      />
      <span>{maxDiscountPct.toFixed(1)}%</span>
    </div>
  </td>

  <!-- Sconto Custom -->
  <td class="px-4 py-2">
    <div class="flex items-center gap-2">
      <DiscountToggle
        checked={product.customDiscountActive}
        on:toggle={(e) => handleCustomToggle(e.detail)}
      />
      <input
        type="number"
        min="0"
        max="100"
        step="0.1"
        class="w-16 rounded border p-1 text-sm"
        value={product.customDiscountPct ?? ''}
        on:input={handleCustomInput}
      />
    </div>
  </td>

  <!-- Prezzo Finale -->
  <td class="px-4 py-2">
    <div class="flex items-center gap-2">
      <DiscountToggle
        checked={product.customPriceActive}
        on:toggle={(e) => handlePriceToggle(e.detail)}
      />
      <input
        type="number"
        class="w-20 rounded border p-1 text-sm"
        value={product.salePrice}
        on:input={handlePriceInput}
      />
    </div>
  </td>

  <td class="px-4 py-2">{product.stock}</td>
  <td class="px-4 py-2">{product.syncState}</td>
  <td class="px-4 py-2">{product.updatedAt.toLocaleString()}</td>
</tr>
