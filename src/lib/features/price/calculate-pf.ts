// src/lib/features/price/calculate-pf.ts
import type { Product } from '../../types/products';

/**
 * Calcola il Prezzo Finale (PF) in base alle regole di priorità:
 * 1. PF bloccato → usa pfManuale
 * 2. SC attivo → basePrice - sconto custom
 * 3. SM attivo → basePrice - sconto massimo
 * 4. Nessuno attivo → basePrice
 */
export function calculatePF(product: Product): number {
  if (product.isPFBlocked && product.pfManuale !== undefined) {
    return roundToTwo(product.pfManuale);
  }

  if (product.scActive && product.customDiscountPct !== undefined) {
    return roundToTwo(product.basePrice * (1 - product.customDiscountPct / 100));
  }

  if (product.smActive && product.maxDiscountPct !== undefined) {
    return roundToTwo(product.basePrice * (1 - product.maxDiscountPct / 100));
  }

  return roundToTwo(product.basePrice);
}

/**
 * Arrotonda a due decimali
 */
function roundToTwo(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
