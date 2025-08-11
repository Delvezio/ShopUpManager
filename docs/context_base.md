# ShopUpManager — Contesto stabile (v2)

## Scopo

ShopUpManager è una web app SaaS rivolta inizialmente a **Farmacie e Parafarmacie** su Shopify.  
Consente di:

- Importare CSV da gestionale/Farmadati
- Conservare naming user-friendly
- Calcolare **Sconto Massimo (SM)** per mantenere utile target ammortizzando costi spedizione
- Gestire **Sconto Custom (SC)** e **Prezzo Finale (PF)** bloccato
- Esportare CSV “pulito” o aggiornare via API Shopify

## Target

MVP per piccole/medie realtà su Shopify → estensione a altri CMS e settori.

## Stack

- **App**: SvelteKit + TypeScript
- **UI**: Tailwind CSS 4.1 (CSS-first, variabili @theme), Lucide Icons
- **State**: Svelte stores
- **CSV**: PapaParse client; parsing/normalizzazione server
- **DB** (fase 2): Postgres (Supabase/Neon) + Prisma
- **Auth** (fase 2): Lucia + OAuth
- **Test**: Vitest + Testing Library
- **CI**: GitHub Actions

## Convenzioni

- File componenti: PascalCase.svelte
- Utils/store: kebab-case.ts
- Palette semantica Tailwind in @theme
- Commit: Conventional Commits (un commit per micro-task, in linea con `progress_atomico.md`)
- Tutti gli stili e layout devono rispettare le regole in `docs/ui_rules.md`

## Struttura cartelle

src/  
 lib/  
  components/  
   ui/       # Componenti atomici  
   dashboard/  
    product/  # ProductTable, ProductRow, celle  
    sidebar/  
    topbar/  
  features/  
   csv/      # parsing/normalizzazione  
   price/     # logica SM/SC/PF  
  stores/  
  types/  
  constants/  
  utils/  
 routes/  
  dashboard/  
  login/ register/ forgot-password/

## Logica prezzi

**Input**: basePrice, costoProdotto, iva, utileTarget, costoMedioSpedizione, sogliaFree, limiteSM

1. **Calcolo SM**:

- Obiettivo: utile netto ≥ target, considerando IVA e spedizione
- Limite massimo = limiteSM
- Arrotondamento a 2 decimali
- Se impossibile mantenere margine: SM = 0

2. **PF**:

- Se PF bloccato → valore manuale
- Se SC attivo → PF = basePrice \* (1 - SC/100)
- Se SM attivo → PF = basePrice \* (1 - SM/100)
- Se nessuno attivo → PF = basePrice

## Logica toggle

- Un solo toggle attivo per riga (SM, SC, PF, nessuno)
- Attivare SC o SM con PF attivo → modale conferma
- Colonna: stato on/off/misto + opzioni “solo sbloccati” visibili solo se PF bloccati
- Toggle riga aggiorna stato colonna e viceversa

## Gestione CSV

- Mantiene SC e PF esistenti su prodotti già presenti
- Calcola SM/PF solo per nuovi prodotti
- Filtri: marca, tag, margine utile, stato toggle

## Testing minimo

- Unit: calcolo SM/PF
- Component: modali, toggle, input numerici
- E2E: upload CSV → tabella → export CSV
