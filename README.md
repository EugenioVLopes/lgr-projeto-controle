# LGR e projeto de controladores (DCA-3701 UFRN)

Aplicativo para celular em React/TypeScript, com cálculos locais no navegador. A primeira unidade mantém os 12 passos do Lugar Geométrico das Raízes. A segunda projeta controladores PD, PI e PID com zeros reais iguais e confere a resposta completa de malha fechada.

## Segunda unidade

- Quatro exercícios do PDF de 2026.2 e entrada manual de G(s), H(s) e especificações.
- Especificações por Mp e tempo de acomodação, ζ e ωn ou polo complexo desejado.
- Escolha entre passos essenciais e memória completa, com parcelas dos ângulos, distâncias, substituições e ganhos Kp, Ki e Kd.
- LGR compensado, todos os polos de malha fechada e resposta ao degrau unitário.
- Validação de Mp e acomodação em 2% ou 5%, com ajuste manual do fator de frequência.
- Discretização de Gc(s) ou Gc(s)G(s)H(s) por forward, backward e Tustin, com equação de diferenças e identificação de resultados não causais.
- Impressão da resolução atual no formato das entregas, com enunciado, cálculos, polos, requisitos e gráfico vetorial, independente dos passos abertos na tela. Ctrl+P usa o projeto atual.
- Botão para imprimir as quatro questões da lista em um único documento A4, com o ajuste declarado da questão 1.

Consulte [as convenções e limites dos cálculos](docs/segunda-unidade.md).
Veja também a [comparação executada com os dois projetos Python](docs/comparacao-referencias.md).

A [resolução da lista em PDF](entregas/lista_2a_unidade_Eugenio_Santo.pdf) contém as quatro questões com cálculos e verificação do enunciado. O [guia de geração](entregas/README.md) explica o ajuste da questão 1 e como reproduzir o documento.

## Rodar no celular (mesma rede)

```bash
npm install
npm run dev -- --host
# abra no celular o IP impresso, ex. http://192.168.0.10:5173
```

PWA: instalável como app (standalone, offline após 1º acesso).

## 12 passos implementados (`src/lib/lgr/`)

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
npm run lint     # oxlint
npm run typecheck # tsc -b, obrigatório para validar tipos
npm run build    # tsc + vite build (PWA)
```
