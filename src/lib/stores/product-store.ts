// src/lib/stores/product-store.ts
import { writable, derived } from 'svelte/store';
import { calculateSM } from '$lib/features/price/calculate-sm';
import { calculatePF } from '$lib/features/price/calculate-pf';
import { userPreferences } from '$lib/stores/userPreferences';

/**
 * Store del prodotto corrente.
 * Contiene tutti i dati necessari per calcolare SM e PF.
 *
 * Campi:
 * - basePrice: Prezzo di listino (€)
 * - costoProdotto: Costo di acquisto del prodotto (€)
 * - iva: Aliquota IVA (%) applicata al prodotto
 * - utileTarget: Margine utile minimo desiderato (%) → sovrascritto da userPreferences
 * - costoMedioSpedizione: Costo medio spedizione (€) → sovrascritto da userPreferences
 * - sogliaFree: Soglia per spedizione gratuita (€) → sovrascritto da userPreferences
 * - limiteSM: Sconto massimo consentito (%)
 * - sc: Sconto custom definito dall’utente (%)
 * - toggle: Quale modalità di calcolo è attiva:
 *    "SM"  → applica Sconto Massimo
 *    "SC"  → applica Sconto Custom
 *    "PF"  → usa Prezzo Finale manuale
 *    "none"→ nessuno sconto applicato
 * - pfManuale: Prezzo finale inserito manualmente dall’utente (€)
 */
export const product = writable({
  basePrice: 0,
  costoProdotto: 0,
  iva: 22,
  utileTarget: 20, // verrà sostituito dal valore in userPreferences.targetMarginPercent
  costoMedioSpedizione: 0, // verrà sostituito da userPreferences.shippingCost
  sogliaFree: 0, // verrà sostituito da userPreferences.freeShippingThreshold
  limiteSM: 50,
  sc: 0,
  toggle: 'none' as 'SM' | 'SC' | 'PF' | 'none',
  pfManuale: 0
});

/**
 * Store derivato che combina i dati del prodotto con le preferenze globali dell’utente.
 *
 * Funzionamento:
 * - Ogni volta che cambia `product` o `userPreferences`, questo store viene ricalcolato.
 * - Sovrascrive i valori `utileTarget`, `costoMedioSpedizione` e `sogliaFree`
 *   con quelli salvati nelle preferenze utente.
 *
 * Vantaggio:
 * - Non serve aggiornare manualmente questi campi nel prodotto.
 * - Tutti i calcoli SM/PF riflettono in tempo reale le impostazioni globali.
 */
const productWithPrefs = derived([product, userPreferences], ([$product, $prefs]) => ({
  ...$product,
  utileTarget: $prefs.targetMarginPercent,
  costoMedioSpedizione: $prefs.shippingCost,
  sogliaFree: $prefs.freeShippingThreshold,
  limiteSM: $prefs.limiteSM
}));

/**
 * Store derivato per calcolare lo Sconto Massimo (SM) in tempo reale.
 *
 * Funzionamento:
 * - Riceve in input `productWithPrefs` (quindi già con i valori aggiornati dalle preferenze utente).
 * - Usa la funzione pura `calculateSM` per calcolare lo sconto massimo applicabile.
 * - Se il margine utile non può essere mantenuto, restituisce 0.
 */
export const sm = derived(productWithPrefs, ($product) => calculateSM($product));

/**
 * Store derivato per calcolare il Prezzo Finale (PF) in tempo reale.
 *
 * Funzionamento:
 * - Dipende da `productWithPrefs` e dal valore `sm`.
 * - Usa `calculatePF` per determinare il prezzo finale da mostrare:
 *    1. Se toggle = "PF" → usa `pfManuale`.
 *    2. Se toggle = "SC" → applica SC al basePrice.
 *    3. Se toggle = "SM" → applica SM al basePrice.
 *    4. Se toggle = "none" → restituisce basePrice senza sconto.
 * - Arrotonda sempre a 2 decimali.
 */
export const pf = derived([productWithPrefs, sm], ([$product, $sm]) =>
  calculatePF({ ...$product, sm: $sm })
);
