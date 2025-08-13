// tests/calculate-sm-vs-sheets.test.ts
import { describe, it, expect } from 'vitest';
import { calculateSM } from '../src/lib/features/price/calculate-sm';
import type { Product } from '../src/lib/types/products';

// Parametri standard di test (valori di esempio dai documenti)
const UTILE_TARGET = 10; // utile netto minimo in €
const COSTO_MEDIO_SPEDIZIONE = 5; // costo medio spedizione in €
const SOGLIA_SPEDIZIONE_GRATIS = 120; // soglia free shipping in €
const LIMITE_SC_MAX = 50; // limite massimo sconto %

describe('calculateSM vs sheets', () => {
  it('calcola SM coerente con valori attesi', () => {
    const product: Product = {
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
      maxDiscountPct: undefined,
      customDiscountPct: undefined,
      fixedPrice: undefined,
      activeToggle: 'NONE',
      isPFBlocked: false,
      smActive: false,
      scActive: false,
      pfManuale: undefined
    };

    const sm = calculateSM(
      product,
      UTILE_TARGET,
      COSTO_MEDIO_SPEDIZIONE,
      SOGLIA_SPEDIZIONE_GRATIS,
      LIMITE_SC_MAX
    );

    // Verifica esempio: con questi valori SM dovrebbe essere > 0 e <= limite
    expect(sm).toBeGreaterThan(0);
    expect(sm).toBeLessThanOrEqual(LIMITE_SC_MAX);
  });
});
