<!-- src/lib/components/dashboard/product/ProductRow.svelte -->
<script lang="ts">
  import type { Product } from '$lib/types/products';
  import DiscountToggle from '$lib/components/ui/discounttoggle/DiscountToggle.svelte';
  import { userPreferences } from '$lib/stores/userPreferences';
  import type { ActiveToggle } from '$features/price/utils';
  import { calculateMaxDiscount, calculateFinalPrice } from '$features/price/utils';
  import { get } from 'svelte/store';

  /** Prop da ProductTable */
  export let product: Product;
  export let onUpdate: (updated: Product) => void;

  // Stato locale
  let customDiscount = product.customDiscountPct ?? 0;
  let fixedPrice = product.fixedPrice ?? product.basePrice;
  let activeToggle: ActiveToggle = product.activeToggle ?? 'SM';

  // Preferenze utente
  $: prefs = get(userPreferences);

  // Calcolo Sconto Massimo
  $: maxDiscount = calculateMaxDiscount({
    cost: product.cost,
    vatPercent: product.iva,
    basePrice: product.basePrice,
    targetMarginPercent: prefs.targetMarginPercent,
    avgShippingCost: prefs.shippingCost,
    freeShipThreshold: prefs.freeShippingThreshold,
    // Limite massimo di sconto (default 100%)
    maxDiscountLimitPercent: 100
  });

  // Calcolo Prezzo Finale
  $: finalPrice = calculateFinalPrice({
    basePrice: product.basePrice,
    maxDiscount,
    customDiscount,
    fixedPrice,
    activeToggle
  });

  // Invia aggiornamento al parent
  function notifyParent() {
    onUpdate({
      ...product,
      customDiscountPct: customDiscount,
      fixedPrice,
      activeToggle,
      salePrice: finalPrice,
      maxDiscountPct: maxDiscount
    });
  }

  function selectToggle(toggle: ActiveToggle) {
    activeToggle = toggle;
    notifyParent();
  }

  function handleCustomInput(e: Event) {
    const raw = (e.target as HTMLInputElement).value.replace(',', '.');
    customDiscount = parseFloat(raw) || 0;
    activeToggle = 'SC';
    notifyParent();
  }

  function handleFixedInput(e: Event) {
    const raw = (e.target as HTMLInputElement).value.replace(',', '.');
    fixedPrice = parseFloat(raw) || product.basePrice;
    activeToggle = 'PF';
    notifyParent();
  }
</script>

<tr>
  <td class="px-4 py-2">{product.handle}</td>
  <td class="px-4 py-2">{product.sku}</td>
  <td class="px-4 py-2">{product.name}</td>
  <td class="px-4 py-2">{product.barcode}</td>
  <td class="px-4 py-2">
    {product.cost.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
  </td>
  <td class="px-4 py-2">{product.iva}%</td>
  <td class="px-4 py-2">
    {product.basePrice.toLocaleString('it-IT', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}
  </td>

  <!-- Sconto Massimo -->
  <td class="px-4 py-2">
    <div class="flex items-center gap-2">
      <DiscountToggle checked={activeToggle === 'SM'} on:toggle={() => selectToggle('SM')} />
      <span>{maxDiscount.toFixed(2)}%</span>
    </div>
  </td>

  <!-- Sconto Custom -->
  <td class="px-4 py-2">
    <div class="flex items-center gap-2">
      <input
        type="number"
        min="0"
        max="100"
        step="0.01"
        class="w-16 rounded border p-1 text-sm"
        bind:value={customDiscount}
        on:input={handleCustomInput}
      />
      <DiscountToggle checked={activeToggle === 'SC'} on:toggle={() => selectToggle('SC')} />
    </div>
  </td>

  <!-- Prezzo Finale -->
  <td class="px-4 py-2">
    <div class="flex items-center gap-2">
      <input
        type="number"
        min="0"
        step="0.01"
        class="w-20 rounded border p-1 text-sm"
        bind:value={fixedPrice}
        on:input={handleFixedInput}
      />
      <DiscountToggle checked={activeToggle === 'PF'} on:toggle={() => selectToggle('PF')} />
    </div>
  </td>

  <!-- Altri campi -->
  <td class="px-4 py-2">{product.stock}</td>
  <td class="px-4 py-2">{product.syncState}</td>
  <td class="px-4 py-2">{product.updatedAt.toLocaleString()}</td>

  <!-- Prezzo Finale Esportato -->
  <td class="px-4 py-2 text-right">
    {finalPrice.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
  </td>
</tr>
