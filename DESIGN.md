---
name: LGR 12 Passos
description: Ferramenta UFRN DCA-3701 para cálculo e visualização do Lugar Geométrico das Raízes no celular.
colors:
  ink: "#0f172a"
  bg: "#f8fafc"
  surface: "#ffffff"
  border: "#e2e8f0"
  muted: "#475569"
  muted-2: "#64748b"
  field-border: "#cbd5e1"
  code-bg: "#f1f5f9"
  ok-bg: "#dcfce7"
  ok-ink: "#166534"
  warn-bg: "#fef3c7"
  warn-ink: "#92400e"
  plot-polo: "#dc2626"
  plot-zero: "#16a34a"
typography:
  body:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "0.81rem"
    fontWeight: 600
  title:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "1.06rem"
    fontWeight: 700
  small:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "0.75rem"
  summary:
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "0.94rem"
    fontWeight: 700
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.875rem"
    lineHeight: 1.5
rounded:
  xs: "4px"
  sm: "8px"
  md: "10px"
  lg: "12px"
spacing:
  sm: "8px"
  md: "12px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
    rounded: "{rounded.md}"
    padding: "13px"
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "12px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
---

# Design system: LGR 12 passos

## Overview

**Guiding idea: "O Caderno de Laboratório"**

Ferramenta Operate densa e direta. São 12 passos em `<details>` sequenciais, números mono e gráficos Plotly como prova. Visual slate institucional da UFRN, sem marketing. Superfícies planas com borda 1px, raio 12px, ritmo 8/12px.

**Key points.**

- Plano e legível no sol do campus
- Mono só para dados e medida
- Um acento por estado (verde pertence / âmbar atenção / vermelho polo)

## Colors

Paleta slate + semântica de laboratório.

### Primary

- **Tinta Ardósia** (#0f172a): header, ação primária, foco. Fundo no dark.

### Neutral

- **Papel Frio** (#f8fafc): fundo claro.
- **Superfície** (#ffffff): cards, inputs, details.
- **Borda Fria** (#e2e8f0): divisórias.
- **Texto Secundário** (#475569): ajuda.
- **Texto Terciário** (#64748b): rodapé.

### Named rules

**The Rarity Rule.** Vermelho (#dc2626) só para polos/erro; verde (#16a34a) só para pertence/zeros. Nunca como decoração.

## Typography

**Body font.** system-ui (com -apple-system, Segoe UI, Roboto).
**Label and mono font.** ui-monospace para dados.

**Character.** Eu quero texto estável e escaneável, com hierarquia por peso e não por família.

### Hierarchy

- **Title** (700, 1.06rem): `header h1`.
- **Body** (400, 1rem, 1.5): inputs e texto.
- **Label** (600, 0.81rem): labels, legends.
- **Mono/Data** (400, 0.875rem, 1.5, max 65ch): `.mono`.
- **Ajuda** (400, 0.875rem, max 70ch): `.ajuda`.

## Layout

Coluna única max 860px, `grid2` 2→1 col @560px. `summary` altura mínima 44px. Plots fluidos `min(72vw,340px)`. Ordem visual = ordem DOM/foco.

## Elevation and depth

Sistema plano por padrão; profundidade só por borda 1px. Sem sombras. Plot usa grade `--plot-grid`.

## Shapes

Raio 12px cards/details, 10px botões, 8px inputs/mono. Sem pills exceto badges 8px.

## Components

### Buttons

- **Shape:** 10px.
- **Primary:** fundo tinta, texto papel, min-height 44px.
- **Hover / Focus:** `:focus-visible` anel 2px.

### Cards and containers

- **Corner Style:** 12px.
- **Background:** surface.
- **Border:** 1px border.
- **Internal Padding:** 12px.

### Inputs and fields

- **Style:** borda field-border, fundo surface, raio 8px, 44px.
- **Focus:** anel tinta (claro) / azul claro (escuro).
- **Error:** `role=alert` em badge-warn, sem apagar digitação.

### Navigation

- Header sticky com título + toggle de tema (`aria-pressed`). Sem router.

## Dos and don'ts

### Do

- **Do** usar `.mono` só para polinômios, listas polo/zero, Routh.
- **Do** manter tudo em pt-BR (spec 12 passos).
- **Do** vincular cada plot a seu resumo via `aria-describedby`.

### Don't

- **Don't** reintroduzir `App.css` do template Vite.
- **Don't** importar Plotly síncrono no bundle inicial.
- **Don't** usar vermelho/verde fora de polo/zero/estado.
