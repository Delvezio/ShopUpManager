// src/lib/features/toggle/toggle-types.ts
export type ToggleType = 'SM' | 'SC' | 'PF' | 'NONE';
export type ColumnToggleState = 'ON' | 'OFF' | 'MIXED';

export interface UserPreferences {
  iva: number;
  utileTarget: number;
  costoMedioSpedizione: number;
  sogliaFree: number;
  limiteSM: number;
}

export interface ProductRowState {
  id: string;
  basePrice: number; // Prezzo pieno
  cost: number; // Costo prodotto
  pf: number; // Prezzo finale corrente
  pfManuale: number; // Prezzo finale bloccato
  pfLocked: boolean; // PF bloccato manualmente
  sm: number | null; // Sconto massimo %
  sc: number | null; // Sconto custom %
  activeToggle: ToggleType; // ✅ Toggle attivo rinominato
}
