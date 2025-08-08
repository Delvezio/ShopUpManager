<script lang="ts">
  import { products } from '$lib/stores/products';
  import type { Product } from '$lib/types/products';
  import DiscountToggle from '$lib/components/ui/discounttoggle/DiscountToggle.svelte';
  import ProductRow from './ProductRow.svelte';

  import ConfirmModal from '$lib/components/ui/modal/ConfirmModal.svelte';
  import DropdownMenu from '$lib/components/ui/dropdown/DropdownMenu.svelte';
  import DropdownMenuItem from '$lib/components/ui/dropdown/DropdownMenuItem.svelte';

  import { writable } from 'svelte/store';

  $: maxAll = $products.length > 0 && $products.every((p) => p.maxDiscountActive);
  $: maxIndeterminate = $products.some((p) => p.maxDiscountActive) && !maxAll;

  $: customAll = $products.length > 0 && $products.every((p) => p.customDiscountActive);
  $: customIndeterminate = $products.some((p) => p.customDiscountActive) && !customAll;

  $: priceAll = $products.length > 0 && $products.every((p) => p.customPriceActive);
  $: priceIndeterminate = $products.some((p) => p.customPriceActive) && !priceAll;

  const maxDropdownOpen = writable(false);
  const customDropdownOpen = writable(false);
  const priceDropdownOpen = writable(false);

  function toggleColumn(
    propToActivate: 'maxDiscountActive' | 'customDiscountActive' | 'customPriceActive',
    activate: boolean
  ): void {
    products.update((allProducts) =>
      allProducts.map((p) => ({
        ...p,
        maxDiscountActive: activate && propToActivate === 'maxDiscountActive',
        customDiscountActive: activate && propToActivate === 'customDiscountActive',
        customPriceActive: activate && propToActivate === 'customPriceActive',
        salePrice: calculateSalePrice(p, propToActivate, activate)
      }))
    );
  }

  function calculateSalePrice(product: Product, prop: keyof Product, activate: boolean): number {
    if (!activate) return product.listPrice;
    if (prop === 'maxDiscountActive') {
      const marginDecimal = 0.2;
      const costWithVat = product.costPrice * (1 + product.iva / 100);
      const minSale = (costWithVat + 5) / (1 - marginDecimal);
      const maxDiscountPct = Math.max(0, ((product.listPrice - minSale) / product.listPrice) * 100);
      return Math.round(product.listPrice * (1 - maxDiscountPct / 100) * 100) / 100;
    } else if (prop === 'customDiscountActive') {
      const pct = product.customDiscountPct ?? 0;
      return Math.round(product.listPrice * (1 - pct / 100) * 100) / 100;
    } else if (prop === 'customPriceActive') {
      return product.salePrice;
    }
    return product.listPrice;
  }

  function onClickMaxToggle() {
    if (maxIndeterminate) {
      maxDropdownOpen.set(true);
    } else {
      toggleColumn('maxDiscountActive', !maxAll);
    }
  }

  function activateAllMax() {
    toggleColumn('maxDiscountActive', true);
    maxDropdownOpen.set(false);
  }
  function deactivateAllMax() {
    toggleColumn('maxDiscountActive', false);
    maxDropdownOpen.set(false);
  }
  function closeMaxDropdown() {
    maxDropdownOpen.set(false);
  }

  function onClickCustomToggle() {
    if (customIndeterminate) {
      customDropdownOpen.set(true);
    } else {
      toggleColumn('customDiscountActive', !customAll);
    }
  }

  function activateAllCustom() {
    toggleColumn('customDiscountActive', true);
    customDropdownOpen.set(false);
  }
  function deactivateAllCustom() {
    toggleColumn('customDiscountActive', false);
    customDropdownOpen.set(false);
  }
  function closeCustomDropdown() {
    customDropdownOpen.set(false);
  }

  function onClickPriceToggle() {
    if (priceIndeterminate) {
      priceDropdownOpen.set(true);
    } else {
      toggleColumn('customPriceActive', !priceAll);
    }
  }

  function activateAllPrice() {
    toggleColumn('customPriceActive', true);
    priceDropdownOpen.set(false);
  }
  function deactivateAllPrice() {
    toggleColumn('customPriceActive', false);
    priceDropdownOpen.set(false);
  }
  function closePriceDropdown() {
    priceDropdownOpen.set(false);
  }

  function handleUpdate(updated: Product): void {
    products.update((allProducts) =>
      allProducts.map((p) => (p.handle === updated.handle ? updated : p))
    );
  }
</script>

<div class="relative overflow-x-auto bg-white shadow-sm">
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
        <th class="relative px-4 py-2 text-left">
          <div
            class="flex cursor-pointer items-center gap-2 select-none"
            on:click={onClickMaxToggle}
            role="button"
            tabindex="0"
            on:keydown={(e) => e.key === 'Enter' && onClickMaxToggle()}
          >
            <DiscountToggle
              checked={maxAll}
              indeterminate={maxIndeterminate}
              ariaLabel="Toggle tutti Sconto Max"
              className="pointer-events-none"
            />
            <span>Sconto Max</span>
          </div>

          <DropdownMenu isOpen={$maxDropdownOpen} setIsOpen={(v) => maxDropdownOpen.set(v)}>
            <DropdownMenuItem
              href="#"
              label="Attiva tutto"
              on:click={(e) => {
                e.preventDefault();
                activateAllMax();
              }}
            />
            <DropdownMenuItem
              href="#"
              label="Disattiva tutto"
              on:click={(e) => {
                e.preventDefault();
                deactivateAllMax();
              }}
            />
            <DropdownMenuItem
              href="#"
              label="Chiudi"
              on:click={(e) => {
                e.preventDefault();
                closeMaxDropdown();
              }}
            />
          </DropdownMenu>
        </th>

        <!-- Colonna Sconto Custom -->
        <th class="relative px-4 py-2 text-left">
          <div
            class="flex cursor-pointer items-center gap-2 select-none"
            on:click={onClickCustomToggle}
            role="button"
            tabindex="0"
            on:keydown={(e) => e.key === 'Enter' && onClickCustomToggle()}
          >
            <DiscountToggle
              checked={customAll}
              indeterminate={customIndeterminate}
              ariaLabel="Toggle tutti Sconto Custom"
              className="pointer-events-none"
            />
            <span>Sconto Custom</span>
          </div>

          <DropdownMenu isOpen={$customDropdownOpen} setIsOpen={(v) => customDropdownOpen.set(v)}>
            <DropdownMenuItem
              href="#"
              label="Attiva tutto"
              on:click={(e) => {
                e.preventDefault();
                activateAllCustom();
              }}
            />
            <DropdownMenuItem
              href="#"
              label="Disattiva tutto"
              on:click={(e) => {
                e.preventDefault();
                deactivateAllCustom();
              }}
            />
            <DropdownMenuItem
              href="#"
              label="Chiudi"
              on:click={(e) => {
                e.preventDefault();
                closeCustomDropdown();
              }}
            />
          </DropdownMenu>
        </th>

        <!-- Colonna Prezzo Finale -->
        <th class="relative px-4 py-2 text-left">
          <div
            class="flex cursor-pointer items-center gap-2 select-none"
            on:click={onClickPriceToggle}
            role="button"
            tabindex="0"
            on:keydown={(e) => e.key === 'Enter' && onClickPriceToggle()}
          >
            <DiscountToggle
              checked={priceAll}
              indeterminate={priceIndeterminate}
              ariaLabel="Toggle tutti Prezzo Finale"
              className="pointer-events-none"
            />
            <span>Prezzo Finale</span>
          </div>

          <DropdownMenu isOpen={$priceDropdownOpen} setIsOpen={(v) => priceDropdownOpen.set(v)}>
            <DropdownMenuItem
              href="#"
              label="Attiva tutto"
              on:click={(e) => {
                e.preventDefault();
                activateAllPrice();
              }}
            />
            <DropdownMenuItem
              href="#"
              label="Disattiva tutto"
              on:click={(e) => {
                e.preventDefault();
                deactivateAllPrice();
              }}
            />
            <DropdownMenuItem
              href="#"
              label="Chiudi"
              on:click={(e) => {
                e.preventDefault();
                closePriceDropdown();
              }}
            />
          </DropdownMenu>
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
