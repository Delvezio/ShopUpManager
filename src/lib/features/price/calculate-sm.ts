// src/lib/features/price/calculate-sm.ts
import type { Product } from '$lib/types/products';

/**
 * Calcola lo Sconto Massimo (SM) mantenendo il margine target.
 */
export function calculateSM(
  product: Product,
  utileTarget: number,
  costoMedioSpedizione: number,
  sogliaFree: number,
  limiteSM?: number
): number {
  const N = product.basePrice; // Prezzo lordo di listino
  const L = product.cost; // Costo netto fornitore
  const M = product.iva; // IVA (%)
  const Zperc = utileTarget; // % utile netto minimo desiderato
  const AA = costoMedioSpedizione; // Costo spedizione netto
  const AB = sogliaFree; // Soglia spedizione gratuita

  // Se dati mancanti o incoerenti, ritorno 0
  if (!N || !L || isNaN(N) || isNaN(L) || isNaN(M)) return 0;

  const Z = Zperc / 100;
  const netFactor = 100 / (100 + M);

  function marginPercent(Q: number): number {
    const U = N * (1 - Q);
    const qS = U < AB ? (U / AB) * AA : AA;
    const iva = (U * M) / (100 + M);
    const netRev = U - iva;
    const margin = netRev - L - qS;
    return margin / U;
  }

  // Protezione: se prezzo <= costo + spedizione, SM = 0
  if (N <= L + AA) return 0;

  const U_free = (L + AA) / (netFactor - Z);
  if (U_free >= AB && U_free <= N) {
    const sconto = 1 - U_free / N;
    return applyLimit(sconto * 100);
  }

  let lo = 0;
  let hi = 1;
  const tol = 1e-5;

  for (let i = 0; i < 40 && hi - lo > tol; i++) {
    const mid = (lo + hi) / 2;
    if (marginPercent(mid) >= Z) {
      lo = mid;
    } else {
      hi = mid;
    }
  }

  return applyLimit(lo * 100);

  function applyLimit(smPercent: number): number {
    if (typeof limiteSM === 'number') {
      return Math.min(smPercent, limiteSM);
    }
    return smPercent;
  }
}
