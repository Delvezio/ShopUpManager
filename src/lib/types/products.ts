// src/lib/types/products.ts
export interface Product {
  handle: string;
  sku: string;
  name: string;
  barcode: string;
  cost: number;
  iva: number;
  basePrice: number;
  salePrice: number;
  stock: number;
  syncState: 'pending' | 'synced' | 'error';
  updatedAt: Date;

  maxDiscountActive: boolean;
  maxDiscountPct?: number;
  customDiscountPct?: number;
  fixedPrice?: number;
  activeToggle?: 'SM' | 'SC' | 'PF' | 'NONE';
  sm?: number;
  sc?: number;
  pfManuale?: number;
  isPFBlocked?: boolean;

  /** Nuovi toggle booleani per PF */
  scActive?: boolean; // Sconto Custom attivo
  smActive?: boolean; // Sconto Massimo attivo
}
