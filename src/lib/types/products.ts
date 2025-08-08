// src/lib/types/products.ts
export interface Product {
  handle: string;
  sku: string;
  name: string;
  barcode: string;
  costPrice: number;
  iva: number;
  listPrice: number;
  salePrice: number;
  stock: number;
  syncState: 'pending' | 'synced' | 'error';
  updatedAt: Date;
  maxDiscountActive: boolean;
  customDiscountActive: boolean;
  /** Percentuale di sconto calcolata per mantenere il margine target */
  maxDiscountPct?: number;
  /** Abilita prezzo manuale (lock) */
  customPriceActive: boolean; // <-- rimosso ?
  /** Percentuale di sconto manuale inserita */
  customDiscountPct?: number;
}
