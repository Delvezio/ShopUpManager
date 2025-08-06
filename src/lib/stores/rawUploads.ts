// src/lib/stores/rawUploads.ts
import { writable } from 'svelte/store';

/** Rappresenta una singola riga di CSV: chiave=colonna, valore può essere stringa/numero/booleano */
export type CsvRow = Record<string, string | number | boolean>;

/** Ogni upload conserva:
 * - id: uuid
 * - filename: nome del file CSV
 * - data: array di righe parseate (CsvRow[])
 */
export interface UploadedFile {
  id: string;
  filename: string;
  data: CsvRow[];
}

export const rawUploads = writable<UploadedFile[]>([]);
