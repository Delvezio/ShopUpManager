// tests/calculate-sm-vs-sheets.test.ts
import { describe, it, expect } from 'vitest';
import { calculateSM as calculateSMShopUp } from '../src/lib/features/price/calculate-sm';
import { calculateSMForTest as calculateSMGoogleSheets } from '../src/lib/features/price/calculate-sm-test-version';

describe('Confronto ShopUpManager vs Google Sheets', () => {
  const casiTest = [
    {
      basePrice: 100,
      costoProdotto: 50,
      iva: 22,
      utileTarget: 20,
      costoMedioSpedizione: 8,
      sogliaFree: 50,
      limiteSM: 100
    },
    {
      basePrice: 80,
      costoProdotto: 40,
      iva: 10,
      utileTarget: 25,
      costoMedioSpedizione: 5,
      sogliaFree: 60,
      limiteSM: 100
    },
    {
      basePrice: 120,
      costoProdotto: 70,
      iva: 4,
      utileTarget: 15,
      costoMedioSpedizione: 10,
      sogliaFree: 100,
      limiteSM: 100
    },
    {
      basePrice: 60,
      costoProdotto: 30,
      iva: 22,
      utileTarget: 10,
      costoMedioSpedizione: 7,
      sogliaFree: 70,
      limiteSM: 100
    },
    {
      basePrice: 200,
      costoProdotto: 150,
      iva: 22,
      utileTarget: 30,
      costoMedioSpedizione: 15,
      sogliaFree: 150,
      limiteSM: 100
    }
  ];

  casiTest.forEach((input, idx) => {
    it(`Caso #${idx + 1}`, () => {
      // Calcolo con logica attuale ShopUpManager
      const smShopUp = calculateSMShopUp(input);

      // Calcolo con logica Google Sheets (mappando i nomi dei campi)
      const smSheets = calculateSMGoogleSheets({
        basePrice: input.basePrice,
        costoProdotto: input.costoProdotto,
        iva: input.iva,
        costoSpedizione: input.costoMedioSpedizione,
        sogliaSpedGratis: input.sogliaFree,
        margineTarget: input.utileTarget,
        limiteSM: 100 // o un valore di default che vuoi usare nei test
      });

      console.log(`\nCaso #${idx + 1}:`);
      console.log(`  ShopUpManager SM: ${smShopUp.toFixed(2)}%`);
      console.log(`  Google Sheets SM: ${smSheets.toFixed(2)}%`);
      console.log(`  Differenza: ${(smShopUp - smSheets).toFixed(2)}%`);

      expect(Number.isFinite(smShopUp)).toBe(true);
      expect(Number.isFinite(smSheets)).toBe(true);
    });
  });
});
