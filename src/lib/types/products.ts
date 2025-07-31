// src/lib/types/products.ts
export interface Product {
  handle: string;
  sku: string;
  name: string;
  barcode: string;
  costPrice: number;
  listPrice: number;
  salePrice: number;
  stock: number;
  syncState: 'ok' | 'pending' | 'error';
  updatedAt: Date;
  maxDiscountActive: boolean;
  customDiscountActive: boolean;
  customDiscountPct?: number;
}
