import { describe, it, expect } from 'vitest';
import { calculateSMForTest as calculateSM } from '../src/lib/features/price/calculate-sm-test-version';

describe('Calcolo SM - allineamento con logica attuale ShopUpManager', () => {
  const casiTest = [
    {
      input: {
        basePrice: 100,
        costoProdotto: 50,
        iva: 22,
        margineTarget: 20,
        costoSpedizione: 8,
        sogliaSpedGratis: 50,
        limiteSM: 100
      },
      atteso: 6.4
    },
    {
      input: {
        basePrice: 80,
        costoProdotto: 40,
        iva: 10,
        margineTarget: 25,
        costoSpedizione: 5,
        sogliaSpedGratis: 60,
        limiteSM: 100
      },
      atteso: 14.65
    },
    {
      input: {
        basePrice: 120,
        costoProdotto: 70,
        iva: 4,
        margineTarget: 15,
        costoSpedizione: 10,
        sogliaSpedGratis: 100,
        limiteSM: 100
      },
      atteso: 18.02
    },
    {
      input: {
        basePrice: 60,
        costoProdotto: 30,
        iva: 22,
        margineTarget: 10,
        costoSpedizione: 7,
        sogliaSpedGratis: 70,
        limiteSM: 100
      },
      atteso: 19.31
    },
    {
      input: {
        basePrice: 200,
        costoProdotto: 150,
        iva: 22,
        margineTarget: 30,
        costoSpedizione: 15,
        sogliaSpedGratis: 150,
        limiteSM: 100
      },
      atteso: 0.0
    }
  ];

  casiTest.forEach(({ input, atteso }, idx) => {
    it(`Caso #${idx + 1}`, () => {
      const result = calculateSM(input);
      expect(result).toBeCloseTo(atteso, 2);
    });
  });
});
