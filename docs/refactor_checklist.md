# ShopUpManager — Refactor Checklist

## 1. Atomizzazione logica di calcolo prezzi

- ✅ [DONE] Spostare tutto il calcolo SM, SC, PF in funzioni pure in `src/lib/features/price/`
- ✅ [DONE] Creare file: `calculate-sm.ts`, `calculate-pf.ts`, `format-price.ts`, `parse-price.ts`
- ✅ [DONE] Garantire che ogni funzione non abbia side-effect e sia testabile singolarmente
- ✅ [DONE] Aggiungere test unitari per edge cases (arrotondamenti, margini negativi, costo spedizione ammortizzato)
  · (Abbiamo aggiustato i test SM fino ad allinearli con Google Sheets e logica attuale ShopUpManager)

## 2. Isolamento logica toggle/modali

⚠ Nota: Non ancora toccato, da affrontare in una sessione unica.

- [TODO] Creare `src/lib/features/toggle/toggle-manager.ts` per gestione stato riga/colonna
- [TODO] Gestire stato misto e trigger modali solo in questa logica
- [TODO] Coprire con test unitari (senza UI)

## 3. Componenti UI iper-riutilizzabili

💡 Suggerimento: partire da Button.svelte così possiamo fare QA visivo più facilmente.

- [IN-PROGRESS] Completare `Button.svelte` con varianti, size, stati (`loading`, `disabled`)
- [TODO] Completare `Input.svelte` con stato errore e icone via slot
- [TODO] Completare `Checkbox.svelte` con stati `checked`, `unchecked`, `indeterminate`
- [TODO] Completare `DropdownMenu.svelte` con roving tabindex, ESC close, click-outside
- [TODO] Completare `ConfirmModal.svelte` con focus trap e ritorno focus trigger
- [TODO] Creare pagina `src/routes/dev/preview-ui.svelte` per QA visivo

## 4. Pulizia & ottimizzazione cartelle

⚠ Nota: Può essere fatta in parallelo al lavoro UI.

- [TODO] Rimuovere cartelle duplicate o temporanee (`H1` in Progress Atomic)
- [TODO] Aggiornare `.gitignore` per build output, temp, backup file
- [TODO] Spostare documentazione interna in `/docs`

## 5. Preparazione per Fase 2 (Persistenza + API)

- [TODO] Creare `src/lib/stores/persistence.ts` con API `get`, `set`, `remove`
- [TODO] Usare LocalStorage ora e predisporre per IndexedDB in futuro
- [TODO] Preparare mock API Shopify per test E2E
  📌 Serve anche definire schema dati minimo per mock.

## 6. Test e QA

- [TODO] QA visivo componenti UI su `src/routes/dev/preview-ui.svelte`
- ✅ [DONE] Test unitari per funzioni `features/price/`
- [TODO] Test component toggle/modali
- [TODO] Test E2E: upload CSV → tabella (edit/toggle) → export CSV
