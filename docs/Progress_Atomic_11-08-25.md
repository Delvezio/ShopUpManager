# ShopUpManager — Progress_Atomic

## Principio

Ogni micro-task deve essere eseguita, testata e documentata in una singola conversazione con l’agente.  
Il completamento comporta:

1. Aggiornamento del codice nei file indicati.
2. Testing funzionale e visivo (QA).
3. Aggiornamento di questo file.
4. Aggiornamento file correlati nell’agente (zip progetto, UI rules, ecc.).
5. Push su GitHub (se previsto).

---

## Macro-Aree e Micro-Task

### A — Configurazione Progetto

**Obiettivo:** Base stabile per SvelteKit + Tailwind 4.1 con setup semantico e documentazione.

1. **Setup base SvelteKit** — `TODO`
   - Inizializzazione progetto, routing + layout, test build/dev server.

2. **TailwindCSS 4.1** — `IN-PROGRESS`
   - Definizione palette/token in `src/app.css` (colori, spaziature, tipografia, radius, ombre, ring, transition).
   - Verifica classi semantiche funzionanti su un componente di test.

3. **Documentazione UI** — `IN-PROGRESS`
   - `docs/ui_rules.md` creato e allineato a `app.css`.
   - Verifica di coerenza su un componente reale.

---

### B — Componenti UI Base (UI Tokens Applicati)

**Obiettivo:** Componenti riutilizzabili, semantici e testati.

B1. **Button** — `IN-PROGRESS`  
Path: `src/lib/components/ui/button/Button.svelte`

- Varianti: primary | secondary | ghost | destructive
- Size: sm | md | lg — State: loading | disabled
- **Testing**: pagina preview + QA responsive

B2. **Input** — `TODO`  
Path: `src/lib/components/ui/input/Input.svelte`

- Stati: normal | error — icone via slot
- **Testing**: mini form demo

B3. **Checkbox** — `IN-PROGRESS`  
Path: `src/lib/components/ui/checkbox/Checkbox.svelte`

- Stati: checked | unchecked | indeterminate
- **Testing**: a11y tastiera + SR

B4. **Dropdown** — `IN-PROGRESS`  
Path: `src/lib/components/ui/dropdown/DropdownMenu.svelte`

- a11y: roving tabindex, aria-expanded, ESC, click-outside
- **Testing**: tastiera + focus management

B5. **Modal** — `IN-PROGRESS`  
Path: `src/lib/components/ui/modal/ConfirmModal.svelte`

- Focus trap, ritorno focus al trigger, scroll lock
- **Testing**: SR + tastiera

---

### C — Pagine Principali

**Obiettivo:** Struttura UI principale.

C1. **Login Page** — `IN-PROGRESS`

- Immagine laterale, social login (stub), link modulari (`AuthLink`), responsive test

C2. **Dashboard** — `IN-PROGRESS`

- Layout 3 colonne, card modulari, token CSS applicati

---

### D — Gestione Prodotti (Tabella + Prezzi)

**Obiettivo:** Tabella prodotti con editing inline e logica prezzi stabile.

#### D1. Tabella: struttura & colonne — `DONE`

- `ProductTable.svelte`, `ProductRow.svelte`
- Colonne: Handle, SKU, Nome, Barcode, Costo, Prezzo pieno, PF (calcolato/bloccato), Giacenza, Stato Sync, Ultimo update, %SM, %SC

#### D2. Toggle di riga/colonna (radio logic) — `IN-PROGRESS`

- Solo un toggle attivo per riga: **SM / SC / PF / Nessuno**
- Sincronizzazione con stato colonna (on/off/misto)

#### D3. Modali conferma “solo sbloccati” — `IN-PROGRESS`

- Mostrare opzione solo se esistono PF bloccati nella selezione corrente
- Gestire batch azioni colonna

#### D4. Input inline SC% e PF€ — `IN-PROGRESS`

- Editing numerico con tastiera, validazioni, update store

#### D5. Calcolo **SM** (Sconto Massimo) — `IN-PROGRESS`

- `src/lib/features/price/utils.ts`
- Edge cases: arrotondamenti, margini impossibili, costo spedizione ammortizzato, soglia free shipping

#### D6. Calcolo **PF** (Prezzo Finale) — `IN-PROGRESS`

- Priorità: PF bloccato > SC attivo > SM attivo > basePrice
- Ricalcolo automatico su cambio SC/SM/parametri globali

#### D7. Dropdown azioni colonna — `IN-PROGRESS`

- Opzioni condizionali in stato misto, “attiva solo sbloccati” quando sensato

#### D8. Ordinamento & ricerca base — `TODO`

- Sort per colonna (asc/desc)
- Ricerca testuale su nome/SKU/handle

#### D9. Filtri base — `TODO`

- Filtri rapidi: marca, tag, margine utile, stato toggle

#### D10. Persistenza locale stato riga — `TODO`

- Salvataggio SC/PF/toggle per prodotto (localStorage/IndexedDB)

---

### E — Gestione CSV

**Obiettivo:** Import/export robusto e performante.

E1. **Upload CSV manuale** — `DONE`

- Parsing (PapaParse), feedback UI, correzione colonne duplicate

E2. **Elaborazione & merge** — `IN-PROGRESS`

- Merge con dati esistenti; mantenere SC/PF; gestione SKU mancanti

E3. **Export CSV “pulito”** — `TODO`

- Solo campi necessari a Shopify; compatibilità formati (virgola decimali)
- QA su import in Shopify

---

### F — Testing e QA

**Obiettivo:** Tutto testato prima dell’integrazione finale.

F1. **Preview componenti UI** — `IN-PROGRESS`

- Pagina showcase varianti/stati per Button, Input, Checkbox, Dropdown, Modal

F2. **Test unit price utils** — `IN-PROGRESS`

- Base già coperta; aggiungere edge cases SM/PF

F3. **Test component** — `TODO`

- Modali, toggle, input numerici

F4. **Test E2E** — `TODO`

- Flusso: upload CSV → tabella (edit/toggle) → export CSV

---

## Template di Task Atomico

### YYYY-MM-DD — [MacroArea].[ID].[Titolo]

**Fatto**

- [feat/refactor/fix] …

**Test**

- [pass/fail] … (descrizione test eseguiti)

**Note**

- …

**File aggiornati**

- …

**File da aggiornare nell’agente**

- …

**Prossimo passo**

- …

---

## 2025-08-11 — Chiusura branch refactor/project-structure

**Fatto**
- Unito il branch `refactor/project-structure` su `main`.
- Completata la riorganizzazione della struttura del progetto (cartelle, naming, separazione logica).
- Allineata UI a `ui_rules.md` e `app.css`.

**Note**
- Restano aperti i lavori su componenti UI base, pulizia file/cartelle e QA visivo/test.

**Prossimo passo**
- Aprire i seguenti branch tematici e completare i micro-task associati.

---

### G — Rifinitura UI Base (`feature/ui-polish`)

**Obiettivo:** Completare componenti UI base e garantire coerenza con `ui_rules.md`.

G1. **Button refinements** — `TODO`
- Verifica varianti, stati e comportamento responsive.
- QA visivo + test component.

G2. **Input component completamento** — `TODO`
- Stati: normal | error, icone via slot.
- QA visivo + test.

G3. **Checkbox completamento** — `TODO`
- Stati: checked | unchecked | indeterminate.
- QA visivo + test.

G4. **Dropdown completamento** — `TODO`
- Aggiungere focus management e roving tabindex.
- QA visivo + test.

---

### H — Pulizia progetto (`chore/cleanup`)

**Obiettivo:** Rimuovere doppioni, cartelle temporanee e file inutili.

H1. **Rimuovere cartella duplicata `ShopUpManager/`** — `TODO`
- Verifica contenuto e backup se necessario.

H2. **Aggiungere `docs/` a GitHub** — `TODO`
- Commit e push.

H3. **Aggiornare `.gitignore`** — `TODO`
- Escludere file temporanei, build e cartelle inutili.

---

### I — QA e Test (`test/ui-qa`)

**Obiettivo:** QA visivo e test automatici per tutti i componenti UI e logica prezzi.

I1. **QA visivo componenti UI** — `TODO`
- Pagina showcase varianti/stati.

I2. **Test unit price utils edge cases** — `TODO`
- Arrotondamenti, margini negativi, ecc.

I3. **Test component toggle/modali** — `TODO`
- Comportamento con SC/SM/PF attivi.

I4. **Test E2E flusso CSV** — `TODO`
- Upload → tabella (edit/toggle) → export.
