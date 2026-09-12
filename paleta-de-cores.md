# Paleta de Cores — Caravanas

Fonte canônica: `css/variables.css`
Levantamento completo de todas as cores usadas no projeto (`css/`, `pages/`, `js/` — tudo via `var(--*)`, sem HEX solto fora dos tokens, exceto exceções do guia abaixo).

## Fundo
- #f5f1e8 para bg — `--color-bg`
- #eee8dc para bg-alt / bg-hero — `--color-bg-alt`, `--color-bg-hero`
- #faf8f3 para bg-surface / bg-card — `--color-bg-surface`, `--color-bg-card`
- #ebe4d8 para btn-secondary-bg — `--color-btn-secondary-bg`

## Destaque / Bronze (primary do guia)
- #a98d70 para accent / focus / btn-primary — `--color-accent`, `--color-focus`, `--color-btn-primary`
- #967a5f para accent-hover / btn-primary-hover — `--color-accent-hover`, `--color-btn-primary-hover`
- #d8cebf para accent-light / border / btn-secondary-hover — `--color-accent-light`, `--color-border`, `--color-btn-secondary-hover`

## Texto
- #40372f para text — `--color-text`
- #4a3b32 para text-heading — `--color-text-heading`
- #6c6157 para text-muted / btn-secondary-text — `--color-text-muted`, `--color-btn-secondary-text` (também usado na seta do `.select` via `%236c6157`)
- #7a6b5d para text-light — `--color-text-light`
- #ffffff para text-on-accent — `--color-text-on-accent`

## Borda
- #e4dccf para border-light — `--color-border-light`

## Status (usar SOMENTE em badge de pagamento, erro de campo e toast)
- #5a9a6e para success — `--color-success`
- #e7f2ea para success-bg — `--color-success-bg`
- #c94444 para danger — `--color-danger`
- #f9e9e7 para danger-bg — `--color-danger-bg`

## Exceções fixas do guia (fora de `variables.css`, permitidas)
- #fff para campo em foco (`components.css:171`) + papel em `print` (`responsive.css:116`) — equivale a #ffffff

## Sombras / Overlay / Brilho (RGBA)
- rgba(60, 45, 30, 0.08) para shadow — `--color-shadow`
- rgba(60, 45, 30, 0.12) para shadow-md — `--color-shadow-md`
- rgba(50, 40, 30, 0.15) para shadow-lg — `--color-shadow-lg`
- rgba(169, 141, 112, 0.18) para focus-ring — `--color-focus-ring`
- rgba(64, 55, 47, 0.5) para overlay — `--color-overlay`
- rgba(169, 141, 112, 0.3) para brilho hover btn-primary (`components.css:60`)
- rgba(169, 141, 112, 0.25) para brilho nav-item ativa (`components.css:351`)
