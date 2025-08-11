# ShopUpManager — Progress

## 🎯 Obiettivo MVP

Realizzare la prima versione funzionante di **ShopUpManager**, un SaaS per farmacie e parafarmacie online che:

1. Riceve e carica CSV da gestionale/Farmadati (manuale o FTP).
2. Aggiorna selettivamente titoli, prezzi, giacenze e SEO senza sovrascrivere modifiche user-friendly.
3. Gestisce sconti automatici e personalizzati con logica di margine minimo.
4. Esporta CSV pulito per Shopify.
5. Presenta un’interfaccia modulare sviluppata in **SvelteKit + TailwindCSS 4.1**, con componenti UI riutilizzabili e configurazione CSS semantica.

---

## 📅 Cronologia sintetica

- **Inizio progetto**: definizione stack (SvelteKit + Tailwind 4.1), configurazione iniziale.
- **UI Base**: creazione pagina login con immagine laterale, accesso social, link modulari, checkbox, pulsanti.
- **Dashboard**: impostata struttura a 3 colonne con card modulari per funzioni principali.
- **Gestione prodotti**: creata `ProductTable.svelte` e `ProductRow.svelte` con campi editabili inline, toggle, dropdown e modale conferma.
- **Logica prezzi**: implementata struttura per “Sconto Max” e “Sconto Custom” con calcolo condizionato.
- **Configurazione semantica Tailwind**: palette colori, token CSS per spaziatura, radius, tipografia, ombre, breakpoints.
- **Documentazione UI**: creato `docs/ui_rules.md` con linee guida per coerenza componenti.
- **Testing UI**: evidenziata necessità di QA visivo per ogni componente.

---

## 🔍 Focus corrente

- Rifinitura UI con token CSS da `app.css` e standard `docs/ui_rules.md`.
- Atomizzazione sviluppo componenti per garantire test e stabilità prima dell’integrazione.
- Revisione e riallineamento di tutti i componenti UI a nomenclatura e token semantici.
- Definizione **Progress_Atomic.md** per tracciamento dettagliato task.

---

## 📌 Prossimi passi

1. **UI Tokens** — Applicare i token CSS (`app.css`) a tutti i componenti esistenti.
2. **QA Componenti** — Creare pagine di anteprima con varianti per ogni componente.
3. **Gestione sconti** — Completare logica edge cases e test unitari per “Sconto Max” e “Sconto Custom”.
4. **Performance CSV** — Ottimizzare parsing per file grandi.
5. **Progress Atomico** — Implementare flusso di lavoro atomico per l’agente, aggiornando file e task giornalmente.
6. **Integrazione API Shopify** — Mock API e poi connessione reale per sync prodotti.

---

## 🛠 Macro Roadmap

**Fase 1 — Struttura & UI base** ✅

- Configurazione progetto (SvelteKit + TailwindCSS 4.1).
- Login page, dashboard base, ProductTable v1.

**Fase 2 — Gestione dati prodotti** 🔄

- Caricamento CSV manuale.
- Editing inline e salvataggio stato.
- Calcolo sconti base.

**Fase 3 — UI Semantica & QA** ⏳

- Implementazione token CSS.
- Revisione componenti UI con QA visivo.

**Fase 4 — Automazioni & API**

- Parsing ottimizzato CSV grandi.
- Sync bidirezionale con Shopify API.

**Fase 5 — MVP rilascio beta**

- Deploy su hosting.
- Test con utenti pilota (farmacie/parafarmacie).
- Raccolta feedback e bugfix.
