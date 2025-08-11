# UI Rules — Tailwind 4.1 (ShopUpManager)

## 1. Principio

- Tutti i componenti usano classi Tailwind mappate a token definiti in `@theme` (file: src/app.css).
- Vietati valori hard-coded (px/hex) se esiste un token.

## 2. Token obbligatori

- Colori: --color-primary-\*, --color-fg, --color-bg, --color-surface, --color-muted, --color-accent, --color-success, --color-warning, --color-error, --color-info.
- Tipografia: --font-sans; scale --text-xs..--text-3xl; --leading-_, --tracking-_.
- Spazi: --space-1..--space-8 (scala 4/8/12/16/24/32/48…).
- Raggi: --radius-sm/md/lg/2xl.
- Ombre: --shadow-sm/md/lg.
- Ring: --ring-color, --ring-width.
- Breakpoints: --bp-sm/md/lg/xl/2xl.
- Transition: --transition-fast/normal/slow.

## 3. Naming & Varianti componenti

- Button: variant=(primary|secondary|ghost|destructive), size=(sm|md|lg), state=(loading|disabled).
- Input: error state standard; icone via slot.
- Dropdown: a11y (roving tabindex, aria-expanded, Esc close).
- Modal: focus trap, ritorno focus all’elemento trigger.

## 4. Classi consigliate (esempi)

- Padding: usare p-[var(--space-*)] solo dove serve inline; preferire utilità semanticizzate (es. `py-2` ⇢ spazio token corrispondente).
- Radius: `rounded-[var(--radius-md)]`.
- Ring: `focus-visible:outline-[var(--ring-width)] focus-visible:outline-[var(--ring-color)]`.
- Ombre: `shadow-[var(--shadow-md)]`.

## 5. Eccezioni

- Layout complessi o compatibilità: consentiti valori espliciti ma commentati con TODO:token.
- Interop librerie terze (limitate).

## 6. QA visivo

- Ogni componente deve avere una pagina/section di preview con le varianti principali.
