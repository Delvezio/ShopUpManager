Documentazione Tecnica: Logica di Calcolo Prezzi, Toggle, Dropdown, Modali, Importazione/Esportazione CSV - ShopUpManager

1. Variabili di input e configurazioni [VERIFICARE-e-UNIFICARE-NOMI-VARIABILI-NEI-FILE-DI-RIFERIMENTO]

   • basePrice (Prezzo Pieno): prezzo base senza sconti.
   • costoProdotto: costo effettivo del prodotto.
   • iva: aliquota IVA applicata.
   • prezzoBaseVendita: prezzo di vendita base predefinito.
   • utileTarget (%): margine minimo di profitto desiderato dall’utente (es. 20%).
   • costoMedioSpedizione (€): costo medio di spedizione, ripartito % sui prodotti.
   • sogliaCarrelloSpedizioneGratuita (€): valore minimo carrello per spedizione gratis.
   • limiteScontoMassimo (%): massimo sconto applicabile a livello store (es. 50%).
   • SM (Sconto Massimo %): sconto calcolato dall’algoritmo in base alle variabili sopra.
   • SC (Sconto Custom %): sconto manuale inserito dall’utente (può superare SM ma lo segnala in riga con un pallino a dx del text input di colore rosso se lo supera).
   • PF (Prezzo Finale): prezzo effettivo calcolato o bloccato manualmente dall’utente.
   • toggleRiga attivo: indica quale toggle è attivo in una riga tra SM, SC, PF o nessuno.
   • toggleColonna stato: stato di attivazione di un’intera colonna (attivo, spento, misto).
   • filtri applicati: filtri sulla visualizzazione (marca, tag, margine utile, stato toggle).

2. Calcolo Sconto Massimo (SM) ✅ [DONE] -> ShopUpManager/src/lib/features/price/calculate-sm_old.ts
   - ✅ Algoritmo iterativo che calcola SM in % considerando:
     • ✅ costoProdotto + iva
     • ✅ margine utile desiderato (utileTarget)
     • ✅ costoMedioSpedizione ripartito sul prezzo del prodotto in % alla sogliaCarrelloSpedizioneGratuita (es PF = 1/4 di soglia carrello = 1/4 di costo spedizione è in PF)
     • ✅ sogliaCarrelloSpedizioneGratuita per gestire spedizioni gratis
   - ✅ Se SM supera il limite definito da limiteScontoMassimo, viene limitato a quel valore.
   - ✅ SM è arrotondato a 2 decimali.
   - ✅ Se margine utile impossibile da raggiungere, SM è 0.

3. Formattazione Numerica [IN-PROGRESS] -> /Users/alessandroacciardi/Sites/ShopUpManager/src/lib/features/price/format-price.ts
   - ✅ In input e visualizzazione interna:
     • ✅ numeri formattati con virgola come separatore decimali e punto per migliaia (es. 1.234,56)
   - ✅ Per i calcoli interni:
     • ✅ stringhe convertite in numeri (virgola sostituita da punto) per parsing corretto.
   - In esportazione CSV o API:
     • prezzi esportati mantenendo virgola come separatore decimali (compatibilità Shopify e CMS).
     NB: terminare in fase di implementazione: 13. Esportazione CSV unico o combinato

4. Visualizzazione Prezzo Finale (PF) [IN-PROGRESS] -> ShopUpManager/src/lib/features/price/calculate-pf.ts

   • Se PF bloccato: valore manuale usato direttamente.
   • Se SC attivo:PF = basePrice \_ (1 - SC/100)
   • Se SM attivo:PF = basePrice \_ (1 - SM/100)
   • Se nessuno attivo:PF = basePrice
   NB: vedi logica Toggle punti 5 (Riga) e 6 (Bulk)

5. Interazione fra Toggle e Input Text per SC e PF per ogni Riga [IN-PROGRESS]
   - SC ha 4 stati:
     • Attivo / Non compilato = toggle attivo: Se il toggle è attivo, ma non vi sono valori in input text, SC = 0, quindi PF = basePrice.
     • Spento / Compilato = input text compilato: Se input text compilato, ma toggle disattivato, SC non si applica a PF.
     • Attivo e Compilato = toggle attivo e input text compilato: SC si applica a PF.
     • Spento / Non Compilato = toggle spento e input text non compilato: SC non si applica a PF.
     NB:
     • Se scrivo o modifico il valore in input text si attiva il toggle.
     • In stato Attivo e Compilato: Se disattivo il toggle, il valore dentro input text non si modifica.

   - PF riporta sempre il Prezzo finale calcolato a seconda dell'attivazione/disattivazione di SM o SC
     • Ha due stati:
     · Bloccato = Toggle Attivo : 1. SM e SC non si applicano in quanto l'utente vuole mantenere o modificare il prezzo manualmente. 2. Attiva sempre modali di conferma per essere sbloccato.
     · Sbloccato = Toggle Spento: il prezzo mostrato è sempre calcolato su SM o SC attivi. Se SM e SC disattivi, PF = basePrice.
     NB:
     • Se scrivo o modifico il valore in input text si attiva il toggle.
     • In stato Attivo e Compilato: Se disattivo il toggle: 1. Si attiva modale di conferma 2. il valore dentro input text si modifica a seconda di SM o SC attivi. Se SM e SC disattivi, PF = basePrice.

6. Logica Toggle per ogni Riga [IN-PROGRESS]
   - Solo un toggle per riga può essere attivo: SM, SC, PF oppure nessuno.
   - Se PF è attivo:
     • toggle SC e SM sono disattivati.
     • Se si tenta di attivare SC o SM, appare modale di conferma per disattivare PF.
   - Se SC è attivo:
     • toggle SM disattivato.
     • Se PF era attivo, modale di conferma per disattivare PF.
     NB:
     · Attivare/Disattivare Toggle SC non cancella il valore scritto nell'input text SC, semplicemente lo applica/disapplica a PF.
     · Scrivere nell'input text o modificare il valore SC Attiva il toggle SC con Modale di conferma se PF era attivo.
   - Se SM è attivo:
     • toggle SC e PF disattivati.
   - Se nessuno attivo:
     • PF = basePrice (prezzo pieno).

   Vedi file:
   -> ShopUpManager/src/lib/features/price/calculate-pf.ts
   -> ShopUpManager/src/lib/features/price/calculate-sm.ts
   -> ShopUpManager/src/lib/features/toggle/toggle-types.ts
   -> ShopUpManager/src/lib/features/toggle/toggle-manager.ts
   -> ShopUpManager/src/lib/components/ui/discounttoggle/DiscountToggle.svelte
   -> ShopUpManager/src/lib/components/ui/discounttoggle/DiscountToggle.svelte.d.ts
   -> ShopUpManager/src/lib/components/dashboard/product/ProductTable_old.svelte
   -> ShopUpManager/src/lib/components/dashboard/product/ProductRow_old.svelte

7. Logica Bulk toggle di Colonna [IN-PROGRESS]
   - Stato di colonna:
     • Attivo (tutti toggle attivi),
     • Spento (tutti toggle spenti),
     • Misto (alcuni attivi, altri spenti).
   - Dropdown con opzioni diverse in base allo stato della colonna e combinazioni di toggle riga.
   - Modali di conferma con checkbox per mantenere sconti personalizzati e prezzi bloccati.
   - Azioni batch su toggle riga, con aggiornamento prezzi e stato colonne.

   Vedi file:
   -> ShopUpManager/src/lib/features/price/calculate-pf.ts
   -> ShopUpManager/src/lib/features/price/calculate-sm.ts
   -> ShopUpManager/src/lib/components/ui/discounttoggle/DiscountToggle.svelte
   -> ShopUpManager/src/lib/components/ui/discounttoggle/DiscountToggle.svelte.d.ts
   -> ShopUpManager/src/lib/features/toggle/toggle-types.ts
   -> ShopUpManager/src/lib/features/toggle/toggle-manager.ts
   -> ShopUpManager/src/lib/components/dashboard/product/ProductTable_old.svelte
   -> ShopUpManager/src/lib/components/dashboard/product/ProductRow_old.svelte

8. Logica Dropdown su Toggle Bulk SM/SC/PF:
   - Click su Bulk toggle SM si apre dropdown con queste opzioni:
     • Se Stato Attivo: Disattiva tutti / Chiudi dropdown
     • Se Stato Spento: Attiva tutti / Attiva tutti tranne SC attivi / Attiva tutti tranne PF bloccati / Attiva tutti tranne SC attivi e PF bloccati / Chiudi dropdown
     • Se Stato Misto: Attiva tutti / Attiva tutti tranne SC attivi / Attiva tutti tranne PF bloccati / Attiva tutti tranne SC attivi e PF bloccati / Disattiva tutti / Chiudi dropdown

   - Click su Bulk toggle SC si apre dropdown con queste opzioni:
     • Se Stato Attivo: Disattiva tutti / Chiudi dropdown
     • Se Stato Spento: Attiva tutti / Attiva tutti SC compilati / Attiva tutti tranne PF bloccati / Attiva tutti SC compilati tranne PF bloccati / Chiudi dropdown
     • Se Stato Misto: Attiva tutti / Attiva tutti SC compilati / Attiva tutti tranne PF bloccati / Attiva tutti SC compilati tranne PF bloccati / Disattiva tutti / Chiudi dropdown

   - Click su Bulk toggle PF si apre dropdown con queste opzioni:
     • Se Stato Attivo: Disattiva tutti / Chiudi dropdown
     • Se Stato Spento: Attiva tutti / Attiva tutti tranne SC attivi / Chiudi dropdown
     • Se Stato Misto: Attiva tutti / Attiva tutti tranne SC attivi / Chiudi dropdown / Disattiva tutti

   NB: le attivazioni o disattivazioni dei toggle, che riguardano la disattivazione diretta o indiretta di PF devono attivare la modale di conferma.

   Vedi file:
   -> ShopUpManager/src/lib/components/ui/dropdown/DropdownMenuItem.svelte
   -> ShopUpManager/src/lib/components/ui/dropdown/DropdownMenu.svelte
   -> ShopUpManager/src/lib/features/toggle/toggle-types.ts
   -> ShopUpManager/src/lib/features/toggle/toggle-manager.ts
   -> ShopUpManager/src/lib/components/dashboard/product/ProductTable_old.svelte
   -> ShopUpManager/src/lib/components/dashboard/product/ProductRow_old.svelte
   -> ShopUpManager/src/lib/components/ui/modal/ConfirmModal.svelte

9. Modali di conferma disattivazione PF [IN-PROGRESS]
   - Se PF bloccato (per riga o bulk), la disattivazione (per riga o bulk) spegnendo PF o attivando SM/SC, attiva la modale di conferma: "Sei sicuro di voler sbloccare questo prezzo? il valore verrà modificato -> Conferma/Annulla

   Vedi file:
   -> ShopUpManager/src/lib/components/ui/modal/ConfirmModal.svelte
   -> ShopUpManager/src/lib/components/ui/dropdown/DropdownMenuItem.svelte
   -> ShopUpManager/src/lib/components/ui/dropdown/DropdownMenu.svelte
   -> ShopUpManager/src/lib/features/toggle/toggle-types.ts
   -> ShopUpManager/src/lib/features/toggle/toggle-manager.ts
   -> ShopUpManager/src/lib/components/dashboard/product/ProductTable_old.svelte
   -> ShopUpManager/src/lib/components/dashboard/product/ProductRow_old.svelte

10. Trigger e Sincronizzazione [IN-PROGRESS]
    - Azioni su toggle colonna aggiornano tutti toggle riga corrispondenti.
    - Azioni su toggle riga aggiornano lo stato toggle colonna (per gestire stato misto).
    - Modali appaiono quando si rischia di sovrascrivere PF bloccato.
    - Ogni cambio di toggle, sconto o userPreferences ricalcola PF in tempo reale (o su bottone per batch, a seconda implementazione).

11. Caricamento CSV e Persistenza Dati [TODO]
    - Al caricamento di un nuovo CSV:
      • Mantiene SC e PF esistenti per prodotti già presenti (non sovrascrive).
      • Calcola SM e PF nuovi solo per prodotti nuovi.
    - Assicura continuità di lavoro e evita perdita dati personalizzati ad ogni upload.

12. Visualizzazione Filtrata [TODO]
    - Permette filtri dinamici per marca, tag, margine utile, stato toggle (SC attivi, PF bloccati, SM > X, ecc.).
    - Card info aggiornate per mostrare:
      • Numero prodotti totali, scontati, non scontati, con PF bloccato, con SC attivo, con prezzo sopra soglia carrello minimo, prezzo base ad elevato margine utile (es > 50%), prezzo base a basso margine utile (es < 30%).
    - Filtri possono essere gestiti via barra di ricerca, menu a tendina o modale con form.
    - Impostazioni (utile target, costo spedizione, soglia carrello) si applicano solo ai prodotti filtrati.

13. Esportazione CSV unico o combinato
    - Da definire.
      Vedi file:
      -> /Users/alessandroacciardi/Sites/ShopUpManager/src/lib/components/ui/Button.svelte
      -> ShopUpManager/src/lib/components/ui/dropdown/DropdownMenuItem.svelte

Note per Sviluppo e Testing
• Separare chiaramente la logica di calcolo dal rendering UI (moduli TypeScript pure).
• Gestire formattazione numerica solo in UI, convertendo sempre prima di calcoli.
• Testare con casi limite (es. sconto 0%, 100%, superamento margini).
• Modali conferma con checkbox devono modificare comportamento in modo chiaro e testabile.
• Ottimizzare performance con debounce su input manuali e batch update per toggle colonna.
