// src/lib/utils/exportCsv.ts
import PapaPkg from 'papaparse';
const { unparse } = PapaPkg;

/**
 * Converte un array di oggetti JSON in CSV utilizzando papaparse
 * @param data Array di record da esportare
 * @param fields Ordine e nomi delle colonne del CSV
 * @returns stringa CSV pronta per il download
 */
export function json2csv<T extends Record<string, unknown>>(data: T[], fields: string[]): string {
  return unparse({ fields, data });
}
