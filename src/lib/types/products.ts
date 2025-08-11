// src/lib/types/products.ts
export interface Product {
  handle: string;
  sku: string;
  name: string;
  barcode: string;
  /** Costo effettivo del prodotto */
  cost: number;
  /** Aliquota IVA (%) */
  iva: number;
  /** Prezzo pieno originale (List Price) */
  basePrice: number;
  /** Prezzo di vendita corrente (Sale Price) */
  salePrice: number;
  /** Quantità disponibile */
  stock: number;
  /** Stato di sincronizzazione */
  syncState: 'pending' | 'synced' | 'error';
  /** Data ultimo aggiornamento */
  updatedAt: Date;

  /** Toggle iniziale per Sconto Massimo (SM) */
  maxDiscountActive: boolean;

  /** Percentuale di sconto massimo calcolato */
  maxDiscountPct?: number;

  /** Percentuale di sconto custom inserito */
  customDiscountPct?: number;

  /** Prezzo bloccato manualmente */
  fixedPrice?: number;

  /** Toggle attivo sulla riga per SM, SC, PF o nessuno */
  activeToggle?: 'SM' | 'SC' | 'PF' | 'NONE';
}
