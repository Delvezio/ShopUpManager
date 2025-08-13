<!-- src/lib/components/ProductRow.svelte -->

<script lang="ts">
  import DiscountToggle from '../../ui/discounttoggle/DiscountToggle.svelte';
  import type { Product } from '../../../types/products';
  import {
    setRowToggle,
    handleSCInputChange,
    handlePFInputChange
  } from '../../../features/toggle/toggle-manager';
  import type { ActiveToggle } from '$features/price/utils';

  export let product: Product;
  export let onUpdate: (updatedProduct: Product) => void;
  export let onConfirmToggle: (params: {
    product: Product;
    type: ActiveToggle;
    message: string;
  }) => void;

  // Stato dei toggle e valori in input
  $: activeToggle = product.activeToggle ?? 'NONE';
  $: customDiscount = product.customDiscountPct ?? 0;
  $: fixedPrice = product.pfManuale ?? product.basePrice;
  $: maxDiscount = product.maxDiscountPct ?? 0;

  function selectToggle(type: NonNullable<Product['activeToggle']>) {
    // 🔹 Se il toggle cliccato è già attivo → disattiva
    if (activeToggle === type) {
      const { newRow } = setRowToggle(product, 'NONE', { force: true });
      return onUpdate(newRow);
    }

    const { newRow, requireConfirm, confirmMessage } = setRowToggle(product, type);
    if (requireConfirm && confirmMessage) {
      onConfirmToggle({ product, type, message: confirmMessage });
      return;
    }
    onUpdate(newRow);
  }

  function handleCustomInput(e: Event) {
    const val = parseFloat((e.target as HTMLInputElement).value) || 0;
    const { newRow, requireConfirm, confirmMessage } = handleSCInputChange(product, val);
    if (requireConfirm && confirmMessage) {
      onConfirmToggle({ product, type: 'SC', message: confirmMessage });
      return;
    }
    onUpdate(newRow);
  }

  function handleFixedInput(e: Event) {
    const val = parseFloat((e.target as HTMLInputElement).value) || 0;
    const { newRow } = handlePFInputChange(product, val);
    onUpdate(newRow);
  }
</script>

<tr>
  <td class="px-4 py-2">{product.handle}</td>
  <td class="px-4 py-2">{product.sku}</td>
  <td class="px-4 py-2">{product.name}</td>
  <td class="px-4 py-2">{product.barcode}</td>
  <td class="px-4 py-2">{product.cost.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</td>
  <td class="px-4 py-2">{product.iva}%</td>
  <td class="px-4 py-2">
    {product.basePrice.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
  </td>

  <!-- SM -->
  <td class="px-4 py-2">
    <div class="flex items-center gap-2 whitespace-nowrap">
      <DiscountToggle checked={activeToggle === 'SM'} onToggle={() => selectToggle('SM')} />
      <span>{maxDiscount.toFixed(2)}%</span>
    </div>
  </td>

  <!-- SC -->
  <td class="px-4 py-2">
    <div class="flex items-center gap-2 whitespace-nowrap">
      <input
        type="number"
        min="0"
        max="100"
        step="0.01"
        class="w-16 rounded border p-1 text-sm"
        bind:value={customDiscount}
        on:input={handleCustomInput}
      />
      <DiscountToggle checked={activeToggle === 'SC'} onToggle={() => selectToggle('SC')} />
    </div>
  </td>

  <!-- PF -->
  <td class="px-4 py-2">
    <div class="flex items-center gap-2 whitespace-nowrap">
      <input
        type="number"
        min="0"
        step="0.01"
        class="w-20 rounded border p-1 text-sm"
        bind:value={fixedPrice}
        on:input={handleFixedInput}
      />
      <DiscountToggle checked={activeToggle === 'PF'} onToggle={() => selectToggle('PF')} />
    </div>
  </td>

  <td class="px-4 py-2">{product.stock}</td>
  <td class="px-4 py-2">{product.syncState}</td>
  <td class="px-4 py-2">{product.updatedAt.toLocaleString()}</td>
</tr>
