<!-- src/lib/components/dashboard/product/ProductTable.svelte -->
<script lang="ts">
  import { products } from '$lib/stores/products';
  import type { Product } from '$lib/types/products';
  import DiscountToggle from '$lib/components/ui/discounttoggle/DiscountToggle.svelte';
  import ProductRow from './ProductRow.svelte';
  import ConfirmModal from '$lib/components/ui/modal/ConfirmModal.svelte';
  import { get } from 'svelte/store';
  import type { ActiveToggle } from '$features/price/utils';
  import { setColumnToggle, setRowToggle } from '$features/toggle/toggle-manager';

  // Aggiorna singolo prodotto
  function handleUpdate(updated: Product) {
    products.update((all) => all.map((p) => (p.handle === updated.handle ? updated : p)));
    allProducts = get(products); // 🔹 aggiorna subito lo stato dei bulk toggle
  }

  // Stato per modali
  let showConfirmModal = false;
  let confirmTitle = '';
  let confirmMessage = '';
  let confirmAction: () => void;

  function openConfirm(title: string, message: string, action: () => void) {
    confirmTitle = title;
    confirmMessage = message;
    confirmAction = action;
    showConfirmModal = true;
  }
  function onConfirm() {
    showConfirmModal = false;
    confirmAction?.();
  }
  function onCancel() {
    showConfirmModal = false;
  }

  // Stati colonna
  $: allProducts = get(products);
  $: total = allProducts.length;
  $: maxAll = total > 0 && allProducts.every((p) => p.activeToggle === 'SM');
  $: maxIndeterminate = total > 0 && allProducts.some((p) => p.activeToggle === 'SM') && !maxAll;
  $: scAll = total > 0 && allProducts.every((p) => p.activeToggle === 'SC');
  $: scIndeterminate = total > 0 && allProducts.some((p) => p.activeToggle === 'SC') && !scAll;
  $: pfAll = total > 0 && allProducts.every((p) => p.activeToggle === 'PF');
  $: pfIndeterminate = total > 0 && allProducts.some((p) => p.activeToggle === 'PF') && !pfAll;

  // Bulk toggle
  function bulkToggleType(type: ActiveToggle, onlyUnlocked = false) {
    const isAll = type === 'SM' ? maxAll : type === 'SC' ? scAll : pfAll;

    // 🔹 Se già tutto attivo → disattiva tutti
    if (isAll) {
      return bulkDisableAll();
    }

    openConfirm(
      `Applica ${type} a tutti`,
      `Confermi di applicare ${type} a tutti i prodotti?`,
      () => {
        products.update((arr) => {
          const { updatedRows } = setColumnToggle(arr, type, { onlyUnlocked, force: true });
          return updatedRows;
        });
        allProducts = get(products);
      }
    );
  }

  function bulkDisableAll() {
    openConfirm(
      'Rimuovi toggle su tutti',
      'Confermi di rimuovere tutti i toggle sui prodotti?',
      () => {
        products.update((arr) => {
          const { updatedRows } = setColumnToggle(arr, 'NONE', { force: true });
          return updatedRows;
        });
        allProducts = get(products); // 🔹 aggiorna subito stato bulk
      }
    );
  }

  // Callback chiamata da ProductRow per richiedere conferma
  function handleRowConfirm({
    product,
    type,
    message
  }: {
    product: Product;
    type: ActiveToggle;
    message: string;
  }) {
    openConfirm('Conferma modifica', message, () => {
      const { newRow } = setRowToggle(product, type, { force: true });
      handleUpdate(newRow);
    });
  }
</script>

<div class="overflow-x-auto">
  <table class="min-w-full divide-y divide-gray-300 bg-white">
    <thead class="bg-gray-100 text-sm font-semibold text-gray-900">
      <tr>
        <th class="px-4 py-2 text-left">Handle</th>
        <th class="px-4 py-2 text-left">SKU</th>
        <th class="px-4 py-2 text-left">Nome</th>
        <th class="px-4 py-2 text-left">Barcode</th>
        <th class="px-4 py-2 text-left">Costo €</th>
        <th class="px-4 py-2 text-left">IVA %</th>
        <th class="px-4 py-2 text-left">Prezzo Pieno €</th>

        <!-- Bulk SM -->
        <th class="px-4 py-2 text-left">
          <DiscountToggle
            checked={maxAll}
            indeterminate={maxIndeterminate}
            onToggle={() => bulkToggleType('SM')}
          />
          <span>Sconto Max</span>
        </th>

        <!-- Bulk SC -->
        <th class="px-4 py-2 text-left">
          <DiscountToggle
            checked={scAll}
            indeterminate={scIndeterminate}
            onToggle={() => bulkToggleType('SC')}
          />
          <span>Sconto Custom</span>
        </th>

        <!-- Bulk PF -->
        <th class="px-4 py-2 text-left">
          <DiscountToggle
            checked={pfAll}
            indeterminate={pfIndeterminate}
            onToggle={() => bulkToggleType('PF')}
          />
          <span>Prezzo Finale</span>
        </th>

        <th class="px-4 py-2 text-left">Giacenza</th>
        <th class="px-4 py-2 text-left">Sync</th>
        <th class="px-4 py-2 text-left">Ult. Agg.</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 bg-white text-gray-900">
      {#each $products as product (product.handle)}
        <ProductRow {product} onUpdate={handleUpdate} onConfirmToggle={handleRowConfirm} />
      {/each}
    </tbody>
  </table>

  {#if showConfirmModal}
    <ConfirmModal title={confirmTitle} message={confirmMessage} {onConfirm} {onCancel} />
  {/if}
</div>
