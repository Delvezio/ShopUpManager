<!-- src/lib/components/dashboard/product/ProductTable.svelte -->
<script lang="ts">
  import { products } from '$lib/stores/products';
  import type { Product } from '$lib/types/products';
  import DiscountToggle from '$lib/components/ui/discounttoggle/DiscountToggle.svelte';
  import ProductRow from './ProductRow.svelte';
  import ConfirmModal from '$lib/components/ui/modal/ConfirmModal.svelte';
  import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
  import DropdownMenuItem from '$lib/components/ui/dropdown/DropdownMenuItem.svelte';
  import { get } from 'svelte/store';
  import type { ActiveToggle } from '$features/price/utils';

  // Aggiorna singolo prodotto
  function handleUpdate(updated: Product) {
    products.update((all) => all.map((p) => (p.handle === updated.handle ? updated : p)));
  }

  // Stato per i modali e dropdown
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

  // Dropdown di colonna
  let smOpen = false;
  let scOpen = false;
  let pfOpen = false;

  // Calcoli stati bulk toggle
  $: allProducts = get(products);
  $: total = allProducts.length;
  $: maxAll = total > 0 && allProducts.every((p) => p.activeToggle === 'SM');
  $: maxIndeterminate = total > 0 && allProducts.some((p) => p.activeToggle === 'SM') && !maxAll;
  $: scAll = total > 0 && allProducts.every((p) => p.activeToggle === 'SC');
  $: scIndeterminate = total > 0 && allProducts.some((p) => p.activeToggle === 'SC') && !scAll;
  $: pfAll = total > 0 && allProducts.every((p) => p.activeToggle === 'PF');
  $: pfIndeterminate = total > 0 && allProducts.some((p) => p.activeToggle === 'PF') && !pfAll;

  function bulkToggleType(type: ActiveToggle, onlyUnlocked = false) {
    openConfirm(
      `Applica ${type} a tutti`,
      `Confermi di applicare ${type} a tutti i prodotti?`,
      () =>
        products.update((arr) =>
          arr.map((p) =>
            onlyUnlocked && p.activeToggle === 'PF' ? p : { ...p, activeToggle: type }
          )
        )
    );
  }
  function bulkDisableAll() {
    openConfirm(
      'Rimuovi toggle su tutti',
      'Confermi di rimuovere tutti i toggle sui prodotti?',
      () => products.update((arr) => arr.map((p) => ({ ...p, activeToggle: 'NONE' })))
    );
  }
</script>

<div class="overflow-x-auto">
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
      <tr>
        <th class="px-4 py-2">Handle</th>
        <th class="px-4 py-2">SKU</th>
        <th class="px-4 py-2">Nome</th>
        <th class="px-4 py-2">Barcode</th>
        <th class="px-4 py-2">Costo €</th>
        <th class="px-4 py-2">IVA %</th>
        <th class="px-4 py-2">Prezzo Pieno €</th>

        <!-- Bulk SM -->
        <th class="relative px-4 py-2">
          <span
            role="button"
            tabindex="0"
            class="flex cursor-pointer items-center gap-2"
            aria-label="Toggle tutti SM"
            on:click={() => (smOpen = !smOpen)}
            on:keydown={(e) => e.key === 'Enter' && (smOpen = !smOpen)}
          >
            <DiscountToggle checked={maxAll} indeterminate={maxIndeterminate} />
            <span>Sconto Max</span>
          </span>
          <DropdownMenu isOpen={smOpen} setIsOpen={(v) => (smOpen = v)}>
            <DropdownMenuItem label="Attiva tutti" on:click={() => bulkToggleType('SM')} />
            <DropdownMenuItem
              label="Attiva solo sbloccati"
              on:click={() => bulkToggleType('SM', true)}
            />
            <DropdownMenuItem label="Disattiva tutti" on:click={bulkDisableAll} />
            <DropdownMenuItem label="Chiudi" on:click={() => (smOpen = false)} />
          </DropdownMenu>
        </th>

        <!-- Bulk SC -->
        <th class="relative px-4 py-2">
          <span
            role="button"
            tabindex="0"
            class="flex cursor-pointer items-center gap-2"
            aria-label="Toggle tutti SC"
            on:click={() => (scOpen = !scOpen)}
            on:keydown={(e) => e.key === 'Enter' && (scOpen = !scOpen)}
          >
            <DiscountToggle checked={scAll} indeterminate={scIndeterminate} />
            <span>Sconto Custom</span>
          </span>
          <DropdownMenu isOpen={scOpen} setIsOpen={(v) => (scOpen = v)}>
            <DropdownMenuItem label="Attiva tutti" on:click={() => bulkToggleType('SC')} />
            <DropdownMenuItem
              label="Attiva solo sbloccati"
              on:click={() => bulkToggleType('SC', true)}
            />
            <DropdownMenuItem label="Disattiva tutti" on:click={bulkDisableAll} />
            <DropdownMenuItem label="Chiudi" on:click={() => (scOpen = false)} />
          </DropdownMenu>
        </th>

        <!-- Bulk PF -->
        <th class="relative px-4 py-2">
          <span
            role="button"
            tabindex="0"
            class="flex cursor-pointer items-center gap-2"
            aria-label="Toggle tutti PF"
            on:click={() => (pfOpen = !pfOpen)}
            on:keydown={(e) => e.key === 'Enter' && (pfOpen = !pfOpen)}
          >
            <DiscountToggle checked={pfAll} indeterminate={pfIndeterminate} />
            <span>Prezzo Finale</span>
          </span>
          <DropdownMenu isOpen={pfOpen} setIsOpen={(v) => (pfOpen = v)}>
            <DropdownMenuItem label="Attiva tutti" on:click={() => bulkToggleType('PF')} />
            <DropdownMenuItem label="Disattiva tutti" on:click={bulkDisableAll} />
            <DropdownMenuItem label="Chiudi" on:click={() => (pfOpen = false)} />
          </DropdownMenu>
        </th>

        <th class="px-4 py-2">Giacenza</th>
        <th class="px-4 py-2">Sync</th>
        <th class="px-4 py-2">Ult. Agg.</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200 bg-white">
      {#each $products as product (product.handle)}
        <!-- passo solo product e onUpdate -->
        <ProductRow {product} onUpdate={handleUpdate} />
      {/each}
    </tbody>
  </table>

  {#if showConfirmModal}
    <ConfirmModal
      title={confirmTitle}
      message={confirmMessage}
      on:confirm={onConfirm}
      on:cancel={onCancel}
    />
  {/if}
</div>
