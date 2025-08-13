// tests/calculate-price.spec.ts
import { describe, it, expect } from 'vitest';
import { calculatePF } from '../src/lib/features/price/calculate-pf';
import { calculateSM } from '../src/lib/features/price/calculate-sm';
import type { Product } from '../src/lib/types/products';

const baseProduct: Product = {
  handle: 'test',
  sku: 'SKU123',
  name: 'Prodotto Test',
  barcode: '123456789',
  cost: 50,
  iva: 22,
  basePrice: 100,
  salePrice: 100,
  stock: 10,
  syncState: 'synced',
  updatedAt: new Date(),
  maxDiscountActive: false,
  maxDiscountPct: 20,
  customDiscountPct: 10,
  fixedPrice: undefined,
  activeToggle: 'NONE',
  isPFBlocked: false,
  smActive: false,
  scActive: false,
  pfManuale: undefined
};

describe('calculatePF', () => {
  it('usa PF manuale se bloccato', () => {
    const p = { ...baseProduct, isPFBlocked: true, pfManuale: 80 };
    expect(calculatePF(p)).toBe(80);
  });

  it('applica SC se attivo', () => {
    const p = { ...baseProduct, scActive: true };
    expect(calculatePF(p)).toBe(90); // 100 - 10%
  });

  it('applica SM se attivo', () => {
    const p = { ...baseProduct, smActive: true };
    expect(calculatePF(p)).toBe(80); // 100 - 20%
  });

  it('nessun toggle → basePrice', () => {
    expect(calculatePF(baseProduct)).toBe(100);
  });
});

describe('calculateSM', () => {
  it('restituisce 0 se utile netto < utile target', () => {
    const p = { ...baseProduct, cost: 95 };
    expect(calculateSM(p, 10, 5, 120, 50)).toBe(0);
  });

  it('calcola SM corretto e limita al limiteSM', () => {
    const p = { ...baseProduct, cost: 50 };
    const sm = calculateSM(p, 10, 5, 120, 15);
    expect(sm).toBeLessThanOrEqual(15);
  });

  it('considera costo spedizione se sotto sogliaFree', () => {
    const p = { ...baseProduct, basePrice: 80, cost: 40 };
    const smWithShip = calculateSM(p, 10, 5, 120, 50);
    const smWithoutShip = calculateSM(p, 10, 0, 120, 50);
    expect(smWithShip).toBeLessThan(smWithoutShip);
  });
});
