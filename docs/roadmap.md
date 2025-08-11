# ShopUpManager — Roadmap piatta (atomizzata con stato)

## Fase 1 — MVP

- [DONE] Implementare upload CSV e parsing con PapaParse (client)
- [DONE] Gestione normalizzazione dati CSV lato server
- [DONE] Mantenere naming user-friendly nei prodotti esistenti
- [DONE] Implementare ProductTable con righe (ProductRow) e celle modulari
- [IN-PROGRESS] Gestione toggle SM/SC/PF (logica radio per colonna e per riga)
- [IN-PROGRESS] Gestione modali conferma “solo sbloccati” (colonna e riga)
- [IN-PROGRESS] Input inline per SC% e PF€ (checkinput da rivedere per digitazione diretta)
- [IN-PROGRESS] Logica ricalcolo PF in base a SM o SC attivo
- [TODO] Export CSV “pulito” con applicazione corretta di SM/SC/PF
- [TODO] Implementare SettingsModal per preferenze globali (utile target, costo spedizione, soglia free shipping)

## Calcolo prezzi (Price Logic)

- [DONE] Funzione di calcolo SM base
- [IN-PROGRESS] Gestione edge cases nel calcolo SM (arrotondamenti, margini negativi)
- [IN-PROGRESS] Applicazione SM in tabella con aggiornamento reattivo PF
- [TODO] Blocco PF manuale e logica di priorità rispetto a SM e SC
- [TODO] Validazioni su input numerici e percentuali

## Fase 2 — Usabilità & Persistenza

- [TODO] Filtri avanzati in tabella (marca, tag, margine, stato toggle)
- [TODO] Ordinamento e ricerca in tabella
- [TODO] Paginazione dati
- [TODO] Card metriche dashboard (margine medio, prodotti in perdita, ecc.)
- [TODO] Persistenza stato toggle/SC/PF su IndexedDB
- [TODO] Funzione undo snapshot (restore stato precedente)

## Fase 3 — Beta con integrazione

- [TODO] Implementare autenticazione (Lucia) con ruoli utente
- [TODO] Integrazione API Shopify per aggiornamento selettivo prodotti
- [TODO] Audit log modifiche (storico aggiornamenti)
- [TODO] Report marginalità e analisi vendite

## Testing

- [DONE] Test unitari calcolo SM/PF base
- [TODO] Test unitari edge cases calcolo SM/PF
- [TODO] Test component per modali, toggle, input numerici
- [TODO] Test E2E: upload CSV → tabella → export CSV
