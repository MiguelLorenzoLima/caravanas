# AGENTS.md — Caravanas CCB · Sistema Editorial Portátil

> Identidade editorial quente (bege / bronze / madeira), tipografia serifada, CSS puro com tokens.
> Fonte canônica do visual: este arquivo. Fonte canônica dos valores: `css/variables.css`.
> Vale para qualquer projeto: copie este arquivo + os tokens para replicar a estilização.

## 1. Identidade e stack

- **Conceito:** editorial clássico, quente e elegante (museu / artesanal). Sem frameworks.
- **Stack:** CSS puro + `CSS Custom Properties` (design tokens) + tipografia serifada.
- **Ordem de importação (obrigatória):** `variables.css` → `reset.css` → `global.css` → `components.css` → `responsive.css`.

## 2. Regras duras (nunca violar)

1. **Nunca hardcodar** cor, espaço, raio, fonte ou sombra. Sempre `var(--*)`.
   Exceções fixas do guia: campo em foco `background: #fff`; fundo de mídia escura `#000`;
   erro `#c94444` e sucesso `#5a9a6e` **só** em badge/erro/toast de status; overlay `rgba(64,55,47,0.5)`.
2. **Headings `font-weight: normal`**, `font-family: var(--font-heading)`. `bold` só em botão e label.
3. Base: `font-body`, `line-height: 1.7`, `-webkit-font-smoothing: antialiased`, `body` em `flex column` + rodapé/`bottom-nav` fora do fluxo.
4. `clamp()` em títulos; `letter-spacing` 2px (h1) / 1px (h2 seção) / 3px uppercase (eyebrow).
5. Estados: card hover `translateY(-5px)` + `shadow-md`; botão hover `translateY(-1px)` + brilho bronze;
   botão active `scale(0.98)`; foco visível `2px solid var(--color-accent)` + campo com `0 0 0 3px var(--color-focus-ring)`.
6. `prefers-reduced-motion: reduce` desliga animação/transição e mostra `.reveal`.
7. Quebrou visual? Checar nesta ordem: ordem dos `<link>`, token fora do `:root`, classe legada sem alias, JS gerando classe antiga.

## 3. Tokens (espelho de `css/variables.css`)

```css
:root {
  --color-bg: #f5f1e8; --color-bg-alt: #eee8dc;
  --color-bg-surface: #faf8f3; --color-bg-card: #faf8f3; --color-bg-hero: #eee8dc;
  --color-accent: #a98d70; --color-accent-hover: #967a5f; --color-accent-light: #d8cebf;
  --color-text: #40372f; --color-text-heading: #4a3b32;
  --color-text-muted: #6c6157; --color-text-light: #7a6b5d; --color-text-on-accent: #ffffff;
  --color-border: #d8cebf; --color-border-light: #e4dccf;
  --color-shadow: rgba(60,45,30,0.08); --color-shadow-md: rgba(60,45,30,0.12);
  --color-shadow-lg: rgba(50,40,30,0.15);
  --color-focus: #a98d70; --color-focus-ring: rgba(169,141,112,0.18);
  --color-btn-primary: #a98d70; --color-btn-primary-hover: #967a5f;
  --color-btn-secondary-bg: #ebe4d8; --color-btn-secondary-text: #6c6157;
  --color-btn-secondary-hover: #d8cebf;
  /* Status — só nesses contextos: */
  --color-success: #5a9a6e; --color-success-bg: #e7f2ea;
  --color-danger: #c94444; --color-danger-bg: #f9e9e7;
  --color-overlay: rgba(64,55,47,0.5);
  --font-heading: Georgia, "Times New Roman", "Palatino Linotype", serif;
  --font-body: Georgia, "Times New Roman", serif;
  --font-ui: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --space-xs: 8px; --space-sm: 16px; --space-md: 25px;
  --space-lg: 45px; --space-xl: 70px; --space-2xl: 100px;
  --max-width: 1200px; --max-width-narrow: 900px; --max-width-form: 700px;
  --content-padding: 25px; --bottom-nav-height: 64px;
  --radius-sm: 6px; --radius-md: 10px; --radius-lg: 18px;
  --transition-fast: 0.2s ease; --transition-base: 0.3s ease;
  --transition-slow: 0.5s cubic-bezier(0.4,0,0.2,1);
}
```

Breakpoints: `768px` e `480px` — reduzem `--content-padding` e `--space-*` (ver `variables.css`).

## 4. Tipografia

| Uso | Regra |
|---|---|
| Base / `p` | `font-body` 17px (16px ≤480px), lh 1.7, `muted`, `margin-bottom: 15px` |
| `h1` | `font-heading`, normal, `clamp(28px,5vw,42px)`, ls 2px, `heading`, lh 1.3 |
| `h2` seção | `font-heading`, normal, `clamp(22px,4vw,40px)`, ls 1px |
| `h3` | `font-heading`, normal, `clamp(18px,3vw,22px)` |
| `.eyebrow` | `font-heading` 13px, ls 3px, uppercase, `light` |
| `.lead` | itálico, 17px, lh 1.7, `muted` |
| `.btn` | `font-body` 15px **bold** (exceção permitida) |
| `.page-subtitle` | 18px quando hero, senão 15–16px `muted`; itálico só em hero/lista |

## 5. Dicionário de componentes (canônico → uso)

| Canônico (guia) | Uso neste projeto | Legado suportado como alias |
|---|---|---|
| `.page-hero` (+ `h1`/`p`) | Faixa editorial de título; `dashboard` e `login` usam em vez de `.hero-card` | `.hero-card` = alias |
| `.section-header h2 + span` | Título de seção com divisor bronze 70px | — |
| `.page` / `.container` | `main.page` centralizado `70px var(--content-padding)` | — |
| `.grid-2` | `shortcut-grid`, `summary-row` (3 col vira `grid-2` responsivo) | classes app mantidas junto |
| `.card` + `.card--clickable` | Bloco em destaque; hover eleva | `.card-clickable` = alias |
| `.btn` + `.btn--primary/--secondary/--danger/--block/--pill/--icon` | Todos os botões; `bold` 15px | `.btn-primary/.btn-secondary/.btn-danger/.btn-block/.icon-button/.btn-icon` = aliases |
| `.field/.select/.textarea/.label/.form-error/.field--invalid` | Campos; foco bronze + `background:#fff`; `accent-color` em radio/check | `.form-input/.form-select/.form-label/.form-input-invalid` = aliases |
| `.form-box/.form-group/.form-row/.form-fieldset/.form-actions` | Formulários; `form-box` = caixa `700px` | `.form-field` = alias de `.form-group` |
| `.search-field/.search-icon` | Busca com ícone | — |
| `.nav/.nav-list/.nav-item/.is-active` | Pílula bronze; base de `tabs` e `filtros` | `.tabs/.tab-btn/.filter-row/.filter-btn/.active` = aliases |
| `.avatar` | Iniciais sobre `--color-accent-light` | — |
| `.status-badge/.status-paid/.status-pending` | Pagamento (único lugar de verde/vermelho além de toast/erro) | — |
| `.modal-overlay/.modal/.modal-actions` | Confirmação; overlay `var(--color-overlay)` | — |
| `.toast-container/.toast` | Feedback; tipos via `--color-success/danger/accent` | — |
| `.empty-state/.info-note` | Vazio (itálico) / nota (bege) | — |
| `.ordered-list` | Lista numerada editorial com número bronze | — |
| `.footer/.divider/.eyebrow/.lead/.reveal/.sr-only/.no-print` | Utilitários | — |

## 6. Adaptações de app (decisões finais — não reverter sem discutir)

1. **Topbar (`.page-header`) mantida** por ser app com navegação interna: superfície bege, título serifado
   normal, sticky com borda `border-light`. Não vira `page-hero` (hero é conteúdo, não navegação).
2. **`bottom-nav` fixa mantida** (mobile-first do app): superfície bege translúcida, item `muted`,
   ativo em bronze (`is-active`, `active` aceito). É a transposição funcional da `nav pill` do guia.
   Sem `.footer` editorial nas telas com `bottom-nav` (conflito de fixação); `print` esconde nav/ações.
3. **Renomeação canônica + aliases:** HTML/JS usam o nome do guia; o CSS mantém os nomes antigos
   como aliases para não quebrar nada gerado dinamicamente ou em cache.
4. **Arquivo de regras em maiúsculo (`AGENTS.md`)** — padrão da ferramenta; em PT-BR.

## 7. Responsivo / impressão / movimento

- `768px`: hero `55px 20px 40px`; `.page` 45px; `grid-2` → 1col; listas em 1col; `form-row` → coluna;
  `feature-panel` 55vh; `expand-gallery` vira card empilhado.
- `480px`: base 16px; ações do form em coluna full-width; painel 48vh.
- `print` (lista de participantes): esconde `bottom-nav, page-header, .no-print, toast, .btn`;
  fundo branco; `.card` sem sombra e sem quebrar por dentro.
- `prefers-reduced-motion`: `transition/animation 0.01ms`, `.reveal` visível, `scroll auto`.

## 8. Checklist antes de commitar

- [ ] `Select-String` por `#[0-9a-fA-F]` / `rgba?(` em `css/` fora de `variables.css` retorna só `#fff`
      (foco de campo + papel em `print`), `rgba(169,141,112` (brilho/foco) e o SVG do `.select` —
      resto deve ser `var(--*)`.
- [ ] Sem `Arial`/`Helvetica` fora de fallback; sem `font-weight: 700/600` em `h1–h3`
      (bold só em `.btn`, `.label`, badge).
- [ ] IDs e hooks JS intactos (`data-nav`, `data-filter`, `data-logout`, `data-shortcut`, `*-list`, `*Error`).
- [ ] Testado em 1200 / 768 / 480px + `print` da lista + `reduced-motion`.
- [ ] Se renomear classe, manter alias legado no CSS e atualizar o gerador em `js/app.js`.
