// src/lib/stores/userPreferences.ts
import { writable } from 'svelte/store';

/**
 * Rappresenta le preferenze utente per il calcolo dei prezzi
 */
export interface UserPreferences {
  /** Margine target in percentuale */
  targetMarginPercent: number;
  /** Costo medio di spedizione in euro */
  shippingCost: number;
  /** Soglia per spedizione gratuita in euro */
  freeShippingThreshold: number;
  /** Limite massimo di Sconto Massimo (SM) in percentuale */
  limiteSM: number;
}

const LOCAL_STORAGE_KEY = 'shopup_user_preferences';

/**
 * Carica le preferenze da localStorage o usa i valori di default,
 * garantendo che tutte le chiavi siano sempre definite
 */
function getInitialPreferences(): UserPreferences {
  const defaults: UserPreferences = {
    targetMarginPercent: 20,
    shippingCost: 8,
    freeShippingThreshold: 50,
    limiteSM: 50 // valore di default
  };

  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<UserPreferences>;
        return { ...defaults, ...parsed };
      } catch {
        return defaults;
      }
    }
  }
  return defaults;
}

/**
 * Store reattivo delle preferenze utente
 */
export const userPreferences = writable<UserPreferences>(getInitialPreferences());

/**
 * Salva automaticamente le preferenze in localStorage ad ogni modifica
 */
userPreferences.subscribe((value) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
  }
});

/**
 * Funzioni helper per aggiornare singole proprietà delle preferenze
 */
export const setTargetMarginPercent = (value: number) =>
  userPreferences.update((prefs) => ({ ...prefs, targetMarginPercent: value }));

export const setShippingCost = (value: number) =>
  userPreferences.update((prefs) => ({ ...prefs, shippingCost: value }));

export const setFreeShippingThreshold = (value: number) =>
  userPreferences.update((prefs) => ({ ...prefs, freeShippingThreshold: value }));

export const setLimiteSM = (value: number) =>
  userPreferences.update((prefs) => ({ ...prefs, limiteSM: value }));
