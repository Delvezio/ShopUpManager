<script lang="ts">
  import { get } from 'svelte/store';
  import { userPreferences } from '$lib/stores/userPreferences';
  import type { Product } from '$lib/types/products';
  import DiscountToggle from '$lib/components/ui/discounttoggle/DiscountToggle.svelte';
  import ConfirmModal from '$lib/components/ui/modal/ConfirmModal.svelte';

  export let product: Product;
  export let onUpdate: (updated: Product) => void;

  const { marginTarget, shippingCost, freeShippingThreshold } = get(userPreferences);

  $: costWithVat = product.costPrice * (1 + product.iva / 100);
  $: shipImpact = shippingCost / freeShippingThreshold;
  $: marginDecimal = marginTarget / 100;
  $: minSale = (costWithVat + shipImpact) / (1 - marginDecimal);
  $: maxDiscountPct = Math.max(0, ((product.listPrice - minSale) / product.listPrice) * 100);

  let showConfirmModal = false;
  let pendingToggle: { type: 'SM' | 'SC'; activate: boolean } | null = null;

  type ButtonConfig = {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'outline';
    disabled?: boolean;
  };

  let buttons: ButtonConfig[] = [
    {
      label: 'Conferma',
      variant: 'primary',
      onClick: confirmOverride
    },
    {
      label: 'Annulla',
      variant: 'outline',
      onClick: cancelOverride
    }
  ];

  function handleMaxToggle(active: boolean) {
    if (product.customPriceActive && active) {
      pendingToggle = { type: 'SM', activate: active };
      showConfirmModal = true;
      return;
    }
    applyMaxToggle(active);
  }

  function applyMaxToggle(active: boolean) {
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

  function handleCustomToggle(active: boolean) {
    if (product.customPriceActive && active) {
      pendingToggle = { type: 'SC', activate: active };
      showConfirmModal = true;
      return;
    }
    applyCustomToggle(active);
  }

  function applyCustomToggle(active: boolean) {
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

  function handleCustomInput(e: Event) {
    const raw = (e.target as HTMLInputElement).value;
    const pct = raw === '' ? 0 : parseFloat(raw) || 0;
    if (product.customPriceActive) {
      pendingToggle = { type: 'SC', activate: true };
      showConfirmModal = true;
      return;
    }
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

  function confirmOverride() {
    if (!pendingToggle) return;
    if (pendingToggle.type === 'SM') {
      applyMaxToggle(pendingToggle.activate);
    } else if (pendingToggle.type === 'SC') {
      applyCustomToggle(pendingToggle.activate);
    }
    showConfirmModal = false;
    pendingToggle = null;
  }

  function cancelOverride() {
    showConfirmModal = false;
    pendingToggle = null;
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

  <td class="px-4 py-2">
    <div class="flex items-center gap-2">
      <DiscountToggle checked={product.maxDiscountActive} onToggle={handleMaxToggle} />
      <span>{maxDiscountPct.toFixed(1)}%</span>
    </div>
  </td>

  <td class="px-4 py-2">
    <div class="flex items-center gap-2">
      <DiscountToggle checked={product.customDiscountActive} onToggle={handleCustomToggle} />
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

  <td class="px-4 py-2">
    <div class="flex items-center gap-2">
      <DiscountToggle checked={product.customPriceActive} onToggle={handlePriceToggle} />
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

  {#if showConfirmModal}
    <ConfirmModal
      title="Conferma modifica"
      message="Il prezzo finale è bloccato. Attivando questo sconto, il prezzo manuale verrà modificato. Vuoi procedere?"
      {buttons}
    />
  {/if}
</tr>
