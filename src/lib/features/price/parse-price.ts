// src/lib/features/price/parse-price.ts

/**
 * Converte una stringa prezzo (con separatore decimali ",") in numero float.
 * Rimuove eventuali separatori migliaia.
 * @example parsePrice("1.234,50") => 1234.5
 */
export function parsePrice(value: string): number {
  if (!value) return 0;

  const normalized = value
    .replace(/\./g, '') // rimuove punti
    .replace(',', '.'); // converte la virgola in punto

  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
}
