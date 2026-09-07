# LGR 12 passos (DCA-3701 UFRN)

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

1. `1+G(s)H(s)=1+K·P(s)`, em `fazerPasso1`
2. Forma fatorada N/D
3. Polos/zeros (Durand-Kerner) + plot
4. Segmentos eixo real (regra ímpar)
5. `Ls=max(np,nz)`
6. Simetria eixo real
7. Assíntotas `σa`, `φa`
8. Breakaway `dK/ds=0`
9. Cruzamento jw (`Re_D·Im_N-Im_D·Re_N=0`) mais Routh numérico, sem sympy
10. Ângulos partida/chegada
11. Critério ângulo em s0
12. K em s0 (módulo)

Exemplos da lista em `src/lib/examples.ts` (Q1 a Q5 lidos via render PNG, pois `markitdown` não OCRiza equações-imagem).

## Scripts

```bash
npm run dev      # dev + host p/ celular
npm test         # vitest (core numérico)
npm run build    # tsc + vite build (PWA)
```

## Notas numéricas

- `roots()` Durand-Kerner próprio (graus 1 a 8), sem numpy.
- Troquei o Routh simbólico do sympy por Routh numérico mais `Kcrit` via `cruzamentoJw`. O resultado para o usuário é o mesmo.
- Plotly `plotly.js-basic-dist-min`, que mantém o pinch-zoom no celular.
