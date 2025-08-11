<script lang="ts">
  import { product, sm, pf } from '$lib/stores/product-store';
  import { userPreferences } from '$lib/stores/userPreferences';
  import { formatPrice } from '$lib/features/price/format-price';
</script>

<div class="space-y-[var(--space-4)] p-[var(--space-4)]">
  <h1 class="font-bold text-[var(--text-xl)]">Test Calcolo Prezzi</h1>

  <!-- Prezzo base -->
  <div>
    <label for="basePrice">Prezzo base (€):</label>
    <input id="basePrice" type="number" bind:value={$product.basePrice} />
  </div>

  <!-- Costo prodotto -->
  <div>
    <label for="costoProdotto">Costo prodotto (€):</label>
    <input id="costoProdotto" type="number" bind:value={$product.costoProdotto} />
  </div>

  <!-- IVA -->
  <div>
    <label for="iva">IVA (%):</label>
    <input id="iva" type="number" bind:value={$product.iva} />
  </div>

  <!-- Sconto Custom -->
  <div>
    <label for="sc">Sconto Custom (%):</label>
    <input id="sc" type="number" bind:value={$product.sc} />
  </div>

  <!-- Toggle -->
  <div>
    <label for="toggle">Modalità:</label>
    <select id="toggle" bind:value={$product.toggle}>
      <option value="none">Nessuno</option>
      <option value="SM">Sconto Massimo</option>
      <option value="SC">Sconto Custom</option>
      <option value="PF">Prezzo Finale Manuale</option>
    </select>
  </div>

  <!-- PF Manuale -->
  <div>
    <label for="pfManuale">PF Manuale (€):</label>
    <input id="pfManuale" type="number" bind:value={$product.pfManuale} />
  </div>

  <!-- Preferenze utente -->
  <h2 class="mt-[var(--space-4)] font-semibold">Preferenze utente globali</h2>

  <div>
    <label for="targetMargin">Margine target (%):</label>
    <input id="targetMargin" type="number" bind:value={$userPreferences.targetMarginPercent} />
  </div>

  <div>
    <label for="shippingCost">Costo spedizione (€):</label>
    <input id="shippingCost" type="number" bind:value={$userPreferences.shippingCost} />
  </div>

  <div>
    <label for="freeShippingThreshold">Soglia spedizione gratuita (€):</label>
    <input
      id="freeShippingThreshold"
      type="number"
      bind:value={$userPreferences.freeShippingThreshold}
    />
  </div>

  <div>
    <label for="limiteSM">Limite SM (%):</label>
    <input id="limiteSM" type="number" bind:value={$userPreferences.limiteSM} />
  </div>

  <!-- Output -->
  <div
    class="mt-[var(--space-4)] rounded-[var(--radius-md)] border border-[var(--color-border)] p-[var(--space-3)]"
  >
    <p><strong>Sconto Massimo (SM):</strong> {$sm}%</p>
    <p><strong>Prezzo Finale (PF):</strong> {formatPrice($pf)} €</p>
  </div>
</div>

<style>
  /* Miglior contrasto input */
  input,
  select {
    color: var(--color-text);
    background-color: var(--color-bg);
    border: 1px solid var(--color-border);
    padding: 0.4rem;
    border-radius: var(--radius-sm);
    width: 100%;
  }
</style>
