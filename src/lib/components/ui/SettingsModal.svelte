<script lang="ts">
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { userPreferences } from '$lib/stores/userPreferences';

  // proprietà in ingresso: isOpen e callback onClose
  export let isOpen: boolean = false;
  export let onClose: () => void = () => {};

  let marginTarget: number = 20;
  let shippingCost: number = 8;
  let freeShippingThreshold: number = 50;

  onMount(() => {
    const prefs = get(userPreferences);
    marginTarget = prefs.marginTarget;
    shippingCost = prefs.shippingCost;
    freeShippingThreshold = prefs.freeShippingThreshold;
  });

  function close() {
    onClose();
  }

  function save() {
    userPreferences.setMarginTarget(marginTarget);
    userPreferences.setShippingCost(shippingCost);
    userPreferences.setFreeShippingThreshold(freeShippingThreshold);
    close();
  }
</script>

{#if isOpen}
  <div class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
    <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <h2 class="mb-4 text-xl font-semibold">Impostazioni utente</h2>
      <div class="space-y-4">
        <div>
          <label for="marginTarget" class="mb-1 block text-sm font-medium">
            Margine target (%)
          </label>
          <input
            id="marginTarget"
            type="number"
            bind:value={marginTarget}
            min="0"
            class="w-full rounded border border-gray-300 p-2"
          />
        </div>
        <div>
          <label for="shippingCost" class="mb-1 block text-sm font-medium">
            Costo di spedizione (€)
          </label>
          <input
            id="shippingCost"
            type="number"
            bind:value={shippingCost}
            min="0"
            step="0.01"
            class="w-full rounded border border-gray-300 p-2"
          />
        </div>
        <div>
          <label for="freeShippingThreshold" class="mb-1 block text-sm font-medium">
            Soglia spedizione gratuita (€)
          </label>
          <input
            id="freeShippingThreshold"
            type="number"
            bind:value={freeShippingThreshold}
            min="0"
            step="0.01"
            class="w-full rounded border border-gray-300 p-2"
          />
        </div>
      </div>
      <div class="mt-6 flex justify-end space-x-2">
        <button on:click={close} class="rounded-xl border px-4 py-2">Annulla</button>
        <button on:click={save} class="rounded-xl bg-blue-600 px-4 py-2 text-white">Salva</button>
      </div>
    </div>
  </div>
{/if}
