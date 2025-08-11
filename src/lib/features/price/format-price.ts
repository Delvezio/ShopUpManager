// src/lib/features/price/format-price.ts

/**
 * Formatta un numero in stringa prezzo con separatore migliaia "." e virgola come separatore decimali.
 * @example formatPrice(1234.5) => "1.234,50"
 */
export function formatPrice(value: number): string {
  if (isNaN(value)) return '0,00';

  return value
    .toFixed(2) // due decimali
    .replace('.', ',') // virgola come separatore decimale
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // punti per migliaia
}
