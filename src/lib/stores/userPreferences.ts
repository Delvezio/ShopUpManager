import { writable } from 'svelte/store';

export interface UserPreferences {
  marginTarget: number;          // Margine target in %
  shippingCost: number;          // Costo di spedizione in €
  freeShippingThreshold: number; // Soglia per spedizione gratuita in €
}

const LOCAL_STORAGE_KEY = 'shopup_user_preferences';

// Carica le preferenze da localStorage o usa i valori di default
function getInitialPreferences(): UserPreferences {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        // se il parsing fallisce, ricadi sui default
      }
    }
  }
  return {
    marginTarget: 20,
    shippingCost: 8,
    freeShippingThreshold: 50
  };
}

function createUserPreferencesStore() {
  const { subscribe, set, update } = writable<UserPreferences>(getInitialPreferences());

  // Ogni volta che cambia lo store, aggiorna localStorage
  subscribe((prefs) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(prefs));
    }
  });

  return {
    subscribe,
    setMarginTarget: (value: number) =>
      update((p) => ({ ...p, marginTarget: value })),
    setShippingCost: (value: number) =>
      update((p) => ({ ...p, shippingCost: value })),
    setFreeShippingThreshold: (value: number) =>
      update((p) => ({ ...p, freeShippingThreshold: value })),
    reset: () => set(getInitialPreferences())
  };
}

export const userPreferences = createUserPreferencesStore();
