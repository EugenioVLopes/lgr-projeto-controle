# LGR — 12 Passos (DCA-3701 UFRN)

Web app mobile-first em TypeScript que calcula os 12 passos do Lugar Geométrico das Raízes em TS 100% client-side.

Spec oficial: `docs/SisContr.pdf` p.6 (2.2 Passos para construção do LGR) + `docs/DCA3701...Lista...pdf` (5 questões).

## Rodar no celular (mesma rede)

```bash
npm install
npm run dev -- --host
# abra no celular o IP impresso, ex. http://192.168.0.10:5173
```

PWA: instalável como app (standalone, offline após 1º acesso).

## 12 passos implementados (`src/lib/lgr.ts`)

1. `1+G(s)H(s)=1+K·P(s)` — `fazerPasso1`
2. Forma fatorada N/D
3. Polos/zeros (Durand-Kerner) + plot
4. Segmentos eixo real (regra ímpar)
5. `Ls=max(np,nz)`
6. Simetria eixo real
7. Assíntotas `σa`, `φa`
8. Breakaway `dK/ds=0`
9. Cruzamento jω (`Re_D·Im_N−Im_D·Re_N=0`) + Routh numérico (sem sympy)
10. Ângulos partida/chegada
11. Critério ângulo em s0
12. K em s0 (módulo)

Exemplos da lista em `src/lib/examples.ts` (Q1–Q5 lidos via render PNG, pois `markitdown` não OCRiza equações-imagem).

## Scripts

```bash
npm run dev      # dev + host p/ celular
npm test         # vitest (core numérico)
npm run build    # tsc + vite build (PWA)
```

## Notas numéricas

- `roots()` Durand-Kerner próprio (graus 1–8), sem numpy.
- Routh simbólico (sympy) → Routh numérico + `Kcrit` via `cruzamentoJw` (mesmo resultado p/ usuário).
- Plotly `plotly.js-dist-min` (pinch-zoom no celular).

