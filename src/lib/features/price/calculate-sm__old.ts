// src/lib/features/price/calculate-sm.ts

/**
 * Calcola lo Sconto Massimo (SM) in percentuale basandosi sulla logica di Google Sheets.
 *
 * Considera:
 * - Prezzo base lordo (basePrice)
 * - Costo netto prodotto (costoProdotto)
 * - IVA %
 * - Margine target minimo desiderato (utileTarget %)
 * - Costo medio spedizione (costoMedioSpedizione)
 * - Soglia di spedizione gratuita (sogliaFree)
 * - Limite massimo di SM (%) - opzionale
 *
 * Ritorna: numero (percentuale di sconto, es: 20 significa 20%)
 */
export function calculateSM(params: {
  basePrice: number;
  costoProdotto: number;
  iva: number;
  utileTarget: number;
  costoMedioSpedizione: number;
  sogliaFree: number;
  limiteSM?: number; // Se non passato, nessun limite
}): number {
  const {
    basePrice: N, // Prezzo lordo di listino
    costoProdotto: L, // Costo netto fornitore
    iva: M, // IVA (%)
    utileTarget: Zperc, // % utile netto minimo desiderato
    costoMedioSpedizione: AA, // Costo spedizione netto
    sogliaFree: AB, // Soglia spedizione gratuita
    limiteSM // Limite massimo SM (%)
  } = params;

  // Se dati mancanti o incoerenti, ritorno 0
  if (!N || !L || isNaN(N) || isNaN(L) || isNaN(M)) return 0;

  const Z = Zperc / 100; // utile target in decimale
  const netFactor = 100 / (100 + M); // per rimuovere IVA

  // Funzione interna per calcolare margine % dato uno sconto Q (decimale)
  function marginPercent(Q: number): number {
    const U = N * (1 - Q); // prezzo scontato lordo
    const qS = U < AB ? (U / AB) * AA : AA; // ammortamento spedizione
    const iva = (U * M) / (100 + M); // quota IVA
    const netRev = U - iva; // ricavo netto
    const margin = netRev - L - qS;
    const smFinal = margin / U; // margine % netto;
    return Math.round(smFinal * 100) / 100;
  }

  // Caso semplice: prezzo con spedizione piena >= soglia free
  const U_free = (L + AA) / (netFactor - Z);
  if (U_free >= AB && U_free <= N) {
    const sconto = 1 - U_free / N;
    return applyLimit(sconto * 100); // ritorna %
  }

  // Caso generale: ricerca binaria per trovare Q che rispetta margine target
  let lo = 0;
  let hi = 1;
  const tol = 1e-5;
  let mid = 0;

  for (let i = 0; i < 40 && hi - lo > tol; i++) {
    mid = (lo + hi) / 2;
    if (marginPercent(mid) >= Z) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  return applyLimit(lo * 100); // ritorna %

  // Applica limite SM se presente
  function applyLimit(smPercent: number): number {
    if (typeof limiteSM === 'number') {
      return Math.min(smPercent, limiteSM);
    }
    return smPercent;
  }
}
