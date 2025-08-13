// src/lib/features/toggle/toggle-manager.ts

import { calculatePF } from '../price/calculate-pf';
import type { Product } from '../../types/products';

/**
 * Stato possibile di una colonna toggle (usato per header tabella)
 */
export type ColumnToggleState = 'ON' | 'OFF' | 'MIXED';

/**
 * Risultato di un'azione di toggle
 */
interface ToggleActionResult {
  newRow: Product;
  requireConfirm: boolean;
  confirmMessage?: string;
}

/**
 * Imposta il toggle di una singola riga secondo la logica documentata
 */
export function setRowToggle(
  row: Product,
  type: NonNullable<Product['activeToggle']>,
  options?: { force?: boolean }
): ToggleActionResult {
  let requireConfirm = false;
  let confirmMessage = '';
  const newRow: Product = { ...row };

  // === PF Attivo ===
  if (type === 'PF') {
    newRow.activeToggle = 'PF';
    newRow.isPFBlocked = true;
    newRow.smActive = false;
    newRow.scActive = false;
    return {
      newRow: recalcPF(newRow, { manualPF: true }),
      requireConfirm: false
    };
  }

  // === Attivazione SM ===
  if (type === 'SM') {
    if (row.isPFBlocked && !options?.force) {
      requireConfirm = true;
      confirmMessage = 'Sei sicuro di voler sbloccare questo prezzo? Il valore verrà modificato.';
      return { newRow: row, requireConfirm, confirmMessage };
    }
    newRow.activeToggle = 'SM';
    newRow.smActive = true;
    newRow.scActive = false;
    newRow.isPFBlocked = false;
  }

  // === Attivazione SC ===
  if (type === 'SC') {
    if (row.isPFBlocked && !options?.force) {
      requireConfirm = true;
      confirmMessage = 'Sbloccando il prezzo, lo Sconto Custom verrà applicato.';
      return { newRow: row, requireConfirm, confirmMessage };
    }
    newRow.activeToggle = 'SC';
    newRow.scActive = true;
    newRow.smActive = false;
    newRow.isPFBlocked = false;
  }

  // === Nessuno attivo ===
  if (type === 'NONE') {
    if (row.isPFBlocked && !options?.force) {
      requireConfirm = true;
      confirmMessage =
        'Sbloccando il prezzo, verrà applicato lo sconto massimo o custom se attivi.';
      return { newRow: row, requireConfirm, confirmMessage };
    }
    newRow.activeToggle = 'NONE';
    newRow.smActive = false;
    newRow.scActive = false;
    newRow.isPFBlocked = false;
  }

  return {
    newRow: recalcPF(newRow),
    requireConfirm
  };
}

/**
 * Digitazione in input SC → attiva SC (se PF attivo, modale)
 */
export function handleSCInputChange(
  row: Product,
  newValue: number,
  options?: { force?: boolean }
): ToggleActionResult {
  const newRow: Product = { ...row, customDiscountPct: newValue };

  if (!row.scActive) {
    if (row.isPFBlocked && !options?.force) {
      return {
        newRow: row,
        requireConfirm: true,
        confirmMessage: 'Sbloccando il prezzo, verrà applicato lo Sconto Custom.'
      };
    }
    newRow.scActive = true;
    newRow.smActive = false;
    newRow.isPFBlocked = false;
    newRow.activeToggle = 'SC';
  }

  return { newRow: recalcPF(newRow), requireConfirm: false };
}

/**
 * Digitazione in input PF → attiva PF bloccato
 */
export function handlePFInputChange(row: Product, newValue: number): ToggleActionResult {
  const newRow: Product = { ...row, pfManuale: newValue, isPFBlocked: true, activeToggle: 'PF' };
  newRow.smActive = false;
  newRow.scActive = false;
  return { newRow: recalcPF(newRow, { manualPF: true }), requireConfirm: false };
}

/**
 * Ricalcolo PF con priorità PF bloccato > SC > SM > basePrice
 */
function recalcPF(row: Product, opts?: { manualPF?: boolean }): Product {
  const updatedRow: Product = {
    ...row,
    isPFBlocked: opts?.manualPF || row.isPFBlocked
  };

  return {
    ...updatedRow,
    pfManuale: calculatePF(updatedRow)
  };
}

/**
 * Calcola stato colonna
 */
export function syncColumnStateFromRows(
  rows: Product[],
  type: NonNullable<Product['activeToggle']>
): ColumnToggleState {
  const activeCount = rows.filter((r) => r.activeToggle === type).length;
  if (activeCount === 0) return 'OFF';
  if (activeCount === rows.length) return 'ON';
  return 'MIXED';
}

/**
 * Azione bulk colonna
 */
export function setColumnToggle(
  rows: Product[],
  type: NonNullable<Product['activeToggle']>,
  options?: { onlyUnlocked?: boolean; force?: boolean }
): { updatedRows: Product[]; requireConfirm: boolean } {
  let requireConfirm = false;
  const updatedRows = rows.map((row) => {
    if (options?.onlyUnlocked && row.isPFBlocked) return row;
    const result = setRowToggle(row, type, { force: options?.force });
    if (result.requireConfirm) requireConfirm = true;
    return result.newRow;
  });
  return { updatedRows, requireConfirm };
}
