// scripts/update-sm-expected.ts
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { calculateSMForTest as calculateSM } from '../src/lib/features/price/calculate-sm-test-version.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Percorso del file di test da aggiornare
const testFilePath = path.resolve(__dirname, '../tests/calculate-sm.test.ts');
let testFileContent = fs.readFileSync(testFilePath, 'utf-8');

// Regex per catturare i valori attesi
const regex = /atteso:\s*([0-9.]+)/g;

let match;
let index = 0;

while ((match = regex.exec(testFileContent)) !== null) {
  const attesoCorrente = parseFloat(match[1]);

  // Estrarre i dati del caso di test
  const inputRegex = new RegExp(
    `input:\\s*{[^}]*basePrice:\\s*([0-9.]+),\\s*[^}]*costoProdotto:\\s*([0-9.]+),\\s*[^}]*iva:\\s*([0-9.]+),\\s*[^}]*utileTarget:\\s*([0-9.]+),\\s*[^}]*costoMedioSpedizione:\\s*([0-9.]+),\\s*[^}]*sogliaFree:\\s*([0-9.]+),\\s*[^}]*limiteSM:\\s*([0-9.]+)`,
    'm'
  );

  const caseMatch = inputRegex.exec(testFileContent.slice(match.index - 300, match.index + 300));
  if (!caseMatch) {
    console.error(`⚠️  Impossibile trovare input per caso ${index + 1}`);
    continue;
  }

  const [, basePrice, costoProdotto, iva, utileTarget, costoMedioSpedizione, sogliaFree, limiteSM] =
    caseMatch.map(Number);

  // Calcolo nuovo atteso
  const nuovoAtteso = calculateSM({
    basePrice,
    costoProdotto,
    iva,
    costoSpedizione: costoMedioSpedizione,
    sogliaSpedGratis: sogliaFree,
    margineTarget: utileTarget,
    limiteSM
  });

  const nuovoAttesoRounded = Math.round(nuovoAtteso * 100) / 100;

  console.log(`Caso #${index + 1}: ${attesoCorrente} → ${nuovoAttesoRounded}`);

  // Aggiorno il testo
  testFileContent = testFileContent.replace(
    `atteso: ${attesoCorrente}`,
    `atteso: ${nuovoAttesoRounded}`
  );

  index++;
}

fs.writeFileSync(testFilePath, testFileContent, 'utf-8');
console.log('✅ File di test aggiornato con nuovi valori attesi');
