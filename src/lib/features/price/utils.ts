// src/lib/features/price/utils.ts

/**
 * Arrotonda un numero a 2 decimali.
 * @param num - valore numerico da arrotondare
 * @returns numero arrotondato a 2 decimali
 */
export function round2(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

/**
 * Parametri per il calcolo dello Sconto Massimo (SM%).
 */
export interface CalculateMaxDiscountParams {
  cost: number; // costo prodotto
  vatPercent: number; // aliquota IVA (%)
  basePrice: number; // prezzo base di vendita (opzionale per estensione)
  targetMarginPercent: number; // utile minimo garantito (%)
  avgShippingCost: number; // costo medio spedizione (EUR)
  freeShipThreshold: number; // soglia carrello per spedizione gratuita (EUR)
  maxDiscountLimitPercent: number; // limite massimo sconto store (%)
}

/**
 * Calcola lo Sconto Massimo (SM%) basato sui parametri forniti.
 * Limita il valore a maxDiscountLimitPercent e lo arrotonda a 2 decimali.
 */
export function calculateMaxDiscount(params: CalculateMaxDiscountParams): number {
  const { targetMarginPercent, avgShippingCost, freeShipThreshold, maxDiscountLimitPercent } =
    params;

  // 1. percentuale di spedizione sul prodotto (in %) basata su soglia carrello
  const shippingPercent = freeShipThreshold > 0 ? (avgShippingCost / freeShipThreshold) * 100 : 0;

  // 2. margine disponibile dopo aver garantito utile target e coperto spedizione
  let maxDisc = 100 - targetMarginPercent - shippingPercent;

  // non negativo
  if (maxDisc < 0) {
    maxDisc = 0;
  }

  // applica limite massimo store
  if (maxDisc > maxDiscountLimitPercent) {
    maxDisc = maxDiscountLimitPercent;
  }

  return round2(maxDisc);
}

/**
 * Stato del toggle attivo per riga.
 */
export type ActiveToggle = 'SM' | 'SC' | 'PF' | 'NONE';

/**
 * Parametri per il calcolo del Prezzo Finale (PF).
 */
export interface CalculateFinalPriceParams {
  basePrice: number; // prezzo pieno
  maxDiscount: number; // SM% calcolato
  customDiscount: number; // SC% inserito
  fixedPrice?: number; // PF bloccato (valore assoluto)
  activeToggle: ActiveToggle;
}

/**
 * Calcola il Prezzo Finale (PF) in base al toggle attivo:
 * - 'PF': usa fixedPrice se presente
 * - 'SC': basePrice * (1 - customDiscount/100)
 * - 'SM': basePrice * (1 - maxDiscount/100)
 * - 'NONE': basePrice
 * Arrotonda il risultato a 2 decimali.
 */
export function calculateFinalPrice({
  basePrice,
  maxDiscount,
  customDiscount,
  fixedPrice,
  activeToggle
}: CalculateFinalPriceParams): number {
  let price: number;
  switch (activeToggle) {
    case 'PF':
      price = fixedPrice !== undefined ? fixedPrice : basePrice;
      break;
    case 'SC':
      price = basePrice * (1 - customDiscount / 100);
      break;
    case 'SM':
      price = basePrice * (1 - maxDiscount / 100);
      break;
    default:
      price = basePrice;
  }
  return round2(price);
}
