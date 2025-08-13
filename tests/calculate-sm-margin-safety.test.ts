// tests/calculate-sm-margin-safety.test.ts

import { describe, it, expect } from 'vitest';
import { calculateSM } from '../src/lib/features/price/calculate-sm';
import type { Product } from '../src/lib/types/products';

describe('Calcolo SM - protezione margine in casi limite', () => {
  const casiTest = [
    {
      nome: 'Prezzo uguale al costo prodotto → SM deve essere 0',
      input: {
        basePrice: 100,
        costoProdotto: 100,
        iva: 22,
        costoSpedizione: 10,
        sogliaSpedGratis: 100,
        margineTarget: 20,
        limiteSM: 100
      },
      atteso: 0
    },
    {
      nome: 'Prezzo inferiore al costo prodotto → SM deve essere 0',
      input: {
        basePrice: 80,
        costoProdotto: 100,
        iva: 22,
        costoSpedizione: 10,
        sogliaSpedGratis: 100,
        margineTarget: 20,
        limiteSM: 100
      },
      atteso: 0
    },
    {
      nome: 'Prezzo appena sopra costo + spedizione → SM minimo',
      input: {
        basePrice: 120,
        costoProdotto: 100,
        iva: 22,
        costoSpedizione: 15,
        sogliaSpedGratis: 150,
        margineTarget: 20,
        limiteSM: 100
      },
      attesoMin: 0,
      attesoMax: 5
    }
  ];

  casiTest.forEach(({ nome, input, atteso, attesoMin, attesoMax }) => {
    it(nome, () => {
      const mockProduct: Product = {
        handle: '',
        sku: '',
        name: '',
        barcode: '',
        cost: input.costoProdotto,
        iva: input.iva,
        basePrice: input.basePrice,
        salePrice: input.basePrice,
        stock: 0,
        syncState: 'synced',
        updatedAt: new Date(),
        maxDiscountActive: false,
        maxDiscountPct: undefined,
        customDiscountPct: undefined,
        fixedPrice: undefined,
        activeToggle: 'NONE',
        smActive: false,
        scActive: false,
        isPFBlocked: false,
        pfManuale: undefined
      };

      const smCalcolato = calculateSM(
        mockProduct,
        input.margineTarget,
        input.costoSpedizione,
        input.sogliaSpedGratis,
        input.limiteSM
      );

      if (typeof atteso !== 'undefined') {
        expect(smCalcolato).toBeCloseTo(atteso, 2);
      } else {
        expect(smCalcolato).toBeGreaterThanOrEqual(attesoMin!);
        expect(smCalcolato).toBeLessThanOrEqual(attesoMax!);
      }
    });
  });
});
