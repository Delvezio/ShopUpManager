flowchart TD
  %% INPUT VARIABILI PRINCIPALI
  A1[Input: basePrice (Prezzo Pieno)]
  A2[costoProdotto]
  A3[iva]
  A4[prezzoBaseVendita]
  A5[utileTarget %]
  A6[costoMedioSpedizione €]
  A7[sogliaCarrelloSpedizioneGratuita €]
  A8[limiteScontoMassimo %]
  A9[SC manuale %]
  A10[PF prezzo bloccato €]
  A11[toggleRiga attivo: SM/SC/PF/NONE]
  A12[toggleColonna Stato: attivo/misto/spento]
  A13[Filtri applicati (marchio, tag, margine, toggle attivi)]

  %% CALCOLO SM
  B1[Calcolo SM % con algoritmo]
  B2{Applica limiteScontoMassimo?}
  B3[SM arrotondato a 2 decimali]

  %% FORMATTAZIONE NUMERICA
  C1[Input e visualizzazione: format ITA (virgola decimali, punto migliaia)]
  C2[Calcoli interni: converti stringa -> numero (','→'.')]
  C3[Esportazione CSV/API: formato con virgola decimali]

  %% LOGICA TOGGLE RIGA
  D1{toggleRiga attivo?}
  D2[Se PF attivo -> SC e SM toggle disattivati]
  D3[Se SC attivo -> SM toggle disattivato, PF disattivato con modale conferma se PF era attivo]
  D4[Se SM attivo -> SC e PF disattivati]
  D5[Se nessuno attivo -> PF = basePrice]

  %% CALCOLO PREZZO FINALE PF
  E1{toggleRiga attivo}
  E2[PF bloccato: usa prezzo manuale]
  E3[SC attivo: PF = basePrice * (1 - SC/100)]
  E4[SM attivo: PF = basePrice * (1 - SM/100)]
  E5[Nessuno attivo: PF = basePrice]

  %% LOGICA TOGGLE COLONNA
  F1{toggleColonna stato}
  F2[Dropdown opzioni basate su stato e toggle riga]
  F3[Modali conferma con checkbox (mantieni sconti, mantieni PF bloccati)]
  F4[Azione batch toggle riga (attiva/disattiva)]

  %% TRIGGER AGGIORNAMENTI E SINCRONIZZAZIONE
  G1[Aggiorna toggle riga e PF dopo azione toggle colonna]
  G2[Propaga modifiche toggle riga a toggle colonna]
  G3[Modale conferma su override PF]

  %% GESTIONE CARICAMENTO CSV
  H1[Caricamento nuovo CSV]
  H2[Mantieni SC e PF esistenti per prodotti già presenti]
  H3[Calcola SM e PF nuovi per prodotti nuovi]

  %% VISUALIZZAZIONE FILTRATA
  I1[Applicazione filtri: marchio, tag, margine, toggle attivi]
  I2[Aggiorna visualizzazione e card info (conteggi prodotti per stato)]

  %% COLLEGAMENTI FLUSSO INPUT E CALCOLO SM
  A1 --> B1
  A2 --> B1
  A3 --> B1
  A4 --> B1
  A5 --> B1
  A6 --> B1
  A7 --> B1
  B1 --> B2
  B2 -- sì --> B3
  B2 -- no --> B1
  B3 --> C2

  %% FORMATTAZIONE INPUT/OUTPUT
  A1 --> C1
  A9 --> C1
  A10 --> C1
  C1 --> C2
  C2 --> E3
  C2 --> E4
  E2 --> C3
  E3 --> C3
  E4 --> C3
  E5 --> C3

  %% LOGICA TOGGLE RIGA e CALCOLO PF
  A11 --> D1
  D1 -- PF --> D2 --> E2
  D1 -- SC --> D3 --> E3
  D1 -- SM --> D4 --> E4
  D1 -- NONE --> D5 --> E5

  %% LOGICA TOGGLE COLONNA e sincronizzazione
  A12 --> F1
  F1 --> F2 --> F3 --> F4 --> G1 --> A11
  G2 --> A12
  G3 --> D2

  %% CARICAMENTO CSV E MANTENIMENTO DATI
  H1 --> H2 --> H3 --> B1

  %% VISUALIZZAZIONE FILTRATA E AGGIORNAMENTI
  A13 --> I1 --> I2

  %% TRIGGER AGGIORNAMENTI
  G1 --> E2
  G1 --> E3
  G1 --> E4
  G1 --> E5

  style B3 fill:#d1f7c4,stroke:#333,stroke-width:2px
  style F3 fill:#f9d6d5,stroke:#900,stroke-width:2px
  style G3 fill:#f9d6d5,stroke:#900,stroke-width:2px
