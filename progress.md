# Progress Log - ShopUpManager

## Obiettivo MVP

**Funzionalità core**:

1. Autenticazione (login/register/forgot password)
2. Caricamento CSV e parsing
3. Popolazione tabella prodotti in dashboard
4. Export CSV filtrato con selezione colonne
5. Impostazioni utente (margine target, spesa di spedizione, soglia)
6. Integrazione futura con API Shopify per sync in blocco

---

## Cronologia delle attività

### Prima del supporto ChatGPT

- Configurazione progetto SvelteKit + TailwindCSS 4.1
- Inizializzazione git, branch `main` e `develop`
- Creazione `.gitignore`, setup PNPM/NPM, ESLint, Prettier
- Host del dominio `shopupmanager.com` & `.it` su TopHost
- Bozza Business Model Canvas e mappatura componenti in RTF

### Fase 1: Setup e Workflow Git

- Creazione repository GitHub `Delvezio/ShopUpManager` (privato → pubblico)
- Definizione branch strategy (`main`, `develop`, `feature/...`)
- Configurazione CI (lint, build) e Prettier in VS Code

### Fase 2: Store preferenze utente

- Implementato `src/lib/stores/userPreferences.ts` con persistenza in `localStorage`
- Creato `SettingsModal.svelte` e integrato nella sidebar

### Fase 3: Pulsanti e UI primitives

- Rifattorizzato `Button.svelte` per forwarding `onClick` e uso variabili CSS per palette
- Sostituiti tutti i `button` nativi con `<Button>` in sidebar e CSV form

### Fase 4: CSV Upload & Parsing

- Installato `papaparse` e creato `CSVUploadForm.svelte`
  - Apertura dialog, parsing CSV, correzione colonna duplicata (`Prezzo Pieno_1` → `Giacenza`)
  - Mappatura a oggetti `Product` e popolazione store `products`
  - Salvataggio raw in `rawUploads`
- Aggiornato tipo `CsvRow` e store `rawUploads` per includere `filename` e `data` come `CsvRow[]`

### Fase 5: Export CSV filtrato

- Creazione pagina `src/routes/export/[uploadId]/+page.svelte`
  - Derivazione di `uploadId`, `upload`, `headers`, `selectedColumns`
  - Controlli checkbox e tabella preview (prime 10 righe)
- Implementata utilità `exportCsv.ts` con `json2csv` usando default import di `papaparse`

### Fase 6: Flusso senza redirect

- Rimosso il `goto('/export/...')` da `CSVUploadForm.svelte`
- Caricamento CSV ora popola direttamente `products` e rimane su `/dashboard`

### Fase 7: Layout & Scrolling Tabella

- Aggiornato `DashboardLayout.svelte` per flex-col full-screen e `overflow-hidden`
- Modificato `/dashboard/+page.svelte` con header layout, form CSV e scroll fisso orizzontale/verticale
- Rifattorizzato wrapper in `ProductTable.svelte` per `overflow-x-auto` e `min-w-max`

### Fase 8: Toggle "Prezzo Custom"

- Esteso `ProductTable.svelte` con `let priceAll` e `toggleAllPrice`
- Aggiunta colonna e `<DiscountToggle>` globale per `customPriceActive`
- Integrazione in `ProductRow.svelte` con `handlePriceToggle`
- Aggiornata interfaccia `Product` con `customPriceActive?: boolean`

### Fase 9: Calcolo Sconto Max

- In `ProductRow.svelte` importate preferenze utente (`marginTarget`, `shippingCost`, `freeShippingThreshold`)
- Calcolato `costWithVat`, `shipImpact`, `minSale` e `maxDiscountPct`
- Aggiunta colonna `% Sconto Max` e logica per aggiornare `%` al toggle

### Fase 10: Logica radio toggle in ProductRow

- Riscrittura completa di `ProductRow.svelte` per comportamento radio fra le opzioni:
  - **Sconto Max**, **Sconto Custom**, **Prezzo Finale** come toggle esclusivi
  - Digitando in input Custom o Prezzo Finale si seleziona automaticamente l’opzione e si deselezionano le altre
  - Svuotando un input, il prezzo ritorna al `listPrice` o allo sconto precedente selezionato
  - Centralizzata funzione `computeSalePrice` per calcoli coerenti
- Prima implementazione terminata, da testare e affinare domani

---

## Stato attuale

- ✅ Layout dashboard e scroll tabella corretti
- ✅ Form CSV e pulsante “Carica CSV” funzionanti
- ✅ ProductTable e ProductRow aggiornati con toggle e calcoli Sconto Max
- 🔄 Logica radio toggle in ProductRow implementata, serve debug finale e affinamenti

## Prossimi passi

1. Affinare **ProductRow**: debug radio-toggle, badge superamento, clear input behavior
2. **SettingsModal**: rendere modificabili `marginTarget`, `shippingCost`, `freeShippingThreshold`
3. **UI Enhancement**: ordinamento, ricerca, paginazione nella tabella
4. **Export avanzato**: includere nuove colonne calcolate, opzione batch Shopify
5. **Visual Analytics**: grafici per analisi margini e sconti

---

## Nuove tasks toggle e prezzi

### Toggle prezzo per riga prodotto

- Creazione toggle stile iPhone con icone check/cross/lucchetto per Sconto Max (SM), Sconto Custom (SC), Prezzo Finale (PF)
- Gestione toggle esclusivi (solo uno attivo alla volta per riga)
- Toggle SC attivabile sia da input prezzo custom, sia da click toggle
- Toggle PF con lucchetto: blocca prezzo, disabilita ricalcolo; sblocco con alert conferma
- Alert modale se si prova ad attivare SM o SC con PF attivo

### Toggle attivatore colonna

- Toggle nella intestazione colonna per SM, SC, PF
- Riflette stato colonna (tutti accesi/spenti o parziale)
- Attivazione/disattivazione toggle di riga coerente con toggle colonna
- Al primo caricamento colonna SM attiva

### Calcolo prezzo reattivo e derivato

- Calcolo prezzo finale in base toggle attivo e valori sconto/margine
- Funzioni pure e store derivati per aggiornamenti efficienti

### Persistenza stato e dati prodotto

- Salvataggio stato toggle e prezzi modificati per prodotto (in localStorage o IndexedDB)
- Conservazione di SKU, Handle e Product Name modificato da utente
- Gestione “registrazione” handle all’import CSV e possibilità di riscrittura successiva

### Mini card filtro

- Visualizzazione badge con conteggi sconti attivi, prodotti nuovi
- Filtri attivabili cliccando badge per visualizzare tabella filtrata

---

## Prossimi passi roadmap

1. Prototipo Toggle UI + stato base riga e colonna
2. Calcolo prezzo e toggle esclusivi
3. Alert modale gestione PF e toggle rischiosi
4. Persistenza stato e dati prodotto
5. Mini card filtro

---
