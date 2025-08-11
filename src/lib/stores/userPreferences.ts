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
    freeShippingThreshold: 50
  };

  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<UserPreferences>;
        return { ...defaults, ...parsed };
      } catch {
        // parsing fallito, ricadi sui default
      }
    }
  }

  return defaults;
}

/**
 * Crea lo store di UserPreferences con persistenza in localStorage
 */
function createUserPreferencesStore() {
  const { subscribe, set, update } = writable<UserPreferences>(getInitialPreferences());

  // Sincronizza localStorage ad ogni aggiornamento
  subscribe((prefs) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(prefs));
    }
  });

  return {
    subscribe,
    /** Aggiorna il margine target e persiste */
    setTargetMarginPercent: (value: number) =>
      update((p) => ({ ...p, targetMarginPercent: value })),
    /** Aggiorna il costo di spedizione e persiste */
    setShippingCost: (value: number) => update((p) => ({ ...p, shippingCost: value })),
    /** Aggiorna la soglia di spedizione gratuita e persiste */
    setFreeShippingThreshold: (value: number) =>
      update((p) => ({ ...p, freeShippingThreshold: value })),
    /** Ripristina ai valori di default */
    reset: () => set(getInitialPreferences())
  };
}

/**
 * Store globale delle preferenze utente
 */
export const userPreferences = createUserPreferencesStore();
