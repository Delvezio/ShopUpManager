// src/lib/features/price/calculate-pf.ts

/**
 * Calcola il Prezzo Finale (PF) in euro.
 * Logica:
 * - Se toggle = "PF" → restituisce il prezzo manuale bloccato.
 * - Se toggle = "SC" → applica lo sconto custom sul prezzo base.
 * - Se toggle = "SM" → applica lo sconto massimo calcolato.
 * - Se nessuno attivo → restituisce il prezzo base.
 *
 * @param params - Oggetto con basePrice, sm, sc, toggle, pfManuale
 * @returns {number} PF arrotondato a 2 decimali
 */
export function calculatePF(params: {
  basePrice: number;
  sm: number;
  sc: number;
  toggle: 'SM' | 'SC' | 'PF' | 'none';
  pfManuale: number;
}): number {
  const { basePrice, sm, sc, toggle, pfManuale } = params;

  // Controllo input minimi validi
  if (basePrice <= 0) {
    return 0;
  }

  let prezzoFinale = basePrice;

  switch (toggle) {
    case 'PF':
      prezzoFinale = pfManuale;
      break;
    case 'SC':
      prezzoFinale = basePrice * (1 - sc / 100);
      break;
    case 'SM':
      prezzoFinale = basePrice * (1 - sm / 100);
      break;
    case 'none':
    default:
      prezzoFinale = basePrice;
      break;
  }

  return parseFloat(prezzoFinale.toFixed(2));
}
