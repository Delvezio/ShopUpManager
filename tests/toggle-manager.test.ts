// tests/toggle-manager.test.ts
import { describe, it, expect } from 'vitest';
import {
  setRowToggle,
  handleSCInputChange,
  handlePFInputChange
} from '../src/lib/features/toggle/toggle-manager';
import type { Product } from '../src/lib/types/products';

function createMockProduct(overrides: Partial<Product> = {}): Product {
  return {
    handle: 'p1',
    sku: 'sku1',
    name: 'Test Product',
    barcode: '123456',
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
    pfManuale: undefined,
    smActive: false,
    scActive: false,
    ...overrides
  };
}

describe('toggle-manager logic', () => {
  it('PF attivo disattiva SM e SC', () => {
    const product = createMockProduct({ smActive: true, scActive: true });
    const { newRow } = setRowToggle(product, 'PF');
    expect(newRow.activeToggle).toBe('PF');
    expect(newRow.smActive).toBe(false);
    expect(newRow.scActive).toBe(false);
    expect(newRow.isPFBlocked).toBe(true);
  });

  it('SC attivo disattiva SM', () => {
    const product = createMockProduct({ smActive: true });
    const { newRow } = setRowToggle(product, 'SC', { force: true });
    expect(newRow.activeToggle).toBe('SC');
    expect(newRow.scActive).toBe(true);
    expect(newRow.smActive).toBe(false);
  });

  it('SM attivo disattiva SC', () => {
    const product = createMockProduct({ scActive: true });
    const { newRow } = setRowToggle(product, 'SM', { force: true });
    expect(newRow.activeToggle).toBe('SM');
    expect(newRow.smActive).toBe(true);
    expect(newRow.scActive).toBe(false);
  });

  it('Nessuno attivo → PF = basePrice', () => {
    const product = createMockProduct({ basePrice: 120 });
    const { newRow } = setRowToggle(product, 'NONE', { force: true });
    expect(newRow.pfManuale).toBe(120);
  });

  it('Digitazione SC attiva SC', () => {
    const product = createMockProduct();
    const { newRow } = handleSCInputChange(product, 15, { force: true });
    expect(newRow.scActive).toBe(true);
    expect(newRow.activeToggle).toBe('SC');
    expect(newRow.customDiscountPct).toBe(15);
  });

  it('Digitazione PF attiva PF bloccato', () => {
    const product = createMockProduct();
    const { newRow } = handlePFInputChange(product, 95);
    expect(newRow.activeToggle).toBe('PF');
    expect(newRow.isPFBlocked).toBe(true);
    expect(newRow.pfManuale).toBe(95);
  });
});
