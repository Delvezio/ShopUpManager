// tests/calculate-sm.test.ts
import { describe, it, expect } from 'vitest';
import { calculateSMForTest as calculateSM } from '../src/lib/features/price/calculate-sm-test-version';

describe('Calcolo SM - allineamento con Google Sheets', () => {
  const casiTest = [
    {
      input: {
        basePrice: 100,
        costoProdotto: 50,
        iva: 22,
        utileTarget: 20,
        costoMedioSpedizione: 8,
        sogliaFree: 50,
        limiteSM: 100
      },
      atteso: 6.4
    },
    {
      input: {
        basePrice: 80,
        costoProdotto: 40,
        iva: 10,
        utileTarget: 25,
        costoMedioSpedizione: 5,
        sogliaFree: 60,
        limiteSM: 100
      },
      atteso: 14.66
    },
    {
      input: {
        basePrice: 120,
        costoProdotto: 70,
        iva: 4,
        utileTarget: 15,
        costoMedioSpedizione: 10,
        sogliaFree: 100,
        limiteSM: 100
      },
      atteso: 18.02 // aggiornato per Google Sheets
    },
    {
      input: {
        basePrice: 60,
        costoProdotto: 30,
        iva: 22,
        utileTarget: 10,
        costoMedioSpedizione: 7,
        sogliaFree: 70,
        limiteSM: 100
      },
      atteso: 19.31 // aggiornato per Google Sheets
    },
    {
      input: {
        basePrice: 200,
        costoProdotto: 150,
        iva: 22,
        utileTarget: 30,
        costoMedioSpedizione: 15,
        sogliaFree: 150,
        limiteSM: 100
      },
      atteso: 0.0
    }
  ];

  casiTest.forEach(({ input, atteso }, idx) => {
    it(`Caso #${idx + 1}`, () => {
      const mappedInput = {
        basePrice: input.basePrice,
        costoProdotto: input.costoProdotto,
        iva: input.iva,
        costoSpedizione: input.costoMedioSpedizione,
        sogliaSpedGratis: input.sogliaFree,
        margineTarget: input.utileTarget,
        limiteSM: input.limiteSM
      };

      const result = calculateSM(mappedInput);
      const attesoArrotondato = Math.round(atteso * 100) / 100;
      expect(result).toBeCloseTo(attesoArrotondato, 2);
    });
  });
});
